'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import type { Locale } from '@/lib/i18n'
import type { SiteSettingsContent } from '@/lib/cms-schemas'
import Nav from './Nav'
import LanguageSwitcher from './LanguageSwitcher'
import AccessibilityBar from './AccessibilityBar'
import AccessibilityMenu from './AccessibilityMenu'
import Button from '@/components/ui/Button'

interface HeaderProps {
  lang: Locale
  settings: SiteSettingsContent
  programs: Array<{ slug: string; title: string }>
  programRoutes: string[]
}

// Los programas salen del CMS (pueden crearse/ocultarse): se reemplazan los links
// fijos de programas de settings.nav por los programas visibles, en el mismo lugar.
function buildNavItems(settings: SiteSettingsContent, programs: HeaderProps['programs'], programRoutes: string[]) {
  const programSlugs = new Set(programRoutes)
  const programItems = programs.map((program) => ({ route: program.slug, label: program.title }))
  const items: Array<{ route: string; label: string }> = []
  let insertedPrograms = false

  for (const item of settings.nav) {
    if (programSlugs.has(item.route)) {
      if (!insertedPrograms) {
        items.push(...programItems)
        insertedPrograms = true
      }
      continue
    }
    items.push(item)
  }

  if (!insertedPrograms && programItems.length > 0) {
    const teamIndex = items.findIndex((item) => item.route === 'equipo')
    items.splice(teamIndex === -1 ? items.length : teamIndex, 0, ...programItems)
  }

  return items
}

export default function Header({ lang, settings, programs, programRoutes }: HeaderProps) {
  const navItems = buildNavItems(settings, programs, programRoutes)
  const programSlugs = programs.map((p) => p.slug)
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const es = lang === 'es'
  const botonMenu = useRef<HTMLButtonElement>(null)
  const cajon = useRef<HTMLDivElement>(null)
  const botonCerrar = useRef<HTMLButtonElement>(null)
  const estuvoAbierto = useRef(false)

  // Menú móvil como diálogo: Escape lo cierra, el foco entra al abrir, Tab no se escapa al fondo y el foco vuelve
  // al botón de menú al cerrar.
  useEffect(() => {
    if (!isOpen) {
      if (estuvoAbierto.current) botonMenu.current?.focus()
      estuvoAbierto.current = false
      return
    }
    estuvoAbierto.current = true
    botonCerrar.current?.focus()
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        return
      }
      if (e.key !== 'Tab' || !cajon.current) return
      const enfocables = cajon.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      if (enfocables.length === 0) return
      const primero = enfocables[0]
      const ultimo = enfocables[enfocables.length - 1]
      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault()
        ultimo.focus()
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault()
        primero.focus()
      }
    }
    document.addEventListener('keydown', alTeclear)
    return () => document.removeEventListener('keydown', alTeclear)
  }, [isOpen])

  // Si la ventana se ensancha hasta escritorio con el menú abierto, se cierra: si no, el scroll del fondo quedaba bloqueado.
  useEffect(() => {
    const consulta = window.matchMedia('(min-width: 1024px)')
    const alCambiar = (e: MediaQueryListEvent) => {
      if (e.matches) setIsOpen(false)
    }
    consulta.addEventListener('change', alCambiar)
    return () => consulta.removeEventListener('change', alCambiar)
  }, [])

  // Cerrar el menú cuando cambia la ruta (navegación completa)
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Colapsar la barra de accesibilidad al hacer scroll — sus controles (tamaño
  // de texto, contraste) se ajustan una vez y quedan guardados en localStorage,
  // así que no necesitan ocupar espacio de forma permanente en cada scroll.
  //
  // Histéresis + rAF: colapsar la barra reacomoda el layout (~44px). Con un solo
  // umbral, ese reacomodo podía volver a cruzarlo y hacer que la barra "rebotara".
  // Se colapsa recién a 160px y se re-expande solo por encima de 40px — la banda
  // muerta (120px) es mucho mayor que la altura de la barra, así que no hay bucle.
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const y = window.scrollY
      setScrolled((prev) => {
        if (!prev && y > 160) return true
        if (prev && y < 40) return false
        return prev
      })
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  // Deshabilitar scroll en el cuerpo cuando el menú móvil está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <div className="sticky top-0 z-[60] w-full flex flex-col">
      {/* Barra de accesibilidad global — se colapsa al hacer scroll */}
      <div className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${scrolled ? 'max-h-0' : 'max-h-16'}`}>
        <AccessibilityBar lang={lang} />
      </div>

      {/* Header principal */}
      <header className="w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
        <div className="w-full pl-2 pr-4 md:pl-4 md:pr-6 flex items-center justify-between h-16 md:h-20">
          
          {/* Logo / Identidad */}
          <Link href={`/${lang}`} className="flex items-center gap-2 md:gap-3 group py-1.5 rounded-lg" aria-label="Inicio — Fundación PRO-21 y Centro Lápiz en Mano">
            <Image
              src={settings.logo_pro21}
              alt={settings.logo_pro21_alt}
              width={40}
              height={48}
              className="h-10 md:h-12 w-auto object-contain"
              priority
            />
            <div className="w-px h-8 bg-gray-200 flex-shrink-0" />
            <Image
              src={settings.logo_lapiz}
              alt={settings.logo_lapiz_alt}
              width={40}
              height={40}
              className="h-10 md:h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Menú de navegación de escritorio (hidden on screens < 1280px) */}
          <Nav lang={lang} items={navItems} programRoutes={programSlugs} />

          {/* Acciones del Header (Idioma + Colaborar en Escritorio) */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher lang={lang} />
            <Button href={`/${lang}/colabora`} variant="primary" className="rounded-full">
              {settings.header.cta_label}
            </Button>
          </div>

          {/* Controles para Móvil/Tablet */}
          <div className="flex lg:hidden items-center gap-2">
            <AccessibilityMenu lang={lang} />
            <LanguageSwitcher lang={lang} />
            
            {/* Botón Hamburguesa */}
            <button
              ref={botonMenu}
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? (es ? 'Cerrar menú de navegación' : 'Close navigation menu') : es ? 'Abrir menú de navegación' : 'Open navigation menu'}
              aria-haspopup="dialog"
              aria-expanded={isOpen}
              className="w-11 h-11 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
            >
              <div className="w-6 h-5 flex flex-col justify-between items-center relative">
                <span className={`w-6 h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-6 h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? 'opacity-0 scale-0' : ''}`} />
                <span className={`w-6 h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
              </div>
            </button>
          </div>

        </div>
      </header>

      {/* Cajón de Navegación Móvil (Drawer) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay de fondo */}
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsOpen(false)}
          />

          {/* Contenedor del menú lateral */}
          <div
            ref={cajon}
            role="dialog"
            aria-modal="true"
            aria-label={es ? 'Menú de navegación' : 'Navigation menu'}
            className="fixed top-0 right-0 bottom-0 w-[300px] max-w-[85vw] bg-white z-50 shadow-2xl flex flex-col p-6 transition-transform duration-300 transform translate-x-0 overflow-y-auto">
            {/* Header del cajón */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <div className="flex items-center gap-2">
                <Image src={settings.logo_pro21} alt={settings.logo_pro21_alt} width={32} height={38} className="h-9 w-auto object-contain" />
                <div className="w-px h-7 bg-gray-200" />
                <Image src={settings.logo_lapiz} alt={settings.logo_lapiz_alt} width={32} height={32} className="h-9 w-auto object-contain" />
              </div>
              <button
                ref={botonCerrar}
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label={es ? 'Cerrar menú' : 'Close menu'}
                className="w-11 h-11 flex items-center justify-center rounded-full border border-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Enlaces de navegación */}
            <nav className="flex flex-col gap-1.5 flex-1">
              {navItems.map(({ route, label }) => {
                const href = `/${lang}/${route}`
                const isActive = pathname === href || pathname?.startsWith(href + '/')
                return (
                  <Link
                    key={route}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={`min-h-[44px] px-4 rounded-xl flex items-center text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-secondary/10 text-secondary-700'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-secondary'
                    }`}
                  >
                    {label}
                  </Link>
                )
              })}
            </nav>

            {/* Footer del cajón móvil */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-3">
              <Button href={`/${lang}/colabora`} variant="primary" size="lg" className="w-full rounded-xl">
                {settings.header.cta_label}
              </Button>
              <div className="text-[10px] text-gray-500 text-center font-medium">
                {settings.header.tagline}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}
