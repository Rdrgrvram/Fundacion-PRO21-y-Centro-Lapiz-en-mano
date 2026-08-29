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

interface ProtagonistPhotoProps {
  src: string
  alt: string
  /** Cita real superpuesta sobre la foto (con degradado para contraste AA). */
  quote?: string
  /** Autor de la cita, ej. "Familia Quispe". */
  author?: string
  /** Contexto de la cita, ej. "Mi Escuelita Down". */
  context?: string
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
  blobs = ['secondary', 'accent'],
  ratio = 'portrait',
  priority = false,
  className,
}: ProtagonistPhotoProps) {
  const attribution = [author, context].filter(Boolean).join(' · ')

  return (
    <div className={cx('relative mx-auto w-full max-w-md lg:max-w-none', className)}>
      {/* Blobs de marca detrás de la foto */}
      <div
        className={cx(
          'absolute -left-8 -top-6 h-40 w-40 rounded-[42%_58%_63%_37%_/_45%_42%_58%_55%]',
          BLOB[blobs[0]]
        )}
      />
      <div
        className={cx(
          'absolute -bottom-10 -right-6 h-44 w-44 rounded-[58%_42%_37%_63%_/_55%_58%_42%_45%]',
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
          className="object-cover object-[center_18%]"
        />

        {quote && (
          <>
            {/* Degradado para contraste AA de la cita sobre la foto */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
              <blockquote className="font-display text-sm italic leading-snug text-white sm:text-base">
                &ldquo;{quote}&rdquo;
              </blockquote>
              {attribution && (
                <div className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-white/70 not-italic">
                  {attribution}
                </div>
              )}
            </figcaption>
          </>
        )}
      </figure>
    </div>
  )
}
