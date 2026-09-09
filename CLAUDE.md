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

## Colores oficiales de la Fundación PRO-21

- **Primary:** `#ffc500` amarillo — identidad de la fundación
- **Secondary:** `#229cc2` azul — confianza, profesionalismo
- **Accent:** `#8c3cbd` morado — creatividad, inclusión
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


---

## Sesión con Claude (Cowork) — Contexto de continuidad

> Esta sección resume una sesión larga de trabajo hecha con Claude en modo Cowork (no Claude Code) sobre este mismo repo. Se agrega acá para que una sesión nueva de Claude Code tenga el mismo contexto, como si la conversación continuara. Los puntos 1-5 ya están implementados y mergeados en el código; el punto 6 es el hilo abierto que sigue pendiente.

### 1. Pivote de alcance
El dueño del proyecto pidió inicialmente usar `/frontend-design` para evaluar un rediseño completo. Se le presentó una propuesta de rediseño desde cero ("El Trazo") y la **rechazó explícitamente** — prefiere mantener su propio sitio y que Claude actúe como **auditor UI/UX del código existente**, corrigiendo y unificando en vez de rehacer.

### 2. Unificación de diseño (ya hecha, documentada en `docs/DESIGN_STANDARD.md - LEER ESE ARCHIVO)
Se auditó y unificó estructura/color/tipografía en 12+ páginas. Puntos clave que `docs/DESIGN_STANDARD.md` ya documenta en detalle:
- Patrón real de **hero** (sin `min-h`, sin `max-w` en el contenedor — solo el `<p>` de subtítulo lleva `max-w-2xl`; excepción documentada: Colabora).
- Patrón real de **CTA final** (sin círculos ni emoji, con ícono SVG de WhatsApp obligatorio en el botón — se había perdido en 4 páginas durante la unificación y se reinsertó).
- Reglas de contraste WCAG AA para acentos de color sobre fondos de marca.
- Nav: dropdown "Programas" agrupando los 3 programas; breakpoint bajado de `xl:` a `lg:` en `Nav.tsx` y `Header.tsx`.
- `AccessibilityBar` ahora colapsa al hacer scroll (antes ocupaba espacio fijo siempre).
- Íconos de contacto del footer migrados de emoji a SVG inline (mismo estilo que los íconos de redes sociales).
- Regla dura: **nunca hex crudo nuevo** — todo color se traza a `tailwind.config.js` o `lib/palette.ts`.

### 3. Auditoría de iconografía/imágenes
Se hizo una auditoría específica de íconos e imágenes (emoji vs. SVG vs. fotos reales) con un "mapa de prioridades". Se implementaron las 3 prioridades:
1. Ícono SVG de WhatsApp reinsertado en 4 CTAs que lo habían perdido.
2. Avatares de iniciales para miembros de equipo sin foto — **ya estaba bien implementado** en `EquipoPageClient.tsx` (usa `m.initials` + `PALETTE[m.color]`); el emoji roto que se detectó vive en `components/sections/TeamMember.tsx`, que es **código muerto sin imports** — no se tocó porque no tiene efecto visual real.
3. Fila de avatares de fotos reales del equipo en el preview de Inicio (`app/[lang]/page.tsx`), con círculo "+N" dinámico para el resto del equipo.

### 4. Material real compartido por la fundación (carpeta "DOCUMENTOS UCB")
La fundación compartió una carpeta con logos, fotos y un documento de intake. Hallazgos:
- Logos, QR de donación, datos de contacto/redes/cuenta bancaria/estadísticas: **ya coincidían exactamente** con lo cargado en el CMS — no había nada que actualizar ahí.
- **Se encontraron 4 imágenes falsas** (`public/images/wawitas/*.png`) que eran fotos de stock/IA genéricas de niños no bolivianos en un aula genérica tipo Pinterest — completamente inconsistentes con la identidad real del centro. **Se reemplazaron** por fotos reales curadas.
- Se curaron y optimizaron **19 fotos reales** (de ~150 en la carpeta compartida, redimensionadas a max 1600px, calidad 78, en `public/images/actividades-reales/`) mostrando actividades reales del centro (terapias sensoriales, psicomotricidad, juegos de mesa, escritura, etc.), autorizadas según el documento de intake de la fundación.

### 5. Galerías de fotos reales (reemplazando texto/emoji)
Las 3 páginas de programas (`Mi Escuelita Down`, `Aula Wawitas`, `Pasos Firmes`) eran 100% texto + emoji, **sin ninguna foto**. Se agregó:
- Campo `gallery` en `content/programs/*.md` (es/en) + tipo `ProgramGallerySection` en `lib/content.ts` + componente nuevo `components/sections/ProgramGallery.tsx`, insertado en `ProgramPageLayout.tsx` antes de `ProgramEnrollmentSteps`.
- Se **amplió y arregló** la galería de Impacto (`content/settings/impact.yml`, `ImpactoPageClient.tsx`): los botones de filtro por categoría eran **decorativos, no funcionaban** (bug real encontrado) — se agregó el campo `category` a cada foto y se conectó el filtro real.
- **Tratamiento visual** (via `/frontend-design`, aplicado a ambas galerías para que se vean idénticas): "ficha de actividad" — borde superior de color según programa/categoría (tokens existentes), inclinación alterna fija ±1° (`motion-safe:`, se endereza al hover, respeta reduced-motion), etiqueta en monoespaciado, caption real (el alt text) revelado al hover sobre degradado oscuro. Ver comentarios en el propio código de `ProgramGallery.tsx`.
- Se agregaron los mismos campos al esquema del CMS (`public/admin/config.yml`, `lib/cms-schemas.ts`) para que la fundación pueda seguir editando estas galerías desde Decap CMS.

### 6. Investigación de sitios de referencia — HECHA, con hallazgos y dirección acordada

El dueño del proyecto expresó que sentía que la interfaz/estructura actual no estaba al nivel de otras páginas reales de fundaciones. En vez de seguir proponiendo cambios solo desde criterio propio, se navegó en vivo (vía el puente al navegador del dispositivo del usuario, no WebFetch — varios sitios bloquean fetch directo) una selección de sitios reales de fundaciones/ONGs y se compararon contra el sitio actual. Resultado:

**Sitios revisados:**
- `globaldownsyndrome.org` — descartado como referencia: diseño anticuado (barra de compartir fija estilo 2015, nav angosto, sin jerarquía tipográfica clara). No aporta nada útil.
- `dsrf.org` (Down Syndrome Resource Foundation) — buena referencia: fotografía real a pantalla completa con formas circulares de color de fondo (no rectángulos duros), botones de nav en píldora, tipografía hero grande y directa ("Workshops + Presentations" en vez de eslogan genérico), ícono de accesibilidad flotante visible.
- `sindromedown.org` (Down España) — la más relevante por ser en español y del mismo rubro: identidad de marca muy fuerte (logo juguetón con la "O" como carita sonriente, paleta azul/amarillo saturada y consistente), carrusel hero con fotos reales de personas con síndrome de Down (no stock) y texto superpuesto tipo cartel/manuscrito ("En verano también me cuido") en vez de titular corporativo plano.
- `childrenssociety.org.uk` (The Children's Society, UK) — el mejor ejemplo general: hero de foto real a pantalla completa con una **cita textual real de un beneficiario** superpuesta en tipografía manuscrita ("Now I've got the support"), CTA amarillo de altísimo contraste, flecha animada de scroll.

**Tres ideas concretas identificadas, repetidas en los mejores ejemplos, que el sitio actual todavía NO tiene:**

1. **Citas textuales reales superpuestas en foto** como hero, no solo texto plano institucional — Down España y The Children's Society lo usan como su recurso hero principal. El sitio ya tiene testimonios en alguna sección secundaria; candidato: promover uno a hero de una página relevante (Inicio o Impacto) con foto real de fondo + cita superpuesta en tipografía destacada.
2. **Identidad de marca más lúdica/distintiva** en detalles gráficos — formas orgánicas o círculos de color detrás/alrededor de fotos, en vez de solo rectángulos con esquinas redondeadas. Es lo que hace que DSRF y Down España se sientan "de fundación de infancia" y no genéricos.
3. **Texto hero directo y específico** ("Workshops + Presentations", "Aprende cómo cuidarte") en vez de eslóganes abstractos — más escaneable y más honesto sobre qué hace la organización. Revisar los `<h1>` de hero de cada página contra este criterio.

**Conclusión explícita:** ninguno de los sitios revisados sugiere que la estructura base actual (hero + CTA + tarjetas, documentada en `docs/DESIGN_STANDARD.md`) esté mal — el salto de calidad percibido está en fotografía real más grande y protagonista, citas textuales reales, y detalles de marca más jugados — NO en reestructurar el sitio.

**Estado — HECHO (sesión Claude Code, ago 2026):** el dueño pidió un mockup "antes/después" del hero de Inicio con las 3 ideas juntas, lo revisó y dijo "tú elige". Se implementaron las 3 en el **hero de Inicio**:
- Foto real (`retrato-sonrisa.jpg`) en **forma orgánica** con blobs de color de marca detrás (idea 2).
- **Cita real** de la Familia Quispe superpuesta sobre degradado para contraste AA (idea 1).
- **Titular directo**: "Terapia y escuela especializada para tu hijo" en vez de "Cada niño tiene un potencial único" (idea 3).
- Decisiones: variante **evolución** (no full-bleed), tipografía **todo en Inter** (Fraunces descartado — un font usado una sola vez se lee inconsistente), fondo **se mantiene `bg-gray-900`** insignia.
- Archivos: `app/[lang]/page.tsx` (hero), `content/settings/home.yml` (es/en, campos nuevos `hero.image/quote/quote_author/quote_program`), `lib/cms-schemas.ts`, `public/admin/config.yml`, `docs/DESIGN_STANDARD.md` (excepción 2 del hero documentada). `tsc` + `next build` OK.
- Mockup de referencia: artifact `55d37bad-be1c-4705-b7b7-95d829de203b`.

**Rama `v2` (ago 2026):** el dueño pidió 3 mockups de dirección (evolución / evolución+tipografía display / libre "cuaderno"). Eligió la **opción 2** (evolución + tipografía display) + la recomendación concreta de Claude (números grandes en Impacto, bloque de color detrás de la foto). Implementado en la rama `v2` (parte de `develop`):
- **Fraunces** cargada en `app/layout.tsx` (`next/font/google`, var `--font-display`), aplicada a `h1`/`h2` vía `styles/globals.css` + `tailwind.config.js` (`fontFamily.display`). Inter sigue en cuerpo y títulos de tarjeta.
- Componente nuevo `components/sections/ProtagonistPhoto.tsx` (foto en forma orgánica + blobs + cita opcional). Usado en: Inicio (refactor), los 3 heroes de programa (`ProgramHero.tsx` + campos nuevos en `content/programs/*.md` y `lib/content.ts`), identidad de Quiénes Somos, historia destacada de Impacto, testimonio de Colabora, carta de Familias.
- Titulares directos en Impacto / Colabora / Familias (solo texto en los `.yml`).
- Impacto: números gigantes (`text-7xl` + `font-display`) + bloque "historia destacada" (`featured_story` en `impact.yml` + schema).
- Fixes de estándar: Quiénes Somos ya no usa `italic text-primary` en el hero (fallo de contraste); su CTA final se limpió (sin círculos ni emoji glifo).
- Schemas: `lib/cms-schemas.ts` + `public/admin/config.yml` actualizados con los campos nuevos (foto/cita) para todas esas páginas.
- Verificado: `npx tsc --noEmit` + `npx next build` OK (32 páginas SSG).
- Mockups de referencia: evolución `9bcb1db3-6faa-4bfa-954b-7e44376c9f6c`, libre `a9379b78-3d78-45b2-9a5a-53dcfb7c561a`.

Commit `997182f` completa Inicio (foto en la sección de Misión: `mission.image`) y **reselecciona todas las fotos** priorizando ternura y contexto, sin repetir ninguna entre páginas (Inicio hero: retrato-sonrisa; Inicio Misión: pintura-tinas-color; Quiénes Somos: nino-cubo-rubik —con el banner real de la fundación—; Mi Escuelita Down: bandeja-arena-sensorial; Aula Wawitas: grupo-orejas-conejo; Pasos Firmes: escritura-pizarra-circulos; Impacto: bandeja-cuentas-color; Colabora: juego-mesa-cartas —con una voluntaria—; Familias: juego-agua-sensorial).

Trabajo posterior en `v2` (commits `36f7c0f`..`ee6fc0e`): cita de ProtagonistPhoto como pie de foto (no superpuesta) + prop `focus`; fix del rebote de la barra de accesibilidad (histéresis); **migración completa de emoji→íconos** (`components/ui/Icon.tsx` + `BrandLogo.tsx`) en TODAS las páginas incl. Blog / Contacto / Equipo; logos reales de redes en Contacto/Footer; campo `logo` para aliados y medios + logos reales de UCB / Red Uno / ATB / Página Siete en `public/images/logos/`.

**Pasada visual (sep 2026, plugin Playwright MCP):** se revisaron las 11 páginas en desktop + móvil con navegador real. Resultado: Fraunces OK (no pesado), recortes de foto (`focus`) OK, hero amarillo OK, números de Impacto excelentes, logos renderizando, barra de accesibilidad **no rebota** (verificado). Ajustes aplicados en `696c48c`: heroes de programa sin cita (redundante) + foto más chica; Colabora hero sin "tiempo" huérfano; Contacto correo sin corte; Contacto/Familias hero línea 2 en itálica blanca; Quiénes Somos identidad a 2 columnas; foto de voluntaria más chica. Las "galerías vacías" en screenshots eran lazy-load, no bug.

**Rama `v2` MERGEADA a `develop`** (sep 2026, fast-forward, 11 commits `f27abc7`..`696c48c`). Se pueden borrar la rama `v2` local y sus screenshots (`.playwright-mcp/`, ya en `.gitignore`).

**Pendiente (decisiones de la reunión con la Fundación, no de código):** consentimiento de fotos de menores para web pública, autorización de testimonios, cuenta institucional de donaciones, autorización formal de los logos de aliados. La variante "audaz" del hero quedó anotada, no explorada. Detalles menores anotados sin hacer: foto de voluntaria en Colabora aún deja algo de hueco bajo el form; diagrama de red de Equipo se ve algo sobrio.

### Estilo de trabajo acordado con el usuario
- Consultar antes de cambios no triviales o de criterio; el usuario aprueba con respuestas cortas tipo "sigue" cuando está de acuerdo.
- Verificar **todo** cambio de código con `npx tsc --noEmit -p tsconfig.json` antes de darlo por terminado.
- Preferir fotos reales sobre emoji/texto solo cuando sea posible; nunca usar fotos de stock/IA genéricas.
- Nunca introducir hex crudo — todo color debe trazarse a un token existente.
- Mantener `es`/`en` sincronizados en cualquier archivo de contenido.
- `docs/DESIGN_STANDARD.md` es la fuente de verdad de patrones visuales — leerlo y mantenerlo actualizado si se establecen convenciones nuevas.

### Pendientes menores
- Borrar manualmente la carpeta `_to_delete/Nav.tsx.bak` (quedó ahí por falta de permiso de borrado en la sesión anterior).
- Migración de emoji→SVG en contenido editorial del CMS (valores de "Nuestra Misión", stats, chips de área) — identificada como mejora de mayor alcance, requiere tocar `lib/cms-schemas.ts` y `public/admin/config.yml`, **no iniciada**.
