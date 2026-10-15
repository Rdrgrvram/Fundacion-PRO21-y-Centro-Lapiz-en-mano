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
        {/* Primer elemento enfocable: lleva al contenido sin recorrer menú y barra de accesibilidad. Queda fuera de pantalla (tamaño normal, sin sr-only) y baja al enfocarlo. */}
        <a
          href="#main"
          className="fixed left-4 top-4 z-[70] inline-flex min-h-[44px] -translate-y-[200%] items-center rounded-lg bg-white px-4 text-sm font-bold text-gray-900 shadow-lg focus:translate-y-0"
        >
          {lang === 'es' ? 'Saltar al contenido' : 'Skip to content'}
        </a>
        <Header lang={lang} settings={settings} programs={programs} programRoutes={programRoutes} />
        <main id="main" tabIndex={-1} className="focus:outline-none">{children}</main>
        <Footer lang={lang} />
        <WhatsAppButton lang={lang} />
      </body>
    </html>
  )
}
