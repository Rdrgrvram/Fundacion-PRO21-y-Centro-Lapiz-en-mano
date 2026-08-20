import type { Metadata } from 'next'
import { getCollaborateContent } from '@/lib/cms'
import type { Locale } from '@/lib/i18n'
import ColaboraPageClient from './ColaboraPageClient'

interface PageProps {
  params: { lang: Locale }
}

export async function generateMetadata({ params: { lang } }: PageProps): Promise<Metadata> {
  const content = getCollaborateContent(lang)
  return {
    title: `${content.hero.title_line1} ${content.hero.title_line2} | Fundación PRO-21 y Centro Lápiz en Mano`,
    description: content.hero.subtitle,
  }
}

export default function Page({ params: { lang } }: PageProps) {
  const content = getCollaborateContent(lang)
  return <ColaboraPageClient lang={lang} content={content} />
}
