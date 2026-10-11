import { test, expect } from '@playwright/test'

// RF-006: mapa del sitio, reglas de rastreo, metadatos de vista previa, relación
// entre idiomas y favicon. Se lee el HTML crudo, como un rastreador.
const ROUTES = [
  '',
  '/quienes-somos',
  '/mi-escuelita-down',
  '/aula-wawitas',
  '/pasos-firmes',
  '/equipo',
  '/impacto',
  '/colabora',
  '/familias',
  '/blog',
  '/contacto',
]

test('existe /sitemap.xml con las rutas en ambos idiomas', async ({ request }) => {
  const res = await request.get('/sitemap.xml')
  expect(res.status()).toBe(200)
  const xml = await res.text()
  expect(xml).toContain('/es/mi-escuelita-down')
  expect(xml).toContain('/en/mi-escuelita-down')
  expect(xml).toContain('/es/contacto')
  expect(xml).toContain('/en/contacto')
})

test('existe /robots.txt y apunta al sitemap', async ({ request }) => {
  const res = await request.get('/robots.txt')
  expect(res.status()).toBe(200)
  const txt = await res.text()
  expect(txt).toMatch(/Sitemap:\s*\S+\/sitemap\.xml/)
  expect(txt).not.toMatch(/Disallow:\s*\/\s*$/m)
})

for (const lang of ['es', 'en'] as const) {
  for (const route of ROUTES) {
    test(`/${lang}${route}: canonical, hreflang y Open Graph`, async ({ request }) => {
      const html = await (await request.get(`/${lang}${route}`)).text()
      expect(html, 'canonical').toMatch(/<link[^>]+rel="canonical"/)
      expect(html, 'hreflang es').toMatch(/<link[^>]+rel="alternate"[^>]+hrefLang="es"|<link[^>]+hrefLang="es"[^>]+rel="alternate"/i)
      expect(html, 'hreflang en').toMatch(/<link[^>]+rel="alternate"[^>]+hrefLang="en"|<link[^>]+hrefLang="en"[^>]+rel="alternate"/i)
      expect(html, 'og:title').toMatch(/<meta[^>]+property="og:title"/)
      expect(html, 'og:description').toMatch(/<meta[^>]+property="og:description"/)
      expect(html, 'og:image').toMatch(/<meta[^>]+property="og:image"/)
    })
  }
}

test('hay un favicon declarado y accesible', async ({ request }) => {
  const html = await (await request.get('/es')).text()
  const m = html.match(/<link[^>]+rel="(?:shortcut )?icon"[^>]+href="([^"]+)"/)
  expect(m, 'link rel=icon').not.toBeNull()
  const res = await request.get(m![1])
  expect(res.status()).toBe(200)
})
