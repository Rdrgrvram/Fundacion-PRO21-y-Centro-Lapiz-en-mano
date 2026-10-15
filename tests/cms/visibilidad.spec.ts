import fs from 'fs'
import { test, expect } from '@playwright/test'
import { load } from 'js-yaml'
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

  test('al ocultar un testimonio también se retira su cita copiada en Inicio, Impacto y Familias', async ({ request }) => {
    // Cada cita de esas páginas es copia de un testimonio y lleva su nombre como autor.
    const casos = [
      { slug: 'mama-de-t', yml: 'settings/home.yml', pagina: '/es', cita: (d: any) => d.es.hero.quote },
      { slug: 'mama-de-s', yml: 'settings/impact.yml', pagina: '/es/impacto', cita: (d: any) => d.es.featured_story.quote },
      { slug: 'mama-de-r', yml: 'settings/families.yml', pagina: '/es/familias', cita: (d: any) => d.es.welcome_letter.quote },
    ]
    for (const caso of casos) {
      const es = backupContentFile(`testimonios/${caso.slug}.es.md`)
      const en = backupContentFile(`testimonios/${caso.slug}.en.md`)
      try {
        const fuente = load(fs.readFileSync(backupContentFile(caso.yml).path, 'utf-8')) as any
        // Un tramo de la cita sin signos que el HTML pudiera escapar.
        const fragmento = /[A-Za-zÁÉÍÓÚáéíóúñ ]{25,}/.exec(caso.cita(fuente))![0].trim()
        expect(await (await request.get(caso.pagina)).text(), `antes: ${caso.pagina} muestra la cita`).toContain(fragmento)
        marcarOculto(es.path)
        marcarOculto(en.path)
        expect(await (await request.get(caso.pagina)).text(), `${caso.pagina} retira la cita de ${caso.slug}`).not.toContain(fragmento)
      } finally {
        es.restore()
        en.restore()
      }
    }
  })

  test('con todos los testimonios ocultos Impacto no deja la sección vacía', async ({ page }) => {
    const slugs = ['mama-de-t', 'mama-de-s', 'mama-de-r']
    const copias = slugs.flatMap((slug) => [backupContentFile(`testimonios/${slug}.es.md`), backupContentFile(`testimonios/${slug}.en.md`)])
    try {
      const titulo = ((load(fs.readFileSync(backupContentFile('settings/impact.yml').path, 'utf-8')) as any).es.testimonials_section.title as string).trim()
      // Se mira la página renderizada (el HTML crudo también trae los datos serializados que Next envía al cliente).
      await page.goto('/es/impacto', { waitUntil: 'networkidle' })
      await expect(page.getByRole('heading', { name: titulo })).toBeVisible()
      for (const c of copias) marcarOculto(c.path)
      await page.goto('/es/impacto', { waitUntil: 'networkidle' })
      await expect(page.getByRole('heading', { name: titulo }), 'la sección de testimonios desaparece').toHaveCount(0)
    } finally {
      copias.forEach((c) => c.restore())
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
