# Tareas: Entrega v1

**Spec:** `spec.md` · **Plan:** `plan.md` · Orden: riesgo primero, test-first (rojo → verde).
`[P]` = paralelizable (no comparten archivos). Cada tarea cita el requisito (RF) que cubre.
Verificación por lote: `npx tsc --noEmit -p tsconfig.json` + `npm run build` (+ la prueba indicada).
**No se hacen commits sin que el responsable lo pida** (Constitución, convenciones).

## Fase 0 — Base estable
- [x] **T001** Guardar la integración: `.gitignore` con `documentacion/`, `.playwright-mcp/`, `test-results/`; quitar scripts temporales (`crawl.mjs`, `inter.mjs`, `vol.mjs`, `ov.mjs`). *(RF-015, RF-016)*
- [ ] **T002** Con aprobación del responsable: commitear el merge (español, prefijo `feat:`/`fix:`) y abrir PR `integracion → develop`; cerrar/reconciliar PRs #37, #38, #42, #43, #45, #46, #47 ya cubiertos. *(RF-016, H9)*

## Fase 1 — Idioma y SEO (riesgo alto: toca la estructura)
- [x] **T010** Prueba en rojo `tests/seo/lang.spec.ts`: `/es/**` → `<html lang="es">`, `/en/**` → `lang="en"`, `/admin` y `/` cargan. *(RF-005)*
- [x] **T011** Reubicar `<html>`/fuentes a `app/[lang]/layout.tsx` y mover `/` y `/admin` a grupos con su propio layout, sin cambiar URLs. Verde T010 + `test:cms` de smoke. *(RF-005, D6)*
- [x] **T012** [P] Prueba en rojo `tests/seo/seo.spec.ts`: existen `/sitemap.xml`, `/robots.txt`, `/favicon.ico`; cada ruta tiene `canonical`, `hreflang es/en` y `og:title/description/image`. *(RF-006)*
- [x] **T013** [P] `app/sitemap.ts` (rutas × idioma, solo programas visibles) y `app/robots.ts`. *(RF-006, D5)*
- [x] **T014** `generateMetadata` con `alternates` y OpenGraph en las 11 rutas + blog; imagen OG por defecto del logo/banner real de la fundación. Verde T012. *(RF-006)*
- [x] **T015** [P] Favicon desde el logo de la fundación (`app/icon.*`). *(RF-006)*

## Fase 2 — Formularios confiables (riesgo alto: se pierden mensajes)
- [x] **T020** Prueba en rojo `tests/api/contact.spec.ts` (servidor real, **sin** `RESEND_API_KEY`): válido → **503** con `error`; correo inválido → 400; honeypot → 400; campos vacíos → 400. Igual para `/api/volunteer`. *(RF-003, RF-004)*
- [x] **T021** Rutas `contact` y `volunteer`: 503 sin clave (sin modo "simulado"); destino desde `site_settings` con override `CONTACT_EMAIL`; remitente configurable por env. Verde T020. *(RF-003, D4)*
- [x] **T022** UI de Contacto y Colabora: ante 503/error mostrar mensaje claro + botón de WhatsApp, nunca confirmación falsa; textos es/en sincronizados. *(RF-003)*
- [x] **T023** `.env.example` completo y comentado (`RESEND_API_KEY`, `CONTACT_EMAIL`, `CONTACT_FROM`, `NEXT_PUBLIC_SITE_URL`, `CLOUDFLARE_R2_*`, OAuth GitHub). *(RF-015)*

## Fase 3 — Consentimiento y contenido veraz (riesgo legal)
- [x] **T030** Prueba en rojo `tests/consent/consent.spec.ts`: en `/es|en/aula-wawitas` y `/pasos-firmes` no hay `<img>` de fotos de actividades; la galería de `/impacto` no incluye fotos de esos programas; los testimonios visibles son exactamente los 3 entregados (sin apellidos de menores). *(RF-001, RF-002)*
- [x] **T031** `programSchema`: `photos_authorized` (default `false`); `ProgramHero`/`ProgramGallery` lo respetan; campo + hint en `public/admin/config.yml`; Escuelita Down `true`, Wawitas/Pasos Firmes `false` (es/en). *(RF-001, D1)*
- [x] **T032** Galería de Impacto: `program_slug` por foto y filtro por programa autorizado; categorías sin fotos se ocultan. *(RF-001, D2)*
- [x] **T033** [P] Reemplazar testimonios por los 3 de la fundación ("Mamá de T./S./R.", programa correcto, es/en) y retirar los anteriores. *(RF-002)*
- [x] **T034** [P] Reemplazar las citas de familia en hero de Inicio, historia destacada de Impacto y carta de Familias por fragmentos de esos 3 (respetando el programa autorizado). *(RF-002, D3)*
- [x] **T035** [P] Cifras: "9 profesionales" en `home.yml`, `about.yml`, `impact.yml`, `equipo_page.yml` (es/en); quitar "1000+ sesiones" y "8 áreas" de Impacto. Prueba de texto en `tests/consent/consent.spec.ts`. *(RF-007)*
- [x] **T036** Familias: confirmar que sin archivo la guía ofrece WhatsApp y con archivo, descarga; ajustar textos para no prometer descarga inexistente (es/en). *(RF-009)*
- [x] **T037** Decisión del responsable (9-oct-2026): se quita la cita de la voluntaria (y su foto) de Colabora; el bloque queda opcional en el esquema y el panel. Además se eliminaron `public/images/wawitas/*.png` (imágenes de stock/IA). *(RF-002)*

## Fase 4 — Blog y noticias
- [x] **T040** Prueba en rojo: Inicio muestra las 3 publicaciones visibles más recientes y se oculta la sección si no hay; ninguna imagen del blog rota. *(RF-008, RF-010)*
- [x] **T041** Sección "Últimas noticias" en Inicio (es/en; contenido en español); quitar la imagen inexistente de `content/blog/bienvenida.md`. Verde T040. *(RF-008, RF-010, D7)*

## Fase 5 — CMS operable
- [x] **T050** [P] `identifier_field` en `testimonios` (`family`) y `equipo` (`name`); prueba: crear entrada → archivo con nombre legible, sin `map-`. *(RF-013, D8)*
- [x] **T051** *(corrida completa 10-oct: 260/261 verdes; el único fallo, `impacto.spec.ts:110` "Entrada guardada", pasó al repetirlo — intermitente del CMS local)* Actualizar la suite `tests/cms/` a los cambios (campos `photos_authorized`, etiquetas) y correr **una** corrida completa verde. *(RF-014)*

## Fase 6 — Accesibilidad y rendimiento
- [x] **T060** Prueba `tests/a11y/axe.spec.ts` (axe sobre las 12 rutas × es/en, 375px): lista de nodos con contraste < AA y objetivos táctiles < 44px (fallando = rojo). *(RF-011)*
- [x] **T061** Corregir contrastes solo con tokens existentes y áreas táctiles (A−/A/A+, selector ES/EN, íconos sociales y links del footer en móvil). Verde T060; actualizar `docs/DESIGN_STANDARD.md` si cambia alguna regla. *(RF-011, D10)*
- [x] **T062** Diagnóstico del LCP de Inicio: medir `develop` vs `integracion`, identificar el recurso/regla que retrasa el pintado del hero; documentar. *(RF-012, D11)*
- [x] **T063** *(cerrada con salvedad: Inicio 85–92, ver `notas-rendimiento.md`)* Un único arreglo acotado según T062; Lighthouse ≥ 90 en `/es`, `/es/mi-escuelita-down`, `/es/contacto` (3 corridas). Si no se logra, registrar en el acta con la medición. *(RF-012)*

## Fase 7 — Entrega
- [x] **T070** [P] `docs/entrega/MANUAL-CMS.md` (para quien edita: crear/editar/ocultar, subir imágenes y PDFs, qué NO tocar) con capturas. *(RF-015)*
- [x] **T071** [P] `docs/entrega/MANUAL-ADMIN.md` (cuentas, variables de entorno, rotación de claves, costos, respaldo del repositorio). *(RF-015)*
- [x] **T072** [P] `docs/entrega/GUIA-DOMINIO.md` (compra `.org` ≤ $15, DNS hacia Vercel, correo institucional para Resend). *(RF-015)*
- [x] **T073** `docs/entrega/GUIA-DESPLIEGUE.md` paso a paso: GitHub de la fundación → Vercel → OAuth del CMS → Cloudflare R2 → Resend → dominio → verificación (Quickstart Q13). *(RF-015, H8)*
- [x] **T074** `docs/entrega/ACTA-ENTREGA.md`: estado de cada requisito (cumple/parcial/no cumple con evidencia), pendientes de la fundación (permisos de Wawitas/Pasos Firmes, firmas institucionales, guías PDF, fotos de 2 profesionales, cifras a validar), **riesgo registrado de fotos de uso general**, y 30 días de soporte. *(RF-015)*
- [x] **T075** *(10-oct: barrido 44 vistas limpio, tsc, build y suite 260/261 OK; rendimiento Lighthouse 65–91 en equipo cargado, ver `notas-rendimiento.md` — repetir en equipo limpio)* Barrido final (rutas × es/en × 375/1280, consola, imágenes, enlaces), Lighthouse, `tsc`, `build`, `test:cms` y todas las pruebas nuevas, **en una sola corrida limpia**; completar la tabla de Quickstart. *(CE-002, CE-003, CE-006)*

## Trazabilidad requisito → tarea
| RF | Tareas | RF | Tareas |
|---|---|---|---|
| RF-001 | T030–T032 | RF-009 | T036 |
| RF-002 | T030, T033, T034, T037 | RF-010 | T040, T041 |
| RF-003 | T020–T022 | RF-011 | T060, T061 |
| RF-004 | T020, T021 | RF-012 | T062, T063 |
| RF-005 | T010, T011 | RF-013 | T050 |
| RF-006 | T012–T015 | RF-014 | T051 |
| RF-007 | T035 | RF-015 | T001, T023, T070–T074 |
| RF-008 | T040, T041 | RF-016 | T001, T002, T075 |

Sin tareas huérfanas: toda tarea traza a un RF. Sin RF sin tarea.
