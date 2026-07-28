'use client'
import type { Locale } from '@/lib/i18n'

interface HomeStatsProps {
  lang: Locale
}

export default function HomeStats({ lang }: HomeStatsProps) {
  const es = lang === 'es'

  const stats = [
    { n: '5+', l: es ? 'Años de servicio' : 'Years of service', icon: '🏛', color: 'text-[#2466a8]', bg: 'bg-[#e8f1fa]' },
    { n: '3', l: es ? 'Programas activos' : 'Active programs', icon: '📋', color: 'text-[#e86840]', bg: 'bg-[#fef0e8]' },
    { n: '100+', l: es ? 'Familias acompañadas' : 'Families accompanied', icon: '👨‍👩‍👧', color: 'text-[#1a8a7d]', bg: 'bg-[#e0f5f0]' },
    { n: '20+', l: es ? 'Profesionales' : 'Professionals', icon: '🩺', color: 'text-[#e8a838]', bg: 'bg-[#fdf6e3]' },
  ]

  return (
    <section className="bg-[#fafbfd] py-12 md:py-16 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {stats.map((s, i) => (
            <div
              key={i}
              className="text-center p-6 md:p-8 rounded-3xl bg-white border border-gray-200/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-gray-300 select-none flex flex-col items-center"
            >
              <div className={`w-14 h-14 rounded-2xl ${s.bg} flex items-center justify-center text-2xl mb-4 shadow-sm`}>
                {s.icon}
              </div>
              <div className={`font-serif text-3xl md:text-4xl font-bold ${s.color} leading-none`}>
                {s.n}
              </div>
              <div className="text-xs md:text-sm text-gray-500 font-semibold mt-3 leading-tight max-w-[140px]">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
