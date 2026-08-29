'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import type { Locale } from '@/lib/i18n'
import type { SiteSettingsContent } from '@/lib/cms-schemas'
import Nav from './Nav'
import LanguageSwitcher from './LanguageSwitcher'
import AccessibilityBar from './AccessibilityBar'
import Button from '@/components/ui/Button'

interface HeaderProps {
  lang: Locale
  settings: SiteSettingsContent
}

export default function Header({ lang, settings }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const es = lang === 'es'

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
    <div className="sticky top-0 z-50 w-full flex flex-col">
      {/* Barra de accesibilidad global — se colapsa al hacer scroll */}
      <div className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${scrolled ? 'max-h-0' : 'max-h-16'}`}>
        <AccessibilityBar lang={lang} />
      </div>

      {/* Header principal */}
      <header className="w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
        <div className="w-full pl-2 pr-4 md:pl-4 md:pr-6 flex items-center justify-between h-16 md:h-20">
          
          {/* Logo / Identidad */}
          <Link href={`/${lang}`} className="flex items-center gap-2 md:gap-3 group py-1.5 focus:outline-none" aria-label="Inicio — Fundación PRO-21 y Centro Lápiz en Mano">
            <Image
              src="/icons/logo-pro21.png"
              alt="Fundación PRO-21"
              width={40}
              height={48}
              className="h-10 md:h-12 w-auto object-contain"
              priority
            />
            <div className="w-px h-8 bg-gray-200 flex-shrink-0" />
            <Image
              src="/icons/logo-lapiz.png"
              alt="Centro Lápiz en Mano"
              width={40}
              height={40}
              className="h-10 md:h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Menú de navegación de escritorio (hidden on screens < 1280px) */}
          <Nav lang={lang} items={settings.nav} />

          {/* Acciones del Header (Idioma + Colaborar en Escritorio) */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher lang={lang} />
            <Button href={`/${lang}/colabora`} variant="primary" className="rounded-full">
              {settings.header.cta_label}
            </Button>
          </div>

          {/* Controles para Móvil/Tablet */}
          <div className="flex lg:hidden items-center gap-2">
            <LanguageSwitcher lang={lang} />
            
            {/* Botón Hamburguesa */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={es ? 'Abrir menú de navegación' : 'Open navigation menu'}
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
          <div className="fixed top-0 right-0 bottom-0 w-[300px] max-w-[85vw] bg-white z-50 shadow-2xl flex flex-col p-6 transition-transform duration-300 transform translate-x-0 overflow-y-auto">
            {/* Header del cajón */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <div className="flex items-center gap-2">
                <Image src="/icons/logo-pro21.png" alt="Fundación PRO-21" width={32} height={38} className="h-9 w-auto object-contain" />
                <div className="w-px h-7 bg-gray-200" />
                <Image src="/icons/logo-lapiz.png" alt="Centro Lápiz en Mano" width={32} height={32} className="h-9 w-auto object-contain" />
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label={es ? 'Cerrar menú' : 'Close menu'}
                className="w-11 h-11 flex items-center justify-center rounded-full border border-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-colors focus:outline-none"
              >
                ✕
              </button>
            </div>

            {/* Enlaces de navegación */}
            <nav className="flex flex-col gap-1.5 flex-1">
              {settings.nav.map(({ route, label }) => {
                const href = `/${lang}/${route}`
                const isActive = pathname === href || pathname?.startsWith(href + '/')
                return (
                  <Link
                    key={route}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={`min-h-[44px] px-4 rounded-xl flex items-center text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-secondary/10 text-secondary'
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
              <div className="text-[10px] text-gray-400 text-center font-medium">
                {settings.header.tagline}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}
