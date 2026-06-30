# ARCHITECTURE.md — Arquitectura Técnica

> Referencia técnica para el equipo de desarrollo.

---

## Stack completo

```
┌─────────────────────────────────────────────────────┐
│                   USUARIO FINAL                      │
└─────────────────────┬───────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────┐
│              VERCEL (CDN + Hosting)                  │
│         Edge Network · SSL automático                │
│         Deploy automático desde GitHub               │
└─────────────────────┬───────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────┐
│           NEXT.JS 14+ (App Router)                   │
│   Static Site Generation (SSG) para todas las pages │
│   Internacionalización: /es/ y /en/                  │
│   Tailwind CSS para estilos                          │
└──────────┬──────────────────────┬───────────────────┘
           │                      │
┌──────────▼───────┐   ┌──────────▼───────────────────┐
│   DECAP CMS      │   │      CLOUDFLARE R2            │
│ /admin/index.html│   │  Almacenamiento de imágenes   │
│ config.yml       │   │  10 GB gratuitos · Sin egress │
│ Git-based · Free │   │  Conectado via API key        │
└──────────┬───────┘   └──────────────────────────────┘
           │
┌──────────▼───────────────────────────────────────────┐
│                   GITHUB                              │
│  Repositorio del código + contenido Markdown         │
│  Decap CMS hace commits directos al repo             │
│  Push → trigger automático de deploy en Vercel       │
└──────────────────────────────────────────────────────┘
```

---

## Decisiones de arquitectura

### ¿Por qué SSG (Static Site Generation)?

La página de una fundación es principalmente contenido estático que cambia poco. SSG permite:
- **Costo $0** en hosting (Vercel Hobby soporta sitios estáticos sin límite real)
- **Velocidad máxima** — páginas pre-generadas, sin servidor activo
- **Sin base de datos** — cero costos de infraestructura de BD
- **Seguridad** — superficie de ataque mínima

### ¿Por qué Decap CMS?

- **Gratuito y open source** para siempre (licencia MIT)
- **Sin servidor** — funciona sobre GitHub, no requiere backend propio
- **Interfaz amigable** — editores no técnicos pueden publicar sin tocar código
- **Git-based** — todo el contenido vive en el repositorio, con historial de versiones
- **Compatible con Next.js** — lee archivos Markdown del repo

### ¿Por qué Cloudflare R2?

- **10 GB gratuitos** permanentes (no expiran como AWS S3 Free Tier)
- **Sin cargos de egress** — las imágenes se sirven sin costo de transferencia
- **CDN de Cloudflare** — imágenes rápidas globalmente

---

## Estructura de archivos detallada

```
fundacion-pro21/
│
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Layout raíz (fuentes, meta global)
│   ├── page.tsx                  # Redirect a /es/
│   └── [lang]/                   # Rutas dinámicas por idioma
│       ├── layout.tsx            # Layout con Header y Footer
│       ├── page.tsx              # Inicio / Home
│       ├── quienes-somos/
│       │   └── page.tsx
│       ├── mi-escuelita-down/
│       │   └── page.tsx
│       ├── aula-wawitas/
│       │   └── page.tsx
│       ├── pasos-firmes/
│       │   └── page.tsx
│       ├── equipo/
│       │   └── page.tsx
│       ├── impacto/
│       │   └── page.tsx
│       ├── colabora/
│       │   └── page.tsx
│       ├── familias/
│       │   └── page.tsx
│       ├── blog/
│       │   ├── page.tsx          # Lista de posts
│       │   └── [slug]/
│       │       └── page.tsx      # Post individual
│       └── contacto/
│           └── page.tsx
│
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   └── WhatsAppButton.tsx    # Botón flotante global
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── ProgramCard.tsx
│   │   ├── TeamMember.tsx
│   │   ├── Testimonial.tsx
│   │   ├── ImpactStat.tsx
│   │   └── ContactForm.tsx
│   └── layout/
│       ├── Header.tsx
│       ├── Footer.tsx
│       ├── Nav.tsx
│       ├── LanguageSwitcher.tsx
│       └── AccessibilityBar.tsx  # Control tamaño texto y contraste
│
├── content/                      # Gestionado por Decap CMS
│   ├── blog/
│   │   └── *.md                  # Posts del blog
│   ├── equipo/
│   │   └── *.md                  # Perfiles del equipo
│   └── testimonios/
│       └── *.md                  # Testimonios de familias
│
├── lib/
│   ├── i18n/
│   │   ├── es.ts                 # Traducciones al español
│   │   ├── en.ts                 # Traducciones al inglés
│   │   └── index.ts              # Helper de traducción
│   ├── content.ts                # Funciones para leer Markdown
│   └── utils.ts                  # Utilidades generales
│
├── public/
│   ├── admin/
│   │   ├── index.html            # Decap CMS UI
│   │   └── config.yml            # Configuración del CMS
│   ├── images/
│   │   ├── logo-pro21.svg
│   │   ├── logo-lapiz-en-mano.svg
│   │   └── og-image.jpg          # Imagen Open Graph
│   └── icons/
│       └── favicon.ico
│
├── styles/
│   └── globals.css               # Variables CSS + estilos base
│
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## Configuración de internacionalización

```typescript
// lib/i18n/index.ts
export const locales = ['es', 'en'] as const
export type Locale = typeof locales[number]
export const defaultLocale: Locale = 'es'

// Uso en componentes:
// const t = useTranslation(lang)
// t('nav.home') → 'Inicio' | 'Home'
```

```typescript
// app/[lang]/layout.tsx
export async function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }]
}
```

---

## Configuración de Decap CMS

```yaml
# public/admin/config.yml
backend:
  name: github
  repo: ucb-sistemas/fundacion-pro21
  branch: main

media_folder: public/images/uploads
public_folder: /images/uploads

# Opcional: imágenes en Cloudflare R2
# media_library:
#   name: cloudinary  # o configuración personalizada R2

collections:
  - name: blog
    label: Blog / Noticias
    folder: content/blog
    create: true
    fields:
      - { label: Título, name: title, widget: string }
      - { label: Fecha, name: date, widget: datetime }
      - { label: Imagen destacada, name: image, widget: image }
      - { label: Resumen, name: excerpt, widget: text }
      - { label: Contenido, name: body, widget: markdown }

  - name: equipo
    label: Equipo
    folder: content/equipo
    create: true
    fields:
      - { label: Nombre, name: name, widget: string }
      - { label: Cargo, name: role, widget: string }
      - { label: Foto, name: photo, widget: image }
      - { label: Especialidad, name: specialty, widget: string }
      - { label: Descripción, name: bio, widget: text }

  - name: testimonios
    label: Testimonios
    folder: content/testimonios
    create: true
    fields:
      - { label: Familia, name: family, widget: string }
      - { label: Programa, name: program, widget: select,
          options: [Mi Escuelita Down, Aula Wawitas, Pasos Firmes] }
      - { label: Testimonio, name: body, widget: markdown }
```

---

## Variables de entorno

```env
# .env.local (no subir a GitHub)
CLOUDFLARE_R2_ACCESS_KEY=
CLOUDFLARE_R2_SECRET_KEY=
CLOUDFLARE_R2_BUCKET=pro21-media
CLOUDFLARE_R2_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com

# Formulario de contacto (usar Resend o Formspree - gratuitos)
RESEND_API_KEY=

# Analytics (opcional)
NEXT_PUBLIC_GA_ID=
```

---

## SEO — configuración por página

```typescript
// Ejemplo: app/[lang]/mi-escuelita-down/page.tsx
export async function generateMetadata({ params: { lang } }) {
  return {
    title: 'Mi Escuelita Down | Fundación PRO-21 La Paz Bolivia',
    description: 'Programa terapéutico y educativo para niños con síndrome de Down en La Paz, Bolivia. 4 niveles por edad, 8 servicios especializados.',
    openGraph: {
      title: 'Mi Escuelita Down — Fundación PRO-21',
      description: '...',
      images: ['/images/og-escuelita-down.jpg'],
      locale: lang === 'es' ? 'es_BO' : 'en_US',
    },
    alternates: {
      canonical: `https://fundacionpro21.org/${lang}/mi-escuelita-down`,
      languages: {
        'es': '/es/mi-escuelita-down',
        'en': '/en/mi-escuelita-down',
      }
    }
  }
}
```

---

## Formulario de contacto (sin backend propio)

Usar **Resend** (gratuito hasta 3.000 emails/mes) o **Formspree** (gratuito hasta 50 envíos/mes):

```typescript
// app/api/contact/route.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const { name, email, message } = await req.json()
  await resend.emails.send({
    from: 'web@fundacionpro21.org',
    to: 'contacto@fundacionpro21.org',
    subject: `Mensaje de ${name}`,
    text: message,
  })
  return Response.json({ ok: true })
}
```

---

## Checklist de performance (objetivo: Lighthouse > 90)

- [ ] Imágenes en formato WebP con `next/image`
- [ ] Lazy loading en imágenes fuera del viewport
- [ ] Fuentes con `font-display: swap`
- [ ] Sin JavaScript innecesario en páginas estáticas
- [ ] Prefetch en links de navegación principal
- [ ] Sitemap.xml generado automáticamente
- [ ] robots.txt configurado
- [ ] Meta tags completos en todas las páginas
