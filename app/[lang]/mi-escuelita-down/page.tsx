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
    title: 'Mi Escuelita Down | Fundación PRO-21 y Centro Lápiz en Mano',
    description: es
      ? 'Intervención terapéutica y educativa integral para niños y niñas con síndrome de Down en La Paz, Bolivia.'
      : 'Comprehensive therapeutic and educational intervention for children with Down syndrome in La Paz, Bolivia.',
  }
}

export default function Page({ params: { lang } }: PageProps) {
  const program = getProgramBySlug('mi-escuelita-down', lang)
  if (!program) notFound()
  return <ProgramPageLayout lang={lang} program={program} />
}
