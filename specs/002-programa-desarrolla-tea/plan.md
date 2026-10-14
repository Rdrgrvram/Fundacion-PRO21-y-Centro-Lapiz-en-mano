# Plan de implementación: Programa Desarrolla TEA

**Spec:** `specs/002-programa-desarrolla-tea/spec.md` · **Rama:** `feature/programa-desarrolla-tea` · **Constitución:** `memory/constitution.md`
**Stack (sin cambios):** Next.js 14 App Router (SSG) · Tailwind · Decap CMS · zod · Playwright

## Gates de la constitución (Fase -1)
| Gate | Resultado |
|---|---|
| VII Simplicidad (sin servicios/dependencias nuevas) | ✅ Cero dependencias. Se reutiliza `ProgramPageLayout` y la colección `programs`. |
| VIII Anti-abstracción | ✅ No se crea un "registro de programas" en código (ver D6). |
| IX Integration-first | ✅ Pruebas contra el servidor real de Playwright, sin mocks. |
| III Test-first | ✅ Fase 1 deja las pruebas en rojo antes de crear el contenido. |
| IV Fotos de menores | ✅ `photos_authorized: false`, probado. |

**Registro de complejidad:** ninguno. El esquema `programSchema` no cambia.

## Hallazgo clave: casi todo ya es dinámico
Agregar un programa funciona escribiendo `content/programs/<slug>.{es,en}.md`: la ruta (`app/[lang]/[program]`),
`generateStaticParams`, el sitemap, el Header/Nav (dropdown), el Footer, las tarjetas y la cifra de Inicio,
Impacto, Quiénes Somos y Familias leen `getAllPrograms()`. Lo que **sí** está fijo a mano es lo siguiente.

### Inventario de lugares con la lista de programas hardcodeada
| # | Lugar | Qué hace | ¿Bloquea Desarrolla TEA? | Acción |
|---|---|---|---|---|
| 1 | `lib/icon-catalog.ts` + `components/ui/Icon.tsx` + **`admin/widgets/IconPicker.tsx`** | Catálogo de íconos (enum zod `ICON_NAMES`) y sus dos mapas de componentes (sitio y panel) | **Sí:** faltan `layers`, `shirt`, `user` → el contenido no valida y el build falla | Agregar los 3 íconos (D2) |
| 2 | `app/[lang]/page.tsx` (grilla `md:grid-cols-3`) | Tarjetas de Inicio | Solo si `home.featured: true`: 4 tarjetas dejan una huérfana | Decidir y ajustar grilla (D3) |
| 3 | `content/settings/home.yml` (subtítulo "Tres programas…", es/en) | Texto | Desactualiza el texto | Cambiar a "Cuatro" (D3) |
| 4 | `public/admin/config.yml` L165 (select de `slug` de las tarjetas) y L162–163 (`min: 3`, `max: 3`) | Tarjetas "legacy" de Inicio (solo respaldo: la fuente real es `home` de cada programa) | No bloquea la 4.ª tarjeta pública (sale de `program.home`). `max: 3` sí topa las tarjetas de respaldo del YAML; el select no ofrece el slug nuevo | Quitar min/max y sumar el slug nuevo al `select`, con prueba que lo mantiene alineado (D6; el `relation` se probó y se descartó) |
| 5 | `public/admin/config.yml` L90 y L108 (selects de ruta en menú y pie) y `lib/cms-schemas.ts` L288 (`siteRoute` enum) | Menú/pie de `site_settings` | No: el Header inserta los programas automáticamente | No tocar ahora; Desarrolla TEA **no** va en `site_settings` (D4) |
| 6 | `content/settings/site_settings.yml` (L19–24 y L74–79 nav es/en) | Entradas de programas en el menú | No (el Header las reemplaza por `getAllPrograms`) | Dejar; deuda anotada (D4) |
| 7 | `components/layout/Nav.tsx` L20 (`PROGRAM_ROUTES`) | Valor por defecto de `programRoutes` | No: `Header` siempre lo pasa. Es código muerto que miente | Quitar el default y volver la prop obligatoria (D6) |
| 8 | `lib/program-references.ts` | Nombres legados ("Mi Escuelita Down" → slug) | No | Dejar: es compatibilidad con datos viejos, no una lista viva |
| 9 | `content/settings/{about,impact}.yml` (`program_slug`) | Referencias de contenido a un programa | No (datos, no lista) | Dejar |
| 10 | Pruebas: `tests/seo/{seo,lang}.spec.ts`, `tests/a11y/a11y.spec.ts`, `tests/consent/consent.spec.ts` (L14, L59, L136), `tests/cms/programas.spec.ts` (L18), `tests/cms/programs-management.spec.ts` (L24–26: `toEqual` con los 3 slugs) | Rutas a recorrer | **Sí:** la de `programs-management` fallaría con 4 programas; las demás no cubrirían la ruta nueva | Helper único `tests/helpers/programs.ts` (D5) |
| 11 | Texto "tres programas" en `content/blog/bienvenida.md` y `impact.yml` L51 ("Segundo año… con tres programas activos") | Histórico (hecho de esa fecha) | No | Dejar |
| 12 | Comentario en `ProgramPageLayout.tsx` L18 ("los 3 programas") | Comentario | No | Actualizar el comentario |
| 13 | `app/[lang]/impacto/ImpactoPageClient.tsx` L27 (mapa de color por programa) y `lib/i18n/{es,en}.ts` L6 (nombres de programas) | Borde de color de la galería y diccionario | No: Desarrolla TEA no tiene galería, y no hay consumidores de esas claves | **Deuda anotada** (Codex, 11-oct): una categoría futura de Desarrolla TEA recibiría borde gris |

## Decisiones técnicas (qué y por qué)
| # | Decisión | Por qué | Alternativa descartada |
|---|---|---|---|
| D1 | El contenido va en `content/programs/desarrolla-tea.{es,en}.md` con el esquema actual; el texto en español es el de `contenido-fuente.md` sin cambios y el inglés el de `contenido-en.md`. | RF-001, RF-009. Cero código de página nuevo. | Página a medida: duplicaría `ProgramPageLayout`. |
| D2 | Agregar `layers`, `shirt` y `user` a `ICON_OPTIONS` y al mapa de `Icon.tsx` (Lucide: `Layers`, `Shirt`, `User`). | El documento los usa; el enum de zod los rechaza hoy. Es lo único que impide validar el contenido. Se descubrió leyendo el catálogo, no por suposición. | Reemplazar por íconos existentes (`list-checks`, `backpack`, `circle-user`): cambia el significado sin necesidad. |
| D3 | **Decidido (11-oct):** `home.featured: true`; la grilla de Inicio pasa a `grid-cols-1 md:grid-cols-2 xl:grid-cols-4` (revisado el 12-oct: con `lg` a 1024px el botón se partía en 2 líneas) y se documenta en `docs/DESIGN_STANDARD.md`. Prueba en rojo primero. | RF-004. 2×2 en tablet evita la tarjeta huérfana del 3+1; 4 columnas en escritorio aprovecha el ancho. Verificar que 4 columnas con `max-w-6xl` no aprieten el texto de las tarjetas (R2). | Dejar 3+1: tarjeta sola en la segunda fila. |
| D4 | Desarrolla TEA **no** se agrega a `site_settings.nav` ni al `siteRoute` enum. | `buildNavItems` ya inserta los programas visibles en el lugar del primero; agregarlo ahí sería duplicar la fuente de verdad. | Agregarlo al enum y a las dos listas: otra copia más que mantener. |
| D5 | **Centralizar en las pruebas:** `tests/helpers/programs.ts` exporta `programSlugs()` (lee `content/programs/*.es.md` con `fs`, sin importar Next) y `UNAUTHORIZED_PROGRAMS` queda explícita. Las specs de SEO, idioma, a11y y CMS la usan. | RF-008. Las pruebas son hoy el mayor foco de repetición (5 archivos) y la única que **rompería** al agregar un programa. | Seguir editando 5 listas a mano en cada programa nuevo. |
| D6 | **Centralización en código/CMS (decidida 11-oct; (b) revisada tras probarla):** (a) quitar el default de `Nav`; (b) ~~`relation` en el select de `slug` de las tarjetas de Inicio~~ **descartado**: se probó con y sin `filters` y en ambos casos el panel marca "CAMBIOS NO GUARDADOS" al abrir Inicio sin editar (con el `config.yml` original y con `select` marca "GUARDADOS"). Queda un `select` con los 4 slugs y una prueba que exige que ofrezca el slug de cada programa; (c) tarjetas de Inicio sin `min`/`max` (son solo respaldo: la tarjeta real sale de `home` de cada programa). Los selects de ruta de menú y pie (L90, L108) **se quedan** (ver evaluación). **No** crear `lib/programs.ts`. | Gate VIII: la fuente de verdad ya es `content/programs/`. Decap lee `config.yml` como YAML estático y no puede importar una constante TS; la herramienta correcta es `relation`. | Registro único en TS: otra copia que se desalinea del CMS. |
| D7 | Sin foto: `hero.image: ''` y galería **declarada pero vacía** (`photos: []`, con los encabezados genéricos de Aula Wawitas); `ProgramGallery` no muestra nada sin fotos. En el panel, `gallery.photos` pasa a `required: false`. | RF-002 y RF-007. Descubierto probando el panel: Decap valida los campos hijos aunque el objeto sea opcional y exigía "Título de sección" de la galería, así que **la Fundación no podía guardar ningún cambio** del programa. | Quitar `title` obligatorio o cambiar el esquema zod: toca el esquema, que esta feature no cambia. |
| D8 | `section_3.items[].items` (sub-puntos de las áreas) pasa a ser editable en el panel (misma definición que en `section_1`). | RF-007. Faltaba en el panel para **todos** los programas (Aula Wawitas incluida); sin el campo, los 32 puntos de Desarrolla TEA no se podían editar. Lo detectó la revisión de Codex. | — |

## Recomendación: ¿conviene centralizar la lista de programas?
**Sí en las pruebas (D5), casi nada en el código, y no una constante nueva.**
- La **fuente de verdad ya está centralizada**: los archivos de `content/programs/`. El código de producción ya los lee (`getAllPrograms`), por eso la ruta, el menú, el pie, el sitemap y Inicio funcionaron sin tocar nada.
- Lo repetido de verdad está en **las pruebas** (5 archivos, y una afirma exactamente 3 slugs) y en **3 selects del CMS**, que Decap no puede alimentar desde TypeScript.
- Un registro `PROGRAMS = [...]` en `lib/` sería una cuarta copia que se desalinea de los `.md` que edita la Fundación desde el panel: justo el riesgo que se quiere evitar.
- Para el CMS, la idea inicial era el widget `relation`; **se probó y se descartó** (deja el panel en "CAMBIOS NO GUARDADOS" al abrir Inicio). Queda una lista fija de 4 slugs en un solo campo, protegida por una prueba que falla si no coincide con `content/programs/`.
- Deuda que **no** conviene saldar ahora: sacar los 3 programas de `site_settings.nav`/`siteRoute` (cambia el esquema y el contenido existente, sin beneficio para esta feature). Queda anotada.

## Evaluación: selects fijos de `config.yml` → widget `relation`
| Lista | ¿Relation? | Por qué |
|---|---|---|
| L165 `slug` de tarjetas de Inicio | **Se probó y se descartó (R5 materializado, 11-oct)** — la fila siguiente es el análisis previo a la prueba. |
| _(análisis previo)_ L165 `slug` de tarjetas de Inicio | _Sí_ | Es solo "elige un programa". El patrón ya existe 7 veces en el mismo archivo (`program_slug`, con `filters: visible = true`), así que no se introduce nada nuevo. Los slugs guardados no cambian de formato (cadena `mi-escuelita-down`), por lo que **`home.yml` y el resto del contenido existente siguen válidos sin migrar**. Efecto visible para la Fundación: el selector pasa de 3 opciones fijas a mostrar el **título** de cada programa visible (Desarrolla TEA incluido, y los futuros). |
| L90 / L108 `route` de menú y pie | **No** | Mezclan páginas fijas (`equipo`, `blog`, …) con programas; `relation` solo lee una colección y no puede mezclar ambas. Además `site_settings.nav` guarda los 3 slugs actuales y el esquema (`siteRoute`) los exige: cambiarlos obligaría a migrar contenido y esquema sin ganancia, porque `buildNavItems` ya inserta los programas visibles solo (D4). |

**Cómo afecta al contenido existente**
- Tarjetas de Inicio (es/en): valores idénticos → sin migración, sin diferencia en el sitio público.
- Si una tarjeta apunta a un programa **oculto**, el filtro `visible` lo esconde del selector y el widget lo muestra vacío (el sitio público sigue igual porque lo filtra `isVisibleProgramReference`). Hoy los 3 están visibles.
- Quitar `min: 3 / max: 3`: ya no se exige un número de tarjetas. Es coherente con que sean solo respaldo: la 4.ª tarjeta pública sale del bloque `home` de Desarrolla TEA, así que incorporarla **no obliga** a crear una 4.ª entrada de respaldo; el tope solo estorbaría si la Fundación quisiera agregarla.

**Riesgo conocido (R5) — SE MATERIALIZÓ el 11-oct:** el `relation` dejaba el panel en "CAMBIOS NO GUARDADOS" al abrir Inicio, con y sin `filters`; se revirtió ese campo a `select` y desapareció. Texto original del riesgo: el propio `config.yml` (L660) registra que un `relation` hacia `team_areas` marcaba "cambios pendientes" sin tocar nada. Los `program_slug` actuales no lo reportan, pero antes de dar por buena la conversión se prueba (T051): abrir "Inicio" sin que quede modificado, guardar cambiando **otro** campo y verificar que se conservan todos los slugs es/en, elegir el programa nuevo y reabrir. Si falla, se revierte este único campo a `select` y se documenta.

## Estructura de archivos afectados
```
content/programs/desarrolla-tea.{es,en}.md     # nuevo (D1)
lib/icon-catalog.ts · components/ui/Icon.tsx   # +3 íconos (D2)
app/[lang]/page.tsx · content/settings/home.yml # grilla y texto (D3)
components/layout/Nav.tsx                       # quitar default (D6)
public/admin/config.yml                         # select con el slug nuevo, sin min/max, sub-puntos y galería vacía (D6, D7, D8)
admin/widgets/IconPicker.tsx                    # mapa de íconos del panel (D2)
tests/cms/desarrolla-tea-panel.spec.ts         # pruebas del panel (T051)
tests/helpers/programs.ts                       # nuevo (D5)
tests/programs/desarrolla-tea.spec.ts           # nuevo
tests/{seo,a11y,consent,cms}/**                 # usan el helper (D5)
docs/{DESIGN_STANDARD,CONTENT}.md · docs/entrega/{MANUAL-CMS,ACTA-ENTREGA}.md  # menciones
```

## Riesgos
- **R1 (medio, materializado el 11-oct):** íconos nuevos: el sitio queda cubierto por `tsc` (`satisfies`), pero el panel tiene su propio mapa en `admin/` que el `tsc` raíz excluye; faltar ahí tumba todo el panel. Mitigación: prueba que cruza el catálogo contra `IconPicker.tsx` (T020).
- **R2 (medio):** 4 tarjetas en Inicio; ancho de mayor riesgo **1024px** (justo al activarse `lg:grid-cols-4`: tarjetas angostas con badges largos y más líneas de texto). Se prueba a 375/768/1024/1280 y se revisa visualmente es/en.
- **R3 (bajo):** la Fundación puede cambiar el orden o el nombre público; todo es contenido (`order`, `title`), sin código.
- **R5 (materializado el 11-oct):** `relation` con "cambios pendientes" fantasma en el panel (ver evaluación). Resuelto revirtiendo ese campo a `select`; la prueba "abrir Inicio sin tocar nada" (T051) evita que vuelva.
- **R4 (bajo):** `test:cms` edita contenido real; una sola instancia a la vez y sin `npm run dev` viejo en el puerto 3000.
