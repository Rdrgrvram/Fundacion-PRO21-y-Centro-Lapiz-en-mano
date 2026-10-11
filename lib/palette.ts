// Tailwind JIT solo detecta clases literales en el código fuente — un color que
// viniera del CMS como string interpolado (`bg-${color}`) no se incluiría en el
// build de producción. Por eso el CMS solo guarda este enum y las clases
// completas se resuelven acá, donde Tailwind sí las puede escanear.
export type AccentColor = 'primary' | 'secondary' | 'accent'

// `hex` es el color de marca (fondos, bordes, íconos). `textHex` es la variante para TEXTO
// sobre fondos claros: cumple contraste AA (≥ 4,5:1) y sale de tokens de tailwind.config.js
// (primary-900, secondary-700, accent). Usar `textHex` en `style={{ color }}`.
export const PALETTE: Record<AccentColor, { hex: string; textHex: string; bg: string }> = {
  primary: { hex: '#ffc500', textHex: '#7a5e00', bg: 'bg-primary/15' },
  secondary: { hex: '#229cc2', textHex: '#166e8a', bg: 'bg-secondary/10' },
  accent: { hex: '#8c3cbd', textHex: '#8c3cbd', bg: 'bg-accent/10' },
}

// Set extendido (bordes, texto, fondo sólido) usado por las páginas de
// programas — mismo principio que PALETTE, solo con más variantes.
export const EXTENDED_PALETTE: Record<
  AccentColor,
  { hex: string; textHex: string; bg: string; bgSolid: string; border: string; text: string; textOn: string }
> = {
  primary: { hex: '#ffc500', textHex: '#7a5e00', bg: 'bg-primary/15', bgSolid: 'bg-primary', border: 'border-primary', text: 'text-primary-900', textOn: 'text-gray-900' },
  secondary: { hex: '#229cc2', textHex: '#166e8a', bg: 'bg-secondary/10', bgSolid: 'bg-secondary-700', border: 'border-secondary', text: 'text-secondary-700', textOn: 'text-white' },
  accent: { hex: '#8c3cbd', textHex: '#8c3cbd', bg: 'bg-accent/10', bgSolid: 'bg-accent', border: 'border-accent', text: 'text-accent', textOn: 'text-white' },
}
