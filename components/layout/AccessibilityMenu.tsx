'use client'
import { useEffect, useRef, useState } from 'react'
import type { Locale } from '@/lib/i18n'
import Icon from '@/components/ui/Icon'
import { useAccessibility } from './useAccessibility'

interface AccessibilityMenuProps {
  lang: Locale
}

// Panel de accesibilidad para móvil y tablet (< lg): un botón en el header abre tamaño de texto y alto contraste.
// Sustituye a la barra de escritorio en pantallas chicas y recupera ~65 px de alto. Misma lógica y mismo guardado
// (useAccessibility), así que la preferencia vale en ambos tamaños.
export default function AccessibilityMenu({ lang }: AccessibilityMenuProps) {
  const es = lang === 'es'
  const [abierto, setAbierto] = useState(false)
  const raiz = useRef<HTMLDivElement>(null)
  const boton = useRef<HTMLButtonElement>(null)
  const { fontSize, highContrast, aumentar, disminuir, restablecer, alternarContraste } = useAccessibility()

  useEffect(() => {
    if (!abierto) return
    const alClicFuera = (e: MouseEvent) => {
      if (!raiz.current?.contains(e.target as Node)) setAbierto(false)
    }
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setAbierto(false)
        boton.current?.focus()
      }
    }
    document.addEventListener('mousedown', alClicFuera)
    document.addEventListener('keydown', alTeclear)
    return () => {
      document.removeEventListener('mousedown', alClicFuera)
      document.removeEventListener('keydown', alTeclear)
    }
  }, [abierto])

  const tamano = 'flex h-11 w-11 items-center justify-center rounded-lg text-sm font-bold transition-colors active:scale-[0.97]'

  return (
    <div ref={raiz} className="relative lg:hidden">
      <button
        ref={boton}
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-expanded={abierto}
        aria-controls="panel-accesibilidad"
        aria-label={es ? 'Accesibilidad: tamaño de texto y contraste' : 'Accessibility: text size and contrast'}
        className={`flex h-11 w-11 items-center justify-center rounded-lg border text-gray-700 transition-colors active:bg-gray-100 ${
          abierto ? 'border-secondary-700 bg-secondary/10' : 'border-gray-200 hover:bg-gray-50'
        }`}
      >
        <Icon name="accessibility" className="h-5 w-5" />
      </button>

      {abierto && (
        <div
          id="panel-accesibilidad"
          role="group"
          aria-label={es ? 'Opciones de accesibilidad' : 'Accessibility options'}
          className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-gray-200 bg-white p-4 shadow-lg"
        >
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-600">{es ? 'Tamaño del texto' : 'Text size'}</p>
          <div className="mb-4 flex gap-2">
            <button type="button" onClick={disminuir} aria-label={es ? 'A− Reducir tamaño de texto' : 'A− Decrease font size'} className={`${tamano} bg-gray-100 text-gray-900 hover:bg-gray-200`}>
              A−
            </button>
            <button
              type="button"
              onClick={restablecer}
              aria-label={es ? 'A Restablecer tamaño de texto' : 'A Reset font size'}
              aria-pressed={fontSize === 100}
              className={`${tamano} ${fontSize === 100 ? 'bg-primary text-black' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
            >
              A
            </button>
            <button type="button" onClick={aumentar} aria-label={es ? 'A+ Aumentar tamaño de texto' : 'A+ Increase font size'} className={`${tamano} bg-gray-100 text-gray-900 hover:bg-gray-200`}>
              A+
            </button>
            <span className="ml-auto self-center text-xs font-semibold text-gray-600" aria-live="polite">
              {fontSize}%
            </span>
          </div>
          <button
            type="button"
            onClick={alternarContraste}
            aria-pressed={highContrast}
            aria-label={es ? 'Alternar alto contraste' : 'Toggle high contrast'}
            className={`flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg px-3 text-sm font-semibold transition-colors active:scale-[0.99] ${
              highContrast ? 'bg-primary text-black' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}
          >
            <span aria-hidden="true">◑</span>
            <span>{highContrast ? (es ? 'Contraste: Alto' : 'Contrast: High') : es ? 'Contraste' : 'Contrast'}</span>
          </button>
        </div>
      )}
    </div>
  )
}
