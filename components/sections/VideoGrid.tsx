'use client'

import { useEffect, useRef, useState } from 'react'
import Icon from '@/components/ui/Icon'
import { youtubeId } from '@/lib/utils'

interface Video {
  title: string
  url: string
  desc?: string
}

interface VideoGridProps {
  videos: Video[]
  es: boolean
}

// Videos de YouTube (issue #70). Cada uno carga SOLO al pulsar "Reproducir": sin clic no se descarga nada de
// YouTube (rendimiento y privacidad) y se usa el dominio sin cookies (youtube-nocookie.com). Un enlace que no sea
// de YouTube se ignora. La sección no se pinta si no hay videos válidos.
export default function VideoGrid({ videos, es }: VideoGridProps) {
  const [playing, setPlaying] = useState<Set<number>>(new Set())
  const marcos = useRef<Record<number, HTMLIFrameElement | null>>({})
  const ultimo = useRef<number | null>(null)
  // Al cargar un video su botón desaparece: el foco del teclado pasa al video en vez de perderse.
  useEffect(() => {
    if (ultimo.current !== null) marcos.current[ultimo.current]?.focus()
  }, [playing])
  const items = videos
    .map((v) => ({ ...v, id: youtubeId(v.url) }))
    .filter((v): v is Video & { id: string } => v.id !== null)
  if (items.length === 0) return null

  return (
    <div className="mx-auto mt-14 max-w-5xl text-left">
      <h3 className="mb-6 text-center text-xl font-extrabold text-gray-900 md:text-2xl">{es ? 'Videos del centro' : 'Videos from the center'}</h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {items.map((v, i) => (
          <figure key={v.id + i} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="aspect-video w-full bg-gray-900">
              {playing.has(i) ? (
                <iframe
                  ref={(el) => {
                    marcos.current[i] = el
                  }}
                  title={v.title}
                  src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    ultimo.current = i
                    setPlaying((prev) => new Set(prev).add(i))
                  }}
                  aria-label={es ? `Reproducir video: ${v.title}` : `Play video: ${v.title}`}
                  className="flex h-full w-full flex-col items-center justify-center gap-3 px-4 text-center text-white transition-colors hover:bg-gray-800 active:scale-[0.99]"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-gray-900">
                    <Icon name="play" className="h-6 w-6" />
                  </span>
                  <span className="text-sm font-bold">{es ? 'Reproducir' : 'Play'}</span>
                </button>
              )}
            </div>
            <figcaption className="p-4">
              <p className="text-sm font-bold text-gray-900">{v.title}</p>
              {v.desc && <p className="mt-1 text-xs leading-relaxed text-gray-600">{v.desc}</p>}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
