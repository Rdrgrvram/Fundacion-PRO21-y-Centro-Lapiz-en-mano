'use client'
import { useEffect, useRef, useState } from 'react'
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
  // Slugs de los programas (vienen del CMS vía Header); se agrupan en el dropdown.
  programRoutes: string[]
}

// Los programas se agrupan bajo un solo ítem "Programas" en el nav de escritorio para no
// saturar la barra horizontal con links sueltos. La lista sale del CMS, nunca fija en código.
export default function Nav({ lang, items, programRoutes }: NavProps) {
  const pathname = usePathname()
  // Desplegable de Programas: se abre con hover (mouse), con clic/Enter/Espacio (teclado y táctil) y se cierra con
  // Escape, al salir con Tab o al hacer clic fuera. Antes dependía solo de hover/foco y no tenía estado accesible.
  const [open, setOpen] = useState(false)
  const contenedor = useRef<HTMLDivElement>(null)
  const botonProgramas = useRef<HTMLButtonElement>(null)

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return
    const alClicFuera = (e: MouseEvent) => {
      if (!contenedor.current?.contains(e.target as Node)) setOpen(false)
    }
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        botonProgramas.current?.focus()
      }
    }
    document.addEventListener('mousedown', alClicFuera)
    document.addEventListener('keydown', alTeclear)
    return () => {
      document.removeEventListener('mousedown', alClicFuera)
      document.removeEventListener('keydown', alTeclear)
    }
  }, [open])

  const linkClass = (isActive: boolean) =>
    `text-sm font-medium transition-colors hover:text-primary-700 ${
      isActive ? 'text-primary-900' : 'text-gray-600'
    }`

  const renderLink = ({ route, label }: NavItem) => {
    const href = `/${lang}/${route}`
    const isActive = pathname?.startsWith(href)
    return (
      <Link key={route} href={href} aria-current={isActive ? 'page' : undefined} className={linkClass(!!isActive)}>
        {label}
      </Link>
    )
  }

  const programItems = items.filter(({ route }) => programRoutes.includes(route))
  const programsLabel = lang === 'es' ? 'Programas' : 'Programs'
  const isProgramsActive = programItems.some(({ route }) => pathname?.startsWith(`/${lang}/${route}`))

  let programsDropdownRendered = false

  return (
    <nav className="hidden lg:flex items-center gap-6">
      {items.map((item) => {
        if (programRoutes.includes(item.route)) {
          if (programsDropdownRendered || programItems.length === 0) return null
          programsDropdownRendered = true
          return (
            <div
              key="programas"
              ref={contenedor}
              className="relative group"
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={(e) => {
                if (!e.currentTarget.contains(document.activeElement)) setOpen(false)
              }}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false)
              }}
            >
              <button
                ref={botonProgramas}
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="menu-programas"
                className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary-700 ${
                  isProgramsActive ? 'text-primary-900' : 'text-gray-600'
                }`}
              >
                {programsLabel}
                <svg
                  className={`w-3 h-3 mt-px transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
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
                id="menu-programas"
                className={`absolute left-0 top-full pt-2 transition-all duration-150 z-50 ${
                  open ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 translate-y-1'
                }`}
              >
                <div className="bg-white rounded-xl border border-gray-100 shadow-lg py-2 min-w-[220px]">
                  {programItems.map(({ route, label }) => {
                    const href = `/${lang}/${route}`
                    const isActive = pathname?.startsWith(href)
                    return (
                      <Link
                        key={route}
                        href={href}
                        aria-current={isActive ? 'page' : undefined}
                        className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                          isActive ? 'bg-secondary/10 text-secondary-700' : 'text-gray-700 hover:bg-gray-50 hover:text-secondary'
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
