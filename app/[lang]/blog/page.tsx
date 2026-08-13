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
    <div className="overflow-x-hidden w-full bg-[#fafbfd]">
      
      {/* Hero Section */}
      <section className="relative min-h-[360px] flex items-center bg-gradient-to-br from-[#0c2340] via-[#142d4c] to-[#2466a8] py-16 px-4 overflow-hidden text-center">
        {/* Decoraciones */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          <div className="absolute -top-[15%] -right-[8%] w-[300px] h-[300px] rounded-full border border-white/5 opacity-30" />
          <div className="absolute -bottom-[20%] -left-[6%] w-[250px] h-[250px] rounded-full bg-radial-gradient(circle, rgba(232,168,56,0.06), transparent 70%)" />
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 70" fill="none" className="block w-full h-8 md:h-12 lg:h-16 text-[#fafbfd] fill-current">
            <path d="M0 30C360 55 720 15 1080 40C1260 50 1380 42 1440 38V70H0Z" />
          </svg>
        </div>

        <div className="container mx-auto max-w-4xl relative z-20 mt-8">
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full py-1 px-3.5 mb-5 select-none">
            <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] text-black font-extrabold">📰</span>
            <span className="text-white/80 text-xs font-semibold">{es ? 'Noticias y Artículos' : 'News & Articles'}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-normal leading-tight mb-4">
            {es ? (
              <>
                Blog de la <br />
                <span className="font-bold italic text-primary">Comunidad</span>
              </>
            ) : (
              <>
                Community <br />
                <span className="font-bold italic text-primary">Blog</span>
              </>
            )}
          </h1>

          <p className="text-sm md:text-base text-white/70 max-w-xl mx-auto leading-relaxed">
            {es 
              ? 'Novedades sobre eventos, campañas de recaudación, metodologías terapéuticas y testimonios de superación en Bolivia.'
              : 'Updates on events, fundraising campaigns, therapeutic methodologies, and stories of growth in Bolivia.'}
          </p>
        </div>
      </section>

      {/* Grid de Artículos */}
      <section className="py-16 md:py-24 px-4 bg-[#fafbfd]">
        <div className="container mx-auto max-w-6xl">
          
          {posts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-200 max-w-md mx-auto shadow-sm select-none">
              <span className="text-4xl block mb-3">📭</span>
              <h3 className="font-serif text-lg text-gray-700 font-bold mb-1">
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
                    <div className="h-44 bg-gradient-to-br from-[#e8f1fa] to-[#fafbfd] flex items-center justify-center text-4xl relative overflow-hidden select-none border-b border-gray-100">
                      <span className="animate-pulse">📰</span>
                      <span className="absolute bottom-3 right-3 text-[9px] font-bold text-gray-400 bg-white px-2 py-0.5 rounded-full shadow-sm">
                        {post.date}
                      </span>
                    </div>

                    <div className="p-6">
                      <h2 className="font-serif text-base sm:text-lg text-[#0c2340] font-bold mb-3 leading-snug line-clamp-2">
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
      <section className="py-16 px-4 bg-gradient-to-br from-[#0c2340] via-[#142d4c] to-[#2466a8]">
        <div className="container mx-auto max-w-2xl text-center text-white/80 relative z-10">
          <span className="text-5xl block mb-4 select-none">👋</span>
          <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-tight mb-4">
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
