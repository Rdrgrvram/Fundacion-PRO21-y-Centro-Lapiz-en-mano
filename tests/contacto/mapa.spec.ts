import { test, expect } from '@playwright/test'

// Mapa incrustado de Contacto (issue #71): no carga hasta que la persona lo pide.
for (const [lang, ver, abrir] of [
  ['es', 'Ver mapa', 'Abrir en Google Maps'],
  ['en', 'Show map', 'Open in Google Maps'],
] as const) {
  test(`/${lang}/contacto: el mapa solo se incrusta al pulsar "${ver}"`, async ({ page }) => {
    await page.goto(`/${lang}/contacto`, { waitUntil: 'networkidle' })
    await expect(page.locator('iframe[src*="google.com/maps"]')).toHaveCount(0)

    await page.getByRole('button', { name: new RegExp(ver, 'i') }).click()
    const mapa = page.locator('iframe[src*="google.com/maps"]')
    await expect(mapa).toHaveCount(1)
    await expect(mapa).toHaveAttribute('src', /output=embed/)
    await expect(mapa).toHaveAttribute('src', /Luis%20Espinal/)
    expect(await mapa.getAttribute('title')).toBeTruthy()

    // El enlace para abrir Google Maps sigue disponible.
    await expect(page.getByRole('link', { name: new RegExp(abrir, 'i') })).toBeVisible()
  })
}
