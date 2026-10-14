import { test, expect } from '@playwright/test'
import { existsSync, readFileSync } from 'fs'
import yaml from 'js-yaml'
import { UNAUTHORIZED_PROGRAMS, programRoutes } from '../helpers/programs'

// RF-001, RF-002, RF-007 — consentimiento y contenido veraz (memory/constitution.md, Art. IV).
// Se lee el HTML crudo (request) y el contenido real con js-yaml: la prueba no duplica datos.
//
// Alcance de "fotos sin permiso" (decisión del responsable, 9-oct-2026):
//  - Aula Wawitas y Pasos Firmes no tienen autorización firmada → sin fotos de actividades en SUS
//    páginas (hero y galería) ni en la galería de Impacto bajo esas categorías.
//  - Las fotos de uso general (Inicio, Quiénes Somos, Colabora, Familias…) se dejan; ese riesgo
//    queda registrado en el acta de entrega.

const LANGS = ['es', 'en'] as const

/** El HTML de Next codifica las rutas de imagen (%2F); se normaliza para buscar rutas. */
async function html(request: any, url: string): Promise<string> {
  const res = await request.get(url)
  expect(res.status(), url).toBe(200)
  return (await res.text()).replace(/%2F/gi, '/')
}

function impactGallery(lang: 'es' | 'en') {
  const doc = yaml.load(readFileSync('content/settings/impact.yml', 'utf-8')) as any
  return doc[lang].gallery as { image: string; alt: string; category?: string; program_slug?: string }[]
}

test.describe('Fotos de programas sin autorización', () => {
  for (const lang of LANGS) {
    for (const slug of UNAUTHORIZED_PROGRAMS) {
      test(`/${lang}/${slug} no muestra fotos de actividades`, async ({ request }) => {
        const page = await html(request, `/${lang}/${slug}`)
        expect(page).not.toMatch(/\/images\/actividades/)
        expect(page).not.toMatch(/\/images\/wawitas/)
      })
    }

    test(`/${lang}/mi-escuelita-down SÍ muestra sus fotos (control positivo)`, async ({ request }) => {
      const page = await html(request, `/${lang}/mi-escuelita-down`)
      expect(page).toMatch(/\/images\/actividades-reales\//)
    })

    test(`/${lang}/impacto no muestra fotos de las categorías sin autorización`, async ({ request }) => {
      const page = await html(request, `/${lang}/impacto`)
      const hidden = impactGallery(lang)
        .filter((g) => g.program_slug && UNAUTHORIZED_PROGRAMS.includes(g.program_slug))
        .map((g) => g.image)
      expect(hidden.length, 'la galería debe declarar program_slug en las fotos de esos programas').toBeGreaterThan(0)
      for (const image of hidden) expect(page, image).not.toContain(image)
    })
  }
})

test.describe('Testimonios: solo los 3 entregados por la fundación', () => {
  const OLD_NAMES = /Familia (Quispe|Mamani|Torrez|Torres|Condori)/
  const MINOR_NAMES = /\b(Tiago|Rafael|Sara)\b/ // nunca nombres de menores

  const PAGES = ['', '/impacto', '/familias', ...programRoutes(), '/colabora']
  for (const lang of LANGS) {
    for (const path of PAGES) {
      test(`/${lang}${path}: sin testimonios anteriores ni nombres de menores`, async ({ request }) => {
        const page = await html(request, `/${lang}${path}`)
        expect(page).not.toMatch(OLD_NAMES)
        expect(page).not.toMatch(MINOR_NAMES)
      })
    }
  }

  test('Impacto (es) muestra los 3 testimonios con su identificación anónima', async ({ request }) => {
    const page = await html(request, '/es/impacto')
    expect(page).toContain('Mamá de T.')
    expect(page).toContain('Mamá de S.')
    expect(page).toContain('Mamá de R.')
    expect(page).toContain('tenía muchas dudas') // T.
    expect(page).toContain('fue una gran ayuda') // S.
    expect(page).toContain('difícil encontrar un lugar') // R.
  })

  test('Impacto (en) muestra los 3 testimonios traducidos', async ({ request }) => {
    const page = await html(request, '/en/impacto')
    expect(page).toContain('Mom of T.')
    expect(page).toContain('Mom of S.')
    expect(page).toContain('Mom of R.')
  })

  test('Cada programa muestra solo su testimonio (Pasos Firmes → S.; Aula Wawitas → ninguno)', async ({ request }) => {
    expect(await html(request, '/es/pasos-firmes')).toContain('Mamá de S.')
    expect(await html(request, '/es/mi-escuelita-down')).toMatch(/Mamá de (T|R)\./)
    expect(await html(request, '/es/aula-wawitas')).not.toMatch(/Mamá de [TSR]\./)
  })

  test('Las citas con foto (Inicio, Impacto, Familias) son fragmentos de los 3 testimonios', async ({ request }) => {
    expect(await html(request, '/es')).toContain('no estamos solos')
    expect(await html(request, '/es/impacto')).toContain('paso a paso')
    expect(await html(request, '/es/familias')).toContain('muy acogidos')
  })
})

test.describe('Cifras respaldadas por la fundación', () => {
  const CHECK = ['', '/quienes-somos', '/equipo', '/impacto']
  for (const lang of LANGS) {
    for (const path of CHECK) {
      test(`/${lang}${path}: dice 9 profesionales (no 10)`, async ({ request }) => {
        const page = await html(request, `/${lang}${path}`)
        expect(page).not.toMatch(/\b10\s+(profesionales|professionals|specialized professionals)/i)
      })
    }
    test(`/${lang}/impacto no muestra cifras sin respaldo (1000+ sesiones, 8 áreas)`, async ({ request }) => {
      const page = await html(request, `/${lang}/impacto`)
      expect(page).not.toMatch(/Sesiones al año|Sessions per year/i)
      expect(page).not.toMatch(/Áreas terapéuticas|Therapeutic areas/i)
    })
  }
})

test.describe('Familias: no se promete una descarga que no existe (RF-009)', () => {
  for (const lang of LANGS) {
    test(`/${lang}/familias solo habla de "descargable" si hay guías con archivo`, async ({ request }) => {
      const doc = yaml.load(readFileSync('content/settings/families.yml', 'utf-8')) as any
      const guides = (doc[lang].guides ?? []) as { file?: string }[]
      const anyFile = guides.some((g) => Boolean(g.file))
      const page = await html(request, `/${lang}/familias`)
      if (!anyFile) expect(page).not.toMatch(/descargable|downloadable/i)
      // Cada guía sin archivo ofrece pedirla por WhatsApp (nunca un enlace roto).
      const withoutFile = guides.filter((g) => !g.file).length
      const requests = (page.match(/Solicitar PDF por WhatsApp|Request PDF via WhatsApp/g) ?? []).length
      expect(requests).toBeGreaterThanOrEqual(withoutFile > 0 ? 1 : 0)
    })
  }
})

// Art. IV: nunca fotos de stock ni de IA. Las 4 imágenes de /images/wawitas/ lo eran
// (se habían detectado y reemplazado, pero la galería en español de Impacto las seguía usando).
test.describe('Sin imágenes de stock/IA', () => {
  const ALL = ['', '/quienes-somos', ...programRoutes(), '/equipo', '/impacto', '/colabora', '/familias', '/blog', '/contacto']
  for (const lang of LANGS) {
    test(`/${lang}/**: ninguna página referencia /images/wawitas/`, async ({ request }) => {
      for (const path of ALL) {
        expect(await html(request, `/${lang}${path}`), `/${lang}${path}`).not.toContain('/images/wawitas/')
      }
    })
  }
})

// Decisión del responsable (9-oct-2026): la cita de la voluntaria no está validada por la
// fundación y su foto es de un programa sin autorización → se quita de Colabora.
test.describe('Colabora sin cita de voluntaria no validada', () => {
  for (const lang of LANGS) {
    test(`/${lang}/colabora no muestra la cita ni su foto`, async ({ request }) => {
      const page = await html(request, `/${lang}/colabora`)
      expect(page).not.toMatch(/practicante de fonoaudiolog|speech therapy intern/i)
      expect(page).not.toContain('juego-mesa-cartas')
    })
  }
})

test('los archivos de las imágenes de stock/IA ya no están en el repositorio', () => {
  expect(existsSync('public/images/wawitas')).toBe(false)
})
