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
import { crearFondos } from './programTone'

interface ProgramPageLayoutProps {
  lang: Locale
  program: Program
}

// Composición compartida por todos los programas (content/programs/*) — cada page.tsx queda como un wrapper fino que solo trae los
// datos. Ver docs/CMS-DOCUMENTATION.md §4.1 (ejemplo trabajado a fondo).
export default function ProgramPageLayout({ lang, program }: ProgramPageLayoutProps) {
  const { contact } = getSiteSettings(lang)
  const testimonial = getAllTestimonials(lang).find((t) => t.program === program.title)
  // Un solo estándar para todos los programas: el fondo de cada sección sale de un ciclo fijo (ver programTone.ts).
  const siguienteFondo = crearFondos(program.hero.color)
  const hayGaleria = program.photos_authorized && !!program.gallery && program.gallery.photos.length > 0
  return (
    <div className="bg-white">
      <ProgramHero lang={lang} program={program} whatsappNumber={contact.whatsapp_number} />
      <ProgramStatsRow stats={program.stats} />
      <ProgramCardSection id="section-1" section={program.section_1} bg={siguienteFondo()} />
      <ProgramTabSection id="section-2" section={program.section_2} bg={siguienteFondo()} />
      {program.section_3 && <ProgramCardSection section={program.section_3} bg={siguienteFondo()} compact />}
      {program.section_4 && <ProgramCardSection section={program.section_4} bg={siguienteFondo()} compact />}
      {hayGaleria && <ProgramGallery section={program.gallery} color={program.hero.color} bg={siguienteFondo()} />}
      <ProgramEnrollmentSteps section={program.enrollment} lang={lang} bg={siguienteFondo()} />
      {testimonial && <ProgramTestimonial testimonial={testimonial} bg={siguienteFondo()} />}
      <ProgramCTA lang={lang} program={program} whatsappNumber={contact.whatsapp_number} />
    </div>
  )
}
