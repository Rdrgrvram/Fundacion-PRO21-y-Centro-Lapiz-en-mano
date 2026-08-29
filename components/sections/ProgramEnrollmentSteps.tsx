import { EXTENDED_PALETTE, type AccentColor } from '@/lib/palette'
import type { ProgramStepSection } from '@/lib/content'

const CYCLE: AccentColor[] = ['secondary', 'accent', 'primary']

export default function ProgramEnrollmentSteps({ section }: { section: ProgramStepSection }) {
  const cols = section.steps.length > 4 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          {section.badge && (
            <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/15 px-4 py-1.5 rounded-full">
              {section.badge}
            </span>
          )}
          <h2 className="text-3xl font-extrabold text-gray-900 mt-4 mb-4">{section.title}</h2>
          {section.subtitle && <p className="text-gray-600 max-w-2xl mx-auto">{section.subtitle}</p>}
        </div>
        <div className={`grid grid-cols-1 ${cols} gap-4 max-w-5xl mx-auto`}>
          {section.steps.map((step, i) => {
            const style = EXTENDED_PALETTE[CYCLE[i % CYCLE.length]]
            return (
              <div key={i} className="flex flex-col items-center text-center p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className={`w-10 h-10 rounded-full ${style.bgSolid} flex items-center justify-center font-extrabold ${style.textOn} text-lg mb-3`}>
                  {i + 1}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
