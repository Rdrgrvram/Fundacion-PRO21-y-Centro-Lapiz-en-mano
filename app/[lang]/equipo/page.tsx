import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n'
import TeamMember from '@/components/sections/TeamMember'

export const metadata: Metadata = {
  title: 'Nuestro Equipo | Fundación PRO-21',
}

const PROFESIONALES = [
  { name: 'Mónica Mikaela Medina Rosales', role: 'Psicología' },
  { name: 'Ana Valentina Copa Rosales',    role: 'Psicología' },
  { name: 'Luis Enrique Machicado Cahuaya', role: 'Psicología' },
  { name: 'Helan Paola Medrano López',     role: 'Psicología' },
  { name: 'Benita Isabel Rosales',         role: 'Trabajo Social' },
  { name: 'Wara Belen Valdivia',           role: 'Psicomotricidad' },
  { name: 'Belen Lazcano Quispe',          role: 'Fisioterapia' },
  { name: 'Yasmanni German Peralta Mendoza', role: 'Terapia de Lenguaje' },
  { name: 'Megan',                         role: 'Parvularia' },
]

const VOLUNTARIOS = ['Paola', 'Wanda', 'Alejandra']

export default function Page({ params }: { params: { lang: Locale } }) {
  const es = params.lang === 'es'

  return (
    <>
      {/* Encabezado */}
      <section className="bg-gradient-to-br from-secondary/10 to-primary/10 py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            {es ? 'Nuestro Equipo' : 'Our Team'}
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            {es
              ? '10 profesionales comprometidos con la educación inclusiva y el desarrollo integral de cada niño.'
              : '10 professionals committed to inclusive education and the comprehensive development of each child.'}
          </p>
        </div>
      </section>

      {/* Equipo profesional */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {es ? 'Equipo Profesional' : 'Professional Team'}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {PROFESIONALES.map((p) => (
              <div key={p.name} className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                <TeamMember name={p.name} role={p.role} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Voluntarios */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {es ? 'Voluntarios' : 'Volunteers'}
          </h2>
          <p className="text-gray-500 mb-6">
            {es
              ? 'Personas que dedican su tiempo y compromiso a apoyar la misión de la fundación.'
              : 'People who dedicate their time and commitment to support the foundation\'s mission.'}
          </p>
          <div className="flex flex-wrap gap-3">
            {VOLUNTARIOS.map((nombre) => (
              <div
                key={nombre}
                className="flex items-center gap-2 bg-white border border-gray-100 rounded-full px-4 py-2 shadow-sm"
              >
                <span className="text-gray-400">👤</span>
                <span className="font-medium text-gray-700">{nombre}</span>
                <span className="text-xs text-accent font-medium">
                  {es ? 'Voluntaria' : 'Volunteer'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
