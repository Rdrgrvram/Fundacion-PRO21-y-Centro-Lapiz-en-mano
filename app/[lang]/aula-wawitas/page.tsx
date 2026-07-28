'use client'
import { useState } from 'react'
import Link from 'next/link'
import type { Locale } from '@/lib/i18n'

interface PageProps {
  params: {
    lang: Locale
  }
}

export default function Page({ params: { lang } }: PageProps) {
  const es = lang === 'es'
  const [activeAge, setActiveAge] = useState(0)
  const [openService, setOpenService] = useState<number | null>(null)

  const signs = [
    {
      age: es ? '6 – 12 meses' : '6 – 12 months',
      list: es 
        ? ['No responde a su nombre', 'Poco contacto visual', 'No señala ni hace gestos', 'No balbucea']
        : ['Does not respond to name', 'Poor eye contact', 'Does not point or gesture', 'Does not babble']
    },
    {
      age: es ? '12 – 24 meses' : '12 – 24 months',
      list: es 
        ? ['No dice palabras sueltas', 'No imita acciones', 'Pérdida de habilidades adquiridas', 'Juego repetitivo o inusual']
        : ['Does not say single words', 'Does not imitate actions', 'Loss of acquired skills', 'Repetitive or unusual play']
    },
    {
      age: es ? '2 – 4 años' : '2 – 4 years',
      list: es 
        ? ['No arma frases de dos palabras', 'Dificultad para jugar con otros', 'Movimientos repetitivos', 'Reacciones inusuales a sonidos o texturas']
        : ['Does not make two-word phrases', 'Difficulty playing with others', 'Repetitive movements', 'Unusual reactions to sounds/textures']
    },
  ]

  const pillars = [
    { icon: '⏰', title: es ? 'Intervención temprana' : 'Early intervention', desc: es ? 'Cuanto antes se identifique y se intervenga, mayor será el impacto en el desarrollo del niño. Cada día cuenta.' : 'The earlier it is identified and intervened, the greater the impact on child development. Every day counts.', color: 'border-[#d94f2b] text-[#d94f2b]' },
    { icon: '🧩', title: es ? 'Individualización' : 'Individualization', desc: es ? 'No hay dos niños iguales. Cada plan de intervención se diseña a medida, respetando el ritmo y las fortalezas de cada uno.' : 'No two children are alike. Each intervention plan is custom designed, respecting the pace and strengths of each.', color: 'border-[#6c5ce7] text-[#6c5ce7]' },
    { icon: '🔄', title: es ? 'Enfoque integral' : 'Integral approach', desc: es ? 'Abordamos todas las áreas del desarrollo de forma simultánea y coordinada: comunicación, conducta, motricidad y sensorialidad.' : 'We address all areas of development simultaneously and in a coordinated way: communication, behavior, motor skills, and sensory.', color: 'border-[#1a8a7d] text-[#1a8a7d]' },
    { icon: '👨‍👩‍👧', title: es ? 'Familia como aliada' : 'Family as ally', desc: es ? 'Los padres son los principales agentes del cambio. Los formamos, acompañamos y empoderamos para que sean co-terapeutas.' : 'Parents are the main agents of change. We train, accompany, and empower them to be co-therapists.', color: 'border-[#e84393] text-[#e84393]' },
  ]

  const services = [
    {
      name: es ? 'Detección temprana' : 'Early detection',
      icon: '🔍',
      color: '#d94f2b',
      bg: 'bg-[#fef0e8]',
      desc: es 
        ? 'Evaluación integral para identificar señales de alerta lo antes posible e iniciar intervención oportuna. Cuanto antes se identifique, mayor es el impacto de la intervención.'
        : 'Comprehensive evaluation to identify warnings as early as possible and initiate timely intervention. The earlier it is identified, the greater the impact.',
      details: es 
        ? ['Screening de desarrollo', 'Señales de alerta TEA', 'Evaluación multisensorial', 'Derivación oportuna']
        : ['Development screening', 'Autism warning signs', 'Multisensory evaluation', 'Timely referral'],
      highlight: true
    },
    {
      name: es ? 'Integración sensorial' : 'Sensory integration',
      icon: '🎯',
      color: '#d94f2b',
      bg: 'bg-[#fef0e8]',
      desc: es 
        ? 'Regulación de la respuesta a estímulos táctiles, vestibulares, propioceptivos, auditivos y visuales para mejorar la participación en actividades cotidianas.'
        : 'Regulation of the response to tactile, vestibular, proprioceptive, auditory, and visual stimuli to improve participation in daily activities.',
      details: es 
        ? ['Procesamiento táctil', 'Sistema vestibular', 'Propiocepción', 'Dieta sensorial personalizada']
        : ['Tactile processing', 'Vestibular system', 'Proprioception', 'Personalized sensory diet'],
      highlight: true
    },
    {
      name: es ? 'Evaluación multidisciplinaria' : 'Multidisciplinary evaluation',
      icon: '📋',
      color: '#2466a8',
      bg: 'bg-[#e8f1fa]',
      desc: es 
        ? 'Diagnóstico completo realizado por un equipo de profesionales de distintas áreas para diseñar un plan de intervención verdaderamente personalizado.'
        : 'Complete diagnosis performed by a team of professionals from different areas to design a truly personalized intervention plan.',
      details: es 
        ? ['Perfil sensorial', 'Perfil comunicativo', 'Perfil conductual', 'Plan individual de intervención']
        : ['Sensory profile', 'Communicative profile', 'Behavioral profile', 'Individual intervention plan']
    },
    {
      name: es ? 'Terapia conductual' : 'Behavioral therapy',
      icon: '🧠',
      color: '#6c5ce7',
      bg: 'bg-[#f0edff]',
      desc: es 
        ? 'Estrategias basadas en evidencia para desarrollar conductas adaptativas, fortalecer habilidades funcionales y reducir comportamientos desafiantes.'
        : 'Evidence-based strategies to develop adaptive behaviors, strengthen functional skills, and reduce challenging behaviors.',
      details: es 
        ? ['Análisis funcional', 'Refuerzo positivo', 'Habilidades adaptativas', 'Generalización de conductas']
        : ['Functional analysis', 'Positive reinforcement', 'Adaptive skills', 'Generalization of behaviors']
    },
    {
      name: es ? 'Terapia de lenguaje' : 'Speech therapy',
      icon: '🗣️',
      color: '#1a8a7d',
      bg: 'bg-[#e0f5f0]',
      desc: es 
        ? 'Desarrollo de habilidades comunicativas verbales y no verbales. Implementamos sistemas aumentativos y alternativos de comunicación cuando es necesario.'
        : 'Development of verbal and non-verbal communication skills. We implement augmentative and alternative communication systems when necessary.',
      details: es 
        ? ['Comunicación funcional', 'Sistemas aumentativos (SAAC)', 'Pragmática del lenguaje', 'Intención comunicativa']
        : ['Functional communication', 'Augmentative systems (AAC)', 'Language pragmatics', 'Communicative intent']
    },
    {
      name: es ? 'Psicomotricidad' : 'Psychomotor therapy',
      icon: '🤸',
      color: '#e8a838',
      bg: 'bg-[#fdf6e3]',
      desc: es 
        ? 'Trabajo corporal integral para mejorar la coordinación, el equilibrio, la percepción espacial y la relación del niño con su propio cuerpo.'
        : 'Comprehensive bodywork to improve coordination, balance, spatial perception, and the relation of the child with their body.',
      details: es 
        ? ['Coordinación global', 'Esquema corporal', 'Planificación motora', 'Percepción espacial']
        : ['Global coordination', 'Body schema', 'Motor planning', 'Spatial perception']
    },
    {
      name: es ? 'Fisioterapia' : 'Physiotherapy',
      icon: '💪',
      color: '#2466a8',
      bg: 'bg-[#e8f1fa]',
      desc: es 
        ? 'Intervención motora adaptada a las necesidades sensoriales y motrices de cada niño, mejorando tono muscular, postura y capacidad funcional.'
        : 'Motor intervention adapted to the sensory and motor needs of each child, improving muscle tone, posture, and functional capacity.',
      details: es 
        ? ['Tono muscular', 'Control postural', 'Movilidad funcional', 'Ejercicio terapéutico']
        : ['Muscle tone', 'Postural control', 'Functional mobility', 'Therapeutic exercise']
    },
    {
      name: es ? 'Orientación nutricional' : 'Nutritional guidance',
      icon: '🥗',
      color: '#2d8a4e',
      bg: 'bg-[#e5f5eb]',
      desc: es 
        ? 'Asesoramiento alimentario especializado considerando la selectividad alimentaria frecuente en niños con TEA, y sus necesidades nutricionales específicas.'
        : 'Specialized dietary guidance considering food selectivity frequent in children with ASD, and their specific nutritional needs.',
      details: es 
        ? ['Selectividad alimentaria', 'Nutrición pediátrica', 'Planes adaptados', 'Suplementación guiada']
        : ['Food selectivity', 'Pediatric nutrition', 'Adapted plans', 'Guided supplementation']
    },
    {
      name: es ? 'Acompañamiento familiar' : 'Family support',
      icon: '👨‍👩‍👧',
      color: '#e84393',
      bg: 'bg-[#fdf2f8]',
      desc: es 
        ? 'Formación y contención emocional para las familias. Brindamos estrategias prácticas para el hogar y la escuela, y un espacio seguro para compartir y crecer.'
        : 'Training and emotional containment for families. We provide practical strategies for home and school, and a safe space to share and grow.',
      details: es 
        ? ['Psicoeducación familiar', 'Estrategias para el hogar', 'Contención emocional', 'Red de apoyo entre familias']
        : ['Family psychoeducation', 'Home strategies', 'Emotional containment', 'Parent support network']
    },
  ]

  const steps = [
    { n: '1', title: es ? 'Detección' : 'Detection', desc: es ? 'Identificamos señales de alerta mediante screening y observación clínica estructurada.' : 'We identify warning signs through screening and structured clinical observation.', icon: '🔍', color: 'border-[#d94f2b] text-[#d94f2b]', bulletColor: 'bg-[#d94f2b]', bg: 'bg-[#fef0e8]' },
    { n: '2', title: es ? 'Evaluación' : 'Evaluation', desc: es ? 'El equipo multidisciplinario realiza un diagnóstico integral y diseña el plan de intervención.' : 'The multidisciplinary team performs a comprehensive diagnosis and designs the intervention plan.', icon: '📋', color: 'border-[#2466a8] text-[#2466a8]', bulletColor: 'bg-[#2466a8]', bg: 'bg-[#e8f1fa]' },
    { n: '3', title: es ? 'Intervención' : 'Intervention', desc: es ? 'Se ejecutan las terapias individuales y grupales según el plan personalizado.' : 'Individual and group therapies are executed according to the personalized plan.', icon: '🧩', color: 'border-[#1a8a7d] text-[#1a8a7d]', bulletColor: 'bg-[#1a8a7d]', bg: 'bg-[#e0f5f0]' },
    { n: '4', title: es ? 'Seguimiento' : 'Follow-up', desc: es ? 'Evaluamos avances, ajustamos el plan y acompañamos a la familia en cada etapa.' : 'We evaluate progress, adjust the plan, and accompany the family in every stage.', icon: '📊', color: 'border-[#6c5ce7] text-[#6c5ce7]', bulletColor: 'bg-[#6c5ce7]', bg: 'bg-[#f0edff]' },
  ]

  const activeSigns = signs[activeAge]

  return (
    <div className="overflow-x-hidden w-full bg-[#fafbfd]">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[480px] flex items-center bg-gradient-to-br from-[#2a0e04] via-[#7a2e14] to-[#e86840] py-16 px-4 overflow-hidden">
        {/* Decoraciones */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          <div className="absolute -top-[15%] -right-[8%] w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full border border-white/5 opacity-30" />
          <div className="absolute -bottom-[20%] -left-[6%] w-[250px] h-[250px] md:w-[400px] md:h-[400px] rounded-full bg-radial-gradient(circle, rgba(255,200,100,0.06), transparent 70%)" />
          <div className="absolute top-[20%] left-[8%] text-white/5 text-4xl animate-bounce">🧩</div>
          <div className="absolute bottom-[30%] right-[10%] text-white/5 text-5xl animate-bounce delay-300">🧩</div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 90" fill="none" className="block w-full h-8 md:h-16 lg:h-20 text-[#fafbfd] fill-current">
            <path d="M0 50C240 20 480 70 720 40C960 10 1200 60 1440 35V90H0Z" />
          </svg>
        </div>

        <div className="container mx-auto max-w-6xl relative z-20 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
            <div>
              <div className="inline-flex items-center gap-2.5 bg-white/8 backdrop-blur-md border border-white/10 rounded-full py-1.5 pl-2.5 pr-4 mb-6 shadow-md">
                <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs text-black font-extrabold shadow-sm select-none">🧩</span>
                <span className="text-white/90 text-xs font-semibold select-none">{es ? 'Programa especializado — Autismo y neurodesarrollo' : 'Specialized Program — Autism & Neurodevelopment'}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-normal leading-[1.1] mb-3 tracking-tight">
                Aula <span className="font-bold italic text-primary">Wawitas</span>
              </h1>
              <p className="text-lg md:text-xl font-medium text-white/55 italic mb-6">
                &ldquo;{es ? 'Comprender, acompañar y potenciar' : 'Understand, support and empower'}&rdquo;
              </p>

              <p className="text-sm md:text-base text-white/70 leading-relaxed mb-8 max-w-lg">
                {es 
                  ? 'Programa especializado para niños y niñas con Trastorno del Espectro Autista (TEA) y otras condiciones del neurodesarrollo. Brindamos atención temprana e integral, respetando la singularidad y el ritmo de cada niño.'
                  : 'Specialized program for children with Autism Spectrum Disorder (ASD) and other neurodevelopmental conditions. We provide early, comprehensive care while respecting the pacing and uniqueness of each child.'}
              </p>

              <div className="flex flex-wrap gap-4 items-center">
                <a
                  href="#servicios"
                  className="bg-primary hover:bg-primary/95 text-black font-extrabold text-sm px-8 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-primary/10 min-h-[44px] flex items-center justify-center"
                >
                  {es ? 'Ver servicios' : 'View services'}
                </a>
                <a
                  href="#senales"
                  className="border-2 border-white/20 hover:border-white/50 bg-transparent hover:bg-white/5 text-white font-bold text-sm px-8 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[44px] flex items-center justify-center"
                >
                  {es ? 'Señales de alerta' : 'Warning signs'}
                </a>
              </div>
            </div>

            {/* Imagen ilustrativa en Desktop */}
            <div className="relative hidden lg:block">
              <div className="aspect-[4/4.2] rounded-3xl bg-gradient-to-br from-[#fef0e8] to-[#fdf6e3] overflow-hidden border-[4.5px] border-white/10 shadow-2xl relative flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="text-6xl mb-4 animate-[float_4s_ease-in-out_infinite]">🧩</div>
                  <h3 className="font-serif text-lg text-[#0c2340] font-bold max-w-[200px] leading-snug mx-auto">
                    {es ? 'Sesiones terapéuticas y lúdicas' : 'Therapeutic and play sessions'}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2 font-medium">{es ? 'Espacios adaptados sensorialmente' : 'Sensory adapted spaces'}</p>
                </div>
              </div>

              {/* Floating Badge 1 */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 flex items-center gap-3.5 animate-[float_4s_ease-in-out_infinite]">
                <div className="w-11 h-11 rounded-xl bg-[#fef0e8] flex items-center justify-center text-xl">🔍</div>
                <div className="text-left">
                  <div className="text-xs font-bold text-[#0c2340] leading-tight">{es ? 'Detección' : 'Detection'}</div>
                  <div className="text-[10px] text-gray-400 font-semibold mt-0.5">{es ? 'temprana y oportuna' : 'early and timely'}</div>
                </div>
              </div>

              {/* Floating Badge 2 */}
              <div className="absolute -top-4 -right-4 bg-coral rounded-xl py-2 px-4 shadow-lg shadow-coral/20 flex flex-col items-center justify-center animate-[float_5s_ease-in-out_infinite_1.5s]">
                <span className="font-serif text-xl font-bold text-white leading-none">9</span>
                <span className="text-[9px] text-white/95 font-extrabold uppercase tracking-wider mt-0.5">{es ? 'Servicios' : 'Services'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Pillars Section */}
      <section className="py-16 px-4 bg-[#fafbfd] border-b border-gray-200/50">
        <div className="container mx-auto max-w-6xl">
          
          <div className="text-center mb-12 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#fef0e8] border border-[#e86840]/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">🧭</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#e86840]">
                {es ? 'Nuestro enfoque' : 'Our approach'}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0c2340] font-normal tracking-tight mb-4">
              {es ? 'Cuatro pilares de intervención' : 'Four pillars of intervention'}
            </h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
              {es 
                ? 'Cada intervención en Aula Wawitas se fundamenta en estos principios prácticos.' 
                : 'Every intervention in Aula Wawitas is based on these practical principles.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-gray-300 transition-all duration-300 h-full"
              >
                <div>
                  <div className="text-4xl mb-4 select-none">{p.icon}</div>
                  <h4 className="font-serif text-lg text-[#0c2340] font-bold mb-2">{p.title}</h4>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{p.desc}</p>
                </div>
                <div className="w-8 h-1 bg-gray-200 rounded-full mt-6 group-hover:bg-[#e86840] transition-colors" />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. Early Warning Signs (Detección temprana tabs) */}
      <section id="senales" className="py-16 md:py-24 px-4 bg-[#f7f5f0] border-b border-gray-200/50">
        <div className="container mx-auto max-w-5xl">
          
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#fef0e8] border border-[#d94f2b]/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">⚠️</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#d94f2b]">
                {es ? 'Detección temprana' : 'Early detection'}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0c2340] font-normal tracking-tight mb-4">
              {es ? '¿Cuándo consultar?' : 'When to consult?'}
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              {es 
                ? 'Identificar las señales a tiempo es clave. Si observas alguna de estas conductas, no esperes — una evaluación puede hacer la diferencia.'
                : 'Identifying warning signs early is key. If you observe any of these behaviors, do not wait — an evaluation can make a difference.'}
            </p>
          </div>

          {/* Selector de edad (flex-wrap en móviles) */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {signs.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveAge(i)}
                className={`px-6 py-2.5 rounded-full border-2 font-bold text-xs sm:text-sm transition-all focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center ${
                  activeAge === i 
                    ? 'border-[#d94f2b] bg-[#fef0e8] text-[#d94f2b] shadow-sm' 
                    : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {s.age}
              </button>
            ))}
          </div>

          {/* Grid de señales */}
          {activeSigns && (
            <div key={activeAge} className="animate-[fadeSlideUp_0.4s_cubic-bezier(0.16,1,0.3,1)] max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                {activeSigns.list.map((sign, i) => (
                  <div
                    key={sign}
                    className="bg-white rounded-2xl p-5 border border-gray-200 flex items-center gap-4 transition-all hover:border-[#d94f2b]/20 hover:translate-x-1"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#fef0e8] text-[#d94f2b] font-serif text-base font-bold flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </div>
                    <span className="text-xs sm:text-sm text-gray-700 font-semibold">{sign}</span>
                  </div>
                ))}
              </div>

              {/* Nota Informativa */}
              <div className="mt-8 bg-[#fef0e8] border border-[#d94f2b]/10 rounded-2xl p-5 text-left flex items-start gap-4 max-w-2xl mx-auto">
                <span className="text-2xl select-none">💡</span>
                <div>
                  <h5 className="text-xs sm:text-sm font-bold text-[#d94f2b] mb-1">
                    {es ? 'Nota Importante' : 'Important Note'}
                  </h5>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {es 
                      ? 'Presentar una o más de estas señales no constituye un diagnóstico definitivo. Es una indicación para realizar una consulta y evaluación profesional.'
                      : 'Presenting one or more of these signs does not constitute a definitive diagnosis. It is an indication for a professional evaluation.'}
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 4. Services Section (Highlighted Grid + Accordion List) */}
      <section id="servicios" className="py-16 md:py-24 px-4 bg-[#fafbfd]">
        <div className="container mx-auto max-w-6xl">
          
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#fef0e8] border border-[#e86840]/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">🩺</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#e86840]">
                {es ? 'Servicios especializados' : 'Specialized Services'}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0c2340] font-normal tracking-tight mb-4">
              {es ? '9 áreas de intervención' : '9 areas of intervention'}
            </h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
              {es 
                ? 'Cada terapia se adapta a las características sensoriales, conductuales y comunicativas individuales de cada niño.'
                : 'Each therapy is adapted to the individual sensory, behavioral, and communication characteristics of each child.'}
            </p>
          </div>

          {/* Servicios Destacados (Detección + Integración Sensorial) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto mb-6 text-left">
            {services.filter((s) => s.highlight).map((s) => (
              <div
                key={s.name}
                className="bg-gradient-to-br from-[#fef0e8] to-white rounded-3xl p-6 md:p-8 border-2 border-[#d94f2b]/15 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex flex-col sm:flex-row items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#d94f2b] to-[#e86840] text-white flex items-center justify-center text-3xl shadow-lg shadow-[#d94f2b]/25 flex-shrink-0 select-none">
                    {s.icon}
                  </div>
                  <div>
                    <span className="inline-block text-[9px] font-bold px-2 py-0.5 bg-[#d94f2b]/10 text-[#d94f2b] rounded-full uppercase tracking-wider mb-2">
                      {es ? 'Servicio Clave' : 'Key Service'}
                    </span>
                    <h4 className="font-serif text-lg md:text-xl text-[#0c2340] font-bold mb-3">{s.name}</h4>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-5">{s.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {s.details.map((d) => (
                        <span key={d} className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#d94f2b]/10 bg-white text-xs font-semibold text-gray-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#d94f2b] flex-shrink-0" />
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Acordeón para los otros servicios */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-5xl mx-auto text-left">
            {services.filter((s) => !s.highlight).map((s) => {
              const fullIdx = services.findIndex((x) => x.name === s.name)
              const isOpen = openService === fullIdx
              return (
                <div
                  key={s.name}
                  onClick={() => setOpenService(isOpen ? null : fullIdx)}
                  className={`bg-white rounded-2xl border overflow-hidden shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 ${
                    isOpen ? 'border-[#e86840]' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between p-5 select-none">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-300 ${isOpen ? s.bg : 'bg-gray-100'}`}>
                        {s.icon}
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-[#0c2340] leading-snug">
                          {s.name}
                        </h4>
                        {!isOpen && (
                          <p className="text-xs text-gray-400 mt-1 leading-snug line-clamp-1 max-w-[240px] sm:max-w-xs">
                            {s.desc}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                      isOpen ? 'bg-[#e86840]/10 text-[#e86840] rotate-180' : 'bg-gray-50 text-gray-400'
                    }`}>
                      ▾
                    </div>
                  </div>

                  {/* Contenido expandible */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      isOpen ? 'max-h-[350px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-5 pb-5 pl-5 sm:pl-21">
                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-4">
                        {s.desc}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {s.details.map((d) => (
                          <div
                            key={d}
                            className={`flex items-center gap-2 p-1.5 rounded-lg text-xs font-semibold text-gray-700 ${s.bg}`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                            <span>{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* 5. Approach Visual (Attention flow) - Mobile stacks vertically */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-[#f7f5f0] to-white border-t border-b border-gray-200/50">
        <div className="container mx-auto max-w-5xl">
          
          <div className="text-center mb-16 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#f0edff] border border-[#6c5ce7]/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">🔄</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#6c5ce7]">
                {es ? 'Proceso de atención' : 'Care Process'}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0c2340] font-normal tracking-tight mb-4">
              {es ? 'Del primer contacto al seguimiento' : 'From first contact to follow-up'}
            </h2>
          </div>

          <div className="relative">
            {/* Línea horizontal en desktop */}
            <div className="hidden lg:block absolute top-[36px] left-[12%] right-[12%] h-[3px] bg-gradient-to-r from-[#d94f2b] via-[#2466a8] to-[#6c5ce7] rounded-full z-0" />
            
            {/* Pasos en grid (columna en móvil, fila en desktop) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {steps.map((s) => (
                <div key={s.n} className="flex flex-col items-center text-center group">
                  <div className={`w-18 h-18 rounded-full border-4 border-white ${s.bulletColor} text-white flex items-center justify-center text-3xl shadow-md transition-transform duration-300 group-hover:scale-105 mb-4`}>
                    {s.icon}
                  </div>
                  <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm w-full">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${s.color.split(' ')[1]}`}>
                      {es ? `Paso ${s.n}` : `Step ${s.n}`}
                    </span>
                    <h4 className="font-serif text-base text-[#0c2340] font-bold mt-1.5 mb-2">
                      {s.title}
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 6. Families Section (Bilingual, responsive grid 1-2 columns) */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-gradient-to-br from-[#fdf2f8] to-[#fdf6e3] rounded-3xl p-8 md:p-12 border border-[#e84393]/10 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
              
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 bg-[#fdf2f8] border border-[#e84393]/15 rounded-full px-4 py-1.5 mb-4 select-none">
                  <span className="text-sm">👨‍👩‍👧</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#e84393]">
                    {es ? 'Para las familias' : 'For families'}
                  </span>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-[#0c2340] font-bold mb-4">
                  {es ? 'No caminan solos' : 'You do not walk alone'}
                </h3>
                <p className="text-sm md:text-base text-gray-500 leading-relaxed mb-6">
                  {es 
                    ? 'Recibir un diagnóstico de autismo transforma la vida de toda la familia. Por eso, nuestro acompañamiento no termina en la terapia del niño — se extiende a cada miembro de la familia con formación, contención y comunidad.'
                    : 'Receiving an autism diagnosis transforms the family life. That is why our support does not end with the child\'s therapy — it extends to every family member with training, emotional containment, and community.'}
                </p>
                <div className="flex flex-col gap-2">
                  {[
                    es ? 'Psicoeducación sobre TEA y neurodesarrollo' : 'Psychoeducation on ASD & neurodevelopment',
                    es ? 'Estrategias prácticas para el hogar' : 'Practical home strategies',
                    es ? 'Contención emocional individual y grupal' : 'Individual and group emotional support',
                    es ? 'Red de familias que comparten el camino' : 'Network of families sharing the path'
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e84393] flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-4">
                {[
                  { icon: '🎥', title: es ? 'Sesiones virtuales' : 'Virtual sessions', desc: es ? 'Orientación profesional de Trabajo Social y Psicología.' : 'Professional support from Social Work and Psychology.', bg: 'bg-white' },
                  { icon: '🤝', title: es ? 'Grupos de apoyo' : 'Support groups', desc: es ? 'Encuentros para compartir con familias en el mismo camino.' : 'Meetings to share with families on the same path.', bg: 'bg-white' },
                  { icon: '📚', title: es ? 'Material educativo' : 'Educational material', desc: es ? 'Guías prácticas y pictogramas visuales para usar en casa.' : 'Practical guides and visual pictograms for home use.', bg: 'bg-white' },
                ].map((c) => (
                  <div
                    key={c.title}
                    className="bg-white rounded-2xl p-5 border border-gray-200 flex items-start gap-4 transition-all hover:translate-x-1"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#fdf2f8] flex items-center justify-center text-xl flex-shrink-0 shadow-inner">
                      {c.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0c2340] mb-0.5">{c.title}</h4>
                      <p className="text-xs text-gray-400 leading-snug">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 7. Enrollment / Contact CTA */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-[#2a0e04] via-[#7a2e14] to-[#e86840] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          <div className="absolute top-[10%] left-[20%] text-white/5 text-4xl transform rotate-12">🧩</div>
          <div className="absolute bottom-[20%] right-[30%] text-white/5 text-5xl transform -rotate-12">🧩</div>
        </div>

        <div className="container mx-auto max-w-3xl relative z-10 text-center">
          <span className="text-5xl block mb-5 animate-[float_4s_ease-in-out_infinite]">🧩</span>
          <h2 className="font-serif text-3xl md:text-4xl text-white font-normal leading-tight mb-4">
            {es ? '¿Tu hijo necesita una evaluación?' : 'Does your child need an evaluation?'}
          </h2>
          
          <p className="text-sm md:text-base text-white/70 max-w-xl mx-auto leading-relaxed mb-6">
            {es 
              ? 'Si observas señales que te preocupan, no esperes. Una evaluación profesional a tiempo puede marcar una diferencia duradera en el desarrollo de tu hijo.'
              : 'If you observe concerning signs, do not wait. A timely professional evaluation can make a lasting difference in your child\'s development.'}
          </p>

          <p className="text-xs sm:text-sm text-white/55 italic max-w-md mx-auto mb-10">
            {es 
              ? 'La consulta de orientación inicial es 100% gratuita. Nuestro equipo multidisciplinario te guiará sin compromisos.'
              : 'The initial orientation consultation is 100% free. Our multidisciplinary team will guide you with no commitments.'}
          </p>

          <div className="flex justify-center">
            <a
              href="https://wa.me/59170106276"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25d366] hover:bg-[#25d366]/90 text-white font-extrabold text-sm sm:text-base px-8 py-3.5 sm:py-4 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#25d366]/20 min-h-[44px] flex items-center justify-center gap-2"
            >
              <span className="text-xl">💬</span>
              {es ? 'Agendar evaluación gratuita — 70106276' : 'Schedule free evaluation — 70106276'}
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
