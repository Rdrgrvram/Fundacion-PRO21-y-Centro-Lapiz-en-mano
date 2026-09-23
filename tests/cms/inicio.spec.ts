import { test, expect } from '@playwright/test'
import { load } from 'js-yaml'
import { getHomeContent } from '@/lib/cms'
import { openCmsEntry, publishEntry, backupContentFile, uniqueMarker } from './helpers'

// Auditoría de la colección "home" (página Inicio) del CMS.
// Ver public/admin/config.yml líneas ~106-184 para el esquema de campos que este
// test valida contra la UI real del panel.

const HOME_YML = 'settings/home.yml'

// Los labels se ven en mayúsculas por CSS (text-transform), pero el DOM real
// conserva el texto tal como está escrito en config.yml — de ahí el matching
// insensible a mayúsculas en vez de comparar contra el texto visual renderizado.
const EXPECTED_SECTIONS = [
  'Hero (portada)',
  'Cifras rápidas',
  'Sección: Programas',
  'Tarjetas de programa',
  'Sección: Misión (resumen)',
  'Sección: Testimonios',
  'Valores destacados',
  'Sección: Vista previa del equipo',
  'CTA final',
]

// Campos sueltos (no crean su propia sección de "object") agregados al cerrar gaps de
// contenido hardcodeado encontrados en la auditoría de app/[lang]/page.tsx — cada uno
// vive dentro de una sección ya listada en EXPECTED_SECTIONS, por eso van en un test
// aparte en vez de esa lista.
const EXPECTED_NEW_FIELD_LABELS = [
  'Badge (ubicación)',
  'Texto del botón (compartido por las 3 tarjetas)',
  'Texto del botón', // team_preview.cta_label
  'Texto del botón de contacto', // cta.link_label
]

test.describe('CMS — Inicio (colección "home")', () => {
  let backup: ReturnType<typeof backupContentFile>

  test.beforeEach(() => {
    backup = backupContentFile(HOME_YML)
  })

  test.afterEach(() => {
    backup.restore()
  })

  test('el panel carga la entrada de Inicio vía backend local, sin caer al login real de GitHub', async ({
    page,
  }) => {
    await openCmsEntry(page, '/collections/home/entries/content')

    await expect(page.getByRole('button', { name: /iniciar sesión con github/i })).toHaveCount(0)
    await expect(page.getByText('Escribiendo en la colección 🏠 Inicio')).toBeVisible()
  })

  test('todas las secciones definidas en config.yml para "home" existen como campos editables', async ({
    page,
  }) => {
    await openCmsEntry(page, '/collections/home/entries/content')

    for (const section of EXPECTED_SECTIONS) {
      // .first(): el editor bilingüe muestra ES y EN lado a lado y ambos paneles
      // repiten el mismo label de campo (los labels no se traducen), así que cada
      // sección aparece dos veces en el DOM — basta con confirmar que existe.
      await expect(page.getByText(section, { exact: false }).first()).toBeVisible()
    }
  })

  test('editar y publicar el título del hero persiste el cambio en content/settings/home.yml', async ({
    page,
  }) => {
    const marker = uniqueMarker('HERO_TITLE')
    await openCmsEntry(page, '/collections/home/entries/content')

    // El primer input de texto del formulario es hero.title_line1 (orden confirmado
    // contra config.yml: hero.title_line1 es el primer campo de la primera sección).
    await page.locator('input[type="text"], textarea').first().fill(marker)
    await publishEntry(page)

    const parsed = load(backup.readYamlRaw()) as { es: { hero: { title_line1: string } } }
    expect(parsed.es.hero.title_line1).toBe(marker)
  })

  test('tras publicar, el archivo sigue siendo válido contra el esquema zod real (lib/cms.ts)', async ({
    page,
  }) => {
    const marker = uniqueMarker('HERO_TITLE_SCHEMA')
    await openCmsEntry(page, '/collections/home/entries/content')

    await page.locator('input[type="text"], textarea').first().fill(marker)
    await publishEntry(page)

    // getHomeContent lanza si el YAML no valida contra homeSchema — confirma que la
    // escritura del CMS produce contenido consumible por el sitio, no solo un YAML
    // sintácticamente válido.
    const content = getHomeContent('es')
    expect(content.hero.title_line1).toBe(marker)
  })

  test('el contenido publicado en el CMS se refleja en la página pública /es', async ({ page }) => {
    const marker = uniqueMarker('HERO_TITLE_SITE')
    await openCmsEntry(page, '/collections/home/entries/content')

    await page.locator('input[type="text"], textarea').first().fill(marker)
    await publishEntry(page)

    await page.goto('/es')
    await expect(page.getByText(marker)).toBeVisible()
  })

  test('los nuevos campos sueltos (hero.badge, cta_label x3) existen como campos editables', async ({
    page,
  }) => {
    await openCmsEntry(page, '/collections/home/entries/content')

    for (const label of EXPECTED_NEW_FIELD_LABELS) {
      await expect(page.getByText(label, { exact: false }).first()).toBeVisible()
    }
  })

  test('editar y publicar el título de Testimonios persiste el cambio y se refleja en /es', async ({
    page,
  }) => {
    const marker = uniqueMarker('TESTIMONIALS_TITLE')
    await openCmsEntry(page, '/collections/home/entries/content')

    // El input de testimonials_section.title no es el primer input del formulario, así
    // que no se puede usar .first() como en hero.title_line1 — se ubica escopeando por
    // el contenedor del objeto "Sección: Testimonios" (dos niveles arriba del label en
    // el DOM de Decap, confirmado en vivo: agrupa exactamente los 2 campos del objeto,
    // badge y title, para el panel ES). .first() en el heading toma el panel ES, ya que
    // el editor bilingüe renderiza la columna ES antes que la EN en el DOM.
    const heading = page.getByText('Sección: Testimonios', { exact: false }).first()
    const objectContainer = heading.locator('xpath=ancestor::*[self::div][2]')
    const titleInput = objectContainer.locator('input[type="text"], textarea').nth(1)
    await titleInput.fill(marker)

    await publishEntry(page)

    const parsed = load(backup.readYamlRaw()) as { es: { testimonials_section: { title: string } } }
    expect(parsed.es.testimonials_section.title).toBe(marker)

    await page.goto('/es')
    await expect(page.getByText(marker)).toBeVisible()
  })
})
