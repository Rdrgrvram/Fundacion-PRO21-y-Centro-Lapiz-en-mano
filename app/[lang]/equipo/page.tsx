import type { Metadata } from 'next'
import { getAllPrograms, getAllTeamAreas, getAllTeamMembers, getAllVolunteers, getEquipoPageContent, getSiteSettings } from '@/lib/cms'
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
  const programs = getAllPrograms(lang)
  const publicContent = {
    ...content,
    stats: content.stats.map((stat) =>
      /program/i.test(stat.label) ? { ...stat, value: String(programs.length) } : stat
    ),
  }
  const navLabel = getNavLabel(getSiteSettings(lang).nav, 'equipo')
  const areas = getAllTeamAreas(lang)
  const team = getAllTeamMembers(lang)
  const volunteers = getAllVolunteers()

  return (
    <EquipoPageClient
      lang={lang}
      content={publicContent}
      navLabel={navLabel}
      areas={areas}
      team={team}
      volunteers={volunteers}
    />
  )
}
