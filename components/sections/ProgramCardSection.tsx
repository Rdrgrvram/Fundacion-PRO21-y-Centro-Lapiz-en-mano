'use client'
import { useState } from 'react'
import { EXTENDED_PALETTE } from '@/lib/palette'
import type { ProgramCardSection as ProgramCardSectionData } from '@/lib/content'

// Elige el número de columnas que mejor reparte los items en filas completas,
// para evitar filas "huérfanas" con 1-2 tarjetas sueltas y mucho espacio vacío.
// Prioriza 3 columnas (mejor lectura de texto largo en acordeones) y solo usa
// 4 cuando los items encajan exacto; nunca deja una fila con un solo item suelto.
function getCols(n: number): string {
  if (n <= 2) return 'sm:grid-cols-2'
  if (n % 4 === 0 && n !== 6) return 'sm:grid-cols-2 lg:grid-cols-4'
  if (n % 3 === 0 || n === 5 || n === 7) return 'sm:grid-cols-2 lg:grid-cols-3'
  return 'sm:grid-cols-2 lg:grid-cols-4'
}

interface ProgramCardSectionProps {
  id?: string
  section: ProgramCardSectionData
  alt?: boolean
}

export default function ProgramCardSection({ id, section, alt = false }: ProgramCardSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const isAccordion = section.layout === 'acordeón'
  const cols = getCols(section.items.length)

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

        <div className={`grid grid-cols-1 ${cols} gap-5 max-w-5xl mx-auto ${isAccordion ? 'items-start' : ''}`}>
          {section.items.map((item, i) => {
            const style = EXTENDED_PALETTE[item.color]
            const isOpen = openIndex === i
            const cardClass = `w-full bg-white rounded-2xl p-6 border-l-4 ${style.border} shadow-sm transition-all duration-300 ${
              isAccordion ? (isOpen ? 'shadow-md' : 'hover:shadow-md hover:-translate-y-0.5') : 'hover:shadow-md'
            }`

            const inner = (
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 ${style.bg} rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-bold text-base sm:text-lg ${style.text}`}>{item.title}</h3>
                    {item.tag && <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wide flex-shrink-0">{item.tag}</span>}
                    {isAccordion && (
                      <svg
                        className={`ml-auto w-4 h-4 flex-shrink-0 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>

                  {isAccordion ? (
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        {item.desc && <p className="text-gray-600 text-sm leading-relaxed mb-3">{item.desc}</p>}
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
                      </div>
                    </div>
                  ) : (
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
