import { defineConfig } from '@playwright/test'

// Suite de auditoría del CMS (Decap): un archivo por página del sitio en tests/cms/.
// Corre en serie (workers: 1) porque cada test edita y restaura archivos reales de
// content/ — correr en paralelo pisaría los backups de otros tests sobre el mismo archivo.
export default defineConfig({
  testDir: './tests/cms',
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
