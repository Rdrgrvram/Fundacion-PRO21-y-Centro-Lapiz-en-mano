import Image from 'next/image'
import type { AccentColor } from '@/lib/palette'
import type { ProgramGallerySection } from '@/lib/content'

interface ProgramGalleryProps {
  section?: ProgramGallerySection
  color: AccentColor
}

const BORDER: Record<AccentColor, string> = {
  primary: 'border-t-primary',
  secondary: 'border-t-secondary',
  accent: 'border-t-accent',
}

// Alternancia fija (no aleatoria) para que el server y el cliente rendericen
// el mismo resultado: una leve inclinación de "ficha suelta sobre el
// escritorio" que rompe la grilla perfecta sin volverse caótica. Se endereza
// al pasar el mouse. `motion-safe:` respeta prefers-reduced-motion (el estado
// final sigue cambiando, solo sin la transición animada). Clases completas y
// literales — Tailwind JIT no puede resolver nombres interpolados, ver
// lib/palette.ts para el mismo patrón. Ver docs/DESIGN_STANDARD.md §Galería.
const TILT = [
  'motion-safe:-rotate-1',
  'motion-safe:rotate-1',
  'motion-safe:rotate-0',
  'motion-safe:rotate-1',
  'motion-safe:-rotate-1',
  'motion-safe:rotate-0',
]

// Fotos reales del programa en acción — reemplaza la dependencia de solo
// texto/emoji con evidencia visual concreta antes de pedirle a la familia que
// se inscriba o contacte. Tratamiento de "ficha de actividad": cada foto se
// apoya como una tarjeta suelta con el color del programa en el borde
// superior, y revela su descripción real al pasar el cursor, como si fuera
// la anotación de la sesión en la libreta del centro.
export default function ProgramGallery({ section, color }: ProgramGalleryProps) {
  if (!section || section.photos.length === 0) return null

  return (
    <section className="py-16 md:py-24 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          {section.badge && (
            <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">📷</span>
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">{section.badge}</span>
            </div>
          )}
          <h2 className="text-3xl md:text-4xl text-gray-900 font-extrabold tracking-tight">{section.title}</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {section.photos.map((photo, idx) => (
            <div
              key={idx}
              className={`group relative h-48 sm:h-56 bg-white rounded-lg border-t-4 ${BORDER[color]} border-x border-b border-gray-200 shadow-sm overflow-hidden transition-all duration-300 hover:rotate-0 hover:shadow-lg hover:z-10 ${TILT[idx % TILT.length]}`}
            >
              <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="p-3 text-[11px] leading-snug font-mono text-white">{photo.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
