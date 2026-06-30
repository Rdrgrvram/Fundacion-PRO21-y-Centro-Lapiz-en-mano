# CONTEXT.md — Fundación PRO-21 / Centro Lápiz en Mano
> Archivo de contexto para Claude Code. Leer antes de cualquier tarea.

---

## ¿Qué es este proyecto?

Página web institucional desarrollada como **Proyecto Social UCB** (Universidad Católica Boliviana "San Pablo" — Regional La Paz, Carrera de Ingeniería de Sistemas). El desarrollo es completamente gratuito para la fundación. No es un producto comercial.

**Organización beneficiaria:** Fundación PRO-21 y Centro Lápiz en Mano
**Ciudad:** La Paz, Bolivia
**Misión:** Atención terapéutica y educativa a niños con síndrome de Down, autismo y dificultades de aprendizaje.

---

## Stack tecnológico

- **Framework:** Next.js (App Router)
- **Estilos:** Tailwind CSS
- **CMS:** Decap CMS (Git-based, sin servidor, gratuito)
- **Hosting:** Vercel (plan Hobby, gratuito)
- **Almacenamiento de imágenes:** Cloudflare R2 (tier gratuito, 10 GB)
- **Control de versiones:** GitHub
- **Idiomas:** Español (principal) + Inglés (versión completa traducida)
- **SSL:** Automático vía Vercel

---

## Estructura de carpetas del proyecto

```
fundacion-pro21/
├── app/
│   ├── [lang]/               # Rutas internacionalizadas (es / en)
│   │   ├── page.tsx          # Inicio
│   │   ├── quienes-somos/
│   │   ├── mi-escuelita-down/
│   │   ├── aula-wawitas/
│   │   ├── pasos-firmes/
│   │   ├── equipo/
│   │   ├── impacto/
│   │   ├── colabora/
│   │   ├── familias/
│   │   ├── blog/
│   │   └── contacto/
│   └── layout.tsx
├── components/
│   ├── ui/                   # Componentes reutilizables (botones, cards, etc.)
│   ├── sections/             # Secciones de página
│   └── layout/               # Header, Footer, Nav
├── content/                  # Archivos Markdown gestionados por Decap CMS
│   ├── blog/
│   ├── equipo/
│   └── testimonios/
├── public/
│   ├── images/
│   └── icons/
├── lib/
│   ├── i18n/                 # Traducciones ES/EN
│   └── utils/
├── styles/
│   └── globals.css
├── public/admin/             # Panel Decap CMS
│   ├── index.html
│   └── config.yml
└── next.config.js
```

---

## Secciones del sitio

| Ruta | Nombre | Descripción |
|---|---|---|
| `/` | Inicio | Hero emotivo, cifras de impacto, accesos rápidos a programas |
| `/quienes-somos` | Quiénes somos | Historia, misión, visión, 8 valores, presentación PRO-21 y Lápiz en Mano |
| `/mi-escuelita-down` | Mi Escuelita Down | 4 niveles por edad, 8 servicios terapéuticos, Programa Crecer |
| `/aula-wawitas` | Aula Wawitas | 9 servicios para autismo y neurodesarrollo, detección temprana |
| `/pasos-firmes` | Pasos Firmes | 7 áreas para dislexia, discalculia, problemas de atención |
| `/equipo` | Nuestro equipo | Perfiles profesionales multidisciplinarios |
| `/impacto` | Impacto | Historias, cifras, galería, informes de transparencia |
| `/colabora` | Colabora | Donaciones, voluntariado, alianzas |
| `/familias` | Para familias | Recursos, sesiones virtuales gratuitas, Red de Apoyo para Padres |
| `/blog` | Blog / Noticias | Campañas, eventos, artículos de inclusión |
| `/contacto` | Contacto | Formulario, mapa, WhatsApp (70106276), redes sociales |

---

## Características técnicas requeridas

- **Responsive:** mobile-first, adaptado a celulares, tablets y escritorio
- **Bilingüe:** español / inglés con rutas `/es/` y `/en/`
- **WhatsApp flotante:** botón fijo en todas las páginas → `70106276`
- **Accesibilidad:** ajuste de tamaño de texto y contraste (WCAG AA mínimo)
- **SEO:** meta tags, Open Graph, sitemap.xml, robots.txt optimizados para búsquedas de "síndrome de Down La Paz", "terapias inclusión Bolivia", etc.
- **CMS autónomo:** la fundación puede actualizar noticias, fotos y testimonios sin tocar código
- **Formularios:** contacto y donación (sin procesador de pagos en v1)
- **Analytics:** Google Analytics 4 o Vercel Analytics (a definir con la fundación)

---

## Paleta de colores (provisional — confirmar con la fundación)

| Nombre | Uso sugerido |
|---|---|
| Cálido/principal | Naranja o amarillo dorado — energía, inclusión |
| Secundario | Verde suave — crecimiento, esperanza |
| Neutro | Blanco y gris claro — limpieza, legibilidad |
| Texto | Gris oscuro (#1a1a1a) — nunca negro puro |
| Acento | Azul suave — confianza, profesionalismo |

> ⚠️ Confirmar colores, logo y tipografía con la fundación en la entrevista inicial.

---

## Restricciones y límites del proyecto

- **Sin e-commerce real:** el botón de donación puede redirigir a una plataforma externa (PayPal, Stripe, banco) pero no procesa pagos internamente en v1
- **Sin autenticación de usuarios:** el CMS usa autenticación vía GitHub
- **Fotos de menores:** solo imágenes con autorización firmada de los padres
- **Costo operativo máximo:** $15 USD/año (solo dominio `.org`). Todo lo demás gratuito
- **Plazo:** 8 semanas (mediados de junio a principios de agosto de 2026)
- **Soporte post-entrega:** 30 días de soporte técnico tras la publicación

---

## Equipo de desarrollo

| Rol | Cantidad | Responsabilidad |
|---|---|---|
| Diseño visual | 2 | UI/UX, sistema de diseño, Figma/mockups |
| Frontend | 3 | Componentes Next.js, integración CMS, responsive |
| Backend/Sistema | 2 | Decap CMS config, formularios, R2, i18n |
| QA y documentación | 1 | Pruebas, carga de contenido real, manuales |

**Supervisor:** M.Sc. Orlando Rivera — Director Carrera Ing. Sistemas, UCB La Paz

---

## Convenciones de código

- Componentes en PascalCase: `HeroSection.tsx`
- Archivos de utilidades en camelCase: `formatDate.ts`
- Clases Tailwind: seguir orden utilitario estándar (layout → spacing → color → typography)
- Comentarios en español
- Commits en español con prefijos: `feat:`, `fix:`, `content:`, `style:`, `docs:`
- Ramas: `main` (producción), `develop` (desarrollo), `feature/nombre-feature`

---

## Contacto del proyecto

- **Fundación PRO-21:** WhatsApp 70106276
- **Supervisor UCB:** M.Sc. Orlando Rivera
- **Repositorio:** (definir tras convenio)
- **URL temporal Vercel:** (se asigna al crear el proyecto)
