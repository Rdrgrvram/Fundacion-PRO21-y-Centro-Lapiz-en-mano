import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { getGithubFile, putGithubFile } from '@/lib/github'

function extractToken(req: Request): string | null {
  const auth = req.headers.get('authorization')
  const match = auth?.match(/^(?:token|bearer)\s+(.+)$/i)
  return match ? match[1] : null
}

export async function POST(req: Request) {
  const token = extractToken(req)

  try {
    const { slug, visible } = await req.json()
    if (!slug || typeof slug !== 'string' || typeof visible !== 'boolean') {
      return Response.json({ error: 'Faltan parámetros (slug, visible)' }, { status: 400 })
    }
    const filePath = `content/blog/${slug}.md`

    if (token) {
      const { content, sha } = await getGithubFile(filePath, token)
      const parsed = matter(content)
      // gray-matter cachea internamente por string de contenido (activado por
      // defecto sin `options`) y devuelve el mismo objeto `data` en cada hit —
      // mutarlo in place corrompe esa caché compartida para cualquier otra
      // lectura futura del mismo contenido (confirmado como causa real de una
      // intermitencia grave en /admin/blog). Nunca mutar `parsed.data`.
      const next = matter.stringify(parsed.content, { ...parsed.data, visible })
      await putGithubFile(
        filePath,
        next,
        sha,
        token,
        `chore(blog): ${visible ? 'mostrar' : 'ocultar'} "${slug}" desde /admin/blog`
      )
      return Response.json({ ok: true, mode: 'github' })
    }

    // Sin token: solo se permite escribir directo al filesystem local en
    // desarrollo — en producción (Vercel) el filesystem no es persistente y,
    // aunque lo fuera, escribir sin pasar por GitHub rompería el modelo
    // git-based del CMS. Nunca debe ejecutarse este camino en producción.
    if (process.env.NODE_ENV === 'production') {
      return Response.json(
        { error: 'Sin sesión de GitHub válida — inicia sesión en /admin antes de usar esta herramienta.' },
        { status: 403 }
      )
    }

    const absolutePath = path.join(process.cwd(), filePath)
    if (!fs.existsSync(absolutePath)) {
      return Response.json({ error: `La entrada "${slug}" no existe` }, { status: 404 })
    }
    const raw = fs.readFileSync(absolutePath, 'utf-8')
    const parsed = matter(raw)
    fs.writeFileSync(absolutePath, matter.stringify(parsed.content, { ...parsed.data, visible }), 'utf-8')
    return Response.json({ ok: true, mode: 'local' })
  } catch (error) {
    console.error('Error al alternar visibilidad del blog:', error)
    return Response.json({ error: 'Error interno al guardar el cambio' }, { status: 500 })
  }
}
