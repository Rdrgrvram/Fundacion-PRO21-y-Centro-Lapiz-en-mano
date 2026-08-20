import type { Metadata } from 'next'
import { getAllTeamAreas, getAllTeamMembers, getAllVolunteers } from '@/lib/content'
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
  const areas = getAllTeamAreas(lang)
  const team = getAllTeamMembers(lang)
  const volunteers = getAllVolunteers()

  return <EquipoPageClient lang={lang} areas={areas} team={team} volunteers={volunteers} />
}
