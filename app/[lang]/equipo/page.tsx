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
  const [selectedArea, setSelectedArea] = useState<number | null>(null)

  const areas = [
    {
      id: 'fisio',
      name: es ? 'Fisioterapia' : 'Physiotherapy',
      icon: '💪',
      color: '#2466a8',
      colorClass: 'border-[#2466a8] text-[#2466a8]',
      bg: 'bg-[#e8f1fa]',
      desc: es 
        ? 'Intervención desde la estimulación temprana para mejorar el tono muscular, la postura y la movilidad, adaptando ejercicios a cada etapa.'
        : 'Intervention from early stimulation to improve muscle tone, posture, and mobility, adapting exercises to each stage.',
      skills: es 
        ? ['Estimulación temprana motora', 'Rehabilitación neuromuscular', 'Hidroterapia', 'Técnicas de posicionamiento']
        : ['Motor early stimulation', 'Neuromuscular rehabilitation', 'Hydrotherapy', 'Positioning techniques'],
      programs: ['Mi Escuelita Down', 'Aula Wawitas'],
      members: [
        { name: 'Belen Lazcano Quispe', role: es ? 'Lic. Fisioterapia y Kinesiología' : 'B.S. Physiotherapy and Kinesiology' }
      ]
    },
    {
      id: 'psicomotricidad',
      name: es ? 'Psicomotricidad' : 'Psychomotor therapy',
      icon: '🤸',
      color: '#e86840',
      colorClass: 'border-[#e86840] text-[#e86840]',
      bg: 'bg-[#fef0e8]',
      desc: es 
        ? 'Fortalecimiento de la coordinación, equilibrio y esquema corporal para favorecer la autonomía, la concentración y la expresión corporal.'
        : 'Strengthening coordination, balance, and body schema to favor autonomy, concentration, and body expression.',
      skills: es 
        ? ['Coordinación motora gruesa y fina', 'Esquema corporal', 'Integración bilateral', 'Equilibrio dinámico y estático']
        : ['Gross & fine motor coordination', 'Body schema', 'Bilateral integration', 'Dynamic & static balance'],
      programs: ['Mi Escuelita Down', 'Aula Wawitas'],
      members: [
        { name: 'Wara Belen Valdivia', role: es ? 'Lic. Psicomotricidad' : 'B.S. Psychomotricity' }
      ]
    },
    {
      id: 'lenguaje',
      name: es ? 'Terapia de lenguaje' : 'Speech therapy',
      icon: '🗣️',
      color: '#1a8a7d',
      colorClass: 'border-[#1a8a7d] text-[#1a8a7d]',
      bg: 'bg-[#e0f5f0]',
      desc: es 
        ? 'Trabajo en respiración, control orofacial y articulación de sonidos para mejorar la comunicación y el habla de forma divertida y funcional.'
        : 'Work on breathing, orofacial control, and speech sounds articulation to improve communication and speech in a fun, functional way.',
      skills: es 
        ? ['Control orofacial', 'Articulación fonética', 'Comunicación aumentativa', 'Desarrollo del lenguaje expresivo/comprensivo']
        : ['Orofacial control', 'Phonetic articulation', 'Augmentative communication', 'Expressive/receptive language development'],
      programs: ['Mi Escuelita Down', 'Aula Wawitas', 'Pasos Firmes'],
      members: [
        { name: 'Yasmanni German Peralta Mendoza', role: es ? 'Lic. Terapia de Lenguaje' : 'B.S. Speech Therapy' }
      ]
    },
    {
      id: 'conducta',
      name: es ? 'Psicología y conducta' : 'Psychology & behavior',
      icon: '🧠',
      color: '#6c5ce7',
      colorClass: 'border-[#6c5ce7] text-[#6c5ce7]',
      bg: 'bg-[#f0edff]',
      desc: es 
        ? 'Acompañamiento en el desarrollo de habilidades sociales, autorregulación y rutinas positivas dentro del entorno familiar y escolar.'
        : 'Support in developing social skills, self-regulation, and positive routines within the family and school environment.',
      skills: es 
        ? ['Análisis conductual aplicado', 'Habilidades sociales', 'Autorregulación emocional', 'Modificación de conducta']
        : ['Applied behavior analysis', 'Social skills', 'Emotional self-regulation', 'Behavior modification'],
      programs: ['Mi Escuelita Down', 'Aula Wawitas', 'Pasos Firmes'],
      members: [
        { name: 'Mónica Mikaela Medina Rosales', role: es ? 'Lic. Psicología Clínica' : 'B.S. Clinical Psychology' },
        { name: 'Ana Valentina Copa Rosales', role: es ? 'Lic. Psicología' : 'B.S. Psychology' },
        { name: 'Luis Enrique Machicado Cahuaya', role: es ? 'Lic. Psicología' : 'B.S. Psychology' },
        { name: 'Helan Paola Medrano López', role: es ? 'Lic. Psicología Infantil' : 'B.S. Child Psychology' }
      ]
    },
    {
      id: 'pedagogia',
      name: es ? 'Pedagogía y Parvularia' : 'Pedagogy & Early Years',
      icon: '📖',
      color: '#2d8a4e',
      colorClass: 'border-[#2d8a4e] text-[#2d8a4e]',
      bg: 'bg-[#e5f5eb]',
      desc: es 
        ? 'Adaptaciones curriculares según las capacidades y ritmo de cada niño, promoviendo el aprendizaje significativo y la inclusión educativa.'
        : 'Curricular adaptations based on each child\'s capabilities and pace, promoting meaningful learning and educational inclusion.',
      skills: es 
        ? ['Adaptaciones curriculares', 'Técnicas de estudio', 'Lectoescritura adaptada', 'Estimulación temprana escolar']
        : ['Curricular adaptations', 'Study techniques', 'Adapted literacy', 'Early school stimulation'],
      programs: ['Mi Escuelita Down', 'Pasos Firmes'],
      members: [
        { name: 'Megan', role: es ? 'Parvularia y Apoyo Pedagógico' : 'Early Childhood Educator' }
      ]
    },
    {
      id: 'social',
      name: es ? 'Trabajo social' : 'Social Work',
      icon: '🤝',
      color: '#e84393',
      colorClass: 'border-[#e84393] text-[#e84393]',
      bg: 'bg-[#fdf2f8]',
      desc: es 
        ? 'Orientación, acompañamiento social y contención emocional para las familias, estructurando la red de apoyo necesaria en el hogar.'
        : 'Guidance, social support, and emotional containment for families, structuring the necessary support network at home.',
      skills: es 
        ? ['Evaluación familiar socioeconómica', 'Contención emocional', 'Orientación a padres', 'Gestión de redes de apoyo']
        : ['Family socioeconomic evaluation', 'Emotional containment', 'Parent guidance', 'Support network management'],
      programs: ['Mi Escuelita Down', 'Aula Wawitas', 'Pasos Firmes'],
      members: [
        { name: 'Benita Isabel Rosales', role: es ? 'Lic. Trabajo Social' : 'B.S. Social Work' }
      ]
    }
  ]

  const stats = [
    { n: '10+', l: es ? 'Profesionales' : 'Staff members', icon: '👩‍⚕️', color: '#2466a8', bg: 'bg-[#e8f1fa]' },
    { n: '6', l: es ? 'Áreas de especialidad' : 'Specialized areas', icon: '🏥', color: '#e86840', bg: 'bg-[#fef0e8]' },
    { n: '3', l: es ? 'Programas activos' : 'Active programs', icon: '📋', color: '#2d8a4e', bg: 'bg-[#e5f5eb]' },
    { n: '100%', l: es ? 'Dedicación integral' : 'Dedicated care', icon: '💛', color: '#e8a838', bg: 'bg-[#fdf6e3]' }
  ]

  const volunteers = ['Paola', 'Wanda', 'Alejandra']

  const selectedData = selectedArea !== null ? areas[selectedArea] : null

  return (
    <div className="overflow-x-hidden w-full bg-[#fafbfd]">
      
      {/* 1. Page Hero */}
      <section className="relative min-h-[400px] flex items-center bg-gradient-to-br from-[#0c2340] via-[#142d4c] to-[#2466a8] py-16 px-4 overflow-hidden">
        {/* Decoraciones */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          <div className="absolute -top-[15%] -right-[8%] w-[350px] h-[350px] md:w-[550px] md:h-[550px] rounded-full border border-white/5 opacity-30 animate-pulse" />
          <div className="absolute -bottom-[20%] -left-[6%] w-[250px] h-[250px] md:w-[450px] md:h-[450px] rounded-full bg-radial-gradient(circle, rgba(232,168,56,0.06), transparent 70%)" />
          <div className="absolute top-[20%] left-[10%] text-white/5 text-4xl">💪</div>
          <div className="absolute bottom-[30%] right-[15%] text-white/5 text-4xl">🧠</div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 80" fill="none" className="block w-full h-8 md:h-16 lg:h-20 text-[#fafbfd] fill-current">
            <path d="M0 45C360 15 720 65 1080 35C1260 20 1380 30 1440 28V80H0Z" />
          </svg>
        </div>

        <div className="container mx-auto max-w-4xl text-center relative z-20 mt-8">
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full py-1 px-3.5 mb-5 select-none">
            <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] text-black font-extrabold">✦</span>
            <span className="text-white/80 text-xs font-semibold">{es ? 'Nuestro equipo' : 'Our team'}</span>
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

          <p className="text-sm md:text-base lg:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            {es 
              ? 'Un equipo multidisciplinario que trabaja de forma coordinada, poniendo al niño y su familia en el centro de cada intervención para lograr avances significativos.'
              : 'A multidisciplinary team working coordinately, placing the child and family at the center of every intervention to achieve meaningful progress.'}
          </p>
        </div>
      </section>

      {/* 2. Stats Bar Strip */}
      <section className="bg-[#fafbfd] py-10 px-4 border-b border-gray-200/50">
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
            <div className="inline-flex items-center gap-2 bg-[#fdf6e3] border border-[#e8a838]/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">🩺</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#e8a838]">
                {es ? 'Filosofía de trabajo' : 'Work philosophy'}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0c2340] font-normal tracking-tight mb-4">
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
                className="bg-[#fafbfd] border border-gray-200 rounded-3xl p-6 flex flex-col justify-between hover:shadow-sm hover:border-gray-300 transition-all duration-300 h-full"
              >
                <div>
                  <div className="text-3xl mb-4 select-none">{p.icon}</div>
                  <h4 className="font-serif text-base text-[#0c2340] font-bold mb-2">{p.title}</h4>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Areas Grid & Staff List (Interactive selection) */}
      <section className="py-16 md:py-24 px-4 bg-[#f7f5f0] border-t border-b border-gray-200/50">
        <div className="container mx-auto max-w-6xl">
          
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#e8f1fa] border border-[#2466a8]/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">🏥</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2466a8]">
                {es ? 'Áreas de especialidad' : 'Specialized Areas'}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0c2340] font-normal tracking-tight mb-4">
              {es ? 'Nuestro Equipo Profesional por Áreas' : 'Our Professional Team by Areas'}
            </h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
              {es 
                ? 'Haz clic en cualquier área para conocer a los profesionales, sus competencias y los programas en los que intervienen.' 
                : 'Click on any area to meet the professionals, their competencies, and the programs they support.'}
            </p>
          </div>

          {/* Tarjetas de áreas (1 col en mobile, 2 en tablet, 3 en desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
            {areas.map((a, i) => {
              const isSelected = selectedArea === i
              return (
                <div
                  key={a.id}
                  onClick={() => setSelectedArea(isSelected ? null : i)}
                  className={`bg-white rounded-3xl overflow-hidden border cursor-pointer shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                    isSelected ? 'border-primary shadow-[#2466a8]/5' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="h-1.5 w-full" style={{ backgroundColor: a.color }} />
                  
                  <div className="p-6 flex flex-col justify-between min-h-[180px]">
                    <div>
                      <div className="flex items-center justify-between mb-4 select-none">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${isSelected ? 'bg-primary text-black' : a.bg}`}>
                          {a.icon}
                        </div>
                        <div className="flex gap-1.5">
                          {a.programs.slice(0, 2).map((pr) => (
                            <span key={pr} className="text-[8px] sm:text-[9px] font-bold px-2 py-0.5 bg-gray-100 rounded-full text-gray-400">
                              {pr.split(' ').pop()}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <h4 className="font-serif text-base md:text-lg text-[#0c2340] font-bold mb-2">
                        {a.name}
                      </h4>
                      <p className="text-xs text-gray-400 line-clamp-2">
                        {a.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-center select-none">
                      <span className="text-xs font-bold flex items-center gap-1" style={{ color: a.color }}>
                        {isSelected ? (es ? 'Ocultar detalle' : 'Hide details') : (es ? 'Ver profesionales' : 'View professionals')}
                        <span className={`transition-transform duration-300 ${isSelected ? 'rotate-180' : ''}`}>▾</span>
                      </span>
                    </div>
                  </div>

                </div>
              )
            })}
          </div>

          {/* Panel de detalles del área seleccionada */}
          {selectedData && (
            <div className="max-w-5xl mx-auto mt-8 text-left animate-[fadeSlideUp_0.4s_cubic-bezier(0.16,1,0.3,1)]">
              <div className="bg-white rounded-3xl border border-gray-200 shadow-md overflow-hidden">
                
                {/* Cabecera del detalle */}
                <div className={`p-6 md:p-8 flex flex-col sm:flex-row items-start gap-6 border-b border-gray-100`} style={{ background: `linear-gradient(135deg, ${selectedData.bg.replace('bg-[', '').replace(']', '')}15, white)` }}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-md text-white flex-shrink-0 select-none" style={{ backgroundColor: selectedData.color }}>
                    {selectedData.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl text-[#0c2340] font-bold mb-2">{selectedData.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{selectedData.desc}</p>
                  </div>
                  <button
                    onClick={() => setSelectedArea(null)}
                    className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors select-none"
                  >
                    ✕
                  </button>
                </div>

                {/* Contenido del detalle */}
                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                  
                  {/* Competencias */}
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-4 select-none">
                      {es ? 'Competencias del área' : 'Area Competencies'}
                    </div>
                    <div className="flex flex-col gap-2">
                      {selectedData.skills.map((sk) => (
                        <div key={sk} className={`flex items-center gap-2.5 p-2 rounded-xl text-xs font-semibold text-gray-700 ${selectedData.bg}`}>
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: selectedData.color }} />
                          <span>{sk}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Profesionales asignados */}
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-4 select-none">
                      {es ? 'Profesionales' : 'Staff Members'}
                    </div>
                    <div className="flex flex-col gap-3">
                      {selectedData.members.map((m, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center font-serif text-sm font-bold text-gray-700 flex-shrink-0 select-none">
                            👤
                          </div>
                          <div>
                            <div className="text-xs sm:text-sm font-bold text-[#0c2340]">{m.name}</div>
                            <div className="text-[10px] text-gray-400 font-semibold">{m.role}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Programas relacionados */}
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-4 select-none">
                      {es ? 'Presente en programas' : 'Active in Programs'}
                    </div>
                    <div className="flex flex-col gap-2.5">
                      {selectedData.programs.map((pr) => {
                        const iconMap: Record<string, string> = {
                          'Mi Escuelita Down': '🌟',
                          'Aula Wawitas': '🧩',
                          'Pasos Firmes': '📚'
                        }
                        return (
                          <div key={pr} className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-200/50">
                            <span className="text-xl select-none">{iconMap[pr] || '📋'}</span>
                            <span className="text-xs font-bold text-[#0c2340]">{pr}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                </div>

              </div>
            </div>
          )}

        </div>
      </section>

      {/* 5. Organizational Network (Adaptive Circular Network: Circle on Desktop, Vertical/Cascading layout on Mobile) */}
      <section className="py-16 md:py-24 px-4 bg-white border-b border-gray-200/50">
        <div className="container mx-auto max-w-5xl">
          
          <div className="text-center mb-12 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#e5f5eb] border border-[#2d8a4e]/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">🔗</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2d8a4e]">
                {es ? 'Trabajo en red' : 'Network work'}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0c2340] font-normal tracking-tight mb-4">
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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-gradient-to-br from-primary to-[#e8a838] flex flex-col items-center justify-center text-center shadow-lg shadow-primary/20 z-20">
              <span className="text-2xl mb-0.5 block">👧</span>
              <span className="font-serif text-[10px] text-[#0c2340] font-bold leading-tight">
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
            <div className="relative flex items-center gap-4 bg-gradient-to-r from-primary to-[#e8a838] p-4 rounded-2xl shadow-sm z-10 mb-8 max-w-[280px]">
              <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-xl shadow-inner flex-shrink-0">
                👧
              </div>
              <div>
                <h4 className="font-serif text-sm text-[#0c2340] font-bold leading-tight">{es ? 'El Niño y su Familia' : 'The Child and Family'}</h4>
                <p className="text-[10px] text-[#0c2340]/60 font-semibold uppercase mt-0.5">{es ? 'Centro de la red' : 'Red Core'}</p>
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
                    <h5 className="text-xs font-bold text-[#0c2340]">{a.name}</h5>
                    <p className="text-[9px] text-gray-400 font-semibold">{es ? 'Intervención integral' : 'Integral Care'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 6. Volunteers List */}
      <section className="py-16 px-4 bg-[#fafbfd]">
        <div className="container mx-auto max-w-4xl text-center">
          
          <div className="text-center mb-10 max-w-md mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#fdf2f8] border border-[#e84393]/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">🤝</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#e84393]">
                {es ? 'Voluntariado' : 'Volunteering'}
              </span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl text-[#0c2340] font-normal tracking-tight mb-2">
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
      <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-[#0c2340] via-[#142d4c] to-[#2466a8] relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient(circle, rgba(232,168,56,0.06), transparent 70%) pointer-events-none" />
        
        <div className="container mx-auto max-w-3xl relative z-10 text-center">
          <span className="text-5xl block mb-5 animate-[float_4s_ease-in-out_infinite]">🩺</span>
          <h2 className="font-serif text-3xl md:text-4xl text-white font-normal leading-tight mb-4">
            {es ? '¿Quieres unirte a nuestro equipo?' : 'Want to join our team?'}
          </h2>
          
          <p className="text-sm md:text-base text-white/70 max-w-xl mx-auto leading-relaxed mb-8">
            {es 
              ? 'Buscamos fisioterapeutas, psicopedagogos, fonoaudiólogos, psicólogos clínicos y educadores que deseen poner su conocimiento al servicio de la inclusión integral en La Paz.'
              : 'We look for physiotherapists, psychopedagogues, speech therapists, clinical psychologists, and educators who wish to put their knowledge at the service of integral inclusion in La Paz.'}
          </p>

          <div className="flex flex-wrap gap-4 justify-center items-center">
            <Link
              href={`/${lang}/contacto`}
              className="bg-primary hover:bg-primary/95 text-black font-extrabold text-sm px-8 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/10 min-h-[44px] flex items-center justify-center"
            >
              {es ? 'Postular ahora' : 'Apply now'}
            </Link>
            <Link
              href={`/${lang}/colabora`}
              className="border border-white/20 hover:border-white/50 bg-white/5 text-white font-bold text-sm px-8 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[44px] flex items-center justify-center"
            >
              {es ? 'Ser voluntario' : 'Become a volunteer'}
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
