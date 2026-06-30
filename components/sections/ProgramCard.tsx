import Link from 'next/link'
import type { Locale } from '@/lib/i18n'

interface ProgramCardProps {
  lang: Locale
  slug: string
  icon: string
  name: string
  description: string
  audience: string
}

export default function ProgramCard({ lang, slug, icon, name, description, audience }: ProgramCardProps) {
  return (
    <Link href={`/${lang}/${slug}`} className="group block bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">{name}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
      <p className="text-xs text-gray-400 mt-3">Para: {audience}</p>
    </Link>
  )
}
