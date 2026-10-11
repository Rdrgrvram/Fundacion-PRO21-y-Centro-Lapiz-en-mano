import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import { notFound } from 'next/navigation'
import { getAllPrograms, getProgramBySlug } from '@/lib/cms'
import { locales, type Locale } from '@/lib/i18n'
import ProgramPageLayout from '@/components/sections/ProgramPageLayout'

interface PageProps {
  params: { lang: Locale; program: string }
}

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    getAllPrograms(lang).map((program) => ({ lang, program: program.slug }))
  )
}

export async function generateMetadata({ params: { lang, program: slug } }: PageProps): Promise<Metadata> {
  const program = getProgramBySlug(slug, lang)
  if (!program) return {}

  return pageMetadata({
    lang,
    path: `/${slug}`,
    title: `${program.title} | Fundación PRO-21 y Centro Lápiz en Mano`,
    description: program.hero.subtitle,
  })
}

export default function Page({ params: { lang, program: slug } }: PageProps) {
  const program = getProgramBySlug(slug, lang)
  if (!program) notFound()

  return <ProgramPageLayout lang={lang} program={program} />
}
