import fs from 'fs'
import path from 'path'
import { load } from 'js-yaml'
import type { ZodType } from 'zod'
import type { Locale } from '@/lib/i18n'
import {
  homeSchema, type HomeContent,
  aboutSchema, type AboutContent,
  impactSchema, type ImpactContent,
  collaborateSchema, type CollaborateContent,
  familiesSchema, type FamiliesContent,
  contactPageSchema, type ContactPageContent,
  siteSettingsSchema, type SiteSettingsContent,
} from '@/lib/cms-schemas'

const SETTINGS_DIR = path.join(process.cwd(), 'content', 'settings')

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
