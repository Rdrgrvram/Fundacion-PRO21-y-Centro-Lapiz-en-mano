import { test, expect } from '@playwright/test'
import { load } from 'js-yaml'
import { getCollaborateContent } from '@/lib/cms'
import { openCmsEntry, publishEntry, backupContentFile, uniqueMarker } from './helpers'

// Auditoría de la colección "collaborate" (página Colabora) del CMS.
// Ver public/admin/config.yml líneas ~695-816 para el esquema de campos que este
// test valida contra la UI real del panel.

const COLLABORATE_YML = 'settings/collaborate.yml'

const EXPECTED_SECTIONS = [
  'Hero',
  'Cifras destacadas del hero',
  'Sección: Donaciones',
  'Niveles de donación',
  'Datos bancarios',
  'Métodos de pago',
  'Sección: Voluntariado',
  'Áreas de voluntariado',
  'Beneficios de ser voluntario/a',
  'Testimonio de voluntario/a',
  'Sección: Alianzas',
  'Tipos de alianza',
  'Aliados actuales',
  'CTA final',
]

// Agregados al cerrar gaps de contenido hardcodeado encontrados en la auditoría de
// app/[lang]/colabora/ColaboraPageClient.tsx: los botones "Donar ahora"/"Ser
// voluntario" del hero no eran editables pese a que el resto de la página sí lo era.
// También se agregó "¿Es transferencia bancaria?" para reemplazar un acoplamiento
// frágil por índice (payment_methods[0] asumía ser el método bancario).
const EXPECTED_NEW_FIELD_LABELS = [
  'Texto del botón de donar', // hero.donate_label
  'Texto del botón de voluntariado', // hero.volunteer_label
  '¿Es transferencia bancaria?', // payment_methods[].is_bank
]

test.describe('CMS — Colabora (colección "collaborate")', () => {
  let backup: ReturnType<typeof backupContentFile>

  test.beforeEach(() => {
    backup = backupContentFile(COLLABORATE_YML)
  })

  test.afterEach(() => {
    backup.restore()
  })

  test('el panel carga la entrada de Colabora vía backend local, sin caer al login real de GitHub', async ({
    page,
  }) => {
    await openCmsEntry(page, '/collections/collaborate/entries/content')

    await expect(page.getByRole('button', { name: /iniciar sesión con github/i })).toHaveCount(0)
  })

  test('todas las secciones definidas en config.yml para "collaborate" existen como campos editables', async ({
    page,
  }) => {
    await openCmsEntry(page, '/collections/collaborate/entries/content')
    for (const label of EXPECTED_SECTIONS) {
      await expect(page.getByText(label, { exact: false }).first()).toBeVisible()
    }
  })

  test('los nuevos campos sueltos (hero.donate_label/volunteer_label, payment_methods.is_bank) existen como campos editables', async ({
    page,
  }) => {
    await openCmsEntry(page, '/collections/collaborate/entries/content')
    await expect(page.getByText('Texto del botón de donar', { exact: false }).first()).toBeVisible()
    await expect(page.getByText('Texto del botón de voluntariado', { exact: false }).first()).toBeVisible()

    // "¿Es transferencia bancaria?" vive dentro de un ítem de la lista "Métodos de
    // pago", colapsado por defecto (comportamiento normal de Decap para widgets
    // `list`) — está en el DOM pero no visible hasta expandir el ítem, así que se
    // confirma su existencia con toBeAttached() en vez de toBeVisible().
    await expect(page.getByText('¿Es transferencia bancaria?', { exact: false }).first()).toBeAttached()
  })

  test('editar y publicar el texto del botón de donar del hero persiste el cambio y se refleja en /es/colabora', async ({
    page,
  }) => {
    const marker = uniqueMarker('COLLAB_DONATE_LABEL')
    await openCmsEntry(page, '/collections/collaborate/entries/content')
    await page.locator('input[type="text"], textarea').nth(4).fill(marker)
    await publishEntry(page)

    const parsed = load(backup.readYamlRaw()) as { es: { hero: { donate_label: string } } }
    expect(parsed.es.hero.donate_label).toBe(marker)

    await page.goto('/es/colabora')
    await expect(page.getByText(marker)).toBeVisible()
  })

  test('tras publicar, el archivo sigue siendo válido contra el esquema zod real (lib/cms.ts)', async ({
    page,
  }) => {
    const marker = uniqueMarker('COLLAB_HERO_BADGE')
    await openCmsEntry(page, '/collections/collaborate/entries/content')
    await page.locator('input[type="text"], textarea').first().fill(marker)
    await publishEntry(page)

    const content = getCollaborateContent('es')
    expect(content.hero.badge).toBe(marker)
  })

  test('el formulario de voluntariado envía una inscripción real al API de contacto', async ({ page }) => {
    await page.goto('/es/colabora')
    await page.waitForLoadState('networkidle')

    await page.locator('#voluntariado').scrollIntoViewIfNeeded()
    await page.getByPlaceholder('Ej: María Flores').fill('Test Voluntaria')
    await page.getByPlaceholder('maria@example.com').fill('test-voluntaria@example.com')

    await page.route('**/api/contact', async (route) => {
      const body = route.request().postDataJSON()
      expect(body.name).toBe('Test Voluntaria')
      expect(body.program).toBe('Voluntariado')
      await route.fulfill({ status: 200, body: JSON.stringify({ ok: true }) })
    })

    await page.getByRole('button', { name: 'Enviar inscripción', exact: true }).click()
    await expect(page.getByText('¡Inscripción recibida!')).toBeVisible()
  })
})
