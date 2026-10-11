import '../../styles/globals.css'
import { inter, fraunces } from '../fonts'

// Panel interno: no es contenido del sitio, así que tiene su propio <html>.
export default function AdminGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={fraunces.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
