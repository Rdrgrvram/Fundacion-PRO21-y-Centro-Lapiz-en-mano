import fs from 'fs'
import path from 'path'
import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

// Requiere: `npx decap-server` corriendo y `local_backend: true` activo en
// public/admin/config.yml — de lo contrario /admin cae al backend "github" real
// y estos tests se cuelgan esperando un login que nunca llega.

/**
 * Navega a una entrada del CMS y completa el login local (sin credenciales
 * reales — el backend local_fs solo requiere un clic de confirmación) si aparece.
 * hash debe empezar con "/", ej. "/collections/home/entries/content".
 */
export async function openCmsEntry(page: Page, hash: string) {
  await page.goto(`/admin/#${hash}`)
  await page.waitForLoadState('networkidle')

  const loginBtn = page.getByRole('button', { name: 'Iniciar sesión', exact: true })
  if (await loginBtn.isVisible({ timeout: 10000 }).catch(() => false)) {
    await loginBtn.click()
  }

  await expect(
    page.getByText('CAMBIOS GUARDADOS').or(page.getByText('CAMBIOS NO GUARDADOS'))
  ).toBeVisible({ timeout: 20000 })
}

/**
 * Publica el borrador actual. El backend local_fs no soporta editorial_workflow
 * (Decap lo degrada automáticamente a "simple" — confirmado en consola del navegador),
 * así que el flujo real es: botón "Publicar" abre un menú, "Publicar ahora" confirma.
 */
export async function publishEntry(page: Page) {
  await page.getByRole('button', { name: 'Publicar', exact: true }).click()
  await page.locator('text=Publicar ahora').first().click({ force: true })
  await expect(page.getByText('Entrada guardada')).toBeVisible({ timeout: 10000 })

  // admin/entry.tsx fuerza un location.reload() ~800ms después de cada publicación
  // exitosa (enganchado al evento 'postPublish' de Decap) — si el test navega o
  // interactúa con la página antes de que ese reload propio dispare, compite con él y
  // Playwright puede ver un ERR_ABORTED en su propia navegación. Esperar acá, una sola
  // vez, con margen, evita que cada test tenga que saberlo por su cuenta.
  await page.waitForTimeout(1500)
}

/**
 * Hace backup de un archivo real de content/ antes del test y devuelve una función
 * para restaurarlo. Los tests de este suite escriben en el filesystem real (vía el
 * proxy local) — sin esto, correr la suite ensuciaría contenido de verdad del sitio.
 */
export function backupContentFile(relPathFromContentDir: string) {
  const full = path.join(process.cwd(), 'content', relPathFromContentDir)
  const original = fs.readFileSync(full, 'utf-8')
  return {
    path: full,
    readYamlRaw: () => fs.readFileSync(full, 'utf-8'),
    restore: () => fs.writeFileSync(full, original, 'utf-8'),
  }
}

export function uniqueMarker(label: string) {
  return `TEST_${label}_${Date.now()}`
}
