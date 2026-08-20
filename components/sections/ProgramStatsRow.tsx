import type { ProgramStat } from '@/lib/content'

export default function ProgramStatsRow({ stats }: { stats: ProgramStat[] }) {
  return (
    <section className="py-10 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-3xl">{s.icon}</span>
              <span className="text-2xl font-extrabold text-gray-900">{s.value}</span>
              <span className="text-xs sm:text-sm text-gray-500 leading-tight">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
