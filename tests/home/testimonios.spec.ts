import { test, expect } from '@playwright/test'

// Inicio: banda de testimonios con una cita protagonista y las demás como chips. Todas las citas están en el HTML.
for (const [lang, completa] of [
  ['es', 'Leer completa'],
  ['en', 'Read in full'],
] as const) {
  test(`/${lang}: una cita visible, las demás en el HTML y los chips las cambian`, async ({ page }) => {
    await page.goto(`/${lang}`, { waitUntil: 'networkidle' })
    const citas = page.locator('blockquote[id^="cita-"]')
    const n = await citas.count()
    expect(n, 'hay testimonios en Inicio').toBeGreaterThanOrEqual(2)
    await expect(citas.filter({ visible: true })).toHaveCount(1)
    const primera = await citas.filter({ visible: true }).first().getAttribute('id')

    const chips = page.getByRole('group', { name: /elegir testimonio|choose testimonial/i }).getByRole('button')
    await chips.nth(1).click()
    await expect(chips.nth(1)).toHaveAttribute('aria-pressed', 'true')
    expect(await citas.filter({ visible: true }).first().getAttribute('id')).not.toBe(primera)
    await expect(citas.filter({ visible: true })).toHaveCount(1)
  })

  test(`/${lang}: «${completa}» despliega la cita completa`, async ({ page }) => {
    await page.goto(`/${lang}`, { waitUntil: 'networkidle' })
    // El botón cambia de nombre al pulsarlo («Leer completa» → «Leer menos»): se localiza por su atributo, no por el nombre.
    const boton = page.locator('blockquote:visible button[aria-expanded]').first()
    await expect(boton).toHaveText(completa)
    await expect(boton).toHaveAttribute('aria-expanded', 'false')
    await boton.click()
    await expect(boton).toHaveAttribute('aria-expanded', 'true')
  })
}
