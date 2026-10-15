import type { AccentColor } from '@/lib/palette'

// Fondos de sección de una página de programa. Regla ÚNICA para los cuatro programas (docs/DESIGN_STANDARD.md §Páginas de
// programa): las secciones que existen se pintan en el ciclo gris → blanco → tinte del color del programa, para que dos
// vecinas nunca tengan el mismo fondo. Las clases son literales (Tailwind JIT no resuelve nombres interpolados).
const CICLO = ['bg-gray-50', 'bg-white', 'TINTE'] as const

const TINTE: Record<AccentColor, string> = {
  primary: 'bg-primary/5',
  secondary: 'bg-secondary/5',
  accent: 'bg-accent/5',
}

/** Devuelve una función que entrega el fondo de la siguiente sección, en el orden en que se pintan. */
export function crearFondos(color: AccentColor) {
  let n = 0
  return () => {
    const tono = CICLO[n++ % CICLO.length]
    return tono === 'TINTE' ? TINTE[color] : tono
  }
}
