'use client'
import { useState } from 'react'

// Barra de accesibilidad: ajuste de tamaño de texto y contraste alto
// WCAG AA mínimo requerido
export default function AccessibilityBar() {
  const [fontSize, setFontSize] = useState(100)
  const [highContrast, setHighContrast] = useState(false)

  const increaseFontSize = () => {
    const next = Math.min(fontSize + 10, 130)
    setFontSize(next)
    document.documentElement.style.fontSize = `${next}%`
  }

  const decreaseFontSize = () => {
    const next = Math.max(fontSize - 10, 90)
    setFontSize(next)
    document.documentElement.style.fontSize = `${next}%`
  }

  const toggleContrast = () => {
    setHighContrast(!highContrast)
    document.documentElement.classList.toggle('high-contrast')
  }

  return (
    <div className="bg-gray-100 text-sm py-1 px-4 flex items-center gap-4 justify-end">
      <span className="text-gray-600">Accesibilidad:</span>
      <button onClick={decreaseFontSize} aria-label="Reducir texto" className="hover:text-primary">A-</button>
      <button onClick={increaseFontSize} aria-label="Aumentar texto" className="hover:text-primary font-bold">A+</button>
      <button onClick={toggleContrast} aria-label="Alto contraste" className={`hover:text-primary ${highContrast ? 'font-bold' : ''}`}>
        {highContrast ? '◑ Alto contraste' : '◑ Contraste'}
      </button>
    </div>
  )
}
