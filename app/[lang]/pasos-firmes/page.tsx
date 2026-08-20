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
    title: 'Pasos Firmes | Fundación PRO-21 y Centro Lápiz en Mano',
    description: es
      ? 'Apoyo psicopedagógico para niños y adolescentes con dificultades de aprendizaje en La Paz, Bolivia.'
      : 'Psychopedagogical support for children and adolescents with learning difficulties in La Paz, Bolivia.',
  }
}

export default function Page({ params: { lang } }: PageProps) {
  const program = getProgramBySlug('pasos-firmes', lang)
  if (!program) notFound()
  return <ProgramPageLayout lang={lang} program={program} />
}
