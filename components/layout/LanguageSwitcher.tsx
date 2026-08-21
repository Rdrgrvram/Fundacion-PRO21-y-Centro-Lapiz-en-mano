'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Locale } from '@/lib/i18n'

interface Props {
  lang: Locale
}

export default function LanguageSwitcher({ lang }: Props) {
  const pathname = usePathname()
  const otherLang: Locale = lang === 'es' ? 'en' : 'es'

  // Reemplazo seguro: solo el prefijo /es o /en al inicio de la ruta
  let otherPath = `/${otherLang}`
  if (pathname) {
    otherPath = pathname.replace(new RegExp(`^/${lang}`), `/${otherLang}`)
    if (!otherPath.startsWith(`/${otherLang}`)) {
      otherPath = `/${otherLang}`
    }
  }

  return (
    <Link
      href={otherPath}
      className="text-sm font-medium text-gray-500 hover:text-primary border border-gray-200 rounded px-2 py-1 transition-colors"
      title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
    >
      {lang === 'es' ? 'EN' : 'ES'}
    </Link>
  )
}
