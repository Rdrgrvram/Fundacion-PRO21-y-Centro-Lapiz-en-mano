import { locales, type Locale } from '@/lib/i18n'
import { getAllPrograms, getSiteSettings } from '@/lib/cms'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

interface LangLayoutProps {
  children: React.ReactNode
  params: { lang: Locale }
}

export default function LangLayout({ children, params: { lang } }: LangLayoutProps) {
  if (!locales.includes(lang)) notFound()
  const settings = getSiteSettings(lang)
  const allPrograms = getAllPrograms(lang, { includeHidden: true })
  const programs = allPrograms.filter((program) => program.visible).map(({ slug, title }) => ({ slug, title }))
  const programRoutes = allPrograms.map((program) => program.slug)

  return (
    <>
      <Header lang={lang} settings={settings} programs={programs} programRoutes={programRoutes} />
      <main>{children}</main>
      <Footer lang={lang} />
      <WhatsAppButton lang={lang} />
    </>
  )
}
