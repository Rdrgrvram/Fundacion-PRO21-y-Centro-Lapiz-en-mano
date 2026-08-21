import { EXTENDED_PALETTE, type AccentColor } from '@/lib/palette'
import type { ProgramStat } from '@/lib/content'

// Ciclo de color por stat — antes eran números grises planos, ahora cada uno
// lleva el tinte de la paleta para integrarse visualmente con las tarjetas y
// el hero en vez de sentirse una franja gris pegada aparte.
const CYCLE: AccentColor[] = ['secondary', 'accent', 'primary']

export default function ProgramStatsRow({ stats }: { stats: ProgramStat[] }) {
  return (
    <section className="py-10 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
          {stats.map((s, i) => {
            const style = EXTENDED_PALETTE[CYCLE[i % CYCLE.length]]
            return (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className={`w-12 h-12 ${style.bg} rounded-full flex items-center justify-center text-2xl`}>{s.icon}</div>
                <span className={`text-2xl font-extrabold ${style.text}`}>{s.value}</span>
                <span className="text-xs sm:text-sm text-gray-500 leading-tight">{s.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
