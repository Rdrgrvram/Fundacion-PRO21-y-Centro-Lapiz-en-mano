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

  const officialAreas = [
    {
      id: 'conducta',
      title: es ? 'Terapia de Conducta' : 'Behavior Therapy',
      icon: '🧠',
      color: '#8c3cbd',
      bg: 'bg-[#8c3cbd]/10',
      borderColor: 'border-[#8c3cbd]/20',
      borderHover: 'hover:border-[#8c3cbd]',
      textColor: 'text-[#8c3cbd]',
      items: es
        ? [
            'Diseñar planes para mejorar el comportamiento adaptativo.',
            'Trabajar con padres para reforzar conductas positivas en casa.'
          ]
        : [
            'Design plans to improve adaptive behavior.',
            'Work with parents to reinforce positive behaviors at home.'
          ]
    },
    {
      id: 'lenguaje',
      title: es ? 'Terapia de Lenguaje' : 'Speech Therapy',
      icon: '🗣️',
      color: '#229cc2',
      bg: 'bg-[#229cc2]/10',
      borderColor: 'border-[#229cc2]/20',
      borderHover: 'hover:border-[#229cc2]',
      textColor: 'text-[#229cc2]',
      items: es
        ? [
            'Evaluar y tratar dificultades del lenguaje en niños con síndrome de Down.',
            'Implementar estrategias que favorezcan la comunicación efectiva.'
          ]
        : [
            'Evaluate and treat language difficulties in children with Down syndrome.',
            'Implement strategies that promote effective communication.'
          ]
    },
    {
      id: 'fisioterapia',
      title: es ? 'Fisioterapia' : 'Physiotherapy',
      icon: '💪',
      color: '#2466a8',
      bg: 'bg-[#2466a8]/10',
      borderColor: 'border-[#2466a8]/20',
      borderHover: 'hover:border-[#2466a8]',
      textColor: 'text-[#2466a8]',
      items: es
        ? [
            'Mejorar la movilidad y habilidades motoras de los niños.',
            'Diseñar ejercicios adaptados a las necesidades individuales.'
          ]
        : [
            'Improve mobility and motor skills of children.',
            'Design exercises adapted to individual needs.'
          ]
    },
    {
      id: 'psicomotricidad',
      title: es ? 'Psicomotricidad' : 'Psychomotor Therapy',
      icon: '🤸',
      color: '#e86840',
      bg: 'bg-[#e86840]/10',
      borderColor: 'border-[#e86840]/20',
      borderHover: 'hover:border-[#e86840]',
      textColor: 'text-[#e86840]',
      items: es
        ? [
            'Potenciar habilidades motoras gruesas y finas.',
            'Favorecer la coordinación y el equilibrio.'
          ]
        : [
            'Enhance gross and fine motor skills.',
            'Promote coordination and balance.'
          ]
    },
    {
      id: 'educativa',
      title: es ? 'Educativa (Pre-Kínder, Kínder, Primaria)' : 'Educational (Pre-Kinder, Kinder, Primary)',
      icon: '🎒',
      color: '#2d8a4e',
      bg: 'bg-[#2d8a4e]/10',
      borderColor: 'border-[#2d8a4e]/20',
      borderHover: 'hover:border-[#2d8a4e]',
      textColor: 'text-[#2d8a4e]',
      items: es
        ? [
            'Diseñar actividades educativas inclusivas y personalizadas.',
            'Trabajar en habilidades académicas y sociales para preparar a los niños para la educación formal.'
          ]
        : [
            'Design inclusive and personalized educational activities.',
            'Work on academic and social skills to prepare children for formal education.'
          ]
    }
  ]

  const levels = [
    {
      age: es ? '0 – 2 años' : '0 – 2 years',
      name: es ? 'Manos Chiquitas' : 'Little Hands',
      icon: '🍼',
      color: 'border-[#229cc2] text-[#229cc2]',
      accentColor: '#229cc2',
      bg: 'bg-[#229cc2]/10',
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
      color: 'border-[#ffc500] text-[#b38600]',
      accentColor: '#ffc500',
      bg: 'bg-[#ffc500]/15',
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
      color: 'border-[#8c3cbd] text-[#8c3cbd]',
      accentColor: '#8c3cbd',
      bg: 'bg-[#8c3cbd]/10',
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
      bg: 'bg-[#2d8a4e]/10',
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
      color: '#229cc2',
      bg: 'bg-[#229cc2]/10',
      borderColor: 'border-[#229cc2]/20',
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
      bg: 'bg-[#1a8a7d]/10',
      borderColor: 'border-[#1a8a7d]/20',
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
      bg: 'bg-[#e86840]/10',
      borderColor: 'border-[#e86840]/20',
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
      bg: 'bg-[#2466a8]/10',
      borderColor: 'border-[#2466a8]/20',
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
      color: '#8c3cbd',
      bg: 'bg-[#8c3cbd]/10',
      borderColor: 'border-[#8c3cbd]/20',
      desc: es 
        ? 'Acompañamos a los niños en el desarrollo de habilidades sociales, autorregulación y rutinas positively dentro de su entorno familiar y escolar para mejorar la independencia y la convivencia.'
        : 'We support children in developing social skills, self-regulation, and positive routines within their family and school environment to improve independence and coexistence.',
      details: es 
        ? ['Habilidades sociales', 'Autorregulación', 'Rutinas positivas', 'Independencia funcional']
        : ['Social skills', 'Self-regulation', 'Positive routines', 'Functional independence'],
    },
    {
      name: es ? 'Estimulación neuro-cognitiva' : 'Neuro-cognitive stimulation',
      icon: '🧩',
      color: '#ffc500',
      bg: 'bg-[#ffc500]/15',
      borderColor: 'border-[#ffc500]/30',
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
      bg: 'bg-[#2d8a4e]/10',
      borderColor: 'border-[#2d8a4e]/20',
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
      bg: 'bg-[#e84393]/10',
      borderColor: 'border-[#e84393]/20',
      desc: es 
        ? 'Ofrecemos sesiones virtuales gratuitas, atención desde Trabajo Social y Psicología, y una red de apoyo donde las familias comparten experiencias y crecen juntas en el proceso de crianza.'
        : 'We offer free virtual sessions, care from Social Work and Psychology, and a support network where families share experiences and grow together in parenting.',
      details: es 
        ? ['Sesiones virtuales gratuitas', 'Red de apoyo para padres', 'Contención emocional', 'Estrategias para el hogar']
        : ['Free virtual sessions', 'Parent support network', 'Emotional containment', 'Home strategies'],
    },
  ]

  const facts = [
    { icon: '🏫', label: es ? 'Niveles educativos' : 'Educational levels', value: es ? 'Pre Kínder · Kínder · Primaria' : 'Pre Kínder · Kínder · Primary', bg: 'bg-[#229cc2]/10', border: 'border-[#229cc2]/20' },
    { icon: '🧑‍🤝‍🧑', label: es ? 'Inclusión activa' : 'Active inclusion', value: es ? 'Asisten al centro + escuela regular' : 'Attend center + regular school', bg: 'bg-[#ffc500]/15', border: 'border-[#ffc500]/30' },
    { icon: '📋', label: es ? 'Acreditación' : 'Accreditation', value: es ? 'Libreta de la educación regular' : 'Regular education school record', bg: 'bg-[#8c3cbd]/10', border: 'border-[#8c3cbd]/20' },
    { icon: '🌱', label: es ? 'Hasta bachiller' : 'Up to graduation', value: es ? 'Trayectoria educativa completa' : 'Complete educational path', bg: 'bg-[#2d8a4e]/10', border: 'border-[#2d8a4e]/20' },
  ]

  const activeLv = levels[activeLevel]

  return (
    <div className="overflow-x-hidden w-full bg-[#fafbfd]">
      
      {/* 1. Header Hero */}
      <section className="relative min-h-[520px] flex items-center bg-gradient-to-br from-[#0c2340] via-[#163a60] to-[#2466a8] py-16 px-4 overflow-hidden">
        {/* Decoraciones de fondo animadas */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          <div className="absolute -top-[15%] -right-[10%] w-[350px] h-[350px] md:w-[550px] md:h-[550px] rounded-full border border-white/5 opacity-40 animate-pulse" />
          <div className="absolute -bottom-[25%] -left-[8%] w-[250px] h-[250px] md:w-[450px] md:h-[450px] rounded-full bg-radial-gradient(circle, rgba(255,197,0,0.08), transparent 70%)" />
          <div className="absolute top-[20%] left-[12%] text-white/10 text-4xl animate-float">⭐</div>
          <div className="absolute top-[50%] right-[18%] text-white/10 text-5xl animate-float" style={{ animationDelay: '1.5s' }}>🌟</div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 90" fill="none" className="block w-full h-8 md:h-16 lg:h-20 text-[#fafbfd] fill-current">
            <path d="M0 50C240 20 480 70 720 40C960 10 1200 60 1440 35V90H0Z" />
          </svg>
        </div>

        <div className="container mx-auto max-w-6xl relative z-20 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
            
            {/* Columna Izquierda con animación de entrada */}
            <div className="animate-fade-slide-up">
              <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/15 rounded-full py-1.5 pl-2.5 pr-4 mb-6 shadow-md">
                <span className="w-6 h-6 rounded-full bg-[#ffc500] flex items-center justify-center text-xs text-black font-extrabold shadow-sm select-none">🌟</span>
                <span className="text-white/90 text-xs font-bold tracking-wide select-none">Fundación Pro-21</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-normal leading-[1.1] mb-3 tracking-tight">
                Programa de Intervención <br />
                <span className="font-bold italic text-[#ffc500]">Escuelita Down</span>
              </h1>
              <p className="text-lg md:text-xl font-medium text-white/60 italic mb-6">
                &ldquo;{es ? 'Creciendo sin límites desde un enfoque centrado en la persona' : 'Growing without limits with a person-centered approach'}&rdquo;
              </p>

              <p className="text-sm md:text-base text-white/80 leading-relaxed mb-8 max-w-lg">
                {es 
                  ? 'El Programa de Intervención – Escuelita Down es una iniciativa de la Fundación Pro-21, creada para responder a las necesidades de niños y niñas con síndrome de Down y de sus familias, promoviendo su desarrollo integral.'
                  : 'The Escuelita Down Intervention Program is an initiative of Fundación Pro-21, created to respond to the needs of children with Down syndrome and their families.'}
              </p>

              <div className="flex flex-wrap gap-4 items-center">
                <a
                  href="#areas-oficiales"
                  className="bg-[#ffc500] hover:bg-[#ffc500]/90 text-black font-extrabold text-sm px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-[#ffc500]/20 min-h-[44px] flex items-center justify-center"
                >
                  {es ? 'Ver áreas de intervención' : 'View intervention areas'}
                </a>
                <a
                  href="https://wa.me/59170106276"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-white/20 hover:border-white/50 bg-transparent hover:bg-white/5 text-white font-bold text-sm px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] min-h-[44px] flex items-center justify-center gap-2"
                >
                  <span className="text-lg">💬</span>
                  {es ? 'Contactar por WhatsApp' : 'Contact via WhatsApp'}
                </a>
              </div>
            </div>

            {/* Columna Derecha con tarjeta visual rediseñada */}
            <div className="relative hidden lg:block pl-6 animate-fade-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl space-y-6 text-left hover:shadow-primary/10 transition-all duration-500">
                
                {/* Header de la tarjeta */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#ffc500]/20 text-[#b38600] flex items-center justify-center text-2xl font-bold shadow-sm">
                      🌟
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#0c2340]">
                        {es ? 'Escuelita Down' : 'Escuelita Down'}
                      </h3>
                      <p className="text-xs text-gray-400 font-semibold">
                        {es ? 'Desarrollo integral personalizado' : 'Personalized integral care'}
                      </p>
                    </div>
                  </div>
                  <span className="bg-[#229cc2]/10 text-[#229cc2] font-extrabold text-xs px-3.5 py-1.5 rounded-full border border-[#229cc2]/20 select-none">
                    {es ? '5 Áreas Terapéuticas' : '5 Therapeutic Areas'}
                  </span>
                </div>

                {/* Grid de 5 Áreas */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#8c3cbd]/10 border border-[#8c3cbd]/20 rounded-2xl p-3 flex items-center gap-2.5 transition-transform hover:scale-[1.02]">
                    <span className="text-xl select-none">🧠</span>
                    <div>
                      <div className="text-xs font-bold text-[#0c2340]">{es ? 'Conducta' : 'Behavior'}</div>
                      <div className="text-[9px] text-gray-500">{es ? 'Planes adaptativos' : 'Adaptive plans'}</div>
                    </div>
                  </div>

                  <div className="bg-[#229cc2]/10 border border-[#229cc2]/20 rounded-2xl p-3 flex items-center gap-2.5 transition-transform hover:scale-[1.02]">
                    <span className="text-xl select-none">🗣️</span>
                    <div>
                      <div className="text-xs font-bold text-[#0c2340]">{es ? 'Lenguaje' : 'Speech'}</div>
                      <div className="text-[9px] text-gray-500">{es ? 'Comunicación' : 'Communication'}</div>
                    </div>
                  </div>

                  <div className="bg-[#2466a8]/10 border border-[#2466a8]/20 rounded-2xl p-3 flex items-center gap-2.5 transition-transform hover:scale-[1.02]">
                    <span className="text-xl select-none">💪</span>
                    <div>
                      <div className="text-xs font-bold text-[#0c2340]">{es ? 'Fisioterapia' : 'Physio'}</div>
                      <div className="text-[9px] text-gray-500">{es ? 'Movilidad' : 'Mobility'}</div>
                    </div>
                  </div>

                  <div className="bg-[#e86840]/10 border border-[#e86840]/20 rounded-2xl p-3 flex items-center gap-2.5 transition-transform hover:scale-[1.02]">
                    <span className="text-xl select-none">🤸</span>
                    <div>
                      <div className="text-xs font-bold text-[#0c2340]">{es ? 'Psicomotricidad' : 'Psychomotor'}</div>
                      <div className="text-[9px] text-gray-500">{es ? 'Coordinación' : 'Coordination'}</div>
                    </div>
                  </div>

                  <div className="col-span-2 bg-[#2d8a4e]/10 border border-[#2d8a4e]/20 rounded-2xl p-3 flex items-center gap-2.5 transition-transform hover:scale-[1.02]">
                    <span className="text-xl select-none">🎒</span>
                    <div>
                      <div className="text-xs font-bold text-[#0c2340]">{es ? 'Educativa (Pre-Kínder, Kínder, Primaria)' : 'Educational (Pre-K, K, Primary)'}</div>
                      <div className="text-[9px] text-gray-500">{es ? 'Habilidades académicas e inclusión' : 'Academic skills & inclusion'}</div>
                    </div>
                  </div>
                </div>

                {/* Footer limpio de la tarjeta */}
                <div className="bg-[#fafbfd] border border-gray-100 rounded-2xl p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs select-none">✨</span>
                    <span className="text-xs font-bold text-gray-700">
                      {es ? 'Atención Interdisciplinaria' : 'Interdisciplinary Care'}
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-400 font-semibold">La Paz, Bolivia</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Sección Institucional (Rediseño visual elegante de 2 columnas) */}
      <section className="py-16 md:py-20 px-4 bg-white border-b border-gray-100">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            
            {/* Bloque 1: Acompañamiento Especializado */}
            <div className="bg-gradient-to-br from-[#2466a8]/5 via-[#fafbfd] to-white rounded-3xl p-8 md:p-10 border border-[#2466a8]/20 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#2466a8]/10 border border-[#2466a8]/20 rounded-full px-4 py-1.5 mb-6 select-none">
                  <span className="text-sm">🌱</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2466a8]">
                    {es ? 'Acompañamiento Especializado' : 'Specialized Accompaniment'}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#0c2340] mb-4 leading-snug">
                  {es ? 'Atención Individual e Interdisciplinaria' : 'Individual & Interdisciplinary Care'}
                </h3>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  {es 
                    ? 'A través de un equipo interdisciplinario, el programa ofrece acompañamiento especializado durante las primeras etapas del desarrollo, fortaleciendo habilidades cognitivas, comunicativas, motoras, sociales y adaptativas. Cada intervención se planifica de manera individual, considerando las características, fortalezas y necesidades de cada niño o niña, así como la participación activa de su familia como parte fundamental del proceso.'
                    : 'Through an interdisciplinary team, the program offers specialized accompaniment during the early stages of development, strengthening cognitive, communicative, motor, social, and adaptive skills. Each intervention is planned individually, considering the characteristics, strengths, and needs of each child, as well as the active participation of their family as a fundamental part of the process.'}
                </p>
              </div>
            </div>

            {/* Bloque 2: Autonomía e Inclusión */}
            <div className="bg-gradient-to-br from-[#2d8a4e]/5 via-[#fafbfd] to-white rounded-3xl p-8 md:p-10 border border-[#2d8a4e]/20 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#2d8a4e]/10 border border-[#2d8a4e]/20 rounded-full px-4 py-1.5 mb-6 select-none">
                  <span className="text-sm">💖</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2d8a4e]">
                    {es ? 'Inclusión & Calidad de Vida' : 'Inclusion & Quality of Life'}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#0c2340] mb-4 leading-snug">
                  {es ? 'Desarrollo de Autonomía y Bienestar' : 'Autonomy & Well-being Development'}
                </h3>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  {es 
                    ? 'Con este programa, la Fundación Pro-21 busca favorecer el desarrollo de la autonomía, la inclusión y la participación plena en los diferentes ámbitos de la vida, brindando herramientas que contribuyan al bienestar y a una mejor calidad de vida para cada familia.'
                    : 'With this program, Fundación Pro-21 seeks to promote the development of autonomy, inclusion, and full participation in different areas of life, providing tools that contribute to the well-being and a better quality of life for each family.'}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Sección Oficial de Áreas de Intervención Terapéutica */}
      <section id="areas-oficiales" className="py-16 md:py-24 px-4 bg-[#fafbfd]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#229cc2]/10 border border-[#229cc2]/20 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">🎯</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#229cc2]">
                {es ? 'Áreas Terapéuticas Oficiales' : 'Official Therapeutic Areas'}
              </span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-[#0c2340] font-bold tracking-tight mb-4">
              {es ? 'El programa contempla las siguientes áreas de intervención terapéutica:' : 'The program contemplates the following areas of therapeutic intervention:'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto text-left">
            {officialAreas.map((area) => (
              <div
                key={area.id}
                className={`bg-white rounded-3xl p-7 border-2 ${area.borderColor} ${area.borderHover} transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-lg hover:-translate-y-1 ${area.id === 'educativa' ? 'md:col-span-2 lg:col-span-2' : ''}`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl ${area.bg} flex items-center justify-center text-2xl mb-5 shadow-sm`}>
                    {area.icon}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#0c2340] mb-4">
                    {area.title}
                  </h3>
                  <ul className="space-y-3">
                    {area.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                        <span className="font-bold mt-0.5" style={{ color: area.color }}>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Strip de Datos Clave */}
      <section className="bg-white py-10 px-4 border-t border-b border-gray-200/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {facts.map((f, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 p-5 rounded-2xl bg-white border ${f.border} shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 select-none`}
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

      {/* 5. Niveles de Crecimiento (Sin scrollbar, en Grid limpio de 4 columnas) */}
      <section id="niveles" className="py-16 md:py-24 px-4 bg-[#fafbfd]">
        <div className="container mx-auto max-w-6xl">
          
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#ffc500]/15 border border-[#ffc500]/30 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">🗺️</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#b38600]">
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

          {/* Selector de Niveles (Grid de 4 columnas sin scrollbars ni desbordamientos) */}
          <div className="mb-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 max-w-5xl mx-auto">
              {levels.map((l, i) => {
                const isSelected = activeLevel === i
                return (
                  <button
                    key={i}
                    onClick={() => setActiveLevel(i)}
                    className={`w-full p-4 rounded-2xl border-2 text-left transition-all duration-300 focus:outline-none min-h-[76px] flex items-center gap-3.5 ${
                      isSelected 
                        ? `${l.color} bg-white shadow-lg shadow-black/5 scale-[1.02]` 
                        : 'border-gray-200 bg-white/80 hover:bg-white text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center text-2xl flex-shrink-0 shadow-inner ${isSelected ? l.bg : 'bg-gray-100'}`}>
                      {l.icon}
                    </div>
                    <div className="overflow-hidden">
                      <div className={`text-[10px] font-bold tracking-wider uppercase truncate ${isSelected ? '' : 'text-gray-400'}`}>{l.age}</div>
                      <div className="text-xs sm:text-sm font-bold mt-0.5 text-gray-900 truncate">{l.name}</div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Detalle del nivel seleccionado */}
          {activeLv && (
            <div className="max-w-5xl mx-auto transition-all duration-500 animate-fade-slide-up">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-md">
                
                {/* Lado izquierdo */}
                <div className={`lg:col-span-5 ${activeLv.bg} flex items-center justify-center p-8 min-h-[300px] relative`}>
                  <div className="absolute top-6 left-6 inline-flex items-center gap-2 bg-white/90 border border-white/30 rounded-full px-3.5 py-1 shadow-sm">
                    <span className="text-base select-none">{activeLv.icon}</span>
                    <span className="text-xs font-bold text-[#0c2340]">{activeLv.name}</span>
                  </div>
                  <div className="text-center">
                    <div className="text-6xl mb-3 animate-float">{activeLv.photo}</div>
                    <p className="font-serif text-sm text-[#0c2340] font-bold">{activeLv.photoLabel}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{es ? 'Imagen real del Centro Lápiz en Mano' : 'Lápiz en Mano Center photo'}</p>
                  </div>
                </div>

                {/* Lado derecho */}
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

      {/* 6. Servicios Terapéuticos (Desplegados completas en Grid, SIN ACORDEONES CERRADOS) */}
      <section className="py-16 md:py-24 px-4 bg-[#f7f5f0] border-t border-b border-gray-200/50">
        <div className="container mx-auto max-w-6xl">
          
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#229cc2]/10 border border-[#229cc2]/20 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">🩺</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#229cc2]">
                {es ? 'Servicios Terapéuticos Integrales' : 'Comprehensive Therapeutic Services'}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0c2340] font-normal tracking-tight mb-4">
              {es ? '8 áreas de atención integral abiertas al scroll' : '8 areas of comprehensive care'}
            </h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
              {es 
                ? 'Conoce a detalle cada una de nuestras especialidades mientras navegas por la página.' 
                : 'Learn about each of our specialties as you scroll through the page.'}
            </p>
          </div>

          {/* Grid de 8 Servicios desplegados totalmente abiertos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto text-left">
            {services.map((s) => (
              <div
                key={s.name}
                className={`bg-white rounded-3xl p-6 md:p-8 border ${s.borderColor} shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center gap-4 mb-4 select-none">
                    <div className={`w-13 h-13 rounded-2xl ${s.bg} flex items-center justify-center text-3xl shadow-sm flex-shrink-0`}>
                      {s.icon}
                    </div>
                    <div>
                      <h4 className="font-serif text-lg md:text-xl font-bold text-[#0c2340] leading-snug">
                        {s.name}
                      </h4>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        {es ? 'Especialidad terapéutica' : 'Therapeutic specialty'}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                    {s.desc}
                  </p>

                  <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-3 select-none">
                    {es ? 'Técnicas y áreas clave' : 'Key techniques & areas'}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {s.details.map((d) => (
                      <span
                        key={d}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700 ${s.bg}`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Sección para las Familias */}
      <section className="py-16 md:py-24 px-4 bg-[#fafbfd]">
        <div className="container mx-auto max-w-5xl">
          
          <div className="text-center mb-12 max-w-md mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#e84393]/10 border border-[#e84393]/20 rounded-full px-4 py-1.5 mb-3 select-none">
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
                bg: 'bg-[#229cc2]/10',
                border: 'border-[#229cc2]/20'
              },
              {
                icon: '🤝',
                title: es ? 'Red de apoyo para padres' : 'Parent support network',
                desc: es 
                  ? 'Espacio de acompañamiento y contención donde las familias comparten experiencias, fortalecen vínculos y crecen juntas en el proceso de crianza y desarrollo.'
                  : 'A space for support and containment where families share experiences, strengthen bonds, and grow together in parenting and development.',
                bg: 'bg-[#ffc500]/15',
                border: 'border-[#ffc500]/30'
              }
            ].map((item, i) => (
              <div
                key={i}
                className={`bg-white rounded-3xl p-8 border ${item.border} shadow-sm flex flex-col items-start text-left transition-all hover:shadow-lg hover:-translate-y-1`}
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

      {/* 8. CTA Inscripciones 2026 */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-[#0c2340] via-[#163a60] to-[#2466a8] relative overflow-hidden">
        <div className="container mx-auto max-w-3xl relative z-10 text-center">
          <span className="text-5xl block mb-5 animate-float">🌟</span>
          <h2 className="font-serif text-3xl md:text-4xl text-white font-normal leading-tight mb-4">
            {es ? 'Inscripciones abiertas — Gestión 2026' : 'Enrollments Open — 2026 Term'}
          </h2>
          
          <p className="font-serif text-base md:text-lg text-white/60 italic max-w-xl mx-auto mb-6 leading-relaxed">
            &ldquo;{es 
              ? 'El síndrome de Down no es una barrera, sino una manera diferente y valiosa de aprender, crecer y desarrollar todo el potencial.' 
              : 'Down syndrome is not a barrier, but a different and valuable way to learn, grow, and develop one\'s full potential.'}&rdquo;
          </p>

          <p className="text-sm md:text-base text-white/80 max-w-lg mx-auto leading-relaxed mb-10">
            {es 
              ? 'Contamos con cupos limitados porque priorizamos la calidad, el acompañamiento cercano y una atención verdaderamente significativa para cada niño.'
              : 'We have limited places because we prioritize quality, close support, and a truly meaningful care for each child.'}
          </p>

          <div className="flex justify-center">
            <a
              href="https://wa.me/59170106276"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25d366] hover:bg-[#25d366]/90 text-white font-extrabold text-sm sm:text-base px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-[#25d366]/20 min-h-[44px] flex items-center justify-center gap-2"
            >
              <span className="text-xl">💬</span>
              {es ? 'Reservar cupo — 70106276' : 'Reserve place — 70106276'}
            </a>
          </div>

          <p className="text-xs text-white/40 mt-4 font-medium">
            {es ? 'Inicio oficial de clases: Febrero 2026' : 'Official start of classes: February 2026'}
          </p>
        </div>
      </section>

    </div>
  )
}
