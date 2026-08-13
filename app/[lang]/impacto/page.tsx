'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { Locale } from '@/lib/i18n'

interface PageProps {
  params: {
    lang: Locale
  }
}

function Counter({ end, suffix = '', duration = 1500 }: { end: string; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const num = parseInt(end)

  useEffect(() => {
    if (isNaN(num)) return
    let start = 0
    const step = Math.ceil(num / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= num) {
        setCount(num)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [num, duration])

  return <span>{isNaN(num) ? end : count}{suffix}</span>
}

export default function Page({ params: { lang } }: PageProps) {
  const es = lang === 'es'
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [activeFilter, setActiveFilter] = useState(0)

  const stats = [
    { value: '70', suffix: '+', label: es ? 'Familias acompañadas' : 'Families supported', icon: '👨‍👩‍👧', color: '#229cc2', bg: 'bg-secondary/10' },
    { value: '3', suffix: '', label: es ? 'Programas activos' : 'Active programs', icon: '📋', color: '#8c3cbd', bg: 'bg-accent/10' },
    { value: '8', suffix: '', label: es ? 'Años de experiencia' : 'Years of service', icon: '🏛️', color: '#229cc2', bg: 'bg-secondary/10' },
    { value: '10', suffix: '', label: es ? 'Profesionales en el equipo' : 'Staff professionals', icon: '🩺', color: '#229cc2', bg: 'bg-secondary/10' },
    { value: '8', suffix: '', label: es ? 'Áreas terapéuticas' : 'Therapeutic areas', icon: '🧩', color: '#8c3cbd', bg: 'bg-accent/10' },
    { value: '1000', suffix: '+', label: es ? 'Sesiones al año' : 'Sessions per year', icon: '📅', color: '#ffc500', bg: 'bg-primary/15' }
  ]

  const testimonials = [
    {
      quote: es 
        ? 'Cuando recibimos el diagnóstico sentimos que el mundo se detenía. En Lápiz en Mano encontramos no solo terapia, sino una familia que nos enseñó a ver las capacidades antes que las limitaciones.'
        : 'When we received the diagnosis, we felt the world stop. In Lápiz en Mano, we found not only therapy but a family that taught us to see capabilities before limitations.',
      family: 'Familia Quispe',
      program: 'Mi Escuelita Down',
      emoji: '🌟',
      color: '#229cc2'
    },
    {
      quote: es 
        ? 'Mi hijo no hablaba a los 3 años. Después de un año en Aula Wawitas, no solo dice palabras — canta canciones. Cada logro que parece pequeño para otros, para nosotros es un universo.'
        : 'My son did not speak at 3. After a year in Aula Wawitas, he does not just say words — he sings songs. Every achievement that seems small to others is a universe to us.',
      family: 'Familia Mamani',
      program: 'Aula Wawitas',
      emoji: '🧩',
      color: '#8c3cbd'
    },
    {
      quote: es 
        ? 'Los profesores decían que era flojo. Aquí descubrieron que tiene dislexia. Le enseñaron a aprender de otra forma y sus notas cambiaron, pero lo más importante: su autoestima volvió.'
        : 'Teachers said he was lazy. Here they discovered he has dyslexia. They taught him to learn differently, and his grades changed, but most importantly: his self-esteem returned.',
      family: 'Familia Condori',
      program: 'Pasos Firmes',
      emoji: '📚',
      color: '#229cc2'
    }
  ]

  const reports = [
    { year: '2025', title: es ? 'Informe anual de gestión 2025' : '2025 Annual Management Report', desc: es ? 'Resultados, cifras de atención, uso de recursos y proyección.' : 'Results, care figures, resources utilization, and projection.', status: es ? 'Disponible' : 'Available' },
    { year: '2024', title: es ? 'Informe anual de gestión 2024' : '2024 Annual Management Report', desc: es ? 'Segundo año de operaciones con tres programas activos.' : 'Second year of operations with three active programs.', status: es ? 'Disponible' : 'Available' },
    { year: '2023', title: es ? 'Informe anual de gestión 2023' : '2023 Annual Management Report', desc: es ? 'Lanzamiento de Aula Wawitas y expansión de salas.' : 'Launch of Aula Wawitas and sensory room expansion.', status: es ? 'Disponible' : 'Available' },
    { year: '2022', title: es ? 'Informe anual de gestión 2022' : '2022 Annual Management Report', desc: es ? 'Constitución de Fundación PRO-21 y consolidación.' : 'Establishment of PRO-21 Foundation and consolidation.', status: es ? 'Disponible' : 'Available' }
  ]

  const media = [
    { outlet: 'Red Uno de Bolivia', type: es ? 'Televisión' : 'Television', desc: es ? 'Cobertura especial del incidente durante los conflictos en La Paz, visibilizando el centro.' : 'Special coverage of the incident during conflicts in La Paz, making the center visible.', year: '2026', color: '#8c3cbd' },
    { outlet: 'ATB Digital', type: es ? 'Televisión' : 'Television', desc: es ? 'Reportaje sobre los programas de inclusión educativa para niños con síndrome de Down.' : 'Report on educational inclusion programs for children with Down syndrome in Bolivia.', year: '2026', color: '#229cc2' },
    { outlet: 'Página Siete', type: es ? 'Prensa escrita' : 'Press outlet', desc: es ? 'Artículo sobre la labor del Centro Lápiz en Mano y la importancia de la estimulación temprana.' : 'Article on the work of Lápiz en Mano Center and the importance of early stimulation.', year: '2025', color: '#229cc2' },
    { outlet: 'Redes Internacionales', type: es ? 'Digital' : 'Digital media', desc: es ? 'Acompañamiento y notas de solidaridad internacional tras la difusión de prensa.' : 'Accompaniment and international solidarity notes after press releases.', year: '2026', color: '#8c3cbd' }
  ]

  const categories = es 
    ? ['Todos', 'Mi Escuelita', 'Aula Wawitas', 'Pasos Firmes', 'Eventos']
    : ['All', 'Mi Escuelita', 'Aula Wawitas', 'Pasos Firmes', 'Events']

  const activeT = testimonials[activeTestimonial]

  return (
    <div className="overflow-x-hidden w-full bg-gray-50">
      
      {/* 1. Page Hero */}
      <section className="relative min-h-[440px] flex items-center bg-gradient-to-br from-gray-900 via-secondary-700 to-secondary py-16 px-4 overflow-hidden">
        {/* Decoraciones */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          <div className="absolute -top-[15%] -right-[8%] w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full border border-white/5 opacity-30" />
          <div className="absolute -bottom-[20%] -left-[6%] w-[250px] h-[250px] md:w-[400px] md:h-[400px] rounded-full bg-radial-gradient(circle, rgba(232,168,56,0.06), transparent 70%)" />
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 80" fill="none" className="block w-full h-8 md:h-16 lg:h-20 text-[#f9fafb] fill-current">
            <path d="M0 40C360 70 720 15 1080 45C1260 60 1380 50 1440 48V80H0Z" />
          </svg>
        </div>

        <div className="container mx-auto max-w-4xl text-center relative z-20 mt-8">
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full py-1 px-3.5 mb-5 select-none">
            <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] text-black font-extrabold">✦</span>
            <span className="text-white/80 text-xs font-semibold">{es ? 'Impacto y transparencia' : 'Impact & transparency'}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-normal leading-tight mb-4">
            {es ? (
              <>
                Historias que <br />
                <span className="font-bold italic text-primary">transforman vidas</span>
              </>
            ) : (
              <>
                Stories that <br />
                <span className="font-bold italic text-primary">transform lives</span>
              </>
            )}
          </h1>

          <p className="text-sm md:text-base lg:text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
            {es 
              ? 'Detrás de cada cifra hay un niño que encontró su espacio de inclusión. Detrás de cada reporte anual hay un compromiso inquebrantable con la transparencia.'
              : 'Behind every number is a child who found their space of inclusion. Behind every annual report is an unwavering commitment to transparency.'}
          </p>
        </div>
      </section>

      {/* 2. Impact Numbers Strip (Grid 2 columns mobile, 3 desktop) */}
      <section className="py-12 px-4 bg-gray-50 border-b border-gray-200/50">
        <div className="container mx-auto max-w-6xl">
          
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">📊</span>
              <span className="text-xs font-bold uppercase tracking-wider text-primary-700">
                {es ? 'Nuestras cifras' : 'Our metrics'}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#111827] font-normal tracking-tight">
              {es ? 'El impacto consolidado en números' : 'Consolidated impact in numbers'}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
            {stats.map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 h-full"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center text-2xl mb-4 shadow-sm select-none`}>
                    {s.icon}
                  </div>
                  
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 leading-none mb-2">
                    <Counter end={s.value} suffix={s.suffix} />
                  </div>
                  
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                    {s.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. Testimonials Carousel Slider (Touch friendly dots + mini selectors) */}
      <section className="py-16 md:py-24 px-4 bg-[#f9fafb] border-b border-gray-200/50">
        <div className="container mx-auto max-w-4xl text-center">
          
          <div className="text-center mb-10 max-w-md mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#f5edfb] border border-[#8c3cbd]/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">💛</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8c3cbd]">
                {es ? 'Voces de las familias' : 'Voices of families'}
              </span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl text-[#111827] font-normal tracking-tight">
              {es ? 'Lo que dicen de nosotros' : 'What they say about us'}
            </h2>
          </div>

          {activeT && (
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-sm text-left relative overflow-hidden mb-6 animate-[fadeSlideUp_0.5s_cubic-bezier(0.16,1,0.3,1)]">
              <span className="absolute top-2 left-6 font-serif text-8xl text-gray-100 pointer-events-none select-none">&ldquo;</span>
              
              <div className="relative z-10">
                <p className="font-serif text-base sm:text-lg md:text-xl text-[#111827] font-bold italic leading-relaxed mb-6">
                  &ldquo;{activeT.quote}&rdquo;
                </p>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t border-gray-100 pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl text-white select-none shadow-md" style={{ backgroundColor: activeT.color }}>
                      {activeT.emoji}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#111827]">{activeT.family}</h4>
                      <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-0.5">{activeT.program}</p>
                    </div>
                  </div>

                  {/* Paginación */}
                  <div className="flex gap-2 select-none">
                    {testimonials.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveTestimonial(idx)}
                        className={`h-2.5 rounded-full transition-all focus:outline-none min-h-[11px] ${
                          idx === activeTestimonial ? 'w-6 bg-[#ffc500]' : 'w-2.5 bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Botones selectores directos */}
          <div className="grid grid-cols-3 gap-3 select-none">
            {testimonials.map((tm, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTestimonial(idx)}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all duration-300 focus:outline-none min-h-[44px] flex items-center gap-3 ${
                  idx === activeTestimonial 
                    ? 'border-primary bg-white shadow-sm scale-[1.01]' 
                    : 'border-gray-200 bg-white/70 hover:bg-white text-gray-500'
                }`}
              >
                <span className="text-xl">{tm.emoji}</span>
                <div>
                  <div className="text-[10px] font-bold text-gray-900 leading-tight">{tm.family}</div>
                  <div className="text-[8px] text-gray-400 font-semibold truncate max-w-[64px] sm:max-w-xs">{tm.program}</div>
                </div>
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Transparency & Reports Grid (Desktop side-by-side, mobile stacked) */}
      <section className="py-16 md:py-24 px-4 bg-white border-b border-gray-200/50">
        <div className="container mx-auto max-w-6xl">
          
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">🔍</span>
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                {es ? 'Transparencia institucional' : 'Institutional Transparency'}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#111827] font-normal tracking-tight mb-4">
              {es ? 'Rendición de cuentas anual' : 'Annual Accountability'}
            </h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
              {es 
                ? 'La confianza se construye publicando informes de gestión claros para cooperantes, aliados y familias.' 
                : 'Trust is built by publishing clear management reports for partners, allies, and families.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto items-stretch">
            
            {/* Lado izquierdo: Lista de Reportes */}
            <div className="lg:col-span-6 flex flex-col justify-start gap-4 text-left">
              <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-2 select-none">
                {es ? 'Informes Anuales Disponibles' : 'Available Annual Reports'}
              </div>
              <div className="space-y-3">
                {reports.map((r, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 rounded-2xl p-5 border border-gray-200/80 flex items-center justify-between hover:border-secondary/20 transition-all select-none hover:translate-x-1"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white border border-gray-150 flex items-center justify-center text-2xl flex-shrink-0">
                        📊
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#111827] leading-snug">{r.title}</h4>
                        <p className="text-[10px] text-gray-400 font-semibold mt-0.5">{r.desc}</p>
                      </div>
                    </div>
                    
                    <a
                      href="https://wa.me/59170106276"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-secondary/10 text-secondary font-bold text-[9px] uppercase tracking-wider px-3 py-1 rounded-full min-h-[28px] flex items-center justify-center"
                    >
                      {r.status}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Lado derecho: Desglose de contenido */}
            <div className="lg:col-span-6 flex flex-col justify-start gap-4 text-left">
              <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-2 select-none">
                {es ? '¿Qué incluyen nuestros informes?' : 'What do our reports include?'}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  { icon: '👶', title: es ? 'Niños atendidos' : 'Children served', desc: es ? 'Matrícula en cada programa e informes pedagógicos.' : 'Enrollment in each program and pedagogical reports.', bg: 'bg-secondary/10' },
                  { icon: '💰', title: es ? 'Uso de fondos' : 'Use of funds', desc: es ? 'Distribución porcentual por áreas y costo de becas.' : 'Percentage distribution by areas and cost of scholarships.', bg: 'bg-primary/15' },
                  { icon: '📈', title: es ? 'Avances terapéuticos' : 'Therapeutic progress', desc: es ? 'Logros medidos a nivel psicomotor, fonoaudiológico y conductual.' : 'Achievements measured at psychomotor, speech, and behavior levels.', bg: 'bg-secondary/10' },
                  { icon: '🤝', title: es ? 'Convenios firmados' : 'Signed agreements', desc: es ? 'Nuevas alianzas nacionales y de cooperación.' : 'New national and cooperation alliances.', bg: 'bg-secondary/10' }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-sm flex flex-col justify-between"
                  >
                    <div className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center text-xl mb-3 shadow-inner select-none`}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#111827] mb-0.5">{item.title}</h4>
                      <p className="text-[10px] text-gray-400 leading-normal font-semibold">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Media Coverage Grid */}
      <section className="py-16 md:py-24 px-4 bg-[#f9fafb] border-b border-gray-200/50">
        <div className="container mx-auto max-w-6xl">
          
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">📰</span>
              <span className="text-xs font-bold uppercase tracking-wider text-accent">
                {es ? 'Impacto social en medios' : 'Outreach in media'}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#111827] font-normal tracking-tight mb-4">
              {es ? 'Difusión en prensa y televisión' : 'Broadcasting in press and television'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto text-left">
            {media.map((m, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="h-1 w-full" style={{ backgroundColor: m.color }} />
                <div className="p-6 md:p-8 flex flex-col justify-between min-h-[140px]">
                  <div className="flex justify-between items-center mb-4 select-none">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-xs" style={{ backgroundColor: m.color }}>
                        {m.outlet.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#111827] leading-none">{m.outlet}</h4>
                        <span className="text-[9px] text-gray-400 font-semibold mt-1 block">{m.type}</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-400 font-bold px-2 py-0.5 bg-gray-50 rounded-full">{m.year}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Photo Gallery (Grid 2-3-4 cols) */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">📷</span>
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                {es ? 'Galería del centro' : 'Center Gallery'}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#111827] font-normal tracking-tight mb-4">
              {es ? 'Momentos que nos inspiran' : 'Moments that inspire us'}
            </h2>
          </div>

          {/* Categorías de filtro (Flex-wrap en móviles) */}
          <div className="flex flex-wrap gap-2 justify-center mb-8 select-none">
            {categories.map((c, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveFilter(i)}
                className={`px-5 py-2 rounded-full border-2 font-bold text-xs sm:text-sm transition-all focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center ${
                  activeFilter === i 
                    ? 'border-secondary bg-secondary/10 text-secondary shadow-sm' 
                    : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Grid de imágenes simuladas con emojis/estilos decorativos premium */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto select-none">
            {[
              { icon: '🎨', h: 'h-44 sm:h-52', bg: 'bg-secondary/10' },
              { icon: '🤸', h: 'h-52 sm:h-60', bg: 'bg-primary/15' },
              { icon: '📖', h: 'h-44 sm:h-52', bg: 'bg-secondary/10' },
              { icon: '🧩', h: 'h-48 sm:h-56', bg: 'bg-accent/10' },
              { icon: '🎵', h: 'h-48 sm:h-56', bg: 'bg-secondary/10' },
              { icon: '👶', h: 'h-44 sm:h-52', bg: 'bg-accent/10' },
              { icon: '🌟', h: 'h-52 sm:h-60', bg: 'bg-[#e8f7fb]' },
              { icon: '🧠', h: 'h-44 sm:h-52', bg: 'bg-[#f5edfb]' }
            ].map((img, idx) => (
              <div
                key={idx}
                className={`rounded-2xl flex flex-col items-center justify-center gap-2 border border-gray-200 transition-all duration-300 hover:scale-[1.02] hover:shadow-md cursor-pointer ${img.h} ${img.bg}`}
              >
                <span className="text-4xl block animate-pulse">{img.icon}</span>
                <span className="text-[10px] text-gray-400 font-semibold">
                  {es ? `Imagen ${idx + 1}` : `Photo ${idx + 1}`}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center mt-6 select-none">
            <p className="text-[10px] text-gray-400 font-semibold italic">
              {es ? '* Fotografías ilustrativas y reales de uso interno bajo consentimiento de tutoría legal.' : '* Illustrative and real photos of internal use under consent of legal guardianship.'}
            </p>
          </div>

        </div>
      </section>

      {/* 7. Call To Action Footer */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-gray-900 via-secondary-700 to-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient(circle, rgba(232,168,56,0.06), transparent 70%) pointer-events-none" />
        
        <div className="container mx-auto max-w-3xl relative z-10 text-center">
          <span className="text-5xl block mb-5 animate-[float_4s_ease-in-out_infinite] select-none">🌍</span>
          <h2 className="font-serif text-3xl md:text-4xl text-white font-normal leading-tight mb-4">
            {es ? '¿Quieres ser parte de esta transformación?' : 'Want to be part of this transformation?'}
          </h2>
          
          <p className="text-sm md:text-base text-white/70 max-w-xl mx-auto leading-relaxed mb-10">
            {es 
              ? 'Cada boliviano donado, cada hora de voluntariado y cada alianza estratégica multiplica el impacto social, permitiéndonos acoger a más niños y niñas en lista de espera.'
              : 'Every Bolivian Peso donated, every hour of volunteering, and every strategic alliance multiplies the social impact, allowing us to welcome more children on the waiting list.'}
          </p>

          <div className="flex flex-wrap gap-4 justify-center items-center">
            <Link
              href={`/${lang}/colabora`}
              className="bg-primary hover:bg-primary/95 text-black font-extrabold text-sm px-8 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/10 min-h-[44px] flex items-center justify-center"
            >
              {es ? 'Colaborar ahora' : 'Collaborate now'}
            </Link>
            <a
              href="https://wa.me/59170106276"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 hover:border-white/50 bg-white/5 text-white font-bold text-sm px-8 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[44px] flex items-center justify-center"
            >
              {es ? 'Solicitar informes' : 'Request reports'}
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
