import fs from 'fs'
import { test, expect } from '@playwright/test'
import { openCmsEntry, publishEntry, backupContentFile } from './helpers'

// Issue #73 — interruptor «Visible en el sitio» en testimonios y equipo: se puede ocultar sin borrar
// (por ejemplo, si una familia retira su permiso).

const quitarEnCrudo = (ruta: string) => fs.readFileSync(ruta, 'utf-8').replace(/\r\n/g, '\n')

function marcarOculto(ruta: string) {
  const crudo = quitarEnCrudo(ruta)
  const sin = crudo.replace(/^visible: .*\n/m, '')
  fs.writeFileSync(ruta, sin.replace(/^---\n/, '---\nvisible: false\n'), 'utf-8')
}

test.describe('Visibilidad de testimonios y equipo', () => {
  test('el panel ofrece «Visible en el sitio» en un testimonio y en una persona del equipo', async ({ page }) => {
    await openCmsEntry(page, '/collections/testimonios/entries/mama-de-t')
    await expect(page.getByText('Visible en el sitio').first()).toBeVisible()
    await openCmsEntry(page, '/collections/equipo/entries/ana-copa')
    await expect(page.getByText('Visible en el sitio').first()).toBeVisible()
  })

  test('un testimonio con visible: false deja de mostrarse en Inicio e Impacto (es y en), sin borrarse', async ({ request }) => {
    const es = backupContentFile('testimonios/mama-de-t.es.md')
    const en = backupContentFile('testimonios/mama-de-t.en.md')
    const cuantas = (html: string, texto: string) => html.split(texto).length - 1
    try {
      const familiaEs = /^family: "?(.+?)"?$/m.exec(quitarEnCrudo(es.path))![1]
      const familiaEn = /^family: "?(.+?)"?$/m.exec(quitarEnCrudo(en.path))![1]
      const rutas = [['/es', familiaEs], ['/en', familiaEn], ['/es/impacto', familiaEs]] as const
      // El nombre también puede salir en otras citas (p. ej. el hero): se compara cuántas veces aparece antes y después.
      const antes: Record<string, number> = {}
      for (const [url, familia] of rutas) {
        antes[url] = cuantas(await (await request.get(url)).text(), familia)
        expect(antes[url], `antes: ${url} muestra «${familia}»`).toBeGreaterThan(0)
      }
      expect(await (await request.get('/es')).text()).toContain('id="cita-mama-de-t"')
      marcarOculto(es.path)
      marcarOculto(en.path)
      for (const [url, familia] of rutas) {
        const despues = cuantas(await (await request.get(url)).text(), familia)
        expect(despues, `${url}: «${familia}» aparece menos veces (${antes[url]} → ${despues})`).toBeLessThan(antes[url])
      }
      expect(await (await request.get('/es')).text()).not.toContain('id="cita-mama-de-t"')
      expect(fs.existsSync(es.path), 'la entrada sigue existiendo').toBe(true)
    } finally {
      es.restore()
      en.restore()
    }
  })

  test('una persona del equipo con visible: false desaparece de /equipo y Inicio, pero la entrada sigue', async ({ request }) => {
    const es = backupContentFile('equipo/ana-copa.es.md')
    const en = backupContentFile('equipo/ana-copa.en.md')
    try {
      const nombre = 'Ana Valentina Copa Rosales'
      expect(await (await request.get('/es/equipo')).text()).toContain(nombre)
      marcarOculto(es.path)
      marcarOculto(en.path)
      expect(await (await request.get('/es/equipo')).text()).not.toContain(nombre)
      expect(await (await request.get('/en/equipo')).text()).not.toContain(nombre)
      expect(fs.existsSync(es.path)).toBe(true)
    } finally {
      es.restore()
      en.restore()
    }
  })

  test('apagar el interruptor en el panel y publicar oculta a la persona en los dos idiomas', async ({ page, request }) => {
    const es = backupContentFile('equipo/ana-copa.es.md')
    const en = backupContentFile('equipo/ana-copa.en.md')
    try {
      await openCmsEntry(page, '/collections/equipo/entries/ana-copa')
      const etiqueta = page.getByText('Visible en el sitio').first()
      await etiqueta.scrollIntoViewIfNeeded()
      const interruptor = etiqueta.locator('xpath=following::*[@role="switch"][1]')
      await expect(interruptor, 'las personas existentes aparecen como visibles').toHaveAttribute('aria-checked', 'true')
      await interruptor.click()
      await publishEntry(page)
      expect(quitarEnCrudo(es.path)).toMatch(/^visible: false$/m)
      expect(quitarEnCrudo(en.path), 'el inglés se apaga junto con el español').toMatch(/^visible: false$/m)
      expect(await (await request.get('/es/equipo')).text()).not.toContain('Ana Valentina Copa Rosales')
    } finally {
      es.restore()
      en.restore()
    }
  })
})
