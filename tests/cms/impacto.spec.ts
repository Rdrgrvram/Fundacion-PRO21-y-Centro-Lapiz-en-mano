import { test, expect } from '@playwright/test'
import { load } from 'js-yaml'
import { getImpactContent } from '@/lib/cms'
import { openCmsEntry, publishEntry, backupContentFile, uniqueMarker } from './helpers'

// Auditoría de la colección "impact" (página Impacto) del CMS.
// Ver public/admin/config.yml líneas ~582-687 para el esquema de campos que este
// test valida contra la UI real del panel.

const IMPACT_YML = 'settings/impact.yml'

const EXPECTED_SECTIONS = [
  'Hero',
  'Sección: Cifras',
  'Cifras',
  'Sección: Testimonios',
  'Sección: Informes',
  'Informes anuales',
  'Desglose de informes (uso de fondos)',
  'Sección: Medios',
  'Menciones en medios',
  'Sección: Galería',
  'Categorías de la galería',
  'Fotos de la galería',
  'CTA final',
]

// Agregados al cerrar gaps de contenido hardcodeado encontrados en la auditoría de
// app/[lang]/impacto/ImpactoPageClient.tsx: el label de la columna de informes, los
// botones de descarga/solicitud y los 2 botones del CTA final no eran editables pese
// a que el resto de la página sí lo era. También se agregó "category" a cada foto de
// la galería (antes los botones de filtro no filtraban nada — bug funcional real).
const EXPECTED_NEW_FIELD_LABELS = [
  'Etiqueta de la columna de informes', // reports_section.list_label
  'Texto del botón de descarga (cuando hay PDF)', // reports_section.download_label
  'Texto del botón de solicitud (cuando no hay PDF)', // reports_section.request_label
  'Categoría', // gallery[].category
  'Texto del botón principal', // cta.cta_label
  'Texto del botón secundario (WhatsApp)', // cta.secondary_label
]

test.describe('CMS — Impacto (colección "impact")', () => {
  let backup: ReturnType<typeof backupContentFile>

  test.beforeEach(() => {
    backup = backupContentFile(IMPACT_YML)
  })

  test.afterEach(() => {
    backup.restore()
  })

  test('el panel carga la entrada de Impacto vía backend local, sin caer al login real de GitHub', async ({
    page,
  }) => {
    await openCmsEntry(page, '/collections/impact/entries/content')

    await expect(page.getByRole('button', { name: /iniciar sesión con github/i })).toHaveCount(0)
  })

  test('todas las secciones definidas en config.yml para "impact" existen como campos editables', async ({
    page,
  }) => {
    await openCmsEntry(page, '/collections/impact/entries/content')
    for (const label of EXPECTED_SECTIONS) {
      await expect(page.getByText(label, { exact: false }).first()).toBeVisible()
    }
  })

  test('los nuevos campos sueltos (reports_section.list_label/download_label/request_label, gallery.category, cta.cta_label/secondary_label) existen como campos editables', async ({
    page,
  }) => {
    await openCmsEntry(page, '/collections/impact/entries/content')
    for (const label of EXPECTED_NEW_FIELD_LABELS) {
      await expect(page.getByText(label, { exact: false }).first()).toBeVisible()
    }
  })

  test('editar y publicar el título de la sección de cifras persiste el cambio en content/settings/impact.yml', async ({
    page,
  }) => {
    const marker = uniqueMarker('IMPACT_STATS_TITLE')
    await openCmsEntry(page, '/collections/impact/entries/content')
    // El hero no tiene ningún campo con label exacto "Título" (usa "Título — línea 1"/
    // "línea 2"), así que la primera coincidencia exacta de "Título" en el panel es la
    // de stats_section — confirmado en vivo con un sondeo antes de fijar este selector.
    await page
      .getByText('Título', { exact: true })
      .first()
      .locator('xpath=following::input[1]')
      .fill(marker)
    await publishEntry(page)

    const parsed = load(backup.readYamlRaw()) as { es: { stats_section: { title: string } } }
    expect(parsed.es.stats_section.title).toBe(marker)
  })

  test('tras publicar, el archivo sigue siendo válido contra el esquema zod real (lib/cms.ts)', async ({
    page,
  }) => {
    const marker = uniqueMarker('IMPACT_HERO_BADGE')
    await openCmsEntry(page, '/collections/impact/entries/content')
    await page.locator('input[type="text"], textarea').first().fill(marker)
    await publishEntry(page)

    const content = getImpactContent('es')
    expect(content.hero.badge).toBe(marker)
  })

  test('editar y publicar el texto del botón principal del CTA final persiste el cambio y se refleja en /es/impacto', async ({
    page,
  }) => {
    const marker = uniqueMarker('IMPACT_CTA_LABEL')
    await openCmsEntry(page, '/collections/impact/entries/content')
    await page
      .locator('label', { hasText: 'Texto del botón principal' })
      .locator('xpath=following::input[1]')
      .first()
      .fill(marker)
    await publishEntry(page)

    await page.goto('/es/impacto')
    await expect(page.getByText(marker)).toBeVisible()
  })

  test('el filtro de categoría de la galería sí filtra las fotos (regresión: antes los botones no tenían efecto)', async ({
    page,
  }) => {
    await page.goto('/es/impacto')
    await page.waitForLoadState('networkidle')

    const gallerySection = page.locator('section', { has: page.getByText('Momentos que nos inspiran') })
    const allPhotosCount = await gallerySection.locator('img').count()
    expect(allPhotosCount).toBeGreaterThan(0)

    // "Aula Wawitas" es la 3ª categoría (índice 2, tras "Todos"/"Mi Escuelita") y solo
    // tiene 4 fotos de las 8 totales — ver content/settings/impact.yml.
    await gallerySection.getByRole('button', { name: 'Aula Wawitas', exact: true }).click()
    await expect(async () => {
      const filteredCount = await gallerySection.locator('img').count()
      expect(filteredCount).toBe(4)
      expect(filteredCount).toBeLessThan(allPhotosCount)
    }).toPass({ timeout: 5000 })
  })
})
