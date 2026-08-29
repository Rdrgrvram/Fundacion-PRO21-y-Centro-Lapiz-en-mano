import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import type { Locale } from '@/lib/i18n'
import { getAllTeamAreas } from '@/lib/content'
import { getAboutContent } from '@/lib/cms'
import { PALETTE, type AccentColor } from '@/lib/palette'
import ProtagonistPhoto from '@/components/sections/ProtagonistPhoto'

interface PageProps {
  params: {
    lang: Locale
  }
}

export async function generateMetadata({ params: { lang } }: PageProps): Promise<Metadata> {
  const es = lang === 'es'
  return {
    title: es ? 'Quiénes Somos | Fundación PRO-21 y Centro Lápiz en Mano' : 'About Us | PRO-21 Foundation & Lápiz en Mano Center',
    description: es
      ? 'Conoce la misión, visión, valores y trayectoria del Centro Lápiz en Mano y la Fundación PRO-21 en La Paz, Bolivia.'
      : 'Learn about the mission, vision, values, and history of the Lápiz en Mano Center and the PRO-21 Foundation in La Paz, Bolivia.',
  }
}

// Estilos de las tarjetas de Misión/Visión/Objetivo — Tailwind JIT necesita
// clases literales, así que el color que llega del CMS (un enum) se resuelve
// acá. Ver lib/palette.ts para el mismo patrón aplicado a bg simple.
const CARD_STYLES: Record<AccentColor, { text: string; from: string }> = {
  primary: { text: 'text-primary-700', from: 'from-primary' },
  secondary: { text: 'text-secondary', from: 'from-secondary' },
  accent: { text: 'text-accent', from: 'from-accent' },
}

export default function Page({ params: { lang } }: PageProps) {
  const es = lang === 'es'
  const content = getAboutContent(lang)
  // La vista previa del equipo reusa las áreas de especialidad ya migradas en
  // la Fase 2, igual que en la página de Inicio — evita duplicar la lista.
  const teamAreas = getAllTeamAreas(lang)

  return (
    <div className="overflow-x-hidden w-full bg-gray-50">

      {/* 1. Page Hero Section */}
      <section className="relative bg-secondary overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-1/4 -left-16 w-64 h-64 bg-white/10 rounded-full" />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <nav className="flex items-center gap-2 text-white/60 text-xs mb-8">
            <Link href={`/${lang}`} className="hover:text-white transition-colors">{es ? 'Inicio' : 'Home'}</Link>
            <span>/</span>
            <span className="text-white font-semibold">{es ? 'Quiénes Somos' : 'About Us'}</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-1.5 mb-5">
            <span className="text-xs font-bold uppercase tracking-wider text-white select-none">
              {content.hero.badge}
            </span>
          </div>

          <h1 id="nosotros-titulo" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-extrabold leading-tight mb-4">
            {content.hero.title_line1} <br className="hidden sm:inline" />
            {/* Itálica de la fuente display, sin color de acento — evita el fallo
                de contraste de text-primary sobre bg-secondary (ver DESIGN_STANDARD.md). */}
            <span className="italic font-normal">{content.hero.title_line2}</span>
          </h1>

          <p className="text-sm md:text-base lg:text-lg text-white/80 max-w-2xl leading-relaxed">
            {content.hero.subtitle}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-10 md:h-14 fill-white">
            <path d="M0 0 Q360 60 720 30 Q1080 0 1440 0 L1440 60 L0 60 Z" />
          </svg>
        </div>
      </section>

      {/* 2. Identity - Two Institutions */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {content.identity.image && (
            <ProtagonistPhoto
              src={content.identity.image}
              alt={es ? 'Actividad en el Centro Lápiz en Mano' : 'Activity at Lápiz en Mano Center'}
              ratio="square"
              blobs={['secondary', 'accent']}
              className="mb-12 max-w-sm"
            />
          )}
          <div className="flex flex-col lg:flex-row items-stretch justify-between gap-8 lg:gap-0">

            {/* PRO-21 Card */}
            <div className="w-full lg:w-[46%] bg-white rounded-3xl p-8 md:p-10 border border-gray-200/80 shadow-sm transition-all hover:shadow-md hover:border-gray-300 flex flex-col">
              <div className="w-16 h-16 mb-6 select-none">
                <Image src="/icons/logo-pro21.png" alt="Fundación PRO-21" width={64} height={64} className="w-full h-full object-contain" />
              </div>
              <h3 className="text-2xl text-gray-900 font-bold mb-1">Fundación PRO-21</h3>
              <p className="text-xs font-semibold text-secondary italic tracking-wide mb-5">
                {content.identity.pro21.tagline}
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                {content.identity.pro21.description}
              </p>
            </div>

            {/* Separador */}
            <div className="w-full lg:w-[8%] flex lg:flex-col items-center justify-center gap-4 py-4 lg:py-0 select-none">
              <div className="h-0.5 lg:h-full w-full lg:w-0.5 bg-gradient-to-r lg:bg-gradient-to-b from-transparent via-primary to-transparent flex-1" />
              <div className="w-11 h-11 rounded-full bg-primary/15 border-2 border-primary flex items-center justify-center text-lg shadow-sm flex-shrink-0">
                🤝
              </div>
              <div className="h-0.5 lg:h-full w-full lg:w-0.5 bg-gradient-to-r lg:bg-gradient-to-b from-transparent via-primary to-transparent flex-1" />
            </div>

            {/* Lápiz en Mano Card */}
            <div className="w-full lg:w-[46%] bg-white rounded-3xl p-8 md:p-10 border border-gray-200/80 shadow-sm transition-all hover:shadow-md hover:border-gray-300 flex flex-col">
              <div className="w-16 h-16 mb-6 select-none">
                <Image src="/icons/logo-lapiz.png" alt="Centro Lápiz en Mano" width={64} height={64} className="w-full h-full object-contain" />
              </div>
              <h3 className="text-2xl text-gray-900 font-bold mb-1">Centro Lápiz en Mano</h3>
              <p className="text-xs font-semibold text-accent italic tracking-wide mb-5">
                {content.identity.lapiz.tagline}
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                {content.identity.lapiz.description}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Mission / Vision / Objective */}
      <section className="py-12 md:py-16 px-4 bg-white border-t border-b border-gray-100">
        <div className="container mx-auto max-w-6xl">

          <div className="text-center mb-12 max-w-md mx-auto">
            <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">📌</span>
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                {content.mission_section.badge}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl text-gray-900 font-extrabold tracking-tight">
              {content.mission_section.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {content.mission_cards.map((card, i) => {
              const style = CARD_STYLES[card.color]
              const palette = PALETTE[card.color]
              return (
                <div
                  key={i}
                  className="bg-white rounded-3xl border border-gray-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-300"
                >
                  <div className={`h-1.5 w-full bg-gradient-to-r ${style.from} to-white`} />
                  <div className="p-8 flex-1 flex flex-col">
                    <div className={`w-12 h-12 rounded-xl ${palette.bg} flex items-center justify-center text-2xl mb-5 shadow-sm`}>
                      {card.icon}
                    </div>
                    <div className={`text-[10px] font-bold tracking-widest uppercase mb-2 ${style.text}`}>
                      {card.label}
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {card.text}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* 4. Values Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-6xl">

          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">💛</span>
              <span className="text-xs font-bold uppercase tracking-wider text-primary-700">
                {content.values_section.badge}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl text-gray-900 font-extrabold tracking-tight mb-4">
              {content.values_section.title}
            </h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
              {content.values_section.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.values.map((v, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl bg-white border border-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-gray-300 flex flex-col justify-between h-full"
              >
                <div>
                  <div className={`w-11 h-11 rounded-xl ${PALETTE[v.color].bg} flex items-center justify-center text-xl mb-4 transition-all duration-300 group-hover:scale-105`}>
                    {v.icon}
                  </div>
                  <h4 className="text-base text-gray-900 font-bold mb-2">
                    {v.name}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
                <div className="w-8 h-1 bg-gray-200 rounded-full mt-5 group-hover:bg-secondary transition-colors" />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Timeline */}
      <section className="py-16 md:py-24 px-4 bg-white border-t border-b border-gray-100">
        <div className="container mx-auto max-w-4xl">

          <div className="text-center mb-16 max-w-md mx-auto">
            <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">📅</span>
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                {content.timeline_section.badge}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl text-gray-900 font-extrabold tracking-tight mb-4">
              {content.timeline_section.title}
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              {content.timeline_section.subtitle}
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/0 via-primary/80 to-primary/0 transform -translate-x-1/2" />
            <div className="block md:hidden absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/10 via-primary/80 to-primary/0" />

            <div className="space-y-12 md:space-y-8 relative">
              {content.timeline.map((item, idx) => {
                const isLeft = idx % 2 === 0
                return (
                  <div
                    key={idx}
                    className="relative flex flex-col md:grid md:grid-cols-[1fr_60px_1fr] md:items-center text-left"
                  >
                    <div className="hidden md:block text-right">
                      {isLeft && (
                        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:border-secondary/30 transition-all duration-300 mr-6">
                          <span className="inline-block text-xs font-bold px-3 py-1 bg-secondary/10 text-secondary rounded-full mb-3">{item.year}</span>
                          <h4 className="text-lg text-gray-900 font-bold mb-2">{item.title}</h4>
                          <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-start pl-0 md:pl-0 md:justify-center relative z-20 mb-4 md:mb-0">
                      <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white border-[3px] border-primary flex items-center justify-center text-xl shadow-md absolute left-0 md:relative md:left-auto">
                        {item.icon}
                      </div>
                    </div>

                    <div className="pl-14 md:pl-6 text-left">
                      {!isLeft && (
                        <div className="hidden md:block bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:border-secondary/30 transition-all duration-300">
                          <span className="inline-block text-xs font-bold px-3 py-1 bg-secondary/10 text-secondary rounded-full mb-3">{item.year}</span>
                          <h4 className="text-lg text-gray-900 font-bold mb-2">{item.title}</h4>
                          <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                        </div>
                      )}

                      <div className="block md:hidden bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 shadow-sm">
                        <span className="inline-block text-[10px] font-bold px-2.5 py-0.5 bg-secondary/10 text-secondary rounded-full mb-2">{item.year}</span>
                        <h4 className="text-base text-gray-900 font-bold mb-1.5">{item.title}</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>

                  </div>
                )
              })}
            </div>

          </div>

        </div>
      </section>

      {/* 6. Team Teaser Section */}
      <section className="py-16 md:py-24 px-4 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-1/4 -left-16 w-64 h-64 bg-white/10 rounded-full" />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">

          <div className="text-center mb-12 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                {content.team_section.badge}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl text-white font-extrabold tracking-tight mb-4">
              {content.team_section.title}
            </h2>
            <p className="text-sm md:text-base text-white/80 max-w-lg mx-auto leading-relaxed">
              {content.team_section.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {teamAreas.map((area) => (
              <div
                key={area.slug}
                className="bg-white/10 border border-white/20 p-5 rounded-2xl text-center transition-all duration-300 hover:bg-white/20 hover:-translate-y-1 select-none flex flex-col items-center justify-center min-h-[110px]"
              >
                <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center text-2xl mb-3">
                  {area.icon}
                </div>
                <div className="text-xs font-semibold text-white/90 leading-tight">
                  {area.name}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href={`/${lang}/equipo`}
              className="bg-primary hover:bg-primary/95 text-black font-extrabold text-sm px-8 py-3.5 sm:py-4 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/10 min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
            >
              {es ? 'Conoce al equipo completo →' : 'Meet the entire team →'}
            </Link>
          </div>

        </div>
      </section>

      {/* 7. CTA Banner — plano, sin círculos ni emoji glifo (ver DESIGN_STANDARD.md § CTA final) */}
      <section className="py-16 md:py-24 px-4 bg-primary">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl text-gray-900 font-extrabold mb-4">
            {content.cta.title}
          </h2>
          <p className="text-sm md:text-base text-gray-800/80 leading-relaxed mb-8 max-w-xl mx-auto">
            {content.cta.text}
          </p>
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <Link
              href={`/${lang}/colabora`}
              className="bg-gray-900 hover:bg-gray-800 text-white font-extrabold text-sm px-8 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              {es ? 'Colaborar ahora' : 'Support now'}
            </Link>
            <Link
              href={`/${lang}/contacto`}
              className="border-2 border-gray-900/30 hover:border-gray-900/60 bg-transparent text-gray-900 font-bold text-sm px-8 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              {es ? 'Contactar' : 'Contact'}
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
