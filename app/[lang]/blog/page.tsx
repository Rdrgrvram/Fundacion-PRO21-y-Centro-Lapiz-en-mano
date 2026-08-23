import Link from 'next/link'
import { getAllPosts } from '@/lib/content'
import type { Locale } from '@/lib/i18n'
import type { Metadata } from 'next'

interface Props {
  params: { lang: Locale }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const es = params.lang === 'es'
  return {
    title: es ? 'Blog | Fundación PRO-21 y Centro Lápiz en Mano' : 'Blog | PRO-21 Foundation & Lápiz en Mano',
    description: es
      ? 'Noticias, artículos formativos y novedades de la Fundación PRO-21 y Centro Lápiz en Mano en La Paz, Bolivia.'
      : 'News, educational articles, and updates from the PRO-21 Foundation and Lápiz en Mano Center in La Paz, Bolivia.'
  }
}

export default async function Page({ params: { lang } }: Props) {
  const es = lang === 'es'
  const posts = await getAllPosts()

  return (
    <div className="overflow-x-hidden w-full bg-gray-50">
      
      {/* Hero Section */}
      <section className="relative bg-secondary overflow-hidden">
        {/* Decoraciones */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-1/4 -left-16 w-64 h-64 bg-white/10 rounded-full" />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-8">
            <Link href={`/${lang}`} className="hover:text-white transition-colors">
              {es ? 'Inicio' : 'Home'}
            </Link>
            <span>/</span>
            <span className="font-semibold text-white">Blog</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              {es ? 'Noticias y Artículos' : 'News & Articles'}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {es ? (
                <>
                  Blog de la <br />
                  <span className="text-primary font-bold">Comunidad</span>
                </>
              ) : (
                <>
                  Community <br />
                  <span className="text-primary font-bold">Blog</span>
                </>
              )}
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-2xl">
              {es 
                ? 'Novedades sobre eventos, campañas de recaudación, metodologías terapéuticas y testimonios de superación en Bolivia.'
                : 'Updates on events, fundraising campaigns, therapeutic methodologies, and stories of growth in Bolivia.'}
            </p>
          </div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 70" fill="none" className="block w-full h-8 md:h-12 lg:h-16 text-[#f9fafb] fill-current">
            <path d="M0 30C360 55 720 15 1080 40C1260 50 1380 42 1440 38V70H0Z" />
          </svg>
        </div>
      </section>

      {/* Grid de Artículos */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          
          {posts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-200 max-w-md mx-auto shadow-sm select-none">
              <span className="text-4xl block mb-3">📭</span>
              <h3 className="font-sans text-lg text-gray-700 font-bold mb-1">
                {es ? 'No hay artículos publicados' : 'No posts published yet'}
              </h3>
              <p className="text-xs text-gray-400">
                {es ? 'Vuelve pronto para leer nuestras novedades.' : 'Come back soon to read our updates.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white rounded-3xl border border-gray-200 overflow-hidden flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 h-full"
                >
                  <div>
                    {/* Cabecera visual simulada/placeholder */}
                    <div className="h-44 bg-gradient-to-br from-[#e8f7fb] to-[#f9fafb] flex items-center justify-center text-4xl relative overflow-hidden select-none border-b border-gray-100">
                      <span className="animate-pulse">📰</span>
                      <span className="absolute bottom-3 right-3 text-[9px] font-bold text-gray-400 bg-white px-2 py-0.5 rounded-full shadow-sm">
                        {post.date}
                      </span>
                    </div>

                    <div className="p-6">
                      <h2 className="font-sans text-base sm:text-lg text-[#111827] font-bold mb-3 leading-snug line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 select-none">
                    <Link
                      href={`/${lang}/blog/${post.slug}`}
                      className="w-full py-2.5 rounded-xl border border-primary/20 bg-white hover:bg-gray-50 text-xs font-bold text-center text-gray-700 transition-all flex items-center justify-center gap-1 min-h-[44px]"
                    >
                      <span>{es ? 'Leer artículo completo' : 'Read full post'}</span>
                      <span>→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-900 via-secondary-700 to-secondary">
        <div className="container mx-auto max-w-2xl text-center text-white/80 relative z-10">
          <span className="text-5xl block mb-4 select-none">👋</span>
          <h2 className="font-sans text-2xl sm:text-3xl text-white font-normal leading-tight mb-4">
            {es ? '¿Quieres contarnos tu historia?' : 'Want to share your story with us?'}
          </h2>
          <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-8 max-w-md mx-auto">
            {es 
              ? 'Si eres madre, padre, voluntario o aliado del centro y deseas redactar una nota de vivencia, escríbenos directamente.'
              : 'If you are a mother, father, volunteer, or partner of the center and want to write a story, message us directly.'}
          </p>
          <div className="flex justify-center">
            <a
              href="https://wa.me/59170106276"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary hover:bg-primary/95 text-black font-extrabold text-xs sm:text-sm px-8 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[44px] flex items-center justify-center gap-1.5 shadow-lg shadow-primary/10 select-none"
            >
              <span className="text-base">💬</span>
              {es ? 'Contactar por WhatsApp' : 'Contact via WhatsApp'}
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
