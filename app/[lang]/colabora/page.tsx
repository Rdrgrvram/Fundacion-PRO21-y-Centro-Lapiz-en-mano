import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Colabora | Fundación PRO-21',
}

// TODO: implementar página
export default function Page({ params }: { params: { lang: Locale } }) {
  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold">Colabora | Fundación PRO-21</h1>
      <p className="mt-4 text-gray-500">Página en construcción — idioma: {params.lang}</p>
    </section>
  )
}
