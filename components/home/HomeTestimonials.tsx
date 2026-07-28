'use client'
import { useState, useEffect } from 'react'
import type { Locale } from '@/lib/i18n'
import type { Testimonial as TestimonialType } from '@/lib/content'

interface HomeTestimonialsProps {
  lang: Locale
  testimonials: TestimonialType[]
}

export default function HomeTestimonials({ lang, testimonials }: HomeTestimonialsProps) {
  const [active, setActive] = useState(0)
  const es = lang === 'es'

  // Testimonios de respaldo bilingües
  const fallbackTestimonials = [
    {
      family: es ? 'Familia Quispe' : 'Quispe Family',
      program: es ? 'Mi Escuelita Down' : 'Mi Escuelita Down',
      body: es 
        ? 'Cuando recibimos el diagnóstico sentimos que el mundo se detenía. En Lápiz en Mano encontramos no solo terapia, sino una familia que nos enseñó a ver las capacidades antes que las limitaciones.'
        : 'When we received the diagnosis, we felt that the world stopped. In Lápiz en Mano we found not only therapy, but a family that taught us to see capabilities rather than limitations.',
      emoji: '🌟',
      color: 'text-[#2466a8]',
      bgColor: 'bg-[#e8f1fa]',
      borderColor: 'border-[#2466a8]/20',
      shadowColor: 'shadow-[#2466a8]/10'
    },
    {
      family: es ? 'Familia Mamani' : 'Mamani Family',
      program: es ? 'Aula Wawitas' : 'Aula Wawitas',
      body: es 
        ? 'Mi hijo no hablaba a los 3 años. Después de un año en Aula Wawitas, no solo dice palabras: canta canciones. Cada logro que parece pequeño para otros, para nosotros es un universo completo.'
        : 'My son did not speak at 3 years old. After a year in Aula Wawitas, he not only says words: he sings songs. Every achievement that seems small to others, for us is a whole universe.',
      emoji: '🧩',
      color: 'text-[#e86840]',
      bgColor: 'bg-[#fef0e8]',
      borderColor: 'border-[#e86840]/20',
      shadowColor: 'shadow-[#e86840]/10'
    },
    {
      family: es ? 'Familia Condori' : 'Condori Family',
      program: es ? 'Pasos Firmes' : 'Pasos Firmes',
      body: es 
        ? 'Los profesores decían que era flojo. Aquí descubrieron que tiene dislexia. Le enseñaron a aprender de otra forma y sus notas cambiaron. Pero lo más importante: su autoestima volvió.'
        : 'The teachers said he was lazy. Here they discovered he has dyslexia. They taught him to learn in a different way and his grades changed. But most importantly: his self-esteem returned.',
      emoji: '📚',
      color: 'text-[#2d8a4e]',
      bgColor: 'bg-[#e5f5eb]',
      borderColor: 'border-[#2d8a4e]/20',
      shadowColor: 'shadow-[#2d8a4e]/10'
    }
  ]

  // Consolidar datos
  const items = testimonials.length > 0 
    ? testimonials.map((t, idx) => {
        // Enlazar con colores decorativos
        const colors = [
          { emoji: '🌟', color: 'text-[#2466a8]', bgColor: 'bg-[#e8f1fa]', borderColor: 'border-[#2466a8]/20', shadowColor: 'shadow-[#2466a8]/10' },
          { emoji: '🧩', color: 'text-[#e86840]', bgColor: 'bg-[#fef0e8]', borderColor: 'border-[#e86840]/20', shadowColor: 'shadow-[#e86840]/10' },
          { emoji: '📚', color: 'text-[#2d8a4e]', bgColor: 'bg-[#e5f5eb]', borderColor: 'border-[#2d8a4e]/20', shadowColor: 'shadow-[#2d8a4e]/10' }
        ]
        const c = colors[idx % colors.length]
        return {
          family: t.family,
          program: t.program,
          body: t.body,
          ...c
        }
      })
    : fallbackTestimonials

  // Rotación automática
  useEffect(() => {
    if (items.length <= 1) return
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [items.length])

  const tActive = items[active]

  return (
    <section className="bg-[#f7f5f0] py-16 md:py-24 border-b border-gray-100">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Cabecera */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#fdf6e3] border border-[#e8a838]/15 rounded-full px-4 py-1.5 mb-4 shadow-sm select-none">
            <span className="text-sm">💬</span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#e8a838]">
              {es ? 'Testimonios' : 'Testimonials'}
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-[#0c2340] font-normal tracking-tight">
            {es ? 'Lo que dicen las familias' : 'What families say'}
          </h2>
        </div>

        {/* Carta principal */}
        {tActive && (
          <div className="relative animate-[fadeSlideUp_0.6s_cubic-bezier(0.16,1,0.3,1)]">
            <div className={`bg-white rounded-3xl p-8 md:p-12 border border-gray-200/80 shadow-lg ${tActive.shadowColor} relative transition-all duration-500`}>
              
              {/* Comillas decorativas gigantes */}
              <div className={`absolute top-4 left-6 md:left-10 font-serif text-8xl md:text-9xl leading-none font-bold opacity-5 pointer-events-none select-none ${tActive.color}`}>
                &ldquo;
              </div>

              <div className="relative z-10">
                <p className="font-serif text-lg sm:text-xl md:text-2xl text-[#0c2340] leading-relaxed font-normal italic mb-8 md:mb-10 text-left">
                  &ldquo;{tActive.body}&rdquo;
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-gray-100">
                  
                  {/* Perfil */}
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-full ${tActive.bgColor} flex items-center justify-center text-3xl shadow-inner`}>
                      {tActive.emoji}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-[#0c2340]">{tActive.family}</h4>
                      <p className={`text-xs font-semibold mt-0.5 ${tActive.color}`}>{tActive.program}</p>
                    </div>
                  </div>

                  {/* Paginación en círculos de toque (min 44x44px area) */}
                  <div className="flex items-center gap-2.5">
                    {items.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActive(i)}
                        aria-label={es ? `Ver testimonio ${i + 1}` : `View testimonial ${i + 1}`}
                        className="w-11 h-11 flex items-center justify-center focus:outline-none"
                      >
                        <span
                          className={`block rounded-full transition-all duration-500 ${
                            i === active 
                              ? `w-8 h-2.5 ${tActive.bgColor.replace('bg-', 'bg-').split(' ')[0]} ${tActive.color.replace('text-', 'bg-')}` 
                              : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  )
}
