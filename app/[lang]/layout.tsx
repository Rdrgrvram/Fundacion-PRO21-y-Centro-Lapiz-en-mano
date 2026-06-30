import { locales, type Locale } from '@/lib/i18n'
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

  return (
    <>
      <Header lang={lang} />
      <main>{children}</main>
      <Footer lang={lang} />
      <WhatsAppButton phone="59170106276" />
    </>
  )
}
