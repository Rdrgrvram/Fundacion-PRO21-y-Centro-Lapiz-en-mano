import { test, expect } from '@playwright/test'

// El botón "Confirmar donación por WhatsApp" lleva un mensaje prellenado según la tarjeta
// elegida o el monto personalizado (un monto personalizado válido tiene prioridad).
async function mensaje(page: import('@playwright/test').Page): Promise<string> {
  const href = await page.locator('#confirmar-donacion').getAttribute('href')
  expect(href).toContain('wa.me/')
  return decodeURIComponent(new URL(href!).searchParams.get('text') ?? '')
}

test.describe('Donaciones — mensaje de WhatsApp prellenado', () => {
  test('por defecto usa la tarjeta destacada (Bs 300, Acompañante)', async ({ page }) => {
    await page.goto('/es/colabora')
    const m = await mensaje(page)
    expect(m).toContain('Bs 300')
    expect(m).toContain('Acompañante')
  })

  test('al elegir otra tarjeta cambia el monto del mensaje', async ({ page }) => {
    await page.goto('/es/colabora')
    await page.locator('#donaciones').getByText('Bs 500', { exact: true }).click()
    const m = await mensaje(page)
    expect(m).toContain('Bs 500')
    expect(m).toContain('Guardián')
  })

  test('un monto personalizado válido tiene prioridad sobre la tarjeta', async ({ page }) => {
    await page.goto('/es/colabora')
    await page.locator('#donaciones input[type="number"]').fill('150')
    const m = await mensaje(page)
    expect(m).toContain('Bs 150')
    expect(m).not.toContain('Bs 300')
  })

  test('la tarjeta de monto libre sin monto personalizado no menciona cifras', async ({ page }) => {
    await page.goto('/es/colabora')
    await page.locator('#donaciones').getByText('Libre', { exact: true }).click()
    const m = await mensaje(page)
    expect(m).not.toContain('Bs')
    expect(m).toContain('quiero hacer una donación a la Fundación')
  })

  test('en inglés el mensaje sale en inglés', async ({ page }) => {
    await page.goto('/en/colabora')
    expect(await mensaje(page)).toContain('I would like to make a donation')
  })
})
