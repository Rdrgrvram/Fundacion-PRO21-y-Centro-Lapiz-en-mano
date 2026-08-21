import { z } from 'zod'

const accentColor = z.enum(['primary', 'secondary', 'accent'])

export const homeSchema = z.object({
  hero: z.object({
    title_line1: z.string(),
    title_line2: z.string(),
    subtitle: z.string(),
    cta_primary: z.string(),
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
  }),
  cta: z.object({
    title: z.string(),
    text: z.string(),
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
  team_section: sectionHeader,
  cta: z.object({
    title: z.string(),
    text: z.string(),
  }),
})

export type AboutContent = z.infer<typeof aboutSchema>

// ── Impacto ──────────────────────────────────────────────────────────────────

export const impactSchema = z.object({
  hero: z.object({ badge: z.string(), title_line1: z.string(), title_line2: z.string(), subtitle: z.string() }),
  stats_section: sectionHeader,
  stats: z.array(z.object({ icon: z.string(), color: accentColor, value: z.string(), suffix: z.string().optional(), label: z.string() })),
  testimonials_section: sectionHeader,
  reports_section: sectionHeader,
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
  gallery: z.array(z.object({ image: z.string(), alt: z.string() })),
  gallery_note: z.string(),
  cta: z.object({ title: z.string(), text: z.string() }),
})

export type ImpactContent = z.infer<typeof impactSchema>

// ── Colabora ─────────────────────────────────────────────────────────────────

export const collaborateSchema = z.object({
  hero: z.object({ badge: z.string(), title_line1: z.string(), title_line2: z.string(), subtitle: z.string() }),
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
  payment_methods: z.array(z.object({ icon: z.string(), title: z.string(), lines: z.array(z.string()), qrImage: z.string().optional() })),
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
