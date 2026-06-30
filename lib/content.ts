import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

const CONTENT_DIR = path.join(process.cwd(), 'content')

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
      return { slug, title: data.title ?? '', date: data.date ?? '', excerpt: data.excerpt ?? '', image: data.image }
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
    date: data.date ?? '',
    excerpt: data.excerpt ?? '',
    image: data.image,
    contentHtml: processed.toString(),
  }
}

// ── Equipo ──────────────────────────────────────────────────────────────────

export interface TeamMember {
  slug: string
  name: string
  role: string
  specialty: string
  bio: string
  photo?: string
}

export function getAllTeamMembers(): TeamMember[] {
  const dir = path.join(CONTENT_DIR, 'equipo')
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const { data } = matter(fs.readFileSync(path.join(dir, file), 'utf-8'))
      return {
        slug: file.replace(/\.md$/, ''),
        name: data.name ?? '',
        role: data.role ?? '',
        specialty: data.specialty ?? '',
        bio: data.bio ?? '',
        photo: data.photo,
      }
    })
}

// ── Testimonios ─────────────────────────────────────────────────────────────

export interface Testimonial {
  slug: string
  family: string
  program: string
  body: string
}

export function getAllTestimonials(): Testimonial[] {
  const dir = path.join(CONTENT_DIR, 'testimonios')
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(dir, file), 'utf-8'))
      return {
        slug: file.replace(/\.md$/, ''),
        family: data.family ?? '',
        program: data.program ?? '',
        body: content.trim(),
      }
    })
}
