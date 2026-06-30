import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fundación PRO-21 | Centro Lápiz en Mano — La Paz, Bolivia',
  description:
    'Atención terapéutica y educativa para niños con síndrome de Down, autismo y dificultades de aprendizaje en La Paz, Bolivia.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fundacionpro21.org'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
