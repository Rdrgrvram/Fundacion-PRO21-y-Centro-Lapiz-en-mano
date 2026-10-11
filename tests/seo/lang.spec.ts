import { test, expect } from '@playwright/test'

// RF-005: el documento declara el idioma de la ruta. Se lee el HTML crudo (request),
// no el DOM del navegador: así se ve lo mismo que un rastreador sin JavaScript.
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
  '/blog/bienvenida',
  '/contacto',
]

for (const lang of ['es', 'en'] as const) {
  for (const route of ROUTES) {
    test(`/${lang}${route} declara <html lang="${lang}">`, async ({ request }) => {
      const res = await request.get(`/${lang}${route}`)
      expect(res.status()).toBe(200)
      const html = await res.text()
      // El primer <html ...> del documento debe traer lang="<idioma de la ruta>".
      const htmlTag = html.match(/<html[^>]*>/)?.[0] ?? ''
      expect(htmlTag).toContain(` lang="${lang}"`)
    })
  }
}

test('la raíz "/" y el panel "/admin" siguen cargando', async ({ request }) => {
  const root = await request.get('/', { maxRedirects: 0 })
  expect([200, 301, 302, 307, 308]).toContain(root.status())
  const admin = await request.get('/admin/', { maxRedirects: 5 })
  expect(admin.status()).toBe(200)
  const adminBlog = await request.get('/admin/blog')
  expect(adminBlog.status()).toBe(200)
})
