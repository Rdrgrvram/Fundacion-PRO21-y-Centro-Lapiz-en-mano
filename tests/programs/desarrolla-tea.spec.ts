import { test, expect } from '@playwright/test'
import fs from 'fs'
import matter from 'gray-matter'
import { ICON_NAMES, ICON_OPTIONS } from '@/lib/icon-catalog'

// specs/002-programa-desarrolla-tea — RF-001, RF-002, RF-003, RF-004, RF-005.
// Se lee el HTML crudo (request), como un rastreador, sin mocks. Los textos salen de
// contenido-fuente.md / contenido-en.md (sin apóstrofos: el HTML los codifica).

const SLUG = 'desarrolla-tea'
const LANGS = ['es', 'en'] as const

/** El HTML de Next codifica las rutas de imagen (%2F); se normaliza para buscar rutas. */
async function html(request: any, url: string): Promise<string> {
  const res = await request.get(url)
  expect(res.status(), url).toBe(200)
  return (await res.text()).replace(/%2F/gi, '/')
}

const TEXTS = {
  es: {
    sections: ['Cómo trabajamos', 'Atención individual, grupal y horarios', 'Áreas de Intervención', '¿Cómo inscribir a tu hijo?', '¿Tu hijo tiene entre 3 y 12 años?'],
    approach: ['Integral', 'Individualizado', 'Interdisciplinario', 'Centrado en la familia', 'Funcional', 'Inclusivo', 'Basado en fortalezas'],
    tabs: ['Atención individual', 'Atención grupal', 'Entre semana', 'Sábados'],
    areas: ['Psicomotricidad', 'Comunicación y Lenguaje', 'Integración y Procesamiento Sensorial', 'Independencia y Autonomía Personal', 'Estimulación Cognitiva', 'Habilidades Sociales', 'Adaptaciones Curriculares y Apoyo Educativo', 'Orientación y Acompañamiento Familiar'],
    steps: ['Primer contacto', 'Entrevista inicial', 'Revisión de antecedentes', 'Valoración inicial', 'Necesidades y fortalezas', 'Coordinación o derivación', 'Plan Individual de Intervención', 'Inicio de la intervención', 'Orientación familiar', 'Seguimiento periódico', 'Evaluación y reajuste'],
    stats: ['años atendidos', 'áreas de intervención', 'Lun – Sáb'],
    // Puntos del documento que antes se resumían (todo el documento debe verse).
    detail: ['Estímulos gustativos y olfativos', 'Habilidades preacadémicas y académicas', 'Lavado de manos', 'Flexibilidad cognitiva'],
    // Texto en español que NO debe aparecer en /en.
    notInEnglish: [] as string[],
  },
  en: {
    sections: ['How we work', 'Individual care, group care and schedules', 'Intervention Areas', 'How do I enroll my child?', 'Is your child between 3 and 12 years old?'],
    approach: ['Comprehensive', 'Individualized', 'Interdisciplinary', 'Family-centered', 'Functional', 'Inclusive', 'Strengths-based'],
    tabs: ['Individual care', 'Group care', 'Weekdays', 'Saturdays'],
    areas: ['Psychomotor Skills', 'Communication and Language', 'Sensory Integration and Processing', 'Independence and Personal Autonomy', 'Cognitive Stimulation', 'Social Skills', 'Curricular Adaptations and Educational Support', 'Family Guidance and Support'],
    steps: ['First contact', 'Initial interview', 'Review of background', 'Initial assessment', 'Needs and strengths', 'Coordination or referral', 'Individual Intervention Plan', 'Start of intervention', 'Family guidance', 'Periodic follow-up', 'Evaluation and adjustment'],
    stats: ['ages served', 'intervention areas', 'Mon – Sat'],
    detail: ['Gustatory and olfactory stimuli', 'Pre-academic and academic skills', 'Handwashing', 'Cognitive flexibility'],
    notInEnglish: ['Cómo trabajamos', 'Áreas de Intervención', 'Atención individual', 'Procesamiento Sensorial', 'Acompañamiento Familiar', 'Primer contacto', 'Entre semana'],
  },
}

test.describe('Página del programa Desarrolla TEA', () => {
  for (const lang of LANGS) {
    const t = TEXTS[lang]

    test(`/${lang}/${SLUG} muestra todas las secciones del documento`, async ({ request }) => {
      const page = await html(request, `/${lang}/${SLUG}`)
      for (const text of [...t.sections, ...t.approach, ...t.tabs, ...t.areas, ...t.steps, ...t.stats, ...t.detail]) {
        expect(page, text).toContain(text)
      }
      expect(page, 'título del programa').toContain('Desarrolla TEA')
    })

    test(`/${lang}/${SLUG} no mezcla idiomas`, async ({ request }) => {
      const page = await html(request, `/${lang}/${SLUG}`)
      for (const text of t.notInEnglish) expect(page, text).not.toContain(text)
    })

    test(`/${lang}/${SLUG} no muestra fotos de niños (sin autorización)`, async ({ request }) => {
      const page = await html(request, `/${lang}/${SLUG}`)
      expect(page).not.toMatch(/\/images\/actividades/)
      expect(page).not.toMatch(/\/images\/uploads\/programas/)
    })

    test(`/${lang}/${SLUG} no inventa testimonios de familias`, async ({ request }) => {
      const page = await html(request, `/${lang}/${SLUG}`)
      expect(page).not.toMatch(/Mamá de [TSR]\.|Mom of [TSR]\./)
    })

    test(`/${lang}/${SLUG} está en el menú y en el pie de página`, async ({ request }) => {
      // Quiénes Somos no tiene tarjeta de programas: aísla el menú y el pie.
      const page = await html(request, `/${lang}/quienes-somos`)
      const footerAt = page.indexOf('<footer')
      expect(footerAt, 'footer').toBeGreaterThan(0)
      const header = page.slice(0, footerAt)
      const footer = page.slice(footerAt)
      expect(header, 'menú').toContain(`href="/${lang}/${SLUG}"`)
      expect(footer, 'pie de página').toContain(`href="/${lang}/${SLUG}"`)
    })
  }

  test('/sitemap.xml incluye la ruta en ambos idiomas', async ({ request }) => {
    const xml = await (await request.get('/sitemap.xml')).text()
    expect(xml).toContain(`/es/${SLUG}`)
    expect(xml).toContain(`/en/${SLUG}`)
  })
})

// Consentimiento (Art. IV): la ausencia de fotos no prueba nada si el contenido no las tiene.
// Aquí se le PONEN fotos al programa y se comprueba que solo salen con photos_authorized: true.
// Edita y restaura el archivo real (la suite corre en serie, como tests/cms).
test.describe('Fotos del programa dependen de photos_authorized', () => {
  const FILE = `content/programs/${SLUG}.es.md`
  const PHOTO = '/images/actividades-reales/retrato-sonrisa.jpg'
  let original: string

  test.beforeEach(() => { original = fs.readFileSync(FILE, 'utf8') })
  test.afterEach(() => { fs.writeFileSync(FILE, original) })

  function withPhotos(authorized: boolean) {
    // `{}` evita la caché de gray-matter: sin ella devuelve (y este test mutaría) el mismo objeto en pruebas posteriores.
    const parsed = matter(original, {})
    parsed.data.photos_authorized = authorized
    parsed.data.hero.image = PHOTO
    parsed.data.gallery = { title: 'Galería', photos: [{ image: PHOTO, alt: 'Actividad del programa' }] }
    fs.writeFileSync(FILE, matter.stringify('', parsed.data))
  }

  test('con fotos cargadas y photos_authorized: false, no se muestra ninguna', async ({ request }) => {
    withPhotos(false)
    expect(await html(request, `/es/${SLUG}`)).not.toContain(PHOTO)
  })

  test('con fotos cargadas y photos_authorized: true, aparecen sin cambiar código', async ({ request }) => {
    withPhotos(true)
    expect(await html(request, `/es/${SLUG}`)).toContain(PHOTO)
  })
})

test.describe('Contenido del programa: archivos y esquema', () => {
  for (const lang of LANGS) {
    test(`${SLUG}.${lang}.md: sin fotos autorizadas, sin imagen de hero y con la galería vacía`, () => {
      const { data } = matter(fs.readFileSync(`content/programs/${SLUG}.${lang}.md`, 'utf8'), {})
      expect(data.photos_authorized).toBe(false)
      expect(data.hero.image ?? '').toBe('')
      expect(data.gallery?.photos ?? []).toEqual([]) // galería declarada pero vacía: el panel exige su título para poder guardar
    })
  }

  test('es y en tienen las mismas claves, íconos, colores, orden y visibilidad', () => {
    const [es, en] = LANGS.map((lang) => matter(fs.readFileSync(`content/programs/${SLUG}.${lang}.md`, 'utf8'), {}).data)
    // Estructura sin textos: se compara la forma y los campos no traducibles.
    const shape = (v: unknown): unknown =>
      Array.isArray(v) ? v.map(shape) : v && typeof v === 'object'
        ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, ['icon', 'color', 'order', 'visible', 'photos_authorized', 'layout', 'featured'].includes(k) ? x : shape(x)]))
        : typeof v === 'string' ? 'texto' : v
    expect(shape(en)).toEqual(shape(es))
  })

  // El panel (admin/, proyecto aparte que el tsc raíz NO revisa) trae su propio mapa de íconos Lucide.
  // Un ícono del catálogo que falte ahí hace que el selector renderice `undefined` y todo el panel
  // caiga con "Minified React error #130". Pasó al agregar layers/shirt/user (11-oct-2026).
  test('todo ícono del catálogo está también en el selector del panel (admin/widgets/IconPicker.tsx)', () => {
    const picker = fs.readFileSync('admin/widgets/IconPicker.tsx', 'utf8')
    const missing = ICON_OPTIONS.map((o) => o.lucideName).filter(
      // Debe aparecer 2 veces: en el import de lucide-react y en el mapa ICON_COMPONENTS.
      (name) => (picker.match(new RegExp(`^\\s+${name}(,|:)`, 'gm')) ?? []).length < 2
    )
    expect(missing).toEqual([])
  })

  test('todos los íconos del contenido existen en el catálogo del selector (RF-005)', () => {
    // El mapa de Icon.tsx está atado al catálogo por `satisfies Record<IconName, …>`: lo verifica tsc.
    const icons = new Set<string>()
    const walk = (v: unknown) => {
      if (Array.isArray(v)) return v.forEach(walk)
      if (v && typeof v === 'object') {
        for (const [k, x] of Object.entries(v)) {
          if (k === 'icon' && typeof x === 'string') icons.add(x)
          else walk(x)
        }
      }
    }
    for (const lang of LANGS) walk(matter(fs.readFileSync(`content/programs/${SLUG}.${lang}.md`, 'utf8'), {}).data)
    expect(icons.size, 'el contenido declara íconos').toBeGreaterThan(0)
    const known = new Set<string>(ICON_NAMES)
    expect([...icons].filter((icon) => !known.has(icon))).toEqual([])
  })
})

// Las pestañas son estado de React: buscar cadenas en el HTML no prueba que cada una pinte su contenido.
// Se hace clic en cada modalidad y se comprueba (en navegador) que se ven sus puntos y no los de otra.
test.describe('Modalidades: cada pestaña muestra su contenido', () => {
  const TABS = {
    es: [
      { label: 'Atención individual', points: ['Perfil inicial', 'Reajuste de objetivos'] },
      { label: 'Atención grupal', points: ['Juegos cooperativos', 'Actividades recreativas estructuradas'] },
      { label: 'Entre semana', points: ['Procesos individuales', 'Horario según planificación y disponibilidad de las familias'] },
      { label: 'Sábados', points: ['Talleres familiares', 'Actividades de integración y participación'] },
    ],
    en: [
      { label: 'Individual care', points: ['Initial profile', 'Goal adjustment'] },
      { label: 'Group care', points: ['Cooperative games', 'Structured recreational activities'] },
      { label: 'Weekdays', points: ['Individual processes', "Schedule based on planning and families' availability"] },
      { label: 'Saturdays', points: ['Family workshops', 'Integration and participation activities'] },
    ],
  }
  for (const lang of LANGS) {
    test(`/${lang}/${SLUG}: las 4 pestañas cambian el contenido visible`, async ({ page }) => {
      await page.goto(`/${lang}/${SLUG}`)
      const tabs = TABS[lang]
      for (const [i, tab] of tabs.entries()) {
        // El nombre accesible del botón incluye el rango de edad además de la etiqueta.
        await page.getByRole('tab', { name: new RegExp(`^${tab.label}`) }).click()
        for (const point of tab.points) {
          await expect(page.getByText(point, { exact: true }).first(), `${tab.label}: ${point}`).toBeVisible()
        }
        const other = tabs[(i + 1) % tabs.length].points[0]
        await expect(page.getByText(other, { exact: true }).first(), `${tab.label} no muestra "${other}"`).not.toBeVisible()
      }
    })
  }
})

// Las tarjetas fijas recortaban la descripción a 2-3 líneas; por eso principios y áreas van en acordeón.
// Aquí se abre CADA tarjeta y se comprueba (en navegador, con el contenido real del archivo) que se ve el texto
// completo y todos sus puntos, no solo que la cadena esté en el HTML.
test.describe('Acordeones: cada principio y cada área muestra todo su texto', () => {
  for (const lang of LANGS) {
    test(`/${lang}/${SLUG}: principios y áreas completos al abrir`, async ({ page }) => {
      test.setTimeout(120_000)
      const data = matter(fs.readFileSync(`content/programs/${SLUG}.${lang}.md`, 'utf8'), {}).data
      await page.goto(`/${lang}/${SLUG}`)
      const sections = [
        { heading: data.section_1.title as string, items: data.section_1.items as any[] },
        { heading: data.section_3.title as string, items: data.section_3.items as any[] },
      ]
      for (const { heading, items } of sections) {
        const section = page.locator('section', { has: page.getByRole('heading', { name: heading, exact: true }) }).first()
        for (const item of items) {
          // Se hace clic en el título (h3) de la tarjeta; el clic sube al botón del acordeón.
          await section.getByRole('heading', { name: item.title, exact: true }).click()
          await expect(section.getByText(item.desc, { exact: true }).filter({ visible: true }), `${item.title}: descripción`).toBeVisible()
          for (const point of (item.items ?? []) as string[]) {
            await expect(section.getByText(point, { exact: true }).filter({ visible: true }).first(), `${item.title}: ${point}`).toBeVisible()
          }
        }
      }
    })
  }
})
