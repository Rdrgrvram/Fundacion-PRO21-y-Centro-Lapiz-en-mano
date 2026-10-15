import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

// El panel interno no debe indexarse; el resto del sitio sí.
// Con SITE_NOINDEX=1 (sitio de prueba) no se indexa nada hasta el lanzamiento.
export default function robots(): MetadataRoute.Robots {
  if (process.env.SITE_NOINDEX === '1') {
    return { rules: [{ userAgent: '*', disallow: '/' }] }
  }
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin/', '/api/'] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
