import fs from 'fs'
import path from 'path'
import { load } from 'js-yaml'
import type { ZodType } from 'zod'
import type { Locale } from '@/lib/i18n'
import matter from 'gray-matter'
import { readLocaleFrontmatter, listLocaleSlugs } from '@/lib/content'
import {
  homeSchema, type HomeContent,
  aboutSchema, type AboutContent,
  impactSchema, type ImpactContent,
  collaborateSchema, type CollaborateContent,
  familiesSchema, type FamiliesContent,
  contactPageSchema, type ContactPageContent,
  siteSettingsSchema, type SiteSettingsContent,
  programSchema, type ProgramContent,
  equipoPageSchema, type EquipoPageContent,
  teamAreaSchema, type TeamAreaContent,
  teamMemberSchema, type TeamMemberContent,
  volunteerSchema, type VolunteerContent,
} from '@/lib/cms-schemas'

const SETTINGS_DIR = path.join(process.cwd(), 'content', 'settings')
const CONTENT_DIR = path.join(process.cwd(), 'content')

// Lee un singleton YAML (content/settings/<name>.yml) y lo valida contra su
// esquema zod. Un solo archivo con es:/en: anidados — las colecciones "files"
// de Decap solo soportan i18n con structure: single_file (a diferencia de las
// colecciones "folder", que usan multiple_files, un archivo por idioma).
// Un YAML mal formado o un campo con el tipo equivocado hace fallar el build
// acá, con un mensaje que apunta exactamente al archivo y campo problemático
// — en vez de romper el render en producción con un `undefined` silencioso.
// Ver docs/CMS_DEVELOPMENT_PLAN.md §3.1.
export function getSingleton<T>(name: string, locale: Locale, schema: ZodType<T>): T {
  const filePath = path.join(SETTINGS_DIR, `${name}.yml`)
  const parsed = load(fs.readFileSync(filePath, 'utf-8')) as Record<string, unknown>
  const raw = parsed[locale] ?? parsed.es
  const result = schema.safeParse(raw)

  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `  - ${locale}.${issue.path.join('.') || '(raíz)'}: ${issue.message}`)
      .join('\n')
    throw new Error(`Contenido inválido en ${filePath}:\n${issues}`)
  }

  return result.data
}

export function getHomeContent(locale: Locale): HomeContent {
  return getSingleton('home', locale, homeSchema)
}

export function getAboutContent(locale: Locale): AboutContent {
  return getSingleton('about', locale, aboutSchema)
}

export function getImpactContent(locale: Locale): ImpactContent {
  return getSingleton('impact', locale, impactSchema)
}

export function getCollaborateContent(locale: Locale): CollaborateContent {
  return getSingleton('collaborate', locale, collaborateSchema)
}

export function getFamiliesContent(locale: Locale): FamiliesContent {
  return getSingleton('families', locale, familiesSchema)
}

export function getContactPageContent(locale: Locale): ContactPageContent {
  return getSingleton('contact_page', locale, contactPageSchema)
}

export function getSiteSettings(locale: Locale): SiteSettingsContent {
  return getSingleton('site_settings', locale, siteSettingsSchema)
}

export function getEquipoPageContent(locale: Locale): EquipoPageContent {
  return getSingleton('equipo_page', locale, equipoPageSchema)
}

// Colección folder (multiple_files, i18n: true) — frontmatter de un archivo .md por
// idioma, a diferencia de los singletons de arriba (un solo .yml con es:/en: anidados).
// Mismo principio de validación que getSingleton: un YAML mal formado o un campo
// faltante lanza acá, con archivo y campo exactos, en vez de fallar en el render.
export type Program = ProgramContent & { slug: string }

const PROGRAM_SLUGS = ['mi-escuelita-down', 'aula-wawitas', 'pasos-firmes'] as const

export function getProgramBySlug(slug: string, locale: Locale): Program | null {
  const dir = path.join(CONTENT_DIR, 'programs')
  if (!fs.existsSync(path.join(dir, `${slug}.es.md`))) return null

  const raw = readLocaleFrontmatter(dir, slug, locale)
  const result = programSchema.safeParse(raw)

  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `  - ${locale}.${issue.path.join('.') || '(raíz)'}: ${issue.message}`)
      .join('\n')
    throw new Error(`Contenido inválido en content/programs/${slug}.${locale}.md:\n${issues}`)
  }

  return { ...result.data, slug }
}

export function getAllPrograms(locale: Locale): Program[] {
  return PROGRAM_SLUGS.map((slug) => getProgramBySlug(slug, locale)).filter((p): p is Program => p !== null)
}

// Colección folder i18n:true genérica (multiple_files: <slug>.<locale>.md) — una
// entrada por archivo, a diferencia de getSingleton (un solo .yml con es:/en:).
function getFolderCollection<T>(dir: string, locale: Locale, schema: ZodType<T>): (T & { slug: string })[] {
  const fullDir = path.join(CONTENT_DIR, dir)
  return listLocaleSlugs(fullDir).map((slug) => {
    const raw = readLocaleFrontmatter(fullDir, slug, locale)
    const result = schema.safeParse(raw)

    if (!result.success) {
      const issues = result.error.issues
        .map((issue) => `  - ${locale}.${issue.path.join('.') || '(raíz)'}: ${issue.message}`)
        .join('\n')
      throw new Error(`Contenido inválido en content/${dir}/${slug}.${locale}.md:\n${issues}`)
    }

    return { ...result.data, slug }
  })
}

export type TeamArea = TeamAreaContent & { slug: string }

export function getAllTeamAreas(locale: Locale): TeamArea[] {
  return getFolderCollection('team_areas', locale, teamAreaSchema)
}

export type TeamMember = TeamMemberContent & { slug: string }

export function getAllTeamMembers(locale: Locale): TeamMember[] {
  return getFolderCollection('equipo', locale, teamMemberSchema)
}

// Sin i18n (un solo .md por persona) — no puede reusar getFolderCollection, que
// asume el patrón <slug>.<locale>.md.
export type Volunteer = VolunteerContent & { slug: string }

export function getAllVolunteers(): Volunteer[] {
  const dir = path.join(CONTENT_DIR, 'volunteers')
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '')
      const { data } = matter(fs.readFileSync(path.join(dir, file), 'utf-8'))
      const result = volunteerSchema.safeParse(data)

      if (!result.success) {
        const issues = result.error.issues
          .map((issue) => `  - ${issue.path.join('.') || '(raíz)'}: ${issue.message}`)
          .join('\n')
        throw new Error(`Contenido inválido en content/volunteers/${file}:\n${issues}`)
      }

      return { ...result.data, slug }
    })
}
