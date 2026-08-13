import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
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
    { name: es ? 'Inclusión radical' : 'Radical Inclusion', icon: '🤝', desc: es ? 'Eliminamos barreras y creamos espacios donde cada persona es valorada por sus capacidades únicas.' : 'We remove barriers and create spaces where every person is valued for their unique abilities.', color: 'border-secondary', bg: 'bg-secondary/10' },
    { name: es ? 'Empoderamiento auténtico' : 'Authentic Empowerment', icon: '💪', desc: es ? 'Fortalecemos la confianza y autonomía de cada niño, niña y familia que acompaña nuestros programas.' : 'We strengthen the confidence and autonomy of each child and family accompanying our programs.', color: 'border-accent', bg: 'bg-accent/10' },
    { name: es ? 'Autogestión como meta' : 'Self-management as Goal', icon: '🎯', desc: es ? 'Trabajamos para que cada persona desarrolle las herramientas necesarias para dirigir su propia vida.' : 'We work so that each person develops the necessary tools to direct their own life.', color: 'border-secondary', bg: 'bg-secondary/10' },
    { name: es ? 'Innovación con propósito' : 'Purposeful Innovation', icon: '💡', desc: es ? 'Buscamos nuevas formas de intervención terapéutica y educativa con impacto real y medible.' : 'We seek new ways of therapeutic and educational intervention with real and measurable impact.', color: 'border-primary', bg: 'bg-primary/15' },
    { name: es ? 'Equidad adaptativa' : 'Adaptive Equity', icon: '⚖️', desc: es ? 'Adaptamos nuestros programas al ritmo y las necesidades individuales, garantizando igualdad de oportunidades.' : 'We adapt our programs to individual rhythm and needs, guaranteeing equal opportunities.', color: 'border-accent', bg: 'bg-accent/10' },
    { name: es ? 'Desarrollo holístico' : 'Holistic Development', icon: '🌱', desc: es ? 'Atendemos todas las dimensiones del ser: cognitiva, física, emocional, social y familiar.' : 'We attend all dimensions of the being: cognitive, physical, emotional, social, and family.', color: 'border-secondary', bg: 'bg-secondary/10' },
    { name: es ? 'Liderazgo colaborativo' : 'Collaborative Leadership', icon: '🤲', desc: es ? 'Construimos redes de trabajo entre familias, profesionales, instituciones y la comunidad.' : 'We build working networks between families, professionals, institutions, and the community.', color: 'border-secondary', bg: 'bg-secondary/10' },
    { name: es ? 'Compromiso comunitario' : 'Community Commitment', icon: '🏘️', desc: es ? 'Devolvemos a la comunidad con programas abiertos, campañas de sensibilización y formación continua.' : 'We give back to the community with open programs, awareness campaigns, and continuous training.', color: 'border-accent', bg: 'bg-accent/10' },
  ]

  const timeline = [
    { year: '2021', title: es ? 'Nace Centro Lápiz en Mano' : 'Lápiz en Mano Center is born', desc: es ? 'Se funda el Centro de Educación Complementaria Lápiz en Mano en la ciudad de La Paz, con la visión de brindar atención integral a niños y niñas con necesidades especiales.' : 'The Lápiz en Mano Complementary Education Center is founded in La Paz, with the vision of providing comprehensive care to children with special needs.', icon: '🏠', color: '#229cc2' },
    { year: '2021', title: es ? 'Mi Escuelita Inclusiva Down' : 'Mi Escuelita Inclusiva Down', desc: es ? 'Se inaugura el primer programa especializado para niños con síndrome de Down, ofreciendo estimulación temprana, terapia de lenguaje, fisioterapia y apoyo pedagógico.' : 'The first specialized program for children with Down syndrome is inaugurated, offering early stimulation, speech therapy, physiotherapy, and pedagogical support.', icon: '🌟', color: '#ffc500' },
    { year: '2022', title: es ? 'Fundación PRO-21' : 'PRO-21 Foundation', desc: es ? 'Se constituye formalmente la Fundación PRO-21 como entidad sin fines de lucro, ampliando el alcance institucional y la capacidad de gestionar cooperación nacional e internacional.' : 'The PRO-21 Foundation is formally established as a non-profit entity, expanding institutional reach and the capacity to manage national and international cooperation.', icon: '📋', color: '#229cc2' },
    { year: '2023', title: es ? 'Aula Wawitas' : 'Aula Wawitas', desc: es ? 'Se lanza el segundo programa especializado, enfocado en niños con autismo y otras condiciones del neurodesarrollo, incorporando detección temprana y evaluación multidisciplinaria.' : 'The second specialized program is launched, focused on children with autism and other neurodevelopmental conditions, incorporating early detection and multidisciplinary evaluation.', icon: '🧩', color: '#8c3cbd' },
    { year: '2024', title: es ? 'Pasos Firmes' : 'Pasos Firmes', desc: es ? 'Nace el tercer programa, dirigido a niños con dificultades de aprendizaje, atención y desempeño escolar. Se completa la oferta integral de la fundación.' : 'The third program is born, aimed at children with learning, attention, and school performance difficulties. The foundation\'s comprehensive offering is completed.', icon: '📚', color: '#229cc2' },
    { year: '2025', title: es ? 'Reconocimiento y crecimiento' : 'Recognition and growth', desc: es ? 'La fundación gana visibilidad nacional e internacional. Se fortalecen alianzas con organizaciones y se superan las 100 familias acompañadas.' : 'The foundation gains national and international visibility. Alliances with organizations are strengthened, and over 100 accompanied families are reached.', icon: '🌎', color: '#8c3cbd' },
    { year: '2026', title: es ? 'Proyección digital' : 'Digital projection', desc: es ? 'Alianza con la UCB para el desarrollo de la plataforma web institucional. Inicio de la estrategia de cooperación internacional y presencia digital profesional.' : 'Alliance with UCB for the development of the institutional web platform. Start of the international cooperation strategy and professional digital presence.', icon: '🚀', color: '#111827' },
  ]

  const teamTeaser = [
    { title: es ? 'Terapia de lenguaje' : 'Speech therapy', icon: '🗣️', bg: 'bg-secondary/10' },
    { title: es ? 'Fisioterapia' : 'Physiotherapy', icon: '🦿', bg: 'bg-secondary/10' },
    { title: es ? 'Psicomotricidad' : 'Psychomotricity', icon: '🤸', bg: 'bg-primary/15' },
    { title: es ? 'Psicología' : 'Psychology', icon: '🧠', bg: 'bg-accent/10' },
    { title: es ? 'Trabajo social' : 'Social work', icon: '🤝', bg: 'bg-accent/10' },
    { title: es ? 'Pedagogía' : 'Pedagogy', icon: '📖', bg: 'bg-secondary/10' },
  ]

  return (
    <div className="overflow-x-hidden w-full bg-gray-50">
      
      {/* 1. Page Hero Section */}
      <section className="relative bg-secondary overflow-hidden">
        {/* Decoraciones */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-1/4 -left-16 w-64 h-64 bg-white/10 rounded-full" />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-white/60 text-xs mb-8">
            <Link href={`/${lang}`} className="hover:text-white transition-colors">{es ? 'Inicio' : 'Home'}</Link>
            <span>/</span>
            <span className="text-white font-semibold">{es ? 'Quiénes Somos' : 'About Us'}</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-1.5 mb-5">
            <span className="text-xs font-bold uppercase tracking-wider text-white select-none">
              {es ? 'Nuestra historia' : 'Our history'}
            </span>
          </div>

          <h1 id="nosotros-titulo" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-extrabold leading-tight mb-4">
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

          <p className="text-sm md:text-base lg:text-lg text-white/80 max-w-2xl leading-relaxed">
            {es
              ? 'Fundación PRO-21 y Centro Lápiz en Mano trabajan juntos desde La Paz, Bolivia, para brindar atención integral y especializada, promoviendo la inclusión y el desarrollo humano.'
              : 'PRO-21 Foundation and Lápiz en Mano Center work together from La Paz, Bolivia, to provide comprehensive and specialized care, promoting inclusion and human development.'}
          </p>
        </div>

        {/* Ola inferior */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-10 md:h-14 fill-white">
            <path d="M0 0 Q360 60 720 30 Q1080 0 1440 0 L1440 60 L0 60 Z" />
          </svg>
        </div>
      </section>

      {/* 2. Identity - Two Institutions (Desktop side-by-side, Mobile stacked) */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-stretch justify-between gap-8 lg:gap-0">
            
            {/* PRO-21 Card */}
            <div className="w-full lg:w-[46%] bg-white rounded-3xl p-8 md:p-10 border border-gray-200/80 shadow-sm transition-all hover:shadow-md hover:border-gray-300 flex flex-col">
              <div className="w-16 h-16 mb-6 select-none">
                <Image src="/icons/logo-pro21.png" alt="Fundación PRO-21" width={64} height={64} className="w-full h-full object-contain" />
              </div>
              <h3 className="text-2xl text-gray-900 font-bold mb-1">Fundación PRO-21</h3>
              <p className="text-xs font-semibold text-secondary italic tracking-wide mb-5">
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
              <div className="h-0.5 lg:h-full w-full lg:w-0.5 bg-gradient-to-r lg:bg-gradient-to-b from-transparent via-[#ffc500] to-transparent flex-1" />
              <div className="w-11 h-11 rounded-full bg-primary/15 border-2 border-primary flex items-center justify-center text-lg shadow-sm flex-shrink-0">
                🤝
              </div>
              <div className="h-0.5 lg:h-full w-full lg:w-0.5 bg-gradient-to-r lg:bg-gradient-to-b from-transparent via-[#ffc500] to-transparent flex-1" />
            </div>

            {/* Lápiz en Mano Card */}
            <div className="w-full lg:w-[46%] bg-white rounded-3xl p-8 md:p-10 border border-gray-200/80 shadow-sm transition-all hover:shadow-md hover:border-gray-300 flex flex-col">
              <div className="w-16 h-16 mb-6 select-none">
                <Image src="/icons/logo-lapiz.png" alt="Centro Lápiz en Mano" width={64} height={64} className="w-full h-full object-contain" />
              </div>
              <h3 className="text-2xl text-gray-900 font-bold mb-1">Centro Lápiz en Mano</h3>
              <p className="text-xs font-semibold text-accent italic tracking-wide mb-5">
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
            <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">📌</span>
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                {es ? 'Identidad institucional' : 'Institutional Identity'}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl text-gray-900 font-extrabold tracking-tight">
              {es ? 'Lo que nos define' : 'What defines us'}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                label: es ? 'Misión' : 'Mission',
                icon: '🎯',
                color: 'border-secondary',
                textColor: 'text-secondary',
                bgColor: 'bg-secondary/10',
                text: es 
                  ? 'Nuestro compromiso es con los derechos de los niños y niñas con síndrome de Down, neurodivergencia y dificultades de aprendizaje a recibir una educación integral de calidad, inclusiva y personalizada que les permita desarrollar todo su potencial. Creamos un ambiente acogedor y seguro donde los niños se sientan incluidos, valorados y respetados, siendo referencia en la promoción de la educación inclusiva e igualdad de oportunidades.'
                  : 'Our commitment is to the rights of children with Down syndrome, neurodivergence, and learning difficulties to receive quality, inclusive, and personalized comprehensive education that allows them to develop their full potential. We create a welcoming and safe environment where children feel included, valued, and respected, serving as a reference in promoting inclusive education and equal opportunities.'
              },
              {
                label: es ? 'Visión' : 'Vision',
                icon: '🔭',
                color: 'border-accent',
                textColor: 'text-accent',
                bgColor: 'bg-accent/10',
                text: es 
                  ? 'Ser el centro líder de referencia auto sostenible en el departamento de La Paz y en Bolivia, en la promoción de la educación inclusiva para niños y niñas con síndrome de Down, neurodivergencia y dificultades de aprendizaje, ofreciendo una intervención psico-socio-educativa integral y proporcionando herramientas necesarias para su inclusión educativa, social y laboral.'
                  : 'To be the leading self-sustaining reference center in the department of La Paz and in Bolivia, promoting inclusive education for children with Down syndrome, neurodivergence, and learning difficulties, offering comprehensive psycho-socio-educational intervention and providing tools necessary for their educational, social, and labor inclusion.'
              },
              {
                label: es ? 'Objetivo' : 'Objective',
                icon: '🧭',
                color: 'border-secondary',
                textColor: 'text-secondary',
                bgColor: 'bg-secondary/10',
                text: es 
                  ? 'Brindar atención terapéutica y educativa de calidad a niños y niñas con síndrome de Down, neurodivergencia y dificultades de aprendizaje, promoviendo su desarrollo integral, autonomía e inclusión activa en la sociedad boliviana mediante un equipo multidisciplinario comprometido.'
                  : 'To provide quality therapeutic and educational care to children with Down syndrome, neurodivergence, and learning difficulties, promoting their comprehensive development, autonomy, and active inclusion in Bolivian society through a committed multidisciplinary team.'
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
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-[#f9fafb] to-white">
        <div className="container mx-auto max-w-6xl">
          
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">💛</span>
              <span className="text-xs font-bold uppercase tracking-wider text-primary-700">
                {es ? 'Nuestros valores' : 'Our Values'}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl text-gray-900 font-extrabold tracking-tight mb-4">
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
                  <h4 className="text-base text-gray-900 font-bold mb-2">
                    {v.name}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
                <div className="w-8 h-1 bg-gray-200 rounded-full mt-5 group-hover:bg-secondary transition-colors" />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Timeline (Adaptive Responsive: Center alignment on Desktop, Left alignment on Mobile) */}
      <section className="py-16 md:py-24 px-4 bg-white border-t border-b border-gray-100">
        <div className="container mx-auto max-w-4xl">
          
          <div className="text-center mb-16 max-w-md mx-auto">
            <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">📅</span>
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                {es ? 'Nuestra trayectoria' : 'Our Journey'}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl text-gray-900 font-extrabold tracking-tight mb-4">
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
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#ffc500]/0 via-[#ffc500]/80 to-[#ffc500]/0 transform -translate-x-1/2" />
            {/* Mobile: línea izquierda vertical */}
            <div className="block md:hidden absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#ffc500]/10 via-[#ffc500]/80 to-[#ffc500]/0" />

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
                        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:border-secondary/30 transition-all duration-300 mr-6">
                          <span className="inline-block text-xs font-bold px-3 py-1 bg-secondary/10 text-secondary rounded-full mb-3">{item.year}</span>
                          <h4 className="text-lg text-gray-900 font-bold mb-2">{item.title}</h4>
                          <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                        </div>
                      )}
                    </div>

                    {/* Nodo de la línea de tiempo (Alineado a la izquierda en móvil, al centro en desktop) */}
                    <div className="flex justify-start pl-0 md:pl-0 md:justify-center relative z-20 mb-4 md:mb-0">
                      <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white border-[3px] border-primary flex items-center justify-center text-xl shadow-md absolute left-0 md:relative md:left-auto">
                        {item.icon}
                      </div>
                    </div>

                    {/* Contenido Derecho (Impar en desktop, TODOS en móvil) */}
                    <div className="pl-14 md:pl-6 text-left">
                      {!isLeft && (
                        <div className="hidden md:block bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:border-secondary/30 transition-all duration-300">
                          <span className="inline-block text-xs font-bold px-3 py-1 bg-secondary/10 text-secondary rounded-full mb-3">{item.year}</span>
                          <h4 className="text-lg text-gray-900 font-bold mb-2">{item.title}</h4>
                          <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                        </div>
                      )}
                      
                      {/* Tarjeta de visualización móvil obligatoria */}
                      <div className="block md:hidden bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 shadow-sm">
                        <span className="inline-block text-[10px] font-bold px-2.5 py-0.5 bg-secondary/10 text-secondary rounded-full mb-2">{item.year}</span>
                        <h4 className="text-base text-gray-900 font-bold mb-1.5">{item.title}</h4>
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
      <section className="py-16 md:py-24 px-4 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-1/4 -left-16 w-64 h-64 bg-white/10 rounded-full" />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">

          <div className="text-center mb-12 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                {es ? 'Nuestro equipo' : 'Our Team'}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl text-white font-extrabold tracking-tight mb-4">
              {es ? 'Profesionales con vocación' : 'Professionals with Vocation'}
            </h2>
            <p className="text-sm md:text-base text-white/80 max-w-lg mx-auto leading-relaxed">
              {es
                ? 'Un equipo multidisciplinario de 10 profesionales especializados dedicados al desarrollo integral de cada niño y su familia.'
                : 'A multidisciplinary team of 10 specialized professionals dedicated to the comprehensive development of each child and their family.'}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {teamTeaser.map((r, i) => (
              <div
                key={i}
                className="bg-white/10 border border-white/20 p-5 rounded-2xl text-center transition-all duration-300 hover:bg-white/20 hover:-translate-y-1 select-none flex flex-col items-center justify-center min-h-[110px]"
              >
                <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center text-2xl mb-3">
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
              className="bg-primary hover:bg-primary/95 text-black font-extrabold text-sm px-8 py-3.5 sm:py-4 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/10 min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
            >
              {es ? 'Conoce al equipo completo →' : 'Meet the entire team →'}
            </Link>
          </div>

        </div>
      </section>

      {/* 7. CTA Banner */}
      <section className="py-16 md:py-20 px-4 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 bg-black/5 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/4" />
        </div>
        <div className="container mx-auto max-w-3xl relative z-10 text-center">
          <span className="text-4xl mb-4 block select-none">💛</span>
          <h3 className="text-2xl md:text-3xl text-gray-900 font-bold mb-4">
            {es ? '¿Quieres ser parte de esta historia?' : 'Want to be part of this story?'}
          </h3>
          <p className="text-sm text-gray-800/80 leading-relaxed mb-8 max-w-xl mx-auto">
            {es
              ? 'Tu apoyo transforma vidas. Dona, sé voluntario o conviértete en aliado de la inclusión en Bolivia.'
              : 'Your support transforms lives. Donate, volunteer, or become an ally of inclusion in Bolivia.'}
          </p>
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <Link
              href={`/${lang}/colabora`}
              className="bg-gray-900 hover:bg-gray-800 text-white font-extrabold text-sm px-8 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              {es ? 'Colaborar ahora' : 'Support now'}
            </Link>
            <Link
              href={`/${lang}/contacto`}
              className="border-2 border-gray-900/30 hover:border-gray-900/60 bg-transparent text-gray-900 font-bold text-sm px-8 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              {es ? 'Contactar' : 'Contact'}
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
