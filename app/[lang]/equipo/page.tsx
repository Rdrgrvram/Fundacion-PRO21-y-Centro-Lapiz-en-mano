import type { Metadata } from 'next'
import { getAllTeamAreas, getAllTeamMembers, getAllVolunteers, getEquipoPageContent, getSiteSettings } from '@/lib/cms'
import { getNavLabel } from '@/lib/utils'
import type { Locale } from '@/lib/i18n'
import EquipoPageClient from './EquipoPageClient'

interface PageProps {
  params: { lang: Locale }
}

export async function generateMetadata({ params: { lang } }: PageProps): Promise<Metadata> {
  const es = lang === 'es'
  return {
    title: es ? 'Equipo | Fundación PRO-21 y Centro Lápiz en Mano' : 'Team | PRO-21 Foundation & Lápiz en Mano Center',
    description: es
      ? 'Conoce al equipo multidisciplinario de terapeutas y educadores del Centro Lápiz en Mano en La Paz, Bolivia.'
      : 'Meet the multidisciplinary team of therapists and educators at the Lápiz en Mano Center in La Paz, Bolivia.',
  }
}

export default function Page({ params: { lang } }: PageProps) {
  const content = getEquipoPageContent(lang)
  const navLabel = getNavLabel(getSiteSettings(lang).nav, 'equipo')
  const areas = getAllTeamAreas(lang)
  const team = getAllTeamMembers(lang)
  const volunteers = getAllVolunteers()

  return (
    <EquipoPageClient
      lang={lang}
      content={content}
      navLabel={navLabel}
      areas={areas}
      team={team}
      volunteers={volunteers}
    />
  )
}
