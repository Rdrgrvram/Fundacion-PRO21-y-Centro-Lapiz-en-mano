import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Mi Escuelita Down | Fundación PRO-21',
  description:
    'Programa especializado para niños y niñas con síndrome de Down. Atención integral terapéutica y educativa en La Paz, Bolivia.',
}

const AREAS_TERAPEUTICAS = [
  {
    icon: '🧩',
    titulo: 'Terapia de Conducta',
    descripcion:
      'Diseñamos planes para mejorar el comportamiento adaptativo y trabajamos con los padres para reforzar conductas positivas en casa.',
  },
  {
    icon: '💬',
    titulo: 'Terapia de Lenguaje',
    descripcion:
      'Evaluamos y tratamos las dificultades del lenguaje en niños con síndrome de Down, implementando estrategias que favorezcan la comunicación efectiva.',
  },
  {
    icon: '🏃',
    titulo: 'Fisioterapia',
    descripcion:
      'Mejoramos la movilidad y las habilidades motoras de los niños mediante ejercicios adaptados a las necesidades individuales de cada uno.',
  },
  {
    icon: '🎯',
    titulo: 'Psicomotricidad',
    descripcion:
      'Potenciamos las habilidades motoras gruesas y finas, favoreciendo la coordinación y el equilibrio de cada niño.',
  },
]

const NIVELES_EDUCATIVOS = [
  {
    icon: '🌼',
    nivel: 'Pre-Kínder',
    descripcion:
      'Diseñamos actividades educativas inclusivas y personalizadas para introducir al niño en el mundo escolar a su propio ritmo.',
  },
  {
    icon: '⭐',
    nivel: 'Kínder',
    descripcion:
      'Trabajamos en habilidades académicas y sociales que preparan al niño para la educación formal con acompañamiento especializado.',
  },
  {
    icon: '📚',
    nivel: 'Primaria',
    descripcion:
      'Acompañamiento curricular adaptado con énfasis en lectoescritura, lógica matemática y desarrollo de la autonomía personal.',
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
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {es
              ? 'Programa especializado de la Fundación PRO-21 para niños y niñas con síndrome de Down. Ofrecemos acompañamiento interdisciplinario que fortalece habilidades cognitivas, comunicativas, motoras, sociales y adaptativas, planificado de manera individual para cada niño y su familia.'
              : 'Specialized program of Fundación PRO-21 for children with Down syndrome. We offer interdisciplinary support that strengthens cognitive, communicative, motor, social and adaptive skills, individually planned for each child and their family.'}
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold px-5 py-2 rounded-full">
            <span>👶</span>
            <span>{es ? '40 niños atendidos actualmente' : '40 children currently enrolled'}</span>
          </div>
        </div>
      </section>

      {/* Áreas Terapéuticas */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {es ? 'Áreas de Intervención Terapéutica' : 'Therapy Intervention Areas'}
          </h2>
          <p className="text-gray-500 mb-8">
            {es
              ? 'Cada niño recibe un plan personalizado que puede incluir una o más de las siguientes terapias, en coordinación con su familia.'
              : 'Each child receives a personalized plan that may include one or more of the following therapies, in coordination with their family.'}
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
              ? 'Currículo adaptado con docentes especializados en educación inclusiva. Actividades educativas personalizadas para preparar a los niños para la educación formal.'
              : 'Adapted curriculum with teachers specialized in inclusive education. Personalized educational activities to prepare children for formal schooling.'}
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
            ? '¿Tienes un hijo con síndrome de Down? Contáctanos para conocer cómo podemos acompañarlo.'
            : 'Do you have a child with Down syndrome? Contact us to learn how we can support them.'}
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button href={`/${params.lang}/contacto`} size="lg">
            {es ? 'Solicitar información' : 'Request information'}
          </Button>
          <Button href="https://wa.me/59170106276" external variant="outline" size="lg">
            {es ? 'WhatsApp' : 'WhatsApp'}
          </Button>
        </div>
      </section>
    </>
  )
}
