'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { Locale } from '@/lib/i18n'

interface HomeHeroProps {
  lang: Locale
}

export default function HomeHero({ lang }: HomeHeroProps) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const es = lang === 'es'

  return (
    <section className="relative min-h-[90vh] md:min-h-screen bg-gradient-to-br from-[#0c2340] via-[#142d4c] to-[#2466a8] flex items-center overflow-hidden py-16 md:py-24">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute -top-[10%] -right-[8%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full border border-white/5 opacity-50" />
        <div className="absolute top-[20%] right-[5%] w-[150px] h-[150px] md:w-[300px] md:h-[300px] rounded-full bg-radial-gradient(circle, rgba(255,197,0,0.08), transparent 70%)" />
        <div className="absolute -bottom-[15%] -left-[5%] w-[250px] h-[250px] md:w-[500px] md:h-[500px] rounded-full border border-white/5 opacity-30" />
        
        {/* Puntos flotantes decorativos */}
        <div className="absolute top-[25%] left-[10%] text-2xl md:text-3xl opacity-15 animate-bounce delay-75">🍼</div>
        <div className="absolute bottom-[20%] right-[12%] text-2xl md:text-3xl opacity-15 animate-bounce delay-300">🧩</div>
        <div className="absolute top-[60%] right-[40%] text-xl md:text-2xl opacity-10 animate-bounce delay-150">📚</div>
        <div className="absolute bottom-[40%] left-[8%] text-2xl md:text-3xl opacity-10 animate-bounce delay-500">🎨</div>
      </div>

      {/* Ola inferior para suavizar la transición */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 120" fill="none" className="block w-full h-12 md:h-20 lg:h-28 text-white fill-current">
          <path d="M0 60C240 20 480 80 720 60C960 40 1200 80 1440 50V120H0Z" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-20 mt-10 md:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Lado Izquierdo: Copy / Información */}
          <div className="lg:col-span-7 text-left">
            <div className={`transition-all duration-700 transform ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="inline-flex items-center gap-2.5 bg-white/8 backdrop-blur-md border border-white/10 rounded-full py-1.5 pl-2.5 pr-4 mb-6 shadow-lg shadow-black/10">
                <span className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-xs text-black font-extrabold shadow-sm select-none">
                  ✦
                </span>
                <span className="text-white/90 text-xs md:text-sm font-semibold select-none">
                  {es ? 'La Paz, Bolivia — Desde 2021' : 'La Paz, Bolivia — Since 2021'}
                </span>
              </div>
            </div>

            <h1 className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-normal leading-[1.1] mb-6 tracking-tight transition-all duration-800 delay-100 transform ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {es ? (
                <>
                  Cada niño merece <br />
                  la oportunidad de{' '}
                  <span className="relative inline-block font-bold italic bg-gradient-to-r from-primary via-yellow-400 to-primary bg-[length:200%_auto] bg-clip-text text-transparent animate-[shimmer_4s_ease_infinite]">
                    brillar
                  </span>
                </>
              ) : (
                <>
                  Every child deserves <br />
                  the opportunity to{' '}
                  <span className="relative inline-block font-bold italic bg-gradient-to-r from-primary via-yellow-400 to-primary bg-[length:200%_auto] bg-clip-text text-transparent animate-[shimmer_4s_ease_infinite]">
                    shine
                  </span>
                </>
              )}
            </h1>

            <p className={`text-base md:text-lg lg:text-xl text-white/70 max-w-xl leading-relaxed mb-8 md:mb-10 transition-all duration-800 delay-200 transform ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              {es 
                ? 'Promovemos el bienestar integral de niños, niñas y adolescentes con síndrome de Down, autismo y dificultades de aprendizaje a través de programas terapéuticos especializados y un enfoque inclusivo y familiar.'
                : 'We promote the comprehensive well-being of children and adolescents with Down syndrome, autism, and learning difficulties through specialized therapeutic programs and a supportive family approach.'}
            </p>

            <div className={`flex flex-wrap gap-4 items-center transition-all duration-800 delay-300 transform ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <Link
                href={`/${lang}/mi-escuelita-down`}
                className="bg-primary hover:bg-primary/95 text-black font-extrabold text-sm sm:text-base px-8 py-3.5 sm:py-4 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-primary/10 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                {es ? 'Conoce nuestros programas' : 'Learn about our programs'}
              </Link>
              <Link
                href={`/${lang}/contacto`}
                className="border-2 border-white/20 hover:border-white/50 bg-transparent hover:bg-white/5 text-white font-bold text-sm sm:text-base px-8 py-3.5 sm:py-4 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                {es ? 'Contáctanos' : 'Contact us'}
              </Link>
            </div>
          </div>

          {/* Lado Derecho: Composición Visual (Imágenes y Badges) */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
            <div className={`relative w-full max-w-[420px] transition-all duration-1000 delay-300 transform ${loaded ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-12 scale-95'}`}>
              
              {/* Contenedor principal de imagen con proporción fija y esquinas redondeadas */}
              <div className="aspect-[3/3.3] rounded-3xl bg-gradient-to-br from-[#e8f1fa] to-[#fdf6e3] overflow-hidden border-[3.5px] border-white/10 shadow-2xl shadow-black/25 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2466a8]/5 to-primary/5 z-10" />
                
                {/* Visual placeholder robusto */}
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center select-none">
                  <span className="text-5xl md:text-6xl mb-4 filter drop-shadow-md animate-[float_4s_ease-in-out_infinite]">👧🧒👶</span>
                  <h3 className="font-serif text-lg md:text-xl text-[#0c2340] font-bold leading-snug max-w-[220px]">
                    {es ? 'Niños en sesiones terapéuticas' : 'Children in therapeutic sessions'}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2 font-medium">
                    {es ? 'Centro Lápiz en Mano · La Paz' : 'Lápiz en Mano Center · La Paz'}
                  </p>
                </div>
              </div>

              {/* Tarjeta de estadística flotante (Izquierda-Abajo) */}
              <div className="absolute -bottom-6 -left-6 md:-left-10 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 flex items-center gap-3.5 animate-[float_4s_ease-in-out_infinite] select-none">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#e0f5f0] to-[#e0f5f0]/80 flex items-center justify-center text-xl shadow-inner">
                  💚
                </div>
                <div>
                  <div className="font-serif text-2xl font-bold text-[#0c2340] leading-none">100+</div>
                  <div className="text-[10px] md:text-xs text-gray-500 font-semibold mt-1">
                    {es ? 'Familias acompañadas' : 'Families accompanied'}
                  </div>
                </div>
              </div>

              {/* Insignia flotante (Derecha-Arriba) */}
              <div className="absolute -top-4 -right-4 bg-primary rounded-2xl py-2.5 px-4.5 shadow-lg shadow-primary/20 flex flex-col items-center justify-center animate-[float_5s_ease-in-out_infinite_1s] select-none border border-primary/20">
                <span className="font-serif text-xl md:text-2xl font-bold text-[#0c2340] leading-none">3</span>
                <span className="text-[9px] text-[#0c2340] font-extrabold uppercase tracking-wider mt-0.5">
                  {es ? 'Programas' : 'Programs'}
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
