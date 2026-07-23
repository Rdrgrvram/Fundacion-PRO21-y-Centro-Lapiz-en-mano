import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n'
import { getTranslation } from '@/lib/i18n'
import ImpactStat from '@/components/sections/ImpactStat'

export const metadata: Metadata = {
  title: 'Quiénes Somos | Fundación PRO-21',
}

export default function Page({ params }: { params: { lang: Locale } }) {
  const t = getTranslation(params.lang)

  return (
    <>
      {/* Encabezado */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            {params.lang === 'es' ? 'Quiénes Somos' : 'About Us'}
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            {params.lang === 'es'
              ? 'Fundación PRO-21 y Centro Lápiz en Mano — La Paz, Bolivia'
              : 'Fundación PRO-21 and Centro Lápiz en Mano — La Paz, Bolivia'}
          </p>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl space-y-10">
          {/* Misión */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🎯</span>
              <h2 className="text-2xl font-bold text-primary">{t['about.mission.title']}</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">{t['about.mission.text']}</p>
          </div>

          {/* Visión */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🌟</span>
              <h2 className="text-2xl font-bold text-secondary">{t['about.vision.title']}</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">{t['about.vision.text']}</p>
          </div>
        </div>
      </section>

      {/* Estadísticas reales */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <ImpactStat value="70+" label={t['impact.children']} icon="👶" />
            <ImpactStat value="8"   label={t['impact.years']}    icon="🏫" />
            <ImpactStat value="10"  label={t['impact.professionals']} icon="👩‍⚕️" />
          </div>

          {/* Desglose por programa */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-100 p-5 text-center">
              <div className="text-3xl font-bold text-primary">40</div>
              <div className="mt-1 text-sm text-gray-600">{t['about.stats.escuelita']}</div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-5 text-center">
              <div className="text-3xl font-bold text-accent">30</div>
              <div className="mt-1 text-sm text-gray-600">{t['about.stats.other']}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
