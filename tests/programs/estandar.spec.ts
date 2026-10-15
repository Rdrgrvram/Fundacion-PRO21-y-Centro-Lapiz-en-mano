import { test, expect, type Page } from '@playwright/test'
import { programSlugs } from '../helpers/programs'

// ESTÁNDAR ÚNICO de página de programa (docs/DESIGN_STANDARD.md §Páginas de programa). Todos los programas visibles
// comparten el mismo esqueleto y las mismas reglas de presentación; un programa nuevo entra solo en esta prueba
// (la lista sale de content/programs). Si falla para uno, esa página se aparta del estándar.

const LANGS = ['es', 'en'] as const

async function secciones(page: Page) {
  // Todas las secciones del cuerpo de la página (el hero y el CTA final llevan fondo de color y se descartan).
  return page.evaluate(() =>
    [...document.querySelectorAll<HTMLElement>('main section')].map((s) => ({
      id: s.id,
      fondo: getComputedStyle(s).backgroundColor,
      color: getComputedStyle(s).backgroundImage !== 'none',
      h2: s.querySelector('h2')?.textContent?.trim() ?? '',
    }))
  )
}

for (const lang of LANGS) {
  for (const slug of programSlugs()) {
    test.describe(`/${lang}/${slug}`, () => {
      test('mismo esqueleto: hero, 4 datos clave, secciones, pestañas, pasos y cierre', async ({ page }) => {
        await page.goto(`/${lang}/${slug}`, { waitUntil: 'networkidle' })
        await expect(page.locator('h1')).toHaveCount(1)
        // 4 datos clave (stats), cada uno con su número grande en la fuente de titulares.
        const datos = page.locator('section:has(span.font-display.text-4xl)').first().locator('span.font-display')
        await expect(datos, 'la fila de datos clave tiene 4 cifras').toHaveCount(4)
        // Sección 1 (tarjetas) y sección 2 (pestañas con roles ARIA).
        await expect(page.locator('#section-1 h2')).toHaveCount(1)
        await expect(page.locator('#section-2 [role="tablist"]')).toHaveCount(1)
        expect(await page.locator('#section-2 [role="tab"]').count()).toBeGreaterThanOrEqual(2)
        // Pasos de inscripción: nunca más de 6 a la vista, el resto tras «ver los N pasos restantes».
        const pasos = page.locator('section:has(h2) >> xpath=self::section[.//div[contains(@class,"rounded-full") and contains(@class,"font-extrabold")]]').last()
        const visibles = await pasos.locator(':scope > div > div.grid > div').count()
        expect(visibles, 'debe haber pasos de inscripción').toBeGreaterThanOrEqual(3)
        expect(visibles, 'pasos de inscripción visibles').toBeLessThanOrEqual(6)
        // Si hay más de 6, el resto está plegado tras «Ver los N pasos restantes» y se puede abrir.
        const plegado = pasos.locator('details')
        if ((await plegado.count()) > 0) {
          await expect(plegado.locator('summary')).toContainText(/\d+/)
          const antes = await plegado.locator('div.grid > div').count()
          await plegado.locator('summary').click()
          await expect(plegado.locator('div.grid > div').first()).toBeVisible()
          expect(antes).toBeGreaterThan(0)
        }
        // Un solo CTA de cierre con WhatsApp.
        await expect(page.locator('a[href*="wa.me/59170106276"]').first()).toBeVisible()
      })

      test('las secciones alternan fondo: dos vecinas nunca tienen el mismo', async ({ page }) => {
        await page.goto(`/${lang}/${slug}`, { waitUntil: 'networkidle' })
        // Secciones de contenido en orden: sin degradado de color (hero y CTA final).
        const cuerpo = (await secciones(page)).filter((s) => !s.color)
        expect(cuerpo.length, 'debe haber al menos 4 secciones de contenido para comprobar').toBeGreaterThanOrEqual(4)
        for (let i = 1; i < cuerpo.length; i++) {
          // La fila de datos clave es blanca y puede tocar a la primera sección: solo se compara desde la sección 1.
          if (!cuerpo[i].id && !cuerpo[i].h2) continue
          if (cuerpo[i - 1].id === '' && cuerpo[i - 1].h2 === '' ) continue
          expect(cuerpo[i].fondo, `«${cuerpo[i - 1].h2 || cuerpo[i - 1].id}» y «${cuerpo[i].h2 || cuerpo[i].id}» no deben tener el mismo fondo`).not.toBe(cuerpo[i - 1].fondo)
        }
      })

      test('las áreas se muestran como lista, sin recortar la descripción', async ({ page }) => {
        await page.goto(`/${lang}/${slug}`, { waitUntil: 'networkidle' })
        await expect(page.locator('main [class*="line-clamp"]'), 'ninguna descripción del programa se recorta').toHaveCount(0)
      })
    })
  }
}

