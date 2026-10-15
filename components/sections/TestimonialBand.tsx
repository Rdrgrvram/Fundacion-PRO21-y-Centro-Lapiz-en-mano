'use client'
import { useState } from 'react'

interface TestimonialItem {
  slug: string
  family: string
  program: string
  body: string
}

interface TestimonialBandProps {
  items: TestimonialItem[]
  es: boolean
}

// Banda de testimonios: una cita protagonista en la fuente de titulares y las demás como chips que la cambian.
// Todas las citas están en el HTML (las inactivas con `hidden`), así que buscadores y lectores de pantalla las tienen.
// Las citas largas se recortan a 5 líneas con «Leer completa» (el texto del CMS no se modifica).
export default function TestimonialBand({ items, es }: TestimonialBandProps) {
  const [activo, setActivo] = useState(0)
  const [completa, setCompleta] = useState(false)
  if (items.length === 0) return null

  const elegir = (i: number) => {
    setActivo(i)
    setCompleta(false)
  }

  return (
    <div className="mx-auto max-w-4xl text-center">
      {items.map((item, i) => (
        <blockquote key={item.slug} hidden={i !== activo} id={`cita-${item.slug}`}>
          <p
            className={`font-display text-xl font-semibold leading-snug text-white md:text-3xl ${completa ? '' : 'line-clamp-5'}`}
          >
            &ldquo;{item.body}&rdquo;
          </p>
          <button
            type="button"
            onClick={() => setCompleta((v) => !v)}
            aria-expanded={completa}
            className="mt-3 inline-flex min-h-[44px] items-center px-4 text-sm font-bold text-white underline underline-offset-4 active:scale-[0.98]"
          >
            {completa ? (es ? 'Leer menos' : 'Read less') : es ? 'Leer completa' : 'Read in full'}
          </button>
          <footer className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <span className="font-mono text-sm font-bold text-white">{item.family}</span>
            <span className="rounded-full bg-black/20 px-3 py-1 text-xs font-semibold text-white">{item.program}</span>
          </footer>
        </blockquote>
      ))}

      {items.length > 1 && (
        <div className="mt-8 flex flex-wrap justify-center gap-2" role="group" aria-label={es ? 'Elegir testimonio' : 'Choose testimonial'}>
          {items.map((item, i) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => elegir(i)}
              aria-pressed={i === activo}
              aria-controls={`cita-${item.slug}`}
              className={`min-h-[44px] rounded-full px-5 text-sm font-semibold transition-colors active:scale-[0.98] ${
                i === activo ? 'bg-white text-gray-900' : 'bg-black/20 text-white hover:bg-black/30'
              }`}
            >
              {item.family}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
