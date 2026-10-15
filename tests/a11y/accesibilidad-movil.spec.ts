import { test, expect } from '@playwright/test'

// Barra de accesibilidad: en escritorio se mantiene; en móvil y tablet pasa a un botón del header con un panel.
// Recupera ~65 px de pantalla y conserva las mismas preferencias (tamaño de texto y contraste).

test.describe('Móvil (375 px)', () => {
  test.use({ viewport: { width: 375, height: 812 } })

  test.beforeEach(async ({ page }) => {
    // Parte de cero, pero solo una vez por pestaña: el reload de la prueba de persistencia no debe borrar lo guardado.
    await page.addInitScript(() => {
      try {
        if (!sessionStorage.getItem('prueba-limpia')) {
          localStorage.clear()
          sessionStorage.setItem('prueba-limpia', '1')
        }
      } catch {}
    })
  })

  test('la barra no ocupa espacio y el encabezado mide bastante menos que los 129 px de antes', async ({ page }) => {
    await page.goto('/es', { waitUntil: 'networkidle' })
    await expect(page.getByText('Accesibilidad:')).toBeHidden()
    const alto = (await page.locator('div.sticky.top-0').first().boundingBox())!.height
    expect(alto, 'alto del encabezado pegajoso').toBeLessThan(100)
  })

  test('el botón abre un panel; A+ agranda el texto y el contraste se activa, y todo se recuerda', async ({ page }) => {
    await page.goto('/es', { waitUntil: 'networkidle' })
    const boton = page.getByRole('button', { name: /accesibilidad: tamaño de texto y contraste/i })
    await expect(boton).toHaveAttribute('aria-expanded', 'false')
    await boton.click()
    await expect(boton).toHaveAttribute('aria-expanded', 'true')

    await page.getByRole('button', { name: /a\+ aumentar tamaño de texto/i }).click()
    expect(await page.evaluate(() => document.documentElement.style.fontSize)).toBe('110%')

    await page.getByRole('button', { name: /alternar alto contraste/i }).click()
    await expect(page.locator('html')).toHaveClass(/high-contrast/)
    await expect(page.getByRole('button', { name: /alternar alto contraste/i })).toHaveAttribute('aria-pressed', 'true')

    await page.reload({ waitUntil: 'networkidle' })
    expect(await page.evaluate(() => document.documentElement.style.fontSize)).toBe('110%')
    await expect(page.locator('html')).toHaveClass(/high-contrast/)
  })

  test('Escape cierra el panel y devuelve el foco al botón', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'networkidle' })
    const boton = page.getByRole('button', { name: /accessibility: text size and contrast/i })
    await boton.click()
    await expect(page.getByRole('group', { name: /accessibility options/i })).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('group', { name: /accessibility options/i })).toHaveCount(0)
    await expect(boton).toBeFocused()
  })

  test('el encabezado no desborda a 320 px', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 })
    await page.goto('/es', { waitUntil: 'networkidle' })
    const desborde = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    expect(desborde).toBeLessThanOrEqual(0)
    // Los tres controles (accesibilidad, idioma, menú) caben a la vista.
    for (const nombre of [/accesibilidad: tamaño/i, /abrir menú de navegación/i]) {
      const caja = (await page.getByRole('button', { name: nombre }).boundingBox())!
      expect(caja.x + caja.width).toBeLessThanOrEqual(320)
    }
  })
})

test.describe('Escritorio (1280 px)', () => {
  test.use({ viewport: { width: 1280, height: 900 } })

  test('la barra de siempre sigue visible y el botón del panel no aparece', async ({ page }) => {
    await page.goto('/es', { waitUntil: 'networkidle' })
    await expect(page.getByText('Accesibilidad:')).toBeVisible()
    await expect(page.getByRole('button', { name: /accesibilidad: tamaño de texto y contraste/i })).toBeHidden()
    await page.getByRole('button', { name: /a\+ aumentar tamaño de texto/i }).click()
    expect(await page.evaluate(() => document.documentElement.style.fontSize)).toBe('110%')
  })
})
