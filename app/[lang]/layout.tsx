import { locales, type Locale } from '@/lib/i18n'
import { getAllPrograms, getSiteSettings } from '@/lib/cms'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import '../../styles/globals.css'
import { inter, fraunces } from '../fonts'

// Metadatos base del sitio; cada página los extiende (título, canonical, hreflang, Open Graph).
export const metadata: Metadata = {
  title: 'Fundación PRO-21 | Centro Lápiz en Mano — La Paz, Bolivia',
  description:
    'Atención terapéutica y educativa para niños con síndrome de Down, autismo y dificultades de aprendizaje en La Paz, Bolivia.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fundacionpro21.org'),
}

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
    <html lang={lang} className={fraunces.variable}>
      <body className={inter.className}>
        <Header lang={lang} settings={settings} programs={programs} programRoutes={programRoutes} />
        <main>{children}</main>
        <Footer lang={lang} />
        <WhatsAppButton lang={lang} />
      </body>
    </html>
  )
}
