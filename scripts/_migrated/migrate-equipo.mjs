import { mkdirSync, writeFileSync } from 'fs'
import path from 'path'

// Migración única: extrae los datos reales hoy hardcodeados en
// app/[lang]/equipo/page.tsx (arrays `areas`, `team`, `volunteers`) y genera
// los archivos de contenido que el CMS va a gestionar de ahora en más.
// Correr una sola vez, después se archiva. Ver docs/CMS_DEVELOPMENT_PLAN.md §3.2.

const CONTENT_DIR = path.join(process.cwd(), 'content')

function writeMatter(filePath, data, body = '') {
  const yaml = Object.entries(data)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}:\n${value.map((v) => `  - "${String(v).replace(/"/g, '\\"')}"`).join('\n')}`
      }
      const str = String(value).replace(/"/g, '\\"')
      return `${key}: "${str}"`
    })
    .join('\n')
  writeFileSync(filePath, `---\n${yaml}\n---\n${body}`, 'utf-8')
}

// ── Áreas de especialidad ────────────────────────────────────────────────────
const areas = [
  { id: 'fisio', name: { es: 'Fisioterapia', en: 'Physiotherapy' }, icon: '💪', color: 'secondary',
    desc: { es: 'Intervención desde la estimulación temprana para mejorar el tono muscular, la postura y la movilidad, adaptando ejercicios a cada etapa.', en: 'Intervention from early stimulation to improve muscle tone, posture, and mobility, adapting exercises to each stage.' },
    skills: { es: ['Estimulación temprana motora', 'Rehabilitación neuromuscular', 'Hidroterapia', 'Técnicas de posicionamiento'], en: ['Motor early stimulation', 'Neuromuscular rehabilitation', 'Hydrotherapy', 'Positioning techniques'] },
    programs: ['Mi Escuelita Down', 'Aula Wawitas'] },
  { id: 'psicomotricidad', name: { es: 'Psicomotricidad', en: 'Psychomotor therapy' }, icon: '🤸', color: 'accent',
    desc: { es: 'Fortalecimiento de la coordinación, equilibrio y esquema corporal para favorecer la autonomía, la concentración y la expresión corporal.', en: 'Strengthening coordination, balance, and body schema to favor autonomy, concentration, and body expression.' },
    skills: { es: ['Coordinación motora gruesa y fina', 'Esquema corporal', 'Integración bilateral', 'Equilibrio dinámico y estático'], en: ['Gross & fine motor coordination', 'Body schema', 'Bilateral integration', 'Dynamic & static balance'] },
    programs: ['Mi Escuelita Down', 'Aula Wawitas'] },
  { id: 'lenguaje', name: { es: 'Terapia de lenguaje', en: 'Speech therapy' }, icon: '🗣️', color: 'secondary',
    desc: { es: 'Trabajo en respiración, control orofacial y articulación de sonidos para mejorar la comunicación y el habla de forma divertida y funcional.', en: 'Work on breathing, orofacial control, and speech sounds articulation to improve communication and speech in a fun, functional way.' },
    skills: { es: ['Control orofacial', 'Articulación fonética', 'Comunicación aumentativa', 'Desarrollo del lenguaje expresivo/comprensivo'], en: ['Orofacial control', 'Phonetic articulation', 'Augmentative communication', 'Expressive/receptive language development'] },
    programs: ['Mi Escuelita Down', 'Aula Wawitas', 'Pasos Firmes'] },
  { id: 'conducta', name: { es: 'Psicología y conducta', en: 'Psychology & behavior' }, icon: '🧠', color: 'accent',
    desc: { es: 'Acompañamiento en el desarrollo de habilidades sociales, autorregulación y rutinas positivas dentro del entorno familiar y escolar.', en: 'Support in developing social skills, self-regulation, and positive routines within the family and school environment.' },
    skills: { es: ['Análisis conductual aplicado', 'Habilidades sociales', 'Autorregulación emocional', 'Modificación de conducta'], en: ['Applied behavior analysis', 'Social skills', 'Emotional self-regulation', 'Behavior modification'] },
    programs: ['Mi Escuelita Down', 'Aula Wawitas', 'Pasos Firmes'] },
  { id: 'pedagogia', name: { es: 'Pedagogía y Parvularia', en: 'Pedagogy & Early Years' }, icon: '📖', color: 'secondary',
    desc: { es: 'Adaptaciones curriculares según las capacidades y ritmo de cada niño, promoviendo el aprendizaje significativo y la inclusión educativa.', en: 'Curricular adaptations based on each child\'s capabilities and pace, promoting meaningful learning and educational inclusion.' },
    skills: { es: ['Adaptaciones curriculares', 'Técnicas de estudio', 'Lectoescritura adaptada', 'Estimulación temprana escolar'], en: ['Curricular adaptations', 'Study techniques', 'Adapted literacy', 'Early school stimulation'] },
    programs: ['Mi Escuelita Down', 'Pasos Firmes'] },
  { id: 'social', name: { es: 'Trabajo social', en: 'Social Work' }, icon: '🤝', color: 'accent',
    desc: { es: 'Orientación, acompañamiento social y contención emocional para las familias, estructurando la red de apoyo necesaria en el hogar.', en: 'Guidance, social support, and emotional containment for families, structuring the necessary support network at home.' },
    skills: { es: ['Evaluación familiar socioeconómica', 'Contención emocional', 'Orientación a padres', 'Gestión de redes de apoyo'], en: ['Family socioeconomic evaluation', 'Emotional containment', 'Parent guidance', 'Support network management'] },
    programs: ['Mi Escuelita Down', 'Aula Wawitas', 'Pasos Firmes'] },
]

// ── Equipo ────────────────────────────────────────────────────────────────
const team = [
  { id: 'belen-lazcano', name: 'Belen Lazcano Quispe', role: { es: 'Lic. Fisioterapia y Kinesiología', en: 'B.S. Physiotherapy and Kinesiology' }, specialty: { es: 'Fisioterapia Pediátrica y Neurodesarrollo', en: 'Pediatric Physiotherapy & Neurodevelopment' }, bio: { es: 'Especialista en estimulación temprana motora y rehabilitación neuromuscular infantil. Acompaña a la primera infancia en el desarrollo del tono muscular y la postura.', en: 'Specialist in motor early stimulation and child neuromuscular rehabilitation. Accompanies early childhood in the development of muscle tone and posture.' }, photo: '/images/equipo/belen-lazcano.jpg', initials: 'BL', area: 'fisio', color: 'secondary' },
  { id: 'wara-valdivia', name: 'Wara Belen Valdivia', role: { es: 'Lic. Psicomotricidad', en: 'B.S. Psychomotor Therapy' }, specialty: { es: 'Psicomotricidad Educativa y Terapéutica', en: 'Educational and Therapeutic Psychomotricity' }, bio: { es: 'Experta en el desarrollo de la coordinación motora, esquema corporal, lateralidad e integración sensorial a través de circuitos lúdicos adaptados.', en: 'Expert in the development of motor coordination, body schema, laterality, and sensory integration through adapted play circuits.' }, photo: '/images/equipo/wara-valdivia.jpg', initials: 'WV', area: 'psicomotricidad', color: 'accent' },
  { id: 'yasmanni-peralta', name: 'Yasmanni German Peralta Mendoza', role: { es: 'Lic. Terapia de Lenguaje', en: 'B.S. Speech Therapy' }, specialty: { es: 'Fonoaudiología y Terapia del Lenguaje', en: 'Speech-Language Pathology & Speech Therapy' }, bio: { es: 'Especialista en trastornos del habla, deglución y comunicación funcional. Experto en el diseño e implementación de sistemas aumentativos de comunicación (SAAC).', en: 'Specialist in speech, swallowing, and functional communication disorders. Expert in the design and implementation of augmentative communication systems (AAC).' }, photo: '/images/equipo/yasmanni-peralta.png', initials: 'YP', area: 'lenguaje', color: 'secondary' },
  { id: 'monica-medina', name: 'Mónica Mikaela Medina Rosales', role: { es: 'Lic. Psicología Clínica', en: 'B.S. Clinical Psychology' }, specialty: { es: 'Psicología Clínica Infantil y Neurodesarrollo', en: 'Child Clinical Psychology & Neurodevelopment' }, bio: { es: 'Especialista en evaluación diagnóstica, análisis funcional de la conducta y diseño de intervenciones terapéuticas adaptadas al perfil individual de cada niño.', en: 'Specialist in diagnostic evaluation, functional behavior analysis, and design of therapeutic interventions adapted to each child\'s individual profile.' }, photo: '/images/equipo/monica-medina.jpg', initials: 'MM', area: 'conducta', color: 'accent' },
  { id: 'ana-copa', name: 'Ana Valentina Copa Rosales', role: { es: 'Lic. Psicología', en: 'B.S. Psychology' }, specialty: { es: 'Psicología del Aprendizaje y Conducta', en: 'Learning & Behavioral Psychology' }, bio: { es: 'Licenciada en Psicología, especializada en estrategias de autorregulación emocional, modificación de conducta y estimulación de habilidades de interacción social.', en: 'B.S. in Psychology, specialized in emotional self-regulation strategies, behavior modification, and stimulation of social interaction skills.' }, photo: '/images/equipo/ana-copa.png', initials: 'AC', area: 'conducta', color: 'accent' },
  { id: 'luis-machicado', name: 'Luis Enrique Machicado Cahuaya', role: { es: 'Lic. Psicología', en: 'B.S. Psychology' }, specialty: { es: 'Modificación de Conducta y Socialización', en: 'Behavior Modification & Socialization' }, bio: { es: 'Psicólogo con enfoque cognitivo-conductual. Trabaja en la estructuración de rutinas adaptativas, juego conjunto e inclusión escolar en el aula regular.', en: 'Psychologist with cognitive-behavioral approach. Works on the structuring of adaptive routines, joint play, and school inclusion in the regular classroom.' }, photo: '', initials: 'LM', area: 'conducta', color: 'accent' },
  { id: 'helan-medrano', name: 'Helan Paola Medrano López', role: { es: 'Lic. Psicología Infantil', en: 'B.S. Child Psychology' }, specialty: { es: 'Psicología Infantil y Contención Familiar', en: 'Child Psychology & Family Counseling' }, bio: { es: 'Especialista en psicoterapia infantil, contención emocional familiar ante el diagnóstico y dinámicas de juego lúdico-terapéutico grupal.', en: 'Specialist in child psychotherapy, family emotional support during diagnosis, and group play-therapy dynamics.' }, photo: '', initials: 'HM', area: 'conducta', color: 'accent' },
  { id: 'megan', name: 'Megan', role: { es: 'Parvularia y Apoyo Pedagógico', en: 'Early Childhood & Pedagogical Support' }, specialty: { es: 'Educación Especial y Adaptaciones Curriculares', en: 'Special Education & Curriculum Adaptations' }, bio: { es: 'Educadora infantil experta en adaptaciones en el aula regular, metodologías multisensoriales de lectura y escritura, y aprestamiento preescolar inclusivo.', en: 'Early educator expert in regular classroom adaptations, multisensory reading and writing methodologies, and inclusive preschool readiness.' }, photo: '/images/equipo/megan.jpg', initials: 'ME', area: 'pedagogia', color: 'secondary' },
  { id: 'benita-rosales', name: 'Benita Isabel Rosales', role: { es: 'Lic. Trabajo Social', en: 'B.S. Social Work' }, specialty: { es: 'Trabajo Social Familiar e Inclusión', en: 'Family Social Work & Inclusion Support' }, bio: { es: 'Especialista en orientación familiar, visitas domiciliarias de valoración socioeconómica y estructuración de redes de apoyo en comunidad.', en: 'Specialist in family guidance, home visits for socioeconomic assessment, and structuring community support networks.' }, photo: '/images/equipo/benita-rosales.jpg', initials: 'BR', area: 'social', color: 'accent' },
]

const volunteers = ['Paola', 'Wanda', 'Alejandra']

// ── Escritura de archivos ────────────────────────────────────────────────────
const areasDir = path.join(CONTENT_DIR, 'team_areas')
mkdirSync(areasDir, { recursive: true })
for (const a of areas) {
  for (const locale of ['es', 'en']) {
    writeMatter(path.join(areasDir, `${a.id}.${locale}.md`), {
      name: a.name[locale],
      icon: a.icon,
      color: a.color,
      desc: a.desc[locale],
      skills: a.skills[locale],
      programs: a.programs,
    })
  }
}
console.log(`✓ ${areas.length} áreas escritas en content/team_areas/`)

const equipoDir = path.join(CONTENT_DIR, 'equipo')
mkdirSync(equipoDir, { recursive: true })
for (const m of team) {
  for (const locale of ['es', 'en']) {
    const data = {
      name: m.name,
      role: m.role[locale],
      specialty: m.specialty[locale],
      bio: m.bio[locale],
      initials: m.initials,
      area: m.area,
      color: m.color,
    }
    if (m.photo) data.photo = m.photo
    writeMatter(path.join(equipoDir, `${m.id}.${locale}.md`), data)
  }
}
console.log(`✓ ${team.length} miembros del equipo escritos en content/equipo/`)

const volunteersDir = path.join(CONTENT_DIR, 'volunteers')
mkdirSync(volunteersDir, { recursive: true })
for (const v of volunteers) {
  const slug = v.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  writeMatter(path.join(volunteersDir, `${slug}.md`), { name: v })
}
console.log(`✓ ${volunteers.length} voluntarios escritos en content/volunteers/`)

console.log('\nListo. Este script ya cumplió su función — se puede archivar/eliminar.')
