'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Locale } from '@/lib/i18n'

interface NavProps {
  lang: Locale
}

const NAV_ITEMS = [
  { key: 'quienes-somos', label: { es: 'Quiénes somos', en: 'About us' } },
  { key: 'mi-escuelita-down', label: { es: 'Mi Escuelita Down', en: 'Mi Escuelita Down' } },
  { key: 'aula-wawitas', label: { es: 'Aula Wawitas', en: 'Aula Wawitas' } },
  { key: 'pasos-firmes', label: { es: 'Pasos Firmes', en: 'Pasos Firmes' } },
  { key: 'equipo', label: { es: 'Equipo', en: 'Team' } },
  { key: 'impacto', label: { es: 'Impacto', en: 'Impact' } },
  { key: 'colabora', label: { es: 'Colabora', en: 'Support us' } },
  { key: 'contacto', label: { es: 'Contacto', en: 'Contact' } },
]

export default function Nav({ lang }: NavProps) {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex items-center gap-6">
      {NAV_ITEMS.map(({ key, label }) => {
        const href = `/${lang}/${key}`
        const isActive = pathname?.startsWith(href)
        return (
          <Link
            key={key}
            href={href}
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive ? 'text-primary' : 'text-gray-600'
            }`}
          >
            {label[lang]}
          </Link>
        )
      })}
    </nav>
  )
}
