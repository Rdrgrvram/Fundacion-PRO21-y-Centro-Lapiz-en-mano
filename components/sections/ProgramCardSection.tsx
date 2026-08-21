'use client'
import { useState } from 'react'
import { EXTENDED_PALETTE } from '@/lib/palette'
import type { ProgramCardSection as ProgramCardSectionData } from '@/lib/content'

// Elige el número de columnas que mejor reparte los items en filas completas,
// para evitar filas "huérfanas" con 1-2 tarjetas sueltas y mucho espacio vacío.
//
// Las tarjetas "acordeón" (título + chevron, solo una se expande a la vez) van
// en 3-4 columnas porque casi siempre están colapsadas.
// Las tarjetas "siempre expandidas" (ficha vertical: ícono, título, descripción
// corta y tags) ahora son compactas — ya no necesitan una lista interna de 2
// columnas — así que también pueden ir en 3-4 columnas sin problema de espacio.
function getCols(n: number): string {
  if (n <= 2) return 'sm:grid-cols-2'
  if (n === 3) return 'sm:grid-cols-2 lg:grid-cols-3'
  if (n % 4 === 0 || n === 5 || n === 7) return 'sm:grid-cols-2 lg:grid-cols-4'
  return 'sm:grid-cols-2 lg:grid-cols-3'
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

            // Tags: reemplaza la vieja lista de 2 columnas — evita el corte de
            // palabra en tarjetas angostas porque cada chip envuelve como bloque.
            const tags = item.items && item.items.length > 0 && (
              <div className={`flex flex-wrap gap-1.5 ${isAccordion ? '' : 'justify-center'}`}>
                {item.items.map((sub, si) => (
                  <span
                    key={si}
                    className={`text-[11px] font-medium leading-none px-2.5 py-1.5 rounded-full ${style.bg} ${style.text}`}
                  >
                    {sub}
                  </span>
                ))}
              </div>
            )

            if (isAccordion) {
              const cardClass = `w-full text-left bg-white rounded-2xl p-6 border-l-4 ${style.border} shadow-sm transition-all duration-300 ${
                isOpen ? 'shadow-md' : 'hover:shadow-md hover:-translate-y-0.5'
              }`
              return (
                <button key={i} onClick={() => setOpenIndex(isOpen ? null : i)} className={cardClass}>
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${style.bg} rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className={`font-bold text-base sm:text-lg ${style.text}`}>{item.title}</h3>
                        {item.tag && <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wide flex-shrink-0">{item.tag}</span>}
                        <svg
                          className={`ml-auto w-4 h-4 flex-shrink-0 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>

                      <div
                        className={`grid transition-all duration-300 ease-in-out ${
                          isOpen ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          {item.desc && <p className="text-gray-600 text-sm leading-relaxed mb-3">{item.desc}</p>}
                          {tags}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              )
            }

            // Ficha "siempre expandida": layout vertical y centrado en vez de
            // ícono+texto horizontal — más compacto, sin lista interna de 2
            // columnas, así que no se rompe el texto palabra por palabra.
            return (
              <div
                key={i}
                className={`flex flex-col items-center text-center bg-white rounded-2xl p-6 border-t-4 ${style.border} shadow-sm hover:shadow-md transition-shadow duration-300`}
              >
                <div className={`w-14 h-14 ${style.bg} rounded-2xl flex items-center justify-center text-3xl mb-4`}>
                  {item.icon}
                </div>
                <h3 className={`font-bold text-base sm:text-lg ${style.text}`}>{item.title}</h3>
                {item.tag && <span className="text-[10px] text-gray-400 uppercase tracking-wide mt-0.5 mb-2">{item.tag}</span>}
                {item.desc && <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-3">{item.desc}</p>}
                {tags}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
