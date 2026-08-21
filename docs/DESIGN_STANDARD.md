# DESIGN_STANDARD.md — Estándar visual del sitio

> Patrones ya establecidos en el código. Referencia para nuevas páginas o secciones.
> Verificado contra: Inicio, Quiénes Somos, Equipo, Mi Escuelita Down, Aula Wawitas, Pasos Firmes.

---

## Hero (portada de cada página)

- Fondo: color sólido de marca (`bg-primary` / `bg-secondary` / `bg-accent`) — excepto Inicio, que usa `bg-gray-900` como pieza insignia
- Círculos decorativos: exactamente 2, `bg-white/10 rounded-full`
  - Superior derecho: `w-96 h-96 -translate-y-1/2 translate-x-1/3`
  - Inferior izquierdo: `w-64 h-64 bottom-1/4 -left-16`
- Breadcrumb: `text-white/60 text-xs` con hover a blanco (omitir en Inicio)
- Badge: `inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-1.5` + texto `text-xs font-bold uppercase tracking-wider`
- H1: `text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight`
- Ola SVG al fondo: `viewBox="0 0 1440 60" preserveAspectRatio="none"` + `<path d="M0 0 Q360 60 720 30 Q1080 0 1440 0 L1440 60 L0 60 Z" />`

Implementado en `components/sections/ProgramHero.tsx` para los 3 programas; inline en Quiénes Somos, Equipo e Inicio.

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

- `container mx-auto max-w-6xl` para secciones anchas; `max-w-3xl`/`max-w-4xl` para contenido centrado (CTA, timeline)
- Padding vertical de sección: `py-16 md:py-24` (secciones grandes) o `py-12 md:py-20` (secciones intermedias)

---

## CTA final (última sección antes del footer)

**Estándar (ya usado en Inicio, Equipo, Mi Escuelita Down, Aula Wawitas, Pasos Firmes):**

```tsx
<section className="py-16 md:py-24 [bg-color] relative overflow-hidden">
  {/* mismos 2 círculos decorativos que el hero, si el fondo lo permite */}
  <div className="container mx-auto max-w-3xl relative z-10 text-center">
    <span className="text-5xl block mb-5 select-none">[emoji]</span>
    <h2 className="text-3xl md:text-4xl font-extrabold [text-color] mb-4">{title}</h2>
    <p className="text-sm md:text-base [text-color]/80 max-w-xl mx-auto leading-relaxed mb-8">{text}</p>
    <div className="flex flex-wrap gap-4 justify-center items-center">
      {/* botones pill: bg-gray-900/bg-white según contraste */}
    </div>
  </div>
</section>
```

**Nunca usar** `font-serif` ni `font-normal` en el h2 del CTA — reservados solo para el glifo decorativo de comillas en testimonios.

**Pendiente de alinear a este estándar** (fuera del alcance de esta ronda, quedó registrado para la próxima):
- `Colabora` — usa `font-serif text-3xl md:text-4xl font-normal` con fondo degradado oscuro
- `Familias` — mismo patrón antiguo que Colabora

---

## Tipografía — reglas duras

- `font-extrabold` para todos los H1/H2 de página y CTA
- `font-serif` **solo** permitido en glifos decorativos (comillas de testimonios, etc.), nunca en encabezados reales
- Colores de texto: `text-gray-900` (nunca hex crudo `#111827` o `#1a1a1a` en código nuevo)
