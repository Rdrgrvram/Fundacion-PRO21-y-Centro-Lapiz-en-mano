'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getTranslation, type Locale } from '@/lib/i18n'
import type { TeamArea, TeamMember, Volunteer } from '@/lib/cms'
import type { EquipoPageContent } from '@/lib/cms-schemas'
import { PALETTE } from '@/lib/palette'

interface EquipoPageClientProps {
  lang: Locale
  content: EquipoPageContent
  navLabel?: string
  areas: TeamArea[]
  team: TeamMember[]
  volunteers: Volunteer[]
}

export default function EquipoPageClient({ lang, content, navLabel, areas, team, volunteers }: EquipoPageClientProps) {
  const t = getTranslation(lang)
  const [selectedArea, setSelectedArea] = useState<number | null>(null)

  // El valor de las 2 primeras cifras se calcula acá (se autoactualiza con el
  // contenido real) — el CMS solo controla ícono/etiqueta para esas 2. Las
  // últimas 2 sí usan el valor tal cual viene del CMS. Ver hint del campo en
  // public/admin/config.yml.
  const stats = content.stats.map((s, i) => ({
    icon: s.icon,
    label: s.label,
    value: i === 0 ? `${team.length}+` : i === 1 ? String(areas.length) : (s.value ?? ''),
  }))

  const selectedData = selectedArea !== null ? areas[selectedArea] : null

  const filteredTeam = selectedData ? team.filter((m) => m.area === selectedData.slug) : team

  return (
    <div className="overflow-x-hidden w-full bg-gray-50">
      {/* 1. Page Hero */}
      <section className="relative bg-accent overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-1/4 -left-16 w-64 h-64 bg-white/10 rounded-full" />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <nav className="flex items-center gap-2 text-white/60 text-xs mb-8">
            <Link href={`/${lang}`} className="hover:text-white transition-colors">{t['nav.home']}</Link>
            <span>/</span>
            <span className="text-white font-semibold">{navLabel ?? t['nav.team']}</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-1.5 mb-5">
            <span className="text-xs font-bold uppercase tracking-wider text-white select-none">
              {content.hero.badge}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-extrabold leading-tight mb-4">
            {content.hero.title_line1} <br />
            <span className="font-bold italic text-primary">{content.hero.title_line2}</span>
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

      {/* 2. Stats Bar Strip */}
      <section className="bg-gray-50 py-10 px-4 border-b border-gray-200/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col items-center text-center transition-all duration-300 hover:shadow-md select-none"
              >
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 leading-none">{s.value}</div>
                <div className="text-xs text-gray-400 font-semibold mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Philosophy of Work */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">🩺</span>
              <span className="text-xs font-bold uppercase tracking-wider text-primary-700">
                {content.philosophy_section.badge}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl text-gray-900 font-extrabold tracking-tight mb-4">
              {content.philosophy_section.title}
            </h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
              {content.philosophy_section.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {content.philosophy_items.map((p, i) => (
              <div
                key={i}
                className="bg-gray-50 border border-gray-200 rounded-3xl p-6 flex flex-col justify-between hover:shadow-sm hover:border-gray-300 transition-all duration-300 h-full"
              >
                <div>
                  <div className="text-3xl mb-4 select-none">{p.icon}</div>
                  <h4 className="text-base text-gray-900 font-bold mb-2">{p.title}</h4>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Areas Grid Filter & Staff Profile Cards List */}
      <section className="py-16 md:py-24 px-4 bg-[#f9fafb] border-t border-b border-gray-200/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">🏥</span>
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                {content.team_grid_section.badge}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl text-gray-900 font-extrabold tracking-tight mb-4">
              {content.team_grid_section.title}
            </h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
              {content.team_grid_section.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto text-left mb-12">
            {areas.map((a, i) => {
              const isSelected = selectedArea === i
              const palette = PALETTE[a.color]
              return (
                <div
                  key={a.slug}
                  onClick={() => setSelectedArea(isSelected ? null : i)}
                  className={`bg-white rounded-2xl overflow-hidden border cursor-pointer shadow-sm transition-all duration-300 hover:shadow-md ${
                    isSelected ? 'border-primary shadow-[#229cc2]/5 scale-[1.01]' : 'border-gray-200/80 hover:border-gray-300'
                  }`}
                >
                  <div className="h-1 w-full" style={{ backgroundColor: palette.hex }} />
                  <div className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${isSelected ? 'bg-primary text-black' : palette.bg}`}>
                        {a.icon}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 leading-snug">{a.name}</h4>
                        <span className="text-[9px] text-gray-400 font-semibold block mt-0.5">
                          {team.filter((m) => m.area === a.slug).length} {content.team_grid_section.staff_count_label}
                        </span>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-transform duration-300 ${isSelected ? 'bg-primary/20 text-gray-900 rotate-180' : 'bg-gray-50 text-gray-400'}`}>
                      ▾
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {selectedData && (
            <div className="max-w-5xl mx-auto mb-10 text-left bg-white rounded-3xl border border-gray-200/80 p-6 md:p-8 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center animate-fadeIn">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl text-white shadow-md flex-shrink-0 select-none"
                style={{ backgroundColor: PALETTE[selectedData.color].hex }}
              >
                {selectedData.icon}
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
                  {content.team_grid_section.competencies_label}
                </span>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{selectedData.name}</h4>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">{selectedData.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedData.skills.map((s, idx) => (
                    <span key={idx} className={`text-xs font-semibold px-3 py-1 rounded-xl text-gray-700 ${PALETTE[selectedData.color].bg}`}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setSelectedArea(null)}
                className="text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors uppercase self-end md:self-center bg-gray-50 hover:bg-gray-100 border border-gray-200 px-3.5 py-1.5 rounded-full select-none"
              >
                {content.team_grid_section.clear_filter_label}
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
            {filteredTeam.map((m) => {
              const matchedArea = areas.find((a) => a.slug === m.area)
              const palette = PALETTE[m.color]
              return (
                <div
                  key={m.slug}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="p-6 md:p-8 flex flex-col items-center text-center">
                    <div className="relative w-28 h-28 rounded-full overflow-hidden bg-gray-100 border-[3.5px] border-white shadow-md mb-5 group select-none flex items-center justify-center">
                      {m.photo ? (
                        <Image
                          src={m.photo}
                          alt={`Foto de ${m.name}`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className={`w-full h-full flex items-center justify-center text-3xl font-bold ${palette.bg} text-gray-800 transition-transform duration-300 group-hover:scale-105`}>
                          {m.initials}
                        </div>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 leading-snug">{m.name}</h3>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-gray-900/60 mt-1 select-none">
                      {m.role}
                    </p>

                    <span
                      className={`text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mt-3 border select-none ${palette.bg}`}
                      style={{ color: palette.hex, borderColor: `${palette.hex}15` }}
                    >
                      {matchedArea?.name || ''}
                    </span>

                    <div className="w-12 h-0.5 bg-gray-100 my-4" />

                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 select-none">
                      {content.team_grid_section.specialty_label}
                    </div>
                    <p className="text-xs font-bold text-gray-700 mb-4 px-2">{m.specialty}</p>

                    <p className="text-xs text-gray-500 leading-relaxed px-1">{m.bio}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 5. Organizational Network */}
      <section className="py-16 md:py-24 px-4 bg-white border-b border-gray-200/50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">🔗</span>
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                {content.network_section.badge}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl text-gray-900 font-extrabold tracking-tight mb-4">
              {content.network_section.title}
            </h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
              {content.network_section.subtitle}
            </p>
          </div>

          <div className="hidden md:block relative w-[480px] h-[480px] mx-auto select-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-gradient-to-br from-primary to-[#ffc500] flex flex-col items-center justify-center text-center shadow-lg shadow-primary/20 z-20">
              <span className="text-2xl mb-0.5 block">👧</span>
              <span className="font-serif text-[10px] text-gray-900 font-bold leading-tight px-2">
                {content.network_section.center_label}
              </span>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border border-gray-200 border-dashed" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full border border-primary/20 border-dashed" />

            {areas.map((a, i) => {
              const angle = (i * 360) / areas.length - 90
              const rad = (angle * Math.PI) / 180
              const radius = 170
              const x = 240 + radius * Math.cos(rad)
              const y = 240 + radius * Math.sin(rad)
              return (
                <div
                  key={a.slug}
                  style={{ left: `${x - 30}px`, top: `${y - 30}px` }}
                  className="absolute w-16 h-16 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col items-center justify-center hover:scale-110 hover:border-primary hover:shadow-md transition-all duration-300 z-10"
                  title={a.name}
                >
                  <span className="text-xl block">{a.icon}</span>
                  <span className="text-[8px] font-extrabold text-gray-400 mt-1 max-w-[50px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {a.name.split(' ')[0]}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="block md:hidden max-w-sm mx-auto text-left select-none relative">
            <div className="absolute left-[26px] top-6 bottom-6 w-0.5 bg-dashed border-l border-primary/30" />

            <div className="relative flex items-center gap-4 bg-gradient-to-r from-primary to-[#ffc500] p-4 rounded-2xl shadow-sm z-10 mb-8 max-w-[280px]">
              <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-xl shadow-inner flex-shrink-0">
                👧
              </div>
              <div>
                <h4 className="text-sm text-gray-900 font-bold leading-tight">{content.network_section.center_label}</h4>
                <p className="text-[10px] text-gray-900/60 font-semibold uppercase mt-0.5">{content.network_section.center_sublabel}</p>
              </div>
            </div>

            <div className="space-y-4">
              {areas.map((a) => (
                <div key={a.slug} className="relative flex items-center gap-4 pl-12">
                  <div className="absolute left-4 w-6 h-0.5 bg-primary/30" />
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-xl shadow-sm flex-shrink-0 z-10">
                    {a.icon}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-gray-900">{a.name}</h5>
                    <p className="text-[9px] text-gray-400 font-semibold">{content.network_section.node_caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Volunteers List */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="text-center mb-10 max-w-md mx-auto">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">🤝</span>
              <span className="text-xs font-bold uppercase tracking-wider text-accent">
                {content.volunteers_section.badge}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl text-gray-900 font-extrabold tracking-tight mb-2">
              {content.volunteers_section.title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              {content.volunteers_section.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            {volunteers.map((v) => (
              <div
                key={v.slug}
                className="bg-white border border-gray-200 rounded-full py-2.5 px-6 shadow-sm flex items-center gap-2.5 hover:border-primary hover:shadow-md transition-all duration-300"
              >
                <span className="text-gray-400 select-none">👤</span>
                <span className="text-xs sm:text-sm font-bold text-gray-700">{v.name}</span>
                <span className="text-[10px] text-accent font-bold px-2 py-0.5 bg-accent/10 rounded-full select-none">
                  {content.volunteers_section.tag_label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Join Team CTA */}
      <section className="py-16 md:py-24 px-4 bg-accent relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-1/4 -left-16 w-64 h-64 bg-white/10 rounded-full" />
        </div>

        <div className="container mx-auto max-w-3xl relative z-10 text-center">
          <span className="text-5xl block mb-5 select-none">🩺</span>
          <h2 className="text-3xl md:text-4xl text-white font-extrabold leading-tight mb-4">
            {content.cta.title}
          </h2>

          <p className="text-sm md:text-base text-white/80 max-w-xl mx-auto leading-relaxed mb-8">
            {content.cta.text}
          </p>

          <div className="flex flex-wrap gap-4 justify-center items-center">
            <Link
              href={`/${lang}/contacto`}
              className="bg-primary hover:bg-primary/95 text-black font-extrabold text-sm px-8 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/10 min-h-[44px] flex items-center justify-center select-none"
            >
              {content.cta.primary_label}
            </Link>
            <Link
              href={`/${lang}/colabora`}
              className="border-2 border-white/30 hover:border-white/60 bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-8 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[44px] flex items-center justify-center select-none"
            >
              {content.cta.secondary_label}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
