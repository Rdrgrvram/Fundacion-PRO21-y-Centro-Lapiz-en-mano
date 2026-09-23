import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { toDateString, toBool } from '@/lib/content'
import { listGithubDir, getGithubFile } from '@/lib/github'

// Lista TODAS las entradas de content/blog (incluidas las ocultas) para el panel
// propio en app/admin/blog — a diferencia de getAllPosts() (lib/content.ts), que
// filtra las ocultas porque alimenta el sitio público.

// Sin esto, Next.js puede tratar este GET como estático y cachear la respuesta
// entre requests — el panel necesita leer el estado real del archivo en cada
// carga (confirmado como causa real de un test intermitente: la lista quedaba
// desactualizada tras alternar la visibilidad de una entrada).
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

function extractToken(req: Request): string | null {
  const auth = req.headers.get('authorization')
  const match = auth?.match(/^(?:token|bearer)\s+(.+)$/i)
  return match ? match[1] : null
}

interface AdminPost {
  slug: string
  title: string
  date: string
  visible: boolean
}

function parsePost(slug: string, raw: string): AdminPost {
  const { data } = matter(raw)
  return {
    slug,
    title: data.title ?? '',
    date: toDateString(data.date),
    visible: data.visible === undefined ? true : toBool(data.visible),
  }
}

export async function GET(req: Request) {
  const token = extractToken(req)

  try {
    if (token) {
      const entries = await listGithubDir('content/blog', token)
      const posts = await Promise.all(
        entries
          .filter((e) => e.name.endsWith('.md'))
          .map(async (e) => {
            const { content } = await getGithubFile(`content/blog/${e.name}`, token)
            return parsePost(e.name.replace(/\.md$/, ''), content)
          })
      )
      posts.sort((a, b) => (a.date < b.date ? 1 : -1))
      return Response.json({ posts, mode: 'github' })
    }

    // Modo local (sin sesión GitHub real): lee el filesystem directo, mismo
    // patrón que ya usa decap-server para este mismo backend en desarrollo.
    const dir = path.join(process.cwd(), 'content', 'blog')
    const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith('.md')) : []
    const posts = files
      .map((f) => parsePost(f.replace(/\.md$/, ''), fs.readFileSync(path.join(dir, f), 'utf-8')))
      .sort((a, b) => (a.date < b.date ? 1 : -1))
    return Response.json({ posts, mode: 'local' })
  } catch (error) {
    console.error('Error al listar entradas del blog para /admin/blog:', error)
    return Response.json({ error: 'Error al listar las entradas del blog' }, { status: 500 })
  }
}
