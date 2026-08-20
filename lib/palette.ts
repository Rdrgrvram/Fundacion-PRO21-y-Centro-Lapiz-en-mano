// Tailwind JIT solo detecta clases literales en el código fuente — un color que
// viniera del CMS como string interpolado (`bg-${color}`) no se incluiría en el
// build de producción. Por eso el CMS solo guarda este enum y las clases
// completas se resuelven acá, donde Tailwind sí las puede escanear.
export type AccentColor = 'primary' | 'secondary' | 'accent'

export const PALETTE: Record<AccentColor, { hex: string; bg: string }> = {
  primary: { hex: '#ffc500', bg: 'bg-primary/15' },
  secondary: { hex: '#229cc2', bg: 'bg-secondary/10' },
  accent: { hex: '#8c3cbd', bg: 'bg-accent/10' },
}

// Set extendido (bordes, texto, fondo sólido) usado por las páginas de
// programas — mismo principio que PALETTE, solo con más variantes.
export const EXTENDED_PALETTE: Record<
  AccentColor,
  { hex: string; bg: string; bgSolid: string; border: string; text: string; textOn: string }
> = {
  primary: { hex: '#ffc500', bg: 'bg-primary/15', bgSolid: 'bg-primary', border: 'border-primary', text: 'text-primary-700', textOn: 'text-gray-900' },
  secondary: { hex: '#229cc2', bg: 'bg-secondary/10', bgSolid: 'bg-secondary', border: 'border-secondary', text: 'text-secondary', textOn: 'text-white' },
  accent: { hex: '#8c3cbd', bg: 'bg-accent/10', bgSolid: 'bg-accent', border: 'border-accent', text: 'text-accent', textOn: 'text-white' },
}
