import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Pasos Firmes | Fundación PRO-21',
}

const INTERVENCIONES = [
  {
    icon: '📖',
    titulo: 'Estudiantes de Primaria',
    descripcion:
      'Apoyo en lectoescritura, cálculo y atención para niños con dislexia, discalculia o dificultades de aprendizaje. Trabajo coordinado con la escuela regular.',
    etiqueta: 'Primaria',
  },
  {
    icon: '🎓',
    titulo: 'Estudiantes de Secundaria',
    descripcion:
      'Intervención en organización escolar, comprensión lectora, técnicas de estudio y manejo de la ansiedad académica para adolescentes.',
    etiqueta: 'Secundaria',
  },
  {
    icon: '👨‍👩‍👧',
    titulo: 'Grupos de Terapia para Padres',
    descripcion:
      'Espacios grupales de orientación y acompañamiento para que las familias comprendan las dificultades de sus hijos y fortalezcan el apoyo en el hogar.',
    etiqueta: 'Familias',
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
          <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
            {es
              ? 'Programa de intervención para estudiantes con dislexia, déficit de atención y otras dificultades de aprendizaje, con acompañamiento activo a las familias.'
              : 'Intervention program for students with dyslexia, attention deficit, and other learning difficulties, with active family support.'}
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
              ? 'El programa atiende a estudiantes de distintos niveles educativos e involucra activamente a las familias.'
              : 'The program serves students from different educational levels and actively involves families.'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                <p className="text-sm text-gray-600 leading-relaxed flex-1">{item.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nota metodológica */}
      <section className="bg-accent/5 border-l-4 border-accent mx-4 mb-4 rounded-r-xl px-6 py-5 max-w-3xl mx-auto">
        <p className="text-gray-700 text-sm leading-relaxed">
          {es
            ? '🔍 Todas las intervenciones parten de una evaluación diagnóstica individualizada. El plan de trabajo se actualiza periódicamente en coordinación con la familia y, cuando corresponde, con la institución educativa.'
            : '🔍 All interventions start from an individualized diagnostic evaluation. The work plan is updated periodically in coordination with the family and, when appropriate, with the educational institution.'}
        </p>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 text-center">
        <p className="text-gray-600 mb-6">
          {es
            ? '¿Tu hijo tiene dificultades en la escuela? Podemos ayudarte a encontrar el camino.'
            : 'Is your child struggling at school? We can help you find the way forward.'}
        </p>
        <Button href={`/${params.lang}/contacto`} size="lg">
          {es ? 'Hablar con un especialista' : 'Talk to a specialist'}
        </Button>
      </section>
    </>
  )
}
