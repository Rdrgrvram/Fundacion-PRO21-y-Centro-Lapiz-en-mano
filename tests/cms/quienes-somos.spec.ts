import { test, expect } from '@playwright/test'
import { load } from 'js-yaml'
import { getAboutContent } from '@/lib/cms'
import { openCmsEntry, publishEntry, backupContentFile, uniqueMarker } from './helpers'

// Auditoría de la colección "about" (página Quiénes Somos) del CMS.
// Ver public/admin/config.yml líneas ~196-292 para el esquema de campos que este
// test valida contra la UI real del panel.

const ABOUT_YML = 'settings/about.yml'

const EXPECTED_SECTIONS = [
  'Hero',
  'Tarjetas de identidad',
  'Sección: Misión/Visión/Objetivo',
  'Tarjetas de Misión/Visión/Objetivo',
  'Sección: Valores',
  'Valores institucionales',
  'Sección: Línea de tiempo',
  'Hitos de la línea de tiempo',
  'Sección: Vista previa del equipo',
  'CTA final',
]

// Agregados al cerrar gaps de contenido hardcodeado encontrados en la auditoría de
// app/[lang]/quienes-somos/page.tsx: el botón de "conocer equipo" y los 2 botones
// del CTA final no eran editables pese a que el resto de la página sí lo era.
const EXPECTED_NEW_FIELD_LABELS = [
  'Texto del botón', // team_section.cta_label
  'Texto del botón principal', // cta.cta_label
  'Texto del botón secundario', // cta.secondary_label
]

test.describe('CMS — Quiénes Somos (colección "about")', () => {
  let backup: ReturnType<typeof backupContentFile>

  test.beforeEach(() => {
    backup = backupContentFile(ABOUT_YML)
  })

  test.afterEach(() => {
    backup.restore()
  })

  test('el panel carga la entrada de Quiénes Somos vía backend local, sin caer al login real de GitHub', async ({
    page,
  }) => {
    await openCmsEntry(page, '/collections/about/entries/content')

    await expect(page.getByRole('button', { name: /iniciar sesión con github/i })).toHaveCount(0)
    await expect(page.getByText('Escribiendo en la colección 🏛️ Quiénes Somos')).toBeVisible()
  })

  test('todas las secciones definidas en config.yml para "about" existen como campos editables', async ({
    page,
  }) => {
    await openCmsEntry(page, '/collections/about/entries/content')

    for (const section of EXPECTED_SECTIONS) {
      await expect(page.getByText(section, { exact: true }).first()).toBeVisible()
    }
  })

  test('editar y publicar el badge del hero persiste el cambio en content/settings/about.yml', async ({
    page,
  }) => {
    const marker = uniqueMarker('HERO_BADGE')
    await openCmsEntry(page, '/collections/about/entries/content')

    // hero.badge es el primer campo de la colección (config.yml: hero.fields[0]).
    await page.locator('input[type="text"], textarea').first().fill(marker)
    await publishEntry(page)

    const parsed = load(backup.readYamlRaw()) as { es: { hero: { badge: string } } }
    expect(parsed.es.hero.badge).toBe(marker)
  })

  test('tras publicar, el archivo sigue siendo válido contra el esquema zod real (lib/cms.ts)', async ({
    page,
  }) => {
    const marker = uniqueMarker('HERO_BADGE_SCHEMA')
    await openCmsEntry(page, '/collections/about/entries/content')

    await page.locator('input[type="text"], textarea').first().fill(marker)
    await publishEntry(page)

    const content = getAboutContent('es')
    expect(content.hero.badge).toBe(marker)
  })

  test('el contenido publicado en el CMS se refleja en la página pública /es/quienes-somos', async ({
    page,
  }) => {
    const marker = uniqueMarker('HERO_BADGE_SITE')
    await openCmsEntry(page, '/collections/about/entries/content')

    await page.locator('input[type="text"], textarea').first().fill(marker)
    await publishEntry(page)

    await page.goto('/es/quienes-somos')
    await expect(page.getByText(marker)).toBeVisible()
  })

  test('los nuevos campos sueltos (team_section.cta_label, cta.cta_label, cta.secondary_label) existen como campos editables', async ({
    page,
  }) => {
    await openCmsEntry(page, '/collections/about/entries/content')

    for (const label of EXPECTED_NEW_FIELD_LABELS) {
      await expect(page.getByText(label, { exact: false }).first()).toBeVisible()
    }
  })

  test('editar y publicar el botón secundario del CTA final persiste el cambio y se refleja en /es/quienes-somos', async ({
    page,
  }) => {
    const marker = uniqueMarker('CTA_SECONDARY_LABEL')
    await openCmsEntry(page, '/collections/about/entries/content')

    // Label único en toda la página, con asociación label/input real de Decap
    // (confirmado en vivo: <label for="X"> + <input id="X">) — .first() toma el
    // panel ES, ya que el editor bilingüe renderiza esa columna antes que la EN.
    await page.getByLabel('Texto del botón secundario', { exact: true }).first().fill(marker)
    await publishEntry(page)

    const parsed = load(backup.readYamlRaw()) as { es: { cta: { secondary_label: string } } }
    expect(parsed.es.cta.secondary_label).toBe(marker)

    await page.goto('/es/quienes-somos')
    await expect(page.getByText(marker)).toBeVisible()
  })
})
