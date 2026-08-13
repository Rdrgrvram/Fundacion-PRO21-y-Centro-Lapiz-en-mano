'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Locale } from '@/lib/i18n'

interface PageProps {
  params: {
    lang: Locale
  }
}

export default function Page({ params: { lang } }: PageProps) {
  const es = lang === 'es'
  const [activeAge, setActiveAge] = useState(0)
  const [activeLevel, setActiveLevel] = useState(0)
  const [openService, setOpenService] = useState<number | null>(null)
  
  // Lightbox Modal state for Photo Gallery
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

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
    { icon: '⏰', title: es ? 'Intervención temprana' : 'Early intervention', desc: es ? 'Cuanto antes se identifique y se intervenga, mayor será el impacto en el desarrollo del niño. Cada día cuenta.' : 'The earlier it is identified and intervened, the greater the impact on child development. Every day counts.', color: 'border-secondary text-secondary' },
    { icon: '🧩', title: es ? 'Individualización' : 'Individualization', desc: es ? 'No hay dos niños iguales. Cada plan de intervención se diseña a medida, respetando el ritmo y las fortalezas de cada uno.' : 'No two children are alike. Each intervention plan is custom designed, respecting the pace and strengths of each.', color: 'border-accent text-accent' },
    { icon: '🔄', title: es ? 'Enfoque integral' : 'Integral approach', desc: es ? 'Abordamos todas las áreas del desarrollo de forma simultánea y coordinada: comunicación, conducta, motricidad y sensorialidad.' : 'We address all areas of development simultaneously and in a coordinated way: communication, behavior, motor skills, and sensory.', color: 'border-secondary text-secondary' },
    { icon: '👨‍👩‍👧', title: es ? 'Familia como aliada' : 'Family as ally', desc: es ? 'Los padres son los principales agentes del cambio. Los formamos, acompañamos y empoderamos para que sean co-terapeutas.' : 'Parents are the main agents of change. We train, accompany, and empower them to be co-therapists.', color: 'border-primary text-primary-600' },
  ]

  const levels = [
    {
      age: es ? '3 años' : '3 years',
      name: es ? 'Estimulación Parvulario' : 'Nursery Stimulation',
      icon: '🧸',
      bg: 'bg-accent/10',
      accentColor: '#8c3cbd',
      borderClass: 'border-accent',
      textClass: 'text-accent',
      desc: es 
        ? 'El nivel de Parvulario se orienta a implementar actividades sensoriales y de exploración para niños pequeños. Acompañamos las primeras interacciones lúdicas estructuradas, trabajando de manera enfocada en el desarrollo de habilidades socioemocionales iniciales, el juego simbólico y la autorregulación en espacios terapéuticos.'
        : 'The Nursery level focuses on implementing sensory and exploration activities for toddlers. We accompany initial structured play interactions, focusing on the development of initial socioemotional skills, symbolic play, and self-regulation within therapeutic environments.',
      highlights: es
        ? ['Actividades sensoriales', 'Exploración del entorno', 'Habilidades socioemocionales iniciales', 'Juego funcional y estructurado']
        : ['Sensory activities', 'Environment exploration', 'Initial socioemotional skills', 'Functional and structured play']
    },
    {
      age: es ? '4 años' : '4 years',
      name: es ? 'Estimulación Pre-Kínder' : 'Pre-Kinder Stimulation',
      icon: '🎨',
      bg: 'bg-secondary/10',
      accentColor: '#229cc2',
      borderClass: 'border-secondary',
      textClass: 'text-secondary',
      desc: es
        ? 'En Pre-Kínder, nos enfocamos en diseñar actividades lúdicas para el desarrollo cognitivo temprano. Introducimos progresivamente conceptos básicos de lectura, escritura y matemáticas adaptadas al perfil comunicativo del niño, ampliando su vocabulario y fortaleciendo sus canales expresivos y receptivos.'
        : 'In Pre-Kinder, we focus on designing play-based activities for early cognitive development. We progressively introduce basic reading, writing, and mathematics concepts adapted to the child\'s communicative profile, expanding vocabulary and strengthening expressive and receptive channels.',
      highlights: es
        ? ['Desarrollo cognitivo temprano', 'Conceptos de lectoescritura inicial', 'Nociones matemáticas básicas', 'Ampliación de vocabulario y expresión']
        : ['Early cognitive development', 'Initial reading & writing concepts', 'Basic math notions', 'Vocabulary expansion and expression']
    },
    {
      age: es ? '5 años' : '5 years',
      name: es ? 'Estimulación Kínder' : 'Kinder Stimulation',
      icon: '🎒',
      bg: 'bg-primary/10',
      accentColor: '#ffc500',
      borderClass: 'border-primary',
      textClass: 'text-primary-600',
      desc: es
        ? 'El nivel Kínder busca consolidar habilidades previas y trabajar directamente en la preparación para la transición a la escuela primaria. Fortalecemos de manera prioritaria la autonomía personal, la socialización con pares, la estructuración de rutinas escolares complejas y el desarrollo de funciones ejecutivas.'
        : 'The Kinder level aims to consolidate previous skills and work directly on preparing for the transition to primary school. We prioritize strengthening personal autonomy, socialization with peers, structuring complex school routines, and developing executive functions.',
      highlights: es
        ? ['Preparación para transición a primaria', 'Fortalecimiento de autonomía e higiene', 'Habilidades de socialización grupal', 'Funciones ejecutivas y atención sostenida']
        : ['Preparation for primary transition', 'Autonomy & hygiene strengthening', 'Group socialization skills', 'Executive functions and sustained attention']
    }
  ]

  const conditions = [
    {
      name: es ? 'Trastorno del Espectro Autista (TEA)' : 'Autism Spectrum Disorder (ASD)',
      icon: '🧩',
      desc: es
        ? 'Acompañamiento integral enfocado en comunicación social, reciprocidad, flexibilidad cognitiva, intereses y regulación del procesamiento sensorial.'
        : 'Comprehensive support focused on social communication, reciprocity, cognitive flexibility, interests, and sensory processing regulation.',
      bg: 'bg-accent/5',
      border: 'border-accent/20'
    },
    {
      name: es ? 'Trastorno por Déficit de Atención (TDAH)' : 'Attention Deficit Disorder (ADHD)',
      icon: '🎯',
      desc: es
        ? 'Intervención y estrategias para el control de impulsos, atención sostenida, planificación escolar y autorregulación conductual en el juego y tareas.'
        : 'Intervention and strategies for impulse control, sustained attention, school planning, and behavioral self-regulation in play and tasks.',
      bg: 'bg-secondary/5',
      border: 'border-secondary/20'
    },
    {
      name: es ? 'Retraso Global del Desarrollo' : 'Global Developmental Delay',
      icon: '🌱',
      desc: es
        ? 'Estimulación multisensorial y oportuna en áreas motoras, comunicativas y cognitivas para reducir la brecha del desarrollo en la etapa preescolar.'
        : 'Multisensory and timely stimulation in motor, communicative, and cognitive areas to reduce the developmental gap during preschool years.',
      bg: 'bg-primary/5',
      border: 'border-primary/20'
    },
    {
      name: es ? 'Trastornos de la Comunicación y del Lenguaje' : 'Communication and Language Disorders',
      icon: '🗣️',
      desc: es
        ? 'Desarrollo fonológico, estructuración sintáctica y pragmática. Implementación activa de sistemas aumentativos y alternativos de comunicación (SAAC).'
        : 'Phonological development, syntactic structuring, and pragmatics. Active implementation of augmentative and alternative communication (AAC) systems.',
      bg: 'bg-secondary/5',
      border: 'border-secondary/20'
    },
    {
      name: es ? 'Trastornos del Procesamiento Sensorial' : 'Sensory Processing Disorders',
      icon: '🧸',
      desc: es
        ? 'Regulación y adecuación terapéutica ante hipo o hiperreactividad a estímulos táctiles, auditivos, visuales, propioceptivos o vestibulares.'
        : 'Regulation and therapeutic adaptation for hypo- or hyper-reactivity to tactile, auditory, visual, proprioceptive, or vestibular stimuli.',
      bg: 'bg-accent/5',
      border: 'border-accent/20'
    },
    {
      name: es ? 'Trastornos de la Coordinación y Desarrollo Motor' : 'Coordination and Motor Development Disorders',
      icon: '🤸',
      desc: es
        ? 'Terapia orientada a fortalecer la motricidad fina y gruesa, el control postural, equilibrio y la planificación de movimientos corporales.'
        : 'Therapy aimed at strengthening fine and gross motor skills, postural control, balance, and body movement planning.',
      bg: 'bg-primary/5',
      border: 'border-primary/20'
    }
  ]

  const services = [
    {
      name: es ? 'Detección temprana' : 'Early detection',
      icon: '🔍',
      color: '#8c3cbd',
      bg: 'bg-accent/10',
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
      color: '#229cc2',
      bg: 'bg-secondary/10',
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
      color: '#ffc500',
      bg: 'bg-primary/10',
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
      color: '#8c3cbd',
      bg: 'bg-accent/10',
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
      color: '#229cc2',
      bg: 'bg-secondary/10',
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
      color: '#8c3cbd',
      bg: 'bg-accent/10',
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
      color: '#229cc2',
      bg: 'bg-secondary/10',
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
      color: '#ffc500',
      bg: 'bg-primary/10',
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
      color: '#8c3cbd',
      bg: 'bg-accent/10',
      desc: es 
        ? 'Formación y contención emocional para las familias. Brindamos estrategias prácticas para el hogar y la escuela, y un espacio seguro para compartir y crecer.'
        : 'Training and emotional containment for families. We provide practical strategies for home and school, and a safe space to share and grow.',
      details: es 
        ? ['Psicoeducación familiar', 'Estrategias para el hogar', 'Contención emocional', 'Red de apoyo entre familias']
        : ['Family psychoeducation', 'Home strategies', 'Emotional containment', 'Parent support network']
    },
  ]

  const steps = [
    { n: '1', title: es ? 'Detección' : 'Detection', desc: es ? 'Identificamos señales de alerta mediante screening y observación clínica estructurada.' : 'We identify warning signs through screening and structured clinical observation.', icon: '🔍', color: 'text-accent', bulletColor: 'bg-accent', bg: 'bg-accent/10' },
    { n: '2', title: es ? 'Evaluación' : 'Evaluation', desc: es ? 'El equipo multidisciplinario realiza un diagnóstico integral y diseña el plan de intervención.' : 'The multidisciplinary team performs a comprehensive diagnosis and designs the intervention plan.', icon: '📋', color: 'text-secondary', bulletColor: 'bg-secondary', bg: 'bg-secondary/10' },
    { n: '3', title: es ? 'Intervención' : 'Intervention', desc: es ? 'Se ejecutan las terapias individuales y grupales según el plan personalizado.' : 'Individual and group therapies are executed according to the personalized plan.', icon: '🧩', color: 'text-primary-600', bulletColor: 'bg-primary', bg: 'bg-primary/10' },
    { n: '4', title: es ? 'Seguimiento' : 'Follow-up', desc: es ? 'Evaluamos avances, ajustamos el plan y acompañamos a la familia en cada etapa.' : 'We evaluate progress, adjust the plan, and accompany the family in every stage.', icon: '📊', color: 'text-accent', bulletColor: 'bg-accent', bg: 'bg-accent/10' },
  ]

  const gallery = [
    {
      src: '/images/wawitas/sensory-room.png',
      alt: es ? 'Sala de integración sensorial de Aula Wawitas' : 'Sensory integration room of Aula Wawitas',
      title: es ? 'Sala de Integración Sensorial' : 'Sensory Integration Room',
      desc: es ? 'Espacio adaptado y seguro con equipamiento especializado para estimulación táctil, vestibular y propioceptiva.' : 'Sensory friendly, safe space with specialized equipment for tactile, vestibular, and proprioceptive stimulation.'
    },
    {
      src: '/images/wawitas/therapy-session.png',
      alt: es ? 'Sesión de terapia individual estructurada' : 'Structured individual therapy session',
      title: es ? 'Terapia Individualizada' : 'Individualized Therapy',
      desc: es ? 'Profesionales calificados adaptando el juego y el aprendizaje de acuerdo a las necesidades únicas de cada niño.' : 'Qualified professionals adapting play and learning according to the unique needs of each child.'
    },
    {
      src: '/images/wawitas/learning-activity.png',
      alt: es ? 'Actividades de motricidad y juego cognitivo' : 'Motor skills and cognitive play activities',
      title: es ? 'Experiencias Significativas' : 'Meaningful Experiences',
      desc: es ? 'Fomento de habilidades a través del dibujo, la expresión artística y actividades pedagógicas lúdicas.' : 'Fostering skills through drawing, artistic expression, and playful pedagogical activities.'
    },
    {
      src: '/images/wawitas/outdoor-play.png',
      alt: es ? 'Juego y psicomotricidad al aire libre' : 'Outdoor play and psychomotor activities',
      title: es ? 'Psicomotricidad y Socialización' : 'Psychomotor & Socialization',
      desc: es ? 'Espacios libres al aire libre para promover la coordinación motriz, la socialización y el juego de pares.' : 'Open outdoor spaces to promote motor coordination, peer socialization, and play.'
    }
  ]

  const activeSigns = signs[activeAge]
  const selectedLevel = levels[activeLevel]

  const handlePrevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + gallery.length) % gallery.length)
    }
  }

  const handleNextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % gallery.length)
    }
  }

  return (
    <div className="overflow-x-hidden w-full bg-[#fafbfd]">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[480px] flex items-center bg-gradient-to-br from-[#0b2438] via-[#229cc2] to-[#8c3cbd] py-16 px-4 overflow-hidden">
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
                  className="bg-primary hover:bg-primary/95 text-black font-extrabold text-sm px-8 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-primary/10 min-h-[44px] flex items-center justify-center select-none"
                >
                  {es ? 'Ver servicios' : 'View services'}
                </a>
                <a
                  href="#senales"
                  className="border-2 border-white/20 hover:border-white/50 bg-transparent hover:bg-white/5 text-white font-bold text-sm px-8 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[44px] flex items-center justify-center select-none"
                >
                  {es ? 'Señales de alerta' : 'Warning signs'}
                </a>
              </div>
            </div>

            {/* Ilustración Hero */}
            <div className="relative hidden lg:block select-none">
              <div className="aspect-[4/4.2] rounded-3xl overflow-hidden border-[4.5px] border-white/10 shadow-2xl relative">
                <Image 
                  src="/images/wawitas/sensory-room.png" 
                  alt="Aula Wawitas" 
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8 text-left">
                  <h3 className="font-serif text-xl text-white font-bold mb-1">
                    {es ? 'Sala de Integración Sensorial' : 'Sensory Integration Room'}
                  </h3>
                  <p className="text-xs text-white/80 font-medium">{es ? 'Espacio adaptado para estimulación integral' : 'Adapted space for comprehensive stimulation'}</p>
                </div>
              </div>

              {/* Floating Badge 1 */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 flex items-center gap-3.5 animate-[float_4s_ease-in-out_infinite]">
                <div className="w-11 h-11 rounded-xl bg-accent/10 text-accent flex items-center justify-center text-xl">🔍</div>
                <div className="text-left">
                  <div className="text-xs font-bold text-[#0c2340] leading-tight">{es ? 'Detección' : 'Detection'}</div>
                  <div className="text-[10px] text-gray-400 font-semibold mt-0.5">{es ? 'temprana y oportuna' : 'early and timely'}</div>
                </div>
              </div>

              {/* Floating Badge 2 */}
              <div className="absolute -top-4 -right-4 bg-accent rounded-xl py-2 px-4 shadow-lg shadow-accent/20 flex flex-col items-center justify-center animate-[float_5s_ease-in-out_infinite_1.5s]">
                <span className="font-serif text-xl font-bold text-white leading-none">9</span>
                <span className="text-[9px] text-white/95 font-extrabold uppercase tracking-wider mt-0.5">{es ? 'Servicios' : 'Services'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Program General Description Section */}
      <section className="py-16 md:py-24 px-4 bg-[#fafbfd] border-b border-gray-200/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/15 rounded-full px-4 py-1.5 mb-5 select-none">
                <span className="text-sm">🌟</span>
                <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                  {es ? 'Descripción general' : 'Program Overview'}
                </span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-[#0c2340] font-normal tracking-tight mb-6">
                {es ? 'Desarrollo integral desde los primeros años' : 'Comprehensive Development from Early Years'}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                {es 
                  ? 'El Programa Aula Wawitas es una iniciativa de la Fundación Pro-21 orientada a fortalecer el desarrollo integral de niños y niñas en edad preescolar, mediante experiencias de aprendizaje significativas que respetan el ritmo, las capacidades y las necesidades de cada participante.'
                  : 'The Aula Wawitas Program is an initiative of the Pro-21 Foundation oriented towards strengthening the comprehensive development of preschool children, through meaningful learning experiences that respect the rhythm, capacities, and needs of each participant.'}
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                {es 
                  ? 'A través de actividades lúdicas, pedagógicas y de estimulación temprana, el programa acompaña el desarrollo de habilidades cognitivas, comunicativas, motrices, socioemocionales y de autonomía, favoreciendo una transición progresiva hacia la educación escolar. Asimismo, reconoce el papel fundamental de las familias en el proceso educativo, promoviendo su participación y acompañamiento constante.'
                  : 'Through playful, pedagogical, and early stimulation activities, the program accompanies the development of cognitive, communicative, motor, socioemotional, and autonomy skills, favoring a progressive transition to formal schooling. Furthermore, it recognizes the fundamental role of families in the educational process, promoting their participation and constant guidance.'}
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {es 
                  ? 'El Programa Aula Wawitas se organiza en diferentes niveles de estimulación, adecuados a la etapa de desarrollo de cada niño o niña, con el propósito de brindar oportunidades de aprendizaje que fortalezcan su crecimiento, su participación y su inclusión desde los primeros años de vida.'
                  : 'The Aula Wawitas Program is organized into different levels of stimulation, adapted to the development stage of each child, with the purpose of providing learning opportunities that strengthen their growth, participation, and inclusion from the first years of life.'}
              </p>
            </div>
            
            <div className="lg:col-span-6">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden border-[4px] border-white shadow-xl relative select-none">
                <Image 
                  src="/images/wawitas/therapy-session.png" 
                  alt="Sesión terapéutica en Aula Wawitas" 
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Stimulation Levels Section */}
      <section className="py-16 md:py-24 px-4 bg-[#f7f5f0] border-b border-gray-200/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">🎒</span>
              <span className="text-xs font-bold uppercase tracking-wider text-primary-700">
                {es ? 'Niveles de estimulación' : 'Stimulation Levels'}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0c2340] font-normal tracking-tight mb-4">
              {es ? 'Niveles de atención según edad' : 'Levels of Attention by Age'}
            </h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
              {es 
                ? 'Estructura pedagógica y de estimulación diseñada a la medida del desarrollo de cada grupo de edad.'
                : 'Pedagogical and stimulation structure customized for the development of each age group.'}
            </p>
          </div>

          {/* Level Selector buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10 max-w-3xl mx-auto">
            {levels.map((lvl, index) => {
              const isSelected = activeLevel === index
              return (
                <button
                  key={index}
                  onClick={() => setActiveLevel(index)}
                  className={`flex-1 p-4 rounded-2xl border-2 text-left transition-all duration-300 focus:outline-none flex items-center gap-3.5 select-none ${
                    isSelected 
                      ? `${lvl.borderClass} bg-white shadow-md scale-[1.02]`
                      : 'border-gray-200 bg-white/70 hover:bg-white text-gray-500'
                  }`}
                >
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center text-2xl flex-shrink-0 shadow-inner ${isSelected ? lvl.bg : 'bg-gray-100'}`}>
                    {lvl.icon}
                  </div>
                  <div>
                    <div className={`text-[10px] font-bold tracking-wider uppercase ${isSelected ? lvl.textClass : 'text-gray-400'}`}>
                      {lvl.age}
                    </div>
                    <div className="text-xs font-bold text-gray-900 mt-0.5">
                      {lvl.name}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Active Level Detail Display */}
          {selectedLevel && (
            <div className="max-w-4xl mx-auto animate-[fadeSlideUp_0.4s_ease-out]">
              <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-md grid grid-cols-1 md:grid-cols-12">
                <div className={`md:col-span-4 ${selectedLevel.bg} p-8 flex flex-col items-center justify-center text-center relative border-b md:border-b-0 md:border-r border-gray-100 min-h-[200px]`}>
                  <span className="text-6xl mb-3 animate-bounce select-none">{selectedLevel.icon}</span>
                  <span className={`text-xs font-bold uppercase tracking-wider ${selectedLevel.textClass} px-3 py-1 bg-white rounded-full shadow-sm`}>
                    {selectedLevel.age}
                  </span>
                </div>
                
                <div className="md:col-span-8 p-8 md:p-10 text-left">
                  <h3 className="font-serif text-2xl text-[#0c2340] font-bold mb-4">
                    {selectedLevel.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">
                    {selectedLevel.desc}
                  </p>

                  <div className="border-t border-gray-100 pt-5">
                    <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase block mb-3">
                      {es ? 'Acciones y enfoques principales:' : 'Actions & Main Focus:'}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {selectedLevel.highlights.map((h, i) => (
                        <div key={i} className={`flex items-center gap-2.5 p-2 rounded-xl text-xs font-semibold text-gray-700 ${selectedLevel.bg}`}>
                          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: selectedLevel.accentColor }} />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. Conditions Attended Section */}
      <section className="py-16 md:py-24 px-4 bg-[#fafbfd] border-b border-gray-200/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">🏥</span>
              <span className="text-xs font-bold uppercase tracking-wider text-accent">
                {es ? 'Condiciones de atención' : 'Conditions Attended'}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0c2340] font-normal tracking-tight mb-4">
              {es ? 'Condiciones que atendemos además del autismo' : 'Conditions We Support Besides Autism'}
            </h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
              {es 
                ? 'Brindamos acompañamiento terapéutico y pedagógico integral a diversas condiciones del neurodesarrollo en edad preescolar.'
                : 'We provide comprehensive therapeutic and pedagogical support for various neurodevelopmental conditions in preschool age.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left max-w-5xl mx-auto">
            {conditions.map((c, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl ${c.bg} flex items-center justify-center text-2xl mb-5 shadow-sm border border-black/5 select-none`}>
                    {c.icon}
                  </div>
                  <h4 className="font-serif text-lg text-[#0c2340] font-bold mb-3 leading-snug">
                    {c.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-primary/5 border border-primary/20 rounded-3xl p-6 text-left flex items-start gap-4 max-w-2xl mx-auto shadow-sm">
            <span className="text-3xl select-none">💡</span>
            <div>
              <h5 className="text-sm font-bold text-primary-700 mb-1">
                {es ? 'Evaluaciones de desarrollo personalizadas' : 'Personalized Developmental Evaluations'}
              </h5>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {es 
                  ? 'No se requiere un diagnóstico formal previo. Realizamos evaluaciones multidisciplinarias para comprender el perfil individual de su hijo en todas las áreas de desarrollo.'
                  : 'A formal prior diagnosis is not required. We perform multidisciplinary evaluations to understand your child\'s individual profile across all developmental areas.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Pillars Section */}
      <section className="py-16 px-4 bg-[#fafbfd] border-b border-gray-200/50">
        <div className="container mx-auto max-w-6xl">
          
          <div className="text-center mb-12 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">🧭</span>
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
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
                <div className="w-8 h-1 bg-gray-200 rounded-full mt-6 group-hover:bg-primary transition-colors" />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Early Warning Signs Section */}
      <section id="senales" className="py-16 md:py-24 px-4 bg-[#f7f5f0] border-b border-gray-200/50">
        <div className="container mx-auto max-w-5xl">
          
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">⚠️</span>
              <span className="text-xs font-bold uppercase tracking-wider text-accent">
                {es ? 'Detección temprana' : 'Early detection'}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0c2340] font-normal tracking-tight mb-4">
              {es ? '¿Cuándo consultar? Señales de alerta' : 'When to consult? Warning signs'}
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              {es 
                ? 'Identificar las señales a tiempo es clave. Si observas alguna de estas conductas, no esperes — una evaluación puede hacer la diferencia.'
                : 'Identifying warning signs early is key. If you observe any of these behaviors, do not wait — an evaluation can make a difference.'}
            </p>
          </div>

          {/* Selector de edad */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {signs.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveAge(i)}
                className={`px-6 py-2.5 rounded-full border-2 font-bold text-xs sm:text-sm transition-all focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center select-none ${
                  activeAge === i 
                    ? 'border-accent bg-accent/10 text-accent shadow-sm' 
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
                    className="bg-white rounded-2xl p-5 border border-gray-200 flex items-center gap-4 transition-all hover:border-accent/20 hover:translate-x-1"
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent font-serif text-base font-bold flex items-center justify-center flex-shrink-0 select-none">
                      {i + 1}
                    </div>
                    <span className="text-xs sm:text-sm text-gray-700 font-semibold">{sign}</span>
                  </div>
                ))}
              </div>

              {/* Nota Informativa */}
              <div className="mt-8 bg-accent/5 border border-accent/15 rounded-2xl p-5 text-left flex items-start gap-4 max-w-2xl mx-auto">
                <span className="text-2xl select-none">💡</span>
                <div>
                  <h5 className="text-xs sm:text-sm font-bold text-accent mb-1">
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

      {/* 7. Services Section */}
      <section id="servicios" className="py-16 md:py-24 px-4 bg-[#fafbfd]">
        <div className="container mx-auto max-w-6xl">
          
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">🩺</span>
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">
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
                className="bg-gradient-to-br from-accent/5 to-white rounded-3xl p-6 md:p-8 border-2 border-accent/15 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex flex-col sm:flex-row items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent-600 text-white flex items-center justify-center text-3xl shadow-lg shadow-accent/25 flex-shrink-0 select-none">
                    {s.icon}
                  </div>
                  <div>
                    <span className="inline-block text-[9px] font-bold px-2 py-0.5 bg-accent/10 text-accent-700 rounded-full uppercase tracking-wider mb-2 select-none">
                      {es ? 'Servicio Clave' : 'Key Service'}
                    </span>
                    <h4 className="font-serif text-lg md:text-xl text-[#0c2340] font-bold mb-3">{s.name}</h4>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-5">{s.desc}</p>
                    <div className="flex flex-wrap gap-1.5 select-none">
                      {s.details.map((d) => (
                        <span key={d} className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-accent/10 bg-white text-xs font-semibold text-gray-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
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
                    isOpen ? 'border-secondary' : 'border-gray-200'
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
                      isOpen ? 'bg-secondary/10 text-secondary rotate-180' : 'bg-gray-50 text-gray-400'
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
                    <div className="px-5 pb-5 pl-5 sm:pl-21 text-left">
                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-4">
                        {s.desc}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 select-none">
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

      {/* 8. Process Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-[#f7f5f0] to-white border-t border-b border-gray-200/50">
        <div className="container mx-auto max-w-5xl">
          
          <div className="text-center mb-16 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">🔄</span>
              <span className="text-xs font-bold uppercase tracking-wider text-accent">
                {es ? 'Proceso de atención' : 'Care Process'}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0c2340] font-normal tracking-tight mb-4">
              {es ? 'Del primer contacto al seguimiento' : 'From first contact to follow-up'}
            </h2>
          </div>

          <div className="relative">
            {/* Línea horizontal en desktop */}
            <div className="hidden lg:block absolute top-[36px] left-[12%] right-[12%] h-[3px] bg-gradient-to-r from-accent via-secondary to-primary rounded-full z-0" />
            
            {/* Pasos en grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {steps.map((s) => (
                <div key={s.n} className="flex flex-col items-center text-center group">
                  <div className={`w-18 h-18 rounded-full border-4 border-white ${s.bulletColor} text-white flex items-center justify-center text-3xl shadow-md transition-transform duration-300 group-hover:scale-105 mb-4`}>
                    {s.icon}
                  </div>
                  <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm w-full">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${s.color}`}>
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

      {/* 9. Interactive Photo Gallery Section */}
      <section className="py-16 md:py-24 px-4 bg-white border-b border-gray-200/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">📸</span>
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                {es ? 'Galería del programa' : 'Program Gallery'}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0c2340] font-normal tracking-tight mb-4">
              {es ? 'Nuestras salas y actividades' : 'Our Rooms and Activities'}
            </h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
              {es 
                ? 'Conoce los ambientes reales y dinámicas que facilitamos diariamente en Aula Wawitas.'
                : 'Explore the real spaces and activities we conduct daily in Aula Wawitas.'}
            </p>
          </div>

          {/* Gallery grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto text-left">
            {gallery.map((img, idx) => (
              <div 
                key={idx}
                onClick={() => setLightboxIndex(idx)}
                className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
              >
                <div className="aspect-[4/3] w-full overflow-hidden relative bg-gray-100 select-none">
                  <Image 
                    src={img.src} 
                    alt={img.alt} 
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-3xl bg-white/20 backdrop-blur-sm w-12 h-12 rounded-full flex items-center justify-center shadow-lg">🔍</span>
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="font-serif text-sm font-bold text-[#0c2340] mb-1">
                    {img.title}
                  </h4>
                  <p className="text-[11px] text-gray-400 leading-snug line-clamp-2">
                    {img.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-gray-400 mt-6 max-w-md mx-auto text-center">
            {es 
              ? '* Fotografías ilustrativas y reales de uso interno bajo consentimiento de tutoría legal.' 
              : '* Illustrative and real photos of internal use under consent of legal guardianship.'}
          </p>
        </div>
      </section>

      {/* 10. Families Support Section */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-gradient-to-br from-accent/5 via-[#fdfbf7] to-primary/5 rounded-3xl p-8 md:p-12 border border-accent/10 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
              
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/15 rounded-full px-4 py-1.5 mb-4 select-none">
                  <span className="text-sm">👨‍👩‍👧</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-accent animate-pulse">
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
                      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-4">
                {[
                  { icon: '🎥', title: es ? 'Sesiones virtuales' : 'Virtual sessions', desc: es ? 'Orientación profesional de Trabajo Social y Psicología.' : 'Professional support from Social Work and Psychology.' },
                  { icon: '🤝', title: es ? 'Grupos de apoyo' : 'Support groups', desc: es ? 'Encuentros para compartir con familias en el mismo camino.' : 'Meetings to share with families on the same path.' },
                  { icon: '📚', title: es ? 'Material educativo' : 'Educational material', desc: es ? 'Guías prácticas y pictogramas visuales para usar en casa.' : 'Practical guides and visual pictograms for home use.' },
                ].map((c) => (
                  <div
                    key={c.title}
                    className="bg-white rounded-2xl p-5 border border-gray-200 flex items-start gap-4 transition-all hover:translate-x-1 text-left"
                  >
                    <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center text-xl flex-shrink-0 shadow-inner select-none">
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

      {/* 11. Enrollment / Contact CTA */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-[#0b2438] via-[#229cc2] to-[#8c3cbd] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          <div className="absolute top-[10%] left-[20%] text-white/5 text-4xl transform rotate-12">🧩</div>
          <div className="absolute bottom-[20%] right-[30%] text-white/5 text-5xl transform -rotate-12">🧩</div>
        </div>

        <div className="container mx-auto max-w-3xl relative z-10 text-center">
          <span className="text-5xl block mb-5 animate-[float_4s_ease-in-out_infinite] select-none">🧩</span>
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

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/59170106276"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25d366] hover:bg-[#25d366]/90 text-white font-extrabold text-sm sm:text-base px-8 py-3.5 sm:py-4 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#25d366]/20 min-h-[44px] flex items-center justify-center gap-2 select-none"
            >
              <span className="text-xl">💬</span>
              {es ? 'Agendar evaluación gratuita — 70106276' : 'Schedule free evaluation — 70106276'}
            </a>
            <Link
              href={`/${lang}/contacto`}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm sm:text-base px-8 py-3.5 sm:py-4 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[44px] flex items-center justify-center select-none"
            >
              {es ? 'Enviar mensaje por formulario' : 'Send message via form'}
            </Link>
          </div>
        </div>
      </section>

      {/* 12. Full Screen Gallery Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 bg-black/95 z-[9999] flex flex-col items-center justify-center p-4 md:p-8 animate-fadeIn">
          {/* Close button */}
          <button 
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white text-4xl font-light transition-colors focus:outline-none z-50 p-2 cursor-pointer"
            aria-label="Close"
          >
            ✕
          </button>

          {/* Navigation Controls */}
          <button 
            onClick={handlePrevImage}
            className="absolute left-4 md:left-8 text-white/50 hover:text-white text-4xl md:text-5xl font-light transition-colors focus:outline-none z-40 p-2 cursor-pointer select-none"
            aria-label="Previous image"
          >
            ‹
          </button>
          
          <button 
            onClick={handleNextImage}
            className="absolute right-4 md:right-8 text-white/50 hover:text-white text-4xl md:text-5xl font-light transition-colors focus:outline-none z-40 p-2 cursor-pointer select-none"
            aria-label="Next image"
          >
            ›
          </button>

          {/* Image and captions container */}
          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center justify-center p-2 relative">
            <div className="w-full max-h-[75vh] aspect-[4/3] relative select-none">
              <Image 
                src={gallery[lightboxIndex].src} 
                alt={gallery[lightboxIndex].alt} 
                fill
                className="object-contain rounded-lg shadow-2xl"
              />
            </div>
            <div className="text-center mt-5 text-white max-w-xl px-4">
              <h4 className="font-serif text-lg font-bold">
                {gallery[lightboxIndex].title}
              </h4>
              <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">
                {gallery[lightboxIndex].desc}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
