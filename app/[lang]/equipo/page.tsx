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
  const [selectedArea, setSelectedArea] = useState<number | null>(null)

  const areas = [
    {
      id: 'fisio',
      name: es ? 'Fisioterapia' : 'Physiotherapy',
      icon: '💪',
      color: '#229cc2',
      colorClass: 'border-secondary text-secondary',
      bg: 'bg-secondary/10',
      desc: es 
        ? 'Intervención desde la estimulación temprana para mejorar el tono muscular, la postura y la movilidad, adaptando ejercicios a cada etapa.'
        : 'Intervention from early stimulation to improve muscle tone, posture, and mobility, adapting exercises to each stage.',
      skills: es 
        ? ['Estimulación temprana motora', 'Rehabilitación neuromuscular', 'Hidroterapia', 'Técnicas de posicionamiento']
        : ['Motor early stimulation', 'Neuromuscular rehabilitation', 'Hydrotherapy', 'Positioning techniques'],
      programs: ['Mi Escuelita Down', 'Aula Wawitas']
    },
    {
      id: 'psicomotricidad',
      name: es ? 'Psicomotricidad' : 'Psychomotor therapy',
      icon: '🤸',
      color: '#8c3cbd',
      colorClass: 'border-accent text-accent',
      bg: 'bg-accent/10',
      desc: es 
        ? 'Fortalecimiento de la coordinación, equilibrio y esquema corporal para favorecer la autonomía, la concentración y la expresión corporal.'
        : 'Strengthening coordination, balance, and body schema to favor autonomy, concentration, and body expression.',
      skills: es 
        ? ['Coordinación motora gruesa y fina', 'Esquema corporal', 'Integración bilateral', 'Equilibrio dinámico y estático']
        : ['Gross & fine motor coordination', 'Body schema', 'Bilateral integration', 'Dynamic & static balance'],
      programs: ['Mi Escuelita Down', 'Aula Wawitas']
    },
    {
      id: 'lenguaje',
      name: es ? 'Terapia de lenguaje' : 'Speech therapy',
      icon: '🗣️',
      color: '#229cc2',
      colorClass: 'border-secondary text-secondary',
      bg: 'bg-secondary/10',
      desc: es 
        ? 'Trabajo en respiración, control orofacial y articulación de sonidos para mejorar la comunicación y el habla de forma divertida y funcional.'
        : 'Work on breathing, orofacial control, and speech sounds articulation to improve communication and speech in a fun, functional way.',
      skills: es 
        ? ['Control orofacial', 'Articulación fonética', 'Comunicación aumentativa', 'Desarrollo del lenguaje expresivo/comprensivo']
        : ['Orofacial control', 'Phonetic articulation', 'Augmentative communication', 'Expressive/receptive language development'],
      programs: ['Mi Escuelita Down', 'Aula Wawitas', 'Pasos Firmes']
    },
    {
      id: 'conducta',
      name: es ? 'Psicología y conducta' : 'Psychology & behavior',
      icon: '🧠',
      color: '#8c3cbd',
      colorClass: 'border-accent text-accent',
      bg: 'bg-accent/10',
      desc: es 
        ? 'Acompañamiento en el desarrollo de habilidades sociales, autorregulación y rutinas positivas dentro del entorno familiar y escolar.'
        : 'Support in developing social skills, self-regulation, and positive routines within the family and school environment.',
      skills: es 
        ? ['Análisis conductual aplicado', 'Habilidades sociales', 'Autorregulación emocional', 'Modificación de conducta']
        : ['Applied behavior analysis', 'Social skills', 'Emotional self-regulation', 'Behavior modification'],
      programs: ['Mi Escuelita Down', 'Aula Wawitas', 'Pasos Firmes']
    },
    {
      id: 'pedagogia',
      name: es ? 'Pedagogía y Parvularia' : 'Pedagogy & Early Years',
      icon: '📖',
      color: '#229cc2',
      colorClass: 'border-secondary text-secondary',
      bg: 'bg-secondary/10',
      desc: es 
        ? 'Adaptaciones curriculares según las capacidades y ritmo de cada niño, promoviendo el aprendizaje significativo y la inclusión educativa.'
        : 'Curricular adaptations based on each child\'s capabilities and pace, promoting meaningful learning and educational inclusion.',
      skills: es 
        ? ['Adaptaciones curriculares', 'Técnicas de estudio', 'Lectoescritura adaptada', 'Estimulación temprana escolar']
        : ['Curricular adaptations', 'Study techniques', 'Adapted literacy', 'Early school stimulation'],
      programs: ['Mi Escuelita Down', 'Pasos Firmes']
    },
    {
      id: 'social',
      name: es ? 'Trabajo social' : 'Social Work',
      icon: '🤝',
      color: '#8c3cbd',
      colorClass: 'border-accent text-accent',
      bg: 'bg-accent/10',
      desc: es 
        ? 'Orientación, acompañamiento social y contención emocional para las familias, estructurando la red de apoyo necesaria en el hogar.'
        : 'Guidance, social support, and emotional containment for families, structuring the necessary support network at home.',
      skills: es 
        ? ['Evaluación familiar socioeconómica', 'Contención emocional', 'Orientación a padres', 'Gestión de redes de apoyo']
        : ['Family socioeconomic evaluation', 'Emotional containment', 'Parent guidance', 'Support network management'],
      programs: ['Mi Escuelita Down', 'Aula Wawitas', 'Pasos Firmes']
    }
  ]

  const team = [
    {
      id: 'belen-lazcano',
      name: 'Belen Lazcano Quispe',
      role: es ? 'Lic. Fisioterapia y Kinesiología' : 'B.S. Physiotherapy and Kinesiology',
      specialty: es ? 'Fisioterapia Pediátrica y Neurodesarrollo' : 'Pediatric Physiotherapy & Neurodevelopment',
      bio: es 
        ? 'Especialista en estimulación temprana motora y rehabilitación neuromuscular infantil. Acompaña a la primera infancia en el desarrollo del tono muscular y la postura.'
        : 'Specialist in motor early stimulation and child neuromuscular rehabilitation. Accompanies early childhood in the development of muscle tone and posture.',
      photo: '/images/equipo/belen-lazcano.jpg',
      initials: 'BL',
      areaId: 'fisio',
      color: '#229cc2',
      bg: 'bg-secondary/10'
    },
    {
      id: 'wara-valdivia',
      name: 'Wara Belen Valdivia',
      role: es ? 'Lic. Psicomotricidad' : 'B.S. Psychomotor Therapy',
      specialty: es ? 'Psicomotricidad Educativa y Terapéutica' : 'Educational and Therapeutic Psychomotricity',
      bio: es 
        ? 'Experta en el desarrollo de la coordinación motora, esquema corporal, lateralidad e integración sensorial a través de circuitos lúdicos adaptados.'
        : 'Expert in the development of motor coordination, body schema, laterality, and sensory integration through adapted play circuits.',
      photo: '/images/equipo/wara-valdivia.jpg',
      initials: 'WV',
      areaId: 'psicomotricidad',
      color: '#8c3cbd',
      bg: 'bg-accent/10'
    },
    {
      id: 'yasmanni-peralta',
      name: 'Yasmanni German Peralta Mendoza',
      role: es ? 'Lic. Terapia de Lenguaje' : 'B.S. Speech Therapy',
      specialty: es ? 'Fonoaudiología y Terapia del Lenguaje' : 'Speech-Language Pathology & Speech Therapy',
      bio: es 
        ? 'Especialista en trastornos del habla, deglución y comunicación funcional. Experto en el diseño e implementación de sistemas aumentativos de comunicación (SAAC).'
        : 'Specialist in speech, swallowing, and functional communication disorders. Expert in the design and implementation of augmentative communication systems (AAC).',
      photo: '/images/equipo/yasmanni-peralta.png',
      initials: 'YP',
      areaId: 'lenguaje',
      color: '#229cc2',
      bg: 'bg-secondary/10'
    },
    {
      id: 'monica-medina',
      name: 'Mónica Mikaela Medina Rosales',
      role: es ? 'Lic. Psicología Clínica' : 'B.S. Clinical Psychology',
      specialty: es ? 'Psicología Clínica Infantil y Neurodesarrollo' : 'Child Clinical Psychology & Neurodevelopment',
      bio: es 
        ? 'Especialista en evaluación diagnóstica, análisis funcional de la conducta y diseño de intervenciones terapéuticas adaptadas al perfil individual de cada niño.'
        : 'Specialist in diagnostic evaluation, functional behavior analysis, and design of therapeutic interventions adapted to each child\'s individual profile.',
      photo: '/images/equipo/monica-medina.jpg',
      initials: 'MM',
      areaId: 'conducta',
      color: '#8c3cbd',
      bg: 'bg-accent/10'
    },
    {
      id: 'ana-copa',
      name: 'Ana Valentina Copa Rosales',
      role: es ? 'Lic. Psicología' : 'B.S. Psychology',
      specialty: es ? 'Psicología del Aprendizaje y Conducta' : 'Learning & Behavioral Psychology',
      bio: es 
        ? 'Licenciada en Psicología, especializada en estrategias de autorregulación emocional, modificación de conducta y estimulación de habilidades de interacción social.'
        : 'B.S. in Psychology, specialized in emotional self-regulation strategies, behavior modification, and stimulation of social interaction skills.',
      photo: '/images/equipo/ana-copa.png',
      initials: 'AC',
      areaId: 'conducta',
      color: '#8c3cbd',
      bg: 'bg-accent/10'
    },
    {
      id: 'luis-machicado',
      name: 'Luis Enrique Machicado Cahuaya',
      role: es ? 'Lic. Psicología' : 'B.S. Psychology',
      specialty: es ? 'Modificación de Conducta y Socialización' : 'Behavior Modification & Socialization',
      bio: es 
        ? 'Psicólogo con enfoque cognitivo-conductual. Trabaja en la estructuración de rutinas adaptativas, juego conjunto e inclusión escolar en el aula regular.'
        : 'Psychologist with cognitive-behavioral approach. Works on the structuring of adaptive routines, joint play, and school inclusion in the regular classroom.',
      photo: '',
      initials: 'LM',
      areaId: 'conducta',
      color: '#8c3cbd',
      bg: 'bg-accent/10'
    },
    {
      id: 'helan-medrano',
      name: 'Helan Paola Medrano López',
      role: es ? 'Lic. Psicología Infantil' : 'B.S. Child Psychology',
      specialty: es ? 'Psicología Infantil y Contención Familiar' : 'Child Psychology & Family Counseling',
      bio: es 
        ? 'Especialista en psicoterapia infantil, contención emocional familiar ante el diagnóstico y dinámicas de juego lúdico-terapéutico grupal.'
        : 'Specialist in child psychotherapy, family emotional support during diagnosis, and group play-therapy dynamics.',
      photo: '',
      initials: 'HM',
      areaId: 'conducta',
      color: '#8c3cbd',
      bg: 'bg-accent/10'
    },
    {
      id: 'megan',
      name: 'Megan',
      role: es ? 'Parvularia y Apoyo Pedagógico' : 'Early Childhood & Pedagogical Support',
      specialty: es ? 'Educación Especial y Adaptaciones Curriculares' : 'Special Education & Curriculum Adaptations',
      bio: es 
        ? 'Educadora infantil experta en adaptaciones en el aula regular, metodologías multisensoriales de lectura y escritura, y aprestamiento preescolar inclusivo.'
        : 'Early educator expert in regular classroom adaptations, multisensory reading and writing methodologies, and inclusive preschool readiness.',
      photo: '/images/equipo/megan.jpg',
      initials: 'ME',
      areaId: 'pedagogia',
      color: '#229cc2',
      bg: 'bg-secondary/10'
    },
    {
      id: 'benita-rosales',
      name: 'Benita Isabel Rosales',
      role: es ? 'Lic. Trabajo Social' : 'B.S. Social Work',
      specialty: es ? 'Trabajo Social Familiar e Inclusión' : 'Family Social Work & Inclusion Support',
      bio: es 
        ? 'Especialista en orientación familiar, visitas domiciliarias de valoración socioeconómica y estructuración de redes de apoyo en comunidad.'
        : 'Specialist in family guidance, home visits for socioeconomic assessment, and structuring community support networks.',
      photo: '/images/equipo/benita-rosales.jpg',
      initials: 'BR',
      areaId: 'social',
      color: '#8c3cbd',
      bg: 'bg-accent/10'
    }
  ]

  const stats = [
    { n: '10+', l: es ? 'Profesionales' : 'Staff members', icon: '👩‍⚕️', color: '#229cc2', bg: 'bg-secondary/10' },
    { n: '6', l: es ? 'Áreas de especialidad' : 'Specialized areas', icon: '🏥', color: '#8c3cbd', bg: 'bg-accent/10' },
    { n: '3', l: es ? 'Programas activos' : 'Active programs', icon: '📋', color: '#229cc2', bg: 'bg-secondary/10' },
    { n: '100%', l: es ? 'Dedicación integral' : 'Dedicated care', icon: '💛', color: '#ffc500', bg: 'bg-primary/15' }
  ]

  const volunteers = ['Paola', 'Wanda', 'Alejandra']

  const selectedData = selectedArea !== null ? areas[selectedArea] : null

  // Filter team members based on the selected area
  const filteredTeam = selectedData 
    ? team.filter(m => m.areaId === selectedData.id) 
    : team

  return (
    <div className="overflow-x-hidden w-full bg-gray-50">
      
      {/* 1. Page Hero */}
      <section className="relative bg-accent overflow-hidden">
        {/* Decoraciones */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/4" />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/60 text-xs mb-8">
            <Link href={`/${lang}`} className="hover:text-white transition-colors">{es ? 'Inicio' : 'Home'}</Link>
            <span>/</span>
            <span className="text-white font-semibold">{es ? 'Equipo' : 'Team'}</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-1.5 mb-5">
            <span className="text-xs font-bold uppercase tracking-wider text-white select-none">
              {es ? 'Nuestro equipo' : 'Our team'}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-normal leading-tight mb-4">
            {es ? (
              <>
                Profesionales con <br />
                <span className="font-bold italic text-primary">vocación y amor</span>
              </>
            ) : (
              <>
                Professionals with <br />
                <span className="font-bold italic text-primary">vocation and love</span>
              </>
            )}
          </h1>

          <p className="text-sm md:text-base lg:text-lg text-white/80 max-w-2xl leading-relaxed">
            {es
              ? 'Un equipo multidisciplinario que trabaja de forma coordinada, poniendo al niño y su familia en el centro de cada intervención para lograr avances significativos.'
              : 'A multidisciplinary team working coordinately, placing the child and family at the center of every intervention to achieve meaningful progress.'}
          </p>
        </div>

        {/* Ola inferior */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full h-8 md:h-12 fill-gray-50">
            <path d="M0 30C360 60 1080 0 1440 30V60H0Z" />
          </svg>
        </div>
      </section>

      {/* 2. Stats Bar Strip */}
      <section className="bg-gray-50 py-10 px-4 border-b border-gray-200/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col items-center text-center transition-all duration-300 hover:shadow-md select-none"
              >
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 leading-none">{s.n}</div>
                <div className="text-xs text-gray-400 font-semibold mt-2">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Philosophy of Work */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">🩺</span>
              <span className="text-xs font-bold uppercase tracking-wider text-primary-700">
                {es ? 'Filosofía de trabajo' : 'Work philosophy'}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#111827] font-normal tracking-tight mb-4">
              {es ? '¿Qué significa ser multidisciplinario?' : 'What does multidisciplinary mean?'}
            </h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
              {es 
                ? 'No es sólo tener muchas especialidades bajo un mismo techo. Es un equipo que piensa, planifica y actúa coordinadamente por y para el niño.' 
                : 'It is not just having many specialties under one roof. It is a team that thinks, plans, and acts coordinately by and for the child.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              { icon: '🔄', title: es ? 'Trabajo coordinado' : 'Coordinated work', desc: es ? 'Todas las áreas comparten información y diseñan planes conjuntos, evitando intervenciones aisladas.' : 'All areas share information and design joint plans, avoiding isolated interventions.' },
              { icon: '👁️', title: es ? 'Mirada integral' : 'Integral view', desc: es ? 'No tratamos síntomas: acompañamos a una persona completa en sus dimensiones física, cognitiva, emocional y social.' : 'We do not treat symptoms: we support a whole person in their physical, cognitive, emotional, and social dimensions.' },
              { icon: '👨‍👩‍👧', title: es ? 'Familia como aliada' : 'Family as ally', desc: es ? 'Los padres y madres no son espectadores: son parte activa de la terapia, con orientación continua.' : 'Parents are not spectators: they are active participants in therapy, with continuous guidance.' },
              { icon: '📊', title: es ? 'Evaluación continua' : 'Continuous evaluation', desc: es ? 'Cada plan de intervención se revisa periódicamente según los avances y necesidades individuales.' : 'Each intervention plan is periodically reviewed based on individual progress and needs.' }
            ].map((p, i) => (
              <div
                key={i}
                className="bg-gray-50 border border-gray-200 rounded-3xl p-6 flex flex-col justify-between hover:shadow-sm hover:border-gray-300 transition-all duration-300 h-full"
              >
                <div>
                  <div className="text-3xl mb-4 select-none">{p.icon}</div>
                  <h4 className="font-serif text-base text-[#111827] font-bold mb-2">{p.title}</h4>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Areas Grid Filter & Staff Profile Cards List */}
      <section className="py-16 md:py-24 px-4 bg-[#f9fafb] border-t border-b border-gray-200/50">
        <div className="container mx-auto max-w-6xl">
          
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">🏥</span>
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                {es ? 'Áreas de especialidad' : 'Specialized Areas'}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#111827] font-normal tracking-tight mb-4">
              {es ? 'Conoce a Nuestro Equipo' : 'Meet Our Team'}
            </h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
              {es 
                ? 'Filtra por área para conocer a los profesionales, su especialidad y formación complementaria.' 
                : 'Filter by area to meet the professionals, their specialty, and educational background.'}
            </p>
          </div>

          {/* Tarjetas de áreas (Filtros interactivos) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto text-left mb-12">
            {areas.map((a, i) => {
              const isSelected = selectedArea === i
              return (
                <div
                  key={a.id}
                  onClick={() => setSelectedArea(isSelected ? null : i)}
                  className={`bg-white rounded-2xl overflow-hidden border cursor-pointer shadow-sm transition-all duration-300 hover:shadow-md ${
                    isSelected ? 'border-primary shadow-[#229cc2]/5 scale-[1.01]' : 'border-gray-200/80 hover:border-gray-300'
                  }`}
                >
                  <div className="h-1 w-full" style={{ backgroundColor: a.color }} />
                  <div className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${isSelected ? 'bg-primary text-black' : a.bg}`}>
                        {a.icon}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#111827] leading-snug">
                          {a.name}
                        </h4>
                        <span className="text-[9px] text-gray-400 font-semibold block mt-0.5">
                          {team.filter(m => m.areaId === a.id).length} {es ? 'Profesionales' : 'Staff'}
                        </span>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-transform duration-300 ${isSelected ? 'bg-primary/20 text-[#111827] rotate-180' : 'bg-gray-50 text-gray-400'}`}>
                      ▾
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Competencies of the active area */}
          {selectedData && (
            <div className="max-w-5xl mx-auto mb-10 text-left bg-white rounded-3xl border border-gray-200/80 p-6 md:p-8 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center animate-fadeIn">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl text-white shadow-md flex-shrink-0 select-none" style={{ backgroundColor: selectedData.color }}>
                {selectedData.icon}
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
                  {es ? 'Competencias de esta área' : 'Competencies in this area'}
                </span>
                <h4 className="font-serif text-lg font-bold text-[#111827] mb-2">{selectedData.name}</h4>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">{selectedData.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedData.skills.map((s, idx) => (
                    <span key={idx} className={`text-xs font-semibold px-3 py-1 rounded-xl text-gray-700 ${selectedData.bg}`}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <button 
                onClick={() => setSelectedArea(null)}
                className="text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors uppercase self-end md:self-center bg-gray-50 hover:bg-gray-100 border border-gray-200 px-3.5 py-1.5 rounded-full select-none"
              >
                {es ? 'Limpiar filtro' : 'Clear filter'}
              </button>
            </div>
          )}

          {/* Team Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
            {filteredTeam.map((m) => {
              const matchedArea = areas.find(a => a.id === m.areaId)
              return (
                <div
                  key={m.id}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="p-6 md:p-8 flex flex-col items-center text-center">
                    {/* Circle Image / Placeholder */}
                    <div className="relative w-28 h-28 rounded-full overflow-hidden bg-gray-100 border-[3.5px] border-white shadow-md mb-5 group select-none flex items-center justify-center">
                      {m.photo ? (
                        <Image 
                          src={m.photo} 
                          alt={`Foto de ${m.name}`} 
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className={`w-full h-full flex items-center justify-center font-serif text-3xl font-bold ${m.bg} text-gray-800 transition-transform duration-300 group-hover:scale-105`}>
                          {m.initials}
                        </div>
                      )}
                    </div>

                    {/* Member Information */}
                    <h3 className="font-serif text-lg font-bold text-[#111827] leading-snug">
                      {m.name}
                    </h3>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#111827]/60 mt-1 select-none">
                      {m.role}
                    </p>

                    {/* Specialty Badge */}
                    <span 
                      className={`text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mt-3 border select-none`}
                      style={{ color: m.color, backgroundColor: `${m.bg.replace('bg-[', '').replace(']', '')}35`, borderColor: `${m.color}15` }}
                    >
                      {matchedArea?.name || ''}
                    </span>

                    <div className="w-12 h-0.5 bg-gray-100 my-4" />

                    {/* Specialty description */}
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 select-none">
                      {es ? 'Especialidad médica' : 'Medical Specialty'}
                    </div>
                    <p className="text-xs font-bold text-gray-700 mb-4 px-2">
                      {m.specialty}
                    </p>

                    {/* Short bio */}
                    <p className="text-xs text-gray-500 leading-relaxed px-1">
                      {m.bio}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* 5. Organizational Network */}
      <section className="py-16 md:py-24 px-4 bg-white border-b border-gray-200/50">
        <div className="container mx-auto max-w-5xl">
          
          <div className="text-center mb-12 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">🔗</span>
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                {es ? 'Trabajo en red' : 'Network work'}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#111827] font-normal tracking-tight mb-4">
              {es ? 'El niño y su familia en el centro' : 'The child and family at the center'}
            </h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
              {es 
                ? 'Cada profesional aporta desde su especialidad, pero todos interactúan con el mismo núcleo: el bienestar pleno de la familia.'
                : 'Each professional contributes from their specialty, but all interact with the same core: the family\'s full well-being.'}
            </p>
          </div>

          {/* DIAGRAMA ORG: */}
          
          {/* Versión Desktop: Red circular interactiva */}
          <div className="hidden md:block relative w-[480px] h-[480px] mx-auto select-none">
            {/* Nodo Central */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-gradient-to-br from-primary to-[#ffc500] flex flex-col items-center justify-center text-center shadow-lg shadow-primary/20 z-20">
              <span className="text-2xl mb-0.5 block">👧</span>
              <span className="font-serif text-[10px] text-[#111827] font-bold leading-tight">
                {es ? 'El Niño y' : 'The Child &'}<br />{es ? 'su Familia' : 'Family'}
              </span>
            </div>

            {/* Anillos conectores de fondo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border border-gray-200 border-dashed" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full border border-primary/20 border-dashed" />

            {/* Nodos periféricos */}
            {areas.map((a, i) => {
              const angle = (i * 360) / areas.length - 90
              const rad = (angle * Math.PI) / 180
              const radius = 170
              const x = 240 + radius * Math.cos(rad)
              const y = 240 + radius * Math.sin(rad)
              return (
                <div
                  key={a.id}
                  style={{ left: `${x - 30}px`, top: `${y - 30}px` }}
                  className="absolute w-16 h-16 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col items-center justify-center hover:scale-110 hover:border-primary hover:shadow-md transition-all duration-300 z-10"
                  title={a.name}
                >
                  <span className="text-xl block">{a.icon}</span>
                  <span className="text-[8px] font-extrabold text-gray-400 mt-1 max-w-[50px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {a.name.split(' ')[0]}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Versión Móvil: Lista simplificada con cascada (stacked vertical nodes) */}
          <div className="block md:hidden max-w-sm mx-auto text-left select-none relative">
            <div className="absolute left-[26px] top-6 bottom-6 w-0.5 bg-dashed border-l border-primary/30" />
            
            {/* Nodo Central (Móvil) */}
            <div className="relative flex items-center gap-4 bg-gradient-to-r from-primary to-[#ffc500] p-4 rounded-2xl shadow-sm z-10 mb-8 max-w-[280px]">
              <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-xl shadow-inner flex-shrink-0">
                👧
              </div>
              <div>
                <h4 className="font-serif text-sm text-[#111827] font-bold leading-tight">{es ? 'El Niño y su Familia' : 'The Child and Family'}</h4>
                <p className="text-[10px] text-[#111827]/60 font-semibold uppercase mt-0.5">{es ? 'Centro de la red' : 'Red Core'}</p>
              </div>
            </div>

            {/* Nodos Periféricos (Móvil) */}
            <div className="space-y-4">
              {areas.map((a) => (
                <div key={a.id} className="relative flex items-center gap-4 pl-12">
                  <div className="absolute left-4 w-6 h-0.5 bg-primary/30" />
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-xl shadow-sm flex-shrink-0 z-10">
                    {a.icon}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#111827]">{a.name}</h5>
                    <p className="text-[9px] text-gray-400 font-semibold">{es ? 'Intervención integral' : 'Integral Care'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 6. Volunteers List */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl text-center">
          
          <div className="text-center mb-10 max-w-md mx-auto">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">🤝</span>
              <span className="text-xs font-bold uppercase tracking-wider text-accent">
                {es ? 'Voluntariado' : 'Volunteering'}
              </span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl text-[#111827] font-normal tracking-tight mb-2">
              {es ? 'Nuestros Voluntarios' : 'Our Volunteers'}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              {es 
                ? 'Agradecemos de corazón a quienes dedican su tiempo y energía a apoyar de forma desinteresada a la fundación.' 
                : 'We sincerely thank those who donate their time and energy to selflessly support our foundation.'}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            {volunteers.map((v) => (
              <div
                key={v}
                className="bg-white border border-gray-200 rounded-full py-2.5 px-6 shadow-sm flex items-center gap-2.5 hover:border-primary hover:shadow-md transition-all duration-300"
              >
                <span className="text-gray-400 select-none">👤</span>
                <span className="text-xs sm:text-sm font-bold text-gray-700">{v}</span>
                <span className="text-[10px] text-accent font-bold px-2 py-0.5 bg-accent/10 rounded-full select-none">
                  {es ? 'Voluntaria' : 'Volunteer'}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. Join Team CTA */}
      <section className="py-16 md:py-24 px-4 bg-accent relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/4" />
        </div>

        <div className="container mx-auto max-w-3xl relative z-10 text-center">
          <span className="text-5xl block mb-5 select-none">🩺</span>
          <h2 className="font-serif text-3xl md:text-4xl text-white font-normal leading-tight mb-4">
            {es ? '¿Quieres unirte a nuestro equipo?' : 'Want to join our team?'}
          </h2>

          <p className="text-sm md:text-base text-white/80 max-w-xl mx-auto leading-relaxed mb-8">
            {es
              ? 'Buscamos fisioterapeutas, psicopedagogos, fonoaudiólogos, psicólogos clínicos y educadores que deseen poner su conocimiento al servicio de la inclusión integral en La Paz.'
              : 'We look for physiotherapists, psychopedagogues, speech therapists, clinical psychologists, and educators who wish to put their knowledge at the service of integral inclusion in La Paz.'}
          </p>

          <div className="flex flex-wrap gap-4 justify-center items-center">
            <Link
              href={`/${lang}/contacto`}
              className="bg-primary hover:bg-primary/95 text-black font-extrabold text-sm px-8 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/10 min-h-[44px] flex items-center justify-center select-none"
            >
              {es ? 'Postular ahora' : 'Apply now'}
            </Link>
            <Link
              href={`/${lang}/colabora`}
              className="border-2 border-white/30 hover:border-white/60 bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-8 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[44px] flex items-center justify-center select-none"
            >
              {es ? 'Ser voluntario' : 'Become a volunteer'}
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
