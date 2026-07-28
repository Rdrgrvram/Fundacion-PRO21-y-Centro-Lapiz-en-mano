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
  const [activeLevel, setActiveLevel] = useState(0)
  const [openService, setOpenService] = useState<number | null>(null)

  const levels = [
    {
      age: es ? '0 – 2 años' : '0 – 2 years',
      name: es ? 'Manos Chiquitas' : 'Little Hands',
      icon: '🍼',
      color: 'border-[#2466a8] text-[#2466a8]',
      accentColor: '#2466a8',
      bg: 'bg-[#eaf2fb]',
      photo: '👶',
      photoLabel: es ? 'Sesión de estimulación temprana' : 'Early stimulation session',
      desc: es 
        ? 'Intervención desde los primeros meses de vida. Trabajamos con la familia como eje central del desarrollo, potenciando cada logro temprano mediante estimulación multisensorial, vínculo afectivo y acompañamiento profesional permanente.'
        : 'Intervention from the first months of life. We work with the family as the central axis of development, enhancing each early milestone through multisensorial stimulation, affective bonding, and permanent professional support.',
      highlights: es 
        ? ['Estimulación multisensorial', 'Vínculo madre-hijo', 'Desarrollo neuromotor', 'Orientación familiar intensiva']
        : ['Multisensorial stimulation', 'Mother-child bond', 'Neuromotor development', 'Intensive family guidance'],
    },
    {
      age: es ? '3 – 7 años' : '3 – 7 years',
      name: es ? 'Aventuras sin Límites' : 'Limitless Adventures',
      icon: '🎨',
      color: 'border-[#e8a838] text-[#e8a838]',
      accentColor: '#e8a838',
      bg: 'bg-[#fdf6e3]',
      photo: '🧒',
      photoLabel: es ? 'Actividades lúdicas y terapéuticas' : 'Playful and therapeutic activities',
      desc: es 
        ? 'Etapa de máxima exploración y aprendizaje. A través del juego, el arte y actividades lúdicas estructuradas, desarrollamos habilidades sociales, motoras y cognitivas que preparan al niño para la inclusión educativa.'
        : 'Stage of maximum exploration and learning. Through play, art, and structured playful activities, we develop social, motor, and cognitive skills that prepare the child for educational inclusion.',
      highlights: es 
        ? ['Aprendizaje a través del juego', 'Habilidades sociales', 'Pre-lectoescritura', 'Inclusión educativa activa']
        : ['Play-based learning', 'Social skills', 'Pre-literacy skills', 'Active educational inclusion'],
    },
    {
      age: es ? '8 – 14 años' : '8 – 14 years',
      name: es ? 'Oportunidades para Todos' : 'Opportunities for All',
      icon: '📖',
      color: 'border-[#1a8a7d] text-[#1a8a7d]',
      accentColor: '#1a8a7d',
      bg: 'bg-[#e0f5f0]',
      photo: '👦',
      photoLabel: es ? 'Apoyo pedagógico y autonomía' : 'Pedagogical support and autonomy',
      desc: es 
        ? 'Fortalecimiento académico con adaptaciones curriculares, desarrollo de habilidades de autonomía personal y preparación progresiva para la vida independiente. Los estudiantes asisten al centro y a su unidad educativa de origen.'
        : 'Academic strengthening with curricular adaptations, development of personal autonomy skills, and progressive preparation for independent living. Students attend both the center and their regular school.',
      highlights: es 
        ? ['Adaptación curricular', 'Autonomía personal', 'Habilidades para la vida', 'Libreta del sistema regular']
        : ['Curricular adaptation', 'Personal autonomy', 'Life skills', 'Regular system school records'],
    },
    {
      age: es ? '15+ años' : '15+ years',
      name: es ? 'Programa Crecer' : 'Crecer Program',
      icon: '🌱',
      color: 'border-[#2d8a4e] text-[#2d8a4e]',
      accentColor: '#2d8a4e',
      bg: 'bg-[#e5f5eb]',
      photo: '🧑',
      photoLabel: es ? 'Formación pre-laboral' : 'Pre-vocational training',
      desc: es 
        ? 'Formación pre-laboral e inserción en el mundo del trabajo. Desarrollamos competencias para la vida adulta autónoma: habilidades socio-laborales, manejo del dinero, transporte, y relaciones interpersonales en contextos reales.'
        : 'Pre-vocational training and job market integration. We develop skills for autonomous adult life: socio-labor skills, money management, transport, and interpersonal relations in real contexts.',
      highlights: es 
        ? ['Inserción laboral', 'Vida independiente', 'Competencias socio-laborales', 'Inclusión comunitaria']
        : ['Job placement', 'Independent living', 'Socio-labor skills', 'Community inclusion'],
    },
  ]

  const services = [
    {
      name: es ? 'Estimulación temprana' : 'Early stimulation',
      icon: '👶',
      color: '#2466a8',
      bg: 'bg-[#e8f1fa]',
      desc: es 
        ? 'Intervención desde los primeros meses para potenciar el desarrollo neuromotor y sensorial. Cada sesión combina técnicas especializadas con un ambiente cálido y afectivo que fortalece el vínculo familiar.'
        : 'Intervention from the first months to boost neuromotor and sensory development. Each session combines specialized techniques with a warm, caring environment that strengthens the family bond.',
      details: es 
        ? ['Desarrollo neuromotor', 'Estimulación sensorial', 'Masaje infantil terapéutico', 'Guía a padres para estimulación en casa']
        : ['Neuromotor development', 'Sensory stimulation', 'Therapeutic baby massage', 'Parent guide for home stimulation'],
    },
    {
      name: es ? 'Terapia de lenguaje' : 'Speech therapy',
      icon: '🗣️',
      color: '#1a8a7d',
      bg: 'bg-[#e0f5f0]',
      desc: es 
        ? 'Trabajamos la respiración, el control orofacial y la articulación de sonidos para mejorar la comunicación y el habla de forma divertida y funcional. Incluimos sistemas aumentativos cuando es necesario.'
        : 'We work on breathing, orofacial control, and speech sounds articulation to improve communication and speech in a fun, functional way. We include augmentative systems when necessary.',
      details: es 
        ? ['Control orofacial', 'Articulación fonética', 'Lenguaje expresivo y comprensivo', 'Comunicación funcional']
        : ['Orofacial control', 'Phonetic articulation', 'Expressive and receptive language', 'Functional communication'],
    },
    {
      name: es ? 'Psicomotricidad' : 'Psychomotor therapy',
      icon: '🤸',
      color: '#e86840',
      bg: 'bg-[#fef0e8]',
      desc: es 
        ? 'Fortalecemos la coordinación, equilibrio y esquema corporal para favorecer la autonomía, la concentración y la expresión corporal a través de circuitos, juegos y actividades vivenciales.'
        : 'We strengthen coordination, balance, and body schema to favor autonomy, concentration, and body expression through circuits, games, and experiential activities.',
      details: es 
        ? ['Coordinación motora gruesa', 'Motricidad fina', 'Esquema corporal', 'Equilibrio y lateralidad']
        : ['Gross motor coordination', 'Fine motor skills', 'Body schema', 'Balance and laterality'],
    },
    {
      name: es ? 'Fisioterapia' : 'Physiotherapy',
      icon: '💪',
      color: '#2466a8',
      bg: 'bg-[#e8f1fa]',
      desc: es 
        ? 'Intervenimos desde la estimulación temprana para mejorar aspectos como tono muscular, postura y movilidad, adaptando ejercicios a cada etapa de desarrollo con un enfoque lúdico y respetuoso.'
        : 'We intervene from early stimulation to improve aspects such as muscle tone, posture, and mobility, adapting exercises to each development stage with a playful, respectful approach.',
      details: es 
        ? ['Tono muscular', 'Postura y alineación', 'Movilidad funcional', 'Ejercicios adaptativos']
        : ['Muscle tone', 'Posture and alignment', 'Functional mobility', 'Adaptive exercises'],
    },
    {
      name: es ? 'Terapia de conducta' : 'Behavioral therapy',
      icon: '🧠',
      color: '#6c5ce7',
      bg: 'bg-[#f0edff]',
      desc: es 
        ? 'Acompañamos a los niños en el desarrollo de habilidades sociales, autorregulación y rutinas positivas dentro de su entorno familiar y escolar para mejorar la independencia y la convivencia.'
        : 'We support children in developing social skills, self-regulation, and positive routines within their family and school environment to improve independence and coexistence.',
      details: es 
        ? ['Habilidades sociales', 'Autorregulación', 'Rutinas positivas', 'Independencia funcional']
        : ['Social skills', 'Self-regulation', 'Positive routines', 'Functional independence'],
    },
    {
      name: es ? 'Estimulación neuro-cognitiva' : 'Neuro-cognitive stimulation',
      icon: '🧩',
      color: '#e8a838',
      bg: 'bg-[#fdf6e3]',
      desc: es 
        ? 'Intervención orientada a potenciar las funciones cognitivas en niños con síndrome de Down, favoreciendo el desarrollo del lenguaje, la atención, la memoria y las habilidades de aprendizaje.'
        : 'Intervention oriented to enhance cognitive functions in children with Down syndrome, favoring the development of speech, attention, memory, and learning skills.',
      details: es 
        ? ['Atención y concentración', 'Memoria de trabajo', 'Funciones ejecutivas', 'Razonamiento lógico']
        : ['Attention and concentration', 'Working memory', 'Executive functions', 'Logical reasoning'],
    },
    {
      name: es ? 'Apoyo pedagógico' : 'Pedagogical support',
      icon: '📝',
      color: '#2d8a4e',
      bg: 'bg-[#e5f5eb]',
      desc: es 
        ? 'Realizamos adaptaciones curriculares según las capacidades y ritmo de cada niño, promoviendo el aprendizaje significativo. Nuestros estudiantes cuentan con libreta de educación regular.'
        : 'We perform curricular adaptations according to the abilities and pace of each child, promoting meaningful learning. Our students are integrated into regular school systems.',
      details: es 
        ? ['Adaptaciones curriculares', 'Lectoescritura adaptada', 'Matemáticas funcionales', 'Libreta del sistema regular']
        : ['Curricular adaptations', 'Adapted reading and writing', 'Functional math', 'Regular system integration'],
    },
    {
      name: es ? 'Orientación familiar' : 'Family guidance',
      icon: '👨‍👩‍👧',
      color: '#e84393',
      bg: 'bg-[#fdf2f8]',
      desc: es 
        ? 'Ofrecemos sesiones virtuales gratuitas, atención desde Trabajo Social y Psicología, y una red de apoyo donde las familias comparten experiencias y crecen juntas en el proceso de crianza.'
        : 'We offer free virtual sessions, care from Social Work and Psychology, and a support network where families share experiences and grow together in parenting.',
      details: es 
        ? ['Sesiones virtuales gratuitas', 'Red de apoyo para padres', 'Contención emocional', 'Estrategias para el hogar']
        : ['Free virtual sessions', 'Parent support network', 'Emotional containment', 'Home strategies'],
    },
  ]

  const facts = [
    { icon: '🏫', label: es ? 'Niveles educativos' : 'Educational levels', value: es ? 'Pre Kínder · Kínder · Primaria' : 'Pre Kínder · Kínder · Primary', bg: 'bg-[#e8f1fa]' },
    { icon: '🧑‍🤝‍🧑', label: es ? 'Inclusión activa' : 'Active inclusion', value: es ? 'Asisten al centro + escuela regular' : 'Attend center + regular school', bg: 'bg-[#fdf6e3]' },
    { icon: '📋', label: es ? 'Acreditación' : 'Accreditation', value: es ? 'Libreta de la educación regular' : 'Regular education school record', bg: 'bg-[#e0f5f0]' },
    { icon: '🌱', label: es ? 'Hasta bachiller' : 'Up to graduation', value: es ? 'Trayectoria educativa completa' : 'Complete educational path', bg: 'bg-[#e5f5eb]' },
  ]

  const activeLv = levels[activeLevel]

  return (
    <div className="overflow-x-hidden w-full bg-[#fafbfd]">
      
      {/* 1. Header Hero */}
      <section className="relative min-h-[480px] flex items-center bg-gradient-to-br from-[#0c2340] via-[#163a60] to-[#2466a8] py-16 px-4 overflow-hidden">
        {/* Decoraciones de fondo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          <div className="absolute -top-[15%] -right-[10%] w-[350px] h-[350px] md:w-[550px] md:h-[550px] rounded-full border border-white/5 opacity-40" />
          <div className="absolute -bottom-[25%] -left-[8%] w-[250px] h-[250px] md:w-[450px] md:h-[450px] rounded-full bg-radial-gradient(circle, rgba(232,168,56,0.06), transparent 70%)" />
          <div className="absolute top-[20%] left-[15%] text-white/5 text-4xl animate-pulse">⭐</div>
          <div className="absolute top-[50%] right-[20%] text-white/5 text-5xl animate-pulse">⭐</div>
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
                <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs text-black font-extrabold shadow-sm select-none">🌟</span>
                <span className="text-white/90 text-xs font-semibold select-none">{es ? 'Programa principal — Desde 2021' : 'Main Program — Since 2021'}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-normal leading-[1.1] mb-3 tracking-tight">
                Mi Escuelita <br />
                Inclusiva <span className="font-bold italic text-primary">Down</span>
              </h1>
              <p className="text-lg md:text-xl font-medium text-white/55 italic mb-6">
                &ldquo;{es ? 'Creciendo sin límites' : 'Growing without limits'}&rdquo;
              </p>

              <p className="text-sm md:text-base text-white/70 leading-relaxed mb-8 max-w-lg">
                {es 
                  ? 'Programa integral que acompaña a las familias de niños y niñas con síndrome de Down desde la estimulación temprana hasta la inserción laboral, potenciando sus habilidades y fortaleciendo su autonomía en cada etapa de la vida.'
                  : 'Comprehensive program supporting families of children with Down syndrome from early stimulation to job placement, boosting their skills and strengthening autonomy in every stage of life.'}
              </p>

              <div className="flex flex-wrap gap-4 items-center">
                <a
                  href="#niveles"
                  className="bg-primary hover:bg-primary/95 text-black font-extrabold text-sm px-8 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-primary/10 min-h-[44px] flex items-center justify-center"
                >
                  {es ? 'Explorar niveles' : 'Explore levels'}
                </a>
                <a
                  href="https://wa.me/59170106276"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-white/20 hover:border-white/50 bg-transparent hover:bg-white/5 text-white font-bold text-sm px-8 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[44px] flex items-center justify-center gap-2"
                >
                  <span className="text-lg">💬</span>
                  {es ? 'Inscripciones 2026' : '2026 Admissions'}
                </a>
              </div>
            </div>

            {/* Imagen ilustrativa en Desktop */}
            <div className="relative hidden lg:block">
              <div className="aspect-[4/4.3] rounded-3xl bg-gradient-to-br from-[#e8f1fa] to-[#fdf6e3] overflow-hidden border-[4.5px] border-white/10 shadow-2xl relative flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="text-6xl mb-4 animate-[float_4s_ease-in-out_infinite]">🌟</div>
                  <h3 className="font-serif text-lg text-[#0c2340] font-bold max-w-[200px] leading-snug mx-auto">
                    {es ? 'Niños en actividades del centro' : 'Children in center activities'}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2 font-medium">Pre Kínder · Kínder · Primaria</p>
                </div>
              </div>

              {/* Floating Badge 1 */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 flex items-center gap-3.5 animate-[float_4s_ease-in-out_infinite]">
                <div className="w-11 h-11 rounded-xl bg-[#e5f5eb] flex items-center justify-center text-xl">📚</div>
                <div className="text-left">
                  <div className="text-xs font-bold text-[#0c2340] leading-tight">{es ? 'Libreta oficial del' : 'Official records of'}</div>
                  <div className="text-[10px] text-gray-400 font-semibold mt-0.5">{es ? 'sistema regular' : 'regular system'}</div>
                </div>
              </div>

              {/* Floating Badge 2 */}
              <div className="absolute -top-4 -right-4 bg-primary rounded-xl py-2 px-4 shadow-lg shadow-primary/20 flex flex-col items-center justify-center animate-[float_5s_ease-in-out_infinite_1.5s]">
                <span className="font-serif text-xl font-bold text-[#0c2340] leading-none">4</span>
                <span className="text-[9px] text-[#0c2340] font-extrabold uppercase tracking-wider mt-0.5">{es ? 'Niveles' : 'Levels'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Facts Strip */}
      <section className="bg-[#fafbfd] py-8 px-4 border-b border-gray-200/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {facts.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-gray-200/80 shadow-sm transition-all duration-300 hover:shadow-md select-none"
              >
                <div className={`w-12 h-12 rounded-xl ${f.bg} flex items-center justify-center text-2xl flex-shrink-0`}>
                  {f.icon}
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">{f.label}</div>
                  <div className="text-sm font-bold text-[#0c2340] mt-0.5 leading-snug">{f.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Levels Journey (Touch/Mobile responsive scrollable selector) */}
      <section id="niveles" className="py-16 md:py-24 px-4 bg-[#fafbfd]">
        <div className="container mx-auto max-w-6xl">
          
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#fdf6e3] border border-[#e8a838]/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">🗺️</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#e8a838]">
                {es ? 'Un camino de crecimiento' : 'A growth path'}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0c2340] font-normal tracking-tight mb-4">
              {es ? '4 niveles, una vida de oportunidades' : '4 levels, a life of opportunities'}
            </h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
              {es 
                ? 'Desde los primeros meses hasta la vida adulta, cada etapa está diseñada para potenciar el desarrollo integral del niño.'
                : 'From the first months to adult life, each stage is designed to boost the child\'s comprehensive development.'}
            </p>
          </div>

          {/* Selector de Niveles (Deslizable en móvil snap-x, grid en desktop) */}
          <div className="mb-10 relative">
            <div className="flex md:grid md:grid-cols-4 gap-4 overflow-x-auto pb-4 md:pb-0 snap-x justify-start md:justify-center scrollbar-none">
              {levels.map((l, i) => {
                const isSelected = activeLevel === i
                return (
                  <button
                    key={i}
                    onClick={() => setActiveLevel(i)}
                    className={`flex-shrink-0 snap-center w-[230px] md:w-auto p-4 rounded-2xl border-2 text-left transition-all duration-300 focus:outline-none min-h-[72px] flex items-center gap-3.5 ${
                      isSelected 
                        ? `${l.color} bg-white shadow-md shadow-black/5 scale-[1.01]` 
                        : 'border-gray-200 bg-white/70 hover:bg-white text-gray-500'
                    }`}
                  >
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center text-2xl flex-shrink-0 shadow-inner ${isSelected ? l.bg : 'bg-gray-100'}`}>
                      {l.icon}
                    </div>
                    <div>
                      <div className={`text-[10px] font-bold tracking-wider uppercase ${isSelected ? '' : 'text-gray-400'}`}>{l.age}</div>
                      <div className="text-xs font-bold mt-0.5 text-gray-900">{l.name}</div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Detalle del nivel seleccionado */}
          {activeLv && (
            <div className="max-w-5xl mx-auto animate-[fadeSlideUp_0.5s_cubic-bezier(0.16,1,0.3,1)]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
                
                {/* Lado izquierdo: Imagen / Ilustración */}
                <div className={`lg:col-span-5 ${activeLv.bg} flex items-center justify-center p-8 min-h-[300px] relative`}>
                  <div className="absolute top-6 left-6 inline-flex items-center gap-2 bg-white/80 border border-white/20 rounded-full px-3.5 py-1 shadow-sm">
                    <span className="text-base select-none">{activeLv.icon}</span>
                    <span className="text-xs font-bold text-[#0c2340]">{activeLv.name}</span>
                  </div>
                  <div className="text-center">
                    <div className="text-6xl mb-3 animate-[float_4s_ease-in-out_infinite]">{activeLv.photo}</div>
                    <p className="font-serif text-sm text-[#0c2340] font-bold">{activeLv.photoLabel}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{es ? 'Imagen real del Centro Lápiz en Mano' : 'Lápiz en Mano Center photo'}</p>
                  </div>
                </div>

                {/* Lado derecho: Textos */}
                <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-center text-left">
                  <div className="inline-flex items-center bg-gray-100 text-gray-600 font-bold text-xs px-3 py-1.5 rounded-full mb-4 w-fit select-none">
                    {activeLv.age}
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl text-[#0c2340] font-bold mb-4 leading-tight">
                    {activeLv.name}
                  </h3>
                  <p className="text-sm md:text-base text-gray-500 leading-relaxed mb-6">
                    {activeLv.desc}
                  </p>

                  <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-3.5 pt-4 border-t border-gray-100">
                    {es ? 'Enfoque de esta etapa' : 'Focus of this stage'}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeLv.highlights.map((h) => (
                      <div
                        key={h}
                        className={`flex items-center gap-2.5 p-2 rounded-xl text-xs font-semibold text-gray-700 ${activeLv.bg}`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0c2340] flex-shrink-0" style={{ backgroundColor: activeLv.accentColor }} />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </section>

      {/* 4. Services Section (Collapsible accordions, 1 col mobile, 2 col desktop) */}
      <section className="py-16 md:py-24 px-4 bg-[#f7f5f0] border-t border-b border-gray-200/50">
        <div className="container mx-auto max-w-6xl">
          
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#e0f5f0] border border-[#1a8a7d]/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">🩺</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1a8a7d]">
                {es ? 'Servicios terapéuticos' : 'Therapeutic Services'}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0c2340] font-normal tracking-tight mb-4">
              {es ? '8 áreas de intervención' : '8 areas of intervention'}
            </h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
              {es 
                ? 'Cada área trabaja de forma coordinada para ofrecer una atención verdaderamente integral.' 
                : 'Each area works in a coordinated way to offer a truly comprehensive care.'}
            </p>
          </div>

          {/* Acordeones */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto text-left">
            {services.map((s, i) => {
              const isOpen = openService === i
              return (
                <div
                  key={s.name}
                  onClick={() => setOpenService(isOpen ? null : i)}
                  className={`bg-white rounded-2xl border overflow-hidden shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 ${
                    isOpen ? 'border-[#2466a8]' : 'border-gray-200'
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
                      isOpen ? 'bg-[#2466a8]/10 text-[#2466a8] rotate-180' : 'bg-gray-50 text-gray-400'
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

      {/* 5. Parents Section */}
      <section className="py-16 md:py-24 px-4 bg-[#fafbfd]">
        <div className="container mx-auto max-w-5xl">
          
          <div className="text-center mb-12 max-w-md mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#fdf2f8] border border-[#e84393]/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">👨‍👩‍👧</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#e84393]">
                {es ? 'Para las familias' : 'For families'}
              </span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-[#0c2340] font-normal tracking-tight">
              {es ? 'La familia es parte del equipo' : 'The family is part of the team'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: '🎥',
                title: es ? 'Sesiones virtuales gratuitas' : 'Free virtual sessions',
                desc: es 
                  ? 'Orientación personalizada sobre el proceso y desarrollo de su hijo, desde las áreas de Trabajo Social y Psicología, considerando sus características individuales.'
                  : 'Personalized guidance on your child\'s process and development, from Social Work and Psychology, considering their individual characteristics.',
                bg: 'bg-[#e8f1fa]'
              },
              {
                icon: '🤝',
                title: es ? 'Red de apoyo para padres' : 'Parent support network',
                desc: es 
                  ? 'Espacio de acompañamiento y contención donde las familias comparten experiencias, fortalecen vínculos y crecen juntas en el proceso de crianza y desarrollo.'
                  : 'A space for support and containment where families share experiences, strengthen bonds, and grow together in parenting and development.',
                bg: 'bg-[#fdf6e3]'
              }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm flex flex-col items-start text-left transition-all hover:shadow-md hover:border-gray-300"
              >
                <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center text-3xl mb-5 shadow-sm`}>
                  {item.icon}
                </div>
                <h4 className="font-serif text-lg md:text-xl text-[#0c2340] font-bold mb-3">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Enrollment CTA */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-[#0c2340] via-[#163a60] to-[#2466a8] relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient(circle, rgba(232,168,56,0.06), transparent 70%) pointer-events-none" />
        
        <div className="container mx-auto max-w-3xl relative z-10 text-center">
          <span className="text-5xl block mb-5 animate-[float_4s_ease-in-out_infinite]">🌟</span>
          <h2 className="font-serif text-3xl md:text-4xl text-white font-normal leading-tight mb-4">
            {es ? 'Inscripciones abiertas — Gestión 2026' : 'Enrollments Open — 2026 Term'}
          </h2>
          
          <p className="font-serif text-base md:text-lg text-white/55 italic max-w-xl mx-auto mb-6 leading-relaxed">
            &ldquo;{es 
              ? 'El síndrome de Down no es una barrera, sino una manera diferente y valiosa de aprender, crecer y desarrollar todo el potencial.' 
              : 'Down syndrome is not a barrier, but a different and valuable way to learn, grow, and develop one\'s full potential.'}&rdquo;
          </p>

          <p className="text-sm md:text-base text-white/70 max-w-lg mx-auto leading-relaxed mb-10">
            {es 
              ? 'Contamos con cupos limitados porque priorizamos la calidad, el acompañamiento cercano y una atención verdaderamente significativa para cada niño.'
              : 'We have limited places because we prioritize quality, close support, and a truly meaningful care for each child.'}
          </p>

          <div className="flex justify-center">
            <a
              href="https://wa.me/59170106276"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25d366] hover:bg-[#25d366]/90 text-white font-extrabold text-sm sm:text-base px-8 py-3.5 sm:py-4 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#25d366]/20 min-h-[44px] flex items-center justify-center gap-2"
            >
              <span className="text-xl">💬</span>
              {es ? 'Reservar cupo — 70106276' : 'Reserve place — 70106276'}
            </a>
          </div>

          <p className="text-xs text-white/30 mt-4">
            {es ? 'Inicio oficial de clases: Febrero 2026' : 'Official start of classes: February 2026'}
          </p>
        </div>
      </section>

    </div>
  )
}
