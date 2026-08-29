import Link from 'next/link'
import type { Locale } from '@/lib/i18n'
import { EXTENDED_PALETTE, type AccentColor } from '@/lib/palette'
import type { Program } from '@/lib/content'
import { waLink } from '@/lib/utils'
import ProtagonistPhoto from '@/components/sections/ProtagonistPhoto'

// Blobs de fondo para la foto — dos colores de marca distintos al del hero,
// para que contrasten sobre el fondo sólido del programa.
const HERO_BLOBS: Record<AccentColor, [AccentColor, AccentColor]> = {
  primary: ['secondary', 'accent'],
  secondary: ['primary', 'accent'],
  accent: ['primary', 'secondary'],
}

interface ProgramHeroProps {
  lang: Locale
  program: Program
  whatsappNumber: string
}

export default function ProgramHero({ lang, program, whatsappNumber }: ProgramHeroProps) {
  const es = lang === 'es'
  const style = EXTENDED_PALETTE[program.hero.color]

  return (
    <section className={`relative ${style.bgSolid} overflow-hidden`}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-1/4 -left-16 w-64 h-64 bg-white/10 rounded-full" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <nav className={`flex items-center gap-2 text-sm mb-8 ${style.textOn === 'text-white' ? 'text-white/70' : 'text-gray-800/70'}`}>
          <Link href={`/${lang}`} className={`transition-colors ${style.textOn === 'text-white' ? 'hover:text-white' : 'hover:text-gray-900'}`}>
            {es ? 'Inicio' : 'Home'}
          </Link>
          <span>/</span>
          <span className={`font-semibold ${style.textOn}`}>{program.title}</span>
        </nav>

        <div className={program.hero.image ? 'grid lg:grid-cols-2 lg:gap-14 lg:items-center' : ''}>
          <div className="max-w-3xl">
          <span className={`inline-block bg-white/20 ${style.textOn} text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6`}>
            {program.hero.badge}
          </span>
          <h1 className={`text-4xl md:text-5xl font-extrabold leading-tight mb-6 ${style.textOn}`}>
            {program.title}
          </h1>
          <p className={`text-lg md:text-xl leading-relaxed mb-8 max-w-2xl ${style.textOn === 'text-white' ? 'text-white/90' : 'text-gray-800'}`}>
            {program.hero.subtitle}
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#section-1"
              className={`inline-flex items-center gap-2 bg-white ${style.text} font-bold px-6 py-3 rounded-full hover:bg-gray-100 transition-colors min-h-[44px]`}
            >
              {es ? 'Ver detalles' : 'See details'}
            </a>
            <a
              href={waLink(whatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 bg-black/10 ${style.textOn} font-bold px-6 py-3 rounded-full hover:bg-black/20 transition-colors min-h-[44px]`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {es ? 'Consultar por WhatsApp' : 'WhatsApp inquiry'}
            </a>
          </div>
          </div>

          {program.hero.image && (
            <ProtagonistPhoto
              src={program.hero.image}
              alt={es ? `Actividad del programa ${program.title}` : `${program.title} program activity`}
              quote={program.hero.quote}
              author={program.hero.quoteAuthor}
              context={program.hero.quoteContext}
              quoteTone={program.hero.color === 'primary' ? 'dark' : 'light'}
              blobs={HERO_BLOBS[program.hero.color]}
              priority
              className="mt-12 lg:mt-0"
            />
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-10 md:h-14 fill-white">
          <path d="M0 0 Q360 60 720 30 Q1080 0 1440 0 L1440 60 L0 60 Z" />
        </svg>
      </div>
    </section>
  )
}
