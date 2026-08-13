import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Pasos Firmes | Fundación PRO-21',
  description:
    'Programa de intervención para niños, niñas y adolescentes con dificultades de aprendizaje, con acompañamiento activo a familias.',
}

const INTERVENCIONES = [
  {
    icon: '📖',
    titulo: 'Estudiantes de Primaria',
    descripcionEs:
      'Identificamos dificultades de aprendizaje específicas y diseñamos estrategias personalizadas, brindando apoyo académico y emocional a cada estudiante.',
    descripcionEn:
      'We identify specific learning difficulties and design personalized strategies, providing academic and emotional support to each student.',
    etiqueta: 'Primaria',
  },
  {
    icon: '🎓',
    titulo: 'Estudiantes de Secundaria',
    descripcionEs:
      'Enfocamos las actividades en la inclusión social y laboral futura, ofreciendo proyecto de vida y talleres prácticos para adolescentes.',
    descripcionEn:
      'We focus activities on future social and labor inclusion, offering life project planning and practical workshops for adolescents.',
    etiqueta: 'Secundaria',
  },
  {
    icon: '👨‍👩‍👧',
    titulo: 'Terapia Grupal para Familias',
    descripcionEs:
      'Espacios grupales de orientación y acompañamiento para que las familias comprendan las necesidades de sus hijos y fortalezcan el apoyo en el hogar.',
    descripcionEn:
      'Group guidance sessions for families to understand their children\'s needs and strengthen home support.',
    etiqueta: 'Familias',
  },
  {
    icon: '🫂',
    titulo: 'Terapia Individual',
    descripcionEs:
      'Intervención en terapia individual para los padres, niños y adolescentes que requieren acompañamiento personalizado en su proceso.',
    descripcionEn:
      'Individual therapy sessions for parents, children and adolescents who need personalized support in their process.',
    etiqueta: 'Individual',
  },
]

export default function Page({ params }: { params: { lang: Locale } }) {
  const es = params.lang === 'es'

  return (
    <>
      {/* Encabezado */}
      <section className="bg-gradient-to-br from-accent/20 to-accent/5 py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <span className="text-5xl">👣</span>
          <h1 className="mt-4 text-4xl font-bold text-gray-900">Pasos Firmes</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {es
              ? 'Programa de la Fundación PRO-21 diseñado para acompañar a niños, niñas y adolescentes durante su trayectoria educativa, brindando apoyo integral según sus necesidades, capacidades y etapas de desarrollo. Desde un enfoque inclusivo, fortalecemos los procesos de aprendizaje y promovemos la autonomía.'
              : 'Program of Fundación PRO-21 designed to support children and adolescents throughout their educational journey, providing comprehensive support according to their needs, capabilities and developmental stages. From an inclusive approach, we strengthen learning processes and promote autonomy.'}
          </p>
        </div>
      </section>

      {/* Intervenciones */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {es ? '¿A quién va dirigido?' : 'Who is it for?'}
          </h2>
          <p className="text-gray-500 mb-8">
            {es
              ? 'El programa atiende a estudiantes de distintos niveles educativos e involucra activamente a las familias en el proceso terapéutico.'
              : 'The program serves students from different educational levels and actively involves families in the therapeutic process.'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INTERVENCIONES.map((item) => (
              <div
                key={item.titulo}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-4xl">{item.icon}</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-accent/10 text-accent">
                    {item.etiqueta}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900">{item.titulo}</h3>
                <p className="text-sm text-gray-600 leading-relaxed flex-1">
                  {es ? item.descripcionEs : item.descripcionEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nota metodológica */}
      <section className="py-4 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="bg-accent/5 border-l-4 border-accent rounded-r-xl px-6 py-5">
            <p className="text-gray-700 text-sm leading-relaxed">
              {es
                ? '🔍 Todas las intervenciones parten de una evaluación diagnóstica individualizada. El plan de trabajo se actualiza periódicamente en coordinación con la familia y, cuando corresponde, con la institución educativa.'
                : '🔍 All interventions start from an individualized diagnostic evaluation. The work plan is updated periodically in coordination with the family and, when appropriate, with the educational institution.'}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 text-center">
        <p className="text-gray-600 mb-6">
          {es
            ? '¿Tu hijo tiene dificultades en la escuela? Podemos ayudarte a encontrar el camino.'
            : 'Is your child struggling at school? We can help you find the way forward.'}
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button href={`/${params.lang}/contacto`} size="lg">
            {es ? 'Hablar con un especialista' : 'Talk to a specialist'}
          </Button>
          <Button href="https://wa.me/59170106276" external variant="outline" size="lg">
            WhatsApp
          </Button>
        </div>
      </section>
    </>
  )
}
