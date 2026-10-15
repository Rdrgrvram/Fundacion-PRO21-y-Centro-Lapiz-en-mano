import { defineConfig } from '@playwright/test'

// Suites: tests/cms (auditoría del CMS, un archivo por página), tests/seo, tests/api, tests/consent, tests/a11y.
// Corre en serie (workers: 1) porque cada test edita y restaura archivos reales de
// content/ — correr en paralelo pisaría los backups de otros tests sobre el mismo archivo.
export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'retain-on-failure',
  },
  webServer: [
    {
      // Sitio Next.js — asume que ya corre `npm run dev` en desarrollo; si no,
      // Playwright lo levanta él mismo.
      command: 'npm run dev',
      url: 'http://localhost:3000',
      reuseExistingServer: true,
      timeout: 60_000,
      // tests/api/forms.spec.ts asume que el servidor arranca SIN servicio de correo (responde 503). Next carga
      // .env.local, así que una clave real ahí hacía que esas pruebas enviaran correos reales a la Fundación.
      // Una variable ya definida (aunque vacía) gana sobre .env.local. Solo aplica si Playwright arranca el
      // servidor: si reutiliza un `npm run dev` ya abierto conserva su clave, por eso hay que apagarlo antes.
      env: { RESEND_API_KEY: '' },
    },
    {
      // Proxy de filesystem de Decap (local_backend: true en public/admin/config.yml).
      // Sin esto, /admin cae al backend "github" y pide login real — ver docs de la
      // sesión de auditoría de config.yml.
      command: 'npx decap-server',
      port: 8081,
      reuseExistingServer: true,
      timeout: 30_000,
    },
  ],
})
