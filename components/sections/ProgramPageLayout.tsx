import type { Locale } from '@/lib/i18n'
import { getAllTestimonials } from '@/lib/content'
import { getSiteSettings, type Program } from '@/lib/cms'
import ProgramHero from './ProgramHero'
import ProgramStatsRow from './ProgramStatsRow'
import ProgramCardSection from './ProgramCardSection'
import ProgramTabSection from './ProgramTabSection'
import ProgramGallery from './ProgramGallery'
import ProgramEnrollmentSteps from './ProgramEnrollmentSteps'
import ProgramTestimonial from './ProgramTestimonial'
import ProgramCTA from './ProgramCTA'

interface ProgramPageLayoutProps {
  lang: Locale
  program: Program
}

// Composición compartida por todos los programas (content/programs/*) — cada page.tsx queda como un wrapper fino que solo trae los
// datos. Ver docs/CMS-DOCUMENTATION.md §4.1 (ejemplo trabajado a fondo).
export default function ProgramPageLayout({ lang, program }: ProgramPageLayoutProps) {
  const { contact } = getSiteSettings(lang)
  const testimonial = getAllTestimonials(lang).find((t) => t.program === program.title)
  return (
    <div className="bg-white">
      <ProgramHero lang={lang} program={program} whatsappNumber={contact.whatsapp_number} />
      <ProgramStatsRow stats={program.stats} />
      <ProgramCardSection id="section-1" section={program.section_1} alt />
      <ProgramTabSection id="section-2" section={program.section_2} />
      {program.section_3 && <ProgramCardSection section={program.section_3} alt compact />}
      {program.section_4 && <ProgramCardSection section={program.section_4} compact />}
      <ProgramGallery section={program.photos_authorized ? program.gallery : undefined} color={program.hero.color} />
      <ProgramEnrollmentSteps section={program.enrollment} />
      {testimonial && <ProgramTestimonial testimonial={testimonial} />}
      <ProgramCTA lang={lang} program={program} whatsappNumber={contact.whatsapp_number} />
    </div>
  )
}
