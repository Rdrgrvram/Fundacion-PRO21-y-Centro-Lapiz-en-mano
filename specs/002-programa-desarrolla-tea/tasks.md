# Tareas: Programa Desarrolla TEA

**Spec:** `spec.md` · **Plan:** `plan.md` · Orden: pruebas primero (rojo → verde), riesgo primero.
`[P]` = paralelizable (no comparten archivos). Cada tarea cita el requisito (RF) que cubre.
Verificación por lote: `npx tsc --noEmit -p tsconfig.json` + `npm run build` (+ la prueba indicada).
**No se hacen commits, push ni merge sin que el responsable lo pida.** Antes de `npm run test:cms`, apagar cualquier `npm run dev` en el puerto 3000.

## Fase 0 — Preparación
- [x] **T001** *(11-oct, solo lectura de `PROYECTO DESARROLLATEA.md`)* **Sin discrepancias de hechos:** 3–12 años, 8 áreas, 2 modalidades, lunes a viernes + sábados, Plan Individual de Intervención, las 8 áreas con sus puntos y la ruta de 11 pasos (resumida en 4) coinciden con el documento. **Dos decisiones editoriales a confirmar con la Fundación:** (a) el documento enumera 7 principios (Integral, Individualizado, *Interdisciplinario*, Centrado en la familia, *Funcional*, *Inclusivo*, Basado en fortalezas) y la página muestra 4: faltan los 3 en cursiva; (b) la cita del hero es una **paráfrasis** de la premisa del documento ("…la intervención debe adaptarse al niño y no pretender que todos respondan al mismo modelo"), atribuida al Centro; hoy no se muestra. También se omiten los estímulos gustativos y olfativos. Contrastar `contenido-fuente.md` con `Documentacion/PROYECTO DESARROLLATEA.md` (solo lectura; no copiar nada fuera de las dos carpetas de la spec): cifras, rangos de edad, 11 pasos resumidos en 4. Anotar diferencias en la spec. *(RF-001)*
- [x] **T002** *(11-oct-2026)* Decididos por el responsable: 4.ª tarjeta en Inicio (1/2×2/4 columnas), D5 y D6 dentro de esta feature, `order: 40` y "Desarrolla TEA" provisionales (la Fundación confirma después). *(RF-003, RF-004)*

## Fase 1 — Pruebas en rojo
- [x] **T010** [P] `tests/helpers/programs.ts`: `programSlugs()` (lee `content/programs/*.es.md`) y `UNAUTHORIZED_PROGRAMS = ['aula-wawitas','pasos-firmes','desarrolla-tea']`. *(RF-008, D5)*
- [x] **T011** `tests/programs/desarrolla-tea.spec.ts` (servidor real, `request`): `/es|en/desarrolla-tea` → 200, título y secciones esperadas (4 cifras, 4 tarjetas, 3 pestañas, 8 áreas, 4 pasos), **sin** `/images/actividades` ni `/images/uploads`, enlace en el menú y en el pie, `canonical`/`hreflang`, presente en `/sitemap.xml`, sin texto en español en `/en`. Rojo: la ruta aún no existe. *(RF-001, RF-002, RF-003)*
- [x] **T012** [P] Prueba de íconos: todo `icon:` de `desarrolla-tea.*.md` está en `ICON_NAMES`, y todo `ICON_NAMES` tiene componente en `Icon.tsx`. Rojo: faltan `layers`, `shirt`, `user`. *(RF-005, R1)* *(Implementada dentro de `tests/programs/desarrolla-tea.spec.ts`; el cruce catálogo ↔ `Icon.tsx` ya lo garantiza `tsc` con `satisfies Record<IconName, …>`, por eso la prueba solo valida el contenido contra `ICON_NAMES`.)*
- [x] **T013** *(reescrita 11-oct tras la revisión de Codex)* `tests/programs/inicio-programas.spec.ts`, acotada a `data-testid="programs-grid"` (menú y pie también enlazan a los programas): una tarjeta por programa destacado en el orden del sitio, Desarrolla TEA 4.ª con su enlace, cifra "4 programas activos", subtítulo sin "tres", y columnas efectivas medidas en navegador a 375/768/1024/1280px (1/2/2/4 desde el 12-oct; antes 1/2/4/4) sin scroll horizontal. *(RF-004, R2)*
- [x] **T014** Migrar al helper las listas fijas: `tests/seo/{seo,lang}.spec.ts`, `tests/a11y/a11y.spec.ts`, `tests/consent/consent.spec.ts` (L14, L59, L136), `tests/cms/programas.spec.ts` (L18) y reescribir `programs-management.spec.ts` L24–26 (`toEqual` con 3 slugs) para comparar contra el helper. Rojo donde la ruta nueva aún no existe. También `tests/cms/programas.spec.ts`: el listado del panel exige el enlace "Desarrolla TEA". *(RF-008, RF-009, D5)*
- [x] **T015** *(11-oct)* Rojo confirmado: 28 fallos en 120 pruebas (92 verdes). Rutas `/es|en/desarrolla-tea` 404, contenido ausente (ENOENT), Inicio sin su tarjeta ni grilla 1/2/4, subtítulo con "Tres programas", `config.yml` con `min/max: 3` y `select`, `programs-management` con 3 programas. `tsc` OK. Intermitente ajeno: `/es|en/aula-wawitas: sin testimonios…` falló en la corrida larga y pasa aislada (arranque en frío del servidor). *(Art. III)*

## Fase 2 — Íconos (desbloquea el contenido)
- [x] **T020** *(11-oct)* Agregar `layers`, `shirt`, `user` a `ICON_OPTIONS` (etiqueta en español), al mapa de `Icon.tsx` **y al mapa de `admin/widgets/IconPicker.tsx`** (proyecto aparte que el `tsc` raíz no revisa: sin esto el selector del panel cae con "Minified React error #130"; lo descubrió la corrida de pruebas del panel). Guarda nueva: `desarrolla-tea.spec.ts` › "todo ícono del catálogo está también en el selector del panel". Después de tocar el catálogo hay que recompilar el panel (`node scripts/build-admin.mjs`). Verde T012. *(RF-005, D2)*

## Fase 3 — Contenido
- [x] **T030** `content/programs/desarrolla-tea.es.md`: frontmatter con el YAML de `contenido-fuente.md` **sin cambiar el texto**; `photos_authorized: false`, `image: ''`, galería declarada pero vacía (`photos: []`, D7: el panel exige su título para poder guardar). *(RF-001, RF-002, D1)*
- [x] **T031** `content/programs/desarrolla-tea.en.md` desde `contenido-en.md`; mismas claves, íconos, colores y `order` que el español. *(RF-001, D1)*
- [x] **T032** `npx tsc --noEmit` + `npm run build`: 2 páginas SSG más (39), sin errores de validación zod. Verde T011 (excepto lo que dependa de T040+). *(RF-001, CE-003)*

- [x] **T033** *(12-oct, decisión del responsable: "muestra todo lo del documento")* Contenido ampliado al documento completo dentro de la estructura de los programas, es y en: 7 principios (acordeón), 4 modalidades con sus puntos (9/10/4/7), 8 áreas con los 77 puntos (acordeón) y 11 pasos de ingreso; cita del hero literal. `section_3` gana el campo "Formato visual" en el panel (sin él Decap borraba `layout` al guardar). Pruebas actualizadas (`desarrolla-tea.spec.ts`, `desarrolla-tea-panel.spec.ts`). *(RF-001, RF-007)*
- [x] **T034** *(resuelta 12-oct: `section_4` opcional con Objetivos, Beneficiarios y Articulación; prosa institucional fuera)* Secciones del documento sin lugar en la estructura: Justificación, Problemática, Objetivos específicos, Población beneficiaria, Articulación interdisciplinaria, Conclusión. Ver `spec.md` › Decisiones. *(RF-001)*

## Fase 4 — Inicio y navegación
- [x] **T040** `home.yml` (es/en): subtítulo de programas sin "Tres"/"Three". *(RF-004)*
- [x] **T041** *(12-oct: 4 columnas desde `xl`, no `lg`)* Grilla de Inicio `grid-cols-1 md:grid-cols-2 xl:grid-cols-4`, `home.featured: true` en ambos idiomas y entrada en `docs/DESIGN_STANDARD.md`. Verde T013. *(RF-004, D3)*
- [x] **T042** [P] `Nav.tsx`: quitar `PROGRAM_ROUTES` y volver `programRoutes` obligatorio; actualizar el comentario de `ProgramPageLayout.tsx` L18. `tsc` verde. *(RF-008, D6)*

## Fase 5 — CMS operable
- [x] **T050** *(revisada 11-oct)* `public/admin/config.yml`: quitar `min: 3` / `max: 3` de las tarjetas; el `slug` quedó como `select` con los 4 slugs (el `relation` se probó y se descartó, ver D6); `section_3` gana el campo "Sub-puntos" (D8); `gallery.photos` con `required: false` (D7). ~~select → relation~~ Dejar los selects de ruta L90/L108. Ajustar `tests/cms/inicio.spec.ts` (L38 espera la etiqueta "compartido por las 3 tarjetas": cambiar el texto del campo en `config.yml` a "…por todas las tarjetas" y la prueba a la vez). *(RF-007, D6)*
- [x] **T051** *(11-oct, `tests/cms/desarrolla-tea-panel.spec.ts`, 6 pruebas verdes: publicar el nombre, editar un sub-punto sin tocar el inglés, campo de sub-puntos visible, abrir Inicio sin estado pendiente, conservar slugs, elegir Desarrolla TEA en una tarjeta y reabrir)* Pruebas del panel (patrón de `tests/cms/programas.spec.ts`): (a) abrir "Programas → Desarrolla TEA", editar el título, publicar y ver el cambio en `/es/desarrolla-tea`; (b) abrir la entrada "Inicio", comprobar que las tarjetas muestran su programa y que **no queda en estado modificado** sin tocar nada (R5); guardar cambiando **otro** campo y verificar que se conservan todos los slugs es/en; elegir el programa nuevo en una tarjeta de prueba y reabrir; restaurar archivos. Si (b) falla, revertir solo L165 a `select` con los 4 slugs y documentarlo. *(RF-007, R5)*
- [x] **T052** *(12-oct)* **Corrida completa verde: 321/321** (10,5 min, sin las 2 pruebas que enviaban correos; ya corregidas: `playwright.config.ts` arranca el servidor con `RESEND_API_KEY` vacía y `tests/api` pasa 12/12 sin enviar nada). Historial: corrida 1 = 309 verdes/6 rojos, corrida 2 = 316/3 (ver causas arriba); todos resueltos. Una corrida completa de `npm run test:cms` verde (sin `npm run dev` previo). *(CE-003, RF-009)* — *Corrida 1 (11-oct): 309 verdes y 6 rojos, ninguno de la feature: 2 timeouts de 30 s (a11y `/en`, favicon; pasan aislados), 2 de `tests/api/forms` (esperan 503 pero el servidor tiene clave de correo real en `.env.local` y responde 200: preexistente) y 2 de Aula Wawitas ("Test not found in the worker": lo causaba mi helper al depender de `visible`; corregido y verificado). Falta repetir la corrida completa.*

## Fase 6 — Accesibilidad y consentimiento
- [x] **T060** Axe sobre `/es|en/desarrolla-tea` a 375px (contraste AA, objetivos táctiles ≥ 44px); corregir solo con tokens existentes. *(RF-006, CE-002)*
- [x] **T061** *(11-oct, capturas revisadas)* Inicio a 768 px queda 2×2 limpio, a 1024 px 4 columnas con el botón "Conocer programa" partido en 2 líneas (legible, pero justo) y el hero móvil de la página nueva se ve correcto. Barrido automático en 4 anchos y es/en dentro de `inicio-programas.spec.ts`. Barrido visual (Playwright MCP): ruta nueva y Inicio a 375/768/**1024**/1280px, es/en: sin errores de consola, imágenes rotas ni scroll horizontal; íconos nuevos legibles. *(CE-001)*

## Fase 7 — Documentación y cierre
- [x] **T070** [P] `docs/CONTENT.md` (tracker), `docs/entrega/MANUAL-CMS.md` (programa nuevo) y `docs/entrega/ACTA-ENTREGA.md` (pendiente: autorización de fotos de Desarrolla TEA, junto a Wawitas/Pasos Firmes). Ofrecer sumar la ruta a la tabla de páginas de `CLAUDE.md`. *(RF-009)*
- [x] **T071** *(3 revisiones de Codex, 11-oct; hallazgos aplicados)* [P] Revisión por Codex (rol REVISOR, solo informa): `es`/`en` alineados campo por campo, íconos, `photos_authorized`, listas hardcodeadas restantes. Resolver hallazgos bloqueantes/importantes. *(CE-004)*
- [x] **T072** *(12-oct, repetido con el contenido completo: 325/325 en una corrida limpia, sin nada en paralelo)* `tsc` OK, `npm run build` OK (39 páginas) y suite 321/321 en una sola corrida limpia. Falta solo la autorización de fotos y confirmar orden/nombre con la Fundación (no son código). *(Ofrecer actualizar `STATE.md`.)* Cierre: `tsc`, `build` y `test:cms` en una sola corrida limpia; completar el estado; ofrecer actualizar `STATE.md` (una línea). *(CE-003)*

## Trazabilidad requisito → tarea
| RF | Tareas | RF | Tareas |
|---|---|---|---|
| RF-001 | T001, T011, T030–T032 | RF-006 | T060 |
| RF-002 | T011, T030 | RF-007 | T050–T052 |
| RF-003 | T002, T011 | RF-008 | T010, T014, T042 |
| RF-004 | T002, T013, T040, T041 | RF-009 | T014, T052, T070 |
| RF-005 | T012, T020 | CE-001..004 | T061, T060, T032/T052/T072, T071 |

Sin tareas huérfanas: toda tarea traza a un RF o a un criterio de éxito. Sin RF sin tarea.
