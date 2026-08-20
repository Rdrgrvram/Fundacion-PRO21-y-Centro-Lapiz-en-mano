'use client'
import { useState } from 'react'
import { EXTENDED_PALETTE } from '@/lib/palette'
import type { ProgramTabSection as ProgramTabSectionData } from '@/lib/content'

interface ProgramTabSectionProps {
  id?: string
  section: ProgramTabSectionData
}

export default function ProgramTabSection({ id, section }: ProgramTabSectionProps) {
  const [active, setActive] = useState(0)
  const tab = section.tabs[active]
  if (!tab) return null
  const style = EXTENDED_PALETTE[tab.color]

  return (
    <section id={id} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary bg-secondary/10 px-4 py-1.5 rounded-full">
            {section.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4 mb-4">{section.title}</h2>
          {section.subtitle && <p className="text-gray-600 max-w-2xl mx-auto">{section.subtitle}</p>}
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {section.tabs.map((t, i) => {
            const tStyle = EXTENDED_PALETTE[t.color]
            const isActive = active === i
            return (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all min-h-[44px] ${
                  isActive ? `${tStyle.bgSolid} ${tStyle.textOn} shadow-md` : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span>{t.icon}</span>
                <span>{t.label}</span>
                {t.ageRange && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20' : 'bg-gray-200 text-gray-500'}`}>
                    {t.ageRange}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Panel activo */}
        <div className={`max-w-4xl mx-auto bg-white rounded-2xl border ${style.border} shadow-sm overflow-hidden`}>
          <div className={`${style.bg} p-6 flex items-center gap-4`}>
            <span className="text-4xl">{tab.icon}</span>
            <div>
              <h3 className={`text-xl font-extrabold ${style.text}`}>{tab.label}</h3>
              {tab.ageRange && <span className="text-sm text-gray-500">{tab.ageRange}</span>}
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
