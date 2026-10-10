import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

// El panel interno no debe indexarse; el resto del sitio sí.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin/', '/api/'] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
