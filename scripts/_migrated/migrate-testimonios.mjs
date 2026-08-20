import { mkdirSync, writeFileSync } from 'fs'
import path from 'path'

// Migración única: unifica los testimonios hoy duplicados/divergentes en
// app/[lang]/page.tsx (Inicio) y app/[lang]/impacto/page.tsx en una sola
// colección editable, con flags featured_home/featured_impacto para controlar
// dónde aparece cada uno. Ver docs/CMS_DEVELOPMENT_PLAN.md §3.2.

const CONTENT_DIR = path.join(process.cwd(), 'content', 'testimonios')
mkdirSync(CONTENT_DIR, { recursive: true })

function writeMatter(slug, locale, data, body) {
  const yaml = Object.entries(data)
    .map(([key, value]) => `${key}: "${String(value).replace(/"/g, '\\"')}"`)
    .join('\n')
  writeFileSync(path.join(CONTENT_DIR, `${slug}.${locale}.md`), `---\n${yaml}\n---\n${body}\n`, 'utf-8')
}

const testimonials = [
  {
    slug: 'familia-quispe',
    family: 'Familia Quispe',
    program: 'Mi Escuelita Down',
    icon: '🌟',
    color: 'secondary',
    order: 1,
    featured_home: true,
    featured_impacto: true,
    quote: {
      es: 'Cuando recibimos el diagnóstico sentimos que el mundo se detenía. En Lápiz en Mano encontramos no solo terapia, sino una familia que nos enseñó a ver las capacidades antes que las limitaciones.',
      en: 'When we received the diagnosis, we felt the world stop. At Lápiz en Mano, we found not only therapy but a family that taught us to see abilities before limitations.',
    },
  },
  {
    slug: 'familia-mamani-inicio',
    family: 'Familia Mamani',
    program: 'Aula Wawitas',
    icon: '🧸',
    color: 'secondary',
    order: 2,
    featured_home: true,
    featured_impacto: false,
    quote: {
      es: 'Mi hijo llegó al centro sin poder expresarse. Hoy nos cuenta su día con detalle. Los profesionales son extraordinarios y el ambiente que han creado es único.',
      en: 'My son arrived at the center unable to express himself. Today he tells us about his day in detail. The professionals are extraordinary and the environment they have created is unique.',
    },
  },
  {
    slug: 'familia-mamani-impacto',
    family: 'Familia Mamani',
    program: 'Aula Wawitas',
    icon: '🧩',
    color: 'accent',
    order: 3,
    featured_home: false,
    featured_impacto: true,
    quote: {
      es: 'Mi hijo no hablaba a los 3 años. Después de un año en Aula Wawitas, no solo dice palabras — canta canciones. Cada logro que parece pequeño para otros, para nosotros es un universo.',
      en: 'My son did not speak at 3. After a year in Aula Wawitas, he does not just say words — he sings songs. Every achievement that seems small to others is a universe to us.',
    },
  },
  {
    slug: 'familia-torrez',
    family: 'Familia Torrez',
    program: 'Pasos Firmes',
    icon: '📚',
    color: 'secondary',
    order: 4,
    featured_home: true,
    featured_impacto: false,
    quote: {
      es: 'Pasos Firmes cambió la relación de mi hija con la escuela. Pasó de llorar cada mañana a querer ir. El equipo no solo trabaja con los niños, trabaja con toda la familia.',
      en: "Pasos Firmes changed my daughter's relationship with school. She went from crying every morning to wanting to go. The team doesn't just work with children, they work with the whole family.",
    },
  },
  {
    slug: 'familia-condori',
    family: 'Familia Condori',
    program: 'Pasos Firmes',
    icon: '📚',
    color: 'secondary',
    order: 5,
    featured_home: false,
    featured_impacto: true,
    quote: {
      es: 'Los profesores decían que era flojo. Aquí descubrieron que tiene dislexia. Le enseñaron a aprender de otra forma y sus notas cambiaron, pero lo más importante: su autoestima volvió.',
      en: 'Teachers said he was lazy. Here they discovered he has dyslexia. They taught him to learn differently, and his grades changed, but most importantly: his self-esteem returned.',
    },
  },
]

for (const t of testimonials) {
  for (const locale of ['es', 'en']) {
    writeMatter(
      t.slug,
      locale,
      {
        family: t.family,
        program: t.program,
        icon: t.icon,
        color: t.color,
        order: t.order,
        featured_home: t.featured_home,
        featured_impacto: t.featured_impacto,
      },
      t.quote[locale]
    )
  }
}

console.log(`✓ ${testimonials.length} testimonios escritos en content/testimonios/ (${testimonials.length * 2} archivos, es+en)`)
