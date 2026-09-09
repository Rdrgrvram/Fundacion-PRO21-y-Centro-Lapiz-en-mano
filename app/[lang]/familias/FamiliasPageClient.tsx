'use client'
import { useState } from 'react'
import Link from 'next/link'
import type { Locale } from '@/lib/i18n'
import type { FamiliesContent } from '@/lib/cms-schemas'
import { PALETTE } from '@/lib/palette'
import ProtagonistPhoto from '@/components/sections/ProtagonistPhoto'
import Icon from '@/components/ui/Icon'

interface FamiliasPageClientProps {
  lang: Locale
  content: FamiliesContent
}

export default function FamiliasPageClient({ lang, content }: FamiliasPageClientProps) {
  const es = lang === 'es'
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="overflow-x-hidden w-full bg-gray-50">

      {/* 1. Hero Section */}
      <section className="relative bg-accent overflow-hidden">
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
            <span className="text-white font-semibold">{es ? 'Familias' : 'Families'}</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-1.5 mb-5">
            <span className="text-xs font-bold uppercase tracking-wider text-white select-none">{content.hero.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-extrabold leading-tight mb-4">
            {content.hero.title_line1} <br className="hidden sm:inline" />
            <span className="italic font-normal">{content.hero.title_line2}</span>
          </h1>

          <p className="text-sm md:text-base lg:text-lg text-white/80 max-w-2xl leading-relaxed">{content.hero.subtitle}</p>
        </div>
      </section>

      {/* 2. Welcome Letter Block — carta + foto protagonista con cita real */}
      <section className="py-12 md:py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {content.welcome_letter.image && (
              <ProtagonistPhoto
                src={content.welcome_letter.image}
                alt={es ? 'Actividad en el Centro Lápiz en Mano' : 'Activity at Lápiz en Mano Center'}
                quote={content.welcome_letter.quote}
                author={content.welcome_letter.quote_author}
                blobs={['accent', 'secondary']}
                focus="center 26%"
              />
            )}
            <div className="bg-gradient-to-br from-accent-50 to-primary-50 rounded-3xl p-8 md:p-10 border border-accent/10 shadow-sm text-left">
              <h3 className="font-display text-2xl sm:text-3xl text-gray-900 font-bold mb-3">{content.welcome_letter.title}</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">{content.welcome_letter.text}</p>
              <p className="text-xs sm:text-sm font-bold text-accent italic mt-4">{content.welcome_letter.signature}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Free Virtual Sessions */}
      <section className="py-12 md:py-16 px-4 bg-gray-50 border-t border-b border-gray-200/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="text-xs font-bold uppercase tracking-wider text-accent">{content.sessions_section.badge}</span>
            </div>
            <h2 className="text-3xl md:text-4xl text-gray-900 font-extrabold tracking-tight mb-4">{content.sessions_section.title}</h2>
            {content.sessions_section.subtitle && <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">{content.sessions_section.subtitle}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto text-left">
            {content.virtual_sessions.map((s, idx) => {
              const style = PALETTE[s.color]
              return (
                <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300">
                  <div className="h-1.5 w-full" style={{ backgroundColor: style.hex }} />
                  <div className="p-6 md:p-8 flex items-start gap-5">
                    <div className={`w-12 h-12 rounded-2xl ${style.bg} flex items-center justify-center flex-shrink-0 select-none shadow-inner`}>
                      <Icon emoji={s.icon} className="h-6 w-6 text-gray-700" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg text-gray-900 font-bold mb-2">{s.title}</h4>
                      <div className="flex gap-2 mb-4 select-none">
                        <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full ${style.bg}`} style={{ color: style.hex }}>{s.freq}</span>
                        <span className="text-[9px] text-gray-400 font-bold px-2.5 py-0.5 rounded-full bg-gray-150">{s.duration}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="text-center mt-10 select-none">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/10 border border-secondary/10 text-xs font-semibold text-gray-700">
              <Icon name="check-circle" className="h-4 w-4 flex-shrink-0 text-secondary" />
              <span>{content.sessions_note}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Support Network Directory */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="text-xs font-bold uppercase tracking-wider text-accent">{content.network_section.badge}</span>
            </div>
            <h2 className="text-3xl md:text-4xl text-gray-900 font-extrabold tracking-tight mb-4">{content.network_section.title}</h2>
            {content.network_section.subtitle && <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">{content.network_section.subtitle}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto text-left">
            {content.support_network.map((item, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm flex items-start gap-5 hover:shadow-md transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-white select-none shadow-md" style={{ backgroundColor: PALETTE[item.color].hex }}>
                  <Icon emoji={item.icon} className="h-7 w-7" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg text-gray-900 font-bold mb-2">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Downloadable Guides List */}
      <section className="py-16 md:py-24 px-4 bg-gray-50 border-t border-b border-gray-200/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">{content.guides_section.badge}</span>
            </div>
            <h2 className="text-3xl md:text-4xl text-gray-900 font-extrabold tracking-tight mb-4">{content.guides_section.title}</h2>
            {content.guides_section.subtitle && <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">{content.guides_section.subtitle}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
            {content.guides.map((g, idx) => {
              const style = PALETTE[g.color]
              return (
                <div key={idx} className="bg-white rounded-3xl border border-gray-200 overflow-hidden flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <div>
                    <div className={`p-6 flex items-center justify-center relative min-h-[96px] ${style.bg}`}>
                      <Icon emoji={g.icon} className="h-9 w-9 text-gray-700" />
                      <span className="absolute top-3 right-3 text-[9px] font-bold px-2 py-0.5 bg-white rounded-full text-gray-500 select-none shadow-sm">{g.pages}</span>
                    </div>
                    <div className="p-6">
                      <span className="text-[9px] font-bold uppercase tracking-wide mb-1 block" style={{ color: style.hex }}>{g.program}</span>
                      <h4 className="text-sm sm:text-base text-gray-900 font-bold mb-2 leading-snug">{g.title}</h4>
                      <p className="text-xs text-gray-400 leading-relaxed mb-4 min-h-[48px]">{g.desc}</p>
                    </div>
                  </div>
                  <div className="px-6 pb-6 select-none">
                    <a
                      href={g.file || 'https://wa.me/59170106276'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl border flex items-center justify-center gap-1.5 text-xs font-bold transition-all"
                      style={{ color: style.hex, borderColor: `${style.hex}20` }}
                    >
                      <Icon name="download" className="h-4 w-4" />
                      <span>{g.file ? (es ? 'Descargar PDF' : 'Download PDF') : es ? 'Solicitar PDF por WhatsApp' : 'Request PDF via WhatsApp'}</span>
                    </a>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="text-center mt-8 select-none">
            <p className="text-xs text-gray-400 font-semibold italic">{content.guides_note}</p>
          </div>
        </div>
      </section>

      {/* 6. FAQ Accordions List */}
      <section id="faq" className="py-16 md:py-24 px-4 bg-gray-50 border-b border-gray-200/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-700" />
              <span className="text-xs font-bold uppercase tracking-wider text-primary-700">{content.faq_section.badge}</span>
            </div>
            <h2 className="text-3xl md:text-4xl text-gray-900 font-extrabold tracking-tight mb-4">{content.faq_section.title}</h2>
            {content.faq_section.subtitle && <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">{content.faq_section.subtitle}</p>}
          </div>

          <div className="flex flex-col gap-3.5 max-w-3xl mx-auto text-left">
            {content.faqs.map((faq, i) => {
              const isOpen = openFaq === i
              return (
                <div
                  key={i}
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className={`bg-white rounded-2xl border overflow-hidden shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 ${isOpen ? 'border-primary' : 'border-gray-200'}`}
                >
                  <div className="flex items-center justify-between p-5 select-none">
                    <div className="flex items-center gap-4">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 ${isOpen ? 'bg-primary text-black' : 'bg-gray-100 text-gray-400'}`}>
                        {i + 1}
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug">{faq.q}</h4>
                    </div>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${isOpen ? 'bg-primary/10 text-primary-700 rotate-180' : 'bg-gray-50 text-gray-400'}`}>▾</div>
                  </div>
                  <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-[350px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-5 pb-5 pl-5 sm:pl-18">
                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 7. Contact / Orientation CTA */}
      <section className="py-16 bg-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">{content.cta.title}</h2>
          <p className="text-white/90 text-lg mb-2 max-w-xl mx-auto">{content.cta.text}</p>
          <p className="text-sm text-white/70 max-w-md mx-auto mb-8">{content.cta.note}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/59170106276"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-900 text-white font-bold px-8 py-4 rounded-full hover:bg-gray-800 transition-colors min-h-[52px]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              {es ? 'Escríbenos por WhatsApp — 70106276' : 'Message us on WhatsApp — 70106276'}
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
