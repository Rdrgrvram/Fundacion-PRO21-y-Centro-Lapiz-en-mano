# CMS_AUDIT.md — Auditoría técnica de contenido y CMS

> Generado por revisión de backend/arquitectura del código actual (rama `CMS`, agosto 2026).
> Objetivo: catalogar **todo** dato, texto e imagen que hoy está *hardcodeado* en el código y que
> una persona sin conocimientos técnicos (rol Admin) debería poder editar desde Decap CMS.
> Este documento es de diagnóstico — no implementa cambios de código.

---

## 0. Resumen ejecutivo

- El sitio tiene **tres colecciones definidas en Decap CMS** (`blog`, `equipo`, `testimonios`), pero
  **solo `blog` está realmente conectada** a las páginas. `equipo` y `testimonios` son colecciones
  "fantasma": existen en `public/admin/config.yml` y en `lib/content.ts`, pero **ninguna página las
  importa**. Editar un miembro del equipo o un testimonio desde el panel CMS hoy **no cambia nada
  en el sitio publicado**. Ver [§1](#1-hallazgos-críticos-bugs-de-configuración).
- Fuera del blog, **el 100% del contenido visible** (textos, cifras, precios, horarios, datos
  bancarios, redes sociales, equipo, testimonios, FAQs, niveles educativos, áreas terapéuticas...)
  está escrito directamente en los archivos `.tsx` de `app/[lang]/**`, duplicado en español e inglés
  con `es ? '...' : '...'`. Cambiar una cifra de impacto o un número de cuenta hoy requiere editar
  código y hacer un despliegue.
- Hay **4 archivos de logo duplicados/mal nombrados** en `public/icons/` que no se usan en ningún
  componente (solo se usan `logo-pro21.png` y `logo-lapiz.png`).
- `config.yml` apunta el CMS a la rama `branch: main`, pero **esa rama no existe en el remoto**
  (`origin` solo tiene `master`, `develop`, `CMS`, y ramas `feature/*`). Los commits que genere el
  CMS se perderían o fallarían. La producción real vive en `master` (confirmado por
  `origin/HEAD -> origin/master`), tal como indicó el usuario.
- `config.yml` también apunta a `repo: ucb-sistemas/fundacion-pro21`, un repo que no existe — el
  repo real es `Rdrgrvram/Fundacion-PRO21-y-Centro-Lapiz-en-mano`.
- El sitio es **bilingüe (es/en)** pero Decap CMS, tal como está configurado, **no tiene ningún
  mecanismo de traducción** (ni i18n widget, ni campos duplicados `_es`/`_en`). Cualquier colección
  nueva debe decidir cómo maneja el segundo idioma antes de construirse.
- Existen componentes ya preparados para consumir CMS (`components/sections/Hero.tsx`,
  `ProgramCard.tsx`, `TeamMember.tsx`, `Testimonial.tsx`, `ImpactStat.tsx`, `components/ui/Card.tsx`,
  `Badge.tsx`, `ContactForm.tsx`) que **ninguna página importa**. El equipo de desarrollo construyó
  las páginas reales con JSX/arrays inline en su lugar. Antes de diseñar colecciones nuevas hay que
  decidir si se recupera esta capa de componentes o se elimina como código muerto.

---

## 1. Hallazgos críticos (bugs de configuración)

| # | Hallazgo | Archivo | Impacto |
|---|---|---|---|
| 1 | Colecciones `equipo` y `testimonios` del CMS no se leen en ninguna página | `public/admin/config.yml:39-68`, `lib/content.ts:63-108` | Editar desde el panel no publica nada — confunde al admin |
| 2 | `backend.branch: main` no existe en el remoto | `public/admin/config.yml:8` | El CMS no podría hacer commits/PRs válidos |
| 3 | `backend.repo` apunta a un repo inexistente (`ucb-sistemas/...`) | `public/admin/config.yml:7` | OAuth de GitHub fallaría al autenticar |
| 4 | Producción real = `master`, pero nada en el repo lo declara explícitamente (ni `vercel.json`, ni CLAUDE.md, que dice "main (producción)") | — | Riesgo de desplegar la rama equivocada |
| 5 | Página `equipo/page.tsx` tiene un array `team` de 9 personas **hardcodeado con fotos, bios, especialidades** — totalmente desacoplado de `content/equipo/*.md` | `app/[lang]/equipo/page.tsx:110-237` | Cambiar un profesional requiere un desarrollador |
| 6 | Testimonios se repiten hardcodeados en 3 lugares distintos con textos ligeramente distintos (home, impacto) en vez de una sola fuente | `app/[lang]/page.tsx:69-91`, `app/[lang]/impacto/page.tsx:49-77` | Inconsistencia de contenido entre páginas |
| 7 | El número de WhatsApp (`59170106276`) y el ícono SVG están **pegados 15+ veces** en distintos archivos en vez de un solo componente/constante | ver `Grep` de `wa.me/59170106276` | Cambiar el número exige tocar cada archivo |
| 8 | Datos bancarios de donación (banco, cuenta, titular) hardcodeados en código fuente, con nota "se actualizará una vez concluido el trámite institucional" | `lib/contact.ts:12-17` | Dato sensible/temporal viviendo en el repo en vez de en CMS |
| 9 | Componentes de sección reutilizables (`Hero`, `ProgramCard`, `TeamMember`, `Testimonial`, `ImpactStat`, `ContactForm`, `Card`, `Badge`) no están importados por ninguna página — código muerto | `components/sections/*`, `components/ui/Card.tsx`, `Badge.tsx` | Duplicación de esfuerzo si se ignoran al planear el CMS |
| 10 | Logos duplicados con nombres inconsistentes, solo 2 de 6 archivos se usan realmente | `public/icons/` | Limpieza necesaria antes de documentar el flujo de subida de imágenes |

---

## 2. Inventario de contenido hardcodeado, por página

Leyenda de "Duplica" = el mismo dato aparece hardcodeado en más de un archivo (candidato a
"Ajustes globales" en el CMS en vez de campo por página).

### 2.1 Global / Ajustes del sitio (candidato a **singleton "Configuración del sitio"**)

| Dato | Dónde vive hoy | Duplica en |
|---|---|---|
| Teléfono / WhatsApp (`70106276`, `+591 70106276`) | `lib/contact.ts` (parcial) + hardcodeado en 15+ archivos como texto plano y en `href="https://wa.me/59170106276"` | home, mi-escuelita-down, aula-wawitas, pasos-firmes, equipo, impacto, colabora, familias, contacto, blog, blog/[slug] |
| Mensaje por defecto del botón flotante de WhatsApp | `lib/i18n/es.ts:54`, `en.ts` | — |
| Email de contacto (`fundacionpro211@gmail.com`) | `lib/contact.ts:5` | `contacto@fundacionpro21.org` aparece en `.env.example`, `route.ts` y `colabora/page.tsx:749` (**inconsistencia**: 3 emails distintos en el repo) |
| Dirección física | `lib/contact.ts:2` | `contacto/page.tsx` (texto genérico "La Paz, Bolivia" repetido) |
| Redes sociales (Facebook, Instagram, TikTok ×2) | `lib/contact.ts:6-11` | `contacto/page.tsx:41-43` tiene una URL de Facebook **distinta** a la de `lib/contact.ts` (no usa la constante) |
| Datos bancarios (banco, cuenta, titular, nota) | `lib/contact.ts:12-17` | `colabora/page.tsx` los renderiza vía `CONTACT.donation` |
| Horario de atención (L-V, sábados, domingos) | `contacto/page.tsx:34-38` | no está en `lib/contact.ts` |
| Logos (PRO-21, Lápiz en Mano) | `public/icons/logo-pro21.png`, `logo-lapiz.png` | usados en `Header`, `Footer`, `quienes-somos` |
| Favicon / imagen Open Graph | No existen en el repo | pendiente (ver `docs/CONTENT.md:24-29`) |

**Nota:** el objeto `lib/contact.ts` ya es un buen punto de partida — es el único archivo de "config
global" real que existe. La colección CMS de ajustes del sitio debería reemplazar ese archivo.

### 2.2 Inicio (`app/[lang]/page.tsx`)

| Bloque | Campos a editar | Líneas |
|---|---|---|
| Hero | título (es/en), subtítulo, texto de los 2 botones | 116-154 |
| Cifras rápidas (4) | ícono emoji, valor, etiqueta ×2 idiomas | 62-67 |
| Tarjetas de programas (3) | ícono, badge, título, descripción, rango de edad — **título "Mi Escuelita Down" ya coincide con el nombre real del programa; debería ser una referencia, no texto repetido** | 17-60 |
| Bloque "Misión" resumen | texto corto + 4 tarjetas de valores (ícono, título, descripción) | 241-282 |
| Testimonios (3) | cita, nombre familia, programa | 69-91 |
| Vista previa de equipo | texto + 6 chips de especialidad (ícono + etiqueta) | 331-348 |
| CTA final | título, texto | 359-390 |

### 2.3 Quiénes Somos (`app/[lang]/quienes-somos/page.tsx`)

| Bloque | Campos | Líneas |
|---|---|---|
| Hero | título, subtítulo | 80-98 |
| 2 tarjetas de identidad (PRO-21 / Lápiz en Mano) | logo, nombre, tagline, descripción | 114-153 |
| Misión / Visión / Objetivo (3 tarjetas) | ícono, texto largo ×2 idiomas | 176-226 |
| **8 valores institucionales** | ícono, nombre, descripción | 25-34 |
| **Línea de tiempo (7 hitos, 2021-2026)** | año, título, descripción, ícono, color | 36-44 |
| Vista previa de equipo | 6 chips de especialidad | 46-53 |

> Coincide con la lista pendiente en `docs/CONTENT.md:77-87` ("8 valores") — ya están escritos en
> código pero **no en el documento de contenido**, así que quien complete `CONTENT.md` no sabe que
> ya existen. Recomendación: usar el código como fuente de verdad y luego migrar a CMS.

### 2.4 Programas — Mi Escuelita Down / Aula Wawitas / Pasos Firmes

Los tres programas comparten la misma estructura (útil para diseñar **una sola colección
"Programas" con 3 entradas** en vez de 3 páginas independientes hardcodeadas):

| Bloque común | Mi Escuelita Down | Aula Wawitas | Pasos Firmes |
|---|---|---|---|
| Hero (badge, título, subtítulo) | líneas 162-219 | 157-215 | 160-218 |
| Stats rápidos (4) | 221-239 | 217-235 | 220-238 |
| Bloque temático 1 — "Áreas de terapia" (4 tarjetas: ícono, título, descripción, lista de ítems) | 241-285 | "Pilares" (4) 237-261 | "Dificultades atendidas" (6, acordeón) 240-281 |
| Bloque temático 2 — tabs con paneles (niveles/modalidades) | "Niveles educativos" (3 tabs) 287-347 | "Niveles" (3 tabs) 263-323 | "Modalidades de atención" (4 tabs) 283-337 |
| Bloque temático 3 | "Servicios complementarios" (4) 349-376 | "Áreas de estimulación" (4) 325-356 | "Proceso de intervención" (6 pasos) 339-382 |
| "Cómo ingresar" (4 pasos) | 378-404 | "Cómo inscribir" (4 pasos) 358-384 | (fusionado arriba) |
| CTA final | 406-437 | 386-417 | 384-415 |

Cada tarjeta/tab tiene: ícono (emoji), color de acento, título, descripción larga, y a veces una
lista de 3-4 ítems cortos — **candidato claro a un widget `list` de objetos en Decap**.

### 2.5 Equipo (`app/[lang]/equipo/page.tsx`)

| Bloque | Campos | Líneas |
|---|---|---|
| Hero | título, subtítulo | 258-307 |
| Stats (4) | ícono, número, etiqueta | 239-244 |
| "Filosofía de trabajo" (4 tarjetas) | ícono, título, descripción | 349-354 |
| **6 áreas de especialidad** (filtro interactivo) | id, nombre, ícono, color, descripción, lista de competencias, programas relacionados | 17-108 |
| **9 miembros del equipo** ⚠️ ya visto en §1.5 | nombre, cargo, especialidad, bio, foto, área, color | 110-237 |
| Diagrama de red organizacional | reutiliza `areas` (sin datos propios) | 522-615 |
| **3 voluntarios** (solo nombre) | `['Paola', 'Wanda', 'Alejandra']` | 246 |
| CTA "únete al equipo" | título, texto | 656-690 |

### 2.6 Impacto (`app/[lang]/impacto/page.tsx`)

| Bloque | Campos | Líneas |
|---|---|---|
| Hero | título, subtítulo | 102-143 |
| **6 cifras de impacto** (con contador animado) | ícono, valor, sufijo, etiqueta, color | 40-47 |
| **3 testimonios** (carrusel) — duplican los del home con texto distinto | cita, familia, programa, emoji, color | 49-77 |
| **4 informes anuales** (2022-2025) | año, título, descripción, estado ("Disponible") — hoy el botón de "ver informe" abre WhatsApp, no un PDF real | 79-84 |
| **4 apariciones en medios** | medio, tipo, descripción, año, color | 86-91 |
| Desglose "qué incluyen los informes" (4 ítems) | ícono, título, descripción | 328-331 |
| **Galería de fotos (8 espacios)** — hoy son **emojis decorativos**, no fotos reales | ícono, tamaño, color de fondo | 437-456 |
| Categorías de filtro de galería (5) | — | 93-95 |
| CTA final | título, texto | 468-501 |

> La galería de "impacto" es el mayor vacío de imágenes reales del sitio: 8 tarjetas con emojis
> placeholder (🎨🤸📖🧩🎵👶🌟🧠) en vez de fotografías. Es la sección que más se beneficiaría de
> subida de imágenes vía CMS apenas se tengan las autorizaciones firmadas (ver `docs/CONTENT.md:129`).

### 2.7 Colabora (`app/[lang]/colabora/page.tsx`)

| Bloque | Campos | Líneas |
|---|---|---|
| Hero + 4 "impact highlights" | número, etiqueta, ícono | 257-273 |
| **4 niveles de donación** (Semilla/Acompañante/Guardián/Libre) | monto en Bs, equivalente USD, etiqueta, ícono, color, impacto (texto), lista de 3 ítems, flag "featured" | 53-103 |
| **3 métodos de pago** | ícono, título, líneas de texto (usa `CONTACT.donation`) | 105-135 |
| **6 áreas de voluntariado** | ícono, título, descripción | 137-144 |
| Formulario de inscripción a voluntariado (funcional, envía a `/api/contact`) | — | 25-51 |
| **4 tipos de alianza** (empresas, universidades, cooperación, medios) | ícono, título, descripción, lista de beneficios | 146-187 |
| **4 aliados actuales** (UCB, Red Uno, ATB, Página Siete) | nombre, tipo, ícono | 697-711 |
| CTA final | título, texto, email | 722-756 |

### 2.8 Familias (`app/[lang]/familias/page.tsx`)

| Bloque | Campos | Líneas |
|---|---|---|
| Hero + carta de bienvenida | texto largo, firma | 122-169 |
| **4 sesiones virtuales gratuitas** | título, ícono, descripción, frecuencia, duración, color | 19-64 |
| **4 elementos de "red de apoyo"** | título, ícono, descripción, color | 66-71 |
| **6 guías descargables** | título, ícono, descripción, nº de páginas, programa asociado, color — hoy el botón "Solicitar PDF" abre WhatsApp; **no hay PDFs reales alojados** | 73-80 |
| **8 preguntas frecuentes** | pregunta, respuesta | 82-90 |
| CTA final | título, texto | 428-462 |

### 2.9 Contacto (`app/[lang]/contacto/page.tsx`)

| Bloque | Campos | Líneas |
|---|---|---|
| Hero | título, subtítulo | 71-96 |
| **7 motivos de contacto** (chips seleccionables) | etiqueta, ícono, color | 18-26 |
| 3 tarjetas de contacto rápido (WhatsApp/Email/Teléfono) | usa `CONTACT` pero horarios y textos secundarios hardcodeados | 28-32 |
| Formulario de mensaje (visual only — **no envía a `/api/contact`**, solo simula éxito con `setFormSent(true)`) ⚠️ | — | 220-226 |
| Horarios (3 filas) | día, horario, activo/inactivo — **duplica** los de §2.1 con texto ligeramente distinto | 34-38 |
| Redes sociales (3, mezcla `CONTACT.social` con URL de Facebook hardcodeada aparte) | — | 40-44 |
| **4 FAQs cortas** | pregunta, respuesta, ícono, color | 46-51 |
| Frase de cierre institucional | texto | 434-437 |

> ⚠️ **Bug funcional, no solo de CMS**: el formulario principal de "Contacto" nunca hace `fetch` al
> API — solo cambia estado local. El formulario de voluntariado en `colabora/page.tsx` sí funciona.
> Vale la pena señalarlo aparte del trabajo de CMS.

### 2.10 Blog (`content/blog/*.md`, `app/[lang]/blog/**`)

Es la **única sección ya conectada correctamente al CMS**. Campos definidos en `config.yml:24-36`:
título, fecha, imagen destacada, resumen, cuerpo (markdown). Único punto débil: no soporta inglés
(no hay campo ni colección paralela para `en`), y el layout de tarjeta siempre muestra un emoji
📰 en vez de la imagen subida (`image` del frontmatter no se renderiza en `blog/page.tsx:93-98`,
solo se usa en `blog/[slug]/page.tsx` tampoco — revisar, parece un campo capturado pero no pintado
en ninguna vista).

### 2.11 Layout / Metadata (`app/layout.tsx`, `app/[lang]/layout.tsx`)

Título y descripción SEO globales están hardcodeados por página en `generateMetadata` — no hay
forma de editarlos desde el CMS. Cada página define su propio `<title>`/`<meta description>`.

---

## 3. Inventario de imágenes

### 3.1 Imágenes reales existentes hoy

| Carpeta | Archivos | Uso actual |
|---|---|---|
| `public/images/equipo/` | 7 fotos (`ana-copa.png`, `belen-lazcano.jpg`, `benita-rosales.jpg`, `megan.jpg`, `monica-medina.jpg`, `wara-valdivia.jpg`, `yasmanni-peralta.png`) | Referenciadas por ruta absoluta en el array `team` de `equipo/page.tsx` (2 miembros sin foto: `luis-machicado`, `helan-medrano` → placeholder de iniciales) |
| `public/images/wawitas/` | 4 fotos (`learning-activity.png`, `outdoor-play.png`, `sensory-room.png`, `therapy-session.png`) | **No están referenciadas en ningún componente actual** — código muerto o pendiente de uso (probablemente destinadas a `aula-wawitas/page.tsx`, que hoy no muestra ninguna foto real) |
| `public/images/actividades/` | 4 fotos (`estimulacion-sensorial.jpg`, `mercado-autonomia.jpg`, `psicomotricidad-bolos.jpg`, `trazos-cognitivos.jpg`) | **Tampoco referenciadas en código** — mismo caso, candidatas naturales para la galería de `impacto/page.tsx` que hoy usa emojis |
| `public/icons/` | `logo-pro21.png`, `logo-lapiz.png` (en uso) + `LOGO  FUN PRO-21.png`, `LOGO LAPIZ EN MANO.jpg`, `LOGO_LAPIZ_EN_MANO PNG.png`, `LOGO__FUN_PRO-21...png` (duplicados sin usar, nombres con espacios/mayúsculas) | Limpiar antes de documentar convención de nombres para el CMS |
| `public/admin/config.yml` media_folder | `public/images/uploads` | Carpeta de destino configurada para subidas del CMS — **no existe todavía en el repo** (se crea al subir la primera imagen) |

**Hallazgo importante:** hay **8 fotos reales ya en el repo** (`wawitas/` + `actividades/`) que
**no se usan en ninguna página** — es contenido visual real ya disponible que simplemente no fue
cableado a la UI. Antes de pedir más fotos a la fundación, vale la pena usar estas.

### 3.2 Dónde deben vivir las imágenes (decisión del usuario)

El usuario indicó explícitamente: **las imágenes se guardan en `public/`**, no en Cloudflare R2.
Esto **contradice** lo planeado en `.env.example:10-18` y probablemente en `docs/ARCHITECTURE.md`
(no releído en este audit, pero referenciado en CLAUDE.md como la fuente de la decisión de R2).
Antes de construir las colecciones del CMS hay que resolver esta discrepancia porque cambia:

- `media_folder`/`public_folder` en `config.yml` (ya apunta a `public/images/uploads`, es decir
  **ya está alineado con "todo en `public/`"**, no con R2 — el `.env.example` con variables de R2
  parece ser aspiracional/no implementado).
- El límite de 10GB gratis de R2 deja de aplicar; en su lugar aplican los límites de tamaño de
  repo/build de Vercel Hobby y el límite de Git LFS si se llegara a necesitar.
- Cada imagen subida desde el CMS se commitea directamente al repositorio Git — bueno para
  simplicidad (cero configuración adicional), pero hay que fijar un límite de peso por imagen
  (recomendado: máx. ~500KB por foto, exigir formato WebP/JPEG optimizado) para no inflar el
  repositorio con el tiempo.

**Recomendación:** actualizar `docs/ARCHITECTURE.md` y `.env.example` para reflejar la decisión de
`public/` y marcar las variables `CLOUDFLARE_R2_*` como no usadas / eliminarlas, para no confundir
a futuros desarrolladores.

---

## 4. Propuesta de colecciones Decap CMS (solo diseño, sin implementar)

Basado en el inventario anterior, la estructura de colecciones que cubriría el 100% del contenido
editable sería:

| Colección propuesta | Tipo | Reemplaza / cubre |
|---|---|---|
| `site_settings` | **Singleton** (`files:`, no `folder:`) | `lib/contact.ts` completo + horarios + WhatsApp + emails (unifica los 3 emails distintos encontrados) |
| `home` | Singleton | Hero, cifras rápidas, testimonios destacados, bloque de misión + valores cortos |
| `about` (Quiénes Somos) | Singleton | Tarjetas de identidad, misión/visión/objetivo, 8 valores, línea de tiempo (7 hitos) |
| `programs` | Folder collection, 3 entradas fijas (slugs `mi-escuelita-down`, `aula-wawitas`, `pasos-firmes`) | Hero, stats, bloques temáticos (áreas/niveles/pilares/dificultades/modalidades), pasos de ingreso, CTA — mismo shape para los 3, ver §2.4 |
| `equipo` | Folder collection (ya existe, **hay que arreglar la página para que la lea**) | Reemplaza el array hardcodeado de 9 personas — agregar campos `area` (relation/select a las 6-7 áreas) y `order` |
| `team_areas` | Folder o singleton con `list` | Las 6-7 áreas de especialidad usadas en `equipo/page.tsx` |
| `testimonios` | Folder collection (ya existe, **hay que arreglarla igual**) | Unifica los testimonios duplicados de home/impacto en una sola fuente; agregar campo `featured_home: boolean` y `featured_impacto: boolean` |
| `impact` | Singleton | 6 cifras, 4 informes anuales (+ campo `file` tipo `widget: file` para el PDF real), 4 apariciones en medios, galería (usar `wawitas/` y `actividades/` ya existentes + subida futura) |
| `collaborate` | Singleton | 4 niveles de donación, 3 métodos de pago (ligado a `site_settings.donation`), 6 áreas de voluntariado, 4 tipos de alianza, aliados actuales |
| `families` | Singleton | 4 sesiones virtuales, 4 red de apoyo, 6 guías descargables (con `widget: file` para el PDF real en vez de "pedir por WhatsApp"), 8 FAQs |
| `contact_page` | Singleton | 7 motivos, 4 FAQs cortas (puede reusar `families.faqs` con filtro) |
| `blog` | Folder collection (ya existe, funciona) | Sin cambios estructurales; agregar soporte real de imagen destacada en el render |
| `volunteers` | Folder collection simple | Lista de voluntarios actuales (hoy solo 3 nombres hardcodeados) |
| `allies` | Folder collection simple | Aliados actuales mostrados en `colabora` |

### Sobre bilingüismo

Decap CMS soporta **i18n nativo** (`i18n:` a nivel de config + `i18n: {structure: multiple_files}`
por colección), que generaría un archivo `.es.md`/`.en.md` por entrada y permitiría al admin
cambiar de pestaña de idioma dentro del mismo formulario. Es la opción recomendada frente a
duplicar cada campo como `title_es`/`title_en`, porque escala mejor a más idiomas y separa
claramente el contenido por idioma sin ensuciar cada campo del formulario.

---

## 5. UX del panel de administración (rol Admin)

Recomendaciones pensadas para un administrador **sin conocimientos técnicos** (perfil real: staff
de la fundación, no estudiantes de sistemas):

1. **Agrupar visualmente por sección del sitio, no por tipo de dato.** El menú lateral de Decap ya
   respeta el orden de `collections:` en `config.yml` — ordenar así: Configuración del sitio →
   Inicio → Quiénes Somos → Programas → Equipo → Impacto → Colabora → Familias → Contacto → Blog.
   Esto imita la navegación real del sitio (`Nav.tsx`) y evita que el admin tenga que "traducir"
   mentalmente de una sección de UI a un nombre técnico de colección.
2. **Usar `preview_path` en cada colección** (como ya hace `blog`) para que el admin vea el botón
   "Ver en el sitio" y confirme visualmente el cambio antes de publicarlo. Actualmente solo `blog`
   lo tiene configurado.
3. **Campos `hint`** en español simple para cada campo (ej. en el nivel de donación: *"Monto en
   bolivianos, sin el símbolo Bs"*) — reduce errores de formato sin necesitar soporte técnico.
4. **Widgets `list` de objetos** (no `markdown` libre) para todo lo que hoy son arrays de tarjetas
   (valores, niveles, testimonios, guías, FAQs) — así el admin llena campos con etiquetas claras en
   vez de editar JSON o HTML crudo.
5. **Límite de campos obligatorios mínimo**: la mayoría del contenido actual tiene emoji + color +
   texto. El color casi siempre es uno de los 3 colores institucionales — conviene un
   `widget: select` con las 3 opciones (`#ffc500`, `#229cc2`, `#8c3cbd`) en vez de un color picker
   libre, para mantener consistencia de marca sin que el admin tenga que memorizar hexadecimales.
6. **Editorial workflow (`publish_mode: editorial_workflow`)**: dado que la producción vive en
   `master` y el CMS necesita apuntar a una rama real, conviene activar el flujo editorial de Decap
   (borrador → revisión → publicado) para que un cambio del admin genere un PR revisable en vez de
   un commit directo a la rama de producción — reduce el riesgo de publicar un typo o un dato
   bancario incorrecto sin revisión.
7. **Media library organizada por subcarpeta** (`public/images/uploads/equipo/`,
   `.../actividades/`, `.../blog/`) usando `media_library` con `choose_url: false` y carpetas por
   colección (Decap soporta `media_folder` a nivel de colección, no solo global) — evita que 50
   imágenes subidas por distintos admins terminen todas sueltas en una sola carpeta plana.
8. **Placeholders reales en `preview_path`**: como varias páginas usan iniciales o emojis cuando
   falta una foto (ver `equipo/page.tsx:469-480`), documentar en el `hint` del campo `photo` que es
   opcional y qué pasa si se deja vacío — evita que el admin piense que el sitio está roto.

---

## 6. Próximos pasos sugeridos (no ejecutados en esta auditoría)

1. Decidir y corregir `backend.repo` y `backend.branch` en `config.yml` (bloqueante — sin esto el
   CMS no funciona en absoluto).
2. Decidir el enfoque de bilingüismo en Decap (i18n nativo vs. campos duplicados) antes de crear
   colecciones nuevas.
3. Conectar `equipo/page.tsx` a `getAllTeamMembers()` (ya existe en `lib/content.ts`) para que la
   colección `equipo` deje de ser fantasma — es el fix de mayor impacto con menor esfuerzo.
4. Unificar el número de WhatsApp/email/redes en un único origen de datos (`site_settings`) y
   reemplazar los 15+ literales repetidos por una referencia a ese dato.
5. Diseñar el schema exacto (`fields:`) de cada colección de la tabla en [§4](#4-propuesta-de-colecciones-decap-cms-solo-diseño-sin-implementar)
   antes de tocar código — esto es lo que corresponde a la siguiente fase ("el desarrollo") que el
   usuario indicó que se abordará después de esta auditoría.
