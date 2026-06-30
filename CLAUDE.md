# Fundación PRO-21 — Contexto para Claude Code

Leer este archivo antes de cualquier tarea en el repositorio.

## ¿Qué es este proyecto?

Página web institucional gratuita para la **Fundación PRO-21 y Centro Lápiz en Mano** (La Paz, Bolivia). Desarrollada como Proyecto Social UCB por estudiantes de Ingeniería de Sistemas bajo la supervisión de M.Sc. Orlando Rivera.

La fundación atiende niños con síndrome de Down, autismo y dificultades de aprendizaje.

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 14+ (App Router, SSG) |
| Estilos | Tailwind CSS |
| CMS | Decap CMS (git-based, sin servidor) |
| Hosting | Vercel (plan Hobby, $0) |
| Imágenes | Cloudflare R2 (10 GB gratis) |
| Email | Resend (3.000 emails/mes gratis) |
| Idiomas | Español (principal) + Inglés |

## Estructura clave

```
app/[lang]/          # Rutas por idioma (es/en)
components/
  layout/            # Header, Footer, Nav, LanguageSwitcher, AccessibilityBar
  sections/          # Hero, ProgramCard, TeamMember, Testimonial, ImpactStat, ContactForm
  ui/                # Button, Card, Badge, WhatsAppButton
content/             # Markdown gestionado por Decap CMS
  blog/ equipo/ testimonios/
lib/
  i18n/              # Traducciones es.ts + en.ts + index.ts
  content.ts         # Funciones para leer Markdown (gray-matter + remark)
  utils.ts           # Helpers generales
public/admin/        # Panel Decap CMS (index.html + config.yml)
docs/                # Documentación del proyecto (NO es código)
mockups/             # Mockups Vite de referencia (NO es código de producción)
```

## Páginas del sitio

| Ruta | Página |
|------|--------|
| `/[lang]` | Inicio |
| `/[lang]/quienes-somos` | Quiénes somos |
| `/[lang]/mi-escuelita-down` | Mi Escuelita Down (síndrome de Down) |
| `/[lang]/aula-wawitas` | Aula Wawitas (autismo) |
| `/[lang]/pasos-firmes` | Pasos Firmes (dislexia, atención) |
| `/[lang]/equipo` | Equipo profesional |
| `/[lang]/impacto` | Impacto y cifras |
| `/[lang]/colabora` | Donaciones y voluntariado |
| `/[lang]/familias` | Recursos para familias |
| `/[lang]/blog` | Blog / noticias |
| `/[lang]/contacto` | Contacto |

## Convenciones de código

- Componentes: PascalCase (`HeroSection.tsx`)
- Utilidades: camelCase (`formatDate.ts`)
- Commits en **español** con prefijos: `feat:` `fix:` `content:` `style:` `docs:`
- Ramas: `main` (producción), `develop`, `feature/nombre`
- Clases Tailwind: orden layout → spacing → color → typography
- Comentarios en español

## Restricciones importantes

- **Sin e-commerce real** en v1 — donaciones redirigen a plataforma externa
- **Sin autenticación de usuarios** — el CMS usa GitHub OAuth
- **Fotos de menores** solo con autorización escrita de los padres
- **Costo máximo $15 USD/año** (solo el dominio `.org`)
- **Plazo:** 8 semanas (mediados junio — agosto 2026)

## Variables de entorno

Ver `.env.example`. Las críticas son:
- `CLOUDFLARE_R2_*` — para subir imágenes desde el CMS
- `RESEND_API_KEY` — para el formulario de contacto
- `NEXT_PUBLIC_SITE_URL` — URL de producción

## Colores (provisionales — confirmar con la fundación)

- **Primary:** `#f97316` naranja — energía, inclusión
- **Secondary:** `#22c55e` verde — crecimiento, esperanza  
- **Accent:** `#3b82f6` azul — confianza
- **Text:** `#1a1a1a` gris oscuro

## WhatsApp de la fundación

`70106276` (código Bolivia: `591`) → `wa.me/59170106276`

## Documentación completa

Ver carpeta `/docs/`:
- `ARCHITECTURE.md` — arquitectura técnica detallada
- `REQUIREMENTS.md` — requerimientos funcionales y no funcionales
- `ROADMAP.md` — plan semanal de 8 semanas
- `SCRUM.md` — metodología, backlog, sprint planning
- `TEAM.md` — roles del equipo
- `CONTENT.md` — tracker de contenido por sección
- `ENTREVISTA.md` — guía para la reunión con la fundación
