'use client'
import { useState } from 'react'
import type { Locale } from '@/lib/i18n'
import type { FamiliesContent } from '@/lib/cms-schemas'
import { PALETTE } from '@/lib/palette'

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
            <span className="font-semibold text-white">{es ? 'Familias' : 'Families'}</span>
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
            <path d="M0 45C320 20 640 60 960 35C1200 15 1380 40 1440 38V80H0Z" />
          </svg>
        </div>
      </section>

      {/* 2. Welcome Letter Block */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-br from-[#fdf2f8] to-[#fdf6e3] rounded-3xl p-8 md:p-10 border border-accent/10 shadow-sm text-left relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-radial-gradient(circle, rgba(232,168,56,0.1), transparent 70%) pointer-events-none" />
            <div className="flex flex-col sm:flex-row items-start gap-6 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8c3cbd] to-[#e86840] text-white flex items-center justify-center text-3xl shadow-md flex-shrink-0 select-none">💌</div>
              <div>
                <h3 className="font-sans text-xl sm:text-2xl text-[#111827] font-bold mb-3">{content.welcome_letter.title}</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">{content.welcome_letter.text}</p>
                <p className="text-xs sm:text-sm font-bold text-accent italic mt-4">{content.welcome_letter.signature}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Free Virtual Sessions */}
      <section className="py-12 md:py-16 px-4 bg-gray-50 border-t border-b border-gray-200/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">🎥</span>
              <span className="text-xs font-bold uppercase tracking-wider text-accent">{content.sessions_section.badge}</span>
            </div>
            <h2 className="font-sans text-3xl md:text-4xl text-[#111827] font-bold tracking-tight mb-4">{content.sessions_section.title}</h2>
            {content.sessions_section.subtitle && <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">{content.sessions_section.subtitle}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto text-left">
            {content.virtual_sessions.map((s, idx) => {
              const style = PALETTE[s.color]
              return (
                <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300">
                  <div className="h-1.5 w-full" style={{ backgroundColor: style.hex }} />
                  <div className="p-6 md:p-8 flex items-start gap-5">
                    <div className={`w-12 h-12 rounded-2xl ${style.bg} flex items-center justify-center text-2xl flex-shrink-0 select-none shadow-inner`}>{s.icon}</div>
                    <div>
                      <h4 className="font-sans text-base sm:text-lg text-[#111827] font-bold mb-2">{s.title}</h4>
                      <div className="flex gap-2 mb-4 select-none">
                        <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full ${style.bg}`} style={{ color: style.hex }}>{s.freq}</span>
                        <span className="text-[9px] text-gray-400 font-bold px-2.5 py-0.5 rounded-full bg-gray-150">⏱ {s.duration}</span>
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
              <span>✅</span>
              <span>{content.sessions_note}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Support Network Directory */}
      <section className="py-16 px-4 bg-[#f7f5f0]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#fdf2f8] border border-accent/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">🤝</span>
              <span className="text-xs font-bold uppercase tracking-wider text-accent">{content.network_section.badge}</span>
            </div>
            <h2 className="font-sans text-3xl md:text-4xl text-[#111827] font-bold tracking-tight mb-4">{content.network_section.title}</h2>
            {content.network_section.subtitle && <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">{content.network_section.subtitle}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto text-left">
            {content.support_network.map((item, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm flex items-start gap-5 hover:shadow-md transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 text-white select-none shadow-md" style={{ backgroundColor: PALETTE[item.color].hex }}>
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-sans text-base sm:text-lg text-[#111827] font-bold mb-2">{item.title}</h4>
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
              <span className="text-sm">📄</span>
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">{content.guides_section.badge}</span>
            </div>
            <h2 className="font-sans text-3xl md:text-4xl text-[#111827] font-bold tracking-tight mb-4">{content.guides_section.title}</h2>
            {content.guides_section.subtitle && <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">{content.guides_section.subtitle}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
            {content.guides.map((g, idx) => {
              const style = PALETTE[g.color]
              return (
                <div key={idx} className="bg-white rounded-3xl border border-gray-200 overflow-hidden flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <div>
                    <div className={`p-6 flex items-center justify-center text-5xl relative min-h-[96px] ${style.bg}`}>
                      <span className="select-none animate-[float_4s_ease-in-out_infinite]">{g.icon}</span>
                      <span className="absolute top-3 right-3 text-[9px] font-bold px-2 py-0.5 bg-white rounded-full text-gray-500 select-none shadow-sm">{g.pages}</span>
                    </div>
                    <div className="p-6">
                      <span className="text-[9px] font-bold uppercase tracking-wide mb-1 block" style={{ color: style.hex }}>{g.program}</span>
                      <h4 className="font-sans text-sm sm:text-base text-[#111827] font-bold mb-2 leading-snug">{g.title}</h4>
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
                      <span>⬇️</span>
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
      <section id="faq" className="py-16 md:py-24 px-4 bg-[#f7f5f0] border-b border-gray-200/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">❓</span>
              <span className="text-xs font-bold uppercase tracking-wider text-primary-700">{content.faq_section.badge}</span>
            </div>
            <h2 className="font-sans text-3xl md:text-4xl text-[#111827] font-bold tracking-tight mb-4">{content.faq_section.title}</h2>
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
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-sans text-sm font-bold transition-all duration-300 ${isOpen ? 'bg-primary text-black' : 'bg-gray-100 text-gray-400'}`}>
                        {i + 1}
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#111827] leading-snug">{faq.q}</h4>
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
      <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-[#1a1a1a] via-[#6b234e] to-[#8c3cbd] relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient(circle, rgba(232,168,56,0.06), transparent 70%) pointer-events-none" />
        <div className="container mx-auto max-w-3xl relative z-10 text-center">
          <span className="text-5xl block mb-5 animate-[float_4s_ease-in-out_infinite] select-none">💛</span>
          <h2 className="font-sans text-3xl md:text-4xl text-white font-bold leading-tight mb-4">{content.cta.title}</h2>
          <p className="text-sm md:text-base text-white/70 max-w-xl mx-auto leading-relaxed mb-6">{content.cta.text}</p>
          <p className="text-xs sm:text-sm text-white/55 italic max-w-md mx-auto mb-10">{content.cta.note}</p>
          <div className="flex justify-center">
            <a
              href="https://wa.me/59170106276"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#22c55e] hover:bg-[#22c55e]/90 text-white font-extrabold text-sm sm:text-base px-8 py-3.5 sm:py-4 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#22c55e]/20 min-h-[44px] flex items-center justify-center gap-2"
            >
              <span className="text-xl">💬</span>
              {es ? 'Escríbenos por WhatsApp — 70106276' : 'Message us on WhatsApp — 70106276'}
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
