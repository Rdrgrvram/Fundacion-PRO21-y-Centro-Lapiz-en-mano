import type { Locale } from '@/lib/i18n'
import { getSiteSettings, type Program } from '@/lib/cms'
import ProgramHero from './ProgramHero'
import ProgramStatsRow from './ProgramStatsRow'
import ProgramCardSection from './ProgramCardSection'
import ProgramTabSection from './ProgramTabSection'
import ProgramEnrollmentSteps from './ProgramEnrollmentSteps'
import ProgramCTA from './ProgramCTA'

interface ProgramPageLayoutProps {
  lang: Locale
  program: Program
}

// Composición compartida por los 3 programas (Mi Escuelita Down, Aula Wawitas,
// Pasos Firmes) — cada page.tsx queda como un wrapper fino que solo trae los
// datos. Ver docs/CMS-DOCUMENTATION.md §4.1 (ejemplo trabajado a fondo).
export default function ProgramPageLayout({ lang, program }: ProgramPageLayoutProps) {
  const { contact } = getSiteSettings(lang)
  return (
    <div className="bg-white">
      <ProgramHero lang={lang} program={program} whatsappNumber={contact.whatsapp_number} />
      <ProgramStatsRow stats={program.stats} />
      <ProgramCardSection id="section-1" section={program.section_1} alt />
      <ProgramTabSection id="section-2" section={program.section_2} />
      {program.section_3 && <ProgramCardSection section={program.section_3} alt />}
      <ProgramEnrollmentSteps section={program.enrollment} />
      <ProgramCTA lang={lang} program={program} whatsappNumber={contact.whatsapp_number} />
    </div>
  )
}
