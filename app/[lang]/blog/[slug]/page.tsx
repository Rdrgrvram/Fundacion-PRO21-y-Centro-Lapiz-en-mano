import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts } from '@/lib/content'
import type { Locale } from '@/lib/i18n'

interface Props {
  params: { lang: Locale; slug: string }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: `${post.title} | Blog`,
    description: post.excerpt
  }
}

export default async function BlogPostPage({ params: { lang, slug } }: Props) {
  const es = lang === 'es'
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  return (
    <div className="overflow-x-hidden w-full bg-[#fafbfd] py-12 px-4 sm:py-16 md:py-20">
      <article className="container mx-auto max-w-2xl bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 md:p-12 shadow-sm text-left">
        
        {/* Encabezado del artículo */}
        <div className="border-b border-gray-100 pb-6 mb-8 select-none">
          <Link
            href={`/${lang}/blog`}
            className="text-xs font-bold text-[#2466a8] hover:underline flex items-center gap-1 mb-6 min-h-[44px] min-w-[44px]"
          >
            <span>←</span>
            <span>{es ? 'Volver al Blog' : 'Back to Blog'}</span>
          </Link>

          <time className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">
            ⏱ {post.date}
          </time>
          
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#0c2340] font-bold leading-tight mb-4">
            {post.title}
          </h1>

          <p className="text-xs sm:text-sm text-gray-400 font-semibold italic leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        {/* Imagen del post si existiese, sino banner elegante de la fundación */}
        <div className="h-48 sm:h-64 rounded-2xl bg-gradient-to-br from-[#e8f1fa] to-[#fafbfd] border border-gray-150 flex items-center justify-center text-5xl mb-8 select-none shadow-sm">
          <span>📰</span>
        </div>

        {/* Contenido principal en HTML renderizado */}
        <div 
          className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed space-y-4 prose prose-indigo max-w-none 
          prose-headings:font-serif prose-headings:text-[#0c2340] prose-headings:font-bold
          prose-p:mb-4 prose-p:leading-relaxed prose-strong:text-[#0c2340] prose-strong:font-bold"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* Sección de compartir / final */}
        <div className="border-t border-gray-100 pt-6 mt-10 flex flex-col sm:flex-row justify-between items-center gap-4 select-none">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs text-black font-extrabold shadow-inner">
              ✦
            </span>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              {es ? 'Fundación PRO-21 y Centro Lápiz en Mano' : 'PRO-21 Foundation & Lápiz en Mano'}
            </span>
          </div>

          <a
            href="https://wa.me/59170106276"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-[#25d366] hover:underline flex items-center gap-1 min-h-[44px]"
          >
            <span>💬</span>
            <span>{es ? 'Compartir comentarios por WhatsApp' : 'Share comments on WhatsApp'}</span>
          </a>
        </div>

      </article>
    </div>
  )
}
