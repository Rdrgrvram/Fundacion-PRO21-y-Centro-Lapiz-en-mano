import { test, expect } from '@playwright/test'
import { load } from 'js-yaml'
import { getFamiliesContent } from '@/lib/cms'
import { openCmsEntry, publishEntry, backupContentFile, uniqueMarker } from './helpers'

// Auditoría de la colección "families" (página Familias) del CMS.
// Ver public/admin/config.yml líneas ~820-919 para el esquema de campos que este
// test valida contra la UI real del panel. A diferencia de otras páginas, esta
// colección ya estaba 100% alineada (sin campos huérfanos, sin discrepancias
// config.yml/schema/componente) — el único gap real era el patrón WhatsApp roto en 2
// puntos (fallback de descarga de guías + CTA final, con el número expuesto en el
// texto visible del botón), ya corregido en FamiliasPageClient.tsx.

const FAMILIES_YML = 'settings/families.yml'

const EXPECTED_SECTIONS = [
  'Hero',
  'Carta de bienvenida',
  'Sección: Sesiones virtuales',
  'Sesiones virtuales',
  'Sección: Red de apoyo',
  'Red de apoyo',
  'Sección: Guías descargables',
  'Guías descargables',
  'Sección: Preguntas frecuentes',
  'Preguntas frecuentes',
  'CTA final',
]

test.describe('CMS — Familias (colección "families")', () => {
  let backup: ReturnType<typeof backupContentFile>

  test.beforeEach(() => {
    backup = backupContentFile(FAMILIES_YML)
  })

  test.afterEach(() => {
    backup.restore()
  })

  test('el panel carga la entrada de Familias vía backend local, sin caer al login real de GitHub', async ({
    page,
  }) => {
    await openCmsEntry(page, '/collections/families/entries/content')

    await expect(page.getByRole('button', { name: /iniciar sesión con github/i })).toHaveCount(0)
  })

  test('todas las secciones definidas en config.yml para "families" existen como campos editables', async ({
    page,
  }) => {
    await openCmsEntry(page, '/collections/families/entries/content')
    for (const label of EXPECTED_SECTIONS) {
      await expect(page.getByText(label, { exact: false }).first()).toBeVisible()
    }
  })

  test('editar y publicar el título de la carta de bienvenida persiste el cambio en content/settings/families.yml', async ({
    page,
  }) => {
    const marker = uniqueMarker('FAMILIES_WELCOME_TITLE')
    await openCmsEntry(page, '/collections/families/entries/content')
    // El hero no tiene ningún campo con label exacto "Título" (usa "Título — línea
    // 1"/"línea 2"), así que la primera coincidencia exacta de "Título" en el panel
    // es la de welcome_letter — confirmado en vivo con un sondeo antes de fijarlo.
    await page
      .getByText('Título', { exact: true })
      .first()
      .locator('xpath=following::input[1]')
      .fill(marker)
    await publishEntry(page)

    const parsed = load(backup.readYamlRaw()) as { es: { welcome_letter: { title: string } } }
    expect(parsed.es.welcome_letter.title).toBe(marker)
  })

  test('tras publicar, el archivo sigue siendo válido contra el esquema zod real (lib/cms.ts)', async ({
    page,
  }) => {
    const marker = uniqueMarker('FAMILIES_HERO_BADGE')
    await openCmsEntry(page, '/collections/families/entries/content')
    await page.locator('input[type="text"], textarea').first().fill(marker)
    await publishEntry(page)

    const content = getFamiliesContent('es')
    expect(content.hero.badge).toBe(marker)
  })

  test('el contenido publicado en el CMS se refleja en la página pública /es/familias', async ({ page }) => {
    const marker = uniqueMarker('FAMILIES_HERO_BADGE_PUBLIC')
    await openCmsEntry(page, '/collections/families/entries/content')
    await page.locator('input[type="text"], textarea').first().fill(marker)
    await publishEntry(page)

    await page.goto('/es/familias')
    await expect(page.getByText(marker)).toBeVisible()
  })

  test('regresión: los botones de WhatsApp (guías + CTA final) usan el número real del sitio, no un valor hardcodeado', async ({
    page,
  }) => {
    await page.goto('/es/familias')
    await page.waitForLoadState('networkidle')

    // Todas las guías sembradas hoy no tienen PDF (content/settings/families.yml),
    // así que su botón de descarga cae al fallback de WhatsApp — confirma que ese
    // fallback usa el número real (site_settings.contact.whatsapp_number = 59170106276)
    // en vez de un literal desincronizado.
    const guideLink = page.locator('a[href*="wa.me/"]').first()
    await expect(guideLink).toHaveAttribute('href', /wa\.me\/59170106276/)

    const ctaLink = page.getByRole('link', { name: /whatsapp/i }).last()
    await expect(ctaLink).toHaveAttribute('href', /wa\.me\/59170106276/)
    // El texto visible ya no debe exponer el número crudo (bug corregido).
    await expect(ctaLink).not.toContainText('70106276')
  })
})
