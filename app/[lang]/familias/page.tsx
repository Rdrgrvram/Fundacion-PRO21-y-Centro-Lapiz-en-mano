'use client'
import { useState } from 'react'
import Link from 'next/link'
import { CONTACT } from '@/lib/contact'
import type { Locale } from '@/lib/i18n'
//.
//.
//.cortaaaaaaaaa
interface PageProps {
  params: {
    lang: Locale
  }
}

export default function Page({ params: { lang } }: PageProps) {
  const es = lang === 'es'
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const virtualSessions = [
    {
      title: es ? 'Orientación psicológica' : 'Psychological orientation',
      icon: '🧠',
      desc: es
        ? 'Sesiones individuales con psicólogos para abordar el impacto emocional del diagnóstico, manejar la ansiedad, el duelo y la culpa, y fortalecer la salud mental de los padres.'
        : 'Individual sessions with psychologists to address the emotional impact of diagnosis, manage anxiety, grief, and guilt, and strengthen parents\' mental health.',
      freq: es ? 'Semanal' : 'Weekly',
      duration: '45 min',
      color: '#6c5ce7',
      bg: 'bg-[#f0edff]'
    },
    {
      title: es ? 'Trabajo social' : 'Social work',
      icon: '🤝',
      desc: es
        ? 'Orientación sobre derechos, acceso a servicios públicos, trámites de discapacidad, becas educativas y redes de apoyo institucional disponibles en Bolivia.'
        : 'Orientation on rights, access to public services, disability certificate procedures, educational scholarships, and institutional networks in Bolivia.',
      freq: es ? 'Quincenal' : 'Fortnightly',
      duration: '60 min',
      color: '#1a8a7d',
      bg: 'bg-[#e0f5f0]'
    },
    {
      title: es ? 'Charlas temáticas' : 'Thematic talks',
      icon: '🎓',
      desc: es
        ? 'Talleres formativos sobre temas como estimulación en casa, manejo de conducta, alimentación, sexualidad, autonomía y transición a la vida adulta.'
        : 'Training workshops on topics such as stimulation at home, behavior management, nutrition, sexuality, autonomy, and transition to adult life.',
      freq: es ? 'Mensual' : 'Monthly',
      duration: '90 min',
      color: '#e86840',
      bg: 'bg-[#fef0e8]'
    },
    {
      title: es ? 'Interconsulta con especialistas' : 'Interconsultation with specialists',
      icon: '🩺',
      desc: es
        ? 'Sesiones donde los padres pueden hacer preguntas directas al fisioterapeuta, fonoaudiólogo o terapeuta conductual de su hijo sobre el progreso y las estrategias.'
        : 'Sessions where parents can ask direct questions to their child\'s physical therapist, speech therapist, or behavioral therapist about progress.',
      freq: es ? 'Mensual' : 'Monthly',
      duration: '30 min',
      color: '#2466a8',
      bg: 'bg-[#e8f1fa]'
    }
  ]

  const supportNetwork = [
    { title: es ? 'Encuentros presenciales' : 'In-person meetings', icon: '☕', desc: es ? 'Reuniones mensuales en el Centro Lápiz en Mano donde las familias comparten experiencias y se apoyan mutuamente en un espacio seguro.' : 'Monthly meetings at the Lápiz en Mano Center where families share experiences and support each other in a safe space.', color: '#e8a838' },
    { title: es ? 'Grupo de WhatsApp' : 'WhatsApp Group', icon: '📱', desc: es ? 'Comunidad activa de padres y madres donde compartir recursos, resolver dudas cotidianas y coordinar actividades.' : 'Active community of parents to share resources, solve daily doubts, and coordinate activities.', color: '#2d8a4e' },
    { title: es ? 'Padres mentores' : 'Mentor Parents', icon: '💛', desc: es ? 'Familias con más tiempo en la fundación acompañan a las familias nuevas durante sus primeros meses, compartiendo su experiencia.' : 'Families with more time in the foundation accompany new families during their first months, sharing their experience.', color: '#e84393' },
    { title: es ? 'Eventos familiares' : 'Family events', icon: '🎉', desc: es ? 'Celebraciones, paseos inclusivos, talleres recreativos y actividades donde los niños y sus familias disfrutan juntos.' : 'Celebrations, inclusive outings, recreational workshops, and activities where children and families enjoy together.', color: '#e86840' }
  ]

  const guides = [
    { title: es ? 'Guía de estimulación temprana en casa' : 'Early stimulation guide at home', icon: '👶', desc: es ? 'Actividades prácticas organizadas por edad para estimular el desarrollo de tu hijo desde el hogar.' : 'Practical activities organized by age to stimulate your child\'s development from home.', pages: es ? '24 págs.' : '24 pages', program: 'Mi Escuelita Down', color: '#2466a8', bg: 'bg-[#e8f1fa]' },
    { title: es ? 'Estrategias para el manejo de conducta' : 'Behavior management strategies', icon: '🧩', desc: es ? 'Técnicas basadas en evidencia para abordar conductas desafiantes con paciencia y efectividad.' : 'Evidence-based techniques to address challenging behaviors with patience and effectiveness.', pages: es ? '18 págs.' : '18 pages', program: 'Aula Wawitas', color: '#e86840', bg: 'bg-[#fef0e8]' },
    { title: es ? 'Cómo apoyar las tareas escolares' : 'How to support school homework', icon: '📚', desc: es ? 'Guía práctica para padres de niños con dificultades de aprendizaje: organización y motivación.' : 'Practical guide for parents of children with learning difficulties: organization and motivation.', pages: es ? '20 págs.' : '20 pages', program: 'Pasos Firmes', color: '#2d8a4e', bg: 'bg-[#e5f5eb]' },
    { title: es ? 'Derechos de la discapacidad en Bolivia' : 'Disability rights in Bolivia', icon: '⚖️', desc: es ? 'Resumen de la normativa boliviana, trámites de certificación, acceso a salud, educación y beneficios.' : 'Summary of Bolivian regulations, certification procedures, access to health, education, and benefits.', pages: es ? '16 págs.' : '16 pages', program: es ? 'Todos los programas' : 'All programs', color: '#6c5ce7', bg: 'bg-[#f0edff]' },
    { title: es ? 'Pictogramas para la rutina diaria' : 'Pictograms for daily routines', icon: '🖼️', desc: es ? 'Set descargable de pictogramas para estructurar rutinas visuales: higiene, alimentación y ocio.' : 'Downloadable set of pictograms to structure visual routines: hygiene, eating, and leisure.', pages: es ? '12 láminas' : '12 sheets', program: 'Aula Wawitas', color: '#1a8a7d', bg: 'bg-[#e0f5f0]' },
    { title: es ? 'Guía de alimentación y nutrición' : 'Nutrition and feeding guide', icon: '🥗', desc: es ? 'Recomendaciones nutricionales y manejo de selectividad alimentaria para niños con TEA.' : 'Nutritional recommendations and food selectivity management for children with ASD.', pages: es ? '22 págs.' : '22 pages', program: 'Aula Wawitas', color: '#e8a838', bg: 'bg-[#fdf6e3]' }
  ]

  const faqs = [
    { q: es ? '¿Necesito un diagnóstico para inscribir a mi hijo?' : 'Do I need a diagnosis to enroll my child?', a: es ? 'No. Si observas señales que te preocupan o tu hijo tiene dificultades en algún área del desarrollo o el aprendizaje, puedes consultarnos directamente. Nuestro equipo realizará una evaluación integral como primer paso.' : 'No. If you notice concerning signs or your child has difficulties in any area of development or learning, you can consult us directly. Our team will perform a comprehensive evaluation.' },
    { q: es ? '¿Cuánto cuesta el programa?' : 'How much does the program cost?', a: es ? 'Cada programa tiene una cuota mensual accesible. Para familias con dificultades económicas, contamos con un sistema de becas parciales y totales financiadas por donaciones. Ningún niño deja de recibir atención por razones económicas.' : 'Each program has an affordable monthly fee. For families with economic difficulties, we have a system of partial and full scholarships funded by donations. No child is left without care due to economic reasons.' },
    { q: es ? '¿Con qué frecuencia son las terapias?' : 'How often are the therapies?', a: es ? 'Depende del plan de intervención de cada niño. Generalmente las sesiones son de 2 a 4 veces por semana, combinando distintas áreas terapéuticas. El plan se diseña junto con la familia.' : 'It depends on each child\'s intervention plan. Generally, sessions are 2 to 4 times a week, combining different therapeutic areas. The plan is designed together with the family.' },
    { q: es ? '¿Mi hijo puede asistir a una escuela regular al mismo tiempo?' : 'Can my child attend a regular school at the same time?', a: es ? 'Sí, y lo promovemos activamente. Los niños de Mi Escuelita Inclusiva Down asisten tanto al Centro Lápiz en Mano como a su unidad educativa de origen. Nuestro enfoque es la inclusión educativa, no la segregación.' : 'Yes, and we actively promote it. Children from Mi Escuelita Down attend both the Lápiz en Mano Center and their school of origin. Our focus is educational inclusion, not segregation.' },
    { q: es ? '¿Ofrecen atención en horarios flexibles?' : 'Do you offer flexible hours?', a: es ? 'Sí. Entendemos que muchas familias trabajan. Coordinamos los horarios de las sesiones terapéuticas para adaptarnos a las necesidades de cada familia, incluyendo opciones en la tarde.' : 'Yes. We understand that many families work. We coordinate therapeutic sessions to adapt to each family\'s needs, including afternoon options.' },
    { q: es ? '¿Qué pasa si vivimos fuera de La Paz?' : 'What if we live outside La Paz?', a: es ? 'Ofrecemos sesiones virtuales gratuitas de orientación para familias de cualquier parte de Bolivia. Para la atención presencial, recibimos familias que puedan desplazarse a nuestro centro en La Paz.' : 'We offer free virtual guidance sessions for families from any part of Bolivia. For in-person care, we receive families who can travel to our center in La Paz.' },
    { q: es ? '¿Cómo puedo saber cuál programa es el adecuado para mi hijo?' : 'How can I know which program is right for my child?', a: es ? 'Agenda una evaluación inicial gratuita. Nuestro equipo multidisciplinario evaluará a tu hijo y te recomendará el programa y las áreas de intervención más adecuadas para sus necesidades.' : 'Schedule a free initial evaluation. Our multidisciplinary team will evaluate your child and recommend the most suitable program and intervention areas.' },
    { q: es ? '¿Los padres participan en las terapias?' : 'Do parents participate in the therapies?', a: es ? 'Sí. Consideramos a la familia como parte fundamental del proceso. Los padres participan en sesiones de orientación, reciben estrategias para el hogar, y coordinan activamente con los terapeutas.' : 'Yes. We consider the family as a fundamental part of the process. Parents participate in orientation sessions, receive home strategies, and actively coordinate with therapists.' }
  ]

  return (
    <div className="overflow-x-hidden w-full bg-[#fafbfd]">

      {/* 1. Hero Section */}
      <section className="relative min-h-[440px] flex items-center bg-gradient-to-br from-[#2d0a1e] via-[#6b234e] to-[#e84393] py-16 px-4 overflow-hidden">
        {/* Decoraciones */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          <div className="absolute -top-[15%] -right-[8%] w-[350px] h-[350px] md:w-[550px] md:h-[550px] rounded-full border border-white/5 opacity-30" />
          <div className="absolute -bottom-[20%] -left-[6%] w-[250px] h-[250px] md:w-[450px] md:h-[450px] rounded-full bg-radial-gradient(circle, rgba(232,168,56,0.06), transparent 70%)" />
          {['👨‍👩‍👧', '💛', '🏠', '📖'].map((e, i) => (
            <div key={i} className="absolute text-white/5 text-4xl animate-pulse" style={{ left: `${15 + i * 20}%`, top: `${15 + (i % 3) * 20}%` }}>
              {e}
            </div>
          ))}
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 80" fill="none" className="block w-full h-8 md:h-16 lg:h-20 text-[#fafbfd] fill-current">
            <path d="M0 45C320 20 640 60 960 35C1200 15 1380 40 1440 38V80H0Z" />
          </svg>
        </div>

        <div className="container mx-auto max-w-4xl text-center relative z-20 mt-8">
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full py-1 px-3.5 mb-5 select-none">
            <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] text-black font-extrabold">✦</span>
            <span className="text-white/80 text-xs font-semibold">{es ? 'Para las familias' : 'For families'}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-normal leading-tight mb-4">
            {es ? (
              <>
                No caminan <br />
                <span className="font-bold italic text-primary">solos</span>
              </>
            ) : (
              <>
                You do not walk <br />
                <span className="font-bold italic text-primary">alone</span>
              </>
            )}
          </h1>

          <p className="text-sm md:text-base lg:text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
            {es
              ? 'Sabemos que detrás de cada niño que atendemos hay una familia que también necesita acompañamiento, formación y contención. Este espacio es para ustedes.'
              : 'We know that behind every child we support there is a family that also needs guidance, training, and emotional support. This space is for you.'}
          </p>
        </div>
      </section>

      {/* 2. Welcome Letter Block */}
      <section className="py-12 px-4 bg-[#fafbfd]">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-br from-[#fdf2f8] to-[#fdf6e3] rounded-3xl p-8 md:p-10 border border-[#e84393]/10 shadow-sm text-left relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-radial-gradient(circle, rgba(232,168,56,0.1), transparent 70%) pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-start gap-6 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#e84393] to-[#e86840] text-white flex items-center justify-center text-3xl shadow-md flex-shrink-0 select-none">
                💌
              </div>
              <div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#0c2340] font-bold mb-3">
                  {es ? 'Querida familia:' : 'Dear family:'}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                  {es
                    ? 'Recibir un diagnóstico es un momento de gran sensibilidad que cambia la vida. Sentir temor, dudas o tristeza es completamente natural — y no significa que debas recorrer este camino en soledad. Estamos aquí para acompañarte en cada paso: con información profesional clara, apoyo psicológico constante y una red de familias que entienden exactamente tu vivencia.'
                    : 'Receiving a diagnosis is a highly sensitive, life-changing moment. Feeling fear, doubts, or sadness is completely natural — and it does not mean you have to walk this path alone. We are here to support you at every step: with clear professional information, constant psychological support, and a network of families who understand exactly what you are experiencing.'}
                </p>
                <p className="text-xs sm:text-sm font-bold text-[#e84393] italic mt-4">
                  {es ? '— El equipo de la Fundación PRO-21 y Centro Lápiz en Mano' : '— The team of PRO-21 Foundation and Lápiz en Mano Center'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Free Virtual Sessions (Grid 1-2 columns) */}
      <section className="py-12 md:py-16 px-4 bg-[#fafbfd] border-t border-b border-gray-200/50">
        <div className="container mx-auto max-w-6xl">

          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#f0edff] border border-[#6c5ce7]/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">🎥</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#6c5ce7]">
                {es ? 'Sesiones virtuales gratuitas' : 'Free virtual sessions'}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0c2340] font-normal tracking-tight mb-4">
              {es ? 'Orientación profesional desde casa' : 'Professional guidance from home'}
            </h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
              {es
                ? 'Sesiones sin costo con especialistas del centro, diseñadas para responder tus inquietudes vivenciales y familiares.'
                : 'Cost-free sessions with center specialists, designed to answer your everyday family concerns.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto text-left">
            {virtualSessions.map((s, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300"
              >
                <div className="h-1.5 w-full" style={{ backgroundColor: s.color }} />

                <div className="p-6 md:p-8 flex items-start gap-5">
                  <div className={`w-12 h-12 rounded-2xl ${s.bg} flex items-center justify-center text-2xl flex-shrink-0 select-none shadow-inner`}>
                    {s.icon}
                  </div>
                  <div>
                    <h4 className="font-serif text-base sm:text-lg text-[#0c2340] font-bold mb-2">
                      {s.title}
                    </h4>

                    <div className="flex gap-2 mb-4 select-none">
                      <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full ${s.bg}`} style={{ color: s.color }}>
                        {s.freq}
                      </span>
                      <span className="text-[9px] text-gray-400 font-bold px-2.5 py-0.5 rounded-full bg-gray-150">
                        ⏱ {s.duration}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 select-none">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#e0f5f0] border border-[#1a8a7d]/10 text-xs font-semibold text-gray-700">
              <span>✅</span>
              <span>{es ? '100% gratuitas. No requieres estar inscrito en programas presenciales para asistir.' : '100% free. You do not need to be enrolled in in-person programs to attend.'}</span>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Support Network Directory (Grid 1-2 cols) */}
      <section className="py-16 px-4 bg-[#f7f5f0]">
        <div className="container mx-auto max-w-6xl">

          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#fdf2f8] border border-[#e84393]/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">🤝</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#e84393]">
                {es ? 'Red de apoyo familiar' : 'Family support network'}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0c2340] font-normal tracking-tight mb-4">
              {es ? 'Nadie comprende mejor que quien lo vive' : 'No one understands better than those who live it'}
            </h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
              {es
                ? 'Comunidad de padres y madres que comparten experiencias cotidianas y celebran el desarrollo pleno de sus hijos.'
                : 'Community of parents sharing daily experiences and celebrating the full development of their children.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto text-left">
            {supportNetwork.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm flex items-start gap-5 hover:shadow-md transition-all duration-300"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 text-white select-none shadow-md"
                  style={{ backgroundColor: item.color }}
                >
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-serif text-base sm:text-lg text-[#0c2340] font-bold mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Downloadable Guides List (1 col mobile, 2 tablet, 3 desktop) */}
      <section className="py-16 md:py-24 px-4 bg-[#fafbfd] border-t border-b border-gray-200/50">
        <div className="container mx-auto max-w-6xl">

          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#e8f1fa] border border-[#2466a8]/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">📄</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2466a8]">
                {es ? 'Material educativo' : 'Educational material'}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0c2340] font-normal tracking-tight mb-4">
              {es ? 'Guías y recursos descargables' : 'Downloadable Guides & Resources'}
            </h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
              {es
                ? 'Material elaborado por nuestros profesionales para guiar las actividades formativas, sensoriales y de rutina diaria en casa.'
                : 'Material prepared by our professionals to guide educational, sensory, and daily routine activities at home.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
            {guides.map((g, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-gray-200 overflow-hidden flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  {/* Imagen / Cabecera visual */}
                  <div className={`p-6 flex items-center justify-center text-5xl relative min-h-[96px] ${g.bg}`}>
                    <span className="select-none animate-[float_4s_ease-in-out_infinite]">{g.icon}</span>
                    <span className="absolute top-3 right-3 text-[9px] font-bold px-2 py-0.5 bg-white rounded-full text-gray-500 select-none shadow-sm">
                      {g.pages}
                    </span>
                  </div>

                  <div className="p-6">
                    <span className="text-[9px] font-bold uppercase tracking-wide mb-1 block" style={{ color: g.color }}>
                      {g.program}
                    </span>
                    <h4 className="font-serif text-sm sm:text-base text-[#0c2340] font-bold mb-2 leading-snug">
                      {g.title}
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed mb-4 min-h-[48px]">
                      {g.desc}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 select-none">
                  <a
                    href="https://wa.me/59170106276"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl border flex items-center justify-center gap-1.5 text-xs font-bold transition-all"
                    style={{ color: g.color, backgroundColor: `${g.bg.replace('bg-[', '').replace(']', '')}30`, borderColor: `${g.color}15` }}
                  >
                    <span>⬇️</span>
                    <span>{es ? 'Solicitar PDF por WhatsApp' : 'Request PDF via WhatsApp'}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 select-none">
            <p className="text-xs text-gray-400 font-semibold italic">
              {es ? 'El material se actualiza de acuerdo a las recomendaciones curriculares del Ministerio de Educación de Bolivia.' : 'The material is updated in accordance with the educational curriculum of the Ministry of Education of Bolivia.'}
            </p>
          </div>

        </div>
      </section>

      {/* 6. FAQ Accordions List */}
      <section id="faq" className="py-16 md:py-24 px-4 bg-[#f7f5f0] border-b border-gray-200/50">
        <div className="container mx-auto max-w-4xl">

          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#fdf6e3] border border-[#e8a838]/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">❓</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#e8a838]">
                {es ? 'Preguntas frecuentes' : 'Frequently asked questions'}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0c2340] font-normal tracking-tight mb-4">
              {es ? 'Respuestas a las dudas más comunes' : 'Answers to the most common doubts'}
            </h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
              {es
                ? 'Si tu consulta no se encuentra resuelta, escríbenos directamente y te ayudaremos.'
                : 'If your inquiry is not resolved here, message us directly and we will help.'}
            </p>
          </div>

          {/* Acordeones */}
          <div className="flex flex-col gap-3.5 max-w-3xl mx-auto text-left">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i
              return (
                <div
                  key={i}
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className={`bg-white rounded-2xl border overflow-hidden shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 ${isOpen ? 'border-[#e8a838]' : 'border-gray-200'
                    }`}
                >
                  <div className="flex items-center justify-between p-5 select-none">
                    <div className="flex items-center gap-4">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-serif text-sm font-bold transition-all duration-300 ${isOpen ? 'bg-primary text-black' : 'bg-gray-100 text-gray-400'}`}>
                        {i + 1}
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#0c2340] leading-snug">
                        {faq.q}
                      </h4>
                    </div>

                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${isOpen ? 'bg-[#e8a838]/10 text-[#e8a838] rotate-180' : 'bg-gray-50 text-gray-400'
                      }`}>
                      ▾
                    </div>
                  </div>

                  {/* Detalle */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-[350px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                  >
                    <div className="px-5 pb-5 pl-5 sm:pl-18">
                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>

                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* 7. Contact / Orientation CTA */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-[#2d0a1e] via-[#6b234e] to-[#e84393] relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient(circle, rgba(232,168,56,0.06), transparent 70%) pointer-events-none" />

        <div className="container mx-auto max-w-3xl relative z-10 text-center">
          <span className="text-5xl block mb-5 animate-[float_4s_ease-in-out_infinite] select-none">💛</span>
          <h2 className="font-serif text-3xl md:text-4xl text-white font-normal leading-tight mb-4">
            {es ? '¿Necesitas orientación para tu familia?' : 'Need guidance for your family?'}
          </h2>

          <p className="text-sm md:text-base text-white/70 max-w-xl mx-auto leading-relaxed mb-6">
            {es
              ? 'Si acabas de recibir un diagnóstico, si tienes dudas sobre el desarrollo de tu hijo, o si simplemente necesitas chatear con un profesional de contención — estamos aquí.'
              : 'If you have just received a diagnosis, if you have doubts about your child\'s development, or if you simply need to chat with a support professional — we are here.'}
          </p>

          <p className="text-xs sm:text-sm text-white/55 italic max-w-md mx-auto mb-10">
            {es
              ? 'La primera consulta de orientación familiar es gratuita y sin compromisos.'
              : 'The first family orientation consultation is free and with no commitments.'}
          </p>

          <div className="flex justify-center">
            <a
              href="https://wa.me/59170106276"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25d366] hover:bg-[#25d366]/90 text-white font-extrabold text-sm sm:text-base px-8 py-3.5 sm:py-4 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#25d366]/20 min-h-[44px] flex items-center justify-center gap-2"
            >
              <span className="text-xl">💬</span>
              {es ? 'Escríbenos por WhatsApp — 70106276' : 'Message us on WhatsApp — 70106276'}
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
