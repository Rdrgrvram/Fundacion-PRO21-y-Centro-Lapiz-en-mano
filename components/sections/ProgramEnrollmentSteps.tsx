import { EXTENDED_PALETTE, type AccentColor } from '@/lib/palette'
import type { Program } from '@/lib/cms'
import type { Locale } from '@/lib/i18n'

const CYCLE: AccentColor[] = ['secondary', 'accent', 'primary']

// Regla única para los cuatro programas: se ven hasta 6 pasos y, si hay más, el resto queda tras «Ver los N pasos
// restantes» (<details>, accesible con teclado). Así un proceso largo (Desarrolla TEA tiene 11) no domina la página.
const PASOS_VISIBLES = 6

interface ProgramEnrollmentStepsProps {
  section: Program['enrollment']
  lang: Locale
  bg?: string
}

export default function ProgramEnrollmentSteps({ section, lang, bg = 'bg-gray-50' }: ProgramEnrollmentStepsProps) {
  const es = lang === 'es'
  const visibles = section.steps.slice(0, PASOS_VISIBLES)
  const resto = section.steps.slice(PASOS_VISIBLES)
  const cols = visibles.length > 4 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'

  const paso = (step: Program['enrollment']['steps'][number], i: number) => {
    const style = EXTENDED_PALETTE[CYCLE[i % CYCLE.length]]
    // En móvil cada paso es una fila (número a la izquierda, texto a la derecha) y ocupa mucho menos alto; desde sm vuelve a
    // la tarjeta centrada de siempre. La rejilla y un div por paso con su círculo se mantienen (las pruebas las usan).
    return (
      <div
        key={i}
        className="flex flex-row items-start gap-4 rounded-2xl border border-gray-100 bg-white p-4 text-left shadow-sm sm:flex-col sm:items-center sm:p-5 sm:text-center"
      >
        <div className={`w-10 h-10 flex-shrink-0 rounded-full ${style.bgSolid} flex items-center justify-center font-extrabold ${style.textOn} text-lg sm:mb-3`}>
          {i + 1}
        </div>
        <div>
          <h3 className="font-bold text-gray-900 mb-1 sm:mb-2">{step.title}</h3>
          <p className="text-gray-600 text-sm">{step.desc}</p>
        </div>
      </div>
    )
  }

  return (
    <section className={`py-12 md:py-16 ${bg}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-10">
          {section.badge && (
            <span className="text-xs font-bold uppercase tracking-widest text-primary-900 bg-primary/10 px-4 py-1.5 rounded-full">
              {section.badge}
            </span>
          )}
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4 mb-4">{section.title}</h2>
          {section.subtitle && <p className="text-gray-600 max-w-2xl mx-auto">{section.subtitle}</p>}
        </div>
        <div className={`grid grid-cols-1 ${cols} gap-4 max-w-5xl mx-auto`}>{visibles.map((step, i) => paso(step, i))}</div>

        {resto.length > 0 && (
          <details className="mx-auto mt-6 max-w-5xl">
            <summary className="mx-auto flex min-h-[44px] w-fit cursor-pointer list-none items-center rounded-full border border-gray-300 bg-white px-6 text-sm font-bold text-gray-800 transition-colors hover:border-primary active:scale-[0.99] [&::-webkit-details-marker]:hidden">
              {es ? `Ver los ${resto.length} pasos restantes` : `Show the remaining ${resto.length} steps`}
            </summary>
            <div className={`mt-4 grid grid-cols-1 ${cols} gap-4`}>{resto.map((step, i) => paso(step, i + PASOS_VISIBLES))}</div>
          </details>
        )}
      </div>
    </section>
  )
}
