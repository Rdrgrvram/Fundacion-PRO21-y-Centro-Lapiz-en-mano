import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Aula Wawitas | Fundación PRO-21',
  description:
    'Programa de estimulación y aprendizaje temprano para niños y niñas en edad preescolar. Tres niveles de atención de 3 a 5 años.',
}

const NIVELES = [
  {
    icon: '🌱',
    nivel: 'Estimulación Parvulario',
    edad: '3 años',
    descripcionEs:
      'Implementamos actividades sensoriales y de exploración para niños pequeños, trabajando en habilidades socioemocionales iniciales en un ambiente afectivo y estimulante.',
    descripcionEn:
      'We implement sensory and exploration activities for young children, working on initial socio-emotional skills in an affective and stimulating environment.',
  },
  {
    icon: '⭐',
    nivel: 'Estimulación Pre-Kínder',
    edad: '4 años',
    descripcionEs:
      'Diseñamos actividades lúdicas para el desarrollo cognitivo temprano e introducimos conceptos básicos de lectura, escritura y matemáticas adaptados a la edad.',
    descripcionEn:
      'We design play-based activities for early cognitive development and introduce basic concepts of reading, writing and mathematics adapted to the age.',
  },
  {
    icon: '🎓',
    nivel: 'Estimulación Kínder',
    edad: '5 años',
    descripcionEs:
      'Consolidamos las habilidades previas y trabajamos en la preparación para la transición a primaria, fortaleciendo la autonomía y la socialización.',
    descripcionEn:
      'We consolidate previous skills and work on preparation for the transition to primary school, strengthening autonomy and socialization.',
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
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {es
              ? 'Programa de la Fundación PRO-21 orientado a fortalecer el desarrollo integral de niños y niñas en edad preescolar, mediante experiencias de aprendizaje significativas que respetan el ritmo, las capacidades y las necesidades de cada participante.'
              : 'Program of Fundación PRO-21 aimed at strengthening the integral development of preschool-age children, through meaningful learning experiences that respect the pace, capabilities and needs of each participant.'}
          </p>
        </div>
      </section>

      {/* Niveles de atención */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {es ? 'Niveles de Estimulación' : 'Stimulation Levels'}
          </h2>
          <p className="text-gray-500 mb-8">
            {es
              ? 'El programa está organizado en tres niveles adecuados a la etapa de desarrollo de cada niño, desde los 3 hasta los 5 años.'
              : "The program is organized in three levels suited to each child's developmental stage, from 3 to 5 years of age."}
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
                  <p className="text-gray-600 leading-relaxed">
                    {es ? item.descripcionEs : item.descripcionEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enfoque del programa */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <p className="text-gray-700 leading-relaxed">
            {es
              ? '🤝 El programa reconoce el papel fundamental de las familias en el proceso educativo, promoviendo su participación y acompañamiento constante durante cada etapa del desarrollo del niño.'
              : '🤝 The program recognizes the fundamental role of families in the educational process, promoting their active participation and constant support at each stage of the child\'s development.'}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 text-center">
        <p className="text-gray-600 mb-6">
          {es
            ? '¿Tienes un hijo en edad preescolar? Conoce cómo Aula Wawitas puede acompañar su desarrollo.'
            : 'Do you have a preschool-age child? Learn how Aula Wawitas can support their development.'}
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button href={`/${params.lang}/contacto`} variant="secondary" size="lg">
            {es ? 'Solicitar información' : 'Request information'}
          </Button>
          <Button href="https://wa.me/59170106276" external variant="outline" size="lg">
            WhatsApp
          </Button>
        </div>
      </section>
    </>
  )
}
