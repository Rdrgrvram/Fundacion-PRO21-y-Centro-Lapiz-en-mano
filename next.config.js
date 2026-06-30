/** @type {import('next').NextConfig} */
const nextConfig = {
  // Imágenes: permitir dominio de Cloudflare R2
  images: {
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
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
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
