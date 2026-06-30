import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n'
import { getPostBySlug, getAllPosts } from '@/lib/content'
import { notFound } from 'next/navigation'

interface Props {
  params: { lang: Locale; slug: string }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) return {}
  return { title: `${post.title} | Blog Fundación PRO-21` }
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()

  return (
    <article className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <time className="text-sm text-gray-500">{post.date}</time>
      {/* TODO: renderizar contenido Markdown */}
      <div className="mt-8 prose" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </article>
  )
}
