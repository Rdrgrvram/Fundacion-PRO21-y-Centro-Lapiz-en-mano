import { redirect } from 'next/navigation'

// Redirigir la raíz al idioma por defecto
export default function RootPage() {
  redirect('/es')
}
