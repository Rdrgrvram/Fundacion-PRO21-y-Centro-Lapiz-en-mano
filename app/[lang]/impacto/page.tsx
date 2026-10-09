import type { Metadata } from 'next'
import { getAllTestimonials } from '@/lib/content'
import { getAllPrograms, getImpactContent, getSiteSettings } from '@/lib/cms'
import { isVisibleProgramReference } from '@/lib/program-references'
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
  const programs = getAllPrograms(lang)
  const visibleProgramSlugs = new Set(programs.map((program) => program.slug))
  const testimonials = getAllTestimonials(lang, { visibleProgramSlugs }).filter((t) => t.featuredImpacto)
  const publicContent = {
    ...content,
    stats: content.stats.map((stat) =>
      /program/i.test(stat.label) ? { ...stat, value: String(programs.length) } : stat
    ),
    reports: content.reports.filter((report) =>
      isVisibleProgramReference(report.program_slug, visibleProgramSlugs)
    ),
    media: content.media.filter((item) =>
      isVisibleProgramReference(item.program_slug, visibleProgramSlugs)
    ),
    gallery_categories: content.gallery_categories.filter((category) =>
      isVisibleProgramReference(category, visibleProgramSlugs)
    ),
    gallery: content.gallery.filter((image) =>
      isVisibleProgramReference(image.program_slug ?? image.category, visibleProgramSlugs)
    ),
  }
  const whatsappNumber = getSiteSettings(lang).contact.whatsapp_number

  return (
    <ImpactoPageClient
      lang={lang}
      content={publicContent}
      testimonials={testimonials}
      whatsappNumber={whatsappNumber}
    />
  )
}
