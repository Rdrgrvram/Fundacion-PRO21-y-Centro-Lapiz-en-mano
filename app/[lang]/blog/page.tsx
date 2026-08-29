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
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-1/4 -left-16 w-64 h-64 bg-white/10 rounded-full" />
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" fill="none" className="block w-full h-8 md:h-12 lg:h-16 text-gray-50 fill-current">
            <path d="M0 0 Q360 60 720 30 Q1080 0 1440 0 L1440 60 L0 60 Z" />
          </svg>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-20">
          <nav className="flex items-center gap-2 text-white/60 text-xs mb-8">
            <Link href={`/${lang}`} className="hover:text-white transition-colors">{es ? 'Inicio' : 'Home'}</Link>
            <span>/</span>
            <span className="text-white font-semibold">Blog</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-1.5 mb-5">
            <span className="text-xs font-bold uppercase tracking-wider text-white select-none">{es ? 'Noticias y Artículos' : 'News & Articles'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-extrabold leading-tight mb-4">
            {es ? (
              <>
                Blog de la <br className="hidden sm:inline" />
                <span className="font-extrabold">Comunidad</span>
              </>
            ) : (
              <>
                Community <br className="hidden sm:inline" />
                <span className="font-extrabold">Blog</span>
              </>
            )}
          </h1>

          <p className="text-sm md:text-base text-white/80 max-w-2xl leading-relaxed">
            {es 
              ? 'Novedades sobre eventos, campañas de recaudación, metodologías terapéuticas y testimonios de superación en Bolivia.'
              : 'Updates on events, fundraising campaigns, therapeutic methodologies, and stories of growth in Bolivia.'}
          </p>
        </div>
      </section>

      {/* Grid de Artículos */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          
          {posts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-200 max-w-md mx-auto shadow-sm select-none">
              <span className="text-4xl block mb-3">📭</span>
              <h3 className="text-lg text-gray-700 font-bold mb-1">
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
                    <div className="h-44 bg-gradient-to-br from-secondary-50 to-gray-50 flex items-center justify-center text-4xl relative overflow-hidden select-none border-b border-gray-100">
                      <span className="animate-pulse">📰</span>
                      <span className="absolute bottom-3 right-3 text-[9px] font-bold text-gray-400 bg-white px-2 py-0.5 rounded-full shadow-sm">
                        {post.date}
                      </span>
                    </div>

                    <div className="p-6">
                      <h2 className="text-base sm:text-lg text-gray-900 font-bold mb-3 leading-snug line-clamp-2">
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
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            {es ? '¿Quieres contarnos tu historia?' : 'Want to share your story with us?'}
          </h2>
          <p className="text-white/90 text-sm sm:text-base mb-8 max-w-md mx-auto">
            {es 
              ? 'Si eres madre, padre, voluntario o aliado del centro y deseas redactar una nota de vivencia, escríbenos directamente.'
              : 'If you are a mother, father, volunteer, or partner of the center and want to write a story, message us directly.'}
          </p>
          <div className="flex justify-center">
            <a
              href="https://wa.me/59170106276"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-900 text-white font-bold px-8 py-4 rounded-full hover:bg-gray-800 transition-colors min-h-[52px]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              {es ? 'Contactar por WhatsApp' : 'Contact via WhatsApp'}
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
