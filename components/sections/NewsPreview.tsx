import Image from 'next/image'
import Link from 'next/link'
import type { Locale } from '@/lib/i18n'
import type { Post } from '@/lib/content'
import Icon from '@/components/ui/Icon'

interface NewsPreviewProps {
  lang: Locale
  posts: Omit<Post, 'contentHtml'>[]
  badge: string
  title: string
  ctaLabel: string
  readLabel: string
}

// "2026-07-01" → "1 de julio de 2026" / "July 1, 2026". Se arma a mano (sin `new Date`)
// para que la zona horaria no corra la fecha un día.
const MONTHS = {
  es: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
}

function formatDate(iso: string, lang: Locale): string {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (!m) return iso
  const [, y, mo, d] = m
  const month = MONTHS[lang][Number(mo) - 1] ?? mo
  return lang === 'es' ? `${Number(d)} de ${month} de ${y}` : `${month} ${Number(d)}, ${y}`
}

// Últimas publicaciones del blog en Inicio (RF-008). Si no hay ninguna, no se muestra
// la sección (no queda un bloque vacío).
export default function NewsPreview({ lang, posts, badge, title, ctaLabel, readLabel }: NewsPreviewProps) {
  if (posts.length === 0) return null

  return (
    <section data-testid="news-preview" className="py-16 md:py-20 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary-700 bg-secondary/10 px-4 py-1.5 rounded-full">
            {badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4">{title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(18rem,22rem))] justify-center gap-6 max-w-6xl mx-auto">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow"
            >
              <Link
                href={`/${lang}/blog/${post.slug}`}
                aria-hidden="true"
                tabIndex={-1}
                className="relative block h-44 bg-gradient-to-br from-secondary-50 to-gray-50"
              >
                {post.image ? (
                  <Image src={post.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center text-secondary-700/40">
                    <Icon name="newspaper" className="h-10 w-10" />
                  </span>
                )}
              </Link>
              <div className="p-6 flex flex-col gap-3 flex-1">
                <time dateTime={post.date} className="text-xs font-semibold text-gray-600">
                  {formatDate(post.date, lang)}
                </time>
                <h3 className="text-lg font-bold text-gray-900 leading-snug">
                  <Link href={`/${lang}/blog/${post.slug}`} className="hover:text-secondary-700 transition-colors">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{post.excerpt}</p>
                <Link
                  href={`/${lang}/blog/${post.slug}`}
                  className="mt-auto inline-flex min-h-[44px] items-center text-sm font-bold text-secondary-700 hover:underline"
                >
                  {readLabel} →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href={`/${lang}/blog`}
            className="inline-flex min-h-[44px] items-center rounded-full border-2 border-gray-200 px-6 text-sm font-bold text-gray-800 hover:border-secondary hover:text-secondary-700 transition-colors"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
