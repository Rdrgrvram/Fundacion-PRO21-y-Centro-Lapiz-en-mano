import type { MetadataRoute } from 'next'
import { locales } from '@/lib/i18n'
import { getAllPrograms } from '@/lib/cms'
import { getAllPosts } from '@/lib/content'
import { SITE_URL, localizedPath } from '@/lib/seo'

// Rutas fijas del sitio (sin idioma). Los programas y el blog salen del contenido.
const STATIC_ROUTES = ['', '/quienes-somos', '/equipo', '/impacto', '/colabora', '/familias', '/blog', '/contacto']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts()
  const entries: MetadataRoute.Sitemap = []

  for (const lang of locales) {
    const paths = [
      ...STATIC_ROUTES,
      ...getAllPrograms(lang).map((p) => `/${p.slug}`),
      ...posts.map((post) => `/blog/${post.slug}`),
    ]
    for (const path of paths) {
      entries.push({
        url: `${SITE_URL}${localizedPath(lang, path)}`,
        alternates: {
          languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}${localizedPath(l, path)}`])),
        },
      })
    }
  }
  return entries
}
