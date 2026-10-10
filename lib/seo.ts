import type { Metadata } from 'next'
import { locales, type Locale } from '@/lib/i18n'

// Datos de SEO del sitio, en un solo lugar (RF-006). Se usan las APIs nativas de
// Next (Metadata, sitemap, robots) — este módulo solo arma los datos.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fundacionpro21.org').replace(/\/$/, '')
export const SITE_NAME = 'Fundación PRO-21 y Centro Lápiz en Mano'

// Imagen de vista previa por defecto: logos reales de la fundación. Nunca fotos de
// niños (consentimiento — ver memory/constitution.md, Art. IV).
export const DEFAULT_OG_IMAGE = '/images/og-fundacion.png'

/** Ruta pública de una página en un idioma. `path` empieza con "/" o es "" (inicio). */
export function localizedPath(lang: Locale, path = ''): string {
  return `/${lang}${path}`
}

interface PageMetadataInput {
  lang: Locale
  /** Ruta sin idioma: "" para inicio, "/contacto", "/blog/bienvenida"… */
  path?: string
  title: string
  description: string
}

/** Título, descripción, canonical, hreflang (es/en/x-default) y Open Graph de una página. */
export function pageMetadata({ lang, path = '', title, description }: PageMetadataInput): Metadata {
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l) => [l, localizedPath(l, path)])
  )
  languages['x-default'] = localizedPath('es', path)

  return {
    title,
    description,
    alternates: { canonical: localizedPath(lang, path), languages },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title,
      description,
      url: localizedPath(lang, path),
      locale: lang === 'es' ? 'es_BO' : 'en_US',
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [DEFAULT_OG_IMAGE] },
  }
}
