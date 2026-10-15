import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import { getAllPrograms, getFamiliesContent, getSiteSettings } from '@/lib/cms'
import { isVisibleProgramReference } from '@/lib/program-references'
import type { Locale } from '@/lib/i18n'
import FamiliasPageClient from './FamiliasPageClient'
import { getHiddenTestimonialFamilies } from '@/lib/content'

interface PageProps {
  params: { lang: Locale }
}

export async function generateMetadata({ params: { lang } }: PageProps): Promise<Metadata> {
  const content = getFamiliesContent(lang)
  return pageMetadata({
    lang,
    path: '/familias',
    title: `${content.hero.title_line1} ${content.hero.title_line2} | Fundación PRO-21 y Centro Lápiz en Mano`,
    description: content.hero.subtitle,
  })
}

export default function Page({ params: { lang } }: PageProps) {
  const content = getFamiliesContent(lang)
  const visibleProgramSlugs = new Set(getAllPrograms(lang).map((program) => program.slug))
  const retiradas = getHiddenTestimonialFamilies(lang)
  const citaRetirada = !!content.welcome_letter.quote_author && retiradas.has(content.welcome_letter.quote_author.trim())
  const publicContent = {
    ...content,
    // La cita junto a la carta es copia de un testimonio: si está oculto, se retira también.
    welcome_letter: citaRetirada
      ? { ...content.welcome_letter, quote: undefined, quote_author: undefined }
      : content.welcome_letter,
    guides: content.guides.filter((guide) =>
      isVisibleProgramReference(guide.program_slug ?? guide.program, visibleProgramSlugs)
    ),
  }
  const { whatsapp_number } = getSiteSettings(lang).contact
  return <FamiliasPageClient lang={lang} content={publicContent} whatsappNumber={whatsapp_number} />
}
