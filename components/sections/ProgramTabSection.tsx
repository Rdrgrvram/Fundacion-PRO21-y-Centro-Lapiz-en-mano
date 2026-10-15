'use client'
import Icon from '@/components/ui/Icon'
import { useId, useRef, useState } from 'react'
import { EXTENDED_PALETTE } from '@/lib/palette'
import type { ProgramTabSectionContent as ProgramTabSectionData } from '@/lib/cms-schemas'

interface ProgramTabSectionProps {
  id?: string
  section: ProgramTabSectionData
  bg?: string
}

export default function ProgramTabSection({ id, section, bg = 'bg-white' }: ProgramTabSectionProps) {
  const [active, setActive] = useState(0)
  const uid = useId()
  const botones = useRef<(HTMLButtonElement | null)[]>([])
  const tab = section.tabs[active]
  if (!tab) return null
  // Patrón WAI-ARIA de pestañas: flechas ←/→ y Inicio/Fin cambian de pestaña y mueven el foco.
  const alTeclear = (e: React.KeyboardEvent, i: number) => {
    const n = section.tabs.length
    const destino = e.key === 'ArrowRight' ? (i + 1) % n : e.key === 'ArrowLeft' ? (i - 1 + n) % n : e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : null
    if (destino === null) return
    e.preventDefault()
    setActive(destino)
    botones.current[destino]?.focus()
  }
  const style = EXTENDED_PALETTE[tab.color]

  return (
    <section id={id} className={`py-12 md:py-16 ${bg}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary-700 bg-secondary/10 px-4 py-1.5 rounded-full">
            {section.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4 mb-4">{section.title}</h2>
          {section.subtitle && <p className="text-gray-600 max-w-2xl mx-auto">{section.subtitle}</p>}
        </div>

        {/* Tabs */}
        <div role="tablist" aria-label={section.title} className="flex justify-center gap-2 mb-8 flex-wrap">
          {section.tabs.map((t, i) => {
            const tStyle = EXTENDED_PALETTE[t.color]
            const isActive = active === i
            return (
              <button
                key={i}
                ref={(el) => {
                  botones.current[i] = el
                }}
                type="button"
                role="tab"
                id={`${uid}-tab-${i}`}
                aria-selected={isActive}
                aria-controls={`${uid}-panel`}
                tabIndex={isActive ? 0 : -1}
                onKeyDown={(e) => alTeclear(e, i)}
                onClick={() => setActive(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all min-h-[44px] ${
                  isActive ? `${tStyle.bgSolid} ${tStyle.textOn} shadow-md` : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon name={t.icon} className="h-4 w-4" />
                <span>{t.label}</span>
                {t.age_range && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-black/20' : 'bg-gray-200 text-gray-600'}`}>
                    {t.age_range}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Panel activo */}
        <div
          role="tabpanel"
          id={`${uid}-panel`}
          aria-labelledby={`${uid}-tab-${active}`}
          tabIndex={0}
          className={`max-w-4xl mx-auto bg-white rounded-2xl border ${style.border} shadow-sm overflow-hidden`}
        >
          <div className={`${style.bg} p-6 flex items-center gap-4`}>
            <Icon name={tab.icon} className={`h-9 w-9 ${style.text}`} />
            <div>
              <h3 className={`text-xl font-extrabold ${style.text}`}>{tab.label}</h3>
              {tab.age_range && <span className="text-sm text-gray-600">{tab.age_range}</span>}
            </div>
          </div>
          <div className="p-6">
            <p className="text-gray-700 leading-relaxed mb-6">{tab.desc}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tab.highlights.map((h, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${style.bg}`}>
                  <span className={`w-2 h-2 rounded-full ${style.bgSolid} flex-shrink-0`} />
                  <span className="text-sm font-medium text-gray-700">{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
