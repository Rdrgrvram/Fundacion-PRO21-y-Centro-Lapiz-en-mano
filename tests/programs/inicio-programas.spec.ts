import { test, expect } from '@playwright/test'
import fs from 'fs'
import yaml from 'js-yaml'
import matter from 'gray-matter'
import { programSlugs } from '../helpers/programs'

// specs/002-programa-desarrolla-tea — RF-004 y RF-007 (T013): Inicio con 4 programas y
// tarjetas de respaldo del CMS sin tope fijo, con selector de programa alimentado por la colección.
// La sección de programas se identifica con data-testid="programs-grid" (el menú y el pie
// también enlazan a los programas, así que buscar el enlace en toda la página no prueba la tarjeta).

const LANGS = ['es', 'en'] as const
const GRID = '[data-testid="programs-grid"]'

/** Busca en config.yml el primer objeto con ese `name` (los campos de Decap son objetos con name/widget). */
function findField(node: unknown, name: string, widget?: string): any {
  if (Array.isArray(node)) {
    for (const item of node) {
      const found = findField(item, name, widget)
      if (found) return found
    }
  } else if (node && typeof node === 'object') {
    const obj = node as Record<string, unknown>
    if (obj.name === name && (!widget || obj.widget === widget)) return obj
    for (const value of Object.values(obj)) {
      const found = findField(value, name, widget)
      if (found) return found
    }
  }
  return null
}

const config = () => yaml.load(fs.readFileSync('public/admin/config.yml', 'utf8'))

/** Programas que Inicio debe destacar: visibles y con home.featured distinto de false, en el orden del sitio. */
function featuredSlugs(): string[] {
  return programSlugs({ visibleOnly: true }).filter((slug) => {
    const { data } = matter(fs.readFileSync(`content/programs/${slug}.es.md`, 'utf8'), {})
    return data.home?.featured !== false
  })
}

test.describe('Inicio: sección de programas', () => {
  for (const lang of LANGS) {
    test(`/${lang}: una tarjeta por programa destacado, en el orden del sitio, cada una con su enlace`, async ({ page }) => {
      await page.goto(`/${lang}`)
      const expected = featuredSlugs()
      expect(expected, 'Desarrolla TEA se destaca').toContain('desarrolla-tea')
      const hrefs = await page.locator(`${GRID} a[href^="/${lang}/"]`).evaluateAll((links) => links.map((a) => a.getAttribute('href')))
      expect(hrefs).toEqual(expected.map((slug) => `/${lang}/${slug}`))
      expect(expected.length).toBeGreaterThanOrEqual(4)
      expect(hrefs[3], 'Desarrolla TEA es la 4.ª tarjeta').toBe(`/${lang}/desarrolla-tea`)
    })

    test(`/${lang}: la cifra de programas activos es la cantidad de programas visibles`, async ({ page }) => {
      await page.goto(`/${lang}`)
      const n = programSlugs({ visibleOnly: true }).length
      const label = lang === 'es' ? 'programas activos' : 'active programs'
      await expect(page.locator('div', { hasText: new RegExp(`^\\s*${n}\\s*${label}\\s*$`, 'i') }).first()).toBeVisible()
    })

    test(`/${lang}: el subtítulo de la sección no dice "tres"`, async ({ request }) => {
      const html = await (await request.get(`/${lang}`)).text()
      expect(html).not.toMatch(/Tres programas|Three (specialized )?programs/i)
    })
  }

  // 1 columna en celular, 2×2 en tablet y laptop chica (hasta 1279px), 4 desde xl (1280px); sin tarjeta huérfana ni scroll horizontal.
  const VIEWPORTS = [
    { width: 375, columns: 1 },
    { width: 768, columns: 2 },
    { width: 1024, columns: 2 }, // ancho de mayor riesgo: con 4 columnas el botón se partía en 2 líneas; sigue 2×2 hasta xl
    { width: 1280, columns: 4 },
  ]
  for (const lang of LANGS) {
    for (const { width, columns } of VIEWPORTS) {
      test(`/${lang} a ${width}px: ${columns} columna(s), sin desbordamiento horizontal`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 })
        await page.goto(`/${lang}`)
        const cards = page.locator(`${GRID} > *`)
        await expect(cards).toHaveCount(featuredSlugs().length)
        const lefts = await cards.evaluateAll((els) => els.map((el) => Math.round(el.getBoundingClientRect().left)))
        expect(new Set(lefts).size, `columnas distintas (lefts: ${lefts})`).toBe(columns)
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
        expect(overflow, 'scroll horizontal').toBeLessThanOrEqual(0)
      })
    }
  }
})

test.describe('CMS: tarjetas de programa de Inicio', () => {
  test('las tarjetas de respaldo no fijan un número de tarjetas', () => {
    const cards = findField(config(), 'cards', 'list')
    expect(cards, 'campo cards').not.toBeNull()
    expect(cards.min).toBeUndefined()
    expect(cards.max).toBeUndefined()
  })

  // Es un select y no un relation a propósito: probado el 11-oct-2026, un relation sobre `programs` hace que el
  // panel marque "CAMBIOS NO GUARDADOS" al abrir Inicio sin editar nada (con select vuelve a "GUARDADOS"; lo
  // cubre tests/cms/desarrolla-tea-panel.spec.ts). Como la lista queda escrita a mano, este test evita que se desalinee.
  test('el select de programa de las tarjetas ofrece el slug de cada programa', () => {
    const cards = findField(config(), 'cards', 'list')
    const slug = cards.fields.find((f: any) => f.name === 'slug')
    expect(slug.widget).toBe('select')
    expect([...slug.options].sort()).toEqual(programSlugs().sort())
  })
})
