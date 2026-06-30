import Button from '@/components/ui/Button'
import type { Locale } from '@/lib/i18n'

interface HeroProps {
  lang: Locale
  title: string
  subtitle: string
  ctaPrimary?: { label: string; href: string }
  ctaSecondary?: { label: string; href: string }
  imageSrc?: string
}

// TODO: integrar imagen real de la fundación con next/image
export default function Hero({ lang, title, subtitle, ctaPrimary, ctaSecondary }: HeroProps) {
  return (
    <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-20 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          {title}
        </h1>
        <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
          {subtitle}
        </p>
        {(ctaPrimary || ctaSecondary) && (
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            {ctaPrimary && (
              <Button href={ctaPrimary.href} size="lg">{ctaPrimary.label}</Button>
            )}
            {ctaSecondary && (
              <Button href={ctaSecondary.href} variant="outline" size="lg">{ctaSecondary.label}</Button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
