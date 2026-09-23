import type { Metadata } from 'next'
import AdminBlogClient from './AdminBlogClient'

// Herramienta interna, no enlazada desde ningún lugar público del sitio — ver
// README.md para la URL. Decap CMS no tiene ningún gancho oficial para agregar
// un botón de visibilidad al listado de entradas (confirmado leyendo el código
// fuente real de decap-cms-core), así que esta página resuelve esa necesidad
// por fuera del panel, reusando la misma sesión de GitHub que ya usa Decap.
export const metadata: Metadata = {
  title: 'Blog — visibilidad | Panel interno',
  robots: { index: false, follow: false },
}

export default function AdminBlogPage() {
  return <AdminBlogClient />
}
