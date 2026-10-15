import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Fuente única de la lista de programas para las pruebas: lee content/programs/*.es.md,
// la misma carpeta de la que sale el sitio. Un programa nuevo entra solo en las rutas
// que recorren SEO, idioma, accesibilidad, consentimiento y CMS (specs/002, D5).
const PROGRAMS_DIR = path.join(process.cwd(), 'content', 'programs')

interface ProgramFile {
  slug: string
  title: string
  visible: boolean
  order: number
}

function readPrograms(): ProgramFile[] {
  return fs
    .readdirSync(PROGRAMS_DIR)
    .filter((file) => file.endsWith('.es.md'))
    .map((file) => {
      // `{}` evita la caché de gray-matter: otros tests (programs-management) mutan el objeto cacheado
      // (p. ej. visible = false) y, sin esto, este helper leería ese valor contaminado.
      const { data } = matter(fs.readFileSync(path.join(PROGRAMS_DIR, file), 'utf8'), {})
      return {
        slug: file.replace(/\.es\.md$/, ''),
        title: String(data.title ?? ''),
        visible: data.visible !== false,
        order: typeof data.order === 'number' ? data.order : 0,
      }
    })
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title, 'es')) // mismo desempate que lib/cms.ts
}

/**
 * Slugs de los programas, en el orden del sitio.
 * Por defecto incluye TODOS (también los ocultos): sirve para armar la lista de pruebas al cargar el
 * archivo, y debe ser estable. Si dependiera de `visible`, un test que oculta un programa un momento
 * (tests/cms/programs-management) haría que un worker reiniciado vea otra lista que el runner y falle
 * con "Test not found in the worker process".
 * Para comprobaciones en tiempo de ejecución sobre lo que el sitio muestra, usar `{ visibleOnly: true }`.
 */
export function programSlugs(options: { visibleOnly?: boolean } = {}): string[] {
  return readPrograms()
    .filter((program) => !options.visibleOnly || program.visible)
    .map((program) => program.slug)
}

/** Rutas de los programas (sin idioma), p. ej. '/aula-wawitas'. Estable: incluye todos (ver programSlugs). */
export function programRoutes(): string[] {
  return programSlugs().map((slug) => `/${slug}`)
}

/**
 * Programas SIN autorización escrita de fotos de menores (Art. IV). Es explícita a propósito:
 * "no tiene autorización" es una decisión de la fundación, no algo que se deduzca de la lista.
 */
export const UNAUTHORIZED_PROGRAMS = ['aula-wawitas', 'pasos-firmes', 'desarrolla-tea']
