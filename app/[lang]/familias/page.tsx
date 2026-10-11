import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import { getAllPrograms, getFamiliesContent, getSiteSettings } from '@/lib/cms'
import { isVisibleProgramReference } from '@/lib/program-references'
import type { Locale } from '@/lib/i18n'
import FamiliasPageClient from './FamiliasPageClient'

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
  const publicContent = {
    ...content,
    guides: content.guides.filter((guide) =>
      isVisibleProgramReference(guide.program_slug ?? guide.program, visibleProgramSlugs)
    ),
  }
  const { whatsapp_number } = getSiteSettings(lang).contact
  return <FamiliasPageClient lang={lang} content={publicContent} whatsappNumber={whatsapp_number} />
}
