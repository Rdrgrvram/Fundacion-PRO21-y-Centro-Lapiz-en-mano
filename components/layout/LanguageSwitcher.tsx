'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Locale } from '@/lib/i18n'

interface Props {
  lang: Locale
}

export default function LanguageSwitcher({ lang }: Props) {
  const pathname = usePathname()
  // Reemplazar el prefijo de idioma en la ruta actual
  const otherLang: Locale = lang === 'es' ? 'en' : 'es'
  const otherPath = pathname?.replace(`/${lang}`, `/${otherLang}`) ?? `/${otherLang}`

  return (
    <Link
      href={otherPath}
      className="text-sm font-medium text-gray-500 hover:text-primary border border-gray-200 rounded px-2 py-1"
      title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
    >
      {lang === 'es' ? 'EN' : 'ES'}
    </Link>
  )
}
