'use client'
import type { Locale } from '@/lib/i18n'
import { useAccessibility } from './useAccessibility'

interface AccessibilityBarProps {
  lang: Locale
}

// Barra de escritorio (≥ lg). En móvil y tablet el mismo control vive en un panel del header (AccessibilityMenu):
// la barra ocupaba ~65 px de pantalla en cada visita al celular.
export default function AccessibilityBar({ lang }: AccessibilityBarProps) {
  const { fontSize, highContrast, aumentar: increaseFontSize, disminuir: decreaseFontSize, restablecer: resetFontSize, alternarContraste: toggleContrast } = useAccessibility()
  const es = lang === 'es'

  return (
    <div className="hidden lg:flex bg-secondary-700 text-white text-xs py-1.5 px-4 border-b border-white/10 flex-wrap items-center justify-between gap-3 min-h-[44px]">
      <span className="text-white/90 font-medium select-none">
        {es ? 'Centro Lápiz en Mano · La Paz, Bolivia' : 'Lápiz en Mano Center · La Paz, Bolivia'}
      </span>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-white/90 select-none mr-1">{es ? 'Accesibilidad:' : 'Accessibility:'}</span>
        
        <button 
          onClick={decreaseFontSize} 
          aria-label={es ? 'A− Reducir tamaño de texto' : 'A− Decrease font size'} 
          className="w-11 h-11 md:w-8 md:h-8 flex items-center justify-center rounded bg-white/10 hover:bg-white/20 active:bg-white/30 text-sm font-bold transition-colors"
        >
          A−
        </button>
        <button 
          onClick={resetFontSize} 
          aria-label={es ? 'A Restablecer tamaño de texto' : 'A Reset font size'} 
          className={`w-11 h-11 md:w-8 md:h-8 flex items-center justify-center rounded text-sm font-bold transition-colors ${fontSize === 100 ? 'bg-primary text-black' : 'bg-white/10 hover:bg-white/20 active:bg-white/30'}`}
        >
          A
        </button>
        <button 
          onClick={increaseFontSize} 
          aria-label={es ? 'A+ Aumentar tamaño de texto' : 'A+ Increase font size'} 
          className="w-11 h-11 md:w-8 md:h-8 flex items-center justify-center rounded bg-white/10 hover:bg-white/20 active:bg-white/30 text-sm font-bold transition-colors"
        >
          A+
        </button>

        <div className="w-px h-6 bg-white/15 mx-1 hidden sm:block" />

        <button 
          onClick={toggleContrast} 
          aria-label={es ? 'Alternar alto contraste' : 'Toggle high contrast'} 
          className={`px-3 min-h-[44px] md:min-h-0 md:h-8 flex items-center justify-center gap-1.5 rounded text-xs font-semibold transition-colors ${highContrast ? 'bg-primary text-black' : 'bg-white/10 hover:bg-white/20 active:bg-white/30'}`}
        >
          <span>◑</span>
          <span>{highContrast ? (es ? 'Contraste: Alto' : 'Contrast: High') : (es ? 'Contraste' : 'Contrast')}</span>
        </button>
      </div>
    </div>
  )
}
