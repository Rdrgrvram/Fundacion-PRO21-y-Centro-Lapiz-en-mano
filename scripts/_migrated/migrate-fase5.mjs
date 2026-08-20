import { mkdirSync, writeFileSync } from 'fs'
import path from 'path'
import { dump } from 'js-yaml'

const DIR = path.join(process.cwd(), 'content', 'settings')
mkdirSync(DIR, { recursive: true })

function write(name, data) {
  writeFileSync(path.join(DIR, `${name}.yml`), dump(data, { lineWidth: -1 }), 'utf-8')
  console.log(`✓ content/settings/${name}.yml escrito`)
}

// ═══════════════════════════════════ IMPACTO ═══════════════════════════════════

write('impact', {
  es: {
    hero: { badge: 'Impacto y transparencia', title_line1: 'Historias que', title_line2: 'transforman vidas', subtitle: 'Detrás de cada cifra hay un niño que encontró su espacio de inclusión. Detrás de cada reporte anual hay un compromiso inquebrantable con la transparencia.' },
    stats_section: { badge: 'Nuestras cifras', title: 'El impacto consolidado en números' },
    stats: [
      { icon: '👨‍👩‍👧', color: 'secondary', value: '70', suffix: '+', label: 'Familias acompañadas' },
      { icon: '📋', color: 'accent', value: '3', label: 'Programas activos' },
      { icon: '🏛️', color: 'secondary', value: '8', label: 'Años de experiencia' },
      { icon: '🩺', color: 'secondary', value: '10', label: 'Profesionales en el equipo' },
      { icon: '🧩', color: 'accent', value: '8', label: 'Áreas terapéuticas' },
      { icon: '📅', color: 'primary', value: '1000', suffix: '+', label: 'Sesiones al año' },
    ],
    testimonials_section: { badge: 'Voces de las familias', title: 'Lo que dicen de nosotros' },
    reports_section: { badge: 'Transparencia institucional', title: 'Rendición de cuentas anual', subtitle: 'La confianza se construye publicando informes de gestión claros para cooperantes, aliados y familias.' },
    reports: [
      { year: '2025', title: 'Informe anual de gestión 2025', desc: 'Resultados, cifras de atención, uso de recursos y proyección.' },
      { year: '2024', title: 'Informe anual de gestión 2024', desc: 'Segundo año de operaciones con tres programas activos.' },
      { year: '2023', title: 'Informe anual de gestión 2023', desc: 'Lanzamiento de Aula Wawitas y expansión de salas.' },
      { year: '2022', title: 'Informe anual de gestión 2022', desc: 'Constitución de Fundación PRO-21 y consolidación.' },
    ],
    reports_breakdown_title: '¿Qué incluyen nuestros informes?',
    reports_breakdown: [
      { icon: '👶', color: 'secondary', title: 'Niños atendidos', desc: 'Matrícula en cada programa e informes pedagógicos.' },
      { icon: '💰', color: 'primary', title: 'Uso de fondos', desc: 'Distribución porcentual por áreas y costo de becas.' },
      { icon: '📈', color: 'secondary', title: 'Avances terapéuticos', desc: 'Logros medidos a nivel psicomotor, fonoaudiológico y conductual.' },
      { icon: '🤝', color: 'secondary', title: 'Convenios firmados', desc: 'Nuevas alianzas nacionales y de cooperación.' },
    ],
    media_section: { badge: 'Impacto social en medios', title: 'Difusión en prensa y televisión' },
    media: [
      { outlet: 'Red Uno de Bolivia', type: 'Televisión', desc: 'Cobertura especial del incidente durante los conflictos en La Paz, visibilizando el centro.', year: '2026', color: 'accent' },
      { outlet: 'ATB Digital', type: 'Televisión', desc: 'Reportaje sobre los programas de inclusión educativa para niños con síndrome de Down.', year: '2026', color: 'secondary' },
      { outlet: 'Página Siete', type: 'Prensa escrita', desc: 'Artículo sobre la labor del Centro Lápiz en Mano y la importancia de la estimulación temprana.', year: '2025', color: 'secondary' },
      { outlet: 'Redes Internacionales', type: 'Digital', desc: 'Acompañamiento y notas de solidaridad internacional tras la difusión de prensa.', year: '2026', color: 'accent' },
    ],
    gallery_section: { badge: 'Galería del centro', title: 'Momentos que nos inspiran' },
    gallery_categories: ['Todos', 'Mi Escuelita', 'Aula Wawitas', 'Pasos Firmes', 'Eventos'],
    gallery: [
      { image: '/images/wawitas/learning-activity.png', alt: 'Niño realizando una actividad de aprendizaje en el aula' },
      { image: '/images/wawitas/outdoor-play.png', alt: 'Niños jugando al aire libre en el centro' },
      { image: '/images/wawitas/sensory-room.png', alt: 'Sala de estimulación sensorial del centro' },
      { image: '/images/wawitas/therapy-session.png', alt: 'Sesión de terapia individual con un niño' },
      { image: '/images/actividades/estimulacion-sensorial.jpg', alt: 'Actividad de estimulación sensorial' },
      { image: '/images/actividades/mercado-autonomia.jpg', alt: 'Actividad de autonomía tipo mercado' },
      { image: '/images/actividades/psicomotricidad-bolos.jpg', alt: 'Actividad de psicomotricidad con bolos' },
      { image: '/images/actividades/trazos-cognitivos.jpg', alt: 'Actividad de trazos y estimulación cognitiva' },
    ],
    gallery_note: '* Fotografías ilustrativas y reales de uso interno bajo consentimiento de tutoría legal.',
    cta: { title: '¿Quieres ser parte de esta transformación?', text: 'Cada boliviano donado, cada hora de voluntariado y cada alianza estratégica multiplica el impacto social, permitiéndonos acoger a más niños y niñas en lista de espera.' },
  },
  en: {
    hero: { badge: 'Impact & transparency', title_line1: 'Stories that', title_line2: 'transform lives', subtitle: 'Behind every number is a child who found their space of inclusion. Behind every annual report is an unwavering commitment to transparency.' },
    stats_section: { badge: 'Our metrics', title: 'Consolidated impact in numbers' },
    stats: [
      { icon: '👨‍👩‍👧', color: 'secondary', value: '70', suffix: '+', label: 'Families supported' },
      { icon: '📋', color: 'accent', value: '3', label: 'Active programs' },
      { icon: '🏛️', color: 'secondary', value: '8', label: 'Years of service' },
      { icon: '🩺', color: 'secondary', value: '10', label: 'Staff professionals' },
      { icon: '🧩', color: 'accent', value: '8', label: 'Therapeutic areas' },
      { icon: '📅', color: 'primary', value: '1000', suffix: '+', label: 'Sessions per year' },
    ],
    testimonials_section: { badge: 'Voices of families', title: 'What they say about us' },
    reports_section: { badge: 'Institutional Transparency', title: 'Annual Accountability', subtitle: 'Trust is built by publishing clear management reports for partners, allies, and families.' },
    reports: [
      { year: '2025', title: '2025 Annual Management Report', desc: 'Results, care figures, resources utilization, and projection.' },
      { year: '2024', title: '2024 Annual Management Report', desc: 'Second year of operations with three active programs.' },
      { year: '2023', title: '2023 Annual Management Report', desc: 'Launch of Aula Wawitas and sensory room expansion.' },
      { year: '2022', title: '2022 Annual Management Report', desc: 'Establishment of PRO-21 Foundation and consolidation.' },
    ],
    reports_breakdown_title: 'What do our reports include?',
    reports_breakdown: [
      { icon: '👶', color: 'secondary', title: 'Children served', desc: 'Enrollment in each program and pedagogical reports.' },
      { icon: '💰', color: 'primary', title: 'Use of funds', desc: 'Percentage distribution by areas and cost of scholarships.' },
      { icon: '📈', color: 'secondary', title: 'Therapeutic progress', desc: 'Achievements measured at psychomotor, speech, and behavior levels.' },
      { icon: '🤝', color: 'secondary', title: 'Signed agreements', desc: 'New national and cooperation alliances.' },
    ],
    media_section: { badge: 'Outreach in media', title: 'Broadcasting in press and television' },
    media: [
      { outlet: 'Red Uno de Bolivia', type: 'Television', desc: 'Special coverage of the incident during conflicts in La Paz, making the center visible.', year: '2026', color: 'accent' },
      { outlet: 'ATB Digital', type: 'Television', desc: 'Report on educational inclusion programs for children with Down syndrome in Bolivia.', year: '2026', color: 'secondary' },
      { outlet: 'Página Siete', type: 'Press outlet', desc: 'Article on the work of Lápiz en Mano Center and the importance of early stimulation.', year: '2025', color: 'secondary' },
      { outlet: 'Redes Internacionales', type: 'Digital media', desc: 'Accompaniment and international solidarity notes after press releases.', year: '2026', color: 'accent' },
    ],
    gallery_section: { badge: 'Center Gallery', title: 'Moments that inspire us' },
    gallery_categories: ['All', 'Mi Escuelita', 'Aula Wawitas', 'Pasos Firmes', 'Events'],
    gallery: [
      { image: '/images/wawitas/learning-activity.png', alt: 'Child doing a learning activity in the classroom' },
      { image: '/images/wawitas/outdoor-play.png', alt: 'Children playing outdoors at the center' },
      { image: '/images/wawitas/sensory-room.png', alt: "Center's sensory stimulation room" },
      { image: '/images/wawitas/therapy-session.png', alt: 'Individual therapy session with a child' },
      { image: '/images/actividades/estimulacion-sensorial.jpg', alt: 'Sensory stimulation activity' },
      { image: '/images/actividades/mercado-autonomia.jpg', alt: 'Market-style autonomy activity' },
      { image: '/images/actividades/psicomotricidad-bolos.jpg', alt: 'Psychomotor activity with bowling pins' },
      { image: '/images/actividades/trazos-cognitivos.jpg', alt: 'Cognitive stimulation drawing activity' },
    ],
    gallery_note: '* Illustrative and real photos of internal use under consent of legal guardianship.',
    cta: { title: 'Want to be part of this transformation?', text: 'Every Bolivian Peso donated, every hour of volunteering, and every strategic alliance multiplies the social impact, allowing us to welcome more children on the waiting list.' },
  },
})

// ═══════════════════════════════════ COLABORA ═══════════════════════════════════

write('collaborate', {
  es: {
    hero: { badge: 'Colabora con nosotros', title_line1: 'Tu apoyo', title_line2: 'transforma vidas', subtitle: 'Existen muchas formas de ser parte de este camino inclusivo. Aportando una donación, brindando voluntariado o firmando una alianza corporativa, estás sembrando esperanza en Bolivia.' },
    hero_highlights: [
      { icon: '👨‍👩‍👧', value: '100+', label: 'Familias que acompañar' },
      { icon: '🩺', value: '20+', label: 'Profesionales comprometidos' },
      { icon: '📋', value: '3', label: 'Programas especializados' },
      { icon: '💚', value: 'Bs 0', label: 'Costo para familias con beca' },
    ],
    donation_section: { badge: 'Donaciones con impacto', title: 'Elige cómo quieres colaborar', subtitle: 'Cada aporte se destina al equipamiento de salas multisensoriales, insumos escolares y subvención de becas familiares.' },
    donation_tiers: [
      { amount: 'Bs 100', usd: '≈ $14', label: 'Semilla', icon: '🌱', color: 'secondary', impact: 'Cubre materiales terapéuticos para un niño durante un mes.', items: ['Materiales de estimulación', 'Fichas psicopedagógicas', 'Insumos terapéuticos'] },
      { amount: 'Bs 300', usd: '≈ $43', label: 'Acompañante', icon: '💚', color: 'secondary', impact: 'Financia 2 sesiones de terapia especializada.', items: ['1 sesión de fisioterapia', '1 sesión de lenguaje', 'Evaluación de avances'], featured: true },
      { amount: 'Bs 500', usd: '≈ $72', label: 'Guardián', icon: '⭐', color: 'primary', impact: 'Cubre un mes completo de atención para una familia con beca.', items: ['Plan terapéutico mensual', 'Orientación familiar', 'Materiales + sesiones'] },
      { amount: 'Libre', label: 'A tu medida', icon: '💛', color: 'accent', impact: 'Elige el monto que puedas. Todo suma y todo cambia vidas.', items: ['Cualquier monto ayuda', 'Recibo de donación', 'Impacto verificable'] },
    ],
    donation_bank: { bank: 'Banco Sol', account: '2633243-000-001', holder: 'Monica Medina Rosales', note: 'La cuenta se actualizará una vez concluido el trámite institucional.' },
    payment_methods: [
      { icon: '🏦', title: 'Transferencia bancaria', lines: [] },
      { icon: '📱', title: 'QR de pago directo', lines: ['Escanea desde tu app bancaria.', 'Compatible con Simple QR en Bolivia.'] },
      { icon: '🌐', title: 'Donación internacional', lines: ['PayPal o transferencia directa.', 'Escríbenos para recibir los códigos Swift/IBAN.'] },
    ],
    payment_note: 'El 100% de tu donación se destina de forma directa y transparente a los programas del centro. Emitimos recibos oficiales de donación.',
    volunteer_section: { badge: 'Voluntariado con propósito', title: 'Comparte tu talento y haz la diferencia', subtitle: 'Buscamos profesionales de la salud, pedagogos y personas motivadas que deseen certificar horas de Servicio Social.' },
    volunteer_areas: [
      { icon: '🩺', title: 'Salud y terapia', desc: 'Fisioterapia, psicología, fonoaudiología, psicomotricidad, nutrición.', color: 'secondary' },
      { icon: '📖', title: 'Educación y tutorías', desc: 'Apoyo escolar, adaptaciones curriculares, psicopedagogía, talleres.', color: 'secondary' },
      { icon: '🎨', title: 'Arte y recreación', desc: 'Música, pintura, teatro, expresión corporal, deportes adaptados.', color: 'accent' },
      { icon: '💻', title: 'Tecnología y diseño', desc: 'Desarrollo web, redes sociales, diseño gráfico, edición multimedia.', color: 'accent' },
      { icon: '📋', title: 'Gestión y eventos', desc: 'Planificación, captación de fondos, logística de talleres, campañas.', color: 'primary' },
      { icon: '🌍', title: 'Trabajo comunitario', desc: 'Trabajo social, orientación legal, visitas domiciliarias, difusión.', color: 'secondary' },
    ],
    volunteer_perks: [
      { icon: '📅', text: 'Horarios adaptados a tu disponibilidad' },
      { icon: '🎓', text: 'Inducción y capacitación metodológica inicial' },
      { icon: '📋', text: 'Certificado oficial de horas voluntarias/prácticas' },
      { icon: '🌍', text: 'Acreditación válida para servicio social universitario' },
    ],
    volunteer_testimonial: { quote: 'Llegué al Centro como practicante de fonoaudiología y decidí quedarme como voluntaria. Ver cómo un niño pronuncia sus primeras palabras es el regalo más grande de mi vida profesional.', role: 'Terapia de lenguaje' },
    alliances_section: { badge: 'Alianzas de valor', title: 'Trabajemos juntos por la inclusión', subtitle: 'Construimos puentes con empresas, universidades, ONGs y medios para potenciar el impacto en la comunidad boliviana.' },
    partner_types: [
      { icon: '🏢', title: 'Empresas comprometidas', color: 'secondary', desc: 'RSE, auspicios, donaciones corporativas con impacto social verificado.', benefits: ['Recibo oficial de donación', 'Logotipo en sitio web', 'Informes semestrales de impacto'] },
      { icon: '🎓', title: 'Universidades y Colegios', color: 'accent', desc: 'Prácticas profesionales, voluntariado estudiantil e investigación.', benefits: ['Convenios marco certificados', 'Campos de práctica guiados', 'Acceso a datos de investigación'] },
      { icon: '🌍', title: 'Cooperación Internacional', color: 'secondary', desc: 'Proyectos conjuntos de desarrollo y financiamiento de equipamiento.', benefits: ['Auditorías de transparencia', 'Cumplimiento de objetivos ODS', 'Reportes técnicos de ejecución'] },
      { icon: '📺', title: 'Medios y difusores', color: 'accent', desc: 'Difusión de campañas, reportajes de sensibilización y eventos.', benefits: ['Contenido de prensa exclusivo', 'Entrevistas con especialistas', 'Menciones de agradecimiento'] },
    ],
    allies_title: 'Aliados que ya nos respaldan',
    allies_subtitle: 'Organizaciones que confían activamente en nuestro impacto social',
    allies: [
      { name: 'Universidad Católica Boliviana', type: 'UCB La Paz', icon: '🎓' },
      { name: 'Red Uno de Bolivia', type: 'Televisión', icon: '📺' },
      { name: 'ATB Red Nacional', type: 'Televisión', icon: '🎬' },
      { name: 'Página Siete', type: 'Prensa', icon: '📰' },
    ],
    cta: { title: '¿Tienes dudas sobre cómo apoyar?', text: 'Escríbenos directamente y te explicamos detalladamente cómo tu aporte se traduce en materiales de estimulación, sesiones terapéuticas o becas de estudio.' },
  },
  en: {
    hero: { badge: 'Support us', title_line1: 'Your support', title_line2: 'transforms lives', subtitle: 'There are many ways to be part of this inclusive path. By providing a donation, volunteering, or signing a corporate alliance, you are sowing hope in Bolivia.' },
    hero_highlights: [
      { icon: '👨‍👩‍👧', value: '100+', label: 'Families to support' },
      { icon: '🩺', value: '20+', label: 'Staff professionals' },
      { icon: '📋', value: '3', label: 'Specialized programs' },
      { icon: '💚', value: 'Bs 0', label: 'Cost for scholarship families' },
    ],
    donation_section: { badge: 'Donations with impact', title: 'Choose how you wish to support', subtitle: 'Every contribution goes to equipping multisensory rooms, school supplies, and subsidizing family scholarships.' },
    donation_tiers: [
      { amount: 'Bs 100', usd: '≈ $14', label: 'Seed', icon: '🌱', color: 'secondary', impact: 'Covers therapeutic materials for one child for a month.', items: ['Stimulation materials', 'Psychopedagogical sheets', 'Therapeutic supplies'] },
      { amount: 'Bs 300', usd: '≈ $43', label: 'Companion', icon: '💚', color: 'secondary', impact: 'Finances 2 specialized therapy sessions.', items: ['1 physical therapy session', '1 speech therapy session', 'Progress evaluation'], featured: true },
      { amount: 'Bs 500', usd: '≈ $72', label: 'Guardian', icon: '⭐', color: 'primary', impact: 'Covers one full month of care for a family on scholarship.', items: ['Monthly therapeutic plan', 'Family guidance', 'Materials + sessions'] },
      { amount: 'Custom', label: 'To your measure', icon: '💛', color: 'accent', impact: 'Choose the amount you can. Everything counts and transforms lives.', items: ['Any amount helps', 'Official donation receipt', 'Verifiable impact'] },
    ],
    donation_bank: { bank: 'Banco Sol', account: '2633243-000-001', holder: 'Monica Medina Rosales', note: 'The account will be updated once the institutional process is completed.' },
    payment_methods: [
      { icon: '🏦', title: 'Bank transfer', lines: [] },
      { icon: '📱', title: 'Direct QR payment', lines: ['Scan from your banking app.', 'Compatible with Simple QR in Bolivia.'] },
      { icon: '🌐', title: 'International donation', lines: ['PayPal or direct wire transfer.', 'Contact us to receive Swift/IBAN codes.'] },
    ],
    payment_note: '100% of your donation is designated directly and transparently to center programs. We issue official donation receipts.',
    volunteer_section: { badge: 'Volunteering with purpose', title: 'Share your talent and make a difference', subtitle: 'We look for health professionals, educators, and motivated people wishing to certify Social Service hours.' },
    volunteer_areas: [
      { icon: '🩺', title: 'Health & therapy', desc: 'Physiotherapy, psychology, speech therapy, psychomotor, nutrition.', color: 'secondary' },
      { icon: '📖', title: 'Education & tutoring', desc: 'School support, curricular adaptations, psychopedagogy, workshops.', color: 'secondary' },
      { icon: '🎨', title: 'Art & recreation', desc: 'Music, painting, theater, body expression, adapted sports.', color: 'accent' },
      { icon: '💻', title: 'Tech & design', desc: 'Web dev, social media, graphic design, multimedia editing.', color: 'accent' },
      { icon: '📋', title: 'Management & events', desc: 'Planning, fundraising, workshop logistics, campaigns.', color: 'primary' },
      { icon: '🌍', title: 'Community work', desc: 'Social work, legal guidance, home visits, outreach.', color: 'secondary' },
    ],
    volunteer_perks: [
      { icon: '📅', text: 'Schedules adapted to your availability' },
      { icon: '🎓', text: 'Initial induction and methodological training' },
      { icon: '📋', text: 'Official certificate of volunteer/practice hours' },
      { icon: '🌍', text: 'Valid accreditation for university social service' },
    ],
    volunteer_testimonial: { quote: 'I came to the Center as a speech therapy intern and decided to stay as a volunteer. Seeing how a child pronounces their first words is the greatest gift of my professional life.', role: 'Speech therapy' },
    alliances_section: { badge: 'Valuable Alliances', title: "Let's work together for inclusion", subtitle: 'We build bridges with corporations, universities, NGOs, and media to boost impact in the Bolivian community.' },
    partner_types: [
      { icon: '🏢', title: 'Committed Corporations', color: 'secondary', desc: 'CSR, sponsorship, corporate donations with verified social impact.', benefits: ['Official donation receipt', 'Logo on the website', 'Bi-annual impact reports'] },
      { icon: '🎓', title: 'Universities & Schools', color: 'accent', desc: 'Professional internships, student volunteering, and research.', benefits: ['Certified frameworks', 'Guided practice fields', 'Access to research data'] },
      { icon: '🌍', title: 'International Aid', color: 'secondary', desc: 'Joint development projects and equipment financing.', benefits: ['Transparency audits', 'SDG alignment compliance', 'Technical execution reports'] },
      { icon: '📺', title: 'Media & Outreach', color: 'accent', desc: 'Campaign dissemination, awareness reports, and events.', benefits: ['Exclusive press content', 'Interviews with specialists', 'Thank-you mentions'] },
    ],
    allies_title: 'Allies already supporting us',
    allies_subtitle: 'Organizations actively trusting our social impact',
    allies: [
      { name: 'Universidad Católica Boliviana', type: 'UCB La Paz', icon: '🎓' },
      { name: 'Red Uno de Bolivia', type: 'Television', icon: '📺' },
      { name: 'ATB Red Nacional', type: 'Television', icon: '🎬' },
      { name: 'Página Siete', type: 'Press', icon: '📰' },
    ],
    cta: { title: 'Questions about how to support?', text: 'Write to us directly and we will explain in detail how your support translates into stimulation materials, therapy sessions, or study scholarships.' },
  },
})

// ═══════════════════════════════════ FAMILIAS ═══════════════════════════════════

write('families', {
  es: {
    hero: { badge: 'Para las familias', title_line1: 'No caminan', title_line2: 'solos', subtitle: 'Sabemos que detrás de cada niño que atendemos hay una familia que también necesita acompañamiento, formación y contención. Este espacio es para ustedes.' },
    welcome_letter: {
      title: 'Querida familia:',
      text: 'Recibir un diagnóstico es un momento de gran sensibilidad que cambia la vida. Sentir temor, dudas o tristeza es completamente natural — y no significa que debas recorrer este camino en soledad. Estamos aquí para acompañarte en cada paso: con información profesional clara, apoyo psicológico constante y una red de familias que entienden exactamente tu vivencia.',
      signature: '— El equipo de la Fundación PRO-21 y Centro Lápiz en Mano',
    },
    sessions_section: { badge: 'Sesiones virtuales gratuitas', title: 'Orientación profesional desde casa', subtitle: 'Sesiones sin costo con especialistas del centro, diseñadas para responder tus inquietudes vivenciales y familiares.' },
    virtual_sessions: [
      { title: 'Orientación psicológica', icon: '🧠', desc: 'Sesiones individuales con psicólogos para abordar el impacto emocional del diagnóstico, manejar la ansiedad, el duelo y la culpa, y fortalecer la salud mental de los padres.', freq: 'Semanal', duration: '45 min', color: 'accent' },
      { title: 'Trabajo social', icon: '🤝', desc: 'Orientación sobre derechos, acceso a servicios públicos, trámites de discapacidad, becas educativas y redes de apoyo institucional disponibles en Bolivia.', freq: 'Quincenal', duration: '60 min', color: 'secondary' },
      { title: 'Charlas temáticas', icon: '🎓', desc: 'Talleres formativos sobre temas como estimulación en casa, manejo de conducta, alimentación, sexualidad, autonomía y transición a la vida adulta.', freq: 'Mensual', duration: '90 min', color: 'accent' },
      { title: 'Interconsulta con especialistas', icon: '🩺', desc: 'Sesiones donde los padres pueden hacer preguntas directas al fisioterapeuta, fonoaudiólogo o terapeuta conductual de su hijo sobre el progreso y las estrategias.', freq: 'Mensual', duration: '30 min', color: 'secondary' },
    ],
    sessions_note: '100% gratuitas. No requieres estar inscrito en programas presenciales para asistir.',
    network_section: { badge: 'Red de apoyo familiar', title: 'Nadie comprende mejor que quien lo vive', subtitle: 'Comunidad de padres y madres que comparten experiencias cotidianas y celebran el desarrollo pleno de sus hijos.' },
    support_network: [
      { title: 'Encuentros presenciales', icon: '☕', desc: 'Reuniones mensuales en el Centro Lápiz en Mano donde las familias comparten experiencias y se apoyan mutuamente en un espacio seguro.', color: 'primary' },
      { title: 'Grupo de WhatsApp', icon: '📱', desc: 'Comunidad activa de padres y madres donde compartir recursos, resolver dudas cotidianas y coordinar actividades.', color: 'secondary' },
      { title: 'Padres mentores', icon: '💛', desc: 'Familias con más tiempo en la fundación acompañan a las familias nuevas durante sus primeros meses, compartiendo su experiencia.', color: 'accent' },
      { title: 'Eventos familiares', icon: '🎉', desc: 'Celebraciones, paseos inclusivos, talleres recreativos y actividades donde los niños y sus familias disfrutan juntos.', color: 'accent' },
    ],
    guides_section: { badge: 'Material educativo', title: 'Guías y recursos descargables', subtitle: 'Material elaborado por nuestros profesionales para guiar las actividades formativas, sensoriales y de rutina diaria en casa.' },
    guides: [
      { title: 'Guía de estimulación temprana en casa', icon: '👶', desc: 'Actividades prácticas organizadas por edad para estimular el desarrollo de tu hijo desde el hogar.', pages: '24 págs.', program: 'Mi Escuelita Down', color: 'secondary' },
      { title: 'Estrategias para el manejo de conducta', icon: '🧩', desc: 'Técnicas basadas en evidencia para abordar conductas desafiantes con paciencia y efectividad.', pages: '18 págs.', program: 'Aula Wawitas', color: 'accent' },
      { title: 'Cómo apoyar las tareas escolares', icon: '📚', desc: 'Guía práctica para padres de niños con dificultades de aprendizaje: organización y motivación.', pages: '20 págs.', program: 'Pasos Firmes', color: 'secondary' },
      { title: 'Derechos de la discapacidad en Bolivia', icon: '⚖️', desc: 'Resumen de la normativa boliviana, trámites de certificación, acceso a salud, educación y beneficios.', pages: '16 págs.', program: 'Todos los programas', color: 'accent' },
      { title: 'Pictogramas para la rutina diaria', icon: '🖼️', desc: 'Set descargable de pictogramas para estructurar rutinas visuales: higiene, alimentación y ocio.', pages: '12 láminas', program: 'Aula Wawitas', color: 'secondary' },
      { title: 'Guía de alimentación y nutrición', icon: '🥗', desc: 'Recomendaciones nutricionales y manejo de selectividad alimentaria para niños con TEA.', pages: '22 págs.', program: 'Aula Wawitas', color: 'primary' },
    ],
    guides_note: 'El material se actualiza de acuerdo a las recomendaciones curriculares del Ministerio de Educación de Bolivia.',
    faq_section: { badge: 'Preguntas frecuentes', title: 'Respuestas a las dudas más comunes', subtitle: 'Si tu consulta no se encuentra resuelta, escríbenos directamente y te ayudaremos.' },
    faqs: [
      { q: '¿Necesito un diagnóstico para inscribir a mi hijo?', a: 'No. Si observas señales que te preocupan o tu hijo tiene dificultades en algún área del desarrollo o el aprendizaje, puedes consultarnos directamente. Nuestro equipo realizará una evaluación integral como primer paso.' },
      { q: '¿Cuánto cuesta el programa?', a: 'Cada programa tiene una cuota mensual accesible. Para familias con dificultades económicas, contamos con un sistema de becas parciales y totales financiadas por donaciones. Ningún niño deja de recibir atención por razones económicas.' },
      { q: '¿Con qué frecuencia son las terapias?', a: 'Depende del plan de intervención de cada niño. Generalmente las sesiones son de 2 a 4 veces por semana, combinando distintas áreas terapéuticas. El plan se diseña junto con la familia.' },
      { q: '¿Mi hijo puede asistir a una escuela regular al mismo tiempo?', a: 'Sí, y lo promovemos activamente. Los niños de Mi Escuelita Inclusiva Down asisten tanto al Centro Lápiz en Mano como a su unidad educativa de origen. Nuestro enfoque es la inclusión educativa, no la segregación.' },
      { q: '¿Ofrecen atención en horarios flexibles?', a: 'Sí. Entendemos que muchas familias trabajan. Coordinamos los horarios de las sesiones terapéuticas para adaptarnos a las necesidades de cada familia, incluyendo opciones en la tarde.' },
      { q: '¿Qué pasa si vivimos fuera de La Paz?', a: 'Ofrecemos sesiones virtuales gratuitas de orientación para familias de cualquier parte de Bolivia. Para la atención presencial, recibimos familias que puedan desplazarse a nuestro centro en La Paz.' },
      { q: '¿Cómo puedo saber cuál programa es el adecuado para mi hijo?', a: 'Agenda una evaluación inicial gratuita. Nuestro equipo multidisciplinario evaluará a tu hijo y te recomendará el programa y las áreas de intervención más adecuadas para sus necesidades.' },
      { q: '¿Los padres participan en las terapias?', a: 'Sí. Consideramos a la familia como parte fundamental del proceso. Los padres participan en sesiones de orientación, reciben estrategias para el hogar, y coordinan activamente con los terapeutas.' },
    ],
    cta: { title: '¿Necesitas orientación para tu familia?', text: 'Si acabas de recibir un diagnóstico, si tienes dudas sobre el desarrollo de tu hijo, o si simplemente necesitas chatear con un profesional de contención — estamos aquí.', note: 'La primera consulta de orientación familiar es gratuita y sin compromisos.' },
  },
  en: {
    hero: { badge: 'For families', title_line1: 'You do not walk', title_line2: 'alone', subtitle: 'We know that behind every child we support there is a family that also needs guidance, training, and emotional support. This space is for you.' },
    welcome_letter: {
      title: 'Dear family:',
      text: 'Receiving a diagnosis is a highly sensitive, life-changing moment. Feeling fear, doubts, or sadness is completely natural — and it does not mean you have to walk this path alone. We are here to support you at every step: with clear professional information, constant psychological support, and a network of families who understand exactly what you are experiencing.',
      signature: '— The team of PRO-21 Foundation and Lápiz en Mano Center',
    },
    sessions_section: { badge: 'Free virtual sessions', title: 'Professional guidance from home', subtitle: 'Cost-free sessions with center specialists, designed to answer your everyday family concerns.' },
    virtual_sessions: [
      { title: 'Psychological orientation', icon: '🧠', desc: "Individual sessions with psychologists to address the emotional impact of diagnosis, manage anxiety, grief, and guilt, and strengthen parents' mental health.", freq: 'Weekly', duration: '45 min', color: 'accent' },
      { title: 'Social work', icon: '🤝', desc: 'Orientation on rights, access to public services, disability certificate procedures, educational scholarships, and institutional networks in Bolivia.', freq: 'Fortnightly', duration: '60 min', color: 'secondary' },
      { title: 'Thematic talks', icon: '🎓', desc: 'Training workshops on topics such as stimulation at home, behavior management, nutrition, sexuality, autonomy, and transition to adult life.', freq: 'Monthly', duration: '90 min', color: 'accent' },
      { title: 'Interconsultation with specialists', icon: '🩺', desc: "Sessions where parents can ask direct questions to their child's physical therapist, speech therapist, or behavioral therapist about progress.", freq: 'Monthly', duration: '30 min', color: 'secondary' },
    ],
    sessions_note: '100% free. You do not need to be enrolled in in-person programs to attend.',
    network_section: { badge: 'Family support network', title: 'No one understands better than those who live it', subtitle: "Community of parents sharing daily experiences and celebrating the full development of their children." },
    support_network: [
      { title: 'In-person meetings', icon: '☕', desc: 'Monthly meetings at the Lápiz en Mano Center where families share experiences and support each other in a safe space.', color: 'primary' },
      { title: 'WhatsApp Group', icon: '📱', desc: 'Active community of parents to share resources, solve daily doubts, and coordinate activities.', color: 'secondary' },
      { title: 'Mentor Parents', icon: '💛', desc: 'Families with more time in the foundation accompany new families during their first months, sharing their experience.', color: 'accent' },
      { title: 'Family events', icon: '🎉', desc: 'Celebrations, inclusive outings, recreational workshops, and activities where children and families enjoy together.', color: 'accent' },
    ],
    guides_section: { badge: 'Educational material', title: 'Downloadable Guides & Resources', subtitle: 'Material prepared by our professionals to guide educational, sensory, and daily routine activities at home.' },
    guides: [
      { title: 'Early stimulation guide at home', icon: '👶', desc: "Practical activities organized by age to stimulate your child's development from home.", pages: '24 pages', program: 'Mi Escuelita Down', color: 'secondary' },
      { title: 'Behavior management strategies', icon: '🧩', desc: 'Evidence-based techniques to address challenging behaviors with patience and effectiveness.', pages: '18 pages', program: 'Aula Wawitas', color: 'accent' },
      { title: 'How to support school homework', icon: '📚', desc: 'Practical guide for parents of children with learning difficulties: organization and motivation.', pages: '20 pages', program: 'Pasos Firmes', color: 'secondary' },
      { title: 'Disability rights in Bolivia', icon: '⚖️', desc: 'Summary of Bolivian regulations, certification procedures, access to health, education, and benefits.', pages: '16 pages', program: 'All programs', color: 'accent' },
      { title: 'Pictograms for daily routines', icon: '🖼️', desc: 'Downloadable set of pictograms to structure visual routines: hygiene, eating, and leisure.', pages: '12 sheets', program: 'Aula Wawitas', color: 'secondary' },
      { title: 'Nutrition and feeding guide', icon: '🥗', desc: 'Nutritional recommendations and food selectivity management for children with ASD.', pages: '22 pages', program: 'Aula Wawitas', color: 'primary' },
    ],
    guides_note: 'The material is updated in accordance with the educational curriculum of the Ministry of Education of Bolivia.',
    faq_section: { badge: 'Frequently asked questions', title: 'Answers to the most common doubts', subtitle: 'If your inquiry is not resolved here, message us directly and we will help.' },
    faqs: [
      { q: 'Do I need a diagnosis to enroll my child?', a: 'No. If you notice concerning signs or your child has difficulties in any area of development or learning, you can consult us directly. Our team will perform a comprehensive evaluation.' },
      { q: 'How much does the program cost?', a: 'Each program has an affordable monthly fee. For families with economic difficulties, we have a system of partial and full scholarships funded by donations. No child is left without care due to economic reasons.' },
      { q: 'How often are the therapies?', a: "It depends on each child's intervention plan. Generally, sessions are 2 to 4 times a week, combining different therapeutic areas. The plan is designed together with the family." },
      { q: 'Can my child attend a regular school at the same time?', a: 'Yes, and we actively promote it. Children from Mi Escuelita Down attend both the Lápiz en Mano Center and their school of origin. Our focus is educational inclusion, not segregation.' },
      { q: 'Do you offer flexible hours?', a: "Yes. We understand that many families work. We coordinate therapeutic sessions to adapt to each family's needs, including afternoon options." },
      { q: 'What if we live outside La Paz?', a: 'We offer free virtual guidance sessions for families from any part of Bolivia. For in-person care, we receive families who can travel to our center in La Paz.' },
      { q: 'How can I know which program is right for my child?', a: 'Schedule a free initial evaluation. Our multidisciplinary team will evaluate your child and recommend the most suitable program and intervention areas.' },
      { q: 'Do parents participate in the therapies?', a: 'Yes. We consider the family as a fundamental part of the process. Parents participate in orientation sessions, receive home strategies, and actively coordinate with therapists.' },
    ],
    cta: { title: 'Need guidance for your family?', text: 'If you have just received a diagnosis, if you have doubts about your child\'s development, or if you simply need to chat with a support professional — we are here.', note: 'The first family orientation consultation is free and with no commitments.' },
  },
})

// ═══════════════════════════════════ CONTACTO ═══════════════════════════════════

write('contact_page', {
  es: {
    hero: { badge: 'Canales de comunicación', title_line1: 'Estamos a un mensaje de', title_line2: 'distancia', subtitle: 'Ya sea que busques inscribir a tu hijo, realizar prácticas profesionales, proponer una alianza o hacernos llegar tus dudas, estamos listos para escucharte.' },
    reasons: [
      { label: 'Quiero inscribir a mi hijo/a', icon: '🌟', color: 'secondary' },
      { label: 'Solicitar una evaluación', icon: '🔍', color: 'accent' },
      { label: 'Ser voluntario/a', icon: '🙌', color: 'secondary' },
      { label: 'Alianza institucional', icon: '🤝', color: 'accent' },
      { label: 'Donación o patrocinio', icon: '💛', color: 'primary' },
      { label: 'Prensa o medios', icon: '📰', color: 'secondary' },
      { label: 'Otro motivo', icon: '💬', color: 'neutral' },
    ],
    form_section: { title: 'Envíanos un mensaje', subtitle: 'Completa los siguientes datos y nuestro equipo te responderá en menos de 24 horas hábiles.' },
    map_card: { title: 'Centro Lápiz en Mano', subtitle: 'La Paz, Bolivia' },
    hours_title: 'Horarios de atención',
    hours: [
      { day: 'Lunes a viernes', time: '8:00 – 12:00 / 14:00 – 18:00', active: true },
      { day: 'Sábados', time: '9:00 – 12:00 (con cita)', active: true },
      { day: 'Domingos y feriados', time: 'Cerrado', active: false },
    ],
    social_title: 'Presencia digital',
    faq_section: { badge: 'Preguntas y respuestas', title: 'Preguntas frecuentes rápidas' },
    faqs: [
      { q: '¿Cómo inscribo a mi hijo?', a: 'Agenda una evaluación inicial de diagnóstico escribiendo a nuestro WhatsApp. Nuestro equipo multidisciplinario sugerirá el programa terapéutico o escolar adecuado.', icon: '🌟', color: 'secondary' },
      { q: '¿Tiene costo la atención?', a: 'Cada programa cuenta con cuotas mensuales solidarias. Si la familia no puede cubrirlas, contamos con becas parciales y completas. Ningún niño queda sin atención por motivos económicos.', icon: '💰', color: 'primary' },
      { q: '¿Se requiere diagnóstico previo?', a: 'No es necesario. Puedes consultarnos ante cualquier señal de alerta en el desarrollo, comunicación o conducta de tu hijo. Nosotros realizamos la evaluación correspondiente.', icon: '📋', color: 'secondary' },
      { q: '¿Atienden fuera de La Paz?', a: 'La atención terapéutica y escolar presencial es en La Paz. Sin embargo, ofrecemos orientación familiar y capacitaciones virtuales para todo el país.', icon: '🌎', color: 'accent' },
    ],
    whatsapp_cta: { title: '¿Prefieres una respuesta inmediata?', text: 'Escríbenos directamente por WhatsApp y recibirás atención personalizada en menos de 2 horas hábiles. Sin esperas.' },
    closing_quote: { text: 'Creemos que el síndrome de Down no es una barrera, sino una manera diferente y valiosa de aprender, crecer y desarrollar todo su potencial.', attribution: 'Fundación PRO-21 & Centro Lápiz en Mano' },
  },
  en: {
    hero: { badge: 'Communication channels', title_line1: 'We are just a message', title_line2: 'away', subtitle: 'Whether you want to enroll your child, complete professional practice, propose an alliance, or ask questions, we are ready to listen.' },
    reasons: [
      { label: 'I want to enroll my child', icon: '🌟', color: 'secondary' },
      { label: 'Request an evaluation', icon: '🔍', color: 'accent' },
      { label: 'Become a volunteer', icon: '🙌', color: 'secondary' },
      { label: 'Institutional alliance', icon: '🤝', color: 'accent' },
      { label: 'Donation or sponsorship', icon: '💛', color: 'primary' },
      { label: 'Press or media', icon: '📰', color: 'secondary' },
      { label: 'Other reason', icon: '💬', color: 'neutral' },
    ],
    form_section: { title: 'Send us a message', subtitle: 'Complete the following fields and our team will respond within 24 working hours.' },
    map_card: { title: 'Lápiz en Mano Center', subtitle: 'La Paz, Bolivia' },
    hours_title: 'Opening Hours',
    hours: [
      { day: 'Monday to Friday', time: '8:00 – 12:00 / 14:00 – 18:00', active: true },
      { day: 'Saturdays', time: '9:00 – 12:00 (by appt)', active: true },
      { day: 'Sundays & holidays', time: 'Closed', active: false },
    ],
    social_title: 'Digital Presence',
    faq_section: { badge: 'Questions and answers', title: 'Quick Frequently Asked Questions' },
    faqs: [
      { q: 'How do I enroll my child?', a: 'Schedule an initial diagnostic evaluation by messaging our WhatsApp. Our team will suggest the appropriate therapeutic or school program.', icon: '🌟', color: 'secondary' },
      { q: 'Is there a cost for care?', a: 'Each program has supportive monthly fees. If a family cannot cover them, we offer partial and full scholarships. No child is left without care due to economic reasons.', icon: '💰', color: 'primary' },
      { q: 'Is a prior diagnosis required?', a: 'It is not necessary. You can consult us for any developmental, communication, or behavioral warning sign in your child. We perform the evaluation.', icon: '📋', color: 'secondary' },
      { q: 'Do you serve outside La Paz?', a: 'Physical therapy and school care are in La Paz. However, we offer family guidance and virtual training sessions nationwide.', icon: '🌎', color: 'accent' },
    ],
    whatsapp_cta: { title: 'Do you prefer an immediate response?', text: 'Write to us directly on WhatsApp and you will receive personalized attention in less than 2 business hours. No waiting.' },
    closing_quote: { text: "We believe Down syndrome is not a barrier, but a different and valuable way to learn, grow, and develop one's full potential.", attribution: 'PRO-21 Foundation & Lápiz en Mano Center' },
  },
})
