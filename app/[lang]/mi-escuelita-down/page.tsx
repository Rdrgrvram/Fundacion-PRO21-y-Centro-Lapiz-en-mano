'use client'
import { useState } from 'react'
import Link from 'next/link'
import type { Locale } from '@/lib/i18n'

interface PageProps {
  params: { lang: Locale }
}

export default function Page({ params: { lang } }: PageProps) {
  const es = lang === 'es'
  const [activeLevel, setActiveLevel] = useState(0)
  const [openService, setOpenService] = useState<number | null>(null)

  // ── Áreas de terapia oficiales (del documento de la fundación) ────────────
  const areas = [
    {
      icon: '🧠',
      title: es ? 'Terapia de Conducta' : 'Behavioral Therapy',
      color: 'accent' as const,
      border: 'border-accent',
      bg: 'bg-accent/10',
      text: 'text-accent',
      desc: es
        ? 'Acompañamos a los niños en el desarrollo de habilidades sociales, autorregulación y rutinas positivas en el entorno familiar y escolar.'
        : 'We support children in developing social skills, self-regulation, and positive routines in family and school environments.',
      items: es
        ? ['Habilidades sociales', 'Autorregulación emocional', 'Rutinas positivas', 'Independencia funcional']
        : ['Social skills', 'Emotional self-regulation', 'Positive routines', 'Functional independence'],
    },
    {
      icon: '🗣️',
      title: es ? 'Terapia de Lenguaje' : 'Speech Therapy',
      color: 'secondary' as const,
      border: 'border-secondary',
      bg: 'bg-secondary/10',
      text: 'text-secondary',
      desc: es
        ? 'Evaluamos y tratamos dificultades del lenguaje implementando estrategias que favorezcan la comunicación efectiva, incluyendo sistemas aumentativos y alternativos.'
        : 'We evaluate and treat language difficulties, implementing strategies that promote effective communication, including augmentative and alternative systems.',
      items: es
        ? ['Control orofacial', 'Articulación fonética', 'Lenguaje expresivo y comprensivo', 'Comunicación funcional']
        : ['Orofacial control', 'Phonetic articulation', 'Expressive and receptive language', 'Functional communication'],
    },
    {
      icon: '💪',
      title: es ? 'Fisioterapia' : 'Physiotherapy',
      color: 'secondary' as const,
      border: 'border-secondary',
      bg: 'bg-secondary/10',
      text: 'text-secondary',
      desc: es
        ? 'Intervenimos desde la estimulación temprana para mejorar el tono muscular, la postura y la movilidad, adaptando ejercicios a cada etapa de desarrollo.'
        : 'We intervene from early stimulation to improve muscle tone, posture, and mobility, adapting exercises to each developmental stage.',
      items: es
        ? ['Estimulación temprana motora', 'Rehabilitación neuromuscular', 'Tono muscular y postura', 'Movilidad funcional']
        : ['Motor early stimulation', 'Neuromuscular rehabilitation', 'Muscle tone and posture', 'Functional mobility'],
    },
    {
      icon: '🤸',
      title: es ? 'Psicomotricidad' : 'Psychomotor Therapy',
      color: 'primary' as const,
      border: 'border-primary',
      bg: 'bg-primary/15',
      text: 'text-primary-700',
      desc: es
        ? 'Fortalecemos la coordinación, equilibrio y esquema corporal para favorecer la autonomía y la expresión corporal a través de circuitos, juegos y actividades vivenciales.'
        : 'We strengthen coordination, balance, and body schema to foster autonomy and body expression through circuits, games, and experiential activities.',
      items: es
        ? ['Coordinación motora gruesa y fina', 'Esquema corporal', 'Equilibrio y lateralidad', 'Integración bilateral']
        : ['Gross and fine motor coordination', 'Body schema', 'Balance and laterality', 'Bilateral integration'],
    },
  ]

  // ── Niveles educativos (del documento oficial) ────────────────────────────
  const levels = [
    {
      label: es ? 'Pre-Kínder' : 'Pre-Kinder',
      age: es ? '3 – 5 años' : '3 – 5 years',
      icon: '🌱',
      border: 'border-accent',
      bg: 'bg-accent/10',
      text: 'text-accent',
      activeBg: 'bg-accent',
      desc: es
        ? 'Actividades lúdicas orientadas al desarrollo cognitivo temprano. Introducimos progresivamente conceptos de lectura, escritura y matemáticas adaptadas al perfil comunicativo del niño, trabajando de la mano con la familia.'
        : 'Play-based activities focused on early cognitive development. We progressively introduce reading, writing, and math concepts adapted to the child\'s communicative profile, working hand-in-hand with families.',
      highlights: es
        ? ['Estimulación sensorial y motora', 'Desarrollo del lenguaje inicial', 'Habilidades socioemocionales', 'Juego funcional y estructurado']
        : ['Sensory and motor stimulation', 'Early language development', 'Socioemotional skills', 'Functional and structured play'],
    },
    {
      label: es ? 'Kínder' : 'Kinder',
      age: es ? '5 – 6 años' : '5 – 6 years',
      icon: '📚',
      border: 'border-secondary',
      bg: 'bg-secondary/10',
      text: 'text-secondary',
      activeBg: 'bg-secondary',
      desc: es
        ? 'Consolidamos habilidades fundamentales: lectoescritura inicial, operaciones matemáticas básicas y habilidades de convivencia. Preparamos al niño para la transición a educación primaria regular con acompañamiento terapéutico.'
        : 'We consolidate fundamental skills: basic reading and writing, math operations, and coexistence skills. We prepare children for the transition to regular primary education with therapeutic support.',
      highlights: es
        ? ['Lectoescritura inicial', 'Matemáticas básicas', 'Convivencia y normas', 'Preparación para primaria']
        : ['Basic reading and writing', 'Basic mathematics', 'Coexistence and norms', 'Primary school preparation'],
    },
    {
      label: es ? 'Primaria' : 'Primary',
      age: es ? '6+ años' : '6+ years',
      icon: '🎓',
      border: 'border-primary',
      bg: 'bg-primary/15',
      text: 'text-primary-700',
      activeBg: 'bg-primary',
      desc: es
        ? 'Los estudiantes de primaria en el Centro Lápiz en Mano asisten paralelamente al centro y a una escuela regular. Realizamos adaptaciones curriculares personalizadas y coordinamos con los docentes escolares para garantizar una inclusión educativa real y exitosa.'
        : 'Primary students at Centro Lápiz en Mano attend both our center and a regular school simultaneously. We make personalized curricular adaptations and coordinate with school teachers to ensure real and successful educational inclusion.',
      highlights: es
        ? ['Adaptaciones curriculares', 'Coordinación con escuelas', 'Libreta del sistema regular', 'Trayectoria hasta bachiller']
        : ['Curricular adaptations', 'School coordination', 'Regular system grade book', 'Path through graduation'],
    },
  ]

  // ── Servicios complementarios ──────────────────────────────────────────────
  const services = [
    {
      icon: '🧩',
      title: es ? 'Estimulación Neuro-cognitiva' : 'Neuro-cognitive Stimulation',
      desc: es
        ? 'Potenciamos las funciones cognitivas: atención, memoria de trabajo, funciones ejecutivas y razonamiento lógico adaptado al perfil de cada niño con síndrome de Down.'
        : 'We enhance cognitive functions: attention, working memory, executive functions, and logical reasoning adapted to each child\'s Down syndrome profile.',
    },
    {
      icon: '👨‍👩‍👧',
      title: es ? 'Orientación Familiar' : 'Family Guidance',
      desc: es
        ? 'Sesiones con padres y madres para compartir estrategias, resolver dudas y empoderar a la familia como co-terapeutas en el hogar. Incluye sesiones virtuales gratuitas.'
        : 'Sessions with parents to share strategies, resolve doubts, and empower families as co-therapists at home. Includes free virtual sessions.',
    },
    {
      icon: '🏫',
      title: es ? 'Coordinación Escolar' : 'School Coordination',
      desc: es
        ? 'Trabajamos directamente con los docentes de la escuela regular del niño para diseñar adaptaciones curriculares y garantizar la continuidad del aprendizaje en ambos entornos.'
        : 'We work directly with the child\'s regular school teachers to design curricular adaptations and ensure learning continuity in both environments.',
    },
    {
      icon: '📊',
      title: es ? 'Evaluación Continua' : 'Ongoing Evaluation',
      desc: es
        ? 'Reevaluamos periódicamente el progreso de cada niño y ajustamos el plan de intervención para mantener metas relevantes y alcanzables en cada etapa de su desarrollo.'
        : 'We periodically reevaluate each child\'s progress and adjust the intervention plan to maintain relevant and achievable goals at each development stage.',
    },
  ]

  const activeLv = levels[activeLevel]

  return (
    <div className="bg-white">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-primary overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/4" />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-800/70 mb-8">
            <Link href={`/${lang}`} className="hover:text-gray-900 transition-colors">
              {es ? 'Inicio' : 'Home'}
            </Link>
            <span>/</span>
            <span className="font-semibold text-gray-900">Mi Escuelita Down</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block bg-white/30 text-gray-900 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              {es ? 'Programa Especializado' : 'Specialized Program'}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Mi Escuelita Down
            </h1>
            <p className="text-lg md:text-xl text-gray-800 leading-relaxed mb-8 max-w-2xl">
              {es
                ? 'Intervención terapéutica y educativa integral para niños y niñas con síndrome de Down, desde la estimulación temprana hasta la inclusión escolar plena.'
                : 'Comprehensive therapeutic and educational intervention for children with Down syndrome, from early stimulation to full school inclusion.'}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#areas"
                className="inline-flex items-center gap-2 bg-gray-900 text-white font-bold px-6 py-3 rounded-full hover:bg-gray-800 transition-colors min-h-[44px]"
              >
                {es ? 'Ver áreas de intervención' : 'See intervention areas'}
              </a>
              <a
                href="https://wa.me/59170106276"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-6 py-3 rounded-full hover:bg-gray-100 transition-colors min-h-[44px]"
              >
                <svg className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {es ? 'Consultar por WhatsApp' : 'WhatsApp inquiry'}
              </a>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full h-8 md:h-12 fill-white">
            <path d="M0 30C360 60 1080 0 1440 30V60H0Z" />
          </svg>
        </div>
      </section>

      {/* ── Stats rápidos ─────────────────────────────────────────────────── */}
      <section className="py-10 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
            {[
              { icon: '👶', val: '0 – 14+', label: es ? 'años atendidos' : 'years served' },
              { icon: '🏫', val: '3', label: es ? 'niveles educativos' : 'educational levels' },
              { icon: '💛', val: '4', label: es ? 'áreas terapéuticas' : 'therapy areas' },
              { icon: '🎓', val: '8', label: es ? 'años de trayectoria' : 'years of experience' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1">
                <span className="text-3xl">{s.icon}</span>
                <span className="text-2xl font-extrabold text-gray-900">{s.val}</span>
                <span className="text-sm text-gray-500">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Áreas de terapia ──────────────────────────────────────────────── */}
      <section id="areas" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full">
              {es ? 'Intervención especializada' : 'Specialized intervention'}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4 mb-4">
              {es ? 'Áreas de Terapia' : 'Therapy Areas'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {es
                ? 'Cada niño recibe un plan de intervención personalizado que integra las cuatro áreas terapéuticas según sus necesidades individuales.'
                : 'Each child receives a personalized intervention plan that integrates the four therapy areas based on their individual needs.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {areas.map((area) => (
              <div
                key={area.title}
                className={`bg-white rounded-2xl p-6 border-l-4 ${area.border} shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${area.bg} rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}>
                    {area.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold text-lg ${area.text} mb-2`}>{area.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{area.desc}</p>
                    <ul className="grid grid-cols-2 gap-1">
                      {area.items.map((item) => (
                        <li key={item} className="flex items-center gap-1.5 text-xs text-gray-500">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Niveles educativos ────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary bg-secondary/10 px-4 py-1.5 rounded-full">
              {es ? 'Educación inclusiva' : 'Inclusive education'}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4 mb-4">
              {es ? 'Niveles Educativos' : 'Educational Levels'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {es
                ? 'Nuestros estudiantes cuentan con libreta de la educación regular y reciben adaptaciones curriculares en cada etapa.'
                : 'Our students hold a regular education grade book and receive curricular adaptations at each stage.'}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-2 mb-8 flex-wrap">
            {levels.map((lv, i) => (
              <button
                key={lv.label}
                onClick={() => setActiveLevel(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all min-h-[44px] ${
                  activeLevel === i
                    ? `${lv.activeBg} text-white shadow-md`
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span>{lv.icon}</span>
                <span>{lv.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${activeLevel === i ? 'bg-white/20' : 'bg-gray-200 text-gray-500'}`}>
                  {lv.age}
                </span>
              </button>
            ))}
          </div>

          {/* Panel activo */}
          <div className={`max-w-4xl mx-auto bg-white rounded-2xl border ${activeLv.border} shadow-sm overflow-hidden`}>
            <div className={`${activeLv.bg} p-6 flex items-center gap-4`}>
              <span className="text-4xl">{activeLv.icon}</span>
              <div>
                <h3 className={`text-xl font-extrabold ${activeLv.text}`}>{activeLv.label}</h3>
                <span className="text-sm text-gray-500">{activeLv.age}</span>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700 leading-relaxed mb-6">{activeLv.desc}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeLv.highlights.map((h) => (
                  <div key={h} className={`flex items-center gap-3 p-3 rounded-xl ${activeLv.bg}`}>
                    <span className={`w-2 h-2 rounded-full ${activeLv.activeBg} flex-shrink-0`} />
                    <span className="text-sm font-medium text-gray-700">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Servicios complementarios ─────────────────────────────────────── */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-4 py-1.5 rounded-full">
              {es ? 'Apoyo integral' : 'Comprehensive support'}
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-4 mb-4">
              {es ? 'Servicios Complementarios' : 'Complementary Services'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {services.map((svc, i) => (
              <div key={svc.title} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                  style={{ backgroundColor: i % 2 === 0 ? 'rgba(140,60,189,0.1)' : 'rgba(34,156,194,0.1)' }}
                >
                  {svc.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{svc.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Proceso de ingreso ────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
              {es ? '¿Cómo ingresar al programa?' : 'How to join the program?'}
            </h2>
          </div>
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            {[
              { n: '1', icon: '📞', title: es ? 'Contacto inicial' : 'Initial contact', desc: es ? 'Contáctanos por WhatsApp o formulario para agendar una primera conversación.' : 'Contact us via WhatsApp or form to schedule a first conversation.' },
              { n: '2', icon: '🔍', title: es ? 'Evaluación' : 'Evaluation', desc: es ? 'Realizamos una evaluación integral del niño para diseñar un plan personalizado.' : 'We conduct a comprehensive evaluation to design a personalized plan.' },
              { n: '3', icon: '📋', title: es ? 'Plan de intervención' : 'Intervention plan', desc: es ? 'Elaboramos objetivos claros y seleccionamos las áreas terapéuticas prioritarias.' : 'We set clear objectives and select priority therapy areas.' },
              { n: '4', icon: '🌱', title: es ? 'Inicio del programa' : 'Program start', desc: es ? 'El niño comienza sus sesiones. La familia recibe orientación permanente.' : 'The child starts sessions. The family receives ongoing guidance.' },
            ].map((step) => (
              <div key={step.n} className="flex-1 flex flex-col items-center text-center p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-extrabold text-gray-900 text-lg mb-3">
                  {step.n}
                </div>
                <span className="text-2xl mb-2">{step.icon}</span>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Final ─────────────────────────────────────────────────────── */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            {es ? '¿Tu hijo tiene síndrome de Down?' : 'Does your child have Down syndrome?'}
          </h2>
          <p className="text-gray-800 text-lg mb-8 max-w-xl mx-auto">
            {es
              ? 'Contáctanos hoy. Evaluamos gratuitamente a cada niño y diseñamos un plan adaptado a sus necesidades.'
              : 'Contact us today. We evaluate each child free of charge and design a plan adapted to their needs.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/59170106276"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-900 text-white font-bold px-8 py-4 rounded-full hover:bg-gray-800 transition-colors min-h-[52px]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp: 70106276
            </a>
            <Link
              href={`/${lang}/contacto`}
              className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors min-h-[52px]"
            >
              {es ? 'Formulario de contacto' : 'Contact form'}
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
