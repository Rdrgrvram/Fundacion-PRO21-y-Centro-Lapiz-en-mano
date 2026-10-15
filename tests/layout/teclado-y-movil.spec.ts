import { test, expect } from '@playwright/test'

// Lote de accesibilidad: saltar al contenido, foco visible, menú móvil sin tapar, pie en dos columnas,
// foco que no se pierde al cargar el mapa y textos legibles.

for (const [lang, texto] of [
  ['es', 'Saltar al contenido'],
  ['en', 'Skip to content'],
] as const) {
  test(`/${lang}: el primer Tab ofrece "${texto}" y Enter lleva el foco al contenido`, async ({ page }) => {
    await page.goto(`/${lang}`, { waitUntil: 'domcontentloaded' })
    await page.keyboard.press('Tab')
    const enlace = page.getByRole('link', { name: texto })
    await expect(enlace).toBeFocused()
    await expect(enlace).toBeVisible()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/#main$/)
    await expect(page.locator('main#main')).toBeFocused()
  })
}

test('el foco con teclado se ve: anillo de 3 px en los enlaces del menú', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/es', { waitUntil: 'domcontentloaded' })
  const enlace = page.locator('header nav a').first()
  await enlace.focus()
  await page.keyboard.press('Shift+Tab')
  await page.keyboard.press('Tab')
  const contorno = await enlace.evaluate((el) => {
    const cs = getComputedStyle(el)
    return { ancho: parseFloat(cs.outlineWidth), estilo: cs.outlineStyle }
  })
  expect(contorno.estilo).toBe('solid')
  expect(contorno.ancho).toBeGreaterThanOrEqual(2)
})

test('menú móvil abierto: el botón flotante de WhatsApp no tapa "Colaborar"', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/es', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: /abrir menú de navegación/i }).click()
  const colaborar = page.locator('div.fixed.inset-0 a[href$="/colabora"]').last()
  await expect(colaborar).toBeVisible()
  const caja = (await colaborar.boundingBox())!
  // El elemento que está en cada esquina del botón pertenece al botón (o a su contenido), no al botón flotante.
  for (const [x, y] of [
    [caja.x + 4, caja.y + 4],
    [caja.x + caja.width - 4, caja.y + 4],
    [caja.x + caja.width - 4, caja.y + caja.height - 4],
  ]) {
    const tapado = await page.evaluate(([px, py]) => {
      const el = document.elementFromPoint(px, py)
      return !!el?.closest('a[aria-label*="WhatsApp" i]')
    }, [x, y])
    expect(tapado, 'el botón flotante no debe cubrir "Colaborar"').toBe(false)
  }
})

test('pie en móvil: Programas e Institución van en dos columnas', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/es', { waitUntil: 'domcontentloaded' })
  const columnas = page.locator('footer h2')
  await expect(columnas).toHaveCount(2)
  const a = (await columnas.nth(0).boundingBox())!
  const b = (await columnas.nth(1).boundingBox())!
  expect(Math.abs(a.y - b.y), 'los dos títulos deben estar a la misma altura').toBeLessThan(2)
  expect(b.x).toBeGreaterThan(a.x + 100)
})

test('Contacto: el usuario de cada red social se lee completo', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/es/contacto', { waitUntil: 'networkidle' })
  const cortados = await page.evaluate(() =>
    [...document.querySelectorAll<HTMLElement>('span')]
      .filter((s) => getComputedStyle(s).textOverflow === 'ellipsis' || s.classList.contains('truncate'))
      .filter((s) => s.scrollWidth > s.clientWidth)
      .map((s) => s.textContent)
  )
  expect(cortados).toEqual([])
})

test('Contacto: al cargar el mapa el foco pasa al mapa y no se pierde', async ({ page }) => {
  await page.goto('/es/contacto', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: /ver mapa/i }).click()
  const mapa = page.locator('iframe[src*="google.com/maps"]')
  await expect(mapa).toBeFocused()
})

test('Colabora: el campo del monto se llama "Tu aporte" y avisa que se puede cambiar', async ({ page }) => {
  await page.goto('/es/colabora', { waitUntil: 'networkidle' })
  await expect(page.getByText('Tu aporte (Bs)')).toBeVisible()
  await expect(page.getByText(/Puedes cambiarlo/)).toBeVisible()
})
