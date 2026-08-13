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

  // ── Niveles preescolares (del documento oficial de la fundación) ───────────
  // Aula Wawitas es un programa preescolar general — NO específico de autismo
  const levels = [
    {
      label: es ? 'Parvulario' : 'Nursery',
      age: es ? '3 años' : '3 years',
      icon: '🧸',
      border: 'border-accent',
      bg: 'bg-accent/10',
      text: 'text-accent',
      activeBg: 'bg-accent',
      desc: es
        ? 'El nivel de Parvulario se orienta a implementar actividades sensoriales y de exploración para niños pequeños. Acompañamos las primeras interacciones lúdicas estructuradas, trabajando de manera enfocada en el desarrollo de habilidades socioemocionales iniciales, el juego simbólico y la autorregulación en espacios terapéuticos.'
        : 'The Nursery level focuses on implementing sensory and exploration activities for toddlers. We accompany the first structured play interactions, working on the development of initial socioemotional skills, symbolic play, and self-regulation in therapeutic spaces.',
      highlights: es
        ? ['Actividades sensoriales', 'Exploración del entorno', 'Habilidades socioemocionales iniciales', 'Juego funcional y estructurado']
        : ['Sensory activities', 'Environmental exploration', 'Initial socioemotional skills', 'Functional and structured play'],
    },
    {
      label: es ? 'Pre-Kínder' : 'Pre-Kinder',
      age: es ? '4 años' : '4 years',
      icon: '🎨',
      border: 'border-secondary',
      bg: 'bg-secondary/10',
      text: 'text-secondary',
      activeBg: 'bg-secondary',
      desc: es
        ? 'En Pre-Kínder, nos enfocamos en diseñar actividades lúdicas para el desarrollo cognitivo temprano. Introducimos progresivamente conceptos básicos de lectura, escritura y matemáticas adaptadas al perfil comunicativo del niño, ampliando su vocabulario y fortaleciendo sus canales expresivos y receptivos.'
        : 'In Pre-Kinder, we focus on designing play-based activities for early cognitive development. We progressively introduce basic reading, writing, and math concepts adapted to the child\'s communicative profile, expanding vocabulary and strengthening expressive and receptive channels.',
      highlights: es
        ? ['Desarrollo cognitivo temprano', 'Conceptos de lectoescritura inicial', 'Nociones matemáticas básicas', 'Ampliación de vocabulario']
        : ['Early cognitive development', 'Initial reading & writing concepts', 'Basic math notions', 'Vocabulary expansion'],
    },
    {
      label: es ? 'Kínder' : 'Kinder',
      age: es ? '5 años' : '5 years',
      icon: '✏️',
      border: 'border-primary',
      bg: 'bg-primary/15',
      text: 'text-primary-700',
      activeBg: 'bg-primary',
      desc: es
        ? 'El nivel Kínder consolida habilidades fundamentales y prepara al niño para su transición a la educación primaria regular. Trabajamos la lectoescritura, las operaciones básicas, la convivencia y las habilidades de autonomía que el niño necesitará en su nuevo entorno escolar.'
        : 'The Kinder level consolidates fundamental skills and prepares the child for the transition to regular primary education. We work on reading and writing, basic operations, coexistence, and the autonomy skills the child will need in their new school environment.',
      highlights: es
        ? ['Consolidación de lectoescritura', 'Operaciones matemáticas básicas', 'Habilidades de convivencia', 'Preparación para primaria regular']
        : ['Reading and writing consolidation', 'Basic math operations', 'Coexistence skills', 'Regular primary school preparation'],
    },
  ]

  // ── Pilares del programa ──────────────────────────────────────────────────
  const pillars = [
    {
      icon: '⏰',
      title: es ? 'Intervención temprana' : 'Early intervention',
      desc: es
        ? 'Cuanto antes se identifique una necesidad y se intervenga, mayor será el impacto en el desarrollo del niño. Cada etapa preescolar es una ventana única de aprendizaje.'
        : 'The earlier a need is identified and addressed, the greater the impact on the child\'s development. Each preschool stage is a unique learning window.',
      border: 'border-accent',
      text: 'text-accent',
      bg: 'bg-accent/10',
    },
    {
      icon: '🧩',
      title: es ? 'Aprendizaje individualizado' : 'Individualized learning',
      desc: es
        ? 'No hay dos niños iguales. Cada plan de estimulación se diseña a medida, respetando el ritmo, las fortalezas y las particularidades de cada pequeño.'
        : 'No two children are alike. Each stimulation plan is custom-designed, respecting each child\'s pace, strengths, and particularities.',
      border: 'border-secondary',
      text: 'text-secondary',
      bg: 'bg-secondary/10',
    },
    {
      icon: '🔄',
      title: es ? 'Enfoque integral' : 'Integral approach',
      desc: es
        ? 'Abordamos todas las áreas del desarrollo de forma simultánea y coordinada: cognición, comunicación, motricidad, socialización y autonomía.'
        : 'We address all areas of development simultaneously and in a coordinated way: cognition, communication, motor skills, socialization, and autonomy.',
      border: 'border-primary',
      text: 'text-primary-700',
      bg: 'bg-primary/15',
    },
    {
      icon: '👨‍👩‍👧',
      title: es ? 'Familia como aliada' : 'Family as ally',
      desc: es
        ? 'Los padres son los principales agentes del cambio. Los formamos, acompañamos y empoderamos para que sean co-educadores activos en el hogar.'
        : 'Parents are the main agents of change. We train, accompany, and empower them to be active co-educators at home.',
      border: 'border-accent',
      text: 'text-accent',
      bg: 'bg-accent/10',
    },
  ]

  // ── Actividades por área ──────────────────────────────────────────────────
  const activities = [
    {
      icon: '🧠',
      title: es ? 'Cognición y Aprendizaje' : 'Cognition & Learning',
      border: 'border-accent',
      bg: 'bg-accent/10',
      text: 'text-accent',
      items: es
        ? ['Clasificación y seriación', 'Conceptos espaciales y temporales', 'Memoria y atención', 'Razonamiento lógico básico']
        : ['Classification and seriation', 'Spatial and temporal concepts', 'Memory and attention', 'Basic logical reasoning'],
    },
    {
      icon: '🗣️',
      title: es ? 'Comunicación y Lenguaje' : 'Communication & Language',
      border: 'border-secondary',
      bg: 'bg-secondary/10',
      text: 'text-secondary',
      items: es
        ? ['Vocabulario expresivo y receptivo', 'Comprensión de instrucciones', 'Narración y descripción', 'Iniciación a la lectoescritura']
        : ['Expressive and receptive vocabulary', 'Instruction comprehension', 'Narration and description', 'Introduction to reading and writing'],
    },
    {
      icon: '🤸',
      title: es ? 'Motricidad y Cuerpo' : 'Motor Skills & Body',
      border: 'border-primary',
      bg: 'bg-primary/15',
      text: 'text-primary-700',
      items: es
        ? ['Coordinación motora gruesa', 'Motricidad fina y grafomotricidad', 'Esquema corporal', 'Destrezas de autonomía']
        : ['Gross motor coordination', 'Fine motor and graphomotor skills', 'Body schema', 'Autonomy skills'],
    },
    {
      icon: '🌟',
      title: es ? 'Socialización y Autonomía' : 'Socialization & Autonomy',
      border: 'border-accent',
      bg: 'bg-accent/10',
      text: 'text-accent',
      items: es
        ? ['Habilidades de juego cooperativo', 'Normas de convivencia', 'Rutinas de autocuidado', 'Expresión emocional']
        : ['Cooperative play skills', 'Coexistence norms', 'Self-care routines', 'Emotional expression'],
    },
  ]

  const activeLv = levels[activeLevel]

  return (
    <div className="bg-white">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-secondary overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-1/4 -left-16 w-64 h-64 bg-white/10 rounded-full" />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-8">
            <Link href={`/${lang}`} className="hover:text-white transition-colors">
              {es ? 'Inicio' : 'Home'}
            </Link>
            <span>/</span>
            <span className="font-semibold text-white">Aula Wawitas</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              {es ? 'Programa Preescolar' : 'Preschool Program'}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Aula Wawitas
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-2xl">
              {es
                ? 'Programa de estimulación y educación preescolar integral para niños y niñas de 3 a 5 años, preparándolos para una transición exitosa a la educación primaria regular.'
                : 'Comprehensive preschool stimulation and education program for children ages 3 to 5, preparing them for a successful transition to regular primary education.'}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#niveles"
                className="inline-flex items-center gap-2 bg-white text-secondary font-bold px-6 py-3 rounded-full hover:bg-gray-100 transition-colors min-h-[44px]"
              >
                {es ? 'Ver niveles del programa' : 'See program levels'}
              </a>
              <a
                href="https://wa.me/59170106276"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-secondary-700 text-white font-bold px-6 py-3 rounded-full hover:bg-secondary-700/90 transition-colors min-h-[44px]"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
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

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <section className="py-10 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
            {[
              { icon: '🧸', val: '3', label: es ? 'niveles: Parvulario, Pre-Kínder, Kínder' : 'levels: Nursery, Pre-Kinder, Kinder' },
              { icon: '📅', val: '3 – 5', label: es ? 'años de edad' : 'years of age' },
              { icon: '🎯', val: '4', label: es ? 'áreas de estimulación' : 'stimulation areas' },
              { icon: '🏫', val: '✓', label: es ? 'Integración a educación regular' : 'Regular education integration' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1">
                <span className="text-3xl">{s.icon}</span>
                <span className="text-2xl font-extrabold text-gray-900">{s.val}</span>
                <span className="text-xs text-gray-500 leading-tight">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pilares ───────────────────────────────────────────────────────── */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary bg-secondary/10 px-4 py-1.5 rounded-full">
              {es ? 'Nuestra filosofía' : 'Our philosophy'}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4 mb-4">
              {es ? 'Pilares del Programa' : 'Program Pillars'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {pillars.map((p) => (
              <div key={p.title} className={`bg-white rounded-2xl p-5 border-t-4 ${p.border} shadow-sm`}>
                <div className={`w-12 h-12 ${p.bg} rounded-xl flex items-center justify-center text-2xl mb-4`}>
                  {p.icon}
                </div>
                <h3 className={`font-bold text-base mb-2 ${p.text}`}>{p.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Niveles educativos ────────────────────────────────────────────── */}
      <section id="niveles" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-4 py-1.5 rounded-full">
              {es ? 'Trayectoria preescolar' : 'Preschool path'}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4 mb-4">
              {es ? 'Niveles del Programa' : 'Program Levels'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {es
                ? 'Acompañamos a cada niño desde los 3 años con un currículo progresivo que respeta su ritmo individual.'
                : 'We accompany each child from age 3 with a progressive curriculum that respects their individual pace.'}
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
                    ? `${lv.activeBg} ${lv.activeBg === 'bg-primary' ? 'text-gray-900' : 'text-white'} shadow-md`
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

      {/* ── Áreas de estimulación ─────────────────────────────────────────── */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary bg-secondary/10 px-4 py-1.5 rounded-full">
              {es ? 'Qué trabajamos' : 'What we work on'}
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-4 mb-4">
              {es ? 'Áreas de Estimulación' : 'Stimulation Areas'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {activities.map((a) => (
              <div key={a.title} className={`bg-white rounded-2xl p-5 border-l-4 ${a.border} shadow-sm`}>
                <div className={`w-12 h-12 ${a.bg} rounded-xl flex items-center justify-center text-2xl mb-3`}>
                  {a.icon}
                </div>
                <h3 className={`font-bold mb-3 ${a.text}`}>{a.title}</h3>
                <ul className="space-y-2">
                  {a.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0 mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
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
              {es ? '¿Cómo inscribir a tu hijo?' : 'How to enroll your child?'}
            </h2>
          </div>
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            {[
              { n: '1', icon: '📞', title: es ? 'Contacto inicial' : 'Initial contact', desc: es ? 'Comunícate con nosotros por WhatsApp o formulario. Te respondemos en menos de 24 horas.' : 'Contact us via WhatsApp or form. We respond in less than 24 hours.' },
              { n: '2', icon: '🔍', title: es ? 'Evaluación inicial' : 'Initial evaluation', desc: es ? 'Realizamos una evaluación del desarrollo del niño para conocer su perfil y necesidades.' : 'We evaluate the child\'s development to understand their profile and needs.' },
              { n: '3', icon: '📋', title: es ? 'Plan de estimulación' : 'Stimulation plan', desc: es ? 'Diseñamos un programa personalizado con objetivos a corto, medio y largo plazo.' : 'We design a personalized program with short, medium, and long-term goals.' },
              { n: '4', icon: '🌟', title: es ? 'Inicio del programa' : 'Program start', desc: es ? 'El niño comienza el programa y la familia recibe orientación continua.' : 'The child begins the program and the family receives ongoing guidance.' },
            ].map((step) => (
              <div key={step.n} className="flex-1 flex flex-col items-center text-center p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-extrabold text-white text-lg mb-3">
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
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            {es ? '¿Tu hijo tiene entre 3 y 5 años?' : 'Is your child between 3 and 5 years old?'}
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
            {es
              ? 'El Aula Wawitas recibe niños de 3 a 5 años. Contáctanos para conocer disponibilidad y comenzar el proceso de inscripción.'
              : 'Aula Wawitas accepts children ages 3 to 5. Contact us to check availability and start the enrollment process.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/59170106276"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-secondary font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors min-h-[52px]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp: 70106276
            </a>
            <Link
              href={`/${lang}/contacto`}
              className="inline-flex items-center gap-2 bg-secondary-700 text-white font-bold px-8 py-4 rounded-full hover:bg-secondary-700/90 transition-colors min-h-[52px]"
            >
              {es ? 'Formulario de contacto' : 'Contact form'}
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
