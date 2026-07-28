'use client'
import Link from 'next/link'
import type { Locale } from '@/lib/i18n'

interface HomeImpactStripProps {
  lang: Locale
}

export default function HomeImpactStrip({ lang }: HomeImpactStripProps) {
  const es = lang === 'es'

  const items = [
    {
      title: es ? 'Historias de familias' : 'Family stories',
      desc: es 
        ? 'Testimonios reales de padres y madres que encontraron esperanza y crecimiento en nuestros programas.'
        : 'Real testimonies of parents who found hope and growth in our programs.',
      icon: '💛',
      bg: 'bg-[#fdf6e3]',
      accent: 'border-[#e8a838]/20 text-[#e8a838]',
      shadow: 'hover:shadow-[#e8a838]/10'
    },
    {
      title: es ? 'Transparencia' : 'Transparency',
      desc: es 
        ? 'Publicamos informes anuales de gestión, uso de recursos y resultados medibles de cada programa.'
        : 'We publish annual management reports, resource allocation, and measurable program results.',
      icon: '📊',
      bg: 'bg-[#e8f1fa]',
      accent: 'border-[#2466a8]/20 text-[#2466a8]',
      shadow: 'hover:shadow-[#2466a8]/10'
    },
    {
      title: es ? 'Repercusión mediática' : 'Media coverage',
      desc: es 
        ? 'Nuestra labor ha sido reconocida por medios nacionales e internacionales, visibilizando la inclusión en Bolivia.'
        : 'Our work has been recognized by national and international media, highlighting inclusion in Bolivia.',
      icon: '📰',
      bg: 'bg-[#e5f5eb]',
      accent: 'border-[#2d8a4e]/20 text-[#2d8a4e]',
      shadow: 'hover:shadow-[#2d8a4e]/10'
    }
  ]

  return (
    <section className="bg-gradient-to-br from-[#fdf6e3]/30 via-white to-[#e8f1fa]/30 py-16 md:py-24 border-b border-gray-100">
      <div className="container mx-auto px-4">
        
        {/* Encabezado */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#fef0e8] border border-[#e86840]/15 rounded-full px-4 py-1.5 mb-4 shadow-sm select-none">
            <span className="text-sm">🌎</span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#e86840]">
              {es ? 'Impacto social' : 'Social impact'}
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#0c2340] font-normal tracking-tight mb-4">
            {es ? 'Historias que transforman' : 'Stories that transform'}
          </h2>
          <p className="text-sm md:text-base text-gray-500 max-w-lg mx-auto leading-relaxed">
            {es 
              ? 'Cada familia que acompañamos es una historia de superación, valentía y amor incondicional.' 
              : 'Every family we support is a story of overcoming, courage, and unconditional love.'}
          </p>
        </div>

        {/* Columnas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {items.map((item, i) => (
            <Link
              key={i}
              href={`/${lang}/impacto`}
              className={`group p-8 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg ${item.shadow} hover:border-gray-300`}
            >
              <div>
                <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center text-2xl mb-6 shadow-sm`}>
                  {item.icon}
                </div>
                <h3 className="font-serif text-xl text-[#0c2340] font-bold mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-secondary group-hover:text-primary transition-colors">
                <span>{es ? 'Ver más en la sección de impacto' : 'Read more in impact section'}</span>
                <span>→</span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
