import { test, expect } from '@playwright/test'

// Acordeones, pestañas, FAQ, alianzas, menú móvil y desplegable de Programas se manejan con teclado y avisan su estado.

test.describe('Acordeón de tarjetas de programa (Desarrolla TEA, "Cómo trabajamos")', () => {
  test('el título es un botón con aria-expanded; Enter abre y cierra el panel', async ({ page }) => {
    await page.goto('/es/desarrolla-tea', { waitUntil: 'networkidle' })
    const boton = page.locator('#section-1 button[aria-expanded]').first()
    await boton.scrollIntoViewIfNeeded()
    await expect(boton).toHaveAttribute('aria-expanded', 'false')
    const panel = page.locator(`[id="${await boton.getAttribute('aria-controls')}"]`)
    await expect(panel).toHaveAttribute('aria-hidden', 'true')
    await boton.focus()
    await page.keyboard.press('Enter')
    await expect(boton).toHaveAttribute('aria-expanded', 'true')
    await expect(panel).toHaveAttribute('aria-hidden', 'false')
    await page.keyboard.press('Space')
    await expect(boton).toHaveAttribute('aria-expanded', 'false')
  })

  test('un clic con el mouse en cualquier parte de la tarjeta también la abre', async ({ page }) => {
    await page.goto('/es/desarrolla-tea', { waitUntil: 'networkidle' })
    const boton = page.locator('#section-1 button[aria-expanded]').first()
    await boton.scrollIntoViewIfNeeded()
    const tarjeta = boton.locator('xpath=ancestor::div[contains(@class,"relative")][1]')
    const caja = (await tarjeta.boundingBox())!
    await page.mouse.click(caja.x + caja.width - 12, caja.y + caja.height / 2)
    await expect(boton).toHaveAttribute('aria-expanded', 'true')
  })
})

test.describe('Pestañas de programa (Mi Escuelita Down, niveles)', () => {
  test('roles ARIA, una sola pestaña en el orden de Tab y flechas que cambian de pestaña', async ({ page }) => {
    await page.goto('/es/mi-escuelita-down', { waitUntil: 'networkidle' })
    const lista = page.locator('[role="tablist"]').first()
    await lista.scrollIntoViewIfNeeded()
    const pestanas = lista.locator('[role="tab"]')
    expect(await pestanas.count()).toBeGreaterThanOrEqual(2)
    await expect(pestanas.first()).toHaveAttribute('aria-selected', 'true')
    await expect(pestanas.nth(1)).toHaveAttribute('tabindex', '-1')

    await pestanas.first().focus()
    await page.keyboard.press('ArrowRight')
    await expect(pestanas.nth(1)).toHaveAttribute('aria-selected', 'true')
    await expect(pestanas.nth(1)).toBeFocused()
    const panel = page.locator('[role="tabpanel"]').first()
    await expect(panel).toHaveAttribute('aria-labelledby', (await pestanas.nth(1).getAttribute('id'))!)
    await page.keyboard.press('Home')
    await expect(pestanas.first()).toHaveAttribute('aria-selected', 'true')
  })
})

test.describe('Preguntas frecuentes (Familias)', () => {
  test('la pregunta es un botón con aria-expanded y se abre con Enter', async ({ page }) => {
    await page.goto('/es/familias', { waitUntil: 'networkidle' })
    const boton = page.locator('button[id^="faq-q-"]').first()
    await boton.scrollIntoViewIfNeeded()
    await expect(boton).toHaveAttribute('aria-expanded', 'false')
    await boton.focus()
    await page.keyboard.press('Enter')
    await expect(boton).toHaveAttribute('aria-expanded', 'true')
    await expect(page.locator('#faq-a-0')).toHaveAttribute('aria-hidden', 'false')
  })
})

test.describe('Tipos de alianza (Colabora)', () => {
  test('cada tipo es un botón con aria-expanded y se abre con Enter', async ({ page }) => {
    await page.goto('/es/colabora', { waitUntil: 'networkidle' })
    const boton = page.locator('button[id^="alianza-"]').first()
    await boton.scrollIntoViewIfNeeded()
    await expect(boton).toHaveAttribute('aria-expanded', 'false')
    await boton.focus()
    await page.keyboard.press('Enter')
    await expect(boton).toHaveAttribute('aria-expanded', 'true')
  })
})

test.describe('Menú móvil', () => {
  test.use({ viewport: { width: 375, height: 812 } })

  test('es un diálogo: Escape lo cierra, el foco entra y vuelve al botón de menú', async ({ page }) => {
    await page.goto('/es', { waitUntil: 'networkidle' })
    const abrir = page.getByRole('button', { name: /abrir menú de navegación/i })
    await abrir.click()
    const dialogo = page.getByRole('dialog', { name: /menú de navegación/i })
    await expect(dialogo).toBeVisible()
    await expect(page.getByRole('button', { name: /^cerrar menú$/i })).toBeFocused()
    await page.keyboard.press('Escape')
    await expect(dialogo).toHaveCount(0)
    await expect(page.getByRole('button', { name: /abrir menú de navegación/i })).toBeFocused()
  })

  test('Tab no se escapa del menú abierto y el botón anuncia que se puede cerrar', async ({ page }) => {
    await page.goto('/es', { waitUntil: 'networkidle' })
    await page.getByRole('button', { name: /abrir menú de navegación/i }).click()
    const dialogo = page.getByRole('dialog')
    for (let i = 0; i < 30; i++) {
      await page.keyboard.press('Tab')
      const dentro = await page.evaluate(() => !!document.activeElement?.closest('[role="dialog"]'))
      expect(dentro, `Tab ${i + 1} salió del menú`).toBe(true)
    }
    await expect(dialogo).toBeVisible()
    await expect(page.locator('button[aria-haspopup="dialog"]')).toHaveAttribute('aria-label', /cerrar menú de navegación/i)
  })
})

test.describe('Desplegable de Programas (escritorio)', () => {
  test.use({ viewport: { width: 1280, height: 900 } })

  test('se abre con Enter, anuncia su estado, Escape lo cierra y devuelve el foco', async ({ page }) => {
    await page.goto('/es', { waitUntil: 'networkidle' })
    const boton = page.locator('header nav button[aria-controls="menu-programas"]')
    await expect(boton).toHaveAttribute('aria-expanded', 'false')
    await boton.focus()
    await page.keyboard.press('Enter')
    await expect(boton).toHaveAttribute('aria-expanded', 'true')
    await expect(page.locator('#menu-programas a').first()).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(boton).toHaveAttribute('aria-expanded', 'false')
    await expect(boton).toBeFocused()
  })

  test('la página actual lleva aria-current="page" en el menú', async ({ page }) => {
    await page.goto('/es/colabora', { waitUntil: 'networkidle' })
    await expect(page.locator('header nav a[href="/es/colabora"]')).toHaveAttribute('aria-current', 'page')
  })
})

test.describe('Robustez (revisión de Codex)', () => {
  test('menú móvil abierto: al ensanchar la ventana a escritorio se cierra y el scroll queda libre', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/es', { waitUntil: 'networkidle' })
    await page.getByRole('button', { name: /abrir menú de navegación/i }).click()
    await expect(page.getByRole('dialog')).toBeVisible()
    await page.setViewportSize({ width: 1280, height: 900 })
    await expect(page.getByRole('dialog')).toHaveCount(0)
    expect(await page.evaluate(() => document.body.style.overflow)).toBe('')
  })

  test('desplegable de Programas: lo visible y aria-expanded coinciden aunque el puntero siga encima', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.goto('/es', { waitUntil: 'networkidle' })
    const boton = page.locator('header nav button[aria-controls="menu-programas"]')
    await boton.hover()
    await expect(boton).toHaveAttribute('aria-expanded', 'true')
    await expect(page.locator('#menu-programas a').first()).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(boton).toHaveAttribute('aria-expanded', 'false')
    await expect(page.locator('#menu-programas a').first()).toBeHidden()
  })

  test('accesibilidad móvil con el almacenamiento bloqueado: A+ sigue subiendo y el contraste se puede apagar', async ({ page }) => {
    await page.addInitScript(() => {
      Storage.prototype.setItem = () => {
        throw new Error('almacenamiento bloqueado')
      }
    })
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/es', { waitUntil: 'networkidle' })
    await page.getByRole('button', { name: /accesibilidad: tamaño de texto y contraste/i }).click()
    const mas = page.getByRole('button', { name: /a\+ aumentar tamaño de texto/i })
    await mas.click()
    await mas.click()
    expect(await page.evaluate(() => document.documentElement.style.fontSize)).toBe('120%')
    const contraste = page.getByRole('button', { name: /alternar alto contraste/i })
    await contraste.click()
    await expect(page.locator('html')).toHaveClass(/high-contrast/)
    await contraste.click()
    await expect(page.locator('html')).not.toHaveClass(/high-contrast/)
  })

  test('con movimiento reducido las transiciones se anulan', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/es', { waitUntil: 'networkidle' })
    const duracion = await page.evaluate(() => {
      const el = document.querySelector('a[href*="wa.me"]') as HTMLElement
      return parseFloat(getComputedStyle(el).transitionDuration)
    })
    expect(duracion).toBeLessThan(0.001)
  })
})
