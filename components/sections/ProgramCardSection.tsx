'use client'
import { useState } from 'react'
import { EXTENDED_PALETTE } from '@/lib/palette'
import type { ProgramCardSection as ProgramCardSectionData } from '@/lib/content'

const COLS: Record<number, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
}

interface ProgramCardSectionProps {
  id?: string
  section: ProgramCardSectionData
  alt?: boolean
}

export default function ProgramCardSection({ id, section, alt = false }: ProgramCardSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const isAccordion = section.layout === 'acordeón'
  const cols = COLS[Math.min(section.items.length, 4)] ?? COLS[4]

  return (
    <section id={id} className={`py-16 ${alt ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full">
            {section.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4 mb-4">{section.title}</h2>
          {section.subtitle && <p className="text-gray-600 max-w-2xl mx-auto">{section.subtitle}</p>}
        </div>

        <div className={`grid grid-cols-1 ${cols} gap-5 max-w-6xl mx-auto ${isAccordion ? 'items-start' : ''}`}>
          {section.items.map((item, i) => {
            const style = EXTENDED_PALETTE[item.color]
            const isOpen = openIndex === i
            const cardClass = `bg-white rounded-2xl p-6 border-l-4 ${style.border} shadow-sm hover:shadow-md transition-all`

            const inner = (
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 ${style.bg} rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-bold text-lg ${style.text}`}>{item.title}</h3>
                    {item.tag && <span className="text-xs text-gray-400 uppercase tracking-wide">{item.tag}</span>}
                    {isAccordion && <span className="ml-auto text-gray-400">{isOpen ? '▲' : '▼'}</span>}
                  </div>
                  {(!isAccordion || isOpen) && (
                    <>
                      {item.desc && <p className="text-gray-600 text-sm leading-relaxed mt-2 mb-3">{item.desc}</p>}
                      {item.items && item.items.length > 0 && (
                        <ul className="grid grid-cols-2 gap-1">
                          {item.items.map((sub, si) => (
                            <li key={si} className="flex items-center gap-1.5 text-xs text-gray-500">
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />
                              {sub}
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                </div>
              </div>
            )

            return isAccordion ? (
              <button key={i} onClick={() => setOpenIndex(isOpen ? null : i)} className={`text-left ${cardClass}`}>
                {inner}
              </button>
            ) : (
              <div key={i} className={cardClass}>
                {inner}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
