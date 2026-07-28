import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n'
import { getAllPosts, getAllTestimonials } from '@/lib/content'
import HomeHero from '@/components/home/HomeHero'
import HomeStats from '@/components/home/HomeStats'
import HomePrograms from '@/components/home/HomePrograms'
import HomeTestimonials from '@/components/home/HomeTestimonials'
import HomeImpactStrip from '@/components/home/HomeImpactStrip'
import HomeBlogPreview from '@/components/home/HomeBlogPreview'

interface PageProps {
  params: {
    lang: Locale
  }
}

export async function generateMetadata({ params: { lang } }: PageProps): Promise<Metadata> {
  const es = lang === 'es'
  return {
    title: es ? 'Inicio | Fundación PRO-21 y Centro Lápiz en Mano' : 'Home | PRO-21 Foundation & Lápiz en Mano Center',
    description: es 
      ? 'Promovemos el bienestar integral de niños, niñas y adolescentes con síndrome de Down, autismo y dificultades de aprendizaje en La Paz, Bolivia.'
      : 'We promote the comprehensive well-being of children and adolescents with Down syndrome, autism, and learning difficulties in La Paz, Bolivia.',
    keywords: ['síndrome de Down', 'autismo', 'TEA', 'La Paz', 'Bolivia', 'dificultades de aprendizaje', 'psicomotricidad', 'fisioterapia'],
  }
}

export default async function Page({ params: { lang } }: PageProps) {
  // Carga asíncrona de datos en el servidor
  const posts = await getAllPosts()
  const testimonials = getAllTestimonials()

  return (
    <div className="overflow-x-hidden w-full min-h-screen flex flex-col bg-white">
      {/* 1. Hero Section con Animaciones */}
      <HomeHero lang={lang} />

      {/* 2. Franja de Estadísticas */}
      <HomeStats lang={lang} />

      {/* 3. Tarjetas Expandibles de Programas */}
      <HomePrograms lang={lang} />

      {/* 4. Carrusel de Testimonios de Familias */}
      <HomeTestimonials lang={lang} testimonials={testimonials} />

      {/* 5. Franja Informativa de Tres Columnas de Impacto */}
      <HomeImpactStrip lang={lang} />

      {/* 6. Vista Previa de Publicaciones de Blog / Noticias del CMS */}
      <HomeBlogPreview lang={lang} posts={posts} />
    </div>
  )
}
