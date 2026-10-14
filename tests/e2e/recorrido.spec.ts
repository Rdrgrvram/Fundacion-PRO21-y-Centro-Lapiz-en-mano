import fs from 'fs'
import path from 'path'
import { test, expect, type Page } from '@playwright/test'
import { programRoutes } from '../helpers/programs'
import { openCmsEntry, publishEntry } from '../cms/helpers'

// Recorrido de punta a punta como lo vive una persona: formularios, donaciones, blog publicado desde el panel y un
// barrido de consola, imágenes y enlaces. Las pruebas de formularios asumen el servidor SIN RESEND_API_KEY
// (playwright.config.ts ya lo arranca así): el sitio debe mostrar el error con la salida por WhatsApp y nunca
// confirmar un envío que no ocurrió. El envío real con clave se prueba en el despliegue (issue #63).

const WA = '59170106276'
const RUTAS = ['', '/quienes-somos', ...programRoutes(), '/equipo', '/impacto', '/colabora', '/familias', '/blog', '/blog/bienvenida', '/contacto']

/** Recorre la página para activar imágenes y secciones diferidas antes de medir. */
async function recorrer(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 40))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(300)
}

test.describe('Contacto — formulario en el navegador', () => {
  test('campos vacíos no envían: el navegador exige los obligatorios', async ({ page }) => {
    await page.goto('/es/contacto', { waitUntil: 'networkidle' })
    let pidioAPI = false
    page.on('request', (r) => {
      if (r.url().includes('/api/contact')) pidioAPI = true
    })
    await page.getByRole('button', { name: /enviar/i }).first().click()
    await page.waitForTimeout(500)
    expect(pidioAPI, 'sin datos no debe llamarse a la API').toBe(false)
  })

  test('envío válido sin servicio de correo: error claro + WhatsApp, nunca confirmación falsa', async ({ page }) => {
    await page.goto('/es/contacto', { waitUntil: 'networkidle' })
    await page.getByPlaceholder('Tu nombre completo').fill('Prueba Automática')
    await page.getByPlaceholder('ejemplo@correo.com').fill('prueba@example.com')
    await page.getByPlaceholder('Escribe aquí tu consulta en detalle...').fill('Mensaje de prueba del recorrido automático.')
    await page.waitForTimeout(1800) // la API rechaza envíos más rápidos que 1,5 s (anti-bots)
    await page.getByRole('button', { name: /enviar/i }).first().click()
    const alerta = page.locator('p[role=alert]')
    await expect(alerta).toBeVisible({ timeout: 20_000 }) // la primera llamada compila la ruta de la API
    await expect(alerta).not.toBeEmpty()
    await expect(page.locator(`a[href*="wa.me/${WA}"]`).first()).toBeVisible()
    await expect(page.getByText(/mensaje enviado|¡gracias por escribirnos/i)).toHaveCount(0)
  })
})

test.describe('Voluntariado — formulario en el navegador', () => {
  test('sin datos muestra los errores de validación en español', async ({ page }) => {
    await page.goto('/es/colabora', { waitUntil: 'networkidle' })
    const form = page.locator('#voluntariado')
    await form.scrollIntoViewIfNeeded()
    await form.getByRole('button', { name: 'Enviar inscripción' }).click()
    await expect(page.getByText('El nombre completo es obligatorio')).toBeVisible()
    await expect(page.getByText('Ingresa un correo electrónico válido').or(page.getByText('El correo electrónico es obligatorio'))).toBeVisible()
    await expect(page.getByText('La profesión o carrera es obligatoria')).toBeVisible()
  })

  test('envío válido sin servicio de correo: error claro + WhatsApp, nunca confirmación falsa', async ({ page }) => {
    await page.goto('/es/colabora', { waitUntil: 'networkidle' })
    const form = page.locator('#voluntariado')
    await form.scrollIntoViewIfNeeded()
    const textos = form.locator('input[type=text]')
    await textos.nth(0).fill('Voluntaria de Prueba')
    await form.locator('input[type=email]').fill('voluntaria@example.com')
    await textos.nth(1).fill('Psicología')
    await page.waitForTimeout(1800)
    await form.getByRole('button', { name: 'Enviar inscripción' }).click()
    await expect(form.locator('p[role=alert]')).toBeVisible()
    await expect(page.locator(`#voluntariado a[href*="wa.me/${WA}"]`).first()).toBeVisible()
    await expect(page.getByText(/inscripción recibida/i)).toHaveCount(0)
  })
})

test.describe('Donaciones — Colabora', () => {
  test('el QR carga, los datos bancarios están a la vista y "Confirmar" lleva a WhatsApp', async ({ page }) => {
    await page.goto('/es/colabora', { waitUntil: 'networkidle' })
    const qr = page.locator('img[src*="qr-donacion"]').first()
    await qr.scrollIntoViewIfNeeded()
    await expect(qr).toBeVisible()
    await expect.poll(() => qr.evaluate((i: HTMLImageElement) => i.complete)).toBe(true)
    expect(await qr.evaluate((i: HTMLImageElement) => i.naturalWidth), 'el QR debe cargar').toBeGreaterThan(0)
    await expect(page.getByText('Banco Sol').first()).toBeVisible()
    await expect(page.getByText('2633243-000-001').first()).toBeVisible()
    await expect(page.getByText(/se actualizará/i).first()).toBeVisible() // aviso de cuenta provisoria
    await expect(page.locator('#confirmar-donacion')).toHaveAttribute('href', new RegExp(`wa\\.me/${WA}\\?text=`))
  })
})

test.describe('Blog — publicar desde el panel', () => {
  test('una publicación creada en /admin aparece en el listado, en su página y en Inicio', async ({ page, request }) => {
    const ts = Date.now()
    const titulo = `Prueba recorrido ${ts}`
    const slug = `prueba-recorrido-${ts}`
    const archivo = path.join(process.cwd(), 'content', 'blog', `${slug}.md`)
    try {
      await openCmsEntry(page, '/collections/blog/new')
      await page.getByText('Título', { exact: true }).first().locator('xpath=following::input[1]').fill(titulo)
      await page.getByText(/^resumen/i).first().locator('xpath=following::textarea[1]').fill('Resumen de la publicación de prueba.')
      // En una entrada nueva la fecha viene vacía y es obligatoria: la persona pulsa "Ahora".
      await page.getByRole('button', { name: /set date to now|ahora/i }).click()
      await page.locator('[data-slate-editor="true"]').first().click()
      await page.keyboard.type('Contenido de la publicación de prueba del recorrido automático.')
      await publishEntry(page)

      expect(fs.existsSync(archivo), 'la publicación debe guardarse como content/blog/<slug>.md').toBe(true)
      const lista = await request.get('/es/blog')
      expect(await lista.text()).toContain(titulo)
      const pagina = await request.get(`/es/blog/${slug}`)
      expect(pagina.status()).toBe(200)
      expect(await pagina.text()).toContain('Contenido de la publicación de prueba')
      const inicio = await request.get('/es')
      expect(await inicio.text(), 'las 3 últimas noticias de Inicio incluyen la nueva').toContain(titulo)
    } finally {
      fs.rmSync(archivo, { force: true })
    }
  })
})

test.describe('Barrido de consola, imágenes y enlaces', () => {
  for (const lang of ['es', 'en'] as const) {
    for (const ancho of [375, 1280]) {
      test(`/${lang}/** a ${ancho}px: sin errores de consola, imágenes rotas ni enlaces internos caídos`, async ({ page, request }) => {
        test.setTimeout(240_000)
        await page.setViewportSize({ width: ancho, height: 900 })
        const problemas: string[] = []
        const enlaces = new Set<string>()
        let rutaActual = ''
        page.on('console', (m) => {
          if (m.type() === 'error') problemas.push(`${rutaActual}: consola → ${m.text().slice(0, 140)}`)
        })
        page.on('pageerror', (e) => problemas.push(`${rutaActual}: excepción → ${e.message.slice(0, 140)}`))
        page.on('response', (r) => {
          if (r.status() >= 400 && !r.url().includes('/admin')) problemas.push(`${rutaActual}: HTTP ${r.status()} → ${r.url().replace(/^https?:\/\/[^/]+/, '')}`)
        })

        for (const ruta of RUTAS) {
          rutaActual = `/${lang}${ruta}`
          await page.goto(rutaActual, { waitUntil: 'networkidle' })
          await recorrer(page)
          const rotas = await page.evaluate(() =>
            [...document.images].filter((i) => i.complete && i.naturalWidth === 0 && i.currentSrc).map((i) => i.currentSrc.replace(location.origin, ''))
          )
          for (const r of rotas) problemas.push(`${rutaActual}: imagen rota → ${r}`)
          const hrefs = await page.evaluate(() => [...document.querySelectorAll<HTMLAnchorElement>('a[href]')].map((a) => a.getAttribute('href') || ''))
          for (const h of hrefs) if (h.startsWith('/') && !h.startsWith('//') && !h.startsWith('/admin')) enlaces.add(h.split('#')[0])
        }

        for (const h of enlaces) {
          if (!h) continue
          const r = await request.get(h)
          if (r.status() >= 400) problemas.push(`enlace interno caído → ${h} (${r.status()})`)
        }
        expect(problemas, 'problemas encontrados en el recorrido').toEqual([])
      })
    }
  }
})
