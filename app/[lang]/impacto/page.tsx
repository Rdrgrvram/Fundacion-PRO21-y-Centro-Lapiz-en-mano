import type { Metadata } from 'next'
import { getAllTestimonials } from '@/lib/content'
import { getImpactContent } from '@/lib/cms'
import type { Locale } from '@/lib/i18n'
import ImpactoPageClient from './ImpactoPageClient'

interface PageProps {
  params: { lang: Locale }
}

export async function generateMetadata({ params: { lang } }: PageProps): Promise<Metadata> {
  const content = getImpactContent(lang)
  return {
    title: `${content.hero.title_line1} ${content.hero.title_line2} | Fundación PRO-21 y Centro Lápiz en Mano`,
    description: content.hero.subtitle,
  }
}

export default function Page({ params: { lang } }: PageProps) {
  const content = getImpactContent(lang)
  const testimonials = getAllTestimonials(lang).filter((t) => t.featuredImpacto)

  return <ImpactoPageClient lang={lang} content={content} testimonials={testimonials} />
}
