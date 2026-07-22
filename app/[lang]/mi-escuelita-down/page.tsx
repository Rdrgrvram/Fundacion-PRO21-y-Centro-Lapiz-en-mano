import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Mi Escuelita Down | Fundación PRO-21',
}

const AREAS_TERAPEUTICAS = [
  {
    icon: '🧩',
    titulo: 'Terapia de Conducta',
    descripcion:
      'Desarrollo de habilidades sociales, manejo de conductas adaptativas y fortalecimiento de la autonomía personal.',
  },
  {
    icon: '💬',
    titulo: 'Terapia de Lenguaje',
    descripcion:
      'Estimulación del habla, comprensión verbal y comunicación funcional adaptada al ritmo de cada niño.',
  },
  {
    icon: '🏃',
    titulo: 'Fisioterapia',
    descripcion:
      'Fortalecimiento muscular, coordinación motora y mejora del equilibrio a través de ejercicios especializados.',
  },
  {
    icon: '🎯',
    titulo: 'Psicomotricidad',
    descripcion:
      'Integración del movimiento corporal con el desarrollo cognitivo y emocional del niño.',
  },
]

const NIVELES_EDUCATIVOS = [
  {
    icon: '🌼',
    nivel: 'Pre-Kinder',
    descripcion: 'Iniciación escolar con metodología adaptada, estimulación sensorial y primeros aprendizajes.',
  },
  {
    icon: '⭐',
    nivel: 'Kinder',
    descripcion: 'Desarrollo de habilidades preacadémicas: grafomotricidad, lógica matemática y lenguaje.',
  },
  {
    icon: '📚',
    nivel: 'Primaria',
    descripcion: 'Acompañamiento curricular adaptado con énfasis en lectoescritura, cálculo y autonomía.',
  },
]

export default function Page({ params }: { params: { lang: Locale } }) {
  const es = params.lang === 'es'

  return (
    <>
      {/* Encabezado */}
      <section className="bg-gradient-to-br from-primary/20 to-primary/5 py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <span className="text-5xl">🌻</span>
          <h1 className="mt-4 text-4xl font-bold text-gray-900">Mi Escuelita Down</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
            {es
              ? 'Programa especializado para niños con síndrome de Down. Atención integral terapéutica y educativa con 40 niños actualmente.'
              : 'Specialized program for children with Down syndrome. Comprehensive therapeutic and educational care with 40 children currently enrolled.'}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold px-5 py-2 rounded-full">
            <span>👶</span>
            <span>{es ? '40 niños atendidos' : '40 children enrolled'}</span>
          </div>
        </div>
      </section>

      {/* Áreas Terapéuticas */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {es ? 'Áreas Terapéuticas' : 'Therapy Areas'}
          </h2>
          <p className="text-gray-500 mb-8">
            {es
              ? 'Cada niño recibe un plan personalizado que puede incluir una o más de las siguientes terapias.'
              : 'Each child receives a personalized plan that may include one or more of the following therapies.'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {AREAS_TERAPEUTICAS.map((area) => (
              <div
                key={area.titulo}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-3"
              >
                <span className="text-4xl">{area.icon}</span>
                <h3 className="font-bold text-gray-900">{area.titulo}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{area.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Área Educativa */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {es ? 'Área Educativa' : 'Educational Area'}
          </h2>
          <p className="text-gray-500 mb-8">
            {es
              ? 'Currículo adaptado con docentes especializados en educación inclusiva.'
              : 'Adapted curriculum with teachers specialized in inclusive education.'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {NIVELES_EDUCATIVOS.map((nivel) => (
              <div
                key={nivel.nivel}
                className="bg-white rounded-2xl border border-primary/20 p-6 flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{nivel.icon}</span>
                  <h3 className="text-lg font-bold text-primary">{nivel.nivel}</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{nivel.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 text-center">
        <p className="text-gray-600 mb-6">
          {es
            ? '¿Tienes un hijo con síndrome de Down? Contáctanos para más información.'
            : 'Do you have a child with Down syndrome? Contact us for more information.'}
        </p>
        <Button href={`/${params.lang}/contacto`} size="lg">
          {es ? 'Contáctanos' : 'Contact us'}
        </Button>
      </section>
    </>
  )
}
