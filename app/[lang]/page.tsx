import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n'
import { getTranslation } from '@/lib/i18n'
import Hero from '@/components/sections/Hero'
import ImpactStat from '@/components/sections/ImpactStat'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Inicio | Fundación PRO-21',
}

export default function Page({ params }: { params: { lang: Locale } }) {
  const t = getTranslation(params.lang)

  return (
    <>
      <Hero
        lang={params.lang}
        title={t['hero.title']}
        subtitle={t['hero.subtitle']}
        ctaPrimary={{ label: t['hero.cta.programs'], href: `/${params.lang}/mi-escuelita-down` }}
        ctaSecondary={{ label: t['hero.cta.contact'], href: `/${params.lang}/contacto` }}
      />

      {/* Estadísticas reales */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <ImpactStat value="70+" label={t['impact.children']} icon="👶" />
            <ImpactStat value="8"   label={t['impact.years']}    icon="🏫" />
            <ImpactStat value="10"  label={t['impact.professionals']} icon="👩‍⚕️" />
          </div>
        </div>
      </section>

      {/* Programas — acceso rápido */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">{t['programs.title']}</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href={`/${params.lang}/mi-escuelita-down`} variant="primary">
              Mi Escuelita Down
            </Button>
            <Button href={`/${params.lang}/aula-wawitas`} variant="outline">
              Aula Wawitas
            </Button>
            <Button href={`/${params.lang}/pasos-firmes`} variant="outline">
              Pasos Firmes
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
