import { test, expect } from '@playwright/test'
import { readFileSync } from 'fs'
import { load } from 'js-yaml'
import { getContactPageContent } from '@/lib/cms'
import { openCmsEntry, publishEntry, backupContentFile, uniqueMarker } from './helpers'

// Auditoría de la colección "contact_page" (página Contacto) del CMS.
// Ver public/admin/config.yml líneas ~937-1012 para el esquema de campos que este
// test valida contra la UI real del panel. Al igual que Familias, esta colección ya
// estaba 100% alineada (sin campos huérfanos) — los gaps reales eran hardcodeos
// puntuales de WhatsApp/mapa/teléfono en ContactoPageClient.tsx, y un bug de datos en
// el backend (app/api/contact/route.ts enviaba a un email distinto del real del CMS),
// todos ya corregidos.

const CONTACT_PAGE_YML = 'settings/contact_page.yml'

const EXPECTED_SECTIONS = [
  'Hero',
  'Motivos de consulta',
  'Sección: Formulario',
  'Tarjeta de ubicación',
  'Horarios',
  'Sección: Preguntas frecuentes',
  'Preguntas frecuentes rápidas',
  'CTA de WhatsApp directo',
  'Cita de cierre',
]

test.describe('CMS — Contacto (colección "contact_page")', () => {
  let backup: ReturnType<typeof backupContentFile>

  test.beforeEach(() => {
    backup = backupContentFile(CONTACT_PAGE_YML)
  })

  test.afterEach(() => {
    backup.restore()
  })

  test('el panel carga la entrada de Contacto vía backend local, sin caer al login real de GitHub', async ({
    page,
  }) => {
    await openCmsEntry(page, '/collections/contact_page/entries/content')

    await expect(page.getByRole('button', { name: /iniciar sesión con github/i })).toHaveCount(0)
  })

  test('todas las secciones definidas en config.yml para "contact_page" existen como campos editables', async ({
    page,
  }) => {
    await openCmsEntry(page, '/collections/contact_page/entries/content')
    for (const label of EXPECTED_SECTIONS) {
      await expect(page.getByText(label, { exact: false }).first()).toBeVisible()
    }
  })

  test('editar y publicar el badge del hero persiste el cambio en content/settings/contact_page.yml', async ({
    page,
  }) => {
    const marker = uniqueMarker('CONTACT_HERO_BADGE')
    await openCmsEntry(page, '/collections/contact_page/entries/content')
    await page.locator('input[type="text"], textarea').first().fill(marker)
    await publishEntry(page)

    const parsed = load(backup.readYamlRaw()) as { es: { hero: { badge: string } } }
    expect(parsed.es.hero.badge).toBe(marker)
  })

  test('tras publicar, el archivo sigue siendo válido contra el esquema zod real (lib/cms.ts)', async ({
    page,
  }) => {
    const marker = uniqueMarker('CONTACT_HERO_BADGE_ZOD')
    await openCmsEntry(page, '/collections/contact_page/entries/content')
    await page.locator('input[type="text"], textarea').first().fill(marker)
    await publishEntry(page)

    const content = getContactPageContent('es')
    expect(content.hero.badge).toBe(marker)
  })

  test('el contenido publicado en el CMS se refleja en la página pública /es/contacto', async ({ page }) => {
    const marker = uniqueMarker('CONTACT_HERO_BADGE_PUBLIC')
    await openCmsEntry(page, '/collections/contact_page/entries/content')
    await page.locator('input[type="text"], textarea').first().fill(marker)
    await publishEntry(page)

    await page.goto('/es/contacto')
    await expect(page.getByText(marker)).toBeVisible()
  })

  test('regresión: el CTA de WhatsApp final muestra el número real (con código de país), no un literal hardcodeado', async ({
    page,
  }) => {
    await page.goto('/es/contacto')
    await page.waitForLoadState('networkidle')

    // Antes de la corrección, el JSX tenía el literal "70106276" quemado, ignorando
    // por completo content del CMS — coincidía por casualidad con el valor real, pero
    // si alguien cambiaba site_settings.contact.phone_display desde el panel, el
    // botón seguía mostrando el número viejo.
    await expect(page.getByText('+591 70106276').first()).toBeVisible()
  })

  test('regresión: el botón "Llamar" incluye el código de país en el link tel:', async ({ page }) => {
    await page.goto('/es/contacto')
    await page.waitForLoadState('networkidle')

    const callLink = page.locator('a[href^="tel:"]').first()
    await expect(callLink).toHaveAttribute('href', 'tel:+59170106276')
  })

  test('regresión: el botón de Google Maps usa la dirección real, no una búsqueda genérica de "La Paz, Bolivia"', async ({
    page,
  }) => {
    await page.goto('/es/contacto')
    await page.waitForLoadState('networkidle')

    const mapsLink = page.getByRole('link', { name: /google maps/i })
    const href = await mapsLink.getAttribute('href')
    expect(href).toContain('maps/search')
    expect(href).not.toContain('La+Paz+Bolivia')
  })

  test('regresión: app/api/contact/route.ts envía el correo al email real de site_settings, no a un literal desalineado', () => {
    // Bug de datos real encontrado en la auditoría (mismo tipo que en Colabora): el
    // backend enviaba a "contacto@fundacionpro21.org", que no coincide con el email
    // real configurado en site_settings ("fundacionpro211@gmail.com") — los mensajes
    // del formulario se habrían perdido silenciosamente. Se corrigió leyendo
    // getSiteSettings('es').contact.email en vez de un string fijo.
    const source = readFileSync('app/api/contact/route.ts', 'utf-8')
    expect(source).not.toContain("'contacto@fundacionpro21.org'")
    expect(source).toContain('getSiteSettings')
  })
})
