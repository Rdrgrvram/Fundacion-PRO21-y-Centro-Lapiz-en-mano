import { test, expect } from '@playwright/test'
import matter from 'gray-matter'
import { getAllPosts, getPostBySlug } from '@/lib/content'
import { openCmsEntry, publishEntry, backupContentFile, uniqueMarker } from './helpers'

// Auditoría del módulo de Blog (colección folder "blog", sin i18n — un solo .md por
// entrada). Ver public/admin/config.yml líneas ~924-943. Dos campos nuevos cierran la
// evaluación completa pedida por el usuario:
//   - `visible` (boolean): permite ocultar una entrada sin borrarla — al ocultarla da
//     404 real (getPostBySlug devuelve null) y desaparece del listado (getAllPosts la
//     filtra). Decap no tiene ningún gancho de UI en el listado de entradas para esto
//     (confirmado leyendo decap-cms-core real), así que el toggle rápido vive en una
//     página propia (app/admin/blog, fuera de este spec — cubre solo el campo CMS).
//   - `pdf` (widget: file, opcional): si se sube, el clic en la imagen del listado
//     público abre el PDF en vez de llevar al artículo (mismo patrón `widget: file`
//     ya usado en impact.reports[]/families.guides[]).

const BIENVENIDA_MD = 'blog/bienvenida.md'

const EXPECTED_FIELDS = [
  'Visible en el sitio',
  'Título',
  'Fecha de publicación',
  'Imagen destacada',
  'PDF adjunto',
  'Resumen (para la lista)',
  'Contenido',
]

test.describe('CMS — Blog (colección "blog")', () => {
  let backup: ReturnType<typeof backupContentFile>

  test.beforeEach(() => {
    backup = backupContentFile(BIENVENIDA_MD)
  })

  test.afterEach(() => {
    backup.restore()
  })

  test('el panel carga una entrada de blog vía backend local, sin caer al login real de GitHub', async ({
    page,
  }) => {
    await openCmsEntry(page, '/collections/blog/entries/bienvenida')
    await expect(page.getByRole('button', { name: /iniciar sesión con github/i })).toHaveCount(0)
  })

  test('todos los campos definidos en config.yml para "blog" existen como campos editables, incluyendo "visible" y "pdf"', async ({
    page,
  }) => {
    await openCmsEntry(page, '/collections/blog/entries/bienvenida')
    for (const label of EXPECTED_FIELDS) {
      await expect(page.getByText(label, { exact: false }).first()).toBeVisible()
    }
  })

  test('editar y publicar el título persiste el cambio y valida contra el esquema real (lib/content.ts)', async ({
    page,
  }) => {
    const marker = uniqueMarker('BLOG_TITLE')
    await openCmsEntry(page, '/collections/blog/entries/bienvenida')
    // "Visible en el sitio" es el primer campo (un toggle boolean, sin input de
    // texto) — el primer input de texto real del formulario es "Título".
    await page.locator('input[type="text"], textarea').first().fill(marker)
    await publishEntry(page)

    const parsed = matter(backup.readYamlRaw())
    expect(parsed.data.title).toBe(marker)

    const post = await getPostBySlug('bienvenida')
    expect(post?.title).toBe(marker)
  })

  test('regresión: una entrada con "visible: false" da 404 real y desaparece del listado público (no solo se oculta)', async ({
    page,
  }) => {
    await openCmsEntry(page, '/collections/blog/entries/bienvenida')
    // El widget boolean de Decap es un <button role="switch">, no un checkbox — el
    // label solo es texto, hacerle clic no cambia el estado.
    await page.getByRole('switch').first().click()
    await publishEntry(page)

    const parsed = matter(backup.readYamlRaw())
    expect(parsed.data.visible).toBe(false)

    const post = await getPostBySlug('bienvenida')
    expect(post).toBeNull()

    const posts = await getAllPosts()
    expect(posts.find((p) => p.slug === 'bienvenida')).toBeUndefined()

    const res = await page.goto('/es/blog/bienvenida')
    expect(res?.status()).toBe(404)

    await page.goto('/es/blog')
    await expect(page.getByText('Bienvenidos al nuevo sitio')).not.toBeVisible()
  })

  test('regresión: /admin/blog lista las entradas y el toggle cambia "visible" en content/blog/*.md', async ({
    page,
  }) => {
    await page.goto('/admin/blog')
    await page.waitForLoadState('networkidle')

    await expect(page.getByText('Bienvenidos al nuevo sitio')).toBeVisible()
    const toggleBtn = page.getByRole('button', { name: /Visible|Oculto/ }).first()
    await expect(toggleBtn).toHaveText(/Visible/)

    await toggleBtn.click()
    await expect(toggleBtn).toHaveText(/Oculto/, { timeout: 5000 })

    const parsed = matter(backup.readYamlRaw())
    expect(parsed.data.visible).toBe(false)
  })
})
