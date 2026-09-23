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
export function toDateString(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  return typeof value === 'string' ? value : ''
}

// Los widgets `boolean`/`number` de Decap guardan valores YAML reales, pero
// contenido escrito a mano (o migrado) a veces los deja como texto — "false"
// es un string no vacío y por lo tanto truthy en JS. Se normaliza explícito.
export function toBool(value: unknown): boolean {
  return value === true || value === 'true'
}

function toNumber(value: unknown, fallback = 0): number {
  const n = Number(value)
  return Number.isFinite(n) ? n : fallback
}

// ── Helpers para colecciones bilingües (<slug>.<locale>.md, i18n: true en Decap) ──

export function listLocaleSlugs(dir: string): string[] {
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

export function readLocaleFrontmatter(dir: string, slug: string, locale: Locale) {
  return readLocaleMatter(dir, slug, locale).data
}

// ── Blog ───────────────────────────────────────────────────────────────────

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  image?: string
  pdf?: string
  visible: boolean
  contentHtml: string
}

// Un post sin campo `visible` en el frontmatter (ej. entradas creadas antes de
// que este campo existiera, como content/blog/bienvenida.md) debe seguir
// visible por defecto — solo `visible: false` explícito lo oculta.
function toVisible(value: unknown): boolean {
  return value === undefined ? true : toBool(value)
}

export async function getAllPosts(): Promise<Omit<Post, 'contentHtml'>[]> {
  const dir = path.join(CONTENT_DIR, 'blog')
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'))
  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, '')
      const { data } = matter(fs.readFileSync(path.join(dir, file), 'utf-8'))
      return {
        slug,
        title: data.title ?? '',
        date: toDateString(data.date),
        excerpt: data.excerpt ?? '',
        image: data.image,
        pdf: data.pdf,
        visible: toVisible(data.visible),
      }
    })
    .filter((post) => post.visible)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(CONTENT_DIR, 'blog', `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  if (!toVisible(data.visible)) return null

  const processed = await remark().use(remarkHtml).process(content)

  return {
    slug,
    title: data.title ?? '',
    date: toDateString(data.date),
    excerpt: data.excerpt ?? '',
    image: data.image,
    pdf: data.pdf,
    visible: true,
    contentHtml: processed.toString(),
  }
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

