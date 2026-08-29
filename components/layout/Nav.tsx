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

// Rutas de los 3 programas — se agrupan bajo un solo ítem "Programas" en el
// nav de escritorio para no saturar la barra horizontal con 10 links sueltos.
const PROGRAM_ROUTES = ['mi-escuelita-down', 'aula-wawitas', 'pasos-firmes']

export default function Nav({ lang, items }: NavProps) {
  const pathname = usePathname()

  const linkClass = (isActive: boolean) =>
    `text-sm font-medium transition-colors hover:text-primary-700 ${
      isActive ? 'text-primary-700' : 'text-gray-600'
    }`

  const renderLink = ({ route, label }: NavItem) => {
    const href = `/${lang}/${route}`
    const isActive = pathname?.startsWith(href)
    return (
      <Link key={route} href={href} className={linkClass(!!isActive)}>
        {label}
      </Link>
    )
  }

  const programItems = items.filter(({ route }) => PROGRAM_ROUTES.includes(route))
  const programsLabel = lang === 'es' ? 'Programas' : 'Programs'
  const isProgramsActive = programItems.some(({ route }) => pathname?.startsWith(`/${lang}/${route}`))

  let programsDropdownRendered = false

  return (
    <nav className="hidden lg:flex items-center gap-6">
      {items.map((item) => {
        if (PROGRAM_ROUTES.includes(item.route)) {
          if (programsDropdownRendered || programItems.length === 0) return null
          programsDropdownRendered = true
          return (
            <div key="programas" className="relative group">
              <button
                type="button"
                className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary-700 focus:outline-none ${
                  isProgramsActive ? 'text-primary-700' : 'text-gray-600'
                }`}
                aria-haspopup="true"
              >
                {programsLabel}
                <svg
                  className="w-3 h-3 mt-px transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Puente invisible para que el mouse no pierda el hover al bajar al menú */}
              <div className="absolute left-0 top-full h-2 w-full" />

              <div
                className="invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 absolute left-0 top-full pt-2 transition-all duration-150 z-50"
              >
                <div className="bg-white rounded-xl border border-gray-100 shadow-lg py-2 min-w-[220px]">
                  {programItems.map(({ route, label }) => {
                    const href = `/${lang}/${route}`
                    const isActive = pathname?.startsWith(href)
                    return (
                      <Link
                        key={route}
                        href={href}
                        className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                          isActive ? 'bg-secondary/10 text-secondary' : 'text-gray-700 hover:bg-gray-50 hover:text-secondary'
                        }`}
                      >
                        {label}
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        }
        return renderLink(item)
      })}
    </nav>
  )
}
