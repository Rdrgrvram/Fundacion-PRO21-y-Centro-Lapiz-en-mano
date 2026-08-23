'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Locale } from '@/lib/i18n'
import type { Testimonial } from '@/lib/content'
import type { ImpactContent } from '@/lib/cms-schemas'
import { PALETTE } from '@/lib/palette'

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
        {/* Decoraciones */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-1/4 -left-16 w-64 h-64 bg-white/10 rounded-full" />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-8">
            <a href={`/${lang}`} className="hover:text-white transition-colors">
              {es ? 'Inicio' : 'Home'}
            </a>
            <span>/</span>
            <span className="font-semibold text-white">{es ? 'Impacto' : 'Impact'}</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              {content.hero.badge}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              {content.hero.title_line1} <br />
              <span className="text-primary font-extrabold">{content.hero.title_line2}</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-2xl">
              {content.hero.subtitle}
            </p>
          </div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 80" fill="none" className="block w-full h-8 md:h-16 lg:h-20 text-[#f9fafb] fill-current">
            <path d="M0 40C360 70 720 15 1080 45C1260 60 1380 50 1440 48V80H0Z" />
          </svg>
        </div>
      </section>

      {/* 2. Impact Numbers Strip */}
      <section className="py-12 px-4 bg-gray-50 border-b border-gray-200/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">📊</span>
              <span className="text-xs font-bold uppercase tracking-wider text-primary-700">{content.stats_section.badge}</span>
            </div>
            <h2 className="font-sans text-3xl md:text-4xl text-[#111827] font-bold tracking-tight">{content.stats_section.title}</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
            {content.stats.map((s, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 h-full">
                <div>
                  <div className={`w-12 h-12 rounded-xl ${PALETTE[s.color].bg} flex items-center justify-center text-2xl mb-4 shadow-sm select-none`}>
                    {s.icon}
                  </div>
                  <div className="font-sans text-3xl sm:text-4xl font-bold text-gray-900 leading-none mb-2">
                    <Counter end={s.value} suffix={s.suffix ?? ''} />
                  </div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Testimonials Carousel */}
      <section className="py-16 md:py-24 px-4 bg-[#f9fafb] border-b border-gray-200/50">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="text-center mb-10 max-w-md mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#f5edfb] border border-[#8c3cbd]/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">💛</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8c3cbd]">{content.testimonials_section.badge}</span>
            </div>
            <h2 className="font-sans text-2xl md:text-3xl text-[#111827] font-bold tracking-tight">{content.testimonials_section.title}</h2>
          </div>

          {activeT && (
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-sm text-left relative overflow-hidden mb-6 animate-[fadeSlideUp_0.5s_cubic-bezier(0.16,1,0.3,1)]">
              <span className="absolute top-2 left-6 font-sans text-8xl text-gray-100 pointer-events-none select-none">&ldquo;</span>
              <div className="relative z-10">
                <p className="font-sans text-base sm:text-lg md:text-xl text-[#111827] font-bold italic leading-relaxed mb-6">
                  &ldquo;{activeT.body}&rdquo;
                </p>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t border-gray-100 pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl text-white select-none shadow-md" style={{ backgroundColor: PALETTE[activeT.color].hex }}>
                      {activeT.icon}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#111827]">{activeT.family}</h4>
                      <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-0.5">{activeT.program}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 select-none">
                    {testimonials.map((tItem, idx) => (
                      <button
                        key={tItem.slug}
                        onClick={() => setActiveTestimonial(idx)}
                        className={`h-2.5 rounded-full transition-all focus:outline-none min-h-[11px] ${idx === activeTestimonial ? 'w-6 bg-[#ffc500]' : 'w-2.5 bg-gray-200'}`}
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
                <span className="text-xl">{tm.icon}</span>
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
              <span className="text-sm">🔍</span>
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">{content.reports_section.badge}</span>
            </div>
            <h2 className="font-sans text-3xl md:text-4xl text-[#111827] font-bold tracking-tight mb-4">{content.reports_section.title}</h2>
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
                      <div className="w-12 h-12 rounded-xl bg-white border border-gray-150 flex items-center justify-center text-2xl flex-shrink-0">📊</div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#111827] leading-snug">{r.title}</h4>
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
                    <div className={`w-9 h-9 rounded-xl ${PALETTE[item.color].bg} flex items-center justify-center text-xl mb-3 shadow-inner select-none`}>{item.icon}</div>
                    <div>
                      <h4 className="text-xs font-bold text-[#111827] mb-0.5">{item.title}</h4>
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
      <section className="py-16 md:py-24 px-4 bg-[#f9fafb] border-b border-gray-200/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">📰</span>
              <span className="text-xs font-bold uppercase tracking-wider text-accent">{content.media_section.badge}</span>
            </div>
            <h2 className="font-sans text-3xl md:text-4xl text-[#111827] font-bold tracking-tight mb-4">{content.media_section.title}</h2>
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
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-xs" style={{ backgroundColor: hex }}>
                          {m.outlet.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-[#111827] leading-none">{m.outlet}</h4>
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
              <span className="text-sm">📷</span>
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">{content.gallery_section.badge}</span>
            </div>
            <h2 className="font-sans text-3xl md:text-4xl text-[#111827] font-bold tracking-tight mb-4">{content.gallery_section.title}</h2>
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

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {content.gallery.map((img, idx) => (
              <div key={idx} className="relative h-48 sm:h-56 rounded-2xl overflow-hidden border border-gray-200 transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
                <Image src={img.image} alt={img.alt} fill className="object-cover" />
              </div>
            ))}
          </div>

          <div className="text-center mt-6 select-none">
            <p className="text-[10px] text-gray-400 font-semibold italic">{content.gallery_note}</p>
          </div>
        </div>
      </section>

      {/* 7. Call To Action Footer */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-gray-900 via-secondary-700 to-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient(circle, rgba(232,168,56,0.06), transparent 70%) pointer-events-none" />
        <div className="container mx-auto max-w-3xl relative z-10 text-center">
          <span className="text-5xl block mb-5 animate-[float_4s_ease-in-out_infinite] select-none">🌍</span>
          <h2 className="font-sans text-3xl md:text-4xl text-white font-bold leading-tight mb-4">{content.cta.title}</h2>
          <p className="text-sm md:text-base text-white/70 max-w-xl mx-auto leading-relaxed mb-10">{content.cta.text}</p>
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <Link
              href={`/${lang}/colabora`}
              className="bg-primary hover:bg-primary/95 text-black font-extrabold text-sm px-8 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/10 min-h-[44px] flex items-center justify-center"
            >
              {es ? 'Colaborar ahora' : 'Collaborate now'}
            </Link>
            <a
              href="https://wa.me/59170106276"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 hover:border-white/50 bg-white/5 text-white font-bold text-sm px-8 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[44px] flex items-center justify-center"
            >
              {es ? 'Solicitar informes' : 'Request reports'}
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
