'use client'
import { useState, useEffect } from 'react'
import type { Locale } from '@/lib/i18n'

interface AccessibilityBarProps {
  lang: Locale
}

export default function AccessibilityBar({ lang }: AccessibilityBarProps) {
  const [fontSize, setFontSize] = useState(100)
  const [highContrast, setHighContrast] = useState(false)
  const es = lang === 'es'

  // Cargar preferencias iniciales del localStorage al montar el componente
  useEffect(() => {
    const savedFontSize = localStorage.getItem('pro21-font-size')
    const savedContrast = localStorage.getItem('pro21-high-contrast')

    if (savedFontSize) {
      const size = parseInt(savedFontSize, 10)
      setFontSize(size)
      document.documentElement.style.fontSize = `${size}%`
    }

    if (savedContrast === 'true') {
      setHighContrast(true)
      document.documentElement.classList.add('high-contrast')
    }
  }, [])

  const increaseFontSize = () => {
    const next = Math.min(fontSize + 10, 130)
    setFontSize(next)
    localStorage.setItem('pro21-font-size', next.toString())
    document.documentElement.style.fontSize = `${next}%`
  }

  const decreaseFontSize = () => {
    const next = Math.max(fontSize - 10, 90)
    setFontSize(next)
    localStorage.setItem('pro21-font-size', next.toString())
    document.documentElement.style.fontSize = `${next}%`
  }

  const resetFontSize = () => {
    setFontSize(100)
    localStorage.setItem('pro21-font-size', '100')
    document.documentElement.style.fontSize = '100%'
  }

  const toggleContrast = () => {
    const next = !highContrast
    setHighContrast(next)
    localStorage.setItem('pro21-high-contrast', next.toString())
    if (next) {
      document.documentElement.classList.add('high-contrast')
    } else {
      document.documentElement.classList.remove('high-contrast')
    }
  }

  return (
    <div className="bg-[#0c2340] text-white text-xs py-1.5 px-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 min-h-[44px]">
      <span className="text-white/60 font-medium select-none">
        {es ? 'Centro Lápiz en Mano · La Paz, Bolivia' : 'Centro Lápiz en Mano · La Paz, Bolivia'}
      </span>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-white/60 select-none mr-1">{es ? 'Accesibilidad:' : 'Accessibility:'}</span>
        
        <button 
          onClick={decreaseFontSize} 
          aria-label={es ? 'Reducir tamaño de texto' : 'Decrease font size'} 
          className="w-11 h-11 md:w-8 md:h-8 flex items-center justify-center rounded bg-white/10 hover:bg-white/20 active:bg-white/30 text-sm font-bold transition-colors"
        >
          A−
        </button>
        <button 
          onClick={resetFontSize} 
          aria-label={es ? 'Restablecer tamaño de texto' : 'Reset font size'} 
          className={`w-11 h-11 md:w-8 md:h-8 flex items-center justify-center rounded text-sm font-bold transition-colors ${fontSize === 100 ? 'bg-primary text-black' : 'bg-white/10 hover:bg-white/20 active:bg-white/30'}`}
        >
          A
        </button>
        <button 
          onClick={increaseFontSize} 
          aria-label={es ? 'Aumentar tamaño de texto' : 'Increase font size'} 
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
