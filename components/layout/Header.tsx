import Link from 'next/link'
import type { Locale } from '@/lib/i18n'
import Nav from './Nav'
import LanguageSwitcher from './LanguageSwitcher'

interface HeaderProps {
  lang: Locale
}

// TODO: agregar logo de la fundación
export default function Header({ lang }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link href={`/${lang}`} className="font-bold text-xl text-primary">
          Fundación PRO-21
        </Link>
        <Nav lang={lang} />
        <LanguageSwitcher lang={lang} />
      </div>
    </header>
  )
}
