import { test, expect } from '@playwright/test'
import matter from 'gray-matter'
import { getAllTestimonials } from '@/lib/content'
import { openCmsEntry, publishEntry, backupContentFile, uniqueMarker } from './helpers'

// Auditoría de la colección "testimonios" (public/admin/config.yml, folder collection
// con i18n:true / multiple_files). No tiene página propia — aparece embebida en dos
// lugares: la sección de testimonios de Inicio (app/[lang]/page.tsx, filtra por
// featured_home) y el carrusel de Impacto (app/[lang]/impacto/ImpactoPageClient.tsx,
// filtra por featured_impacto). A diferencia de las páginas anteriores auditadas, la
// cobertura de campos entre config.yml/los .md/lib/content.ts ya estaba completa (sin
// gaps de contenido hardcodeado) — este spec cubre solo el round-trip de edición.

const EXPECTED_SECTIONS = [
  'Nombre de la familia',
  'Programa',
  'Ícono (elige uno de la lista)',
  'Color de acento',
  'Orden de aparición',
  'Mostrar en Inicio',
  'Mostrar en Impacto',
  'Testimonio',
]

test.describe('CMS — Testimonios (colección "testimonios")', () => {
  test('el panel carga una entrada de testimonios vía backend local, sin caer al login real de GitHub', async ({
    page,
  }) => {
    await openCmsEntry(page, '/collections/testimonios/entries/mama-de-t')
    await expect(page.getByText('CAMBIOS GUARDADOS')).toBeVisible()
  })

  test('todos los campos definidos en config.yml para "testimonios" existen como campos editables', async ({
    page,
  }) => {
    await openCmsEntry(page, '/collections/testimonios/entries/mama-de-t')
    for (const label of EXPECTED_SECTIONS) {
      await expect(page.getByText(label, { exact: false }).first()).toBeVisible()
    }
  })

  test('editar y publicar el nombre de familia de "mama-de-t" persiste el cambio y valida contra el esquema', async ({
    page,
  }) => {
    // "Nombre de la familia" es i18n: duplicate — Decap propaga el valor editado en ES
    // también al archivo EN al publicar, así que hay que respaldar y restaurar ambos
    // (lección ya guardada en memoria tras el incidente real con "ana-copa").
    const backupEs = backupContentFile('testimonios/mama-de-t.es.md')
    const backupEn = backupContentFile('testimonios/mama-de-t.en.md')
    try {
      const marker = uniqueMarker('TESTIMONIAL_FAMILY')
      await openCmsEntry(page, '/collections/testimonios/entries/mama-de-t')
      await page.locator('input[type="text"], textarea').first().fill(marker)
      await publishEntry(page)

      const parsed = matter(backupEs.readYamlRaw())
      expect(parsed.data.family).toBe(marker)

      const testimonials = getAllTestimonials('es')
      expect(testimonials.find((t) => t.slug === 'mama-de-t')?.family).toBe(marker)
    } finally {
      backupEs.restore()
      backupEn.restore()
    }
  })

  test('el testimonio "mama-de-t" (featured en Inicio) se refleja en /es', async ({ page }) => {
    const backupEs = backupContentFile('testimonios/mama-de-t.es.md')
    const backupEn = backupContentFile('testimonios/mama-de-t.en.md')
    try {
      const marker = uniqueMarker('TESTIMONIAL_HOME')
      await openCmsEntry(page, '/collections/testimonios/entries/mama-de-t')
      await page.locator('input[type="text"], textarea').first().fill(marker)
      await publishEntry(page)

      await page.goto('/es')
      // Inicio muestra una banda con una cita visible y las demás como chips: se elige el chip del testimonio editado.
      await page.getByRole('button', { name: marker }).click()
      await expect(page.locator('blockquote:visible footer').getByText(marker)).toBeVisible()
    } finally {
      backupEs.restore()
      backupEn.restore()
    }
  })

  test('el testimonio "mama-de-s" (featured en Impacto) se refleja en /es/impacto', async ({
    page,
  }) => {
    const backupEs = backupContentFile('testimonios/mama-de-s.es.md')
    const backupEn = backupContentFile('testimonios/mama-de-s.en.md')
    try {
      const marker = uniqueMarker('TESTIMONIAL_IMPACTO')
      await openCmsEntry(page, '/collections/testimonios/entries/mama-de-s')
      await page.locator('input[type="text"], textarea').first().fill(marker)
      await publishEntry(page)

      await page.goto('/es/impacto')
      await expect(page.getByText(marker)).toBeVisible()
    } finally {
      backupEs.restore()
      backupEn.restore()
    }
  })
})
