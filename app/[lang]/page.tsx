import type { Metadata } from 'next'
import Link from 'next/link'
import type { Locale } from '@/lib/i18n'
import { getTranslation } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Fundación PRO-21 y Centro Lápiz en Mano | La Paz, Bolivia',
  description:
    'Intervención terapéutica y educativa especializada para niños con síndrome de Down, autismo y dificultades de aprendizaje en La Paz, Bolivia.',
}

export default function Page({ params }: { params: { lang: Locale } }) {
  const { lang } = params
  const t = getTranslation(lang)
  const es = lang === 'es'

  const programs = [
    {
      href: `/${lang}/mi-escuelita-down`,
      icon: '🌟',
      color: 'bg-primary',
      textBtn: 'text-gray-900',
      border: 'border-primary',
      textAccent: 'text-primary-700',
      badge: es ? 'Síndrome de Down' : 'Down Syndrome',
      title: 'Mi Escuelita Down',
      desc: es
        ? 'Intervención terapéutica y educativa integral desde estimulación temprana hasta inclusión en primaria regular. Terapia de lenguaje, conducta, fisioterapia y psicomotricidad.'
        : 'Comprehensive therapeutic and educational intervention from early stimulation to regular primary inclusion. Speech, behavioral, physiotherapy, and psychomotor therapy.',
      ages: es ? '0 – 14+ años' : '0 – 14+ years',
    },
    {
      href: `/${lang}/aula-wawitas`,
      icon: '🧸',
      color: 'bg-secondary',
      textBtn: 'text-white',
      border: 'border-secondary',
      textAccent: 'text-secondary',
      badge: es ? 'Programa Preescolar' : 'Preschool Program',
      title: 'Aula Wawitas',
      desc: es
        ? 'Estimulación y educación preescolar integral para niños de 3 a 5 años. Tres niveles: Parvulario, Pre-Kínder y Kínder, con preparación para la escuela regular.'
        : 'Comprehensive preschool stimulation and education for children ages 3 to 5. Three levels: Nursery, Pre-Kinder and Kinder, with preparation for regular school.',
      ages: es ? '3 – 5 años' : '3 – 5 years',
    },
    {
      href: `/${lang}/pasos-firmes`,
      icon: '📚',
      color: 'bg-accent',
      textBtn: 'text-white',
      border: 'border-accent',
      textAccent: 'text-accent',
      badge: es ? 'Dificultades de aprendizaje' : 'Learning difficulties',
      title: 'Pasos Firmes',
      desc: es
        ? 'Apoyo psicopedagógico para niños y adolescentes con dislexia, disgrafía, discalculia, TDAH y bajo rendimiento escolar. Modalidades individuales y grupales.'
        : 'Psychopedagogical support for children and adolescents with dyslexia, dysgraphia, dyscalculia, ADHD, and low school performance. Individual and group modalities.',
      ages: es ? 'Primaria y Secundaria' : 'Primary and Secondary',
    },
  ]

  const stats = [
    { val: '70+', label: es ? 'niños atendidos' : 'children served', icon: '👶' },
    { val: '8',   label: es ? 'años de experiencia' : 'years of experience', icon: '🏫' },
    { val: '10',  label: es ? 'profesionales' : 'professionals', icon: '👩‍⚕️' },
    { val: '3',   label: es ? 'programas activos' : 'active programs', icon: '🎯' },
  ]

  const testimonials = [
    {
      quote: es
        ? 'Cuando recibimos el diagnóstico sentimos que el mundo se detenía. En Lápiz en Mano encontramos no solo terapia, sino una familia que nos enseñó a ver las capacidades antes que las limitaciones.'
        : 'When we received the diagnosis, we felt the world stop. At Lápiz en Mano, we found not only therapy but a family that taught us to see abilities before limitations.',
      name: 'Familia Quispe',
      program: 'Mi Escuelita Down',
    },
    {
      quote: es
        ? 'Mi hijo llegó al centro sin poder expresarse. Hoy nos cuenta su día con detalle. Los profesionales son extraordinarios y el ambiente que han creado es único.'
        : 'My son arrived at the center unable to express himself. Today he tells us about his day in detail. The professionals are extraordinary and the environment they have created is unique.',
      name: 'Familia Mamani',
      program: 'Aula Wawitas',
    },
    {
      quote: es
        ? 'Pasos Firmes cambió la relación de mi hija con la escuela. Pasó de llorar cada mañana a querer ir. El equipo no solo trabaja con los niños, trabaja con toda la familia.'
        : 'Pasos Firmes changed my daughter\'s relationship with school. She went from crying every morning to wanting to go. The team doesn\'t just work with children, they work with the whole family.',
      name: 'Familia Torrez',
      program: 'Pasos Firmes',
    },
  ]

  return (
    <div className="bg-white">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gray-900 min-h-[560px] flex items-center">
        {/* Fondo decorativo */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full -translate-y-1/3 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full translate-y-1/3 -translate-x-1/4" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full" />
        </div>

        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-white/80 text-xs font-semibold uppercase tracking-widest">
                La Paz, Bolivia
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.05] mb-6">
              {es ? (
                <>
                  Cada niño tiene<br />
                  <span className="text-primary">un potencial único</span>
                </>
              ) : (
                <>
                  Every child has<br />
                  <span className="text-primary">a unique potential</span>
                </>
              )}
            </h1>

            <p className="text-lg md:text-xl text-white/70 max-w-2xl mb-10 leading-relaxed">
              {es
                ? 'Fundación PRO-21 y Centro Lápiz en Mano brindamos atención terapéutica y educativa especializada a niños con síndrome de Down, dificultades preescolares y dificultades de aprendizaje.'
                : 'PRO-21 Foundation and Lápiz en Mano Center provide specialized therapeutic and educational care for children with Down syndrome, preschool needs, and learning difficulties.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/${lang}/mi-escuelita-down`}
                className="inline-flex items-center gap-2 bg-primary text-gray-900 font-extrabold px-8 py-4 rounded-full hover:bg-primary/90 transition-colors min-h-[52px] text-base"
              >
                {es ? 'Ver programas' : 'See programs'}
              </Link>
              <a
                href="https://wa.me/59170106276"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white font-bold px-8 py-4 rounded-full hover:bg-white/20 transition-colors min-h-[52px] text-base"
              >
                <svg className="w-5 h-5 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp: 70106276
              </a>
            </div>
          </div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full h-8 md:h-14 fill-white">
            <path d="M0 40C480 0 960 60 1440 20V60H0Z" />
          </svg>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <section className="py-12 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center gap-2">
                <span className="text-4xl">{s.icon}</span>
                <span className="text-3xl font-extrabold text-gray-900">{s.val}</span>
                <span className="text-sm text-gray-500 leading-tight">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Programas ─────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full">
              {es ? 'Nuestros programas' : 'Our programs'}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4 mb-4">
              {es ? '¿En qué podemos ayudarte?' : 'How can we help you?'}
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              {es
                ? 'Tres programas especializados que atienden diferentes necesidades del desarrollo infantil, con un enfoque integral y personalizado.'
                : 'Three specialized programs addressing different childhood development needs, with a comprehensive and personalized approach.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {programs.map((p) => (
              <div
                key={p.title}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all group flex flex-col"
              >
                {/* Color top bar */}
                <div className={`h-2 ${p.color}`} />

                <div className="p-6 flex-1 flex flex-col">
                  {/* Badge + icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-bold uppercase tracking-wide ${p.textAccent} bg-gray-50 px-3 py-1 rounded-full`}>
                      {p.badge}
                    </span>
                    <span className="text-3xl">{p.icon}</span>
                  </div>

                  <h3 className="text-xl font-extrabold text-gray-900 mb-3">{p.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">{p.desc}</p>

                  {/* Age range */}
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-5">
                    <span>📅</span>
                    <span>{p.ages}</span>
                  </div>

                  {/* CTA */}
                  <Link
                    href={p.href}
                    className={`inline-flex items-center justify-center gap-2 ${p.color} ${p.textBtn} font-bold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all group-hover:scale-[1.02] min-h-[44px] text-sm`}
                  >
                    {es ? 'Conocer programa' : 'Learn more'}
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Misión (snippet) ─────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-secondary bg-secondary/10 px-4 py-1.5 rounded-full">
                {es ? 'Quiénes somos' : 'Who we are'}
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4 mb-6">
                {es ? 'Nuestra Misión' : 'Our Mission'}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {es
                  ? 'Nuestro compromiso es con los derechos de los niños y niñas con síndrome de Down, neurodivergencia y dificultades de aprendizaje a recibir una educación integral de calidad, inclusiva y personalizada que les permita desarrollar todo su potencial.'
                  : 'Our commitment is to the rights of children with Down syndrome, neurodivergence, and learning difficulties to receive quality, inclusive, and personalized comprehensive education that allows them to develop their full potential.'}
              </p>
              <Link
                href={`/${lang}/quienes-somos`}
                className="inline-flex items-center gap-2 text-secondary font-bold hover:gap-3 transition-all"
              >
                {es ? 'Conocer nuestra historia' : 'Learn our history'}
                <span>→</span>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '🤝', title: es ? 'Inclusión radical' : 'Radical inclusion', desc: es ? 'Eliminamos barreras y creamos espacios donde cada niño es valorado.' : 'We remove barriers and create spaces where every child is valued.' },
                { icon: '💡', title: es ? 'Innovación con propósito' : 'Purposeful innovation', desc: es ? 'Metodologías basadas en evidencia y adaptadas a cada perfil.' : 'Evidence-based methodologies adapted to each profile.' },
                { icon: '👨‍👩‍👧', title: es ? 'Familia como aliada' : 'Family as ally', desc: es ? 'Los padres son parte central del proceso terapéutico.' : 'Parents are a central part of the therapeutic process.' },
                { icon: '🌱', title: es ? 'Desarrollo holístico' : 'Holistic development', desc: es ? 'Atendemos todas las dimensiones: cognitiva, física, social y emocional.' : 'We attend all dimensions: cognitive, physical, social, and emotional.' },
              ].map((v) => (
                <div key={v.title} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <span className="text-2xl mb-2 block">{v.icon}</span>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">{v.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonios ───────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-4 py-1.5 rounded-full">
              {es ? 'Lo que dicen las familias' : 'What families say'}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4">
              {es ? 'Historias que nos motivan' : 'Stories that motivate us'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((t, i) => (
              <blockquote
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4"
              >
                <div className="text-primary text-3xl font-serif leading-none">"</div>
                <p className="text-gray-700 text-sm leading-relaxed italic flex-1">{t.quote}</p>
                <footer className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <span className="font-bold text-gray-900 text-sm">{t.name}</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary-700 font-semibold">
                    {t.program}
                  </span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ── Equipo preview ────────────────────────────────────────────────── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary bg-secondary/10 px-4 py-1.5 rounded-full">
            {es ? 'Equipo profesional' : 'Professional team'}
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-4 mb-4">
            {es ? '10 profesionales a tu lado' : '10 professionals by your side'}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-8">
            {es
              ? 'Nuestro equipo multidisciplinario incluye terapeutas de lenguaje, fisioterapeutas, psicomotricistas, psicólogos, trabajadores sociales y pedagogos.'
              : 'Our multidisciplinary team includes speech therapists, physiotherapists, psychomotricity specialists, psychologists, social workers, and educators.'}
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              { icon: '🗣️', label: es ? 'Terapia de lenguaje' : 'Speech therapy' },
              { icon: '💪', label: es ? 'Fisioterapia' : 'Physiotherapy' },
              { icon: '🤸', label: es ? 'Psicomotricidad' : 'Psychomotricity' },
              { icon: '🧠', label: es ? 'Psicología' : 'Psychology' },
              { icon: '🤝', label: es ? 'Trabajo social' : 'Social work' },
              { icon: '📖', label: es ? 'Pedagogía' : 'Pedagogy' },
            ].map((r) => (
              <div
                key={r.label}
                className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-700 font-medium"
              >
                <span>{r.icon}</span>
                <span>{r.label}</span>
              </div>
            ))}
          </div>

          <Link
            href={`/${lang}/equipo`}
            className="inline-flex items-center gap-2 bg-secondary text-white font-bold px-8 py-3.5 rounded-full hover:bg-secondary-600 transition-colors min-h-[44px]"
          >
            {es ? 'Conocer al equipo' : 'Meet the team'} →
          </Link>
        </div>
      </section>

      {/* ── CTA Final ─────────────────────────────────────────────────────── */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            {es ? '¿Quieres saber si podemos ayudar a tu hijo?' : 'Want to know if we can help your child?'}
          </h2>
          <p className="text-gray-800 text-lg mb-8 max-w-xl mx-auto">
            {es
              ? 'Contáctanos hoy. Realizamos una primera evaluación sin costo y te orientamos hacia el programa más adecuado.'
              : 'Contact us today. We conduct a free first evaluation and guide you to the most appropriate program.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/59170106276"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-900 text-white font-bold px-8 py-4 rounded-full hover:bg-gray-800 transition-colors min-h-[52px]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
            <Link
              href={`/${lang}/contacto`}
              className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors min-h-[52px]"
            >
              {es ? 'Formulario de contacto' : 'Contact form'}
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
