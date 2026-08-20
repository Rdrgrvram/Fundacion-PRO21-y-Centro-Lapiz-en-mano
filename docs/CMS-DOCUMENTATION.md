# CMS_DEVELOPMENT_PLAN.md — Plan de desarrollo: wiring completo de Decap CMS (v2)

> Complementa `docs/CMS_AUDIT.md` (diagnóstico) con el plan de implementación: diseño técnico,
> esquemas de datos, UI/UX del panel admin, código limpio y roadmap por fases. Rama base: `CMS`.
> **v2**: revisión profesional de la v1 — ver §0.1 para los hallazgos y qué cambió.
> Este documento es de planificación — la implementación se ejecuta fase por fase, en PRs separados.

---

## 0. Resumen ejecutivo y decisiones de arquitectura

Seis decisiones de producto/arquitectura ya confirmadas por el usuario, sobre las que se diseña todo
lo demás:

| # | Decisión | Justificación |
|---|---|---|
| 1 | **Bilingüe con pestaña ES/EN en el editor** | `i18n` nativo de Decap. Un único borrador compartido en memoria por entrada — cambiar de pestaña no descarta nada. |
| 2 | **Publicación con revisión (`editorial_workflow`)** | Borrador → PR → revisión de un desarrollador antes de llegar a producción. |
| 3 | **Desarrollo en la rama `CMS`** | Se integra a `master` (producción real) por PR, fase por fase (ver ramas por fase en §9). |
| 4 | **Adaptar componentes existentes** | `components/sections/*` y `components/ui/{Card,Badge}.tsx` se adaptan, no se reescriben desde cero. |
| 5 | **100% GitHub, sin plataformas externas** | Ver §0.1 y §7 — esta versión endurece esta regla más allá de lo que cumplía la v1. |
| 6 | **Email oficial pendiente** | `TODO` explícito en `site_settings.email` hasta que la fundación lo confirme; no bloquea desarrollo, solo bloquea publicar ese campo. |

### 0.1 Evaluación profesional de la v1 — qué cambia en esta versión

Se revisó la v1 con criterio de arquitecto/tech lead, con foco específico en la instrucción del
usuario de **no depender de ninguna plataforma externa a GitHub** (más allá de Vercel, ya aprobado
como hosting en `CLAUDE.md` antes de este trabajo) y en prácticas de ingeniería profesional
(validación de datos, seguridad, accesibilidad, código limpio, trazabilidad). Resultado:

| # | Hallazgo | Severidad | Qué cambia en v2 |
|---|---|---|---|
| 1 | `public/admin/index.html:12` carga Decap CMS desde `unpkg.com` (CDN de terceros) **en producción, en cada carga del panel** — es una dependencia real de una plataforma externa, no solo un detalle de implementación | 🔴 Alta — viola directamente la instrucción de "solo GitHub, sin plataformas externas" | §2 (nueva): `decap-cms-app` pasa a ser una dependencia npm normal, compilada por el mismo build de Next. Cero llamadas a servicios externos en runtime; todo queda versionado en `package-lock.json` igual que el resto del proyecto |
| 2 | Los campos de imagen (`photo`, `logo_*`, `image`) no tenían un campo de texto alternativo — el sitio ya invierte en accesibilidad (`AccessibilityBar.tsx`) pero el CMS no lo sostenía | 🔴 Alta (accesibilidad) | Cada campo de imagen en cada esquema gana un campo hermano `*_alt` (string, `i18n: true`, obligatorio) |
| 3 | El SEO (`generateMetadata` por página) seguía 100% hardcodeado en cada `page.tsx`, sin ninguna fase asignada para arreglarlo — un vacío real de "no omitir nada" | 🟡 Media | Cada singleton de página gana un objeto `seo: {title, description}` y se asigna una tarea explícita por fase (§6) |
| 4 | No había validación del contenido que entra por el CMS antes de llegar al render — un YAML mal formado o un campo vacío que el componente no espera rompería el build o, peor, pasaría silenciosamente | 🔴 Alta | §3.1 (nueva): esquemas `zod` paralelos a cada interfaz TypeScript, validados dentro de cada getter de `lib/cms.ts` — el build falla temprano, con un mensaje claro señalando el archivo y campo exactos |
| 5 | El plan asumía que un admin no técnico retipearía ~200 campos a mano en el panel para la migración inicial — lento y propenso a error de transcripción | 🔴 Alta | §3.2 (nueva): scripts de migración de una sola ejecución (`scripts/migrate-*.ts`) que leen los arrays hoy hardcodeados y generan los archivos `content/*` automáticamente. El admin arranca con datos reales, no con formularios vacíos |
| 6 | Sin estrategia de ramas por fase ni criterio de aceptación (Definition of Done) explícito por fase | 🟡 Media | §9: cada fase = una rama `feature/cms-fase-N-<slug>` sobre `CMS`, con checklist de aceptación en la propia tabla de roadmap |
| 7 | Sin plan para el caso "build nuevo antes de que exista contenido real" (primer deploy de una fase, archivo `content/*` todavía no migrado) | 🟡 Media | Los scripts de migración (hallazgo #5) se ejecutan como parte de la misma fase que introduce el esquema — nunca se hace deploy de un esquema sin su contenido semilla ya commiteado |
| 8 | `lib/contact.ts` quedaría como código muerto "deprecado" indefinidamente tras la migración | 🟢 Baja (limpieza) | Se elimina por completo al cierre de la Fase 1 — cero código muerto tolerado, consistente con la política de este documento (§8) |
| 9 | Sin restricción de acceso real al panel `/admin` más allá del propio login de GitHub — cualquier cuenta de GitHub puede *intentar* entrar | 🟡 Media (seguridad) | §7 añade una nota explícita de hardening: colaboradores del repo limitados a los admins reales, y por qué eso —no un servicio externo de auth— es el control de acceso real aquí |
| 10 | `docs/ARCHITECTURE.md`, `docs/CONTENT.md`, `.env.example` y `README` quedarían desactualizados tras el wiring, sin tarea asignada | 🟢 Baja | Nueva **Fase 7 — Documentación y cierre** (§9) |
| 11 | Sin mención de herramientas de calidad de código más allá de `eslint-config-next` ya presente (no hay Prettier ni hook de pre-commit) | 🟢 Baja | §8 (nueva): se añade Prettier + `lint-staged`/Husky como devDependencies — igual que `js-yaml`, cero costo, cero servicio externo |

**Aclaración sobre "solo GitHub, sin plataformas externas"**: el stack del proyecto ya incluye
Vercel como hosting (decisión previa, documentada en `CLAUDE.md`, no introducida por este plan). La
regla que gobierna este documento es: **ninguna pieza nueva de infraestructura fuera de
GitHub + Vercel + npm** (nada de Netlify, Auth0, proxies OAuth de terceros, ni — la corrección de
esta versión — CDNs de terceros como `unpkg.com` para código que corre en producción). Si esta
lectura no es la que el usuario tenía en mente, es el punto a corregir antes de iniciar la Fase 0.

---

## 1. Diseño de `public/admin/config.yml`

### 1.1 Bloques base

```yaml
backend:
  name: github
  repo: Rdrgrvram/Fundacion-PRO21-y-Centro-Lapiz-en-mano
  branch: master
  # base_url: apunta a la Vercel Function de OAuth propia — ver §7
  # local_backend: true   # solo local, nunca commiteado activo — usar con `npx decap-server`

publish_mode: editorial_workflow

media_folder: public/images/uploads
public_folder: /images/uploads
media_library:
  config:
    max_file_size: 512000   # ~500KB por imagen — evita inflar el repo Git con el tiempo

i18n:
  structure: multiple_files
  locales: [es, en]
  default_locale: es

locale: es
```

**Por qué `structure: multiple_files`** (genera `<slug>.<locale>.<ext>`, ej.
`mi-escuelita-down.es.md` / `.en.md`) y no `single_file` ni `multiple_folders`:
- Es el cambio más pequeño sobre el patrón que ya usa el repo (`content/blog/*.md`,
  `content/equipo/*.md`, `content/testimonios/*.md` ya son un archivo por entrada en carpetas
  planas) — solo hace falta parsear un sufijo de idioma en el nombre de archivo.
- Con `editorial_workflow`, cada PR debe ser fácil de revisar: editar solo el texto en inglés toca
  *solo* el archivo `.en.md` — diff limpio y acotado. `single_file` generaría un diff sobre todo el
  objeto anidado por cualquier cambio de una palabra.
- `multiple_folders` duplicaría el árbol de carpetas y rompería la convención plana que ya usan
  `lib/content.ts` y sus `fs.readdirSync`.

> ⚠️ **Excepción confirmada en la práctica (Fase 3, migración de Inicio)**: las colecciones tipo
> `files:` (los singletons de página — `home`, y luego `about`, `impact`, `collaborate`, `families`,
> `contact_page`, `site_settings`) **solo soportan `structure: single_file`**, no
> `multiple_files` — es una limitación documentada de Decap, no un error de configuración. Cada una
> de esas colecciones necesita pisar el `structure` global así:
> ```yaml
> - name: home
>   i18n: { structure: single_file, locales: [es, en] }
>   files: [...]
> ```
> Esto guarda un solo archivo (`content/settings/home.yml`) con `es:`/`en:` anidados, en vez de
> `home.es.yml`/`home.en.yml`. `lib/cms.ts`'s `getSingleton()` ya está escrito para este formato.

**Convención de `i18n` por campo:**
- `i18n: true` → texto real traducible (títulos, descripciones, etiquetas, **y ahora también todo
  campo `*_alt`** — ver hallazgo #2).
- Sin `i18n` → campo visual/estructural que no debe preguntarse dos veces (íconos emoji, `color`
  select, `order`, la imagen en sí, PDFs, fechas).
- `i18n: duplicate` → nombres propios que arrancan iguales pero pueden divergir después (nombre de
  una persona, "Mi Escuelita Down").

**Selects de color de marca**: cualquier campo `color` usa `widget: select, options: [primary,
secondary, accent]` (nunca color picker libre), mapeado en el frontend a los 3 tokens reales de
`tailwind.config.js`:

| Token | Hex |
|---|---|
| `primary` | `#ffc500` |
| `secondary` | `#229cc2` |
| `accent` | `#8c3cbd` |

> ⚠️ Tailwind JIT solo detecta clases **literales** en el código fuente. Un valor interpolado como
> `` `bg-${color}` `` no genera la clase en el build de producción. Todo componente que consuma
> `color`/`layout` del CMS lo resuelve vía un `Record<string, string>` estático — mismo patrón que
> ya usa `components/ui/Badge.tsx`.

**Regla nueva de accesibilidad**: todo campo `widget: image` va acompañado, en el mismo objeto, de
un campo `*_alt` de texto:

```yaml
- { label: Foto, name: photo, widget: image, required: false }
- { label: "Texto alternativo de la foto", name: photo_alt, widget: string, i18n: true, hint: "Describe la imagen para personas que usan lector de pantalla — ej. 'Belén Lazcano sonriendo en el consultorio de fisioterapia'" }
```

### 1.2 Tres esquemas representativos (cubren los 3 patrones de las 13 colecciones/singletons)

**Patrón A — Singleton con objetos anidados: `site_settings`** (reemplaza `lib/contact.ts`
íntegramente — ver §8, ese archivo se elimina, no se deja como "deprecado")

```yaml
collections:
  - name: site_settings
    label: "⚙️ Configuración del sitio"
    files:
      - name: general
        label: Datos de contacto y redes
        file: content/settings/site.yml   # → site.es.yml / site.en.yml
        fields:
          - { label: "WhatsApp (código de país sin +, ej. 59170106276)", name: whatsapp_number, widget: string, pattern: ['^[0-9]{8,15}$', "Solo números, sin espacios ni símbolos"] }
          - { label: "Mensaje por defecto del botón flotante", name: whatsapp_default_message, widget: string, i18n: true }
          - { label: "Email de contacto", name: email, widget: string, pattern: ['^[^@]+@[^@]+\.[^@]+$', "Debe ser un email válido"], hint: "⚠️ Pendiente de confirmación por la fundación — no publicar sin verificar", default: "TODO-confirmar-email@fundacionpro21.org" }
          - { label: "Dirección física", name: address, widget: text, i18n: true }
          - label: Redes sociales
            name: social
            widget: object
            fields:
              - { label: Facebook, name: facebook, widget: string, required: false }
              - { label: Instagram, name: instagram, widget: string, required: false }
              - { label: "TikTok — PRO-21", name: tiktok_pro21, widget: string, required: false }
              - { label: "TikTok — Lápiz en Mano", name: tiktok_lapiz, widget: string, required: false }
          - label: "Datos bancarios (donaciones)"
            name: donation_bank
            widget: object
            fields:
              - { label: Banco, name: bank, widget: string }
              - { label: "Número de cuenta", name: account, widget: string }
              - { label: Titular, name: holder, widget: string }
              - { label: Nota, name: note, widget: text, i18n: true, required: false }
          - label: "Horario de atención"
            name: schedule
            widget: list
            fields:
              - { label: "Día(s)", name: day, widget: string, i18n: true }
              - { label: Horario, name: hours, widget: string, i18n: true }
              - { label: Activo, name: active, widget: boolean, default: true }
          - { label: "Logo PRO-21", name: logo_pro21, widget: image }
          - { label: "Texto alternativo — Logo PRO-21", name: logo_pro21_alt, widget: string, i18n: true, default: "Fundación PRO-21" }
          - { label: "Logo Lápiz en Mano", name: logo_lapiz, widget: image }
          - { label: "Texto alternativo — Logo Lápiz en Mano", name: logo_lapiz_alt, widget: string, i18n: true, default: "Centro Lápiz en Mano" }
    i18n: true
    media_folder: "/public/images/uploads/site"
    public_folder: "/images/uploads/site"
```

Mismo patrón aplica sin cambios a `home`, `about`, `impact`, `collaborate`, `families`,
`contact_page` — cada uno además incorpora el nuevo bloque de SEO:

```yaml
- label: "SEO de esta página"
  name: seo
  widget: object
  collapsed: true
  fields:
    - { label: "Título (pestaña del navegador)", name: title, widget: string, i18n: true, hint: "Máx. 60 caracteres recomendado" }
    - { label: "Descripción (resultados de Google)", name: description, widget: text, i18n: true, hint: "Máx. 160 caracteres recomendado" }
```

**Patrón B — Folder collection con bloques ricos y layout data-driven: `programs`**

```yaml
  - name: programs
    label: "🎓 Programas"
    label_singular: Programa
    folder: content/programs
    create: false     # exactamente 3 entradas fijas, sembradas por el script de migración (§3.2)
    delete: false
    i18n: true
    media_folder: "/public/images/uploads/programas"
    public_folder: "/images/uploads/programas"
    slug: "{{slug}}"
    preview_path: "/{{locale}}/{{slug}}"
    fields:
      - { label: "Nombre del programa", name: title, widget: string, i18n: duplicate }
      - { label: SEO, name: seo, widget: object, collapsed: true, fields: [
          { label: Título, name: title, widget: string, i18n: true },
          { label: Descripción, name: description, widget: text, i18n: true } ] }
      - label: Hero
        name: hero
        widget: object
        fields:
          - { label: "Etiqueta (badge)", name: badge, widget: string, i18n: true }
          - { label: Subtítulo, name: subtitle, widget: text, i18n: true }
          - { label: "Color de fondo", name: color, widget: select, options: [primary, secondary, accent] }
      - label: "Cifras rápidas"
        name: stats
        widget: list
        max: 4
        fields:
          - { label: "Ícono (emoji)", name: icon, widget: string }
          - { label: Valor, name: value, widget: string, i18n: true }
          - { label: Etiqueta, name: label, widget: string, i18n: true }
      - label: "Bloque temático 1 (ej. Áreas de terapia / Pilares / Dificultades)"
        name: section_1
        widget: object
        fields:
          - { label: "Título de sección", name: heading, widget: string, i18n: true }
          - { label: "Formato visual", name: layout, widget: select, options: [tarjetas, acordeón], default: tarjetas }
          - label: Ítems
            name: items
            widget: list
            fields:
              - { label: Ícono, name: icon, widget: string }
              - { label: "Color de acento", name: color, widget: select, options: [primary, secondary, accent] }
              - { label: Título, name: title, widget: string, i18n: true }
              - { label: Descripción, name: description, widget: text, i18n: true }
              - { label: "Sub-ítems", name: bullets, widget: list, required: false, field: { label: Ítem, name: bullet, widget: string, i18n: true } }
      - label: "Bloque temático 2 — pestañas (ej. Niveles / Modalidades)"
        name: section_2
        widget: object
        fields:
          - { label: "Título de sección", name: heading, widget: string, i18n: true }
          - label: Pestañas
            name: tabs
            widget: list
            fields:
              - { label: Ícono, name: icon, widget: string }
              - { label: Etiqueta, name: label, widget: string, i18n: true }
              - { label: "Rango de edad", name: age_range, widget: string, i18n: true, required: false }
              - { label: "Color de acento", name: color, widget: select, options: [primary, secondary, accent] }
              - { label: Descripción, name: description, widget: text, i18n: true }
              - { label: "Puntos destacados", name: highlights, widget: list, field: { label: Punto, name: highlight, widget: string, i18n: true } }
      - label: "Bloque temático 3 (ej. Servicios / Áreas de estimulación / Proceso)"
        name: section_3
        widget: object
        fields: []   # misma forma que section_1
      - label: "Pasos para ingresar/inscribir"
        name: enrollment_steps
        widget: list
        fields:
          - { label: Ícono, name: icon, widget: string }
          - { label: Título, name: title, widget: string, i18n: true }
          - { label: Descripción, name: description, widget: text, i18n: true }
      - label: "CTA final"
        name: cta
        widget: object
        fields:
          - { label: Título, name: title, widget: string, i18n: true }
          - { label: Texto, name: description, widget: text, i18n: true }
```

Mismo patrón aplica sin cambios a `testimonios`, `volunteers`, `allies`, `team_areas`, y `blog`
(Fase 6) — cada uno con su propia lista plana de campos según `CMS_AUDIT.md` §2.

**Patrón C — Folder collection con relación a otra colección: `equipo` → `team_areas`**

```yaml
  - name: equipo
    label: "👩‍⚕️ Equipo profesional"
    folder: content/equipo
    create: true
    slug: "{{slug}}"
    i18n: true
    media_folder: "/public/images/uploads/equipo"
    public_folder: "/images/uploads/equipo"
    fields:
      - { label: "Nombre completo", name: name, widget: string, i18n: duplicate }
      - { label: "Cargo / título profesional", name: role, widget: string, i18n: true }
      - label: "Área de especialidad"
        name: area
        widget: relation
        collection: team_areas
        search_fields: [name]
        display_fields: [name]
        value_field: "{{slug}}"
      - { label: Foto, name: photo, widget: image, required: false, hint: "Opcional — si se deja vacío se muestran las iniciales de la persona" }
      - { label: "Texto alternativo de la foto", name: photo_alt, widget: string, i18n: true, required: false }
      - { label: "Biografía breve", name: bio, widget: text, i18n: true }
      - { label: "Orden de aparición", name: order, widget: number, value_type: int, default: 0 }
```

`team_areas` (`content/team_areas/*.md`): `{name i18n:true, icon, color: select, description
i18n:true, skills: list i18n:true, programs: list de select referenciando los 3 slugs de
`programs`}` — lo que hoy `equipo/page.tsx` lee de su array hardcodeado `areas` (líneas 17-108).

### 1.3 Colecciones/singletons completos que cubre este documento

| Colección/singleton | Tipo | Fase |
|---|---|---|
| `site_settings` | Singleton | 1 |
| `equipo`, `team_areas`, `volunteers`, `testimonios` | Folder | 2 |
| `home`, `about` | Singleton | 3 |
| `programs` (3 entradas fijas) | Folder | 4 |
| `impact`, `collaborate`, `allies`, `families`, `contact_page` | Singleton/Folder | 5 |
| `blog` (ya existe, se le agrega i18n) | Folder | 6 |

---

## 2. Panel admin autohospedado (nuevo — reemplaza la dependencia de CDN de la v1)

**Problema que resuelve**: `public/admin/index.html:12` carga hoy
`https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js` — cada vez que alguien abre `/admin` en
producción, el navegador depende de que `unpkg.com` esté disponible, sirva el archivo correcto y no
haya sido comprometido (riesgo de cadena de suministro). Esto es exactamente el tipo de "plataforma
externa" que el usuario pidió evitar.

**Solución**: instalar `decap-cms-app` como dependencia npm normal (`npm install decap-cms-app`) y
compilarla como parte del mismo proyecto Next.js — igual que cualquier otra dependencia del
`package.json`. Estructura nueva:

```
admin/
  entry.tsx          # import CMS from 'decap-cms-app'; registra previews; CMS.init()
components/
  cms-previews/
    ProgramPreview.tsx    # reusa ProgramHero/CardGrid/TabbedPanel reales (§4) para preview 1:1
    HomePreview.tsx
    EquipoPreview.tsx
```

`public/admin/index.html` deja de tener un `<script src="https://unpkg.com/...">` y en su lugar
referencia el bundle propio generado en el build (`/admin/bundle.js`), servido desde el mismo
dominio del sitio. El bundling se agrega como un paso más del build ya existente (nuevo script en
`package.json`, ej. `"build:admin"`, invocado antes de `next build`), usando `esbuild` como
devDependency — liviano, sin servicio externo, sin costo.

**Por qué esto es también la mejora de UI/UX más importante del documento**: al compilar el panel
admin con el mismo toolchain que el resto del sitio, `registerPreviewTemplate` puede importar y
renderizar los **componentes reales de producción** (`ProgramHero`, `CardGrid`, `TabbedPanel`,
`Timeline`, `TeamMember`, etc. — los mismos de §4) en vez de un `preview.css` aparte que solo
aproxima el diseño. El admin ve, mientras edita, un preview **pixel-perfect** del sitio real, con los
colores, tipografía y layout exactos — no una simulación. Esto reemplaza por completo el enfoque de
la v1 (CSS de preview + globals `CMS.h`/`React` inyectados vía script inline sobre el bundle CDN),
que además de depender del CDN, no podía reusar JSX real de forma segura.

**Costo**: cero — `decap-cms-app` y `esbuild` son dependencias npm normales, igual que
`gray-matter` o `resend` ya en el proyecto.

---

## 3. Capa de datos: `lib/cms.ts` + `lib/cms-utils.ts` (nuevos)

Extiende el patrón ya probado de `lib/content.ts` (`getAllPosts`, `getPostBySlug`,
`getAllTeamMembers`, `getAllTestimonials`) en vez de reemplazarlo.

**`lib/cms-utils.ts`** — helpers de fs/parseo compartidos:
- `readLocaleFile(dir, slug, locale, ext)`: resuelve `content/<dir>/<slug>.<locale>.<ext>`, con
  fallback a `<slug>.es.<ext>` si el archivo del idioma pedido no existe (mismo patrón de fallback
  que ya usa `getTranslation` en `lib/i18n/index.ts`).
- Cada función exportada se envuelve en `cache()` (de `react`) para deduplicar lecturas repetidas del
  mismo singleton dentro de un mismo request.

**`lib/cms.ts`** — getters de colección/singleton:
- `getSingleton<T>(name, locale): T`, `getFolderCollection<T>(dir, locale): T[]`,
  `getEntryBySlug<T>(dir, slug, locale)` — mismas firmas que la v1, `locale: Locale` como último
  parámetro, consistente con `getTranslation(lang: Locale)`.

### 3.1 Validación de datos con `zod` (nuevo)

`js-yaml`/`gray-matter` devuelven `any` — un campo vacío, un tipo equivocado, o un YAML mal indentado
escrito por un admin no técnico pasaría desapercibido hasta romper un componente en producción. Cada
interfaz (`SiteSettings`, `Program`, `TeamMember`, etc.) tiene un esquema `zod` gemelo en
`lib/cms-schemas.ts`; cada getter de `lib/cms.ts` valida con `.parse()` antes de devolver el dato:

```ts
export function getSingleton<T>(schema: ZodSchema<T>, name: SingletonName, locale: Locale): T {
  const raw = readLocaleFile('settings', name, locale, 'yml')
  return schema.parse(raw) // lanza un error claro (archivo + campo) si el contenido no calza
}
```

Esto convierte un YAML corrupto en un **error de build explícito y localizado** (`npm run build`
falla apuntando exactamente al campo problemático) en vez de un `undefined` silencioso que rompe el
render en producción. `zod` es una devDependency/dependency npm estándar, sin costo, sin servicio
externo.

### 3.2 Scripts de migración de contenido (nuevo)

En vez de pedirle a un admin no técnico que retipee ~200 campos a mano en el panel para poblar el
contenido inicial, cada fase que introduce un esquema nuevo incluye un script de una sola ejecución
en `scripts/migrate-<fase>.ts` (ejecutado con `tsx` o `ts-node`, ambos devDependencies) que:
1. Importa el array hardcodeado actual directamente del `.tsx` de origen (o lo tiene copiado/pegado
   como constante local, para no crear un acoplamiento permanente hacia código que se va a borrar).
2. Genera los archivos `content/<colección>/<slug>.<locale>.md`/`.yml` con `js-yaml`/frontmatter,
   ya en el formato exacto que Decap espera.
3. Se ejecuta **una sola vez**, se commitea el resultado, y el script se elimina o se archiva en
   `scripts/_migrated/` — no queda como código vivo de mantenimiento.

Esto elimina el riesgo de errores de transcripción, acelera cada fase, y asegura que nunca se hace
deploy de un esquema nuevo sin su contenido real ya sembrado (evita el escenario "build nuevo antes
de que exista contenido").

### 3.3 Migración de archivos existentes sin sufijo de idioma

`content/equipo/ejemplo-terapeuta.md` y `content/testimonios/ejemplo-familia.md` no tienen sufijo de
locale (son placeholders previos al i18n) — se renombran a `.es.md` en la Fase 2 como parte del mismo
script de migración, antes de activar los getters con sufijo de idioma.

---

## 4. Refactor de componentes y páginas

### 4.1 Ejemplo trabajado a fondo: los 3 programas

**Por qué se eligen**: `mi-escuelita-down`, `aula-wawitas` y `pasos-firmes` comparten una estructura
casi idéntica (hero, stats, bloque de tarjetas, panel con pestañas, pasos de ingreso, CTA) — es la
variación estructural más clara del sitio (salvo "Dificultades atendidas" de Pasos Firmes, que usa
acordeón en vez de pestañas; por eso `layout` es un campo de datos en el esquema, no algo hardcodeado
por componente).

**Decisión de ruteo**: se mantienen las 3 rutas estáticas actuales (no se colapsan en una ruta
dinámica `[slug]`) para no romper URLs ya enlazadas desde `Nav`/`Footer`/home.

**Componentes compartidos nuevos** (`components/sections/`, adaptando la *forma* de los componentes
ya existentes — `Hero.tsx`, `Card.tsx`, `Badge.tsx` — con el JSX real que hoy usan las páginas en
producción, no la versión simplificada de los stubs):

- `ProgramHero.tsx` — fondo de color según `hero.color`, breadcrumb, badge, `<h1>`, subtítulo, doble
  CTA usando el nuevo `WhatsAppLink` + `Link` a `#section_1`/`#section_2`, ola SVG inferior.
- `StatsRow.tsx` — grilla de 4 cifras, reutilizada en home y equipo.
- `CardGrid.tsx` — grilla de tarjetas o acordeón según `layout`, compone `Card` adaptado.
- `TabbedPanel.tsx` — generaliza el patrón `activeLevel`/`useState` de pestañas.
- `EnrollmentSteps.tsx` — flujo numerado de 4 pasos.
- `ProgramCTA.tsx` — banner de color de cierre.
- `ProgramPageLayout.tsx` — compone todo lo anterior; usado también por `admin/cms-previews/
  ProgramPreview.tsx` (§2) para el preview 1:1.

```tsx
export default async function Page({ params: { lang } }: PageProps) {
  const program = await getProgramBySlug('mi-escuelita-down', lang)
  if (!program) notFound()
  return <ProgramPageLayout lang={lang} program={program} />
}
```

### 4.2 Generalización al resto de páginas (mismo método, no 1:1)

- **Home / Quiénes Somos / Equipo / Impacto**: `StatsRow`, `CardGrid` (8 valores, filosofía de
  trabajo del equipo), nuevo `Timeline.tsx` (7 hitos), `TeamMember.tsx`/`Testimonial.tsx` adaptados.
- **Colabora / Familias**: `CardGrid` (alianzas, sesiones virtuales, red de apoyo), nuevo
  `FaqAccordion.tsx` (8 FAQs de familias + 4 de contacto, como dos listas separadas por singleton).
- **Contacto**: `ContactForm.tsx` adaptado (bilingüe, restyled al diseño real, con su
  `fetch('/api/contact')` ya funcional) sustituye el botón falso `setFormSent(true)`.

---

## 5. UX del panel admin

1. **Orden de colecciones = orden de navegación del sitio**: Configuración → Inicio → Quiénes Somos →
   Programas → Equipo → Impacto → Colabora → Familias → Contacto → Blog.
2. **`preview_path` en cada colección** con ruta real — el admin ve "Ver en el sitio" y confirma
   visualmente antes de publicar.
3. **`hint` en español simple** en cada campo no evidente (ej. *"Monto en bolivianos, sin el símbolo
   Bs"*), y en cada campo `*_alt` una guía concreta de cómo escribir un buen texto alternativo.
4. **Pestaña ES/EN nativa de Decap** — borrador único compartido, ver decisión #1 de §0.
5. **`widget: list` de objetos**, nunca Markdown libre ni HTML crudo, para arrays de tarjetas.
6. **Media library organizada por subcarpeta** vía `media_folder` por colección.
7. **Preview de marca real, pixel-perfect** (§2) — el mayor salto de UI/UX de esta versión: el admin
   ve el diseño real del sitio, no una aproximación, porque el preview reusa los componentes de
   producción compilados por el mismo build.

---

## 6. Hallazgos técnicos que se corrigen de paso

| Bug/gap | Dónde | Fase | Fix |
|---|---|---|---|
| Formulario de contacto nunca llama a la API | `app/[lang]/contacto/page.tsx` | 1 | Reemplazar por `ContactForm.tsx` adaptado |
| Imagen de blog capturada pero nunca renderizada | `blog/page.tsx`, `blog/[slug]/page.tsx` | 1 | `<Image src={post.image}>` con `next/image` cuando exista |
| Clase CSS rota `animate-fadeSlideUp` | `colabora/page.tsx:469` | 6 | Cambiar a `animate-fade-slide-up` |
| WhatsApp + SVG pegado 15+ veces | 8+ archivos | 1 | Componente `WhatsAppLink` alimentado por `site_settings` |
| 3 emails inconsistentes | `lib/contact.ts`, `.env.example`, `route.ts`, `colabora/page.tsx` | 1 | Unificados en `site_settings.email`, `TODO` explícito |
| `route.ts` ignora `CONTACT_EMAIL` | `app/api/contact/route.ts` | 1 | Leer la env var ya definida |
| Logos duplicados sin usar | `public/icons/` | 6 | Eliminar los 4 no usados |
| Config/env de Cloudflare R2 sin uso | `next.config.js`, `.env.example` | 6 | Remover |
| **SEO hardcodeado, sin fase asignada (v1)** | cada `page.tsx`, `generateMetadata` | 1-5 (junto con cada singleton) | Campo `seo.title`/`seo.description` por página, leído en `generateMetadata` |
| **Imágenes sin texto alternativo (v1)** | todo campo `image`/`photo`/`logo_*` | 1-5 (junto con cada singleton) | Campo `*_alt` obligatorio, i18n, por cada imagen |
| **CDN externo para el panel admin (v1)** | `public/admin/index.html` | 0 | `decap-cms-app` como dependencia npm — ver §2 |

---

## 7. Autenticación: Vercel Function OAuth + hardening de acceso

**Qué hace falta y por qué**: Decap CMS con `backend: name: github` sigue siendo gratis y basado en
GitHub — el admin inicia sesión con su cuenta de GitHub y cada cambio se guarda como commit/PR, sin
base de datos ni servidor tradicional. La única pieza que falta es el **intercambio de token OAuth**:
cuando GitHub redirige de vuelta a `/admin` con un código de autorización, algo tiene que cambiarlo
por un token usando el *client secret* de la app — eso no puede pasar en el navegador (expondría el
secreto), necesita un endpoint propio.

**Solución**: una función serverless dentro del mismo proyecto Vercel (`app/api/auth/[...decap]/
route.ts`, patrón estándar documentado por Decap para backends OAuth custom). **Costo: $0**, incluida
en el plan Hobby ya usado — no es un servicio adicional, es una función más del mismo despliegue.

**Configuración en GitHub**: OAuth App en `github.com/settings/developers` con su *callback URL*
apuntando a la función de arriba; `GITHUB_CLIENT_ID`/`GITHUB_CLIENT_SECRET` como variables de entorno
de Vercel (nunca en el repo — ya hay placeholder comentado en `.env.example`).

**Hardening de acceso (nuevo)**: el login por GitHub por sí solo no restringe *quién* puede intentar
entrar a `/admin` — solo determina si, una vez dentro, esa cuenta tiene permiso real de escribir en
el repo. El control de acceso efectivo es entonces:
- Mantener la lista de **colaboradores del repositorio** (`Settings → Collaborators` en GitHub)
  limitada exactamente a los admins reales de la fundación + el equipo de desarrollo — nadie más
  puede publicar cambios aunque encuentre la URL de `/admin`.
- La OAuth App de GitHub puede además restringirse a la organización/cuenta del repo si en algún
  momento se migra a una GitHub Organization (opcional, no bloqueante para el plan Hobby actual).
- Esto no requiere ningún servicio externo de autenticación (Auth0, Clerk, etc.) — es control de
  acceso nativo de GitHub, coherente con la instrucción de no sumar plataformas.

---

## 8. Código limpio y prácticas profesionales

Reglas que aplican a todo el trabajo de este plan, no solo a una fase:

- **TypeScript estricto**: ningún `any` nuevo en `lib/cms.ts`/`lib/cms-utils.ts` — los tipos salen de
  las interfaces + validación `zod` (§3.1), nunca de un cast manual.
- **Cero código muerto tolerado**: al cerrar cada fase, el código que reemplaza queda **eliminado**,
  no comentado ni "deprecado" — `lib/contact.ts` se borra al cierre de la Fase 1; los arrays
  hardcodeados de cada página se borran en el mismo commit que los reemplaza por el fetch a CMS; los
  4 logos duplicados de `public/icons/` y las variables de R2 se eliminan, no se marcan `# unused`.
- **Sin comentarios explicativos de "qué hace" el código** (ya lo dicen los nombres) — solo se
  comenta lo no obvio (ej. el `pattern` regex de un campo YAML, o por qué `multiple_files` y no
  `single_file`), consistente con la convención ya usada en `config.yml` actual.
- **Nombres de archivo y componentes** siguen la convención ya existente del repo: componentes en
  PascalCase (`ProgramHero.tsx`), utilidades en camelCase (`lib/cms-utils.ts`), sin abreviar.
- **Commits en español con prefijos**, tal como indica `CLAUDE.md` (`feat:`, `fix:`, `content:`,
  `docs:`) — un commit por unidad lógica (ej. "feat: agregar colección programs a config.yml" y
  "feat: migrar mi-escuelita-down a ProgramPageLayout" como commits separados, no uno gigante por
  fase).
- **Formateo consistente**: se añade `prettier` + `lint-staged` + `husky` (pre-commit hook local) como
  devDependencies — mismo criterio de "cero costo, cero servicio externo" que el resto del plan;
  evita que el estilo de código diverja entre las ~7 fases de trabajo.
- **Una fuente de verdad por dato**: ningún valor (WhatsApp, email, colores de marca, textos)
  vuelve a vivir pegado en más de un archivo — todo pasa por `site_settings` o el singleton/colección
  que corresponda.

---

## 9. Roadmap por fases

Cada fase vive en su propia rama `feature/cms-fase-N-<slug>` creada desde `CMS`, con PR de vuelta a
`CMS` al cerrar la fase (y de `CMS` a `master` al final del plan completo, o antes si se decide un
release incremental).

| Fase | Rama | Contenido | Depende de | Criterio de aceptación (DoD) |
|---|---|---|---|---|
| **0 — Cimientos** | `feature/cms-fase-0-cimientos` | Fix `backend.repo`/`branch`; función OAuth (§7) + hardening de colaboradores; `decap-cms-app` autohospedado (§2); bloque `i18n` + `editorial_workflow`; smoke test de i18n sobre `equipo` | — | Login real por GitHub funciona en un deploy de prueba; editar `equipo` en ES y EN sin perder cambios al cambiar de pestaña; cero referencias a `unpkg.com` en el repo |
| **1 — `site_settings` + bugs globales** | `feature/cms-fase-1-site-settings` | `js-yaml` + `zod`; `lib/cms-utils.ts`/`lib/cms.ts`; `layout.tsx` async; `WhatsAppLink`; fix formulario de contacto; fix imagen de blog; fix `CONTACT_EMAIL`; `lib/contact.ts` eliminado | Fase 0 | `npm run build` pasa; cero literales `wa.me/`/email pegados fuera de `site_settings`; formulario de contacto envía de verdad (o simula con log claro sin `RESEND_API_KEY`) |
| **2 — `equipo` + `team_areas` + `volunteers` + `testimonios`** | `feature/cms-fase-2-equipo` | Script de migración de los 9 miembros/6-7 áreas/3 voluntarios; `featured_home`/`featured_impacto` en testimonios; `equipo/page.tsx` reescrita sobre `lib/cms.ts` | Fase 1 | La página de equipo renderiza exactamente los mismos 9 perfiles que hoy, ahora desde `content/equipo/*`; editar un miembro desde el CMS cambia el sitio publicado |
| **3 — `home` + `about`** | `feature/cms-fase-3-home-about` | Hero, stats, misión, chips, CTA del home; identidad, misión/visión/objetivo, 8 valores, timeline de Quiénes Somos | Fase 1 | Paridad de texto es/en contra el contenido hardcodeado anterior (checklist campo a campo) |
| **4 — `programs`** | `feature/cms-fase-4-programs` | Ejemplo trabajado a fondo de §4.1; wiring de las tarjetas de programa del home (diferido de Fase 3) | Fases 2-3 | Los 3 `page.tsx` de programas quedan como wrappers de <10 líneas; preview del CMS coincide visualmente con el sitio real |
| **5 — `impact` + `collaborate` + `families` + `contact_page`** | `feature/cms-fase-5-impact-etc` | PDFs reales para informes/guías; `allies` propia; galería de impacto usando las 8 fotos ya existentes de `wawitas/`+`actividades/` en vez de emojis | Fase 4 | Cero placeholders de emoji en la galería; los 4 informes y 6 guías descargan un PDF real, no abren WhatsApp |
| **6 — Blog i18n + limpieza** | `feature/cms-fase-6-blog-cleanup` | `i18n: true` en blog; migrar `bienvenida.md`; limpiar logos y config R2; fix `animate-fadeSlideUp`; QA bilingüe completa | Fase 5 | Lighthouse accesibilidad ≥ 90 en 3 páginas muestra; cero archivos sin usar en `public/icons/`; cero referencias a R2 |
| **7 — Documentación y cierre** (nueva) | `feature/cms-fase-7-docs` | Actualizar `docs/ARCHITECTURE.md`, `docs/CONTENT.md`, `.env.example`, `README` para reflejar la arquitectura final del CMS | Fase 6 | Un desarrollador nuevo puede levantar el CMS localmente siguiendo solo la documentación actualizada |

---

## 10. Plan de verificación

1. **Local**: `npx decap-server` + `npm run dev`, `local_backend: true` solo local (nunca commiteado
   activo) — valida esquemas y subida de medios sin tocar GitHub.
2. **Regresión por fase**: `npm run type-check`, `npm run build`, `npm run lint` después de cada
   fase (scripts ya existentes en `package.json`).
3. **Validación de datos**: al menos un test manual por fase de "romper a propósito" un archivo
   `content/*` (campo vacío, tipo equivocado) y confirmar que `zod` lo rechaza con un mensaje claro
   en vez de fallar silenciosamente en el render.
4. **Comparación campo a campo**: checklist temporal por página, contenido viejo vs. nuevo, en es/en.
5. **Formulario de contacto end-to-end**: sin `RESEND_API_KEY`, confirmar `{ok:true,
   simulated:true}` y la UI de éxito en ambos formularios; con key de prueba, confirmar envío real
   con `to:` leyendo `CONTACT_EMAIL`.
6. **OAuth + editorial workflow**: al final de la Fase 0, prueba real contra GitHub (no
   `local_backend`) en una rama descartable — confirmar que `editorial_workflow` abre un PR contra
   `master`. Mayor riesgo no verificado de todo el plan, se prueba temprano a propósito.
7. **Integridad de datos al cambiar de pestaña de idioma**: editar en ES, cambiar a EN sin guardar,
   volver a ES, confirmar que el cambio persiste; confirmar que salir del editor con cambios sin
   guardar sigue mostrando el aviso nativo de Decap.
8. **Accesibilidad**: cada imagen migrada tiene su `*_alt` no vacío; correr Lighthouse (accesibilidad)
   sobre home, un programa y equipo antes/después de cada fase relevante — no debe bajar el puntaje.
9. **Cero dependencias externas en runtime**: al cerrar la Fase 0, `grep -r "unpkg.com\|cdn\."
   public/admin/` no debe devolver resultados — confirma que el panel admin quedó 100%
   autohospedado.

---

## 11. Archivos clave

- `public/admin/config.yml`, `public/admin/index.html`
- **Nuevo**: `admin/entry.tsx`, `components/cms-previews/*.tsx`, `scripts/migrate-*.ts`,
  `lib/cms-schemas.ts` (zod)
- `lib/content.ts` (se mantiene para `blog`), `lib/cms.ts`, `lib/cms-utils.ts`
- `lib/contact.ts` — **se elimina** al cierre de la Fase 1 (no queda como deprecado)
- `app/[lang]/layout.tsx`, los 3 `page.tsx` de programas, `app/[lang]/contacto/page.tsx`,
  `app/[lang]/blog/page.tsx` y `blog/[slug]/page.tsx`
- `components/sections/*.tsx`, `components/ui/Card.tsx`, `Badge.tsx`
- `app/api/contact/route.ts`, `app/api/auth/[...decap]/route.ts` (Fase 0)
- `next.config.js`, `.env.example` (limpieza de R2 en Fase 6)
- `docs/ARCHITECTURE.md`, `docs/CONTENT.md`, `README.md` (Fase 7)
- `package.json` — nuevas dependencias: `js-yaml`, `zod`, `decap-cms-app`, `esbuild`, `tsx`,
  `prettier`, `lint-staged`, `husky` (todas npm, cero servicios externos)
