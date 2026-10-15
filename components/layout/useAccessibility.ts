'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

// Preferencias de accesibilidad visual (tamaño de texto y alto contraste), compartidas por la barra de escritorio y el
// panel móvil. Se guardan en localStorage y se aplican a <html>; un evento propio mantiene sincronizadas las dos vistas.
const CLAVE_TAMANO = 'pro21-font-size'
const CLAVE_CONTRASTE = 'pro21-high-contrast'
const EVENTO = 'pro21-accesibilidad'

function guardar(clave: string, valor: string) {
  try {
    localStorage.setItem(clave, valor)
  } catch {
    // Navegación privada o almacenamiento bloqueado: el cambio vale para esta visita.
  }
}

function aplicar(tamano: number, contraste: boolean) {
  document.documentElement.style.fontSize = `${tamano}%`
  document.documentElement.classList.toggle('high-contrast', contraste)
}

export function useAccessibility() {
  const [fontSize, setFontSize] = useState(100)
  const [highContrast, setHighContrast] = useState(false)
  const highContrastRef = useRef(false)
  highContrastRef.current = highContrast

  useEffect(() => {
    const leer = (e?: Event) => {
      // Si el evento trae los valores (cambio hecho en la otra vista), se adoptan tal cual: así también sincroniza
      // cuando el almacenamiento está bloqueado y no se pudo guardar.
      const detalle = (e as CustomEvent<{ tamano: number; contraste: boolean }> | undefined)?.detail
      if (detalle) {
        setFontSize(detalle.tamano)
        setHighContrast(detalle.contraste)
        return
      }
      let tamanoGuardado: string | null = null
      let contrasteGuardado: string | null = null
      try {
        tamanoGuardado = localStorage.getItem(CLAVE_TAMANO)
        contrasteGuardado = localStorage.getItem(CLAVE_CONTRASTE)
      } catch {
        return
      }
      // Solo se toma de localStorage lo que está guardado: si el almacenamiento está bloqueado (nada se guarda) el
      // evento de sincronización no debe reponer los valores por defecto sobre lo que la persona ya cambió.
      if (tamanoGuardado) {
        const tamano = parseInt(tamanoGuardado, 10)
        setFontSize(Number.isFinite(tamano) ? tamano : 100)
        document.documentElement.style.fontSize = `${tamano}%`
      }
      if (contrasteGuardado !== null) {
        const contraste = contrasteGuardado === 'true'
        setHighContrast(contraste)
        document.documentElement.classList.toggle('high-contrast', contraste)
      }
    }
    leer()
    window.addEventListener(EVENTO, leer)
    return () => window.removeEventListener(EVENTO, leer)
  }, [])

  const cambiarTamano = useCallback((siguiente: number) => {
    setFontSize(siguiente) // el estado no depende de localStorage: con almacenamiento bloqueado también funciona
    guardar(CLAVE_TAMANO, String(siguiente))
    document.documentElement.style.fontSize = `${siguiente}%`
    window.dispatchEvent(new CustomEvent(EVENTO, { detail: { tamano: siguiente, contraste: highContrastRef.current } }))
  }, [])

  return {
    fontSize,
    highContrast,
    aumentar: () => cambiarTamano(Math.min(fontSize + 10, 130)),
    disminuir: () => cambiarTamano(Math.max(fontSize - 10, 90)),
    restablecer: () => cambiarTamano(100),
    alternarContraste: () => {
      const siguiente = !highContrast
      setHighContrast(siguiente)
      guardar(CLAVE_CONTRASTE, String(siguiente))
      aplicar(fontSize, siguiente)
      window.dispatchEvent(new CustomEvent(EVENTO, { detail: { tamano: fontSize, contraste: siguiente } }))
    },
  }
}
