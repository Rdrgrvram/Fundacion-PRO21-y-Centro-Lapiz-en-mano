import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import type { Locale } from '@/lib/i18n'
import { getAllTeamAreas, getAllTeamMembers, getAllTestimonials } from '@/lib/content'
import { getHomeContent } from '@/lib/cms'
import type { AccentColor } from '@/lib/palette'
import ProtagonistPhoto from '@/components/sections/ProtagonistPhoto'
import Icon from '@/components/ui/Icon'

export const metadata: Metadata = {
  title: 'Fundación PRO-21 y Centro Lápiz en Mano | La Paz, Bolivia',
  description:
    'Intervención terapéutica y educativa especializada para niños con síndrome de Down, autismo y dificultades de aprendizaje en La Paz, Bolivia.',
}

// Estilos de tarjeta por programa — Tailwind JIT necesita clases literales en
// el código fuente, así que el color que llega del CMS (un enum) se resuelve
// acá, no se interpola directo. Ver lib/palette.ts para el mismo patrón.
const PROGRAM_STYLES: Record<AccentColor, { bg: string; textBtn: string; textAccent: string }> = {
  primary: { bg: 'bg-primary', textBtn: 'text-gray-900', textAccent: 'text-primary-700' },
  secondary: { bg: 'bg-secondary', textBtn: 'text-white', textAccent: 'text-secondary' },
  accent: { bg: 'bg-accent', textBtn: 'text-white', textAccent: 'text-accent' },
}

export default function Page({ params }: { params: { lang: Locale } }) {
  const { lang } = params
  const es = lang === 'es'

  const content = getHomeContent(lang)
  const testimonials = getAllTestimonials(lang).filter((t) => t.featuredHome)
  // La vista previa del equipo reusa las áreas de especialidad ya migradas en
  // la Fase 2 — evita duplicar la misma lista de roles en dos lugares.
  const teamAreas = getAllTeamAreas(lang)
  // Fila de fotos del equipo: 5 perfiles con foto, uno por cada área distinta,
  // para transmitir cercanía humana real (no solo íconos) sin sobrecargar el
  // preview. El resto del equipo se resume en el círculo "+N".
  const team = getAllTeamMembers(lang)
  const FEATURED_TEAM_SLUGS = ['belen-lazcano', 'benita-rosales', 'megan', 'wara-valdivia', 'yasmanni-peralta']
  const featuredTeam = FEATURED_TEAM_SLUGS.map((slug) => team.find((m) => m.slug === slug)).filter(
    (m): m is NonNullable<typeof m> => Boolean(m)
  )
  const remainingTeamCount = Math.max(team.length - featuredTeam.length, 0)

  return (
    <div className="bg-white">

      {/* ── Hero ──────────────────────────────────────────────────────────────
          Pieza insignia del sitio (bg-gray-900). Excepción documentada en
          docs/DESIGN_STANDARD.md: es el único hero con grid de 2 columnas
          (foto real + cita de familia superpuesta), igual que Colabora tiene
          su propia excepción por densidad de contenido. */}
      <section className="relative overflow-hidden bg-gray-900">
        {/* Fondo decorativo — mismo patrón de 2 círculos que el resto del sitio */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-1/4 -left-16 w-64 h-64 bg-white/10 rounded-full" />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-28 relative z-10">
          <div className="grid lg:grid-cols-2 lg:gap-14 lg:items-center">

            {/* Columna de texto */}
            <div>
              {/* Badge — mismo estilo tipo píldora que el resto del sitio */}
              <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-1.5 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-white select-none">
                  La Paz, Bolivia
                </span>
              </div>

              {/* Headline — directo y específico (qué hace la fundación),
                  no un eslogan abstracto. Ver DESIGN_STANDARD.md § Hero. */}
              <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-[1.05] mb-6">
                {content.hero.title_line1}<br />
                <span className="text-primary">{content.hero.title_line2}</span>
              </h1>

              <p className="text-lg md:text-xl text-white/70 max-w-2xl mb-10 leading-relaxed">
                {content.hero.subtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/${lang}/mi-escuelita-down`}
                  className="inline-flex items-center gap-2 bg-primary text-gray-900 font-extrabold px-8 py-4 rounded-full hover:bg-primary/90 transition-colors min-h-[52px] text-base"
                >
                  {content.hero.cta_primary}
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

            {/* Columna de foto — foto real del centro en forma orgánica, con
                blobs de color de marca detrás y una cita real de familia
                superpuesta (ver components/sections/ProtagonistPhoto.tsx). */}
            <ProtagonistPhoto
              src={content.hero.image}
              alt="Actividad en el Centro Lápiz en Mano"
              quote={content.hero.quote}
              author={content.hero.quote_author}
              context={content.hero.quote_program}
              quoteTone="light"
              priority
              className="mt-12 lg:mt-0"
            />

          </div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-10 md:h-14 fill-white">
            <path d="M0 0 Q360 60 720 30 Q1080 0 1440 0 L1440 60 L0 60 Z" />
          </svg>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <section className="py-12 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {content.stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-1.5">
                <Icon emoji={s.icon} className="h-6 w-6 text-secondary" />
                <span className="text-3xl font-extrabold text-gray-900">{s.value}</span>
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
              {content.programs_teaser.badge}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4 mb-4">
              {content.programs_teaser.title}
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              {content.programs_teaser.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {content.programs_teaser.cards.map((p) => {
              const style = PROGRAM_STYLES[p.color]
              return (
                <div
                  key={p.slug}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all group flex flex-col"
                >
                  {/* Color top bar */}
                  <div className={`h-2 ${style.bg}`} />

                  <div className="p-6 flex-1 flex flex-col">
                    {/* Badge + icon */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-xs font-bold uppercase tracking-wide ${style.textAccent} bg-gray-50 px-3 py-1 rounded-full`}>
                        {p.badge}
                      </span>
                      <Icon emoji={p.icon} className={`h-7 w-7 ${style.textAccent}`} />
                    </div>

                    <h3 className="text-xl font-extrabold text-gray-900 mb-3">{p.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">{p.desc}</p>

                    {/* Age range */}
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-5">
                      <Icon name="calendar" className="h-4 w-4" />
                      <span>{p.ages}</span>
                    </div>

                    {/* CTA */}
                    <Link
                      href={`/${lang}/${p.slug}`}
                      className={`inline-flex items-center justify-center gap-2 ${style.bg} ${style.textBtn} font-bold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all group-hover:scale-[1.02] min-h-[44px] text-sm`}
                    >
                      {es ? 'Conocer programa' : 'Learn more'}
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Misión (snippet) ─────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {content.mission.image && (
              <ProtagonistPhoto
                src={content.mission.image}
                alt={es ? 'Actividad en el Centro Lápiz en Mano' : 'Activity at Lápiz en Mano Center'}
                blobs={['primary', 'secondary']}
              />
            )}

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-secondary bg-secondary/10 px-4 py-1.5 rounded-full">
                {content.mission.badge}
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4 mb-6">
                {content.mission.title}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {content.mission.text}
              </p>
              <Link
                href={`/${lang}/quienes-somos`}
                className="inline-flex items-center gap-2 text-secondary font-bold hover:gap-3 transition-all"
              >
                {content.mission.link_text}
                <span>→</span>
              </Link>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {content.values.map((v, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <Icon emoji={v.icon} className="mb-2 h-5 w-5 text-secondary" />
                    <h4 className="font-bold text-gray-900 text-sm mb-1">{v.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{v.desc}</p>
                  </div>
                ))}
              </div>
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
            {testimonials.map((item) => (
              <blockquote
                key={item.slug}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4"
              >
                <div className="text-primary-700 text-3xl font-serif leading-none">&ldquo;</div>
                <p className="text-gray-700 text-sm leading-relaxed italic flex-1">{item.body}</p>
                <footer className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <span className="font-bold text-gray-900 text-sm">{item.family}</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary-700 font-semibold">
                    {item.program}
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
            {content.team_preview.badge}
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-4 mb-4">
            {content.team_preview.title}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-8">
            {content.team_preview.text}
          </p>

          {featuredTeam.length > 0 && (
            <div className="flex justify-center items-center -space-x-3 mb-8">
              {featuredTeam.map((m, i) => (
                <div
                  key={m.slug}
                  className="relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-4 border-white shadow-md"
                  style={{ zIndex: featuredTeam.length - i }}
                >
                  <Image src={m.photo as string} alt={`Foto de ${m.name}`} fill className="object-cover" />
                </div>
              ))}
              {remainingTeamCount > 0 && (
                <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full border-4 border-white shadow-md bg-secondary text-white flex items-center justify-center text-sm font-bold">
                  +{remainingTeamCount}
                </div>
              )}
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {teamAreas.map((area) => (
              <div
                key={area.slug}
                className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-700 font-medium"
              >
                <Icon emoji={area.icon} className="h-4 w-4 text-secondary" />
                <span>{area.name}</span>
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
            {content.cta.title}
          </h2>
          <p className="text-gray-800 text-lg mb-8 max-w-xl mx-auto">
            {content.cta.text}
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
