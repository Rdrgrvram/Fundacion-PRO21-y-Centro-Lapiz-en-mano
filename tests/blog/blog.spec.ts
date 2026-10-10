import { test, expect } from '@playwright/test'
import { existsSync, readdirSync, readFileSync } from 'fs'
import matter from 'gray-matter'

// RF-008 / RF-010 — noticias en Inicio e imágenes del blog. El contenido real se lee de
// content/blog/ para no duplicar datos en la prueba.
const LANGS = ['es', 'en'] as const

interface PostFile {
  slug: string
  title: string
  date: string
  image?: string
  visible: boolean
}

function posts(): PostFile[] {
  return readdirSync('content/blog')
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const { data } = matter(readFileSync(`content/blog/${f}`, 'utf-8'))
      const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? '')
      return {
        slug: f.replace(/\.md$/, ''),
        title: String(data.title ?? ''),
        date,
        image: data.image ? String(data.image) : undefined,
        visible: data.visible === undefined ? true : data.visible === true || data.visible === 'true',
      }
    })
}

test('toda imagen declarada por una publicación existe en public/ (RF-010)', () => {
  for (const post of posts()) {
    if (!post.image) continue
    expect(existsSync(`public${post.image}`), `${post.slug} → ${post.image}`).toBe(true)
  }
})

for (const lang of LANGS) {
  test(`/${lang}: "Últimas noticias" muestra las 3 publicaciones visibles más recientes (RF-008)`, async ({ request }) => {
    const latest = posts()
      .filter((p) => p.visible)
      .sort((a, b) => (a.date < b.date ? 1 : -1))
      .slice(0, 3)

    const html = await (await request.get(`/${lang}`)).text()
    const section = html.match(/data-testid="news-preview"[\s\S]*?<\/section>/)?.[0]

    if (latest.length === 0) {
      expect(section, 'sin publicaciones la sección no debe aparecer').toBeUndefined()
      return
    }
    expect(section, 'la sección de noticias debe existir').toBeDefined()
    const links = [...section!.matchAll(new RegExp(`href="/${lang}/blog/([a-z0-9-]+)"`, 'g'))].map((m) => m[1])
    // Cada publicación puede enlazarse más de una vez (imagen + título); se compara el orden único.
    const unique = [...new Set(links)]
    expect(unique).toEqual(latest.map((p) => p.slug))
  })
}
