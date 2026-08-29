import Image from 'next/image'
import { cx } from '@/lib/utils'
import type { AccentColor } from '@/lib/palette'

// Foto protagonista en "forma orgánica" con dos blobs de color de marca detrás.
// Patrón documentado en docs/DESIGN_STANDARD.md § Hero (excepción de Inicio) —
// reutilizado en el hero de Inicio, los heroes de programa y las secciones
// destacadas de Quiénes Somos / Impacto / Colabora / Familias.
//
// Regla: solo para la foto PROTAGONISTA de una sección. El resto de fotos del
// sitio siguen en rectángulos redondeados (rounded-2xl).
//
// La cita (si se pasa) va como pie de foto DEBAJO de la forma orgánica —
// nunca superpuesta, porque el recorte circular corta el texto.

interface ProtagonistPhotoProps {
  src: string
  alt: string
  /** Cita real de familia — se muestra como pie de foto debajo de la imagen. */
  quote?: string
  /** Autor de la cita, ej. "Familia Quispe". */
  author?: string
  /** Contexto de la cita, ej. "Mi Escuelita Down". */
  context?: string
  /** Tono del pie de foto según el fondo de la sección. */
  quoteTone?: 'light' | 'dark'
  /** `object-position` de la foto — ajustar para no cortar caras. Por defecto 'center 20%'. */
  focus?: string
  /** Colores de los dos blobs de fondo. Por defecto secondary + accent. */
  blobs?: [AccentColor, AccentColor]
  ratio?: 'portrait' | 'square'
  priority?: boolean
  className?: string
}

// Tailwind JIT necesita las clases literales — no se pueden interpolar.
const BLOB: Record<AccentColor, string> = {
  primary: 'bg-primary/40',
  secondary: 'bg-secondary/40',
  accent: 'bg-accent/40',
}

export default function ProtagonistPhoto({
  src,
  alt,
  quote,
  author,
  context,
  quoteTone = 'dark',
  focus = 'center 20%',
  blobs = ['secondary', 'accent'],
  ratio = 'portrait',
  priority = false,
  className,
}: ProtagonistPhotoProps) {
  const attribution = [author, context].filter(Boolean).join(' · ')
  const light = quoteTone === 'light'

  return (
    <div className={cx('mx-auto w-full max-w-md lg:max-w-none', className)}>
      {/* Contenedor de la foto + blobs — los blobs se anclan a la foto,
          no al pie de foto. */}
      <div className="relative">
        <div
          className={cx(
            'absolute -left-8 -top-6 h-40 w-40 rounded-[42%_58%_63%_37%_/_45%_42%_58%_55%]',
            BLOB[blobs[0]]
          )}
        />
        <div
          className={cx(
            'absolute -bottom-8 -right-6 h-44 w-44 rounded-[58%_42%_37%_63%_/_55%_58%_42%_45%]',
            BLOB[blobs[1]]
          )}
        />

        <figure
          className={cx(
            'relative overflow-hidden rounded-[46%_54%_57%_43%_/_52%_46%_54%_48%] shadow-2xl',
            ratio === 'square' ? 'aspect-square' : 'aspect-[4/5]'
          )}
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 42vw, 90vw"
            className="object-cover"
            style={{ objectPosition: focus }}
          />
        </figure>
      </div>

      {quote && (
        <figcaption
          className={cx(
            'relative z-10 mt-8 text-center sm:text-left',
            light ? 'text-white' : 'text-gray-700'
          )}
        >
          <blockquote className="font-display text-sm italic leading-snug sm:text-base">
            <span className={light ? 'text-primary' : 'text-primary-700'}>&ldquo;</span>
            {quote}
            <span className={light ? 'text-primary' : 'text-primary-700'}>&rdquo;</span>
          </blockquote>
          {attribution && (
            <div
              className={cx(
                'mt-2 text-[11px] font-semibold uppercase tracking-wider not-italic',
                light ? 'text-white/70' : 'text-gray-400'
              )}
            >
              {attribution}
            </div>
          )}
        </figcaption>
      )}
    </div>
  )
}
