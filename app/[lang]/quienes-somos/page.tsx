import type { Metadata } from 'next'
import Link from 'next/link'
import type { Locale } from '@/lib/i18n'

interface PageProps {
  params: {
    lang: Locale
  }
}

export async function generateMetadata({ params: { lang } }: PageProps): Promise<Metadata> {
  const es = lang === 'es'
  return {
    title: es ? 'Quiénes Somos | Fundación PRO-21 y Centro Lápiz en Mano' : 'About Us | PRO-21 Foundation & Lápiz en Mano Center',
    description: es 
      ? 'Conoce la misión, visión, valores y trayectoria del Centro Lápiz en Mano y la Fundación PRO-21 en La Paz, Bolivia.'
      : 'Learn about the mission, vision, values, and history of the Lápiz en Mano Center and the PRO-21 Foundation in La Paz, Bolivia.',
  }
}

export default function Page({ params: { lang } }: PageProps) {
  const es = lang === 'es'

  const values = [
    { name: es ? 'Inclusión radical' : 'Radical Inclusion', icon: '🤝', desc: es ? 'Eliminamos barreras y creamos espacios donde cada persona es valorada por sus capacidades únicas.' : 'We remove barriers and create spaces where every person is valued for their unique abilities.', color: 'border-[#2466a8]', bg: 'bg-[#e8f1fa]' },
    { name: es ? 'Empoderamiento auténtico' : 'Authentic Empowerment', icon: '💪', desc: es ? 'Fortalecemos la confianza y autonomía de cada niño, niña y familia que acompaña nuestros programas.' : 'We strengthen the confidence and autonomy of each child and family accompanying our programs.', color: 'border-[#e86840]', bg: 'bg-[#fef0e8]' },
    { name: es ? 'Autogestión como meta' : 'Self-management as Goal', icon: '🎯', desc: es ? 'Trabajamos para que cada persona desarrolle las herramientas necesarias para dirigir su propia vida.' : 'We work so that each person develops the necessary tools to direct their own life.', color: 'border-[#1a8a7d]', bg: 'bg-[#e0f5f0]' },
    { name: es ? 'Innovación con propósito' : 'Purposeful Innovation', icon: '💡', desc: es ? 'Buscamos nuevas formas de intervención terapéutica y educativa con impacto real y medible.' : 'We seek new ways of therapeutic and educational intervention with real and measurable impact.', color: 'border-[#e8a838]', bg: 'bg-[#fdf6e3]' },
    { name: es ? 'Equidad adaptativa' : 'Adaptive Equity', icon: '⚖️', desc: es ? 'Adaptamos nuestros programas al ritmo y las necesidades individuales, garantizando igualdad de oportunidades.' : 'We adapt our programs to individual rhythm and needs, guaranteeing equal opportunities.', color: 'border-[#6c5ce7]', bg: 'bg-[#f0edff]' },
    { name: es ? 'Desarrollo holístico' : 'Holistic Development', icon: '🌱', desc: es ? 'Atendemos todas las dimensiones del ser: cognitiva, física, emocional, social y familiar.' : 'We attend all dimensions of the being: cognitive, physical, emotional, social, and family.', color: 'border-[#2d8a4e]', bg: 'bg-[#e5f5eb]' },
    { name: es ? 'Liderazgo colaborativo' : 'Collaborative Leadership', icon: '🤲', desc: es ? 'Construimos redes de trabajo entre familias, profesionales, instituciones y la comunidad.' : 'We build working networks between families, professionals, institutions, and the community.', color: 'border-[#2466a8]', bg: 'bg-[#e8f1fa]' },
    { name: es ? 'Compromiso comunitario' : 'Community Commitment', icon: '🏘️', desc: es ? 'Devolvemos a la comunidad con programas abiertos, campañas de sensibilización y formación continua.' : 'We give back to the community with open programs, awareness campaigns, and continuous training.', color: 'border-[#e86840]', bg: 'bg-[#fef0e8]' },
  ]

  const timeline = [
    { year: '2021', title: es ? 'Nace Centro Lápiz en Mano' : 'Lápiz en Mano Center is born', desc: es ? 'Se funda el Centro de Educación Complementaria Lápiz en Mano en la ciudad de La Paz, con la visión de brindar atención integral a niños y niñas con necesidades especiales.' : 'The Lápiz en Mano Complementary Education Center is founded in La Paz, with the vision of providing comprehensive care to children with special needs.', icon: '🏠', color: '#2466a8' },
    { year: '2021', title: es ? 'Mi Escuelita Inclusiva Down' : 'Mi Escuelita Inclusiva Down', desc: es ? 'Se inaugura el primer programa especializado para niños con síndrome de Down, ofreciendo estimulación temprana, terapia de lenguaje, fisioterapia y apoyo pedagógico.' : 'The first specialized program for children with Down syndrome is inaugurated, offering early stimulation, speech therapy, physiotherapy, and pedagogical support.', icon: '🌟', color: '#e8a838' },
    { year: '2022', title: es ? 'Fundación PRO-21' : 'PRO-21 Foundation', desc: es ? 'Se constituye formalmente la Fundación PRO-21 como entidad sin fines de lucro, ampliando el alcance institucional y la capacidad de gestionar cooperación nacional e internacional.' : 'The PRO-21 Foundation is formally established as a non-profit entity, expanding institutional reach and the capacity to manage national and international cooperation.', icon: '📋', color: '#1a8a7d' },
    { year: '2023', title: es ? 'Aula Wawitas' : 'Aula Wawitas', desc: es ? 'Se lanza el segundo programa especializado, enfocado en niños con autismo y otras condiciones del neurodesarrollo, incorporando detección temprana y evaluación multidisciplinaria.' : 'The second specialized program is launched, focused on children with autism and other neurodevelopmental conditions, incorporating early detection and multidisciplinary evaluation.', icon: '🧩', color: '#e86840' },
    { year: '2024', title: es ? 'Pasos Firmes' : 'Pasos Firmes', desc: es ? 'Nace el tercer programa, dirigido a niños con dificultades de aprendizaje, atención y desempeño escolar. Se completa la oferta integral de la fundación.' : 'The third program is born, aimed at children with learning, attention, and school performance difficulties. The foundation\'s comprehensive offering is completed.', icon: '📚', color: '#2d8a4e' },
    { year: '2025', title: es ? 'Reconocimiento y crecimiento' : 'Recognition and growth', desc: es ? 'La fundación gana visibilidad nacional e internacional. Se fortalecen alianzas con organizaciones y se superan las 100 familias acompañadas.' : 'The foundation gains national and international visibility. Alliances with organizations are strengthened, and over 100 accompanied families are reached.', icon: '🌎', color: '#6c5ce7' },
    { year: '2026', title: es ? 'Proyección digital' : 'Digital projection', desc: es ? 'Alianza con la UCB para el desarrollo de la plataforma web institucional. Inicio de la estrategia de cooperación internacional y presencia digital profesional.' : 'Alliance with UCB for the development of the institutional web platform. Start of the international cooperation strategy and professional digital presence.', icon: '🚀', color: '#0c2340' },
  ]

  const teamTeaser = [
    { title: es ? 'Terapia de lenguaje' : 'Speech therapy', icon: '🗣️', bg: 'bg-[#e8f1fa]' },
    { title: es ? 'Fisioterapia' : 'Physiotherapy', icon: '🦿', bg: 'bg-[#e0f5f0]' },
    { title: es ? 'Psicomotricidad' : 'Psychomotricity', icon: '🤸', bg: 'bg-[#fdf6e3]' },
    { title: es ? 'Psicología' : 'Psychology', icon: '🧠', bg: 'bg-[#f0edff]' },
    { title: es ? 'Trabajo social' : 'Social work', icon: '🤝', bg: 'bg-[#fef0e8]' },
    { title: es ? 'Pedagogía' : 'Pedagogy', icon: '📖', bg: 'bg-[#e5f5eb]' },
  ]

  return (
    <div className="overflow-x-hidden w-full bg-[#fafbfd]">
      
      {/* 1. Page Hero Section */}
      <section className="relative min-h-[400px] flex items-center bg-gradient-to-br from-[#0c2340] via-[#142d4c] to-[#2466a8] py-16 px-4 overflow-hidden">
        {/* Decoraciones */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          <div className="absolute -top-[20%] -right-[10%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full border border-white/5" />
          <div className="absolute bottom-[-20%] left-[-5%] w-[250px] h-[250px] md:w-[500px] md:h-[500px] rounded-full bg-radial-gradient(circle, rgba(255,197,0,0.06), transparent 70%)" />
        </div>

        {/* Ola inferior */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 90" fill="none" className="block w-full h-8 md:h-16 lg:h-20 text-[#fafbfd] fill-current">
            <path d="M0 40C360 80 720 10 1080 50C1260 70 1380 60 1440 55V90H0Z" />
          </svg>
        </div>

        <div className="container mx-auto max-w-4xl text-center relative z-20 mt-8">
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full py-1 px-3.5 mb-5">
            <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] text-black font-extrabold select-none">✦</span>
            <span className="text-white/80 text-xs font-semibold select-none">{es ? 'Nuestra historia' : 'Our history'}</span>
          </div>

          <h1 id="nosotros-titulo" className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-normal leading-tight mb-4">
            {es ? (
              <>
                Dos instituciones, <br className="hidden sm:inline" />
                <span className="font-bold italic text-primary">una misión</span>
              </>
            ) : (
              <>
                Two institutions, <br className="hidden sm:inline" />
                <span className="font-bold italic text-primary">one mission</span>
              </>
            )}
          </h1>

          <p className="text-sm md:text-base lg:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            {es 
              ? 'Fundación PRO-21 y Centro Lápiz en Mano trabajan juntos desde La Paz, Bolivia, para brindar atención integral y especializada, promoviendo la inclusión y el desarrollo humano.'
              : 'PRO-21 Foundation and Lápiz en Mano Center work together from La Paz, Bolivia, to provide comprehensive and specialized care, promoting inclusion and human development.'}
          </p>
        </div>
      </section>

      {/* 2. Identity - Two Institutions (Desktop side-by-side, Mobile stacked) */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-stretch justify-between gap-8 lg:gap-0">
            
            {/* PRO-21 Card */}
            <div className="w-full lg:w-[46%] bg-white rounded-3xl p-8 md:p-10 border border-gray-200/80 shadow-sm transition-all hover:shadow-md hover:border-gray-300 flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2466a8] to-[#1a8a7d] flex items-center justify-center font-serif text-xl font-bold text-white mb-6 shadow-md shadow-[#2466a8]/10 select-none">
                P21
              </div>
              <h3 className="font-serif text-2xl text-[#0c2340] font-bold mb-1">Fundación PRO-21</h3>
              <p className="text-xs font-semibold text-[#1a8a7d] italic tracking-wide mb-5">
                {es ? 'Promoviendo el bienestar integral' : 'Promoting comprehensive well-being'}
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                {es 
                  ? 'Entidad sin fines de lucro constituida formalmente para ampliar el alcance institucional, gestionar cooperación nacional e internacional, y desarrollar programas de intervención y proyectos de formación innovadores enfocados en la inclusión y el empoderamiento.'
                  : 'A non-profit entity formally established to expand institutional reach, manage national and international cooperation, and develop innovative intervention programs and training projects focused on inclusion and empowerment.'}
              </p>
            </div>

            {/* Separador / Conector (Horizontal en Desktop, Vertical en Móvil) */}
            <div className="w-full lg:w-[8%] flex lg:flex-col items-center justify-center gap-4 py-4 lg:py-0 select-none">
              <div className="h-0.5 lg:h-full w-full lg:w-0.5 bg-gradient-to-r lg:bg-gradient-to-b from-transparent via-[#e8a838] to-transparent flex-1" />
              <div className="w-11 h-11 rounded-full bg-[#fdf6e3] border-2 border-primary flex items-center justify-center text-lg shadow-sm flex-shrink-0">
                🤝
              </div>
              <div className="h-0.5 lg:h-full w-full lg:w-0.5 bg-gradient-to-r lg:bg-gradient-to-b from-transparent via-[#e8a838] to-transparent flex-1" />
            </div>

            {/* Lápiz en Mano Card */}
            <div className="w-full lg:w-[46%] bg-white rounded-3xl p-8 md:p-10 border border-gray-200/80 shadow-sm transition-all hover:shadow-md hover:border-gray-300 flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-[#e86840] flex items-center justify-center text-3xl mb-6 shadow-md shadow-primary/10 select-none">
                ✏️
              </div>
              <h3 className="font-serif text-2xl text-[#0c2340] font-bold mb-1">Centro Lápiz en Mano</h3>
              <p className="text-xs font-semibold text-[#e86840] italic tracking-wide mb-5">
                {es ? 'Centro de Educación Complementaria' : 'Complementary Education Center'}
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                {es 
                  ? 'Centro operativo donde se ejecutan los programas terapéuticos y educativos. Espacio físico inclusivo, seguro y especializado donde los niños y niñas reciben atención personalizada de un equipo multidisciplinario comprometido con su desarrollo integral.'
                  : 'The operational center where therapeutic and educational programs are executed. A physical, safe, inclusive, and specialized space where children receive personalized care from a multidisciplinary team committed to their comprehensive development.'}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Mission / Vision / Objective */}
      <section className="py-12 md:py-16 px-4 bg-white border-t border-b border-gray-100">
        <div className="container mx-auto max-w-6xl">
          
          <div className="text-center mb-12 max-w-md mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#e8f1fa] border border-[#2466a8]/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">📌</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2466a8]">
                {es ? 'Identidad institucional' : 'Institutional Identity'}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0c2340] font-normal tracking-tight">
              {es ? 'Lo que nos define' : 'What defines us'}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                label: es ? 'Misión' : 'Mission',
                icon: '🎯',
                color: 'border-[#2466a8]',
                textColor: 'text-[#2466a8]',
                bgColor: 'bg-[#e8f1fa]',
                text: es 
                  ? 'Ser una institución líder en la promoción del bienestar integral de personas con y sin discapacidad mediante la implementación de programas de intervención y proyectos de formación, fortaleciendo la inclusión, el empoderamiento y la autogestión como pilares de desarrollo humano.'
                  : 'To be a leading institution in promoting the comprehensive well-being of people with and without disabilities through the implementation of intervention programs and training projects, strengthening inclusion, empowerment, and self-management as pillars of human development.'
              },
              {
                label: es ? 'Visión' : 'Vision',
                icon: '🔭',
                color: 'border-[#e86840]',
                textColor: 'text-[#e86840]',
                bgColor: 'bg-[#fef0e8]',
                text: es 
                  ? 'Ser referentes a nivel nacional como la principal institución en la promoción del bienestar integral, destacándonos por programas de intervención y proyectos de formación innovadores y efectivos que transformen vidas y construyan una sociedad más justa e inclusiva.'
                  : 'To be national references as the main institution in promoting comprehensive well-being, standing out for innovative and effective intervention programs and training projects that transform lives and build a more just and inclusive society.'
              },
              {
                label: es ? 'Objetivo' : 'Objective',
                icon: '🧭',
                color: 'border-[#1a8a7d]',
                textColor: 'text-[#1a8a7d]',
                bgColor: 'bg-[#e0f5f0]',
                text: es 
                  ? 'Implementar programas de intervención y proyectos de formación que atiendan las necesidades específicas de niños, niñas y adolescentes con síndrome de Down, autismo, dificultades de aprendizaje y otras condiciones del neurodesarrollo, promoviendo su desarrollo integral, autonomía e inserción activa en la sociedad.'
                  : 'To implement intervention programs and training projects that meet the specific needs of children and adolescents with Down syndrome, autism, learning difficulties, and other neurodevelopmental conditions, promoting their comprehensive development, autonomy, and active integration into society.'
              }
            ].map((card) => (
              <div
                key={card.label}
                className="bg-white rounded-3xl border border-gray-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-300"
              >
                <div className={`h-1.5 w-full bg-gradient-to-r ${card.textColor.replace('text-', 'from-')} to-white`} />
                <div className="p-8 flex-1 flex flex-col">
                  <div className={`w-12 h-12 rounded-xl ${card.bgColor} flex items-center justify-center text-2xl mb-5 shadow-sm`}>
                    {card.icon}
                  </div>
                  <div className={`text-[10px] font-bold tracking-widest uppercase mb-2 ${card.textColor}`}>
                    {card.label}
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {card.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Values Section (1 Col in mobile, 2 in tablet, 4 in desktop) */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-[#f7f5f0] to-white">
        <div className="container mx-auto max-w-6xl">
          
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#fdf6e3] border border-[#e8a838]/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">💛</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#e8a838]">
                {es ? 'Nuestros valores' : 'Our Values'}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0c2340] font-normal tracking-tight mb-4">
              {es ? 'Los principios que nos guían' : 'The principles that guide us'}
            </h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
              {es 
                ? 'Ocho valores fundamentales que orientan cada decisión, cada terapia y cada interacción con las familias.' 
                : 'Eight fundamental values that guide every decision, therapy, and family interaction.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl bg-white border border-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-gray-300 flex flex-col justify-between h-full"
              >
                <div>
                  <div className={`w-11 h-11 rounded-xl ${v.bg} flex items-center justify-center text-xl mb-4 transition-all duration-300 group-hover:scale-105`}>
                    {v.icon}
                  </div>
                  <h4 className="font-serif text-base text-[#0c2340] font-bold mb-2">
                    {v.name}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
                <div className="w-8 h-1 bg-gray-200 rounded-full mt-5 group-hover:bg-[#2466a8] transition-colors" />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Timeline (Adaptive Responsive: Center alignment on Desktop, Left alignment on Mobile) */}
      <section className="py-16 md:py-24 px-4 bg-white border-t border-b border-gray-100">
        <div className="container mx-auto max-w-4xl">
          
          <div className="text-center mb-16 max-w-md mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#e0f5f0] border border-[#1a8a7d]/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">📅</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1a8a7d]">
                {es ? 'Nuestra trayectoria' : 'Our Journey'}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0c2340] font-normal tracking-tight mb-4">
              {es ? 'Cada paso cuenta' : 'Every step counts'}
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              {es 
                ? 'Desde 2021, un camino de crecimiento constante al servicio de la inclusión.' 
                : 'Since 2021, a path of constant growth at the service of inclusion.'}
            </p>
          </div>

          {/* Timeline Container */}
          <div className="relative">
            
            {/* LÍNEA DE TIEMPO: */}
            {/* Desktop: línea central vertical */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#e8a838]/0 via-[#e8a838]/80 to-[#e8a838]/0 transform -translate-x-1/2" />
            {/* Mobile: línea izquierda vertical */}
            <div className="block md:hidden absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#e8a838]/10 via-[#e8a838]/80 to-[#e8a838]/0" />

            {/* Listado de hitos */}
            <div className="space-y-12 md:space-y-8 relative">
              {timeline.map((item, idx) => {
                const isLeft = idx % 2 === 0
                return (
                  <div 
                    key={idx} 
                    className="relative flex flex-col md:grid md:grid-cols-[1fr_60px_1fr] md:items-center text-left"
                  >
                    
                    {/* Contenido Izquierdo (Sólo par en desktop, vacío en móvil) */}
                    <div className="hidden md:block text-right">
                      {isLeft && (
                        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:border-[#2466a8]/30 transition-all duration-300 mr-6">
                          <span className="inline-block text-xs font-bold px-3 py-1 bg-secondary/10 text-secondary rounded-full mb-3">{item.year}</span>
                          <h4 className="font-serif text-lg text-[#0c2340] font-bold mb-2">{item.title}</h4>
                          <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                        </div>
                      )}
                    </div>

                    {/* Nodo de la línea de tiempo (Alineado a la izquierda en móvil, al centro en desktop) */}
                    <div className="flex justify-start pl-0 md:pl-0 md:justify-center relative z-20 mb-4 md:mb-0">
                      <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white border-[3px] border-[#e8a838] flex items-center justify-center text-xl shadow-md absolute left-0 md:relative md:left-auto">
                        {item.icon}
                      </div>
                    </div>

                    {/* Contenido Derecho (Impar en desktop, TODOS en móvil) */}
                    <div className="pl-14 md:pl-6 text-left">
                      {!isLeft && (
                        <div className="hidden md:block bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:border-[#2466a8]/30 transition-all duration-300">
                          <span className="inline-block text-xs font-bold px-3 py-1 bg-secondary/10 text-secondary rounded-full mb-3">{item.year}</span>
                          <h4 className="font-serif text-lg text-[#0c2340] font-bold mb-2">{item.title}</h4>
                          <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                        </div>
                      )}
                      
                      {/* Tarjeta de visualización móvil obligatoria */}
                      <div className="block md:hidden bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 shadow-sm">
                        <span className="inline-block text-[10px] font-bold px-2.5 py-0.5 bg-secondary/10 text-secondary rounded-full mb-2">{item.year}</span>
                        <h4 className="font-serif text-base text-[#0c2340] font-bold mb-1.5">{item.title}</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>

                  </div>
                )
              })}
            </div>

          </div>

        </div>
      </section>

      {/* 6. Team Teaser Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-[#0c2340] via-[#142d4c] to-[#2466a8] relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient(circle, rgba(232,168,56,0.04), transparent 70%) pointer-events-none" />
        
        <div className="container mx-auto max-w-6xl relative z-20">
          
          <div className="text-center mb-12 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">👩‍⚕️</span>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                {es ? 'Nuestro equipo' : 'Our Team'}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-white font-normal tracking-tight mb-4">
              {es ? 'Profesionales con vocación' : 'Professionals with Vocation'}
            </h2>
            <p className="text-sm md:text-base text-white/70 max-w-lg mx-auto leading-relaxed">
              {es 
                ? 'Un equipo multidisciplinario de más de 20 profesionales dedicados al desarrollo integral de cada niño y su familia.' 
                : 'A multidisciplinary team of over 20 professionals dedicated to the comprehensive development of each child and their family.'}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {teamTeaser.map((r, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 backdrop-blur-sm p-6 rounded-2xl text-center transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 select-none flex flex-col items-center justify-center min-h-[140px]"
              >
                <div className={`w-12 h-12 rounded-xl ${r.bg} flex items-center justify-center text-2xl mb-4 shadow-inner`}>
                  {r.icon}
                </div>
                <div className="text-xs font-semibold text-white/90 leading-tight">
                  {r.title}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href={`/${lang}/equipo`}
              className="bg-primary hover:bg-primary/95 text-black font-extrabold text-sm px-8 py-3.5 sm:py-4 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/10 min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
            >
              {es ? 'Conoce al equipo completo →' : 'Meet the entire team →'}
            </Link>
          </div>

        </div>
      </section>

      {/* 7. CTA Banner */}
      <section className="py-16 px-4 bg-[#fafbfd]">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-3xl border border-gray-200/80 shadow-md p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-radial-gradient(circle, rgba(232,168,56,0.15), transparent 70%) pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-radial-gradient(circle, rgba(36,102,168,0.1), transparent 70%) pointer-events-none" />

            <div className="relative z-10 max-w-xl mx-auto">
              <span className="text-4xl mb-4 block animate-[float_4s_ease-in-out_infinite]">💛</span>
              <h3 className="font-serif text-2xl md:text-3xl text-[#0c2340] font-bold mb-4">
                {es ? '¿Quieres ser parte de esta historia?' : 'Want to be part of this story?'}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-8">
                {es 
                  ? 'Tu apoyo transforma vidas. Dona, sé voluntario o conviértete en aliado de la inclusión en Bolivia.' 
                  : 'Your support transforms lives. Donate, volunteer, or become an ally of inclusion in Bolivia.'}
              </p>
              <div className="flex flex-wrap gap-4 justify-center items-center">
                <Link
                  href={`/${lang}/colabora`}
                  className="bg-primary hover:bg-primary/95 text-black font-extrabold text-sm px-8 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-primary/10 min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  {es ? 'Colaborar ahora' : 'Support now'}
                </Link>
                <Link
                  href={`/${lang}/contacto`}
                  className="border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700 font-bold text-sm px-8 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  {es ? 'Contactar' : 'Contact'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
