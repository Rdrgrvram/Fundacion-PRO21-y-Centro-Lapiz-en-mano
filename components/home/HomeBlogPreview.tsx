'use client'
import Link from 'next/link'
import type { Locale } from '@/lib/i18n'
import type { Post } from '@/lib/content'

interface HomeBlogPreviewProps {
  lang: Locale
  posts: Omit<Post, 'contentHtml'>[]
}

export default function HomeBlogPreview({ lang, posts }: HomeBlogPreviewProps) {
  const es = lang === 'es'

  // Artículos de respaldo bilingües
  const fallbackPosts = [
    {
      slug: 'bienvenida',
      title: es 
        ? 'La fundación que no se detuvo: cómo el bloqueo visibilizó la inclusión en Bolivia'
        : 'The foundation that did not stop: how the blockade highlighted inclusion in Bolivia',
      excerpt: es 
        ? 'Durante los conflictos sociales en La Paz, un vehículo de la fundación fue agredido. La ola de solidaridad nacional e internacional puso los ojos del mundo en el Centro Lápiz en Mano.'
        : 'During the social conflicts in La Paz, a foundation vehicle was attacked. The wave of national and international solidarity turned the eyes of the world on Lápiz en Mano.',
      date: es ? 'Mayo 2026' : 'May 2026',
      category: es ? 'Prensa' : 'Press',
      emoji: '📰',
      catColor: 'bg-[#fdf6e3] text-[#e8a838]',
      readTime: es ? '8 min' : '8 min'
    },
    {
      slug: 'inscripciones-2026',
      title: es 
        ? 'Inscripciones abiertas: Mi Escuelita Inclusiva Down — Gestión 2026'
        : 'Enrollment open: Mi Escuelita Inclusiva Down — 2026 Intake',
      excerpt: es 
        ? 'Abrimos nuestras puertas para la gestión 2026 invitando a las familias a formar parte de un espacio educativo inclusivo, humano y especializado.'
        : 'We open our doors for the 2026 intake, inviting families to be part of an inclusive, human, and specialized educational space.',
      date: es ? 'Enero 2026' : 'January 2026',
      category: es ? 'Noticias' : 'News',
      emoji: '🌟',
      catColor: 'bg-[#e8f1fa] text-[#2466a8]',
      readTime: es ? '3 min' : '3 min'
    },
    {
      slug: 'dia-sindrome-down-2026',
      title: es 
        ? 'Día Mundial del Síndrome de Down: actividades y celebración'
        : 'World Down Syndrome Day: activities and celebration',
      excerpt: es 
        ? 'Cada 21 de marzo celebramos las capacidades y el valor de cada persona con síndrome de Down. Este año organizamos una jornada comunitaria abierta.'
        : 'Every March 21st we celebrate the abilities and value of each person with Down syndrome. This year we organized an open community day.',
      date: es ? 'Marzo 2026' : 'March 2026',
      category: es ? 'Campañas' : 'Campaigns',
      emoji: '💛',
      catColor: 'bg-[#fef0e8] text-[#e86840]',
      readTime: es ? '4 min' : '4 min'
    }
  ]

  // Consolidar posts a mostrar (máximo 3)
  const displayPosts = posts.length > 0 
    ? posts.slice(0, 3).map((p, idx) => {
        const fallback = fallbackPosts[idx % fallbackPosts.length]
        return {
          slug: p.slug,
          title: p.title,
          excerpt: p.excerpt,
          date: p.date,
          category: fallback.category,
          emoji: fallback.emoji,
          catColor: fallback.catColor,
          readTime: fallback.readTime
        }
      })
    : fallbackPosts

  return (
    <section className="bg-white py-16 md:py-24 border-b border-gray-100">
      <div className="container mx-auto px-4">
        
        {/* Cabecera */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-5xl mx-auto mb-12 md:mb-16">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 bg-[#e0f5f0] border border-[#1a8a7d]/15 rounded-full px-4 py-1.5 mb-4 shadow-sm select-none">
              <span className="text-sm">✦</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1a8a7d]">
                {es ? 'Blog y noticias' : 'Blog & News'}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0c2340] font-normal tracking-tight">
              {es ? 'Lo que está pasando' : 'What is happening'}
            </h2>
          </div>
          <Link
            href={`/${lang}/blog`}
            className="text-sm font-extrabold text-secondary hover:text-primary transition-colors flex items-center gap-1.5 min-h-[44px]"
          >
            <span>{es ? 'Ver todas las publicaciones' : 'View all posts'}</span>
            <span>→</span>
          </Link>
        </div>

        {/* Listado */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {displayPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/${lang}/blog/${post.slug}`}
              className="group rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-gray-300"
            >
              <div>
                {/* Miniatura */}
                <div className={`aspect-[16/9] bg-gradient-to-br ${post.slug === 'bienvenida' ? 'from-[#fdf6e3] to-[#e8f1fa]' : post.slug === 'inscripciones-2026' ? 'from-[#e8f1fa] to-[#e5f5eb]' : 'from-[#fef0e8] to-[#fdf6e3]'} flex items-center justify-center relative`}>
                  <span className="text-5xl select-none transition-transform duration-500 group-hover:scale-110">
                    {post.emoji}
                  </span>
                  <span className={`absolute top-4 left-4 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${post.catColor}`}>
                    {post.category}
                  </span>
                </div>

                {/* Contenido */}
                <div className="p-6">
                  <div className="flex items-center gap-2.5 text-xs text-gray-400 font-semibold mb-3">
                    <span>{post.date}</span>
                    <span className="text-gray-200">•</span>
                    <span>⏱ {post.readTime}</span>
                  </div>
                  <h3 className="font-serif text-lg text-[#0c2340] font-bold group-hover:text-secondary transition-colors leading-snug mb-3">
                    {post.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 flex items-center gap-1.5 text-xs font-bold text-secondary group-hover:text-primary transition-colors">
                <span>{es ? 'Leer artículo' : 'Read post'}</span>
                <span>→</span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
