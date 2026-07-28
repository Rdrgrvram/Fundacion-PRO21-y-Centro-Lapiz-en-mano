'use client'
import { useState } from 'react'
import Link from 'next/link'
import type { Locale } from '@/lib/i18n'

interface HomeProgramsProps {
  lang: Locale
}

export default function HomePrograms({ lang }: HomeProgramsProps) {
  const [active, setActive] = useState<number | null>(null)
  const es = lang === 'es'

  const programs = [
    {
      id: 'escuelita-down',
      emoji: '🌟',
      name: es ? 'Mi Escuelita Inclusiva Down' : 'Mi Escuelita Inclusiva Down',
      slogan: es ? 'Creciendo sin límites' : 'Growing without limits',
      color: 'border-[#2466a8]',
      textColor: 'text-[#2466a8]',
      bgColor: 'bg-[#e8f1fa]',
      badgeColor: 'bg-[#e8f1fa] text-[#2466a8]',
      gradient: 'from-[#e8f1fa] to-white',
      btnAccent: 'bg-[#2466a8] text-white hover:bg-[#2466a8]/90',
      levels: [
        { age: '0–2', name: es ? 'Manos chiquitas' : 'Little hands', icon: '🍼' },
        { age: '3–7', name: es ? 'Aventuras sin límites' : 'Limitless adventures', icon: '🎨' },
        { age: '8–14', name: es ? 'Oportunidades para todos' : 'Opportunities for all', icon: '📖' },
        { age: '15+', name: es ? 'Programa Crecer' : 'Crecer Program', icon: '🌱' },
      ],
      services: es 
        ? ['Estimulación temprana', 'Terapia de lenguaje', 'Psicomotricidad', 'Fisioterapia', 'Integración sensorial', 'Habilidades adaptativas', 'Apoyo pedagógico', 'Orientación familiar']
        : ['Early stimulation', 'Speech therapy', 'Psychomotricity', 'Physiotherapy', 'Sensory integration', 'Adaptive skills', 'Pedagogical support', 'Family orientation'],
      desc: es 
        ? 'Programa especializado para niños, niñas y adolescentes con síndrome de Down. Potenciamos sus habilidades, fortalecemos su autonomía y favorecemos una inclusión plena a través de intervenciones adaptadas a cada etapa de desarrollo.'
        : 'Specialized program for children and adolescents with Down syndrome. We empower their abilities, strengthen their autonomy, and foster full inclusion through interventions adapted to each stage of development.',
    },
    {
      id: 'aula-wawitas',
      emoji: '🧩',
      name: es ? 'Aula Wawitas' : 'Aula Wawitas',
      slogan: es ? 'Comprender, acompañar y potenciar' : 'Understand, support and empower',
      color: 'border-[#e86840]',
      textColor: 'text-[#e86840]',
      bgColor: 'bg-[#fef0e8]',
      badgeColor: 'bg-[#fef0e8] text-[#e86840]',
      gradient: 'from-[#fef0e8] to-white',
      btnAccent: 'bg-[#e86840] text-white hover:bg-[#e86840]/90',
      levels: [],
      services: es 
        ? ['Detección temprana', 'Evaluación multidisciplinaria', 'Terapia conductual', 'Terapia de lenguaje', 'Psicomotricidad', 'Fisioterapia', 'Integración sensorial', 'Orientación nutricional', 'Acompañamiento familiar']
        : ['Early detection', 'Multidisciplinary evaluation', 'Behavioral therapy', 'Speech therapy', 'Psychomotricity', 'Physiotherapy', 'Sensory integration', 'Nutritional guidance', 'Family support'],
      desc: es 
        ? 'Programa especializado para niños y niñas con autismo y otras condiciones del neurodesarrollo. Brindamos atención temprana e integral, respetando las características individuales y el ritmo de cada niño.'
        : 'Specialized program for children with autism and other neurodevelopmental conditions. We provide early and comprehensive care, respecting individual characteristics and the pace of each child.',
    },
    {
      id: 'pasos-firmes',
      emoji: '📚',
      name: es ? 'Pasos Firmes' : 'Pasos Firmes',
      slogan: es ? 'Aprender también puede ser diferente' : 'Learning can also be different',
      color: 'border-[#2d8a4e]',
      textColor: 'text-[#2d8a4e]',
      bgColor: 'bg-[#e5f5eb]',
      badgeColor: 'bg-[#e5f5eb] text-[#2d8a4e]',
      gradient: 'from-[#e5f5eb] to-white',
      btnAccent: 'bg-[#2d8a4e] text-white hover:bg-[#2d8a4e]/90',
      levels: [],
      services: es 
        ? ['Dificultades de lectura y escritura', 'Atención y concentración', 'Razonamiento cognitivo', 'Maduración neuropsicológica', 'Apoyo psicopedagógico', 'Técnicas de estudio', 'Orientación familiar']
        : ['Reading and writing difficulties', 'Attention and concentration', 'Cognitive reasoning', 'Neuropsychological maturation', 'Psychopedagogical support', 'Study techniques', 'Family orientation'],
      desc: es 
        ? 'Programa para niños y niñas con dificultades en el aprendizaje, atención o desempeño escolar. Identificamos necesidades específicas y desarrollamos estrategias terapéuticas y pedagógicas personalizadas.'
        : 'Program for children with difficulties in learning, attention, or school performance. We identify specific needs and develop personalized therapeutic and pedagogical strategies.',
    },
  ]

  return (
    <section className="bg-[#fafbfd] py-16 md:py-24 border-b border-gray-100">
      <div className="container mx-auto px-4">
        
        {/* Header de Sección */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#fdf6e3] border border-[#e8a838]/20 rounded-full px-4 py-1.5 mb-4 shadow-sm select-none">
            <span className="text-sm">💛</span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#e86840]">
              {es ? 'Nuestros programas' : 'Our programs'}
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#0c2340] font-normal tracking-tight mb-4">
            {es ? 'Tres caminos, un propósito' : 'Three paths, one purpose'}
          </h2>
          <p className="text-sm md:text-base text-gray-500 max-w-lg mx-auto leading-relaxed">
            {es 
              ? 'Programas terapéuticos y educativos adaptados a las necesidades únicas de cada niño y su familia.' 
              : 'Therapeutic and educational programs tailored to the unique needs of each child and their family.'}
          </p>
        </div>

        {/* Grid de Programas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {programs.map((prog, i) => {
            const isActive = active === i
            return (
              <div
                key={prog.id}
                onClick={() => setActive(isActive ? null : i)}
                className={`group rounded-3xl bg-white border-2 overflow-hidden shadow-sm hover:shadow-md cursor-pointer transition-all duration-500 transform ${
                  isActive 
                    ? `${prog.color} -translate-y-1.5 shadow-lg shadow-black/5` 
                    : 'border-gray-200'
                }`}
              >
                {/* Header de la tarjeta */}
                <div className={`p-8 relative bg-gradient-to-br ${prog.gradient} border-b border-gray-100`}>
                  <div className="absolute top-6 right-6 text-4xl opacity-15 select-none transition-transform duration-500 group-hover:scale-110">
                    {prog.emoji}
                  </div>
                  
                  <div className={`w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-3xl mb-5 border border-gray-100 transition-all duration-300 ${isActive ? 'scale-110 shadow-inner' : ''}`}>
                    {prog.emoji}
                  </div>
                  
                  <h3 className="font-serif text-xl md:text-2xl text-[#0c2340] font-bold leading-snug mb-1">
                    {prog.name}
                  </h3>
                  <p className={`text-xs font-bold italic tracking-wide ${prog.textColor}`}>
                    &ldquo;{prog.slogan}&rdquo;
                  </p>
                </div>

                {/* Cuerpo de la tarjeta */}
                <div className="p-8">
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">
                    {prog.desc}
                  </p>

                  {/* Niveles (sólo si existen) */}
                  {prog.levels.length > 0 && (
                    <div className="mb-6">
                      <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-3">
                        {es ? 'Niveles por edad' : 'Levels by age'}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {prog.levels.map((l) => (
                          <div
                            key={l.age}
                            className={`flex items-center gap-2 p-2 rounded-xl text-xs font-semibold text-gray-700 ${prog.bgColor}`}
                          >
                            <span className="text-base select-none">{l.icon}</span>
                            <span>{l.age} {es ? 'años' : 'years'}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Lista expandible de servicios */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      isActive ? 'max-h-[500px] opacity-100 mb-6' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-3 pt-3 border-t border-gray-100">
                      {es 
                        ? `${prog.services.length} Servicios especializados` 
                        : `${prog.services.length} Specialized services`}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      {prog.services.map((s) => (
                        <div
                          key={s}
                          className={`flex items-center gap-2.5 p-2 rounded-xl text-xs font-medium text-gray-700 ${prog.bgColor}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${prog.btnAccent.split(' ')[0]} flex-shrink-0`} />
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pie de la tarjeta */}
                  <div className="flex items-center justify-between mt-4">
                    <div className={`flex items-center gap-1.5 text-xs font-bold ${prog.textColor}`}>
                      <span>{isActive ? (es ? 'Ver menos' : 'Hide details') : (es ? 'Ver servicios' : 'Show services')}</span>
                      <span className={`transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}>▾</span>
                    </div>

                    {isActive && (
                      <Link
                        href={`/${lang}/${prog.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className={`text-xs font-extrabold py-2.5 px-4.5 rounded-full border border-gray-200 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[44px] flex items-center justify-center ${prog.bgColor} ${prog.textColor} hover:bg-white`}
                      >
                        {es ? 'Programa completo →' : 'Full program →'}
                      </Link>
                    )}
                  </div>

                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
