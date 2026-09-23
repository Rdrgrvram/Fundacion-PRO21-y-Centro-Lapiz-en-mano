import { z } from 'zod'

const accentColor = z.enum(['primary', 'secondary', 'accent'])

export const homeSchema = z.object({
  hero: z.object({
    title_line1: z.string(),
    title_line2: z.string(),
    subtitle: z.string(),
    cta_primary: z.string(),
    badge: z.string(),
  }),
  stats: z.array(
    z.object({
      icon: z.string(),
      value: z.string(),
      label: z.string(),
    })
  ),
  programs_teaser: z.object({
    badge: z.string(),
    title: z.string(),
    subtitle: z.string(),
    cta_label: z.string(),
    cards: z.array(
      z.object({
        slug: z.string(),
        icon: z.string(),
        color: accentColor,
        badge: z.string(),
        title: z.string(),
        desc: z.string(),
        ages: z.string(),
      })
    ),
  }),
  mission: z.object({
    badge: z.string(),
    title: z.string(),
    text: z.string(),
    link_text: z.string(),
  }),
  testimonials_section: z.object({
    badge: z.string(),
    title: z.string(),
  }),
  values: z.array(
    z.object({
      icon: z.string(),
      title: z.string(),
      desc: z.string(),
    })
  ),
  team_preview: z.object({
    badge: z.string(),
    title: z.string(),
    text: z.string(),
    cta_label: z.string(),
  }),
  cta: z.object({
    title: z.string(),
    text: z.string(),
    link_label: z.string(),
  }),
})

export type HomeContent = z.infer<typeof homeSchema>

const sectionHeader = z.object({
  badge: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
})

export const aboutSchema = z.object({
  hero: z.object({
    badge: z.string(),
    title_line1: z.string(),
    title_line2: z.string(),
    subtitle: z.string(),
  }),
  identity: z.object({
    pro21: z.object({ tagline: z.string(), description: z.string() }),
    lapiz: z.object({ tagline: z.string(), description: z.string() }),
  }),
  mission_section: sectionHeader,
  mission_cards: z.array(
    z.object({
      icon: z.string(),
      color: accentColor,
      label: z.string(),
      text: z.string(),
    })
  ),
  values_section: sectionHeader,
  values: z.array(
    z.object({
      icon: z.string(),
      color: accentColor,
      name: z.string(),
      desc: z.string(),
    })
  ),
  timeline_section: sectionHeader,
  timeline: z.array(
    z.object({
      year: z.string(),
      icon: z.string(),
      title: z.string(),
      desc: z.string(),
    })
  ),
  team_section: sectionHeader.extend({
    cta_label: z.string(),
  }),
  cta: z.object({
    title: z.string(),
    text: z.string(),
    cta_label: z.string(),
    secondary_label: z.string(),
  }),
})

export type AboutContent = z.infer<typeof aboutSchema>

// ── Impacto ──────────────────────────────────────────────────────────────────

export const impactSchema = z.object({
  hero: z.object({ badge: z.string(), title_line1: z.string(), title_line2: z.string(), subtitle: z.string() }),
  stats_section: sectionHeader,
  stats: z.array(z.object({ icon: z.string(), color: accentColor, value: z.string(), suffix: z.string().optional(), label: z.string() })),
  testimonials_section: sectionHeader,
  reports_section: sectionHeader.extend({
    list_label: z.string(),
    download_label: z.string(),
    request_label: z.string(),
  }),
  reports: z.array(
    z.object({
      year: z.string(),
      title: z.string(),
      desc: z.string(),
      file: z.string().optional(),
    })
  ),
  reports_breakdown_title: z.string(),
  reports_breakdown: z.array(z.object({ icon: z.string(), color: accentColor, title: z.string(), desc: z.string() })),
  media_section: sectionHeader,
  media: z.array(z.object({ outlet: z.string(), type: z.string(), desc: z.string(), year: z.string(), color: accentColor })),
  gallery_section: sectionHeader,
  gallery_categories: z.array(z.string()),
  gallery: z.array(z.object({ image: z.string(), alt: z.string(), category: z.string() })),
  gallery_note: z.string(),
  cta: z.object({ title: z.string(), text: z.string(), cta_label: z.string(), secondary_label: z.string() }),
})

export type ImpactContent = z.infer<typeof impactSchema>

// ── Colabora ─────────────────────────────────────────────────────────────────

export const collaborateSchema = z.object({
  hero: z.object({
    badge: z.string(),
    title_line1: z.string(),
    title_line2: z.string(),
    subtitle: z.string(),
    donate_label: z.string(),
    volunteer_label: z.string(),
  }),
  hero_highlights: z.array(z.object({ icon: z.string(), value: z.string(), label: z.string() })),
  donation_section: sectionHeader,
  donation_tiers: z.array(
    z.object({
      amount: z.string(),
      usd: z.string().optional(),
      label: z.string(),
      icon: z.string(),
      color: accentColor,
      impact: z.string(),
      items: z.array(z.string()),
      featured: z.boolean().optional(),
    })
  ),
  donation_bank: z.object({ bank: z.string(), account: z.string(), holder: z.string(), note: z.string() }),
  payment_methods: z.array(
    z.object({ icon: z.string(), title: z.string(), lines: z.array(z.string()), is_bank: z.boolean().optional() })
  ),
  payment_note: z.string(),
  volunteer_section: sectionHeader,
  volunteer_areas: z.array(z.object({ icon: z.string(), title: z.string(), desc: z.string(), color: accentColor })),
  volunteer_perks: z.array(z.object({ icon: z.string(), text: z.string() })),
  volunteer_testimonial: z.object({ quote: z.string(), role: z.string() }),
  alliances_section: sectionHeader,
  partner_types: z.array(z.object({ icon: z.string(), title: z.string(), color: accentColor, desc: z.string(), benefits: z.array(z.string()) })),
  allies_title: z.string(),
  allies_subtitle: z.string(),
  allies: z.array(z.object({ name: z.string(), type: z.string(), icon: z.string() })),
  cta: z.object({ title: z.string(), text: z.string() }),
})

export type CollaborateContent = z.infer<typeof collaborateSchema>

// ── Familias ─────────────────────────────────────────────────────────────────

export const familiesSchema = z.object({
  hero: z.object({ badge: z.string(), title_line1: z.string(), title_line2: z.string(), subtitle: z.string() }),
  welcome_letter: z.object({ title: z.string(), text: z.string(), signature: z.string() }),
  sessions_section: sectionHeader,
  virtual_sessions: z.array(z.object({ title: z.string(), icon: z.string(), desc: z.string(), freq: z.string(), duration: z.string(), color: accentColor })),
  sessions_note: z.string(),
  network_section: sectionHeader,
  support_network: z.array(z.object({ title: z.string(), icon: z.string(), desc: z.string(), color: accentColor })),
  guides_section: sectionHeader,
  guides: z.array(
    z.object({
      title: z.string(),
      icon: z.string(),
      desc: z.string(),
      pages: z.string(),
      program: z.string(),
      color: accentColor,
      file: z.string().optional(),
    })
  ),
  guides_note: z.string(),
  faq_section: sectionHeader,
  faqs: z.array(z.object({ q: z.string(), a: z.string() })),
  cta: z.object({ title: z.string(), text: z.string(), note: z.string() }),
})

export type FamiliesContent = z.infer<typeof familiesSchema>

// ── Contacto ─────────────────────────────────────────────────────────────────

const reasonColor = z.enum(['primary', 'secondary', 'accent', 'neutral'])

export const contactPageSchema = z.object({
  hero: z.object({ badge: z.string(), title_line1: z.string(), title_line2: z.string(), subtitle: z.string() }),
  reasons: z.array(z.object({ label: z.string(), icon: z.string(), color: reasonColor })),
  form_section: z.object({ title: z.string(), subtitle: z.string() }),
  map_card: z.object({ title: z.string(), subtitle: z.string() }),
  hours_title: z.string(),
  hours: z.array(z.object({ day: z.string(), time: z.string(), active: z.boolean() })),
  social_title: z.string(),
  faq_section: sectionHeader,
  faqs: z.array(z.object({ q: z.string(), a: z.string(), icon: z.string(), color: accentColor })),
  whatsapp_cta: z.object({ title: z.string(), text: z.string() }),
  closing_quote: z.object({ text: z.string(), attribution: z.string() }),
})

export type ContactPageContent = z.infer<typeof contactPageSchema>

// ── Configuración general (site_settings) ────────────────────────────────────

const siteRoute = z.enum([
  'quienes-somos',
  'mi-escuelita-down',
  'aula-wawitas',
  'pasos-firmes',
  'equipo',
  'impacto',
  'familias',
  'blog',
  'colabora',
  'contacto',
])

export const siteSettingsSchema = z.object({
  logo_pro21: z.string(),
  logo_pro21_alt: z.string(),
  logo_lapiz: z.string(),
  logo_lapiz_alt: z.string(),
  contact: z.object({
    address: z.string(),
    phone_display: z.string(),
    whatsapp_number: z.string(),
    email: z.string(),
  }),
  social: z.object({
    facebook: z.string(),
    instagram: z.string(),
    tiktok_pro21: z.string(),
    tiktok_lapiz: z.string(),
  }),
  nav: z.array(z.object({ route: siteRoute, label: z.string() })),
  header: z.object({
    cta_label: z.string(),
    tagline: z.string(),
  }),
  footer: z.object({
    programs_title: z.string(),
    institution_title: z.string(),
    institution_links: z.array(z.object({ route: siteRoute, label: z.string() })),
    copyright: z.string(),
  }),
})

export type SiteSettingsContent = z.infer<typeof siteSettingsSchema>

// ── Programas (colección folder, 3 entradas fijas) ────────────────────────────

const programCardItem = z.object({
  icon: z.string(),
  color: accentColor,
  title: z.string(),
  tag: z.string().optional(),
  desc: z.string().optional(),
  items: z.array(z.string()).optional(),
})

const programCardSection = z.object({
  badge: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  layout: z.enum(['tarjetas', 'acordeón']).default('tarjetas'),
  items: z.array(programCardItem),
})

export type ProgramCardSectionContent = z.infer<typeof programCardSection>

const programTabSection = z.object({
  badge: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  tabs: z.array(
    z.object({
      icon: z.string(),
      color: accentColor,
      label: z.string(),
      age_range: z.string().optional(),
      desc: z.string(),
      highlights: z.array(z.string()),
    })
  ),
})

export type ProgramTabSectionContent = z.infer<typeof programTabSection>

export const programSchema = z.object({
  title: z.string(),
  hero: z.object({
    badge: z.string(),
    subtitle: z.string(),
    color: accentColor,
    cta_details_label: z.string(),
    cta_whatsapp_label: z.string(),
  }),
  stats: z.array(z.object({ icon: z.string(), value: z.string(), label: z.string() })),
  section_1: programCardSection,
  section_2: programTabSection,
  section_3: programCardSection.optional(),
  enrollment: z.object({
    badge: z.string().optional(),
    title: z.string(),
    subtitle: z.string().optional(),
    steps: z.array(z.object({ icon: z.string(), title: z.string(), desc: z.string() })),
  }),
  cta: z.object({
    title: z.string(),
    text: z.string(),
    link_label: z.string(),
  }),
})

export type ProgramContent = z.infer<typeof programSchema>

// ── Equipo (singleton de página — hero/filosofía/red/CTA; team_areas, equipo y
// volunteers siguen siendo colecciones folder aparte, sin cambios acá) ─────────

export const equipoPageSchema = z.object({
  hero: z.object({
    badge: z.string(),
    title_line1: z.string(),
    title_line2: z.string(),
    subtitle: z.string(),
  }),
  // El "valor" de las 2 primeras cifras se calcula en runtime (team.length /
  // areas.length) — el campo `value` del CMS se ignora para esos 2 índices,
  // por eso queda opcional/vacío en el contenido semilla. Los últimos 2 sí usan
  // el valor tal cual viene del CMS.
  stats: z.array(z.object({ icon: z.string(), value: z.string().optional(), label: z.string() })).length(4),
  philosophy_section: sectionHeader,
  philosophy_items: z.array(z.object({ icon: z.string(), title: z.string(), desc: z.string() })),
  team_grid_section: z.object({
    badge: z.string(),
    title: z.string(),
    subtitle: z.string(),
    staff_count_label: z.string(),
    competencies_label: z.string(),
    specialty_label: z.string(),
    clear_filter_label: z.string(),
  }),
  network_section: z.object({
    badge: z.string(),
    title: z.string(),
    subtitle: z.string(),
    center_label: z.string(),
    center_sublabel: z.string(),
    node_caption: z.string(),
  }),
  volunteers_section: sectionHeader.extend({
    tag_label: z.string(),
  }),
  cta: z.object({
    title: z.string(),
    text: z.string(),
    primary_label: z.string(),
    secondary_label: z.string(),
  }),
})

export type EquipoPageContent = z.infer<typeof equipoPageSchema>

// ── Colecciones folder de Equipo: team_areas / equipo / volunteers ────────────

export const teamAreaSchema = z.object({
  name: z.string(),
  icon: z.string(),
  color: accentColor,
  desc: z.string(),
  skills: z.array(z.string()),
  programs: z.array(z.string()),
})

export type TeamAreaContent = z.infer<typeof teamAreaSchema>

export const teamMemberSchema = z.object({
  name: z.string(),
  role: z.string(),
  specialty: z.string(),
  bio: z.string(),
  photo: z.string().optional(),
  initials: z.string(),
  area: z.string(),
  color: accentColor,
})

export type TeamMemberContent = z.infer<typeof teamMemberSchema>

// Sin i18n (un solo .md por persona, no <slug>.es.md/<slug>.en.md).
export const volunteerSchema = z.object({
  name: z.string(),
})

export type VolunteerContent = z.infer<typeof volunteerSchema>
