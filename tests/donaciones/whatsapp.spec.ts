import { test, expect } from '@playwright/test'
import fs from 'fs'
import { backupContentFile } from '../cms/helpers'

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

test.describe('Donaciones — el monto se rellena al elegir una tarjeta', () => {
  const campo = (page: import('@playwright/test').Page) => page.locator('#donaciones input[type="number"]')

  test('al abrir la página el campo trae el monto de la tarjeta destacada (300)', async ({ page }) => {
    await page.goto('/es/colabora')
    await expect(campo(page)).toHaveValue('300')
  })

  test('elegir una tarjeta llena el campo con su monto y "Libre" lo vacía', async ({ page }) => {
    await page.goto('/es/colabora')
    const donaciones = page.locator('#donaciones')
    await donaciones.getByText('Bs 100', { exact: true }).click()
    await expect(campo(page)).toHaveValue('100')
    await donaciones.getByText('Bs 500', { exact: true }).click()
    await expect(campo(page)).toHaveValue('500')
    await donaciones.getByText('Libre', { exact: true }).click()
    await expect(campo(page)).toHaveValue('')
  })

  test('escribir otro monto manda sobre la tarjeta, y elegir otra tarjeta lo reemplaza', async ({ page }) => {
    await page.goto('/es/colabora')
    await campo(page).fill('175')
    expect(await mensaje(page)).toContain('Bs 175')
    await page.locator('#donaciones').getByText('Bs 100', { exact: true }).click()
    await expect(campo(page)).toHaveValue('100')
    const m = await mensaje(page)
    expect(m).toContain('Bs 100')
    expect(m).toContain('Semilla') // el monto coincide con la tarjeta: se conserva el nombre del nivel
  })

  test('las tarjetas se eligen con el teclado (Tab + Enter) y avisan su estado', async ({ page }) => {
    await page.goto('/es/colabora')
    const tarjeta = page.locator('#donaciones [role="button"][aria-pressed]').filter({ hasText: 'Bs 500' })
    await tarjeta.focus()
    await page.keyboard.press('Enter')
    await expect(tarjeta).toHaveAttribute('aria-pressed', 'true')
    await expect(campo(page)).toHaveValue('500')
  })
})

test.describe('Donaciones — enlace de pago opcional (PayPal u otra plataforma)', () => {
  const COLABORA_YML = 'settings/collaborate.yml'
  const ANCLA = '        - Escríbenos para recibir los códigos Swift/IBAN.\n'
  let backup: ReturnType<typeof backupContentFile>

  test.beforeEach(() => {
    backup = backupContentFile(COLABORA_YML)
  })
  test.afterEach(() => backup.restore())

  function conEnlace(link: string) {
    const crudo = backup.readYamlRaw().replace(/\r\n/g, '\n')
    expect(crudo, 'el ancla de la prueba debe existir en collaborate.yml').toContain(ANCLA)
    fs.writeFileSync(
      backup.path,
      crudo.replace(ANCLA, `${ANCLA}      link: ${link}\n      link_label: Donar con PayPal\n`),
      'utf-8'
    )
  }

  test('sin enlace no aparece ningún botón de pago externo', async ({ page }) => {
    await page.goto('/es/colabora')
    await expect(page.locator('#donaciones a[href*="paypal"]')).toHaveCount(0)
  })

  test('con un enlace https aparece el botón, que abre en otra pestaña de forma segura', async ({ page }) => {
    conEnlace('https://paypal.me/fundacion-prueba')
    await page.goto('/es/colabora')
    const boton = page.locator('#donaciones a[href="https://paypal.me/fundacion-prueba"]')
    await expect(boton).toHaveCount(1)
    await expect(boton).toContainText('Donar con PayPal')
    await expect(boton).toHaveAttribute('target', '_blank')
    await expect(boton).toHaveAttribute('rel', /noopener/)
  })

  test('un enlace que no es http(s) (por ejemplo javascript:) no se muestra', async ({ page }) => {
    conEnlace('javascript:alert(1)')
    await page.goto('/es/colabora')
    await expect(page.locator('#donaciones a[href^="javascript"]')).toHaveCount(0)
  })
})
