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
  const [hoveredDiff, setHoveredDiff] = useState<number | null>(null)
  const [openService, setOpenService] = useState<number | null>(null)

  const difficulties = [
    { name: es ? 'Dislexia' : 'Dyslexia', icon: '📖', short: es ? 'Lectura' : 'Reading', desc: es ? 'Dificultad persistente para leer con fluidez y precisión, que no se explica por la inteligencia ni por falta de oportunidades educativas.' : 'Persistent difficulty reading with fluency and accuracy, not explained by intelligence or lack of educational opportunity.', color: 'border-[#2466a8]', bg: 'bg-[#e8f1fa]' },
    { name: es ? 'Disgrafía' : 'Dysgraphia', icon: '✏️', short: es ? 'Escritura' : 'Writing', desc: es ? 'Dificultad en la expresión escrita: caligrafía irregular, errores ortográficos frecuentes, problemas para organizar ideas en el papel.' : 'Difficulty in written expression: irregular handwriting, frequent spelling errors, problems organizing ideas on paper.', color: 'border-[#e86840]', bg: 'bg-[#fef0e8]' },
    { name: es ? 'Discalculia' : 'Dyscalculia', icon: '🔢', short: es ? 'Matemáticas' : 'Math', desc: es ? 'Dificultad para comprender conceptos numéricos, realizar cálculos y resolver problemas matemáticos acorde a la edad.' : 'Difficulty understanding numerical concepts, performing calculations, and solving mathematical problems appropriate to age.', color: 'border-[#6c5ce7]', bg: 'bg-[#f0edff]' },
    { name: es ? 'TDAH' : 'ADHD', icon: '🎯', short: es ? 'Atención' : 'Attention', desc: es ? 'Dificultades en la atención sostenida, la organización, el control de impulsos y la regulación de la actividad motora.' : 'Difficulties in sustained attention, organization, impulse control, and motor activity regulation.', color: 'border-[#e8a838]', bg: 'bg-[#fdf6e3]' },
    { name: es ? 'Procesamiento lento' : 'Slow Processing', icon: '⏱️', short: es ? 'Velocidad' : 'Speed', desc: es ? 'El niño comprende los contenidos pero necesita significativamente más tiempo para procesar información y completar tareas.' : 'The child understands the content but needs significantly more time to process information and complete tasks.', color: 'border-[#1a8a7d]', bg: 'bg-[#e0f5f0]' },
    { name: es ? 'Dificultad general' : 'General Difficulty', icon: '📚', short: es ? 'Rendimiento' : 'Performance', desc: es ? 'Bajo rendimiento escolar no explicado por una condición específica. Requiere evaluación para identificar las causas y diseñar estrategias.' : 'Low school performance not explained by a specific condition. Requires evaluation to identify causes and design strategies.', color: 'border-[#2d8a4e]', bg: 'bg-[#e5f5eb]' },
  ]

  const processSteps = [
    { n: '1', title: es ? 'Escuchar' : 'Listen', desc: es ? 'Entrevista con la familia para comprender la historia del niño, sus fortalezas, sus dificultades y las expectativas de los padres.' : 'Interview with the family to understand the child\'s history, strengths, difficulties, and parent expectations.', icon: '👂', color: 'border-[#2d8a4e] text-[#2d8a4e]', watermark: 'text-[#2d8a4e]/5' },
    { n: '2', title: es ? 'Evaluar' : 'Evaluate', desc: es ? 'Evaluación neuropsicológica y psicopedagógica completa para identificar el perfil de aprendizaje y las áreas que necesitan apoyo.' : 'Complete neuropsychological and psychopedagogical evaluation to identify learning profiles and areas needing support.', icon: '🔬', color: 'border-[#2466a8] text-[#2466a8]', watermark: 'text-[#2466a8]/5' },
    { n: '3', title: es ? 'Diseñar' : 'Design', desc: es ? 'Elaboración del plan de intervención personalizado con objetivos claros, medibles y alcanzables a corto y mediano plazo.' : 'Development of a personalized intervention plan with clear, measurable, and achievable short and medium-term goals.', icon: '📋', color: 'border-[#6c5ce7] text-[#6c5ce7]', watermark: 'text-[#6c5ce7]/5' },
    { n: '4', title: es ? 'Intervenir' : 'Intervene', desc: es ? 'Sesiones terapéuticas individuales y grupales con estrategias basadas en evidencia, adaptadas al estilo de aprendizaje del niño.' : 'Individual and group therapeutic sessions with evidence-based strategies, adapted to the child\'s learning style.', icon: '🧩', color: 'border-[#e86840] text-[#e86840]', watermark: 'text-[#e86840]/5' },
    { n: '5', title: es ? 'Coordinar' : 'Coordinate', desc: es ? 'Comunicación permanente con la escuela y la familia para garantizar coherencia en todos los entornos del niño.' : 'Permanent communication with school and family to guarantee consistency in all the child\'s environments.', icon: '🔄', color: 'border-[#1a8a7d] text-[#1a8a7d]', watermark: 'text-[#1a8a7d]/5' },
    { n: '6', title: es ? 'Evolucionar' : 'Evolve', desc: es ? 'Reevaluación periódica de avances, ajuste de objetivos y celebración de cada logro alcanzado.' : 'Periodic reevaluation of progress, objective adjustments, and celebration of each achievement.', icon: '📈', color: 'border-[#e8a838] text-[#e8a838]', watermark: 'text-[#e8a838]/5' },
  ]

  const services = [
    {
      name: es ? 'Dificultades de lectura y escritura' : 'Reading and writing difficulties',
      icon: '📖',
      color: '#2466a8',
      bg: 'bg-[#e8f1fa]',
      desc: es 
        ? 'Intervención especializada en dislexia, disgrafía y otros trastornos del lenguaje escrito. Utilizamos metodologías multisensoriales y estructuradas que respetan el ritmo de cada niño.'
        : 'Specialized intervention in dyslexia, dysgraphia, and other written language disorders. We use structured multisensory methodologies that respect each child\'s pace.',
      methods: es 
        ? ['Método Orton-Gillingham adaptado', 'Conciencia fonológica', 'Fluidez lectora', 'Comprensión de textos']
        : ['Adapted Orton-Gillingham method', 'Phonological awareness', 'Reading fluency', 'Text comprehension']
    },
    {
      name: es ? 'Atención y concentración' : 'Attention and concentration',
      icon: '🎯',
      color: '#e8a838',
      bg: 'bg-[#fdf6e3]',
      desc: es 
        ? 'Estrategias para TDAH y dificultades atencionales que mejoran el enfoque, la organización y la autorregulación en el aula y en casa.'
        : 'Strategies for ADHD and attentional difficulties that improve focus, organization, and self-regulation in the classroom and at home.',
      methods: es 
        ? ['Entrenamiento atencional', 'Funciones ejecutivas', 'Técnicas de organización', 'Autorregulación']
        : ['Attentional training', 'Executive functions', 'Organization techniques', 'Self-regulation']
    },
    {
      name: es ? 'Razonamiento cognitivo' : 'Cognitive reasoning',
      icon: '🧮',
      color: '#6c5ce7',
      bg: 'bg-[#f0edff]',
      desc: es 
        ? 'Desarrollo del pensamiento lógico-matemático, resolución de problemas y razonamiento abstracto. Abordaje especializado de discalculia.'
        : 'Development of logical-mathematical thinking, problem solving, and abstract reasoning. Specialized dyscalculia approach.',
      methods: es 
        ? ['Pensamiento lógico', 'Resolución de problemas', 'Cálculo funcional', 'Razonamiento abstracto']
        : ['Logical thinking', 'Problem solving', 'Functional calculation', 'Abstract reasoning']
    },
    {
      name: es ? 'Maduración neuropsicológica' : 'Neuropsychological maturation',
      icon: '🧠',
      color: '#e86840',
      bg: 'bg-[#fef0e8]',
      desc: es 
        ? 'Evaluación y estimulación de funciones ejecutivas, memoria de trabajo, velocidad de procesamiento y flexibilidad cognitiva.'
        : 'Evaluation and stimulation of executive functions, working memory, processing speed, and cognitive flexibility.',
      methods: es 
        ? ['Funciones ejecutivas', 'Memoria de trabajo', 'Velocidad de procesamiento', 'Flexibilidad cognitiva']
        : ['Executive functions', 'Working memory', 'Processing speed', 'Cognitive flexibility']
    },
    {
      name: es ? 'Apoyo psicopedagógico' : 'Psychopedagogical support',
      icon: '📝',
      color: '#2d8a4e',
      bg: 'bg-[#e5f5eb]',
      desc: es 
        ? 'Adaptaciones metodológicas y estrategias de enseñanza individualizadas según el perfil neuropsicológico de cada estudiante.'
        : 'Methodological adaptations and individualized teaching strategies based on each student\'s neuropsychological profile.',
      methods: es 
        ? ['Adaptaciones curriculares', 'Estrategias metacognitivas', 'Aprendizaje multisensorial', 'Evaluación diferenciada']
        : ['Curricular adaptations', 'Metacognitive strategies', 'Multisensory learning', 'Differentiated evaluation']
    },
    {
      name: es ? 'Técnicas de estudio' : 'Study techniques',
      icon: '📐',
      color: '#1a8a7d',
      bg: 'bg-[#e0f5f0]',
      desc: es 
        ? 'Herramientas prácticas y personalizadas para organizar, comprender y retener información de forma eficiente según el estilo de aprendizaje.'
        : 'Practical, personalized tools to organize, understand, and retain information efficiently according to learning styles.',
      methods: es 
        ? ['Mapas mentales', 'Resumen estructurado', 'Planificación del estudio', 'Técnicas de memoria']
        : ['Mind maps', 'Structured summaries', 'Study planning', 'Memory techniques']
    },
    {
      name: es ? 'Orientación familiar y escolar' : 'Family and school guidance',
      icon: '👨‍👩‍👧',
      color: '#e84393',
      bg: 'bg-[#fdf2f8]',
      desc: es 
        ? 'Coordinación permanente entre familia, escuela y equipo terapéutico. Capacitamos a padres y docentes para un abordaje coherente en todos los entornos.'
        : 'Permanent coordination between family, school, and therapeutic team. We train parents and teachers for a coherent approach in all settings.',
      methods: es 
        ? ['Informes para la escuela', 'Capacitación a docentes', 'Estrategias para el hogar', 'Reuniones tripartitas']
        : ['School reports', 'Teacher training', 'Home strategies', 'Tripartite meetings']
    },
  ]

  const triangle = [
    { icon: '🏠', title: es ? 'Familia' : 'Family', desc: es ? 'Formamos a los padres en estrategias para el hogar: organización del espacio de estudio, rutinas, técnicas de acompañamiento en tareas y gestión emocional.' : 'We train parents in home strategies: study space organization, routines, task accompaniment techniques, and emotional management.', color: 'border-[#e84393]', bg: 'bg-[#fdf2f8]' },
    { icon: '🏫', title: es ? 'Escuela' : 'School', desc: es ? 'Coordinamos con los docentes: elaboramos informes con recomendaciones, proponemos adaptaciones metodológicas y realizamos reuniones de seguimiento.' : 'We coordinate with teachers: write recommendation reports, propose methodological adaptations, and conduct follow-up meetings.', color: 'border-[#2466a8]', bg: 'bg-[#e8f1fa]' },
    { icon: '🩺', title: es ? 'Equipo terapéutico' : 'Therapeutic team', desc: es ? 'Nuestros profesionales diseñan, ejecutan y evalúan el plan de intervención, garantizando coherencia entre todos los entornos del niño.' : 'Our professionals design, execute, and evaluate the intervention plan, ensuring coherence between all the child\'s environments.', color: 'border-[#2d8a4e]', bg: 'bg-[#e5f5eb]' },
  ]

  return (
    <div className="overflow-x-hidden w-full bg-[#fafbfd]">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[480px] flex items-center bg-gradient-to-br from-[#0a2e16] via-[#1e6b38] to-[#2d8a4e] py-16 px-4 overflow-hidden">
        {/* Decoraciones */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          <div className="absolute -top-[15%] -right-[10%] w-[350px] h-[350px] md:w-[550px] md:h-[550px] rounded-full border border-white/5 opacity-30" />
          <div className="absolute -bottom-[22%] -left-[7%] w-[250px] h-[250px] md:w-[420px] md:h-[420px] rounded-full bg-radial-gradient(circle, rgba(245,194,66,0.05), transparent 70%)" />
          {['📖', '✏️', '🔢', '📐'].map((e, i) => (
            <div key={i} className="absolute text-white/5 text-4xl animate-pulse" style={{ left: `${10 + i * 20}%`, top: `${15 + (i % 3) * 20}%` }}>
              {e}
            </div>
          ))}
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 90" fill="none" className="block w-full h-8 md:h-16 lg:h-20 text-[#fafbfd] fill-current">
            <path d="M0 45C280 75 560 20 840 50C1120 75 1320 40 1440 42V90H0Z" />
          </svg>
        </div>

        <div className="container mx-auto max-w-6xl relative z-20 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
            <div>
              <div className="inline-flex items-center gap-2.5 bg-white/8 backdrop-blur-md border border-white/10 rounded-full py-1.5 pl-2.5 pr-4 mb-6 shadow-md">
                <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs text-black font-extrabold shadow-sm select-none">📚</span>
                <span className="text-white/90 text-xs font-semibold select-none">{es ? 'Programa especializado — Dificultades de aprendizaje' : 'Specialized Program — Learning Difficulties'}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-normal leading-[1.1] mb-3 tracking-tight">
                Pasos <span className="font-bold italic text-primary">Firmes</span>
              </h1>
              <p className="text-lg md:text-xl font-medium text-white/55 italic mb-6">
                &ldquo;{es ? 'Aprender también puede ser diferente' : 'Learning can also be different'}&rdquo;
              </p>

              <p className="text-sm md:text-base text-white/70 leading-relaxed mb-8 max-w-lg">
                {es 
                  ? 'No todos los niños aprenden de la misma manera, y eso no es un problema — es una oportunidad. Identificamos las necesidades específicas de cada estudiante y construimos el camino que mejor se adapta a su forma de aprender.'
                  : 'Not all children learn the same way, and that is not a problem — it is an opportunity. We identify each student\'s specific needs and build the path that best adapts to their learning style.'}
              </p>

              <div className="flex flex-wrap gap-4 items-center">
                <a
                  href="#dificultades"
                  className="bg-primary hover:bg-primary/95 text-black font-extrabold text-sm px-8 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-primary/10 min-h-[44px] flex items-center justify-center"
                >
                  {es ? '¿Qué dificultades atendemos?' : 'What do we address?'}
                </a>
                <a
                  href="https://wa.me/59170106276"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-white/20 hover:border-white/50 bg-transparent hover:bg-white/5 text-white font-bold text-sm px-8 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[44px] flex items-center justify-center gap-2"
                >
                  <span className="text-lg">💬</span>
                  {es ? 'Solicitar evaluación' : 'Request evaluation'}
                </a>
              </div>
            </div>

            {/* Imagen ilustrativa en Desktop */}
            <div className="relative hidden lg:block">
              <div className="aspect-[4/4.2] rounded-3xl bg-gradient-to-br from-[#e5f5eb] to-[#fdf6e3] overflow-hidden border-[4.5px] border-white/10 shadow-2xl relative flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="text-6xl mb-4 animate-[float_4s_ease-in-out_infinite]">📚</div>
                  <h3 className="font-serif text-lg text-[#0c2340] font-bold max-w-[200px] leading-snug mx-auto">
                    {es ? 'Sesiones psicopedagógicas individuales' : 'Individual psychopedagogical sessions'}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2 font-medium">{es ? 'Aprendizaje adaptado a cada ritmo' : 'Learning adapted to each pace'}</p>
                </div>
              </div>

              {/* Floating Badge 1 */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 flex items-center gap-3.5 animate-[float_4s_ease-in-out_infinite]">
                <div className="w-11 h-11 rounded-xl bg-[#f0edff] flex items-center justify-center text-xl">🧠</div>
                <div className="text-left">
                  <div className="text-xs font-bold text-[#0c2340] leading-tight">{es ? 'Evaluación' : 'Evaluation'}</div>
                  <div className="text-[10px] text-gray-400 font-semibold mt-0.5">{es ? 'neuropsicológica completa' : 'complete neuropsychological'}</div>
                </div>
              </div>

              {/* Floating Badge 2 */}
              <div className="absolute -top-4 -right-4 bg-green rounded-xl py-2 px-4 shadow-lg shadow-green/20 flex flex-col items-center justify-center animate-[float_5s_ease-in-out_infinite_1.5s]">
                <span className="font-serif text-xl font-bold text-white leading-none">7</span>
                <span className="text-[9px] text-white/95 font-extrabold uppercase tracking-wider mt-0.5">{es ? 'Áreas' : 'Areas'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Difficulties We Address Section */}
      <section id="dificultades" className="py-16 md:py-24 px-4 bg-[#fafbfd]">
        <div className="container mx-auto max-w-6xl">
          
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#e5f5eb] border border-[#2d8a4e]/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">❓</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2d8a4e]">
                {es ? '¿Qué atendemos?' : 'What do we support?'}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0c2340] font-normal tracking-tight mb-4">
              {es ? 'Dificultades que acompañamos' : 'Difficulties we support'}
            </h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
              {es 
                ? 'Cada dificultad tiene un origen y, lo más importante, un camino de intervención adaptativo. El primer paso es identificarla.' 
                : 'Each difficulty has an origin and, most importantly, an adaptive intervention path. The first step is to identify it.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
            {difficulties.map((d, i) => {
              const isHovered = hoveredDiff === i
              return (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredDiff(i)}
                  onMouseLeave={() => setHoveredDiff(null)}
                  className={`bg-white rounded-3xl overflow-hidden border shadow-sm transition-all duration-300 ${
                    isHovered ? `${d.color} shadow-md` : 'border-gray-200'
                  }`}
                >
                  <div className={`h-1.5 w-full bg-gradient-to-r ${d.color.replace('border-', 'from-')} to-white`} />
                  <div className="p-6 md:p-8 flex flex-col justify-between min-h-[160px]">
                    <div className="flex items-center gap-4 mb-4 select-none">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 ${isHovered ? 'bg-[#0c2340] text-white shadow-inner' : d.bg}`}>
                        {d.icon}
                      </div>
                      <div>
                        <h4 className="font-serif text-base md:text-lg text-[#0c2340] font-bold leading-tight">{d.name}</h4>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${d.color.replace('border-', 'text-')}`}>{d.short}</span>
                      </div>
                    </div>
                    
                    <p className={`text-xs sm:text-sm text-gray-500 leading-relaxed transition-all duration-500 overflow-hidden ${
                      isHovered ? 'max-h-[160px] opacity-100' : 'max-h-0 md:max-h-[160px] opacity-0 md:opacity-100'
                    }`}>
                      {d.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Tarjeta de Sugerencia */}
          <div className="mt-12 bg-[#e5f5eb] border border-[#2d8a4e]/10 rounded-3xl p-6 text-left flex items-start gap-4 max-w-2xl mx-auto shadow-sm">
            <span className="text-3xl select-none">💡</span>
            <div>
              <h5 className="text-sm font-bold text-[#2d8a4e] mb-1">
                {es ? '¿No estás seguro del diagnóstico?' : 'Not sure about the diagnosis?'}
              </h5>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {es 
                  ? 'No necesitas un diagnóstico médico previo. Si notas que tu hijo tiene dificultades constantes en su rendimiento escolar, cansancio o rechazo a los estudios, nuestro equipo puede realizar una evaluación psicopedagógica completa.'
                  : 'You do not need a prior medical diagnosis. If you notice that your child has constant difficulties in school performance, fatigue, or refusal to study, our team can perform a complete psychopedagogical evaluation.'}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Process Section */}
      <section className="py-16 md:py-24 px-4 bg-[#f7f5f0] border-t border-b border-gray-200/50">
        <div className="container mx-auto max-w-5xl">
          
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#f0edff] border border-[#6c5ce7]/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">🔄</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#6c5ce7]">
                {es ? 'Nuestro proceso' : 'Our process'}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0c2340] font-normal tracking-tight mb-4">
              {es ? '6 pasos hacia el aprendizaje efectivo' : '6 steps to effective learning'}
            </h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
              {es 
                ? 'Un proceso claro, profesional y centrado en resultados — desde la primera consulta hasta la evolución continua.' 
                : 'A clear, professional, and results-centered process — from the first consultation to continuous evolution.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
            {processSteps.map((s, i) => (
              <div
                key={s.n}
                className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-gray-300 group"
              >
                {/* Watermark */}
                <div className={`absolute top-[-10px] right-2 font-serif text-7xl font-bold opacity-[0.03] md:opacity-[0.06] pointer-events-none select-none ${s.watermark}`}>
                  {s.n}
                </div>

                <div className="flex items-center gap-4 mb-4 relative z-10 select-none">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-md ${s.color}`}>
                    {s.icon}
                  </div>
                  <div>
                    <div className={`text-[10px] font-bold uppercase tracking-wider ${s.color.split(' ')[1]}`}>
                      {es ? `Paso ${s.n}` : `Step ${s.n}`}
                    </div>
                    <h4 className="font-serif text-lg text-[#0c2340] font-bold mt-0.5">{s.title}</h4>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed relative z-10">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Integrated Services Section */}
      <section id="servicios" className="py-16 md:py-24 px-4 bg-[#fafbfd]">
        <div className="container mx-auto max-w-5xl">
          
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#e5f5eb] border border-[#2d8a4e]/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">🩺</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2d8a4e]">
                {es ? 'Áreas de intervención' : 'Areas of Intervention'}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0c2340] font-normal tracking-tight mb-4">
              {es ? '7 especialidades integradas' : '7 integrated specialties'}
            </h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
              {es 
                ? 'Cada área aporta herramientas específicas. Juntas construyen un plan completo para que tu hijo descubra su forma de aprender.' 
                : 'Each area provides specific tools. Together they build a complete plan for your child to discover their way of learning.'}
            </p>
          </div>

          <div className="flex flex-col gap-4 max-w-4xl mx-auto text-left">
            {services.map((s, i) => {
              const isOpen = openService === i
              return (
                <div
                  key={s.name}
                  onClick={() => setOpenService(isOpen ? null : i)}
                  className={`bg-white rounded-2xl border overflow-hidden shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 ${
                    isOpen ? 'border-[#2d8a4e]' : 'border-gray-200'
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
                      isOpen ? 'bg-[#2d8a4e]/10 text-[#2d8a4e] rotate-180' : 'bg-gray-50 text-gray-400'
                    }`}>
                      ▾
                    </div>
                  </div>

                  {/* Detalle expandible */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      isOpen ? 'max-h-[350px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-5 pb-5 pl-5 sm:pl-21">
                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-4">
                        {s.desc}
                      </p>
                      
                      <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-2 select-none">
                        {es ? 'Metodologías y técnicas' : 'Methodologies and techniques'}
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {s.methods.map((m) => (
                          <span
                            key={m}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700 ${s.bg}`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                            {m}
                          </span>
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

      {/* 5. Success Triangle (Familia - Escuela - Terapeuta) */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-[#f7f5f0] to-white border-t border-b border-gray-200/50">
        <div className="container mx-auto max-w-5xl">
          
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#fdf6e3] border border-[#e8a838]/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">🔗</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#e8a838]">
                {es ? 'Trabajo en equipo' : 'Teamwork'}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0c2340] font-normal tracking-tight mb-4">
              {es ? 'El triángulo del éxito' : 'The triangle of success'}
            </h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
              {es 
                ? 'El aprendizaje no ocurre solo en la terapia. Trabajamos en coordinación permanente con los tres entornos del niño.' 
                : 'Learning does not happen only in therapy. We work in permanent coordination with the child\'s three environments.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {triangle.map((t) => (
              <div
                key={t.title}
                className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-gray-300 transition-all duration-300"
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl ${t.bg} flex items-center justify-center text-3xl mb-5 shadow-sm select-none`}>
                    {t.icon}
                  </div>
                  <h4 className="font-serif text-xl text-[#0c2340] font-bold mb-3">{t.title}</h4>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Nota de Coordinación Escolar */}
          <div className="mt-10 bg-[#e5f5eb] border border-[#2d8a4e]/10 rounded-2xl p-5 text-left flex items-start gap-4 max-w-2xl mx-auto shadow-sm">
            <span className="text-2xl select-none">📝</span>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              <strong>{es ? 'Informes escolares:' : 'School reports:'}</strong> {es 
                ? 'Elaboramos documentos técnicos con recomendaciones metodológicas detalladas para que los docentes adapten sus evaluaciones y actividades en aula regular.'
                : 'We prepare technical documents with detailed methodological recommendations so that teachers adapt their evaluations and regular classroom activities.'}
            </p>
          </div>

        </div>
      </section>

      {/* 6. CTA / Enrollment */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-[#0a2e16] via-[#1e6b38] to-[#2d8a4e] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          <div className="absolute top-[15%] left-[15%] text-white/5 text-4xl transform rotate-12">📖</div>
          <div className="absolute bottom-[20%] right-[25%] text-white/5 text-5xl transform -rotate-12">✏️</div>
        </div>

        <div className="container mx-auto max-w-3xl relative z-10 text-center">
          <span className="text-5xl block mb-5 animate-[float_4s_ease-in-out_infinite]">📚</span>
          <h2 className="font-serif text-3xl md:text-4xl text-white font-normal leading-tight mb-4">
            {es ? '¿Tu hijo tiene dificultades en la escuela?' : 'Does your child have school difficulties?'}
          </h2>
          
          <p className="text-sm md:text-base text-white/70 max-w-xl mx-auto leading-relaxed mb-6">
            {es 
              ? 'No dejes que la frustración y el cansancio crezcan. Una evaluación profesional a tiempo puede revelar el camino y estilo de aprendizaje que mejor se adapta a tu hijo.'
              : 'Do not let frustration and fatigue grow. A timely professional evaluation can reveal the path and learning style that best fits your child.'}
          </p>

          <p className="text-xs sm:text-sm text-white/55 italic max-w-md mx-auto mb-10">
            {es 
              ? 'No requieres diagnóstico previo para consultarnos. Evaluamos, identificamos y acompañamos en todo el proceso.'
              : 'You do not need a prior diagnosis to consult us. We evaluate, identify, and accompany in the whole process.'}
          </p>

          <div className="flex justify-center">
            <a
              href="https://wa.me/59170106276"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25d366] hover:bg-[#25d366]/90 text-white font-extrabold text-sm sm:text-base px-8 py-3.5 sm:py-4 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#25d366]/20 min-h-[44px] flex items-center justify-center gap-2"
            >
              <span className="text-xl">💬</span>
              {es ? 'Agendar evaluación psicopedagógica — 70106276' : 'Schedule psychopedagogical evaluation — 70106276'}
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
