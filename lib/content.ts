import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import type { Locale } from '@/lib/i18n'
import type { AccentColor } from '@/lib/palette'

const CONTENT_DIR = path.join(process.cwd(), 'content')

// El widget `datetime` de Decap guarda fechas sin comillas en el frontmatter
// (ej. `date: 2026-07-01`), que YAML/gray-matter parsea como un objeto Date en
// vez de string — React no puede renderizar eso directo como children.
function toDateString(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  return typeof value === 'string' ? value : ''
}

// Los widgets `boolean`/`number` de Decap guardan valores YAML reales, pero
// contenido escrito a mano (o migrado) a veces los deja como texto — "false"
// es un string no vacío y por lo tanto truthy en JS. Se normaliza explícito.
function toBool(value: unknown): boolean {
  return value === true || value === 'true'
}

function toNumber(value: unknown, fallback = 0): number {
  const n = Number(value)
  return Number.isFinite(n) ? n : fallback
}

// ── Helpers para colecciones bilingües (<slug>.<locale>.md, i18n: true en Decap) ──

function listLocaleSlugs(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  const slugs = new Set<string>()
  for (const file of fs.readdirSync(dir)) {
    const match = file.match(/^(.+)\.(es|en)\.md$/)
    if (match) slugs.add(match[1])
  }
  return [...slugs].sort()
}

function readLocaleMatter(dir: string, slug: string, locale: Locale) {
  const localeFile = path.join(dir, `${slug}.${locale}.md`)
  const fallbackFile = path.join(dir, `${slug}.es.md`)
  const filePath = fs.existsSync(localeFile) ? localeFile : fallbackFile
  return matter(fs.readFileSync(filePath, 'utf-8'))
}

function readLocaleFrontmatter(dir: string, slug: string, locale: Locale) {
  return readLocaleMatter(dir, slug, locale).data
}

// ── Blog ───────────────────────────────────────────────────────────────────

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  image?: string
  contentHtml: string
}

export async function getAllPosts(): Promise<Omit<Post, 'contentHtml'>[]> {
  const dir = path.join(CONTENT_DIR, 'blog')
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'))
  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, '')
      const { data } = matter(fs.readFileSync(path.join(dir, file), 'utf-8'))
      return { slug, title: data.title ?? '', date: toDateString(data.date), excerpt: data.excerpt ?? '', image: data.image }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(CONTENT_DIR, 'blog', `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const processed = await remark().use(remarkHtml).process(content)

  return {
    slug,
    title: data.title ?? '',
    date: toDateString(data.date),
    excerpt: data.excerpt ?? '',
    image: data.image,
    contentHtml: processed.toString(),
  }
}

// ── Áreas de especialidad del equipo ─────────────────────────────────────────

export interface TeamArea {
  slug: string
  name: string
  icon: string
  color: AccentColor
  desc: string
  skills: string[]
  programs: string[]
}

export function getAllTeamAreas(locale: Locale): TeamArea[] {
  const dir = path.join(CONTENT_DIR, 'team_areas')
  return listLocaleSlugs(dir).map((slug) => {
    const data = readLocaleFrontmatter(dir, slug, locale)
    return {
      slug,
      name: data.name ?? '',
      icon: data.icon ?? '',
      color: (data.color as AccentColor) ?? 'secondary',
      desc: data.desc ?? '',
      skills: data.skills ?? [],
      programs: data.programs ?? [],
    }
  })
}

// ── Equipo ──────────────────────────────────────────────────────────────────

export interface TeamMember {
  slug: string
  name: string
  role: string
  specialty: string
  bio: string
  photo?: string
  initials: string
  area: string
  color: AccentColor
}

export function getAllTeamMembers(locale: Locale): TeamMember[] {
  const dir = path.join(CONTENT_DIR, 'equipo')
  return listLocaleSlugs(dir).map((slug) => {
    const data = readLocaleFrontmatter(dir, slug, locale)
    return {
      slug,
      name: data.name ?? '',
      role: data.role ?? '',
      specialty: data.specialty ?? '',
      bio: data.bio ?? '',
      photo: data.photo || undefined,
      initials: data.initials ?? '',
      area: data.area ?? '',
      color: (data.color as AccentColor) ?? 'secondary',
    }
  })
}

// ── Voluntarios ───────────────────────────────────────────────────────────────

export interface Volunteer {
  slug: string
  name: string
}

export function getAllVolunteers(): Volunteer[] {
  const dir = path.join(CONTENT_DIR, 'volunteers')
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const { data } = matter(fs.readFileSync(path.join(dir, file), 'utf-8'))
      return { slug: file.replace(/\.md$/, ''), name: data.name ?? '' }
    })
}

// ── Testimonios ─────────────────────────────────────────────────────────────

export interface Testimonial {
  slug: string
  family: string
  program: string
  icon: string
  color: AccentColor
  order: number
  featuredHome: boolean
  featuredImpacto: boolean
  body: string
}

export function getAllTestimonials(locale: Locale): Testimonial[] {
  const dir = path.join(CONTENT_DIR, 'testimonios')
  return listLocaleSlugs(dir)
    .map((slug) => {
      const { data, content } = readLocaleMatter(dir, slug, locale)
      return {
        slug,
        family: data.family ?? '',
        program: data.program ?? '',
        icon: data.icon ?? '',
        color: (data.color as AccentColor) ?? 'secondary',
        order: toNumber(data.order),
        featuredHome: toBool(data.featured_home),
        featuredImpacto: toBool(data.featured_impacto),
        body: content.trim(),
      }
    })
    .sort((a, b) => a.order - b.order)
}

// ── Programas ────────────────────────────────────────────────────────────────

export interface ProgramStat {
  icon: string
  value: string
  label: string
}

export interface ProgramCardItem {
  icon: string
  color: AccentColor
  title: string
  tag?: string
  desc: string
  items?: string[]
}

export interface ProgramCardSection {
  badge: string
  title: string
  subtitle: string
  layout: 'tarjetas' | 'acordeón'
  items: ProgramCardItem[]
}

export interface ProgramTab {
  icon: string
  color: AccentColor
  label: string
  ageRange?: string
  desc: string
  highlights: string[]
}

export interface ProgramTabSection {
  badge: string
  title: string
  subtitle: string
  tabs: ProgramTab[]
}

export interface ProgramStep {
  icon: string
  title: string
  desc: string
}

export interface ProgramStepSection {
  badge?: string
  title: string
  subtitle?: string
  steps: ProgramStep[]
}

export interface ProgramGalleryPhoto {
  src: string
  alt: string
}

export interface ProgramGallerySection {
  badge?: string
  title: string
  photos: ProgramGalleryPhoto[]
}

export interface Program {
  slug: string
  title: string
  hero: {
    badge: string
    subtitle: string
    color: AccentColor
    // Foto protagonista + cita real de familia (opcional). Ver ProtagonistPhoto.
    image?: string
    quote?: string
    quoteAuthor?: string
    quoteContext?: string
  }
  stats: ProgramStat[]
  section1: ProgramCardSection
  section2: ProgramTabSection
  section3?: ProgramCardSection
  gallery?: ProgramGallerySection
  enrollment: ProgramStepSection
  cta: { title: string; text: string }
}

function parseProgram(slug: string, data: Record<string, any>): Program {
  return {
    slug,
    title: data.title ?? '',
    hero: {
      badge: data.hero?.badge ?? '',
      subtitle: data.hero?.subtitle ?? '',
      color: (data.hero?.color as AccentColor) ?? 'secondary',
      image: data.hero?.image || undefined,
      quote: data.hero?.quote || undefined,
      quoteAuthor: data.hero?.quote_author || undefined,
      quoteContext: data.hero?.quote_context || undefined,
    },
    stats: data.stats ?? [],
    section1: {
      badge: data.section_1?.badge ?? '',
      title: data.section_1?.title ?? '',
      subtitle: data.section_1?.subtitle ?? '',
      layout: (data.section_1?.layout as 'tarjetas' | 'acordeón') ?? 'tarjetas',
      items: (data.section_1?.items ?? []).map((it: any) => ({
        icon: it.icon ?? '',
        color: (it.color as AccentColor) ?? 'secondary',
        title: it.title ?? '',
        tag: it.tag || undefined,
        desc: it.desc ?? '',
        items: it.items || undefined,
      })),
    },
    section2: {
      badge: data.section_2?.badge ?? '',
      title: data.section_2?.title ?? '',
      subtitle: data.section_2?.subtitle ?? '',
      tabs: (data.section_2?.tabs ?? []).map((t: any) => ({
        icon: t.icon ?? '',
        color: (t.color as AccentColor) ?? 'secondary',
        label: t.label ?? '',
        ageRange: t.age_range || undefined,
        desc: t.desc ?? '',
        highlights: t.highlights ?? [],
      })),
    },
    section3: data.section_3
      ? {
          badge: data.section_3.badge ?? '',
          title: data.section_3.title ?? '',
          subtitle: data.section_3.subtitle ?? '',
          layout: 'tarjetas',
          items: (data.section_3.items ?? []).map((it: any) => ({
            icon: it.icon ?? '',
            color: (it.color as AccentColor) ?? 'secondary',
            title: it.title ?? '',
            desc: it.desc ?? '',
          })),
        }
      : undefined,
    gallery: data.gallery
      ? {
          badge: data.gallery.badge || undefined,
          title: data.gallery.title ?? '',
          photos: (data.gallery.photos ?? []).map((p: any) => ({
            src: p.image ?? '',
            alt: p.alt ?? '',
          })),
        }
      : undefined,
    enrollment: {
      badge: data.enrollment?.badge || undefined,
      title: data.enrollment?.title ?? '',
      subtitle: data.enrollment?.subtitle || undefined,
      steps: data.enrollment?.steps ?? [],
    },
    cta: {
      title: data.cta?.title ?? '',
      text: data.cta?.text ?? '',
    },
  }
}

const PROGRAM_SLUGS = ['mi-escuelita-down', 'aula-wawitas', 'pasos-firmes'] as const

export function getProgramBySlug(slug: string, locale: Locale): Program | null {
  const dir = path.join(CONTENT_DIR, 'programs')
  if (!fs.existsSync(path.join(dir, `${slug}.es.md`))) return null
  const data = readLocaleFrontmatter(dir, slug, locale)
  return parseProgram(slug, data)
}

export function getAllPrograms(locale: Locale): Program[] {
  return PROGRAM_SLUGS.map((slug) => getProgramBySlug(slug, locale)).filter((p): p is Program => p !== null)
}
