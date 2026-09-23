'use client'
import { useEffect, useState } from 'react'

interface AdminPost {
  slug: string
  title: string
  date: string
  visible: boolean
}

// Decap guarda la sesión del backend `github` (producción) sin cifrar en esta
// clave de localStorage, incluyendo el token OAuth real — confirmado leyendo
// decap-cms-core/dist/esm/backend.js. En desarrollo local (local_backend: true,
// backend efectivo `proxy` vía decap-server) esta misma clave existe pero sin
// token utilizable — ahí las API routes usan el filesystem local directo.
function readDecapSession(): { token: string | null; backendName: string | null } {
  try {
    const raw = window.localStorage.getItem('decap-cms-user')
    if (!raw) return { token: null, backendName: null }
    const user = JSON.parse(raw) as { token?: string; backendName?: string }
    return { token: user.token ?? null, backendName: user.backendName ?? null }
  } catch {
    return { token: null, backendName: null }
  }
}

export default function AdminBlogClient() {
  const [session, setSession] = useState<{ token: string | null; backendName: string | null } | null>(null)
  const [posts, setPosts] = useState<AdminPost[] | null>(null)
  const [error, setError] = useState('')
  const [pending, setPending] = useState<string | null>(null)

  useEffect(() => {
    setSession(readDecapSession())
  }, [])

  useEffect(() => {
    if (session === null) return
    load(session.token)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  async function load(token: string | null) {
    setError('')
    try {
      const res = await fetch('/api/admin-blog/list', {
        headers: token ? { Authorization: `token ${token}` } : {},
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Error al cargar las entradas')
      setPosts(json.posts)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al cargar las entradas')
    }
  }

  async function toggle(slug: string, current: boolean) {
    if (!session) return
    setPending(slug)
    setError('')
    try {
      const res = await fetch('/api/admin-blog/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(session.token ? { Authorization: `token ${session.token}` } : {}),
        },
        body: JSON.stringify({ slug, visible: !current }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Error al guardar el cambio')
      setPosts((prev) => prev?.map((p) => (p.slug === slug ? { ...p, visible: !current } : p)) ?? null)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al guardar el cambio')
    } finally {
      setPending(null)
    }
  }

  if (session === null) {
    return <div className="min-h-screen flex items-center justify-center text-gray-400 text-sm">Cargando…</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-serif text-2xl font-bold text-gray-900 mb-1">Blog — visibilidad</h1>
        <p className="text-sm text-gray-500 mb-1">
          Mostrar u ocultar entradas del blog sin borrarlas. Una entrada oculta desaparece del listado público y
          da error 404 si se accede por link directo.
        </p>
        <p className="text-xs text-gray-400 mb-6">
          {session.token
            ? '🟢 Sesión de GitHub detectada — los cambios se publican directo al repositorio real.'
            : '🟡 Sin sesión de GitHub (modo local) — los cambios solo se guardan en tu computadora hasta que hagas commit/push, o inicies sesión en /admin para publicar en producción.'}
        </p>

        {error && <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-600 text-sm font-semibold">{error}</div>}

        {posts === null ? (
          <div className="text-gray-400 text-sm">Cargando entradas…</div>
        ) : posts.length === 0 ? (
          <div className="text-gray-400 text-sm">No hay entradas de blog todavía.</div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100 shadow-sm overflow-hidden">
            {posts.map((post) => (
              <div key={post.slug} className="flex items-center justify-between gap-4 px-5 py-4">
                <div className="min-w-0">
                  <div className="font-bold text-sm text-gray-900 truncate">{post.title || post.slug}</div>
                  <div className="text-xs text-gray-400">{post.date}</div>
                </div>
                <button
                  onClick={() => toggle(post.slug, post.visible)}
                  disabled={pending === post.slug}
                  className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all min-h-[36px] disabled:opacity-50 ${
                    post.visible
                      ? 'bg-green-50 text-green-700 hover:bg-green-100'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {pending === post.slug ? '…' : post.visible ? '👁 Visible' : '🚫 Oculto'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
