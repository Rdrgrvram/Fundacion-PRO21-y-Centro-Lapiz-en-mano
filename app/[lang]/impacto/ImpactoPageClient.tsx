'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Locale } from '@/lib/i18n'
import type { Testimonial } from '@/lib/content'
import type { ImpactContent } from '@/lib/cms-schemas'
import { PALETTE } from '@/lib/palette'
import ProtagonistPhoto from '@/components/sections/ProtagonistPhoto'
import Icon from '@/components/ui/Icon'

// Mismo tratamiento de "ficha de actividad" (inclinación + borde de color +
// caption al hover) que components/sections/ProgramGallery.tsx — ambas
// galerías deben verse idénticas aunque vivan en archivos separados. Clases
// completas y literales (Tailwind JIT no resuelve nombres interpolados). Ver
// docs/DESIGN_STANDARD.md §Galería de fotos.
const TILT = [
  'motion-safe:-rotate-1',
  'motion-safe:rotate-1',
  'motion-safe:rotate-0',
  'motion-safe:rotate-1',
  'motion-safe:-rotate-1',
  'motion-safe:rotate-0',
]

const CATEGORY_BORDER: Record<string, string> = {
  'Mi Escuelita': 'border-t-primary',
  'Aula Wawitas': 'border-t-secondary',
  'Pasos Firmes': 'border-t-accent',
  Eventos: 'border-t-gray-700',
  _default: 'border-t-gray-300',
}

function Counter({ end, suffix = '', duration = 1500 }: { end: string; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const num = parseInt(end)

  useEffect(() => {
    if (isNaN(num)) return
    let start = 0
    const step = Math.ceil(num / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= num) {
        setCount(num)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [num, duration])

  return <span>{isNaN(num) ? end : count}{suffix}</span>
}

interface ImpactoPageClientProps {
  lang: Locale
  content: ImpactContent
  testimonials: Testimonial[]
}

export default function ImpactoPageClient({ lang, content, testimonials }: ImpactoPageClientProps) {
  const es = lang === 'es'
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [activeFilter, setActiveFilter] = useState(0)

  const activeT = testimonials[activeTestimonial]

  return (
    <div className="overflow-x-hidden w-full bg-gray-50">

      {/* 1. Page Hero */}
      <section className="relative bg-secondary overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-1/4 -left-16 w-64 h-64 bg-white/10 rounded-full" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" fill="none" className="block w-full h-8 md:h-16 lg:h-20 text-gray-50 fill-current">
            <path d="M0 0 Q360 60 720 30 Q1080 0 1440 0 L1440 60 L0 60 Z" />
          </svg>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-20">
          <nav className="flex items-center gap-2 text-white/60 text-xs mb-8">
            <Link href={`/${lang}`} className="hover:text-white transition-colors">{es ? 'Inicio' : 'Home'}</Link>
            <span>/</span>
            <span className="text-white font-semibold">{es ? 'Impacto' : 'Impact'}</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-1.5 mb-5">
            <span className="text-xs font-bold uppercase tracking-wider text-white select-none">{content.hero.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-extrabold leading-tight mb-4">
            {content.hero.title_line1} <br className="hidden sm:inline" />
            <span className="font-extrabold">{content.hero.title_line2}</span>
          </h1>

          <p className="text-sm md:text-base lg:text-lg text-white/80 max-w-2xl leading-relaxed">
            {content.hero.subtitle}
          </p>
        </div>
      </section>

      {/* 2. Impact Numbers Strip */}
      <section className="py-12 px-4 bg-gray-50 border-b border-gray-200/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-700" />
              <span className="text-xs font-bold uppercase tracking-wider text-primary-700">{content.stats_section.badge}</span>
            </div>
            <h2 className="text-3xl md:text-4xl text-gray-900 font-extrabold tracking-tight">{content.stats_section.title}</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
            {content.stats.map((s, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 h-full">
                <div>
                  <div className={`w-12 h-12 rounded-xl ${PALETTE[s.color].bg} flex items-center justify-center mb-4 shadow-sm select-none`}>
                    <Icon emoji={s.icon} className="h-6 w-6 text-gray-700" />
                  </div>
                  <div className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 leading-[0.9] mb-3 tracking-tight tabular-nums">
                    <Counter end={s.value} suffix={s.suffix ?? ''} />
                  </div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Historia destacada — cita real de familia sobre foto protagonista */}
      {content.featured_story && (
        <section className="py-16 md:py-24 px-4 bg-white border-b border-gray-200/50">
          <div className="container mx-auto max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <ProtagonistPhoto
                src={content.featured_story.image}
                alt={es ? `Actividad del programa ${content.featured_story.context}` : `${content.featured_story.context} program activity`}
                blobs={['secondary', 'primary']}
                ratio="square"
                focus="center 14%"
              />
              <div>
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-accent bg-accent-50 px-4 py-1.5 rounded-full">
                  {es ? 'Una historia detrás de las cifras' : 'A story behind the numbers'}
                </span>
                <p className="font-display text-2xl md:text-3xl text-gray-900 font-bold italic leading-snug mt-5">
                  &ldquo;{content.featured_story.quote}&rdquo;
                </p>
                <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider mt-5">
                  {content.featured_story.author} · {content.featured_story.context}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Testimonials Carousel */}
      <section className="py-16 md:py-24 px-4 bg-gray-50 border-b border-gray-200/50">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="text-center mb-10 max-w-md mx-auto">
            <div className="inline-flex items-center gap-2 bg-accent-50 border border-accent/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="text-xs font-bold uppercase tracking-wider text-accent">{content.testimonials_section.badge}</span>
            </div>
            <h2 className="text-2xl md:text-3xl text-gray-900 font-extrabold tracking-tight">{content.testimonials_section.title}</h2>
          </div>

          {activeT && (
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-sm text-left relative overflow-hidden mb-6 animate-[fadeSlideUp_0.5s_cubic-bezier(0.16,1,0.3,1)]">
              <span className="absolute top-2 left-6 font-serif text-8xl text-gray-100 pointer-events-none select-none">&ldquo;</span>
              <div className="relative z-10">
                <p className="font-serif text-base sm:text-lg md:text-xl text-gray-900 font-bold italic leading-relaxed mb-6">
                  &ldquo;{activeT.body}&rdquo;
                </p>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t border-gray-100 pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white select-none shadow-md" style={{ backgroundColor: PALETTE[activeT.color].hex }}>
                      <Icon emoji={activeT.icon} className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-gray-900">{activeT.family}</h4>
                      <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-0.5">{activeT.program}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 select-none">
                    {testimonials.map((tItem, idx) => (
                      <button
                        key={tItem.slug}
                        onClick={() => setActiveTestimonial(idx)}
                        className={`h-2.5 rounded-full transition-all focus:outline-none min-h-[11px] ${idx === activeTestimonial ? 'w-6 bg-primary' : 'w-2.5 bg-gray-200'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-3 gap-3 select-none">
            {testimonials.map((tm, idx) => (
              <button
                key={tm.slug}
                onClick={() => setActiveTestimonial(idx)}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all duration-300 focus:outline-none min-h-[44px] flex items-center gap-3 ${
                  idx === activeTestimonial ? 'border-primary bg-white shadow-sm scale-[1.01]' : 'border-gray-200 bg-white/70 hover:bg-white text-gray-500'
                }`}
              >
                <Icon emoji={tm.icon} className="h-5 w-5 flex-shrink-0 text-secondary" />
                <div>
                  <div className="text-[10px] font-bold text-gray-900 leading-tight">{tm.family}</div>
                  <div className="text-[8px] text-gray-400 font-semibold truncate max-w-[64px] sm:max-w-xs">{tm.program}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Transparency & Reports Grid */}
      <section className="py-16 md:py-24 px-4 bg-white border-b border-gray-200/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">{content.reports_section.badge}</span>
            </div>
            <h2 className="text-3xl md:text-4xl text-gray-900 font-extrabold tracking-tight mb-4">{content.reports_section.title}</h2>
            {content.reports_section.subtitle && <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">{content.reports_section.subtitle}</p>}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-start gap-4 text-left">
              <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-2 select-none">
                {es ? 'Informes Anuales Disponibles' : 'Available Annual Reports'}
              </div>
              <div className="space-y-3">
                {content.reports.map((r, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-2xl p-5 border border-gray-200/80 flex items-center justify-between hover:border-secondary/20 transition-all select-none hover:translate-x-1">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white border border-gray-150 flex items-center justify-center flex-shrink-0">
                        <Icon name="newspaper" className="h-5 w-5 text-secondary-700" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug">{r.title}</h4>
                        <p className="text-[10px] text-gray-400 font-semibold mt-0.5">{r.desc}</p>
                      </div>
                    </div>
                    <a
                      href={r.file || 'https://wa.me/59170106276'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-secondary/10 text-secondary font-bold text-[9px] uppercase tracking-wider px-3 py-1 rounded-full min-h-[28px] flex items-center justify-center whitespace-nowrap"
                    >
                      {r.file ? (es ? 'Descargar PDF' : 'Download PDF') : (es ? 'Solicitar' : 'Request')}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-start gap-4 text-left">
              <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-2 select-none">{content.reports_breakdown_title}</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {content.reports_breakdown.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-sm flex flex-col justify-between">
                    <div className={`w-9 h-9 rounded-xl ${PALETTE[item.color].bg} flex items-center justify-center mb-3 shadow-inner select-none`}>
                      <Icon emoji={item.icon} className="h-5 w-5 text-gray-700" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 mb-0.5">{item.title}</h4>
                      <p className="text-[10px] text-gray-400 leading-normal font-semibold">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Media Coverage Grid */}
      <section className="py-16 md:py-24 px-4 bg-gray-50 border-b border-gray-200/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="text-xs font-bold uppercase tracking-wider text-accent">{content.media_section.badge}</span>
            </div>
            <h2 className="text-3xl md:text-4xl text-gray-900 font-extrabold tracking-tight mb-4">{content.media_section.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto text-left">
            {content.media.map((m, idx) => {
              const hex = PALETTE[m.color].hex
              return (
                <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                  <div className="h-1 w-full" style={{ backgroundColor: hex }} />
                  <div className="p-6 md:p-8 flex flex-col justify-between min-h-[140px]">
                    <div className="flex justify-between items-center mb-4 select-none">
                      <div className="flex items-center gap-3">
                        {m.logo ? (
                          <div className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center p-1">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={m.logo} alt={m.outlet} className="max-h-full max-w-full object-contain" />
                          </div>
                        ) : (
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: hex }}>
                            <Icon name={/tele|tv/i.test(m.type) ? 'tv' : /prensa|press/i.test(m.type) ? 'newspaper' : 'globe'} className="h-4 w-4" />
                          </div>
                        )}
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-none">{m.outlet}</h4>
                          <span className="text-[9px] text-gray-400 font-semibold mt-1 block">{m.type}</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold px-2 py-0.5 bg-gray-50 rounded-full">{m.year}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 6. Photo Gallery — fotos reales */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">{content.gallery_section.badge}</span>
            </div>
            <h2 className="text-3xl md:text-4xl text-gray-900 font-extrabold tracking-tight mb-4">{content.gallery_section.title}</h2>
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-8 select-none">
            {content.gallery_categories.map((c, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveFilter(i)}
                className={`px-5 py-2 rounded-full border-2 font-bold text-xs sm:text-sm transition-all focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center ${
                  activeFilter === i ? 'border-secondary bg-secondary/10 text-secondary shadow-sm' : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {content.gallery
              .filter((img) => activeFilter === 0 || img.category === content.gallery_categories[activeFilter])
              .map((img, idx) => {
                const catColor = img.category ? CATEGORY_BORDER[img.category] ?? CATEGORY_BORDER._default : CATEGORY_BORDER._default
                return (
                  <div
                    key={idx}
                    className={`group relative h-48 sm:h-56 bg-white rounded-lg border-t-4 ${catColor} border-x border-b border-gray-200 shadow-sm overflow-hidden transition-all duration-300 hover:rotate-0 hover:shadow-lg hover:z-10 ${TILT[idx % TILT.length]}`}
                  >
                    <Image src={img.image} alt={img.alt} fill className="object-cover" />
                    {img.category && (
                      <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider text-gray-700 shadow-sm">
                        {img.category}
                      </span>
                    )}
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="p-3 text-[11px] leading-snug font-mono text-white">{img.alt}</p>
                    </div>
                  </div>
                )
              })}
          </div>

          <div className="text-center mt-6 select-none">
            <p className="text-[10px] text-gray-400 font-semibold italic">{content.gallery_note}</p>
          </div>
        </div>
      </section>

      {/* 7. Call To Action Footer */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">{content.cta.title}</h2>
          <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">{content.cta.text}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/${lang}/colabora`}
              className="inline-flex items-center gap-2 bg-gray-900 text-white font-bold px-8 py-4 rounded-full hover:bg-gray-800 transition-colors min-h-[52px]"
            >
              {es ? 'Colaborar ahora' : 'Collaborate now'}
            </Link>
            <a
              href="https://wa.me/59170106276"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors min-h-[52px]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              {es ? 'Solicitar informes' : 'Request reports'}
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
