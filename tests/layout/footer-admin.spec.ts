import { test, expect } from '@playwright/test'

// Acceso discreto al panel en el pie de página: está donde lo encuentra quien edita, no en el menú que ve el público,
// y no se le ofrece a los buscadores.
for (const [lang, texto] of [
  ['es', 'Acceso del equipo'],
  ['en', 'Team access'],
] as const) {
  test(`/${lang}: el pie ofrece "${texto}" hacia /admin/ y el menú principal no`, async ({ page }) => {
    await page.goto(`/${lang}`, { waitUntil: 'domcontentloaded' })
    const enlace = page.locator('footer').getByRole('link', { name: texto })
    await expect(enlace).toHaveAttribute('href', '/admin/')
    await expect(enlace).toHaveAttribute('rel', /nofollow/)
    const caja = (await enlace.boundingBox())!
    expect(caja.height, 'área táctil ≥ 44 px').toBeGreaterThanOrEqual(44)
    await expect(page.locator('header').getByRole('link', { name: texto })).toHaveCount(0)
  })
}

test('robots.txt sigue excluyendo /admin/ de los buscadores', async ({ request }) => {
  const robots = await (await request.get('/robots.txt')).text()
  expect(robots).toMatch(/Disallow:\s*\/admin\//)
})
