# Revisión de Codex — spec 002 (Programa Desarrolla TEA)

Codex actuó como **REVISOR** según `AGENTS.md`: modo solo lectura (`codex exec -s read-only`), sin editar archivos, con evidencia `archivo:línea`. Hubo **4 revisiones** durante la implementación (11 y 12-oct-2026). Ninguna encontró hallazgos **bloqueantes** al cierre. Los textos íntegros de las respuestas se conservan en la carpeta temporal de la sesión; este documento resume qué dijo y qué se hizo.

## Revisión 1 — plan y primeras pruebas (11-oct)
| Sev. | Hallazgo | Resolución |
|---|---|---|
| Bloqueante | La prueba de la grilla de Inicio prohibía `md:grid-cols-3 gap-6 max-w-6xl` en todo `page.tsx`, y esa combinación también la usa la sección de testimonios: no pasaría nunca | Prueba acotada a la sección con `data-testid="programs-grid"` |
| Importante | Las pruebas de Inicio buscaban el enlace en todo el HTML (menú y pie ya lo traen): pasaban sin la 4.ª tarjeta | Se prueba dentro de la sección: 4 tarjetas, Desarrolla TEA en 4.ª posición y la cifra "4 programas activos" |
| Importante | Faltaba la prueba responsive declarada en T013 | Columnas medidas en navegador a 375/768/1024/1280 px, sin desbordamiento |
| Importante | `relation` de Decap: faltaba probar el guardado real | Se probó y se **descartó** (ver Revisión 2/3 y `plan.md` D6) |
| Importante | La prueba de consentimiento no ejercía el filtro (con `image: ''` pasa siempre) | Pruebas que cargan fotos con `photos_authorized` en `false` y en `true` |
| Importante | `tests/cms/programas.spec.ts` seguía con los 3 nombres originales | El listado del panel exige "Desarrolla TEA" |
| Menor | El plan exageraba el efecto de `max: 3`; el inventario omitía el mapa de colores de Impacto | Plan corregido; deuda anotada en `plan.md` fila 13 |

## Revisión 2 — cambios sin commit (11-oct)
| Sev. | Hallazgo | Resolución |
|---|---|---|
| Importante | Los puntos de `section_3` no eran editables en el panel (`config.yml`), hueco que afectaba a **todos** los programas | Campo "Sub-puntos" agregado (`plan.md` D8) |
| Importante | Falta probar la compatibilidad del `relation` | Se descartó: dejaba el panel en "CAMBIOS NO GUARDADOS" al abrir Inicio. Queda un `select` con los 4 slugs y una prueba que lo mantiene alineado |
| Importante | "3 – 12 / years served" se lee como años de servicio | "ages served" |
| Importante | La cita del hero no se renderiza | **Decisión del responsable:** se deja sin mostrar |
| Menor | T041 sin la entrada de `DESIGN_STANDARD.md` | Agregada |

## Revisión 3 — estado intermedio (11-oct)
| Sev. | Hallazgo | Resolución |
|---|---|---|
| Importante | T051 sin probar elegir Desarrolla TEA en una tarjeta y reabrir | Prueba en `tests/cms/desarrolla-tea-panel.spec.ts` |
| Importante | Sin prueba de editar un sub-punto y publicar | Prueba agregada: cambia solo el texto en es y deja intacto el inglés |
| Importante | Las pestañas se probaban buscando cadenas en el HTML | Prueba en navegador: se hace clic en cada modalidad |
| Menor | El helper desempataba por slug y el sitio por título | Igualado |
| Menor | `plan.md` conservaba instrucciones de `relation`; encabezados de la galería en inglés cruzados | Limpiado y alineado (el cruce ya existía en Aula Wawitas y Pasos Firmes: no se tocó) |
| Menor | El YAML de `contenido-fuente.md` pierde texto si se copia literal | Nota de advertencia agregada |

## Revisión 4 — contenido completo del documento (12-oct)
Contrastó `desarrolla-tea.es.md` con `Documentacion/PROYECTO DESARROLLATEA.md`.

**Verificado por Codex:** es y en alineados campo por campo; están los 7 principios, los 77 puntos de las áreas y los 11 pasos; la cita en español es literal; sin cifras inventadas; íconos presentes en catálogo, `Icon.tsx` y picker del panel; `photos_authorized: false` en ambos idiomas.

| Sev. | Hallazgo | Resolución |
|---|---|---|
| Importante | El área sensorial omitía "cuando corresponda, con la orientación de profesionales especializados" (documento, línea 247) | Agregado en es y en |
| Importante | Ninguna prueba protegía que `section_1.layout` y `section_3.layout` siguieran en `acordeón` al publicar, ni que cada tarjeta mostrara todo su texto | Dos pruebas nuevas: `layout` conservado tras publicar (panel) y apertura de las 15 tarjetas × 2 idiomas comprobando descripción y todos los puntos |
| Menor | `spec.md:40`, `plan.md:44`, `tasks.md:16` y `docs/CONTENT.md:195` describían la versión anterior (3 pestañas, `lg`, 4 pasos…) | Actualizados |

> Las correcciones de la Revisión 4 **no fueron re-revisadas por Codex**; se verificaron con pruebas (28 verdes en la feature y la suite completa final).

## Pendiente de decisión (no es defecto)
Secciones del documento sin lugar en la estructura de los programas: Justificación, Problemática, Objetivos específicos, Población beneficiaria, Articulación interdisciplinaria y Conclusión (`tasks.md` T034). Recomendación: una `section_4` opcional con Objetivos, Beneficiarios y Articulación; dejar fuera la prosa institucional.
