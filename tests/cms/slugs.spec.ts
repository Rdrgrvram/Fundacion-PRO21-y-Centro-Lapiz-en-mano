import { test, expect } from '@playwright/test'
import { existsSync, readFileSync, rmSync } from 'fs'
import yaml from 'js-yaml'
import { openCmsEntry, publishEntry } from './helpers'

// RF-013 — las entradas creadas desde el panel deben guardarse con un nombre de archivo
// legible. Sin `identifier_field`, Decap armaba el nombre con todo el objeto
// ("map-name-persona-qa-role-...") en las colecciones con i18n.

const config = yaml.load(readFileSync('public/admin/config.yml', 'utf-8')) as any
const collection = (name: string) => config.collections.find((c: any) => c.name === name)

test('contrato de config.yml: testimonios y equipo declaran su identifier_field', () => {
  expect(collection('testimonios').identifier_field).toBe('family')
  expect(collection('equipo').identifier_field).toBe('name')
})

test('crear un testimonio desde el panel genera un archivo con nombre legible', async ({ page }) => {
  const files = ['content/testimonios/mama-de-z-qa.es.md', 'content/testimonios/mama-de-z-qa.en.md']
  try {
    await openCmsEntry(page, '/collections/testimonios/new')
    await page.locator('input[type="text"]').first().fill('Mamá de Z. QA')
    // El cuerpo es i18n: hay un editor por idioma, ambos obligatorios.
    const editors = page.locator('[contenteditable=true]')
    for (let i = 0; i < (await editors.count()); i++) {
      await editors.nth(i).click()
      await page.keyboard.type(`Testimonio de prueba ${i}`)
    }
    await publishEntry(page)

    for (const f of files) expect(existsSync(f), f).toBe(true)
    // Nada de nombres armados con el objeto completo.
    expect(files.every((f) => !f.includes('map-'))).toBe(true)
  } finally {
    for (const f of files) rmSync(f, { force: true })
  }
})
