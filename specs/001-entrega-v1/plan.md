# Plan de implementación: Entrega v1

**Spec:** `specs/001-entrega-v1/spec.md` · **Rama:** `integracion` · **Constitución:** `memory/constitution.md`
**Stack (sin cambios):** Next.js 14 App Router (SSG) · Tailwind · Decap CMS · zod · Resend · Playwright

## Gates de la constitución (Fase -1)
| Gate | Resultado |
|---|---|
| VII Simplicidad (sin servicios/dependencias nuevas) | ✅ Cero dependencias nuevas. Solo APIs nativas de Next (`sitemap.ts`, `robots.ts`, `metadata`). |
| VIII Anti-abstracción | ✅ Se usa la Metadata API y los esquemas zod existentes tal cual. |
| IX Integration-first | ✅ Pruebas de API con el servidor real de Playwright (`request`), sin mocks. |
| III Test-first | ✅ Las tareas de lógica/API empiezan por la prueba en rojo. |

**Registro de complejidad:** el `lang` correcto por idioma obliga a reubicar `<html>` (hoy fijo en
`app/layout.tsx`). Es la única reestructuración; se justifica por RF-005 (SEO/accesibilidad) y se
hace con *route groups* sin cambiar ninguna URL.

## Decisiones técnicas (qué y por qué)
| # | Decisión | Por qué | Alternativa descartada |
|---|---|---|---|
| D1 | Campo `photos_authorized` (boolean, **default `false`**) en el esquema de programa; hero/galería solo se renderizan si es `true`. Escuelita Down = `true`; Wawitas y Pasos Firmes = `false`. | Cumple RF-001 y "reactivar sin código" (lo cambia la fundación en el panel). El default `false` es seguro: un programa nuevo no muestra fotos hasta autorizarse. | Borrar los campos de foto: pierde los datos y obliga a reingresarlos. |
| D2 | La galería de Impacto filtra por `program_slug` del programa: fotos de programas no autorizados no se muestran. | Evita que las mismas fotos aparezcan por otra puerta. | Quitar la galería: pierde fotos de Escuelita Down y generales. |
| D3 | Las 3 citas de familias se reemplazan **en todos los lugares donde hay una cita de familia** (testimonios, hero de Inicio, historia destacada de Impacto, carta de Familias), usando fragmentos de los 3 testimonios entregados. | RF-001: los testimonios publicados son exactamente los 3 de la fundación. Hoy el hero de Inicio cita a "Familia Quispe", que no está en el documento. | Dejar solo la colección: quedarían citas no validadas en heroes. |
| D4 | Las rutas de contacto y voluntariado responden **503** con mensaje cuando falta `RESEND_API_KEY`; el cliente muestra el error con alternativa de WhatsApp. El destino sale de `site_settings` (con override `CONTACT_EMAIL`). | RF-003, Art. VI: un servicio sin configurar nunca simula éxito. | Mantener el modo "simulado": ya causó confirmaciones falsas. |
| D5 | `app/sitemap.ts` y `app/robots.ts` generados desde las rutas y programas visibles; `alternates.languages` + `canonical` + OpenGraph por página mediante `generateMetadata`; favicon por la convención `app/icon`. | RF-006. APIs nativas, sin librerías (Art. VII). | `next-sitemap`: dependencia innecesaria. |
| D6 | `<html lang>` por idioma: `app/[lang]/layout.tsx` pasa a contener `<html lang={lang}>`; `/`, `/admin` y `/api` quedan en sus propios grupos. | RF-005, la única forma estática correcta (sin leer cabeceras, que haría las páginas dinámicas). | Cambiar `lang` por JS: rastreadores sin JS verían `es`. |
| D7 | Blog: las publicaciones se leen igual en ambos idiomas (español). Inicio muestra las 3 últimas visibles; la sección se omite si no hay. El post "bienvenida" pierde la referencia a la imagen inexistente (queda el placeholder). | RF-008, RF-010 y regla de no usar stock/IA. | Reusar una foto de actividades: implica menores sin autorización vinculada. |
| D8 | `identifier_field: family` (testimonios) y `identifier_field: name` (equipo) en el CMS. | RF-013: hoy se guardan como `map-name-...`. | Slugs manuales: fricción para la fundación. |
| D9 | Cifras: 9 profesionales en todo el sitio; Impacto sin "1000+ sesiones" ni "8 áreas". | RF-007. Solo contenido (`.yml`), sin código. | — |
| D10 | Accesibilidad: se audita con axe (vía Playwright) para obtener la lista exacta de nodos; el contraste se corrige **solo con tokens existentes**; áreas táctiles ≥44px con `min-h/min-w` en móvil. | RF-011; Art. V (nunca hex crudo nuevo). | Cambiar la paleta: fuera de alcance. |
| D11 | Rendimiento de Inicio: diagnóstico primero (¿ya existía en `develop`?, ¿qué retrasa el pintado del hero?), luego un único cambio acotado. | El experimento con fuentes no mejoró; no se aplica un arreglo sin causa demostrada. | Optimizar a ciegas. |
| D12 | Documentación de entrega en `docs/entrega/`; `documentacion/` va a `.gitignore`. | RF-015, Art. IV. | — |

## Estructura de archivos afectados (resumen)
```
app/
  [lang]/layout.tsx           # <html lang>, fuentes (D6)
  (root)/…  (admin)/…         # grupos para / y /admin (D6)
  sitemap.ts · robots.ts · icon.*   # D5
  [lang]/**/page.tsx          # metadata + alternates (D5), noticias en Inicio (D7), filtro Impacto (D2)
  api/contact · api/volunteer # 503 sin clave, destino desde settings (D4)
lib/cms-schemas.ts · lib/cms.ts        # photos_authorized (D1)
content/{programs,testimonios,settings,blog}/**   # contenido (D1,D3,D7,D9)
public/admin/config.yml                 # identifier_field, campo photos_authorized (D1,D8)
tests/{api,seo,consent}/**  tests/cms/**  # pruebas (ver tasks)
docs/entrega/**  .env.example  .gitignore  # D12
```

## Riesgos
- **R1 (alto):** la reubicación de `<html>` (D6) puede romper `/admin` o la ruta `/`. Mitigación: hacerla primero, con el barrido de rutas y `test:cms` como red de seguridad.
- **R2 (medio):** no se puede vincular cada foto de uso general a una autorización (decisión del responsable: se dejan; consta en el acta).
- **R3 (medio):** LCP de Inicio sin causa conocida (D11); si no se resuelve, se documenta como deuda con la medición.
- **R4 (bajo):** `test:cms` edita contenido real; se corre una sola instancia a la vez.
