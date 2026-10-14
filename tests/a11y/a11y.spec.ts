import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { programRoutes } from '../helpers/programs'

// RF-011 — contraste WCAG AA, áreas táctiles ≥ 44px y nombre accesible = texto visible, en móvil (375px), 12 rutas × es/en.
// También `heading-order` (buena práctica de axe): la jerarquía de encabezados no salta niveles (h1→h3/h4).
// Si falla, el mensaje lista los nodos exactos para corregirlos (solo con tokens existentes:
// memory/constitution.md, Art. V).
const ROUTES = [
  '',
  '/quienes-somos',
  ...programRoutes(),
  '/equipo',
  '/impacto',
  '/colabora',
  '/familias',
  '/blog',
  '/blog/bienvenida',
  '/contacto',
]
const LANGS = ['es', 'en'] as const

test.use({ viewport: { width: 375, height: 812 } })

/** Recorre la página para activar imágenes y secciones diferidas antes de medir. */
async function prepare(page: import('@playwright/test').Page, url: string) {
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 40))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(300)
}

for (const lang of LANGS) {
  for (const route of ROUTES) {
    const url = `/${lang}${route}`

    test(`${url}: contraste de texto AA`, async ({ page }) => {
      await prepare(page, url)
      const results = await new AxeBuilder({ page }).withRules(['color-contrast']).analyze()
      const nodes = results.violations.flatMap((v) =>
        v.nodes.map((n) => {
          const d: any = n.any[0]?.data ?? {}
          return `${n.target.join(' ')}  [${d.fgColor} sobre ${d.bgColor}, ratio ${d.contrastRatio}]`
        })
      )
      expect(nodes, `Contraste insuficiente en ${url}`).toEqual([])
    })

    test(`${url}: jerarquía de encabezados sin saltos`, async ({ page }) => {
      await prepare(page, url)
      const results = await new AxeBuilder({ page }).withRules(['heading-order']).analyze()
      const nodes = results.violations.flatMap((v) => v.nodes.map((n) => `${n.target.join(' ')}  [${n.any[0]?.message}]`))
      expect(nodes, `Encabezados que saltan nivel en ${url}`).toEqual([])
    })

    test(`${url}: nombre accesible contiene el texto visible (WCAG 2.5.3)`, async ({ page }) => {
      await prepare(page, url)
      const results = await new AxeBuilder({ page }).withRules(['label-content-name-mismatch']).analyze()
      const nodes = results.violations.flatMap((v) => v.nodes.map((n) => `${v.id}: ${n.target.join(' ')}`))
      expect(nodes, `Nombre accesible ≠ texto visible en ${url}`).toEqual([])
    })

    test(`${url}: áreas táctiles ≥ 44px`, async ({ page }) => {
      await prepare(page, url)
      const small = await page.evaluate(() => {
        const MIN = 44
        const sel = 'a[href], button, input:not([type=hidden]), select, textarea, summary, [role=button]'
        const out: string[] = []
        for (const el of document.querySelectorAll<HTMLElement>(sel)) {
          const cs = getComputedStyle(el)
          if (cs.visibility === 'hidden' || cs.display === 'none') continue
          // Enlaces dentro de un párrafo de texto: exentos (WCAG 2.5.8, excepción "inline").
          if (cs.display === 'inline' && el.closest('p, li, span, h1, h2, h3, h4, label')) continue
          // Campos ocultos para humanos (honeypot) y elementos fuera de pantalla.
          if (el.closest('[aria-hidden="true"]') && el.tabIndex < 0) continue
          const r = el.getBoundingClientRect()
          if (r.width === 0 || r.height === 0) continue
          if (r.width < MIN || r.height < MIN) {
            const label = (el.innerText || el.getAttribute('aria-label') || el.getAttribute('href') || el.tagName).trim().slice(0, 28)
            out.push(`${el.tagName.toLowerCase()} "${label}" ${Math.round(r.width)}x${Math.round(r.height)}`)
          }
        }
        return out
      })
      expect(small, `Áreas táctiles < 44px en ${url}`).toEqual([])
    })
  }
}
