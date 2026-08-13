'use client'
import { useState } from 'react'
import Link from 'next/link'
import type { Locale } from '@/lib/i18n'

interface PageProps {
  params: { lang: Locale }
}

export default function Page({ params: { lang } }: PageProps) {
  const es = lang === 'es'
  const [activeModality, setActiveModality] = useState(0)
  const [openDiff, setOpenDiff] = useState<number | null>(null)

  // ── Dificultades de aprendizaje atendidas ─────────────────────────────────
  const difficulties = [
    {
      icon: '📖',
      name: es ? 'Dislexia' : 'Dyslexia',
      tag: es ? 'Lectura' : 'Reading',
      border: 'border-secondary',
      bg: 'bg-secondary/10',
      text: 'text-secondary',
      desc: es
        ? 'Dificultad persistente para leer con fluidez y precisión, no explicada por la inteligencia ni por falta de oportunidades educativas. Se trabaja con metodologías multisensoriales y estructuradas.'
        : 'Persistent difficulty reading with fluency and accuracy, not explained by intelligence or lack of educational opportunity. Addressed with multisensory, structured methodologies.',
    },
    {
      icon: '✏️',
      name: es ? 'Disgrafía' : 'Dysgraphia',
      tag: es ? 'Escritura' : 'Writing',
      border: 'border-accent',
      bg: 'bg-accent/10',
      text: 'text-accent',
      desc: es
        ? 'Dificultad en la expresión escrita: caligrafía irregular, errores ortográficos frecuentes y problemas para organizar ideas en el papel. Trabajamos grafomotricidad y expresión escrita.'
        : 'Difficulty in written expression: irregular handwriting, frequent spelling errors, and problems organizing ideas on paper. We work on graphomotricity and written expression.',
    },
    {
      icon: '🔢',
      name: es ? 'Discalculia' : 'Dyscalculia',
      tag: es ? 'Matemáticas' : 'Math',
      border: 'border-primary',
      bg: 'bg-primary/15',
      text: 'text-primary-700',
      desc: es
        ? 'Dificultad para comprender conceptos numéricos, realizar cálculos y resolver problemas matemáticos acordes a la edad. Abordaje concreto-representativo-abstracto.'
        : 'Difficulty understanding numerical concepts, performing calculations, and solving age-appropriate math problems. Concrete-representational-abstract approach.',
    },
    {
      icon: '🎯',
      name: es ? 'TDAH' : 'ADHD',
      tag: es ? 'Atención' : 'Attention',
      border: 'border-secondary',
      bg: 'bg-secondary/10',
      text: 'text-secondary',
      desc: es
        ? 'Dificultades en la atención sostenida, organización, control de impulsos y regulación de la actividad motora. Estrategias para el aula y el hogar con enfoque en funciones ejecutivas.'
        : 'Difficulties in sustained attention, organization, impulse control, and motor activity regulation. Classroom and home strategies focused on executive functions.',
    },
    {
      icon: '⏱️',
      name: es ? 'Procesamiento lento' : 'Slow processing',
      tag: es ? 'Velocidad' : 'Speed',
      border: 'border-accent',
      bg: 'bg-accent/10',
      text: 'text-accent',
      desc: es
        ? 'El niño comprende los contenidos pero necesita significativamente más tiempo para procesar información y completar tareas. Adaptaciones del entorno y estrategias de ritmo propio.'
        : 'The child understands content but needs significantly more time to process information and complete tasks. Environment adaptations and self-paced strategies.',
    },
    {
      icon: '📚',
      name: es ? 'Bajo rendimiento escolar' : 'Low school performance',
      tag: es ? 'Rendimiento' : 'Performance',
      border: 'border-primary',
      bg: 'bg-primary/15',
      text: 'text-primary-700',
      desc: es
        ? 'Bajo rendimiento no explicado por una condición específica. Requiere evaluación integral para identificar causas y diseñar estrategias personalizadas de apoyo académico.'
        : 'Low performance not explained by a specific condition. Requires comprehensive evaluation to identify causes and design personalized academic support strategies.',
    },
  ]

  // ── Modalidades de atención (del documento oficial) ───────────────────────
  const modalities = [
    {
      label: es ? 'Primaria' : 'Primary',
      icon: '📚',
      border: 'border-secondary',
      bg: 'bg-secondary/10',
      text: 'text-secondary',
      activeBg: 'bg-secondary',
      desc: es
        ? 'Apoyo psicopedagógico para estudiantes de educación primaria con dificultades de aprendizaje. Trabajamos en coordinación directa con los docentes escolares para garantizar coherencia entre el centro y la escuela, adaptando los contenidos curriculares al perfil de cada estudiante.'
        : 'Psychopedagogical support for primary school students with learning difficulties. We work in direct coordination with school teachers to ensure consistency between the center and school, adapting curricular content to each student\'s profile.',
      highlights: es
        ? ['Coordinación con docentes', 'Adaptaciones curriculares', 'Refuerzo de lectoescritura', 'Estrategias matemáticas']
        : ['Teacher coordination', 'Curricular adaptations', 'Reading & writing reinforcement', 'Math strategies'],
    },
    {
      label: es ? 'Secundaria' : 'Secondary',
      icon: '🎓',
      border: 'border-accent',
      bg: 'bg-accent/10',
      text: 'text-accent',
      activeBg: 'bg-accent',
      desc: es
        ? 'Intervención especializada para adolescentes en educación secundaria. Trabajamos organización del estudio, técnicas de aprendizaje efectivas, gestión del tiempo y estrategias para exámenes, acompañando al estudiante en las materias que le presentan mayor dificultad.'
        : 'Specialized intervention for secondary school adolescents. We work on study organization, effective learning techniques, time management, and exam strategies, supporting students in the subjects they find most challenging.',
      highlights: es
        ? ['Técnicas de estudio', 'Organización y planificación', 'Estrategias para exámenes', 'Gestión del tiempo']
        : ['Study techniques', 'Organization and planning', 'Exam strategies', 'Time management'],
    },
    {
      label: es ? 'Terapia Grupal' : 'Group Therapy',
      icon: '👨‍👩‍👧‍👦',
      border: 'border-primary',
      bg: 'bg-primary/15',
      text: 'text-primary-700',
      activeBg: 'bg-primary',
      desc: es
        ? 'Sesiones grupales para familias que enfrentan desafíos similares. Un espacio de apoyo mutuo donde los padres aprenden estrategias concretas, comparten experiencias y fortalecen su rol como co-terapeutas en el hogar.'
        : 'Group sessions for families facing similar challenges. A mutual support space where parents learn concrete strategies, share experiences, and strengthen their role as co-therapists at home.',
      highlights: es
        ? ['Red de apoyo entre familias', 'Estrategias para el hogar', 'Contención emocional', 'Recursos compartidos']
        : ['Family support network', 'Home strategies', 'Emotional containment', 'Shared resources'],
    },
    {
      label: es ? 'Terapia Individual' : 'Individual Therapy',
      icon: '🧩',
      border: 'border-secondary',
      bg: 'bg-secondary/10',
      text: 'text-secondary',
      activeBg: 'bg-secondary',
      desc: es
        ? 'Sesiones individuales intensivas con el terapeuta, diseñadas a medida del perfil de aprendizaje único de cada niño o adolescente. Mayor frecuencia de atención y seguimiento personalizado del progreso.'
        : 'Intensive individual sessions with the therapist, custom-designed for each child\'s or adolescent\'s unique learning profile. Higher frequency of attention and personalized progress tracking.',
      highlights: es
        ? ['Plan de intervención único', 'Seguimiento personalizado', 'Mayor frecuencia de sesiones', 'Comunicación directa con familia']
        : ['Unique intervention plan', 'Personalized follow-up', 'Higher session frequency', 'Direct family communication'],
    },
  ]

  // ── Proceso de intervención ───────────────────────────────────────────────
  const steps = [
    { n: '1', icon: '👂', title: es ? 'Escuchar' : 'Listen', desc: es ? 'Entrevista con la familia para entender la historia del niño, sus fortalezas y expectativas.' : 'Family interview to understand the child\'s history, strengths, and expectations.' },
    { n: '2', icon: '🔬', title: es ? 'Evaluar' : 'Evaluate', desc: es ? 'Evaluación neuropsicológica y psicopedagógica completa para identificar el perfil de aprendizaje.' : 'Complete neuropsychological and psychopedagogical evaluation to identify the learning profile.' },
    { n: '3', icon: '📋', title: es ? 'Diseñar' : 'Design', desc: es ? 'Elaboración del plan de intervención con objetivos claros, medibles y alcanzables.' : 'Development of the intervention plan with clear, measurable, and achievable objectives.' },
    { n: '4', icon: '🧩', title: es ? 'Intervenir' : 'Intervene', desc: es ? 'Sesiones individuales o grupales con estrategias basadas en evidencia.' : 'Individual or group sessions with evidence-based strategies.' },
    { n: '5', icon: '🔄', title: es ? 'Coordinar' : 'Coordinate', desc: es ? 'Comunicación permanente con la escuela y la familia para garantizar coherencia.' : 'Permanent communication with school and family to ensure consistency.' },
    { n: '6', icon: '📈', title: es ? 'Evolucionar' : 'Evolve', desc: es ? 'Reevaluación periódica de avances, ajuste de objetivos y celebración de logros.' : 'Periodic reevaluation of progress, objective adjustment, and celebration of achievements.' },
  ]

  const activeMod = modalities[activeModality]

  return (
    <div className="bg-white">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-accent overflow-hidden">
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
            <span className="font-semibold text-white">Pasos Firmes</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              {es ? 'Apoyo psicopedagógico' : 'Psychopedagogical support'}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Pasos Firmes
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-2xl">
              {es
                ? 'Intervención psicopedagógica especializada para niños y adolescentes con dificultades de aprendizaje: dislexia, disgrafía, discalculia, TDAH y bajo rendimiento escolar.'
                : 'Specialized psychopedagogical intervention for children and adolescents with learning difficulties: dyslexia, dysgraphia, dyscalculia, ADHD, and low school performance.'}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#dificultades"
                className="inline-flex items-center gap-2 bg-white text-accent font-bold px-6 py-3 rounded-full hover:bg-gray-100 transition-colors min-h-[44px]"
              >
                {es ? 'Ver dificultades atendidas' : 'See addressed difficulties'}
              </a>
              <a
                href="https://wa.me/59170106276"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent-700 text-white font-bold px-6 py-3 rounded-full hover:bg-accent-700/90 transition-colors min-h-[44px]"
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
              { icon: '📖', val: '6', label: es ? 'dificultades atendidas' : 'difficulties addressed' },
              { icon: '🎯', val: '4', label: es ? 'modalidades de atención' : 'service modalities' },
              { icon: '🔬', val: '6', label: es ? 'pasos de intervención' : 'intervention steps' },
              { icon: '🏫', val: '✓', label: es ? 'Coord. con escuelas' : 'School coordination' },
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

      {/* ── Dificultades atendidas ────────────────────────────────────────── */}
      <section id="dificultades" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-4 py-1.5 rounded-full">
              {es ? 'Áreas de especialidad' : 'Areas of expertise'}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4 mb-4">
              {es ? 'Dificultades que Atendemos' : 'Difficulties We Address'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {es
                ? 'Cada dificultad de aprendizaje tiene características únicas. Evaluamos a cada niño de forma individual para diseñar la intervención más adecuada.'
                : 'Each learning difficulty has unique characteristics. We evaluate each child individually to design the most appropriate intervention.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {difficulties.map((d, i) => (
              <button
                key={d.name}
                onClick={() => setOpenDiff(openDiff === i ? null : i)}
                className={`text-left bg-white rounded-2xl border-l-4 ${d.border} shadow-sm hover:shadow-md transition-all p-5`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 ${d.bg} rounded-xl flex items-center justify-center text-xl flex-shrink-0`}>
                    {d.icon}
                  </div>
                  <div>
                    <h3 className={`font-bold ${d.text}`}>{d.name}</h3>
                    <span className="text-xs text-gray-400 uppercase tracking-wide">{d.tag}</span>
                  </div>
                  <span className="ml-auto text-gray-400">{openDiff === i ? '▲' : '▼'}</span>
                </div>
                {openDiff === i && (
                  <p className="text-gray-600 text-sm leading-relaxed">{d.desc}</p>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Modalidades de atención ───────────────────────────────────────── */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary bg-secondary/10 px-4 py-1.5 rounded-full">
              {es ? 'Cómo trabajamos' : 'How we work'}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4 mb-4">
              {es ? 'Modalidades de Atención' : 'Service Modalities'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {es
                ? 'Ofrecemos cuatro modalidades de intervención que se complementan para dar una respuesta integral a cada familia.'
                : 'We offer four intervention modalities that complement each other to provide a comprehensive response to each family.'}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-2 mb-8 flex-wrap">
            {modalities.map((m, i) => (
              <button
                key={m.label}
                onClick={() => setActiveModality(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all min-h-[44px] ${
                  activeModality === i
                    ? `${m.activeBg} ${m.activeBg === 'bg-primary' ? 'text-gray-900' : 'text-white'} shadow-md`
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span>{m.icon}</span>
                <span>{m.label}</span>
              </button>
            ))}
          </div>

          {/* Panel activo */}
          <div className={`max-w-4xl mx-auto bg-white rounded-2xl border ${activeMod.border} shadow-sm overflow-hidden`}>
            <div className={`${activeMod.bg} p-6 flex items-center gap-4`}>
              <span className="text-4xl">{activeMod.icon}</span>
              <h3 className={`text-xl font-extrabold ${activeMod.text}`}>{activeMod.label}</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700 leading-relaxed mb-6">{activeMod.desc}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeMod.highlights.map((h) => (
                  <div key={h} className={`flex items-center gap-3 p-3 rounded-xl ${activeMod.bg}`}>
                    <span className={`w-2 h-2 rounded-full ${activeMod.activeBg} flex-shrink-0`} />
                    <span className="text-sm font-medium text-gray-700">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Proceso de intervención ───────────────────────────────────────── */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/15 px-4 py-1.5 rounded-full">
              {es ? 'Nuestro proceso' : 'Our process'}
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-4 mb-4">
              {es ? '6 Pasos de Intervención' : '6 Intervention Steps'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {es
                ? 'Desde el primer contacto hasta la evolución continua, acompañamos a cada familia en todo el proceso.'
                : 'From first contact to ongoing evolution, we accompany each family through the entire process.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {steps.map((step, i) => (
              <div
                key={step.n}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex gap-4"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-sm flex-shrink-0 text-white"
                  style={{
                    backgroundColor: i % 3 === 0 ? '#229cc2' : i % 3 === 1 ? '#8c3cbd' : '#ffc500',
                    color: i % 3 === 2 ? '#1a1a1a' : 'white',
                  }}
                >
                  {step.n}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{step.icon}</span>
                    <h3 className="font-bold text-gray-900">{step.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Final ─────────────────────────────────────────────────────── */}
      <section className="py-16 bg-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            {es ? '¿Tu hijo tiene dificultades en la escuela?' : 'Is your child struggling at school?'}
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
            {es
              ? 'No esperes más. La intervención temprana marca la diferencia. Contáctanos y evaluamos a tu hijo gratuitamente.'
              : 'Don\'t wait any longer. Early intervention makes the difference. Contact us and we\'ll evaluate your child free of charge.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/59170106276"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-accent font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors min-h-[52px]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp: 70106276
            </a>
            <Link
              href={`/${lang}/contacto`}
              className="inline-flex items-center gap-2 bg-accent-700 text-white font-bold px-8 py-4 rounded-full hover:bg-accent-700/90 transition-colors min-h-[52px]"
            >
              {es ? 'Formulario de contacto' : 'Contact form'}
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
