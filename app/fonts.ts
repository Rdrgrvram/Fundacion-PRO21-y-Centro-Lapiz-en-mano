import { Inter, Fraunces } from 'next/font/google'

export const inter = Inter({ subsets: ['latin'] })

// Tipografía display — solo para titulares de hero/sección/CTA y citas destacadas
// (ver styles/globals.css y docs/DESIGN_STANDARD.md). El cuerpo sigue en Inter.
export const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})
