'use client'
import Icon from '@/components/ui/Icon'
import { useId, useState } from 'react'
import { EXTENDED_PALETTE } from '@/lib/palette'
import type { ProgramCardSectionContent as ProgramCardSectionData } from '@/lib/cms-schemas'

interface ProgramCardSectionProps {
  id?: string
  section: ProgramCardSectionData
  // Fondo de la sección: lo decide ProgramPageLayout con un ciclo único para todos los programas (programTone.ts).
  bg?: string
  // Las secciones "complementarias" (section3) usan una ficha más chica que
  // las de la sección principal (section1) — así se lee de un vistazo cuál es
  // el núcleo del programa y cuál es apoyo adicional, en vez de que todo pese
  // lo mismo en la página.
  compact?: boolean
}

export default function ProgramCardSection({ id, section, bg = 'bg-white', compact = false }: ProgramCardSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const uid = useId()
  const isAccordion = section.layout === 'acordeón'

  return (
    <section id={id} className={`py-12 md:py-16 ${bg}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-900 bg-primary/10 px-4 py-1.5 rounded-full">
            {section.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4 mb-4">{section.title}</h2>
          {section.subtitle && <p className="text-gray-600 max-w-2xl mx-auto">{section.subtitle}</p>}
        </div>

        {/* Acordeón: filas de dos columnas (nunca 4+3 con huérfanas ni títulos de 4 líneas). Resto: lista de dos columnas con ícono, sin tarjetas (mismo formato en todos los programas). */}
        <div
          className={`grid grid-cols-1 ${
            isAccordion ? 'md:grid-cols-2 gap-4 max-w-4xl items-start' : 'md:grid-cols-2 gap-x-12 gap-y-8 max-w-4xl'
          } mx-auto`}
        >
          {section.items.map((item, i) => {
            const style = EXTENDED_PALETTE[item.color]
            const isOpen = openIndex === i

            // Tags: reemplaza la vieja lista de 2 columnas — evita el corte de
            // palabra en tarjetas angostas porque cada chip envuelve como bloque.
            const tags = item.items && item.items.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {item.items.map((sub, si) => (
                  <span
                    key={si}
                    className={`text-xs font-medium leading-none px-2.5 py-1.5 rounded-full ${style.bg} ${style.text}`}
                  >
                    {sub}
                  </span>
                ))}
              </div>
            )

            if (isAccordion) {
              const panelId = `${uid}-panel-${i}`
              const headId = `${uid}-head-${i}`
              // El título es el botón (dentro del h3) y se estira sobre toda la tarjeta (after:absolute): el clic con
              // mouse sirve en toda el área y el teclado/lector de pantalla encuentran un solo control con su estado.
              const cardClass = `relative w-full text-left bg-white rounded-2xl p-6 border-l-4 ${style.border} shadow-sm transition-all duration-300 cursor-pointer ${
                isOpen ? 'shadow-md' : 'hover:shadow-md hover:-translate-y-0.5'
              }`
              return (
                <div key={i} className={cardClass}>
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${style.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon name={item.icon} className={`h-6 w-6 ${style.text}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className={`font-bold text-base sm:text-lg ${style.text}`}>
                          <button
                            type="button"
                            id={headId}
                            aria-expanded={isOpen}
                            aria-controls={panelId}
                            onClick={() => setOpenIndex(isOpen ? null : i)}
                            className="inline-flex min-h-[44px] items-center text-left after:absolute after:inset-0 after:content-['']"
                          >
                            {item.title}
                          </button>
                        </h3>
                        {item.tag && <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wide flex-shrink-0">{item.tag}</span>}
                        <svg
                          aria-hidden="true"
                          className={`ml-auto w-4 h-4 flex-shrink-0 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>

                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={headId}
                        aria-hidden={!isOpen}
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
                </div>
              )
            }

            // Lista de dos columnas con ícono (sin tarjetas): lee de un vistazo, no recorta la descripción y se ve
            // igual en los cuatro programas. En modo `compact` (secciones complementarias) todo baja un escalón.
            return (
              <div key={i} className="flex items-start gap-4 text-left">
                <div
                  className={`${style.bg} rounded-xl flex items-center justify-center flex-shrink-0 ${compact ? 'w-10 h-10' : 'w-12 h-12'}`}
                >
                  <Icon name={item.icon} className={`${compact ? 'h-5 w-5' : 'h-6 w-6'} ${style.text}`} />
                </div>
                <div className="min-w-0">
                  <h3 className={`font-bold ${style.text} ${compact ? 'text-base' : 'text-base sm:text-lg'}`}>{item.title}</h3>
                  {item.tag && <span className="text-xs text-gray-500 uppercase tracking-wide">{item.tag}</span>}
                  {item.desc && <p className={`text-gray-600 leading-relaxed mt-1 mb-2 ${compact ? 'text-sm' : 'text-sm sm:text-base'}`}>{item.desc}</p>}
                  {tags}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
