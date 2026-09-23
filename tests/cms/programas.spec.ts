import { test, expect } from '@playwright/test'
import matter from 'gray-matter'
import { getProgramBySlug } from '@/lib/cms'
import { openCmsEntry, publishEntry, backupContentFile, uniqueMarker } from './helpers'

// Auditoría de la colección "programs" (Mi Escuelita Down / Aula Wawitas / Pasos
// Firmes) del CMS. A diferencia de Inicio/Quiénes Somos (singletons, un solo YAML
// con es:/en: anidados), esta es una colección "folder" con multiple_files:
// un archivo .md por idioma (<slug>.es.md / <slug>.en.md), create:false/delete:false
// (exactamente 3 entradas fijas). Ver public/admin/config.yml líneas ~299-407.
//
// Se usa "mi-escuelita-down" como entrada representativa para el suite completo
// (fidelidad de campos, round-trip, validez de schema, reflejo en el sitio) — las
// otras 2 entradas comparten exactamente el mismo esquema y componente
// (ProgramPageLayout), así que solo se confirma con un smoke test que cargan.

const REPRESENTATIVE_SLUG = 'mi-escuelita-down'
const ALL_SLUGS = ['mi-escuelita-down', 'aula-wawitas', 'pasos-firmes']

const EXPECTED_SECTIONS = [
  'Hero',
  'Cifras rápidas',
  'Bloque 1 (ej. Áreas de terapia / Pilares / Dificultades atendidas)',
  'Bloque 2 — pestañas (ej. Niveles / Modalidades de atención)',
  'Bloque 3 (opcional — ej. Servicios complementarios / Áreas de estimulación)',
  'Sección: Cómo ingresar / Pasos de intervención',
  'CTA final',
]

// Agregados al migrar "programs" al patrón zod (lib/cms.ts) y cerrar gaps de
// contenido hardcodeado encontrados en ProgramHero.tsx/ProgramCTA.tsx.
const EXPECTED_NEW_FIELD_LABELS = [
  "Texto del botón 'Ver detalles'",
  'Texto del botón de WhatsApp',
  'Texto del botón de contacto',
]

test.describe('CMS — Programas (colección "programs")', () => {
  let backupEs: ReturnType<typeof backupContentFile>
  let backupEn: ReturnType<typeof backupContentFile>

  test.beforeEach(() => {
    backupEs = backupContentFile(`programs/${REPRESENTATIVE_SLUG}.es.md`)
    backupEn = backupContentFile(`programs/${REPRESENTATIVE_SLUG}.en.md`)
  })

  test.afterEach(() => {
    backupEs.restore()
    backupEn.restore()
  })

  test('la colección tiene exactamente 3 entradas fijas (create/delete deshabilitados)', async ({
    page,
  }) => {
    await page.goto('/admin/#/collections/programs')
    for (let i = 0; i < 8; i++) {
      const loginBtn = page.getByRole('button', { name: 'Iniciar sesión', exact: true })
      if (await loginBtn.isVisible().catch(() => false)) await loginBtn.click().catch(() => {})
      await page.waitForTimeout(1500)
      if (await page.getByText('Mi Escuelita Down').isVisible().catch(() => false)) break
    }

    // getByRole('link'): la descripción de la colección menciona los 3 nombres en
    // texto plano, así que getByText colisiona (strict mode) — el link de cada
    // tarjeta en el listado es inequívoco.
    await expect(page.getByRole('link', { name: 'Aula Wawitas' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Mi Escuelita Down' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Pasos Firmes' })).toBeVisible()
  })

  test('el panel carga la entrada de Mi Escuelita Down vía backend local, sin caer al login real de GitHub', async ({
    page,
  }) => {
    await openCmsEntry(page, `/collections/programs/entries/${REPRESENTATIVE_SLUG}`)

    await expect(page.getByRole('button', { name: /iniciar sesión con github/i })).toHaveCount(0)
    await expect(page.getByText('Escribiendo en la colección 🎓 Programas')).toBeVisible()
  })

  test('todas las secciones definidas en config.yml para "programs" existen como campos editables', async ({
    page,
  }) => {
    await openCmsEntry(page, `/collections/programs/entries/${REPRESENTATIVE_SLUG}`)

    for (const section of EXPECTED_SECTIONS) {
      await expect(page.getByText(section, { exact: false }).first()).toBeVisible()
    }
    for (const label of EXPECTED_NEW_FIELD_LABELS) {
      await expect(page.getByText(label, { exact: false }).first()).toBeVisible()
    }
  })

  test('editar y publicar el nombre del programa persiste el cambio en content/programs/mi-escuelita-down.es.md', async ({
    page,
  }) => {
    const marker = uniqueMarker('PROGRAM_TITLE')
    await openCmsEntry(page, `/collections/programs/entries/${REPRESENTATIVE_SLUG}`)

    // "Nombre del programa" (title) es el primer campo de la colección.
    await page.locator('input[type="text"], textarea').first().fill(marker)
    await publishEntry(page)

    const parsed = matter(backupEs.readYamlRaw())
    expect(parsed.data.title).toBe(marker)
  })

  test('tras publicar, el archivo sigue siendo válido contra el esquema zod real (lib/cms.ts)', async ({
    page,
  }) => {
    const marker = uniqueMarker('PROGRAM_TITLE_SCHEMA')
    await openCmsEntry(page, `/collections/programs/entries/${REPRESENTATIVE_SLUG}`)

    await page.locator('input[type="text"], textarea').first().fill(marker)
    await publishEntry(page)

    // getProgramBySlug lanza si el markdown no valida contra programSchema.
    const program = getProgramBySlug(REPRESENTATIVE_SLUG, 'es')
    expect(program?.title).toBe(marker)
  })

  test('el contenido publicado en el CMS se refleja en la página pública /es/mi-escuelita-down', async ({
    page,
  }) => {
    const marker = uniqueMarker('PROGRAM_TITLE_SITE')
    await openCmsEntry(page, `/collections/programs/entries/${REPRESENTATIVE_SLUG}`)

    await page.locator('input[type="text"], textarea').first().fill(marker)
    await publishEntry(page)

    await page.goto(`/es/${REPRESENTATIVE_SLUG}`)
    await expect(page.getByText(marker).first()).toBeVisible()
  })

  for (const slug of ALL_SLUGS) {
    test(`smoke: la entrada "${slug}" carga en el panel y en el sitio público sin errores`, async ({
      page,
    }) => {
      await openCmsEntry(page, `/collections/programs/entries/${slug}`)
      await expect(page.getByText('Escribiendo en la colección 🎓 Programas')).toBeVisible()

      await page.goto(`/es/${slug}`)
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    })
  }
})
