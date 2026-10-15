/** @type {import('next').NextConfig} */
const nextConfig = {
  // Imágenes: permitir dominio de Cloudflare R2
  images: {
    // AVIF primero (≈30-40 % más liviano que WebP en fotos); WebP como respaldo.
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        // Reemplazar <account-id> con el ID de cuenta Cloudflare real
        hostname: '*.r2.cloudflarestorage.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        // Si se usa Cloudflare Images o un dominio público del bucket
        hostname: 'pub-*.r2.dev',
        pathname: '/**',
      },
    ],
  },

  // Headers de seguridad
  async headers() {
    // Sitio de prueba (SITE_NOINDEX=1): que ningún buscador lo indexe antes del lanzamiento
    const noIndex = process.env.SITE_NOINDEX === '1'
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          ...(noIndex ? [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] : []),
        ],
      },
    ]
  },

  // Redirección de la raíz a /es (complementa app/page.tsx)
  async redirects() {
    return [
      { source: '/admin', destination: '/admin/index.html', permanent: false },
    ]
  },
}

module.exports = nextConfig
