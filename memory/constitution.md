# Constitución del Proyecto: Sitio web Fundación PRO-21 y Centro Lápiz en Mano

> Principios no negociables que rigen cómo las especificaciones se convierten en
> código en este proyecto. Complementa `CLAUDE.md` (contexto) y
> `docs/DESIGN_STANDARD.md` (patrones visuales); si hay contradicción, gana esta
> constitución.

## Artículo I — Library-First (adaptado a Next.js)
Cada pieza de lógica (lectura de contenido, validación, envío de formularios,
armado de metadatos SEO) vive en un módulo de `lib/` o en un componente
reutilizable de `components/`, no dentro de una página. Las páginas solo componen.

## Artículo II — Comportamiento observable
Cada módulo se puede verificar desde fuera de la UI: funciones puras con
entrada/salida clara, rutas de API con contrato (código HTTP + cuerpo), contenido
validado con un esquema (zod). Nada que solo se pueda probar abriendo el navegador.

## Artículo III — Test-First (no negociable)
No se escribe implementación antes de: (1) escribir la prueba, (2) confirmar que
falla, (3) recién entonces el código que la hace pasar. Aplica a lógica y rutas
de API. Los ajustes puramente visuales se verifican con el barrido de navegador
(rutas × es/en × 375/1280px) y se registran en el spec.

## Artículo IV — Contenido real y consentimiento (específico del proyecto)
- Solo fotos y testimonios reales de la fundación; **nunca** stock ni imágenes de IA.
- **Fotos de menores y testimonios solo con autorización escrita, firmada por los
  padres y por la institución, y del programa correspondiente.** Sin
  autorización vigente, el contenido no se publica.
- Nunca se publican nombres completos de menores; a lo más, nombre de pila o
  "Mamá de T.".
- Los documentos con datos de menores (`documentacion/`) nunca se versionan.
- Nada de datos, código ni documentos internos del BCP en este repositorio.

## Artículo V — Accesibilidad y bilingüe (específico del proyecto)
- Cumplimiento WCAG AA: contraste ≥ 4,5:1, áreas táctiles ≥ 44px en móvil,
  `lang` correcto por idioma, navegable con teclado.
- Todo texto visible existe en español **y** en inglés, sincronizados. Si no hay
  traducción lista, se declara explícitamente; no se mezclan idiomas por descuido.
- Todo color se traza a un token de `tailwind.config.js` o `lib/palette.ts`;
  nunca hex crudo nuevo.

## Artículo VI — Operable por la fundación, costo cero (específico del proyecto)
- La fundación edita contenido sin tocar código (Decap CMS); cada campo editable
  tiene su esquema validado, y el contenido inválido falla en el build con
  archivo y campo exactos.
- Costo máximo $15 USD/año (solo el dominio `.org`); servicios en planes gratuitos.
- Ningún secreto en archivos versionados: todo va en variables de entorno
  (`.env.example` documenta las necesarias). Un servicio sin configurar **nunca**
  simula éxito: falla de forma visible.
- Cada entrega incluye documentación de operación para personas no técnicas.

## Artículo VII — Simplicidad
- Se usa el stack definido (Next.js, Tailwind, Decap, Vercel, R2, Resend); no se
  agregan servicios ni dependencias sin justificación escrita en el plan.
- Prohibido el "future-proofing": no se construye para requisitos hipotéticos.
- Cambios mínimos y enfocados; sin refactors no pedidos.

## Artículo VIII — Anti-abstracción
- Se usan las funciones del framework directamente (metadata API, rutas de
  App Router, `next/image`) sin envolverlas en capas propias.
- Una sola representación de cada contenido: el esquema zod de `lib/cms-schemas.ts`.

## Artículo IX — Integration-First Testing
- Se prefieren servicios y archivos reales a mocks (la suite `tests/cms/` edita
  contenido real y lo restaura).
- Las pruebas de contrato de las rutas de API son obligatorias antes de
  implementarlas o cambiarlas.

## Convenciones de trabajo
- Commits en español con prefijos `feat:` `fix:` `content:` `style:` `docs:`;
  sin commit ni push sin que el responsable lo pida.
- Ramas: `main`, `develop`, `feature/nombre`.
- Verificación mínima antes de dar algo por terminado: `npx tsc --noEmit`,
  `npm run build` y las pruebas que correspondan.

## Proceso de enmienda
Modificar esta constitución requiere documentar la razón y la aprobación de quien
mantiene el proyecto.

| Fecha | Artículo modificado | Razón |
|---|---|---|
| 2026-10-09 | Creación | Adopción de SDD para cerrar el desarrollo y preparar la entrega |
