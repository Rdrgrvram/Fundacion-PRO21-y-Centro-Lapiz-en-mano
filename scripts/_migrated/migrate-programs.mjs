import { mkdirSync, writeFileSync } from 'fs'
import path from 'path'
import { dump } from 'js-yaml'

// Migración única: extrae el contenido hoy hardcodeado en las 3 páginas de
// programas hacia content/programs/<slug>.<locale>.md (folder collection,
// multiple_files — igual que equipo/team_areas). Ver docs/CMS-DOCUMENTATION.md §4.

const DIR = path.join(process.cwd(), 'content', 'programs')
mkdirSync(DIR, { recursive: true })

function writeProgram(slug, locale, data) {
  const yaml = dump(data, { lineWidth: -1 })
  writeFileSync(path.join(DIR, `${slug}.${locale}.md`), `---\n${yaml}---\n`, 'utf-8')
}

// ═══════════════════════════ Mi Escuelita Down ═══════════════════════════

const miEscuelitaDown = {
  es: {
    title: 'Mi Escuelita Down',
    hero: { badge: 'Programa Especializado', subtitle: 'Intervención terapéutica y educativa integral para niños y niñas con síndrome de Down, desde la estimulación temprana hasta la inclusión escolar plena.', color: 'primary' },
    stats: [
      { icon: '👶', value: '0 – 14+', label: 'años atendidos' },
      { icon: '🏫', value: '3', label: 'niveles educativos' },
      { icon: '💛', value: '4', label: 'áreas terapéuticas' },
      { icon: '🎓', value: '8', label: 'años de trayectoria' },
    ],
    section_1: {
      badge: 'Intervención especializada', title: 'Áreas de Terapia', layout: 'tarjetas',
      subtitle: 'Cada niño recibe un plan de intervención personalizado que integra las cuatro áreas terapéuticas según sus necesidades individuales.',
      items: [
        { icon: '🧠', color: 'accent', title: 'Terapia de Conducta', desc: 'Acompañamos a los niños en el desarrollo de habilidades sociales, autorregulación y rutinas positivas en el entorno familiar y escolar.', items: ['Habilidades sociales', 'Autorregulación emocional', 'Rutinas positivas', 'Independencia funcional'] },
        { icon: '🗣️', color: 'secondary', title: 'Terapia de Lenguaje', desc: 'Evaluamos y tratamos dificultades del lenguaje implementando estrategias que favorezcan la comunicación efectiva, incluyendo sistemas aumentativos y alternativos.', items: ['Control orofacial', 'Articulación fonética', 'Lenguaje expresivo y comprensivo', 'Comunicación funcional'] },
        { icon: '💪', color: 'secondary', title: 'Fisioterapia', desc: 'Intervenimos desde la estimulación temprana para mejorar el tono muscular, la postura y la movilidad, adaptando ejercicios a cada etapa de desarrollo.', items: ['Estimulación temprana motora', 'Rehabilitación neuromuscular', 'Tono muscular y postura', 'Movilidad funcional'] },
        { icon: '🤸', color: 'primary', title: 'Psicomotricidad', desc: 'Fortalecemos la coordinación, equilibrio y esquema corporal para favorecer la autonomía y la expresión corporal a través de circuitos, juegos y actividades vivenciales.', items: ['Coordinación motora gruesa y fina', 'Esquema corporal', 'Equilibrio y lateralidad', 'Integración bilateral'] },
      ],
    },
    section_2: {
      badge: 'Educación inclusiva', title: 'Niveles Educativos',
      subtitle: 'Nuestros estudiantes cuentan con libreta de la educación regular y reciben adaptaciones curriculares en cada etapa.',
      tabs: [
        { icon: '🌱', color: 'accent', label: 'Pre-Kínder', age_range: '3 – 5 años', desc: 'Actividades lúdicas orientadas al desarrollo cognitivo temprano. Introducimos progresivamente conceptos de lectura, escritura y matemáticas adaptadas al perfil comunicativo del niño, trabajando de la mano con la familia.', highlights: ['Estimulación sensorial y motora', 'Desarrollo del lenguaje inicial', 'Habilidades socioemocionales', 'Juego funcional y estructurado'] },
        { icon: '📚', color: 'secondary', label: 'Kínder', age_range: '5 – 6 años', desc: 'Consolidamos habilidades fundamentales: lectoescritura inicial, operaciones matemáticas básicas y habilidades de convivencia. Preparamos al niño para la transición a educación primaria regular con acompañamiento terapéutico.', highlights: ['Lectoescritura inicial', 'Matemáticas básicas', 'Convivencia y normas', 'Preparación para primaria'] },
        { icon: '🎓', color: 'primary', label: 'Primaria', age_range: '6+ años', desc: 'Los estudiantes de primaria en el Centro Lápiz en Mano asisten paralelamente al centro y a una escuela regular. Realizamos adaptaciones curriculares personalizadas y coordinamos con los docentes escolares para garantizar una inclusión educativa real y exitosa.', highlights: ['Adaptaciones curriculares', 'Coordinación con escuelas', 'Libreta del sistema regular', 'Trayectoria hasta bachiller'] },
      ],
    },
    section_3: {
      badge: 'Apoyo integral', title: 'Servicios Complementarios',
      items: [
        { icon: '🧩', color: 'accent', title: 'Estimulación Neuro-cognitiva', desc: 'Potenciamos las funciones cognitivas: atención, memoria de trabajo, funciones ejecutivas y razonamiento lógico adaptado al perfil de cada niño con síndrome de Down.' },
        { icon: '👨‍👩‍👧', color: 'secondary', title: 'Orientación Familiar', desc: 'Sesiones con padres y madres para compartir estrategias, resolver dudas y empoderar a la familia como co-terapeutas en el hogar. Incluye sesiones virtuales gratuitas.' },
        { icon: '🏫', color: 'accent', title: 'Coordinación Escolar', desc: 'Trabajamos directamente con los docentes de la escuela regular del niño para diseñar adaptaciones curriculares y garantizar la continuidad del aprendizaje en ambos entornos.' },
        { icon: '📊', color: 'secondary', title: 'Evaluación Continua', desc: 'Reevaluamos periódicamente el progreso de cada niño y ajustamos el plan de intervención para mantener metas relevantes y alcanzables en cada etapa de su desarrollo.' },
      ],
    },
    enrollment: {
      title: '¿Cómo ingresar al programa?',
      steps: [
        { icon: '📞', title: 'Contacto inicial', desc: 'Contáctanos por WhatsApp o formulario para agendar una primera conversación.' },
        { icon: '🔍', title: 'Evaluación', desc: 'Realizamos una evaluación integral del niño para diseñar un plan personalizado.' },
        { icon: '📋', title: 'Plan de intervención', desc: 'Elaboramos objetivos claros y seleccionamos las áreas terapéuticas prioritarias.' },
        { icon: '🌱', title: 'Inicio del programa', desc: 'El niño comienza sus sesiones. La familia recibe orientación permanente.' },
      ],
    },
    cta: { title: '¿Tu hijo tiene síndrome de Down?', text: 'Contáctanos hoy. Evaluamos gratuitamente a cada niño y diseñamos un plan adaptado a sus necesidades.' },
  },
  en: {
    title: 'Mi Escuelita Down',
    hero: { badge: 'Specialized Program', subtitle: 'Comprehensive therapeutic and educational intervention for children with Down syndrome, from early stimulation to full school inclusion.', color: 'primary' },
    stats: [
      { icon: '👶', value: '0 – 14+', label: 'years served' },
      { icon: '🏫', value: '3', label: 'educational levels' },
      { icon: '💛', value: '4', label: 'therapy areas' },
      { icon: '🎓', value: '8', label: 'years of experience' },
    ],
    section_1: {
      badge: 'Specialized intervention', title: 'Therapy Areas', layout: 'tarjetas',
      subtitle: 'Each child receives a personalized intervention plan that integrates the four therapy areas based on their individual needs.',
      items: [
        { icon: '🧠', color: 'accent', title: 'Behavioral Therapy', desc: 'We support children in developing social skills, self-regulation, and positive routines in family and school environments.', items: ['Social skills', 'Emotional self-regulation', 'Positive routines', 'Functional independence'] },
        { icon: '🗣️', color: 'secondary', title: 'Speech Therapy', desc: 'We evaluate and treat language difficulties, implementing strategies that promote effective communication, including augmentative and alternative systems.', items: ['Orofacial control', 'Phonetic articulation', 'Expressive and receptive language', 'Functional communication'] },
        { icon: '💪', color: 'secondary', title: 'Physiotherapy', desc: 'We intervene from early stimulation to improve muscle tone, posture, and mobility, adapting exercises to each developmental stage.', items: ['Motor early stimulation', 'Neuromuscular rehabilitation', 'Muscle tone and posture', 'Functional mobility'] },
        { icon: '🤸', color: 'primary', title: 'Psychomotor Therapy', desc: 'We strengthen coordination, balance, and body schema to foster autonomy and body expression through circuits, games, and experiential activities.', items: ['Gross and fine motor coordination', 'Body schema', 'Balance and laterality', 'Bilateral integration'] },
      ],
    },
    section_2: {
      badge: 'Inclusive education', title: 'Educational Levels',
      subtitle: 'Our students hold a regular education grade book and receive curricular adaptations at each stage.',
      tabs: [
        { icon: '🌱', color: 'accent', label: 'Pre-Kinder', age_range: '3 – 5 years', desc: "Play-based activities focused on early cognitive development. We progressively introduce reading, writing, and math concepts adapted to the child's communicative profile, working hand-in-hand with families.", highlights: ['Sensory and motor stimulation', 'Early language development', 'Socioemotional skills', 'Functional and structured play'] },
        { icon: '📚', color: 'secondary', label: 'Kinder', age_range: '5 – 6 years', desc: 'We consolidate fundamental skills: basic reading and writing, math operations, and coexistence skills. We prepare children for the transition to regular primary education with therapeutic support.', highlights: ['Basic reading and writing', 'Basic mathematics', 'Coexistence and norms', 'Primary school preparation'] },
        { icon: '🎓', color: 'primary', label: 'Primary', age_range: '6+ years', desc: 'Primary students at Centro Lápiz en Mano attend both our center and a regular school simultaneously. We make personalized curricular adaptations and coordinate with school teachers to ensure real and successful educational inclusion.', highlights: ['Curricular adaptations', 'School coordination', 'Regular system grade book', 'Path through graduation'] },
      ],
    },
    section_3: {
      badge: 'Comprehensive support', title: 'Complementary Services',
      items: [
        { icon: '🧩', color: 'accent', title: 'Neuro-cognitive Stimulation', desc: "We enhance cognitive functions: attention, working memory, executive functions, and logical reasoning adapted to each child's Down syndrome profile." },
        { icon: '👨‍👩‍👧', color: 'secondary', title: 'Family Guidance', desc: 'Sessions with parents to share strategies, resolve doubts, and empower families as co-therapists at home. Includes free virtual sessions.' },
        { icon: '🏫', color: 'accent', title: 'School Coordination', desc: "We work directly with the child's regular school teachers to design curricular adaptations and ensure learning continuity in both environments." },
        { icon: '📊', color: 'secondary', title: 'Ongoing Evaluation', desc: "We periodically reevaluate each child's progress and adjust the intervention plan to maintain relevant and achievable goals at each development stage." },
      ],
    },
    enrollment: {
      title: 'How to join the program?',
      steps: [
        { icon: '📞', title: 'Initial contact', desc: 'Contact us via WhatsApp or form to schedule a first conversation.' },
        { icon: '🔍', title: 'Evaluation', desc: 'We conduct a comprehensive evaluation to design a personalized plan.' },
        { icon: '📋', title: 'Intervention plan', desc: 'We set clear objectives and select priority therapy areas.' },
        { icon: '🌱', title: 'Program start', desc: 'The child starts sessions. The family receives ongoing guidance.' },
      ],
    },
    cta: { title: 'Does your child have Down syndrome?', text: "Contact us today. We evaluate each child free of charge and design a plan adapted to their needs." },
  },
}

// ═══════════════════════════════ Aula Wawitas ═══════════════════════════════

const aulaWawitas = {
  es: {
    title: 'Aula Wawitas',
    hero: { badge: 'Programa Preescolar', subtitle: 'Programa de estimulación y educación preescolar integral para niños y niñas de 3 a 5 años, preparándolos para una transición exitosa a la educación primaria regular.', color: 'secondary' },
    stats: [
      { icon: '🧸', value: '3', label: 'niveles: Parvulario, Pre-Kínder, Kínder' },
      { icon: '📅', value: '3 – 5', label: 'años de edad' },
      { icon: '🎯', value: '4', label: 'áreas de estimulación' },
      { icon: '🏫', value: '✓', label: 'Integración a educación regular' },
    ],
    section_1: {
      badge: 'Nuestra filosofía', title: 'Pilares del Programa', layout: 'tarjetas', subtitle: '',
      items: [
        { icon: '⏰', color: 'accent', title: 'Intervención temprana', desc: 'Cuanto antes se identifique una necesidad y se intervenga, mayor será el impacto en el desarrollo del niño. Cada etapa preescolar es una ventana única de aprendizaje.' },
        { icon: '🧩', color: 'secondary', title: 'Aprendizaje individualizado', desc: 'No hay dos niños iguales. Cada plan de estimulación se diseña a medida, respetando el ritmo, las fortalezas y las particularidades de cada pequeño.' },
        { icon: '🔄', color: 'primary', title: 'Enfoque integral', desc: 'Abordamos todas las áreas del desarrollo de forma simultánea y coordinada: cognición, comunicación, motricidad, socialización y autonomía.' },
        { icon: '👨‍👩‍👧', color: 'accent', title: 'Familia como aliada', desc: 'Los padres son los principales agentes del cambio. Los formamos, acompañamos y empoderamos para que sean co-educadores activos en el hogar.' },
      ],
    },
    section_2: {
      badge: 'Trayectoria preescolar', title: 'Niveles del Programa',
      subtitle: 'Acompañamos a cada niño desde los 3 años con un currículo progresivo que respeta su ritmo individual.',
      tabs: [
        { icon: '🧸', color: 'accent', label: 'Parvulario', age_range: '3 años', desc: 'El nivel de Parvulario se orienta a implementar actividades sensoriales y de exploración para niños pequeños. Acompañamos las primeras interacciones lúdicas estructuradas, trabajando de manera enfocada en el desarrollo de habilidades socioemocionales iniciales, el juego simbólico y la autorregulación en espacios terapéuticos.', highlights: ['Actividades sensoriales', 'Exploración del entorno', 'Habilidades socioemocionales iniciales', 'Juego funcional y estructurado'] },
        { icon: '🎨', color: 'secondary', label: 'Pre-Kínder', age_range: '4 años', desc: 'En Pre-Kínder, nos enfocamos en diseñar actividades lúdicas para el desarrollo cognitivo temprano. Introducimos progresivamente conceptos básicos de lectura, escritura y matemáticas adaptadas al perfil comunicativo del niño, ampliando su vocabulario y fortaleciendo sus canales expresivos y receptivos.', highlights: ['Desarrollo cognitivo temprano', 'Conceptos de lectoescritura inicial', 'Nociones matemáticas básicas', 'Ampliación de vocabulario'] },
        { icon: '✏️', color: 'primary', label: 'Kínder', age_range: '5 años', desc: 'El nivel Kínder consolida habilidades fundamentales y prepara al niño para su transición a la educación primaria regular. Trabajamos la lectoescritura, las operaciones básicas, la convivencia y las habilidades de autonomía que el niño necesitará en su nuevo entorno escolar.', highlights: ['Consolidación de lectoescritura', 'Operaciones matemáticas básicas', 'Habilidades de convivencia', 'Preparación para primaria regular'] },
      ],
    },
    section_3: {
      badge: 'Qué trabajamos', title: 'Áreas de Estimulación',
      items: [
        { icon: '🧠', color: 'accent', title: 'Cognición y Aprendizaje', desc: '', items: ['Clasificación y seriación', 'Conceptos espaciales y temporales', 'Memoria y atención', 'Razonamiento lógico básico'] },
        { icon: '🗣️', color: 'secondary', title: 'Comunicación y Lenguaje', desc: '', items: ['Vocabulario expresivo y receptivo', 'Comprensión de instrucciones', 'Narración y descripción', 'Iniciación a la lectoescritura'] },
        { icon: '🤸', color: 'primary', title: 'Motricidad y Cuerpo', desc: '', items: ['Coordinación motora gruesa', 'Motricidad fina y grafomotricidad', 'Esquema corporal', 'Destrezas de autonomía'] },
        { icon: '🌟', color: 'accent', title: 'Socialización y Autonomía', desc: '', items: ['Habilidades de juego cooperativo', 'Normas de convivencia', 'Rutinas de autocuidado', 'Expresión emocional'] },
      ],
    },
    enrollment: {
      title: '¿Cómo inscribir a tu hijo?',
      steps: [
        { icon: '📞', title: 'Contacto inicial', desc: 'Comunícate con nosotros por WhatsApp o formulario. Te respondemos en menos de 24 horas.' },
        { icon: '🔍', title: 'Evaluación inicial', desc: 'Realizamos una evaluación del desarrollo del niño para conocer su perfil y necesidades.' },
        { icon: '📋', title: 'Plan de estimulación', desc: 'Diseñamos un programa personalizado con objetivos a corto, medio y largo plazo.' },
        { icon: '🌟', title: 'Inicio del programa', desc: 'El niño comienza el programa y la familia recibe orientación continua.' },
      ],
    },
    cta: { title: '¿Tu hijo tiene entre 3 y 5 años?', text: 'El Aula Wawitas recibe niños de 3 a 5 años. Contáctanos para conocer disponibilidad y comenzar el proceso de inscripción.' },
  },
  en: {
    title: 'Aula Wawitas',
    hero: { badge: 'Preschool Program', subtitle: 'Comprehensive preschool stimulation and education program for children ages 3 to 5, preparing them for a successful transition to regular primary education.', color: 'secondary' },
    stats: [
      { icon: '🧸', value: '3', label: 'levels: Nursery, Pre-Kinder, Kinder' },
      { icon: '📅', value: '3 – 5', label: 'years of age' },
      { icon: '🎯', value: '4', label: 'stimulation areas' },
      { icon: '🏫', value: '✓', label: 'Regular education integration' },
    ],
    section_1: {
      badge: 'Our philosophy', title: 'Program Pillars', layout: 'tarjetas', subtitle: '',
      items: [
        { icon: '⏰', color: 'accent', title: 'Early intervention', desc: "The earlier a need is identified and addressed, the greater the impact on the child's development. Each preschool stage is a unique learning window." },
        { icon: '🧩', color: 'secondary', title: 'Individualized learning', desc: "No two children are alike. Each stimulation plan is custom-designed, respecting each child's pace, strengths, and particularities." },
        { icon: '🔄', color: 'primary', title: 'Integral approach', desc: 'We address all areas of development simultaneously and in a coordinated way: cognition, communication, motor skills, socialization, and autonomy.' },
        { icon: '👨‍👩‍👧', color: 'accent', title: 'Family as ally', desc: 'Parents are the main agents of change. We train, accompany, and empower them to be active co-educators at home.' },
      ],
    },
    section_2: {
      badge: 'Preschool path', title: 'Program Levels',
      subtitle: 'We accompany each child from age 3 with a progressive curriculum that respects their individual pace.',
      tabs: [
        { icon: '🧸', color: 'accent', label: 'Nursery', age_range: '3 years', desc: 'The Nursery level focuses on implementing sensory and exploration activities for toddlers. We accompany the first structured play interactions, working on the development of initial socioemotional skills, symbolic play, and self-regulation in therapeutic spaces.', highlights: ['Sensory activities', 'Environmental exploration', 'Initial socioemotional skills', 'Functional and structured play'] },
        { icon: '🎨', color: 'secondary', label: 'Pre-Kinder', age_range: '4 years', desc: "In Pre-Kinder, we focus on designing play-based activities for early cognitive development. We progressively introduce basic reading, writing, and math concepts adapted to the child's communicative profile, expanding vocabulary and strengthening expressive and receptive channels.", highlights: ['Early cognitive development', 'Initial reading & writing concepts', 'Basic math notions', 'Vocabulary expansion'] },
        { icon: '✏️', color: 'primary', label: 'Kinder', age_range: '5 years', desc: 'The Kinder level consolidates fundamental skills and prepares the child for the transition to regular primary education. We work on reading and writing, basic operations, coexistence, and the autonomy skills the child will need in their new school environment.', highlights: ['Reading and writing consolidation', 'Basic math operations', 'Coexistence skills', 'Regular primary school preparation'] },
      ],
    },
    section_3: {
      badge: 'What we work on', title: 'Stimulation Areas',
      items: [
        { icon: '🧠', color: 'accent', title: 'Cognition & Learning', desc: '', items: ['Classification and seriation', 'Spatial and temporal concepts', 'Memory and attention', 'Basic logical reasoning'] },
        { icon: '🗣️', color: 'secondary', title: 'Communication & Language', desc: '', items: ['Expressive and receptive vocabulary', 'Instruction comprehension', 'Narration and description', 'Introduction to reading and writing'] },
        { icon: '🤸', color: 'primary', title: 'Motor Skills & Body', desc: '', items: ['Gross motor coordination', 'Fine motor and graphomotor skills', 'Body schema', 'Autonomy skills'] },
        { icon: '🌟', color: 'accent', title: 'Socialization & Autonomy', desc: '', items: ['Cooperative play skills', 'Coexistence norms', 'Self-care routines', 'Emotional expression'] },
      ],
    },
    enrollment: {
      title: 'How to enroll your child?',
      steps: [
        { icon: '📞', title: 'Initial contact', desc: 'Contact us via WhatsApp or form. We respond in less than 24 hours.' },
        { icon: '🔍', title: 'Initial evaluation', desc: "We evaluate the child's development to understand their profile and needs." },
        { icon: '📋', title: 'Stimulation plan', desc: 'We design a personalized program with short, medium, and long-term goals.' },
        { icon: '🌟', title: 'Program start', desc: 'The child begins the program and the family receives ongoing guidance.' },
      ],
    },
    cta: { title: 'Is your child between 3 and 5 years old?', text: 'Aula Wawitas accepts children ages 3 to 5. Contact us to check availability and start the enrollment process.' },
  },
}

// ═══════════════════════════════ Pasos Firmes ═══════════════════════════════

const pasosFirmes = {
  es: {
    title: 'Pasos Firmes',
    hero: { badge: 'Apoyo psicopedagógico', subtitle: 'Intervención psicopedagógica especializada para niños y adolescentes con dificultades de aprendizaje: dislexia, disgrafía, discalculia, TDAH y bajo rendimiento escolar.', color: 'accent' },
    stats: [
      { icon: '📖', value: '6', label: 'dificultades atendidas' },
      { icon: '🎯', value: '4', label: 'modalidades de atención' },
      { icon: '🔬', value: '6', label: 'pasos de intervención' },
      { icon: '🏫', value: '✓', label: 'Coord. con escuelas' },
    ],
    section_1: {
      badge: 'Áreas de especialidad', title: 'Dificultades que Atendemos', layout: 'acordeón',
      subtitle: 'Cada dificultad de aprendizaje tiene características únicas. Evaluamos a cada niño de forma individual para diseñar la intervención más adecuada.',
      items: [
        { icon: '📖', color: 'secondary', title: 'Dislexia', tag: 'Lectura', desc: 'Dificultad persistente para leer con fluidez y precisión, no explicada por la inteligencia ni por falta de oportunidades educativas. Se trabaja con metodologías multisensoriales y estructuradas.' },
        { icon: '✏️', color: 'accent', title: 'Disgrafía', tag: 'Escritura', desc: 'Dificultad en la expresión escrita: caligrafía irregular, errores ortográficos frecuentes y problemas para organizar ideas en el papel. Trabajamos grafomotricidad y expresión escrita.' },
        { icon: '🔢', color: 'primary', title: 'Discalculia', tag: 'Matemáticas', desc: 'Dificultad para comprender conceptos numéricos, realizar cálculos y resolver problemas matemáticos acordes a la edad. Abordaje concreto-representativo-abstracto.' },
        { icon: '🎯', color: 'secondary', title: 'TDAH', tag: 'Atención', desc: 'Dificultades en la atención sostenida, organización, control de impulsos y regulación de la actividad motora. Estrategias para el aula y el hogar con enfoque en funciones ejecutivas.' },
        { icon: '⏱️', color: 'accent', title: 'Procesamiento lento', tag: 'Velocidad', desc: 'El niño comprende los contenidos pero necesita significativamente más tiempo para procesar información y completar tareas. Adaptaciones del entorno y estrategias de ritmo propio.' },
        { icon: '📚', color: 'primary', title: 'Bajo rendimiento escolar', tag: 'Rendimiento', desc: 'Bajo rendimiento no explicado por una condición específica. Requiere evaluación integral para identificar causas y diseñar estrategias personalizadas de apoyo académico.' },
      ],
    },
    section_2: {
      badge: 'Cómo trabajamos', title: 'Modalidades de Atención',
      subtitle: 'Ofrecemos cuatro modalidades de intervención que se complementan para dar una respuesta integral a cada familia.',
      tabs: [
        { icon: '📚', color: 'secondary', label: 'Primaria', desc: 'Apoyo psicopedagógico para estudiantes de educación primaria con dificultades de aprendizaje. Trabajamos en coordinación directa con los docentes escolares para garantizar coherencia entre el centro y la escuela, adaptando los contenidos curriculares al perfil de cada estudiante.', highlights: ['Coordinación con docentes', 'Adaptaciones curriculares', 'Refuerzo de lectoescritura', 'Estrategias matemáticas'] },
        { icon: '🎓', color: 'accent', label: 'Secundaria', desc: 'Intervención especializada para adolescentes en educación secundaria. Trabajamos organización del estudio, técnicas de aprendizaje efectivas, gestión del tiempo y estrategias para exámenes, acompañando al estudiante en las materias que le presentan mayor dificultad.', highlights: ['Técnicas de estudio', 'Organización y planificación', 'Estrategias para exámenes', 'Gestión del tiempo'] },
        { icon: '👨‍👩‍👧‍👦', color: 'primary', label: 'Terapia Grupal', desc: 'Sesiones grupales para familias que enfrentan desafíos similares. Un espacio de apoyo mutuo donde los padres aprenden estrategias concretas, comparten experiencias y fortalecen su rol como co-terapeutas en el hogar.', highlights: ['Red de apoyo entre familias', 'Estrategias para el hogar', 'Contención emocional', 'Recursos compartidos'] },
        { icon: '🧩', color: 'secondary', label: 'Terapia Individual', desc: 'Sesiones individuales intensivas con el terapeuta, diseñadas a medida del perfil de aprendizaje único de cada niño o adolescente. Mayor frecuencia de atención y seguimiento personalizado del progreso.', highlights: ['Plan de intervención único', 'Seguimiento personalizado', 'Mayor frecuencia de sesiones', 'Comunicación directa con familia'] },
      ],
    },
    enrollment: {
      badge: 'Nuestro proceso', title: '6 Pasos de Intervención',
      subtitle: 'Desde el primer contacto hasta la evolución continua, acompañamos a cada familia en todo el proceso.',
      steps: [
        { icon: '👂', title: 'Escuchar', desc: 'Entrevista con la familia para entender la historia del niño, sus fortalezas y expectativas.' },
        { icon: '🔬', title: 'Evaluar', desc: 'Evaluación neuropsicológica y psicopedagógica completa para identificar el perfil de aprendizaje.' },
        { icon: '📋', title: 'Diseñar', desc: 'Elaboración del plan de intervención con objetivos claros, medibles y alcanzables.' },
        { icon: '🧩', title: 'Intervenir', desc: 'Sesiones individuales o grupales con estrategias basadas en evidencia.' },
        { icon: '🔄', title: 'Coordinar', desc: 'Comunicación permanente con la escuela y la familia para garantizar coherencia.' },
        { icon: '📈', title: 'Evolucionar', desc: 'Reevaluación periódica de avances, ajuste de objetivos y celebración de logros.' },
      ],
    },
    cta: { title: '¿Tu hijo tiene dificultades en la escuela?', text: 'No esperes más. La intervención temprana marca la diferencia. Contáctanos y evaluamos a tu hijo gratuitamente.' },
  },
  en: {
    title: 'Pasos Firmes',
    hero: { badge: 'Psychopedagogical support', subtitle: 'Specialized psychopedagogical intervention for children and adolescents with learning difficulties: dyslexia, dysgraphia, dyscalculia, ADHD, and low school performance.', color: 'accent' },
    stats: [
      { icon: '📖', value: '6', label: 'difficulties addressed' },
      { icon: '🎯', value: '4', label: 'service modalities' },
      { icon: '🔬', value: '6', label: 'intervention steps' },
      { icon: '🏫', value: '✓', label: 'School coordination' },
    ],
    section_1: {
      badge: 'Areas of expertise', title: 'Difficulties We Address', layout: 'acordeón',
      subtitle: 'Each learning difficulty has unique characteristics. We evaluate each child individually to design the most appropriate intervention.',
      items: [
        { icon: '📖', color: 'secondary', title: 'Dyslexia', tag: 'Reading', desc: 'Persistent difficulty reading with fluency and accuracy, not explained by intelligence or lack of educational opportunity. Addressed with multisensory, structured methodologies.' },
        { icon: '✏️', color: 'accent', title: 'Dysgraphia', tag: 'Writing', desc: 'Difficulty in written expression: irregular handwriting, frequent spelling errors, and problems organizing ideas on paper. We work on graphomotricity and written expression.' },
        { icon: '🔢', color: 'primary', title: 'Dyscalculia', tag: 'Math', desc: 'Difficulty understanding numerical concepts, performing calculations, and solving age-appropriate math problems. Concrete-representational-abstract approach.' },
        { icon: '🎯', color: 'secondary', title: 'ADHD', tag: 'Attention', desc: 'Difficulties in sustained attention, organization, impulse control, and motor activity regulation. Classroom and home strategies focused on executive functions.' },
        { icon: '⏱️', color: 'accent', title: 'Slow processing', tag: 'Speed', desc: 'The child understands content but needs significantly more time to process information and complete tasks. Environment adaptations and self-paced strategies.' },
        { icon: '📚', color: 'primary', title: 'Low school performance', tag: 'Performance', desc: 'Low performance not explained by a specific condition. Requires comprehensive evaluation to identify causes and design personalized academic support strategies.' },
      ],
    },
    section_2: {
      badge: 'How we work', title: 'Service Modalities',
      subtitle: 'We offer four intervention modalities that complement each other to provide a comprehensive response to each family.',
      tabs: [
        { icon: '📚', color: 'secondary', label: 'Primary', desc: "Psychopedagogical support for primary school students with learning difficulties. We work in direct coordination with school teachers to ensure consistency between the center and school, adapting curricular content to each student's profile.", highlights: ['Teacher coordination', 'Curricular adaptations', 'Reading & writing reinforcement', 'Math strategies'] },
        { icon: '🎓', color: 'accent', label: 'Secondary', desc: 'Specialized intervention for secondary school adolescents. We work on study organization, effective learning techniques, time management, and exam strategies, supporting students in the subjects they find most challenging.', highlights: ['Study techniques', 'Organization and planning', 'Exam strategies', 'Time management'] },
        { icon: '👨‍👩‍👧‍👦', color: 'primary', label: 'Group Therapy', desc: 'Group sessions for families facing similar challenges. A mutual support space where parents learn concrete strategies, share experiences, and strengthen their role as co-therapists at home.', highlights: ['Family support network', 'Home strategies', 'Emotional containment', 'Shared resources'] },
        { icon: '🧩', color: 'secondary', label: 'Individual Therapy', desc: "Intensive individual sessions with the therapist, custom-designed for each child's or adolescent's unique learning profile. Higher frequency of attention and personalized progress tracking.", highlights: ['Unique intervention plan', 'Personalized follow-up', 'Higher session frequency', 'Direct family communication'] },
      ],
    },
    enrollment: {
      badge: 'Our process', title: '6 Intervention Steps',
      subtitle: 'From first contact to ongoing evolution, we accompany each family through the entire process.',
      steps: [
        { icon: '👂', title: 'Listen', desc: "Family interview to understand the child's history, strengths, and expectations." },
        { icon: '🔬', title: 'Evaluate', desc: 'Complete neuropsychological and psychopedagogical evaluation to identify the learning profile.' },
        { icon: '📋', title: 'Design', desc: 'Development of the intervention plan with clear, measurable, and achievable objectives.' },
        { icon: '🧩', title: 'Intervene', desc: 'Individual or group sessions with evidence-based strategies.' },
        { icon: '🔄', title: 'Coordinate', desc: 'Permanent communication with school and family to ensure consistency.' },
        { icon: '📈', title: 'Evolve', desc: 'Periodic reevaluation of progress, objective adjustment, and celebration of achievements.' },
      ],
    },
    cta: { title: 'Is your child struggling at school?', text: "Don't wait any longer. Early intervention makes the difference. Contact us and we'll evaluate your child free of charge." },
  },
}

for (const [slug, byLocale] of [
  ['mi-escuelita-down', miEscuelitaDown],
  ['aula-wawitas', aulaWawitas],
  ['pasos-firmes', pasosFirmes],
]) {
  for (const locale of ['es', 'en']) {
    writeProgram(slug, locale, byLocale[locale])
  }
}

console.log('✓ 3 programas escritos en content/programs/ (6 archivos, es+en)')
