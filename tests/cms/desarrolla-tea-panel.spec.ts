import { test, expect } from '@playwright/test'
import matter from 'gray-matter'
import { load } from 'js-yaml'
import { getHomeContent, getProgramBySlug } from '@/lib/cms'
import { openCmsEntry, publishEntry, backupContentFile, uniqueMarker } from './helpers'

// specs/002-programa-desarrolla-tea — T051 (RF-007, R5). Panel real contra el backend local.
// Edita y restaura archivos reales de content/ (la suite corre en serie).

const SLUG = 'desarrolla-tea'

test.describe('CMS — Programa Desarrolla TEA', () => {
  // El formulario de este programa es el más grande del panel (decenas de sub-puntos): editar y publicar tarda ≈ 30 s,
  // justo el límite por defecto, y fallaba de forma intermitente con la máquina cargada.
  test.describe.configure({ timeout: 90_000 })

  let es: ReturnType<typeof backupContentFile>
  let en: ReturnType<typeof backupContentFile>

  test.beforeEach(() => {
    es = backupContentFile(`programs/${SLUG}.es.md`)
    en = backupContentFile(`programs/${SLUG}.en.md`)
  })
  test.afterEach(() => {
    es.restore()
    en.restore()
  })

  test('editar y publicar el nombre persiste, se refleja en el sitio y conserva los sub-puntos de las áreas', async ({ page }) => {
    const marker = uniqueMarker('DESARROLLA_TEA')
    await openCmsEntry(page, `/collections/programs/entries/${SLUG}`)
    await expect(page.getByText(/Escribiendo en la colección.*Programas/)).toBeVisible()
    // El primer input de texto es `title` (i18n: duplicate → se escribe en es y en).
    await page.locator('input[type="text"], textarea').first().fill(marker)
    await publishEntry(page)

    // El archivo sigue siendo válido contra el esquema zod real y no perdió contenido al re-serializarse.
    for (const lang of ['es', 'en'] as const) {
      const program = getProgramBySlug(SLUG, lang)!
      expect(program.title, lang).toBe(marker)
      expect(program.section_3?.items.map((i) => i.items?.length), `sub-puntos ${lang}`).toEqual([11, 11, 6, 11, 12, 10, 7, 9])
      expect(program.photos_authorized, lang).toBe(false)
      // Decap borra los campos que no conoce: sin el campo `layout` en config.yml se perdía el acordeón al guardar
      // y las tarjetas volvían a recortar las descripciones a 2-3 líneas.
      expect(program.section_1.layout, `section_1.layout ${lang}`).toBe('acordeón')
      expect(program.section_3?.layout, `section_3.layout ${lang}`).toBe('acordeón')
      // T034: el Bloque 4 (objetivos, beneficiarios, articulación) sobrevive al re-serializado del panel.
      expect(program.section_4?.items.map((i) => i.items?.length), `section_4 ${lang}`).toEqual([11, 6, 10])
      expect(program.section_4?.layout, `section_4.layout ${lang}`).toBe('acordeón')
    }

    await page.goto(`/es/${SLUG}`)
    await expect(page.getByRole('heading', { level: 1 })).toContainText(marker)
  })

  test('editar un sub-punto y publicar cambia solo ese texto en es y deja intacto el inglés', async ({ page }) => {
    const marker = uniqueMarker('SUBPUNTO')
    const before = matter(en.readYamlRaw(), {}).data.section_3.items[0].items as string[]
    const beforeEs = matter(es.readYamlRaw(), {}).data.section_3.items[0].items as string[]
    await openCmsEntry(page, `/collections/programs/entries/${SLUG}`)
    // .first(): el editor bilingüe repite los encabezados en las columnas ES y EN; se trabaja la ES.
    const areas = page.getByText('8 ítems', { exact: true }).first()
    await areas.getByRole('button', { name: 'Expand' }).click()
    // Primera área (Psicomotricidad): su lista de 4 sub-puntos arranca colapsada; es la primera "11 sub-puntos (opcional)" (Psicomotricidad)
    // que aparece después del encabezado "8 ítems" en el documento.
    await areas.locator('xpath=following::*[text()[normalize-space()="11 sub-puntos (opcional)"]][1]').getByRole('button', { name: 'Expand' }).click()
    await page.locator('input[value="Motricidad gruesa"]').first().fill(marker)
    await publishEntry(page)

    const esItems = getProgramBySlug(SLUG, 'es')!.section_3!.items[0].items!
    const enItems = getProgramBySlug(SLUG, 'en')!.section_3!.items[0].items!
    expect(esItems[0]).toBe(marker)
    expect(esItems.slice(1), 'los demás puntos del área no cambian').toEqual(beforeEs.slice(1))
    expect(esItems.length).toBe(11)
    expect(enItems, 'el inglés no se toca (i18n: true, traducción independiente)').toEqual(before)
    expect(getProgramBySlug(SLUG, 'es')!.section_3!.items.map((i) => i.items?.length)).toEqual([11, 11, 6, 11, 12, 10, 7, 9])
  })

  test('los sub-puntos de "Áreas de Intervención" existen como campo editable en el panel', async ({ page }) => {
    await openCmsEntry(page, `/collections/programs/entries/${SLUG}`)
    // La lista de las 8 áreas arranca colapsada ("8 ítems" + botón Expand): se expande y se comprueba el campo
    // "Sub-puntos" y los puntos reales de la primera área. `>> visible=true`: los ítems colapsados lo repiten ocultos.
    await page.getByText('8 ítems', { exact: true }).getByRole('button', { name: 'Expand' }).click()
    await expect(page.locator('text=Sub-puntos (opcional) >> visible=true').first()).toBeVisible()
    // El punto real del documento está cargado en el formulario (los ítems individuales siguen colapsados).
    await expect(page.locator('input[value="Motricidad gruesa"]').first()).toBeAttached()
  })
})

test.describe('CMS — Inicio con 4 programas', () => {
  let backup: ReturnType<typeof backupContentFile>
  test.beforeEach(() => { backup = backupContentFile('settings/home.yml') })
  test.afterEach(() => { backup.restore() })

  const slugs = (raw: string) => {
    const doc = load(raw) as any
    return (['es', 'en'] as const).map((lang) => doc[lang].programs_teaser.cards.map((c: any) => c.slug))
  }

  test('abrir Inicio sin tocar nada no deja el panel en "CAMBIOS NO GUARDADOS" (R5)', async ({ page }) => {
    await openCmsEntry(page, '/collections/home/entries/content')
    // Margen para que el widget termine de resolver sus campos: el fantasma aparecía tras ese montaje.
    await page.waitForTimeout(3000)
    await expect(page.getByText('CAMBIOS GUARDADOS')).toBeVisible()
    await expect(page.getByText('CAMBIOS NO GUARDADOS')).toHaveCount(0)
  })

  test('elegir Desarrolla TEA en una tarjeta de respaldo, publicar y reabrir lo conserva', async ({ page }) => {
    await openCmsEntry(page, '/collections/home/entries/content')
    const cards = page.getByText('3 tarjetas de programa', { exact: true }).first() // columna ES
    await cards.getByRole('button', { name: 'Expand' }).click()
    // Primera tarjeta (panel ES): el primer combobox después del encabezado es su select de programa.
    const select = cards.locator('xpath=following::input[@role="combobox"][1]')
    await select.click()
    await page.getByRole('option', { name: 'desarrolla-tea', exact: true }).click()
    await publishEntry(page)

    const [esSlugs, enSlugs] = slugs(backup.readYamlRaw())
    expect(esSlugs[0]).toBe('desarrolla-tea')
    expect(esSlugs.slice(1)).toEqual(['aula-wawitas', 'pasos-firmes'])
    expect(enSlugs, 'el inglés no se toca').toEqual(['mi-escuelita-down', 'aula-wawitas', 'pasos-firmes'])
    expect(getHomeContent('es').programs_teaser.cards[0].slug).toBe('desarrolla-tea')

    await openCmsEntry(page, '/collections/home/entries/content')
    await page.waitForTimeout(3000)
    await expect(page.getByText('CAMBIOS NO GUARDADOS')).toHaveCount(0)
    await expect(page.getByText('desarrolla-tea', { exact: true }).first()).toBeAttached()
  })

  test('guardar cambiando otro campo conserva los slugs de las tarjetas en es y en', async ({ page }) => {
    const before = slugs(backup.readYamlRaw())
    expect(before[0].length, 'hay tarjetas de respaldo').toBeGreaterThan(0)

    const marker = uniqueMarker('HOME_SLUGS')
    await openCmsEntry(page, '/collections/home/entries/content')
    await page.locator('input[type="text"], textarea').first().fill(marker)
    await publishEntry(page)

    expect(slugs(backup.readYamlRaw())).toEqual(before)
    expect(getHomeContent('es').hero.title_line1).toBe(marker)
  })
})
