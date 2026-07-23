import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Aula Wawitas | Fundación PRO-21',
}

const NIVELES = [
  {
    icon: '🌱',
    nivel: 'Estimulación Parvulario',
    edad: '3 años',
    descripcion:
      'Estimulación temprana multisensorial para fortalecer habilidades cognitivas, motrices y de comunicación en un ambiente estructurado y afectivo.',
  },
  {
    icon: '⭐',
    nivel: 'Pre-Kinder',
    edad: '4 años',
    descripcion:
      'Iniciación escolar con rutinas predecibles, apoyo en la regulación sensorial y desarrollo de habilidades de atención y juego compartido.',
  },
  {
    icon: '🎓',
    nivel: 'Kinder',
    edad: '5 años',
    descripcion:
      'Preparación para la inclusión escolar con trabajo en autonomía, comunicación funcional y habilidades preacadémicas adaptadas.',
  },
]

export default function Page({ params }: { params: { lang: Locale } }) {
  const es = params.lang === 'es'

  return (
    <>
      {/* Encabezado */}
      <section className="bg-gradient-to-br from-secondary/20 to-secondary/5 py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <span className="text-5xl">🌈</span>
          <h1 className="mt-4 text-4xl font-bold text-gray-900">Aula Wawitas</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
            {es
              ? 'Programa de atención especializada para niños y niñas con autismo y neurodivergencia, organizado por niveles de edad.'
              : 'Specialized care program for children with autism and neurodivergence, organized by age levels.'}
          </p>
        </div>
      </section>

      {/* Niveles de atención */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {es ? 'Niveles de Atención por Edad' : 'Care Levels by Age'}
          </h2>
          <p className="text-gray-500 mb-8">
            {es
              ? 'El programa está estructurado en tres niveles que acompañan el desarrollo del niño desde los 3 hasta los 5 años.'
              : 'The program is structured in three levels that accompany the child\'s development from age 3 to 5.'}
          </p>

          <div className="flex flex-col gap-6">
            {NIVELES.map((item, idx) => (
              <div
                key={item.nivel}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row gap-5 items-start"
              >
                {/* Número de paso */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary/10 text-secondary font-bold text-lg flex items-center justify-center">
                  {idx + 1}
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-2xl">{item.icon}</span>
                    <h3 className="text-lg font-bold text-gray-900">{item.nivel}</h3>
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold bg-secondary/10 text-secondary">
                      {item.edad}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{item.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-12 px-4 text-center">
        <p className="text-gray-600 mb-6">
          {es
            ? '¿Buscas atención especializada para tu hijo con autismo? Estamos aquí para ayudarte.'
            : 'Looking for specialized care for your child with autism? We are here to help.'}
        </p>
        <Button href={`/${params.lang}/contacto`} variant="secondary" size="lg">
          {es ? 'Solicitar información' : 'Request information'}
        </Button>
      </section>
    </>
  )
}
