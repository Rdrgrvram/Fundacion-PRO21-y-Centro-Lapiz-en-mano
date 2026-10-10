import '../../styles/globals.css'
import { inter, fraunces } from '../fonts'

// "/" solo redirige a /es (ver page.tsx); necesita su propio layout raíz porque
// <html> vive en app/[lang]/layout.tsx para declarar el idioma correcto por ruta.
export default function RootGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={fraunces.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
