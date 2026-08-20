import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProgramBySlug } from '@/lib/content'
import type { Locale } from '@/lib/i18n'
import ProgramPageLayout from '@/components/sections/ProgramPageLayout'

interface PageProps {
  params: { lang: Locale }
}

export async function generateMetadata({ params: { lang } }: PageProps): Promise<Metadata> {
  const es = lang === 'es'
  return {
    title: 'Aula Wawitas | Fundación PRO-21 y Centro Lápiz en Mano',
    description: es
      ? 'Estimulación y educación preescolar integral para niños de 3 a 5 años en La Paz, Bolivia.'
      : 'Comprehensive preschool stimulation and education for children ages 3 to 5 in La Paz, Bolivia.',
  }
}

export default function Page({ params: { lang } }: PageProps) {
  const program = getProgramBySlug('aula-wawitas', lang)
  if (!program) notFound()
  return <ProgramPageLayout lang={lang} program={program} />
}
