import { test, expect, type Page } from '@playwright/test'

// La leyenda de cada foto de galería se ve siempre (antes solo aparecía al pasar el mouse y en el celular no existía).
test.use({ viewport: { width: 375, height: 812 } })

async function comprobar(page: Page, url: string) {
  await page.goto(url, { waitUntil: 'networkidle' })
  // Recorre la página para activar las imágenes diferidas.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 40))
    }
  })
  const figuras = page.locator('figure:has(figcaption[aria-hidden="true"])')
  const n = await figuras.count()
  expect(n, `debe haber fichas de galería en ${url}`).toBeGreaterThan(0)
  for (let i = 0; i < n; i++) {
    const figura = figuras.nth(i)
    const alt = (await figura.locator('img').first().getAttribute('alt')) ?? ''
    const leyenda = figura.locator('figcaption')
    await expect(leyenda).toBeVisible()
    await expect(leyenda).toHaveText(alt)
  }
}

test('Mi Escuelita Down (fotos autorizadas): todas las fichas muestran su leyenda en el celular', async ({ page }) => {
  await comprobar(page, '/es/mi-escuelita-down')
})

test('Impacto: todas las fichas de la galería muestran su leyenda en el celular', async ({ page }) => {
  await comprobar(page, '/es/impacto')
})
