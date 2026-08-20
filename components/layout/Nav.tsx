'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Locale } from '@/lib/i18n'

export interface NavItem {
  route: string
  label: string
}

interface NavProps {
  lang: Locale
  items: NavItem[]
}

export default function Nav({ lang, items }: NavProps) {
  const pathname = usePathname()

  return (
    <nav className="hidden xl:flex items-center gap-6">
      {items.map(({ route, label }) => {
        const href = `/${lang}/${route}`
        const isActive = pathname?.startsWith(href)
        return (
          <Link
            key={route}
            href={href}
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive ? 'text-primary' : 'text-gray-600'
            }`}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
