import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import { getAllTestimonials } from '@/lib/content'
import { getAllPrograms, getImpactContent, getSiteSettings } from '@/lib/cms'
import { isVisibleProgramReference, normalizeProgramSlug } from '@/lib/program-references'
import type { Locale } from '@/lib/i18n'
import ImpactoPageClient from './ImpactoPageClient'

interface PageProps {
  params: { lang: Locale }
}

export async function generateMetadata({ params: { lang } }: PageProps): Promise<Metadata> {
  const content = getImpactContent(lang)
  return pageMetadata({
    lang,
    path: '/impacto',
    title: `${content.hero.title_line1} ${content.hero.title_line2} | Fundación PRO-21 y Centro Lápiz en Mano`,
    description: content.hero.subtitle,
  })
}

export default function Page({ params: { lang } }: PageProps) {
  const content = getImpactContent(lang)
  const programs = getAllPrograms(lang)
  const visibleProgramSlugs = new Set(programs.map((program) => program.slug))
  const testimonials = getAllTestimonials(lang, { visibleProgramSlugs }).filter((t) => t.featuredImpacto)

  // Consentimiento: una foto asociada a un programa solo se muestra si ese programa tiene
  // las fotos autorizadas (Art. IV). Las fotos sin programa (uso general) se muestran.
  const authorizedSlugs = new Set(programs.filter((program) => program.photos_authorized).map((program) => program.slug))
  const knownSlugs = new Set(getAllPrograms(lang, { includeHidden: true }).map((program) => program.slug))
  const photoAllowed = (ref?: string) => {
    const slug = normalizeProgramSlug(ref)
    return !slug || !knownSlugs.has(slug) || authorizedSlugs.has(slug)
  }
  const gallery = content.gallery.filter(
    (image) =>
      isVisibleProgramReference(image.program_slug ?? image.category, visibleProgramSlugs) &&
      photoAllowed(image.program_slug)
  )
  // "Todos" (índice 0) siempre; el resto solo si conserva al menos una foto.
  const gallery_categories = content.gallery_categories.filter(
    (category, index) =>
      index === 0 ||
      (isVisibleProgramReference(category, visibleProgramSlugs) && gallery.some((image) => image.category === category))
  )
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
    gallery_categories,
    gallery,
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
