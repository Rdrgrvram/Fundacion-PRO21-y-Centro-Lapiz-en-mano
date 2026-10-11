# Notas de rendimiento — Inicio (T062/T063)

Mediciones con Lighthouse 12 (móvil, throttling simulado 4G lento + CPU 4×), `npm start` sobre build de producción.

## Diagnóstico (T062)
| Hipótesis | Prueba | Resultado |
|---|---|---|
| Regresión introducida por la integración | `develop` tal cual (3 corridas) | **Descartada**: `develop` da 92 con LCP 3,2–3,3 s; el LCP ya era ~3,3 s antes |
| Cambio de fuente (swap) re-pinta el hero | Inter y Fraunces con `display: 'optional'` | **Descartada**: 87 / 91 / 90, sin mejora |
| Más JavaScript en Inicio | Tamaño de chunks de `/[lang]` | **Descartada**: 336 KB vs 333 KB (sin diferencia) |
| Peso de la foto del hero | Transferencia de la imagen | **Confirmada como factor**: 53 KB en WebP |

El LCP de Inicio (~3,3 s) viene de la foto protagonista del hero y del CSS bloqueante en el perfil móvil más lento de Lighthouse; no de la integración.

## Arreglo acotado (T063)
`next.config.js` → `images.formats: ['image/avif', 'image/webp']`: la foto del hero baja de 53 KB a 36 KB. Sin cambios de código ni de diseño.

## Resultado final
| Ruta | Rendimiento | Accesibilidad | Buenas prácticas | SEO |
|---|---|---|---|---|
| `/es/mi-escuelita-down` | 92–93 | 100 | 100 | 100 |
| `/es/contacto` | 92–95 | 94 → corregida (ver abajo) | 100 | 100 |
| `/es` (Inicio) | **85–92** (mediana ≈ 90; 11 corridas) | 98 | 100 | 100 |

**Inicio queda en el umbral**: la varianza de Lighthouse (±4 puntos entre corridas) hace que a veces dé 85–87. Se registra en el acta como riesgo conocido. Mejoras posibles si la fundación quiere margen: recortar la foto del hero a menor resolución (`sizes`), o reducir el CSS crítico; ambas tocan diseño y quedan fuera de v1.

Accesibilidad de Contacto (94): se corrigieron texto blanco/90 sobre verde, salto de encabezados h2→h4 y `aria-label` de los botones A−/A/A+ que no contenían su texto visible (WCAG 2.5.3). La corrección de contraste y nombre accesible se verifica en `tests/a11y`.

## Deuda de accesibilidad registrada
`heading-order` (buena práctica de axe, no criterio WCAG AA) falla en 14 de 24 rutas por saltos h1→h3/h4. Contacto ya está corregida; el resto requiere revisar el esquema de encabezados de cada página.

## Corrida de verificación final (10-oct-2026, T075)
Lighthouse 12.2.1, móvil, `next start` sobre build de producción, 3 corridas por ruta. Equipo de desarrollo con otros procesos activos (servidor Decap, navegador), por lo que el rendimiento queda por debajo de las mediciones previas.

| Ruta | Rendimiento | LCP | Accesibilidad | Buenas prácticas | SEO |
|---|---|---|---|---|---|
| `/es` | 65 / 79 / 87 | 3,7–4,4 s | 98 | 100 | 100 |
| `/es/mi-escuelita-down` | 75 / 75 / 76 | 3,4–3,7 s | 100 | 100 | 100 |
| `/es/contacto` | 74 / 82 / 91 | 3,3–3,5 s | 100 | 100 | 100 |

Las tres rutas cumplen ≥ 90 en accesibilidad, buenas prácticas y SEO. **Rendimiento no llega a 90 de forma estable** en esta corrida; la varianza es alta (hasta 26 puntos en Inicio). Repetir en un equipo sin carga antes de citar cifras en el acta.

Barrido (44 vistas: 11 rutas × es/en × 375/1280 px): sin errores de consola, sin peticiones ≥ 400, sin imágenes rotas, sin scroll horizontal, 1 `<h1>` por página y 24 enlaces internos sin caídas.
