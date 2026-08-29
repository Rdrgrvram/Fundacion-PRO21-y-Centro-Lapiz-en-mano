# DESIGN_STANDARD.md — Estándar visual del sitio

> Patrones ya establecidos en el código. Referencia para nuevas páginas o secciones.
> Verificado contra: Inicio, Quiénes Somos, Equipo, Mi Escuelita Down, Aula Wawitas, Pasos Firmes,
> Colabora, Familias, Blog, Contacto, Impacto (unificación completa).

---

## Hero (portada de cada página)

- Fondo: color sólido de marca (`bg-primary` / `bg-secondary` / `bg-accent`) — excepto Inicio, que usa `bg-gray-900` como pieza insignia
  - `bg-gray-900` queda reservado exclusivamente para ese momento (hero de Inicio). El footer usa `bg-gray-950` — un neutro más oscuro y distinto — precisamente para no repetir la pieza insignia en todas las páginas y que siga siendo un momento memorable solo en Inicio.
- Estructura del `<section>`: **sin** `min-height` ni `flex items-center` ni padding propio. Todo el espaciado vertical vive en el contenedor interno:

```tsx
<section className="relative bg-[color] overflow-hidden">
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
    <div className="absolute bottom-1/4 -left-16 w-64 h-64 bg-white/10 rounded-full" />
  </div>
  <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 60" preserveAspectRatio="none">
    <path d="M0 0 Q360 60 720 30 Q1080 0 1440 0 L1440 60 L0 60 Z" fill="white" />
  </svg>
  <div className="container mx-auto px-4 py-16 md:py-24 relative z-20">
    {/* breadcrumb, badge, H1, subtítulo */}
  </div>
</section>
```

- **Importante — el contenedor NO lleva `max-w`.** Solo el `<p>` de subtítulo se restringe con `max-w-2xl`. Agregar `max-w-3xl` (o cualquier otro) al contenedor entero rompe la alineación horizontal frente a otras páginas (bug real detectado y corregido en Familias/Blog/Contacto/Impacto — el contenido arrancaba más a la derecha y más angosto que en Quiénes Somos).
  - Excepción legítima 1: **Colabora**, cuyo hero tiene un grid de 2 columnas con tarjetas de estadísticas y sí necesita `max-w-6xl` por la densidad de ese contenido — no replicar esa excepción en heroes de texto simple.
  - Excepción legítima 2: **Inicio**, cuyo hero usa `grid lg:grid-cols-2` — columna de texto (badge + H1 + subtítulo + CTAs) a la izquierda, columna de foto a la derecha. La foto real vive en una **forma orgánica** (`rounded-[46%_54%_57%_43%_/_52%_46%_54%_48%]`) con dos **blobs de color de marca** detrás (`bg-secondary/40`, `bg-accent/40`, cada uno con su propio border-radius orgánico) y una **cita real de familia** como pie de foto debajo de la forma (nunca superpuesta). Foto y cita se editan desde el CMS (`hero.image`, `hero.quote`, `hero.quote_author`, `hero.quote_program` en `content/settings/home.yml`). El H1 de Inicio baja a `lg:text-5xl xl:text-6xl` (no `xl:text-7xl`) porque ahora vive en media columna.
    - Regla de las formas orgánicas: solo para la **foto protagonista** de una sección (hero de Inicio). El resto de fotos del sitio siguen en rectángulos redondeados (`rounded-2xl`). No convertir todas las fotos en blobs.
    - El titular de Inicio es **directo y específico** ("Terapia y escuela especializada para tu hijo"), no un eslogan abstracto — un padre que llega buscando ayuda entiende en 3 segundos qué ofrece la fundación. La frase inspiradora anterior puede vivir en la sección de misión.
- **Titular directo — regla general.** El `<h1>` de cada hero debe decir qué hace la fundación / qué ofrece la página, no un eslogan abstracto. Aplicado en rama `v2` a Impacto ("Nuestro impacto, en cifras e historias reales"), Colabora ("Doná, ofrecé tu tiempo o sé aliado") y Familias ("Acompañamiento y recursos para tu familia"). Quiénes Somos ("Dos instituciones, una misión") se mantiene: ya es específico. Los heroes de programa usan el nombre del programa, que ya es directo.
- Círculos decorativos: exactamente 2, `bg-white/10 rounded-full` (superior derecho `w-96 h-96 -translate-y-1/2 translate-x-1/3`; inferior izquierdo `w-64 h-64 bottom-1/4 -left-16`)
- Breadcrumb: `<nav className="text-white/60 text-xs mb-8">Inicio / [Página]</nav>` con hover a blanco (omitir en Inicio)
- Badge: `inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-1.5` + texto `text-xs font-bold uppercase tracking-wider text-white`
- H1: `text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-extrabold leading-tight mb-4`
- Subtítulo: `text-sm md:text-base lg:text-lg text-white/80 max-w-2xl leading-relaxed`
- Ola SVG al fondo: `viewBox="0 0 1440 60" preserveAspectRatio="none"` + `<path d="M0 0 Q360 60 720 30 Q1080 0 1440 0 L1440 60 L0 60 Z" />`
- **Contraste de texto sobre el hero**: si se usa un color de acento dentro del H1/badge (ej. `text-primary` para resaltar una palabra), verificar WCAG AA antes de aplicarlo:
  - `text-primary` sobre `bg-secondary` ≈ 2.0:1 — **no pasa**, usar `font-extrabold` blanco sin color en su lugar.
  - `text-primary` sobre `bg-accent` ≈ 3.79:1 — pasa solo para texto grande (18pt+/14pt bold+, que es el caso de un H1), se puede mantener.
  - Nunca combinar el acento de color con `italic`: usar `font-extrabold` a secas para el énfasis.

Implementado en `components/sections/ProgramHero.tsx` para los 3 programas; inline en el resto de páginas de contenido. Quiénes Somos/Equipo/Inicio son la referencia canónica más simple (sin grid especial).

---

## Encabezado de sección (section header)

- Badge tipo píldora: `inline-flex items-center gap-2 bg-[color]/10 border border-[color]/15 rounded-full px-4 py-1.5 mb-3` + emoji + `text-xs font-bold uppercase tracking-wider text-[color]`
- H2: `text-3xl md:text-4xl text-gray-900 font-extrabold tracking-tight`
- Subtítulo opcional: `text-sm text-gray-500 max-w-lg mx-auto leading-relaxed`
- Contenedor: `text-center mb-12 max-w-xl mx-auto` (ajustar max-w según densidad de contenido)

## Tarjetas (cards)

- Blancas: `bg-white rounded-2xl` o `rounded-3xl` + `border border-gray-200` + `shadow-sm`
- Hover: `hover:shadow-md hover:border-gray-300 transition-all duration-300` (agregar `hover:-translate-y-1` en grids de tarjetas pequeñas)
- Ícono: círculo `rounded-xl` con `bg-[color]/10` o `/15`, texto/emoji centrado

## Contenedor y espaciado

- `container mx-auto max-w-6xl` para secciones anchas con grids/columnas; `max-w-3xl`/`max-w-4xl` solo para contenido centrado tipo CTA/timeline — **nunca** en el contenedor del hero (ver regla de hero arriba).
- Padding vertical de sección: `py-16 md:py-24` (secciones grandes) o `py-12 md:py-20` (secciones intermedias)

---

## CTA final (última sección antes del footer)

**Estándar real (Inicio, Equipo, Programas, Colabora, Familias, Blog, Contacto, Impacto):**

```tsx
<section className="py-16 bg-[color]">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">{title}</h2>
    <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">{text}</p>
    <div className="flex flex-wrap justify-center gap-4">
      <a
        href="https://wa.me/59170106276"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-gray-900 text-white font-bold px-8 py-4 rounded-full hover:bg-gray-800 transition-colors min-h-[52px]"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c...z" /></svg>
        {label}
      </a>
      {/* segundo botón alternativo, si aplica: bg-white text-gray-900 hover:bg-gray-100, mismo min-h-[52px] */}
    </div>
  </div>
</section>
```

- **Sin círculos decorativos ni emoji glifo** en esta sección — a diferencia del hero, el CTA final es plano (solo el color de fondo sólido).
- **El botón de WhatsApp siempre lleva el ícono SVG** (`w-5 h-5`, `viewBox="0 0 24 24"`, `fill="currentColor"`) antes del texto — usar el path completo ya implementado en `components/sections/ProgramCTA.tsx` y en el CTA de Inicio. Este ícono se perdió accidentalmente en Colabora/Familias/Blog/Impacto durante una ronda de unificación y fue reinsertado — vigilar que cualquier botón nuevo de WhatsApp lo incluya desde el inicio.
- Botones pill: `bg-gray-900 text-white hover:bg-gray-800` (principal/oscuro) y `bg-white text-gray-900 hover:bg-gray-100` (alternativo/claro), ambos `inline-flex items-center gap-2 font-bold px-8 py-4 rounded-full min-h-[52px]`.

**Nunca usar** `font-serif` ni `font-normal` en el h2 del CTA — reservados solo para el glifo decorativo de comillas en testimonios.

---

## Iconografía

- Los iconos de **navegación estructural** (redes sociales en el footer, WhatsApp en los CTA) son siempre SVG inline (`currentColor`, `viewBox="0 0 24 24"`, tamaño `w-4 h-4` a `w-5 h-5` según contexto) — nunca emoji. Esto incluye los íconos de contacto del footer (ubicación/teléfono/correo), migrados de emoji a SVG para que combinen visualmente con los íconos de redes sociales ya existentes.
- **Sin emoji como glifo.** El contenido del CMS sigue guardando un emoji en el campo `icon`, pero se renderiza vía `components/ui/Icon.tsx`, que lo traduce a un ícono de línea real (`currentColor`, grilla de 24, `stroke-width` 1.75). Uso: `<Icon emoji={item.icon} className="h-6 w-6 text-secondary" />` o `<Icon name="calendar" .../>` para íconos fijos. Si el emoji no está en el mapa `EMOJI` se muestra tal cual (fallback) — así la Fundación puede seguir escribiendo cualquier emoji y los comunes se ven como ícono. Aplicado en Inicio, Quiénes Somos, Impacto, Colabora, Familias y los componentes de programa. Pendiente: Blog / Contacto / Equipo.
- **Decoración de badges** (la píldora `bg-{color}/10` sobre el título de sección): un punto de color (`<span className="h-1.5 w-1.5 rounded-full bg-{color}" />`), nunca un emoji.
- Avatares sin foto: usar iniciales sobre un círculo de color de marca (`bg-[color]/10 text-[color]-700` o el fondo sólido del `PALETTE[color]`), nunca un emoji genérico (`👤`) — patrón ya implementado en la grilla de Equipo vía el campo `initials`/`color` del CMS.

---

## Navegación (breakpoints)

- El menú desktop (`Nav.tsx`) y el toggle de hamburguesa (`Header.tsx`) colapsan juntos en `lg:` (no `xl:` — se bajó el breakpoint al agrupar los 3 programas bajo un dropdown "Programas", lo que liberó espacio horizontal). Si se agregan más ítems al nav plano, revisar este breakpoint de nuevo antes de subirlo.

---

## Tipografía — reglas duras

- **Dos familias:**
  - **Inter** (`font-sans`, fuente base del `<body>`) — todo el cuerpo, leads, botones, formularios, navegación, etiquetas y **títulos de tarjeta** (`h3`/`h4`).
  - **Fraunces** (`font-display`, serif suave) — se carga en `app/layout.tsx` (`next/font/google`, variable `--font-display`) y se aplica automáticamente a **`h1` y `h2`** vía regla en `styles/globals.css`. Es decir: titulares de hero, de sección y de CTA. También para **citas destacadas** (usar la clase `font-display` + `italic`).
  - Regla: los títulos de sección (`h2`) van en Fraunces sin hacer nada; los de tarjeta van en `h3`/`h4` y quedan en Inter. No poner contenido de tarjeta en `h2`.
- `font-extrabold` para todos los H1/H2 de página y CTA (Fraunces sintetiza el peso ~700).
- **Itálica en el hero:** permitida en la línea 2 del `<h1>` **solo si NO lleva color de acento** (queda en blanco, hereda). `italic` + `text-primary` sobre `bg-secondary` falla contraste AA — usar `italic` a secas (Fraunces itálica) o `font-extrabold` blanco. Nunca `italic` + acento de color juntos.
- `font-serif` (apunta a Inter en `tailwind.config.js`) queda obsoleto para citas nuevas — usar `font-display`.
- Colores de texto: `text-gray-900` (nunca hex crudo `#111827` o `#1a1a1a` en código nuevo) — cualquier color debe trazarse a un token de `tailwind.config.js` o `lib/palette.ts`, nunca un hex arbitrario nuevo.

---

## Foto protagonista — `components/sections/ProtagonistPhoto.tsx`

Componente reutilizable para la **foto protagonista de una sección**: foto real en forma
orgánica (`rounded-[46%_54%…]`) + dos blobs de color de marca detrás (`bg-{color}/40`,
cada uno con su propio border-radius orgánico) + cita real de familia opcional como
**pie de foto DEBAJO de la forma** (nunca superpuesta — el recorte orgánico corta el texto).
La prop `quoteTone` (`'light' | 'dark'`) ajusta el color del pie según el fondo de la sección.

- Se usa en: hero de Inicio, hero de los 3 programas (`ProgramHero.tsx`), sección de
  identidad de Quiénes Somos, historia destacada de Impacto, testimonio de voluntariado en
  Colabora, carta de bienvenida en Familias.
- **Regla:** solo para la foto protagonista de una sección. El resto de fotos del sitio
  siguen en rectángulos redondeados (`rounded-2xl`). No convertir todas las fotos en blobs.
- Props: `src`, `alt`, `quote?`, `author?`, `context?`, `blobs?` (`[AccentColor, AccentColor]`,
  por defecto `['secondary','accent']`), `ratio?` (`'portrait' | 'square'`), `priority?`.
- Los campos de contenido (`hero.image`/`hero.quote`/…) viven en el CMS — ver
  `content/settings/*.yml`, `content/programs/*.md`, `lib/cms-schemas.ts` y `public/admin/config.yml`.
