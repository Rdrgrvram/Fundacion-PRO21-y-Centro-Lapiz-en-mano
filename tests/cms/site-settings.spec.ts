import { test, expect } from '@playwright/test'
import { load } from 'js-yaml'
import { getSiteSettings } from '@/lib/cms'
import { openCmsEntry, publishEntry, backupContentFile, uniqueMarker } from './helpers'

// Auditoría de la colección "site_settings" (transversal a todo el sitio: contacto,
// redes sociales, menú, header, footer). A diferencia de las páginas anteriores, esta
// ronda incluyó una auditoría transversal completa (grep en app/+components/+lib/)
// para encontrar CUALQUIER dato institucional hardcodeado fuera de las 9 páginas ya
// auditadas — encontró y cerró: (1) logos de PRO-21/Lápiz en Mano hardcodeados en
// Header/Footer/Quiénes Somos (nuevos campos widget:image logo_pro21/logo_lapiz +
// sus _alt), (2) Footer solo mostraba 2 de las 4 redes sociales ya definidas en el CMS
// (Facebook y TikTok-PRO21 eran huérfanos), (3) Blog (page.tsx y [slug]/page.tsx,
// colección nunca antes auditada) tenía 2 números de WhatsApp hardcodeados, (4)
// AccessibilityBar.tsx mostraba el mismo texto en ES y EN (bug, ni siquiera usaba
// content editorial) — corregido reusando los nuevos campos de logo + header.tagline.

const SITE_SETTINGS_YML = 'settings/site_settings.yml'

const EXPECTED_SECTIONS = [
  'Logo PRO-21',
  'Texto alternativo — Logo PRO-21',
  'Logo Lápiz en Mano',
  'Texto alternativo — Logo Lápiz en Mano',
  'Datos de contacto',
  'Redes sociales',
  'Menú de navegación',
  'Encabezado (Header)',
  'Pie de página (Footer)',
]

test.describe('CMS — Configuración general (colección "site_settings")', () => {
  let backup: ReturnType<typeof backupContentFile>

  test.beforeEach(() => {
    backup = backupContentFile(SITE_SETTINGS_YML)
  })

  test.afterEach(() => {
    backup.restore()
  })

  test('el panel carga la entrada de Configuración general vía backend local, sin caer al login real de GitHub', async ({
    page,
  }) => {
    await openCmsEntry(page, '/collections/site_settings/entries/content')

    await expect(page.getByRole('button', { name: /iniciar sesión con github/i })).toHaveCount(0)
  })

  test('todas las secciones definidas en config.yml para "site_settings" existen como campos editables, incluyendo los nuevos campos de logo', async ({
    page,
  }) => {
    await openCmsEntry(page, '/collections/site_settings/entries/content')
    for (const label of EXPECTED_SECTIONS) {
      await expect(page.getByText(label, { exact: false }).first()).toBeVisible()
    }
  })

  test('editar y publicar el texto alternativo del logo PRO-21 persiste el cambio y valida contra el esquema zod real', async ({
    page,
  }) => {
    const marker = uniqueMarker('SITE_LOGO_ALT')
    await openCmsEntry(page, '/collections/site_settings/entries/content')
    await page.locator('input[type="text"], textarea').first().fill(marker)
    await publishEntry(page)

    const parsed = load(backup.readYamlRaw()) as { es: { logo_pro21_alt: string } }
    expect(parsed.es.logo_pro21_alt).toBe(marker)

    const settings = getSiteSettings('es')
    expect(settings.logo_pro21_alt).toBe(marker)
  })

  test('regresión: el logo PRO-21 publicado en el CMS se refleja en el Header de cualquier página pública', async ({
    page,
  }) => {
    const marker = uniqueMarker('SITE_LOGO_ALT_PUBLIC')
    await openCmsEntry(page, '/collections/site_settings/entries/content')
    await page.locator('input[type="text"], textarea').first().fill(marker)
    await publishEntry(page)

    await page.goto('/es')
    // El logo aparece dos veces (Header + Footer) — basta confirmar que al menos una
    // instancia refleja el nuevo texto alternativo publicado.
    await expect(page.getByAltText(marker).first()).toBeVisible()
  })

  test('regresión: el Footer muestra las 4 redes sociales (antes solo mostraba Instagram y TikTok-Lápiz, Facebook y TikTok-PRO21 eran campos huérfanos)', async ({
    page,
  }) => {
    await page.goto('/es')
    await page.waitForLoadState('networkidle')

    const settings = getSiteSettings('es')
    const footer = page.locator('footer')
    await expect(footer.locator(`a[href="${settings.social.facebook}"]`)).toBeVisible()
    await expect(footer.locator(`a[href="${settings.social.instagram}"]`)).toBeVisible()
    await expect(footer.locator(`a[href="${settings.social.tiktok_lapiz}"]`)).toBeVisible()
    await expect(footer.locator(`a[href="${settings.social.tiktok_pro21}"]`)).toBeVisible()
  })

  test('regresión: la barra de accesibilidad muestra textos distintos en ES y EN (antes era un literal idéntico en ambos idiomas)', async ({
    page,
  }) => {
    await page.goto('/es')
    await page.waitForLoadState('networkidle')
    const esText = await page.locator('text=Fundación PRO-21').first().textContent()

    await page.goto('/en')
    await page.waitForLoadState('networkidle')
    const enText = await page.locator('text=PRO-21').first().textContent()

    expect(esText).not.toBe(enText)
  })

  test('regresión: el blog usa el número real de WhatsApp del sitio, no un literal hardcodeado (colección nunca antes auditada)', async ({
    page,
  }) => {
    await page.goto('/es/blog')
    await page.waitForLoadState('networkidle')

    const settings = getSiteSettings('es')
    // El CTA propio del blog (app/[lang]/blog/page.tsx) — se identifica por su texto
    // exacto para no confundirlo con el botón flotante global ni con el link de
    // WhatsApp del Footer, que también usan waLink() legítimamente.
    const link = page.getByRole('link', { name: 'Contactar por WhatsApp', exact: true })
    await expect(link).toHaveAttribute('href', new RegExp(`wa\\.me/${settings.contact.whatsapp_number}`))
  })
})
