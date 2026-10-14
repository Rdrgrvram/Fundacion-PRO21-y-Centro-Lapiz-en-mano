# Especificación: Programa Desarrolla TEA

**Rama/ID:** `002-programa-desarrolla-tea` (rama `feature/programa-desarrolla-tea`, desde `develop`)
**Estado:** Aprobada para implementar (clarificaciones resueltas 11-oct-2026; solo orden y nombre público quedan por confirmar con la Fundación)
**Entrada:** "Agregar el programa Desarrolla TEA al sitio, con el contenido del documento oficial del Centro"

Basada en: `contenido-fuente.md` (derivado de `Documentacion/PROYECTO DESARROLLATEA.md`, documento
oficial del Centro Lápiz en Mano) y en la entrega v1 (`specs/001-entrega-v1/`). **Manda el documento
oficial:** no se inventan cifras, años de trayectoria ni testimonios que no estén en él.

## Decisiones ya tomadas
- **Contenido en español:** se usa tal cual `contenido-fuente.md`, sin reescribirlo.
- **Inglés:** traducción fiel del español (`contenido-en.md`); la revisa Codex como REVISOR.
- **Fotos:** `photos_authorized: false` hasta tener la autorización escrita de los padres (Art. IV de la
  constitución, igual que Aula Wawitas y Pasos Firmes). La página debe verse completa y digna sin fotos.
- **Identificador:** `desarrolla-tea` (URL `/[lang]/desarrolla-tea`).
- **Sin testimonios de familias** en la página: el documento no trae ninguno. La cita del hero es una
  declaración institucional atribuida al Centro, no de una familia.

- **Inicio (11-oct-2026):** Desarrolla TEA va como 4.ª tarjeta: 1 columna en celular, 2×2 en tablet y 4 columnas en escritorio. Las tarjetas del CMS ya no se limitan a 3.
- **Centralización (11-oct-2026):** entran en esta feature las pruebas con helper único y los cambios mínimos de código/CMS (ver `plan.md`, D5 y D6). El `relation` de Decap se evaluó y **se descartó** (deja el panel en "CAMBIOS NO GUARDADOS" al abrir Inicio); queda un `select` con los 4 slugs y una prueba que lo mantiene alineado.
- **Cita del hero (11-oct-2026):** se carga en el contenido pero `ProgramHero` no la muestra (igual que en los otros programas); se deja así. El 12-oct pasó a ser **literal** del documento (antes era una paráfrasis).
- **Contenido completo del documento (12-oct-2026, decisión del responsable):** "muestra todo lo del documento, basado en el documento y en la estructura de los programas". La página muestra los 7 principios, las 4 modalidades/horarios (individual, grupal, entre semana, sábados con todos sus puntos), las 8 áreas con **los 77 puntos** del documento y los **11 pasos** de la ruta de ingreso, en español e inglés. Los principios y las áreas van en formato **acordeón**: las tarjetas fijas recortan la descripción a 2-3 líneas y dejaban frases a medias.
- **Inicio (12-oct-2026):** las 4 columnas pasan a `xl` (1280px); a 1024px el botón de la tarjeta se partía en 2 líneas.
- **Decidido (12-oct-2026, "dale"):** el documento tiene secciones **sin lugar en la estructura de los programas**: Justificación, Problemática, Objetivos específicos (11), Población beneficiaria, Articulación interdisciplinaria y Conclusión. Mostrarlas exige una sección nueva (cambio de esquema, componente y panel). Recomendación: agregar una `section_4` opcional con Objetivos, Beneficiarios y Articulación; dejar fuera la prosa institucional (Justificación, Problemática, Conclusión, que cita a la OMS).
- **Orden y nombre (11-oct-2026):** `order: 40` y "Desarrolla TEA" provisionales; la Fundación los confirma después. Cambiarlos es solo contenido.
- **Cita del hero:** declaración institucional del Centro (no de una familia).

## Historias de usuario

### Historia 1 — Una familia con un niño con TEA encuentra el programa (Prioridad: P1)
Como madre o padre de un niño de 3 a 12 años con TEA, quiero una página que me explique cómo trabajan,
qué áreas atienden y cómo inscribirlo, en mi idioma.

**Por qué P1:** es el objetivo de la feature; hoy el sitio solo menciona el autismo a través de Aula Wawitas (3–5 años).
**Prueba independiente:** abrir `/es/desarrolla-tea` y `/en/desarrolla-tea` y leer las secciones completas.

**Escenarios de aceptación:**
1. **Dado** `/es/desarrolla-tea`, **Cuando** se carga, **Entonces** muestra hero, 4 cifras, "Cómo trabajamos" (7 principios),
   "Atención individual, grupal y horarios" (4 pestañas), "Áreas de Intervención" (8 áreas con los 77 puntos del documento), los 11 pasos de ingreso y CTA final.
2. **Dado** `/en/desarrolla-tea`, **Entonces** muestra las mismas secciones traducidas, sin texto en español.
3. **Dado** el CTA, **Entonces** ofrece WhatsApp (con el ícono obligatorio) y el formulario de contacto.

### Historia 2 — Solo se publica lo autorizado (Prioridad: P1)
Como fundación, quiero que la página nueva no muestre fotos de niños mientras no haya autorización escrita.

**Por qué P1:** bloqueante legal y ético (continuidad de la Historia 1 de la entrega v1).
**Prueba independiente:** inspeccionar el HTML de la página y de la galería de Impacto.

**Escenarios de aceptación:**
1. **Dado** `photos_authorized: false`, **Cuando** se visita la página, **Entonces** no aparece ninguna foto de niños (hero ni galería).
2. **Dado** que la fundación entrega la autorización, **Cuando** activa `photos_authorized` y carga fotos desde el panel, **Entonces** aparecen sin cambiar código.

### Historia 3 — El programa es parte del sitio (Prioridad: P1)
Como visitante, quiero llegar al programa desde el menú, el pie de página, Inicio y los buscadores.

**Escenarios de aceptación:**
1. **Dado** cualquier página, **Entonces** "Desarrolla TEA" aparece en el menú "Programas" y en el pie de página, en el orden definido.
2. **Dado** el mapa del sitio, **Entonces** incluye `/es/desarrolla-tea` y `/en/desarrolla-tea` con la relación entre idiomas, `canonical` y vista previa.
3. **Dado** Inicio, **Entonces** la cifra de programas dice 4, el subtítulo de la sección no dice "Tres programas" y Desarrolla TEA aparece como 4.ª tarjeta.
4. **Dado** Inicio a 375px, 768px y 1280px, **Entonces** las tarjetas se ven en 1 columna, 2×2 y 4 columnas respectivamente, sin tarjeta huérfana ni scroll horizontal.

### Historia 4 — La fundación mantiene la página sola (Prioridad: P2)
Como persona de la fundación, quiero editar la página desde el panel (textos, íconos, orden, visibilidad).

**Escenarios de aceptación:**
1. **Dado** el panel, **Cuando** se abre "Programas → Desarrolla TEA", **Entonces** todos los campos se pueden editar y todos los íconos usados existen en el selector.
2. **Dado** un cambio publicado, **Entonces** se refleja en `/es/desarrolla-tea` y el contenido inválido falla con archivo y campo (no se despliega roto).

### Historia 5 — Agregar el próximo programa no obliga a tocar código (Prioridad: P3)
Como equipo, quiero que la lista de programas no esté repetida en el código, las pruebas y el CMS.

**Por qué P3:** mejora de mantenimiento, no de producto. Incluida en esta feature por decisión del responsable (11-oct-2026).
**Escenarios de aceptación:**
1. **Dado** un programa nuevo en `content/programs/`, **Cuando** se corre la suite, **Entonces** sus rutas entran solas en las pruebas de SEO, idioma y accesibilidad.
2. **Dado** un programa nuevo, **Cuando** se corre la suite, **Entonces** una prueba avisa si el selector de programa de las tarjetas de Inicio del panel no ofrece su slug (el selector es una lista fija: un `relation` se probó y se descartó, ver `plan.md`, D6).
3. **Dado** el contenido ya existente (tarjetas de Inicio con los 3 slugs), **Cuando** se abre Inicio en el panel, **Entonces** no queda en "CAMBIOS NO GUARDADOS" y guardar cambiando otro campo conserva todos los slugs en es y en.

## Casos límite
- Programa con `visible: false`: no aparece en menú, pie, Inicio ni mapa del sitio, pero sigue editable.
- Cifra "Lun – Sáb" y rangos "3 – 12": se muestran tal cual en ambos idiomas (con su traducción de días).
- Un ícono del documento que no existe en el catálogo rompería el contenido (validación zod): debe resolverse antes del contenido.
- 4 programas en Inicio: no debe quedar una tarjeta huérfana ni scroll horizontal a 375px.
- Programas del documento que se solapan con Aula Wawitas (autismo, 3–5): no se unifican; cada uno conserva su edad.

## Requisitos funcionales
- **RF-001:** El sistema DEBE publicar `/es/desarrolla-tea` y `/en/desarrolla-tea` con todo el contenido de `contenido-fuente.md` (y su traducción), sin cifras ni testimonios ajenos al documento.
- **RF-002:** El sistema DEBE ocultar toda foto de niños en la página mientras `photos_authorized` sea `false`.
- **RF-003:** El programa DEBE aparecer en el menú "Programas", el pie de página y el mapa del sitio (con `hreflang`, `canonical` y vista previa).
- **RF-004:** Inicio DEBE mostrar la cifra de programas actualizada (4) y no decir "Tres programas"; la tarjeta de Inicio según la decisión pendiente.
- **RF-005:** Todos los íconos del contenido DEBEN existir en el catálogo del selector y en el renderizador.
- **RF-006:** La página DEBE cumplir contraste AA y áreas táctiles ≥ 44px en móvil, igual que el resto.
- **RF-007:** El contenido DEBE ser editable desde el panel, con los textos en `i18n` y sin romper las pruebas del CMS.
- **RF-008:** Las pruebas de rutas/programas NO DEBEN repetir a mano la lista de slugs (solo donde el significado lo exige, p. ej. "sin autorización").
- **RF-009:** Los demás programas y páginas DEBEN seguir igual (sin regresiones visuales ni de pruebas).

## Entidades clave
- **Programa:** el existente (`content/programs/<slug>.<lang>.md`); esta feature agrega una instancia, no cambia el esquema.

## Criterios de éxito
- **CE-001:** 0 fotos de niños en `/es|en/desarrolla-tea` y 0 errores de consola / imágenes rotas / scroll horizontal a 375px y 1280px.
- **CE-002:** Axe sin fallos de contraste ni de área táctil en la ruta nueva (es/en, 375px).
- **CE-003:** `tsc`, `npm run build` (2 páginas SSG más que hoy) y la suite completa pasan al 100% en una sola corrida.
- **CE-004:** Un revisor compara `es` y `en` campo por campo y no encuentra texto sin traducir ni desalineado.

## Fuera de alcance
- Fotos del programa y su autorización (dependencia externa).
- Rediseño de la página de programa: se reutiliza `ProgramPageLayout` tal cual.
- Testimonios, cifras de impacto o galería propios de Desarrolla TEA.
- Cambios al esquema `programSchema`.

## Dependencias externas
- Autorización escrita de los padres para fotos de Desarrolla TEA.
- Confirmación de la Fundación (no bloquea): orden en menú/pie (`order: 40` provisional) y nombre público exacto ("Desarrolla TEA").

## Checklist de completitud del requisito
- [x] No quedan marcadores `[NECESITA CLARIFICACIÓN]` (resueltos el 11-oct-2026; orden y nombre son confirmación externa, no ambigüedad)
- [x] Los requisitos son verificables y sin ambigüedad
- [x] Los criterios de éxito son medibles
- [x] No hay detalles de implementación (stack, APIs, esquemas)
- [x] Cada historia es probable de forma independiente
- [x] No hay features especulativas
- [x] Alcance delimitado (qué SÍ y qué NO)
