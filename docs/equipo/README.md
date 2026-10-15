# Guías del equipo — cierre del proyecto

Una guía por tarea. Cada persona tiene su issue en GitHub; la guía dice **qué hacer, en qué orden, con qué herramientas y cuándo está listo**. Los manuales finales para la Fundación viven en `docs/entrega/`; estas guías son para nosotros.

## Quién hace qué

| Orden | Tarea | Responsable | Apoyo | Issue | Guía |
|---|---|---|---|---|---|
| 1 | Deploy de prueba y Lighthouse | Mauricio | — | #77 | [01-deploy-lighthouse.md](01-deploy-lighthouse.md) |
| 1 | Coordinar la reunión de avance | Mauricio | — | #78 | [02-coordinar-reunion.md](02-coordinar-reunion.md) |
| 2 | QA manual del sitio web | José | — | #79 | [03-qa-web.md](03-qa-web.md) |
| 2 | QA manual del CMS | Leo | — | #80 | [04-qa-cms.md](04-qa-cms.md) |
| 3 | Cuentas institucionales y traspaso | Einar | Huascar | #81 | [05-cuentas-traspaso.md](05-cuentas-traspaso.md) |
| 3 | Dudas y pendientes con la Fundación | Einar | Huascar | #82 | [06-dudas-fundacion.md](06-dudas-fundacion.md) |
| 4 | Documentación final | José | Rodrigo | #83 | [07-documentacion.md](07-documentacion.md) |
| 4 | Presentación del CMS | Leo | — | #84 | [08-presentaciones.md](08-presentaciones.md) |
| 4 | Presentación del producto final | Einar y Huascar | — | #85 | [08-presentaciones.md](08-presentaciones.md) |

El orden importa: el QA (2) necesita la URL del deploy (1). La documentación (4) necesita los resultados del QA y de Lighthouse.

## Reglas comunes

1. **Nada de datos reales de menores ni de familias** en pruebas. Para probar, escribe «Prueba» como nombre.
2. **Ningún secreto en el repo ni en chats**: claves, tokens y contraseñas van a un gestor de contraseñas. Si ves uno publicado, avisa a Rodrigo de inmediato.
3. **Costo cero.** Si un servicio pide tarjeta o plan de pago, detente y consulta. **Cloudflare R2 no se usa en v1**: no crees esa cuenta.
4. **Cambios al repo** (docs, correcciones): rama `feature/<nombre>` desde `develop`, commits en español con prefijo (`docs:`, `fix:`, `content:`), y PR a `develop`. **No hagas push a `develop` ni a `master`**: el merge lo hace Rodrigo.
5. **Si encuentras un error**, abre un issue con la plantilla «Error encontrado en QA» (etiqueta `qa`). No lo arregles tú salvo que sea texto o documentación.
6. **Al terminar tu tarea**: marca las casillas del issue, pega la evidencia (URL, capturas, tabla) y ciérralo o avisa a Rodrigo.
7. **Si te bloqueas más de 30 minutos**, escribe en el issue qué intentaste y qué pasó. No pruebes variaciones sin fin.

## Contexto mínimo que todos deben conocer

- **Qué es:** sitio de la Fundación PRO-21 y Centro Lápiz en Mano (La Paz). Next.js + Decap CMS, español e inglés, hospedado en Vercel.
- **Rama de producción:** `master`. `develop` se conserva como respaldo.
- **Rutas del sitio** (todas en `/es` y `/en`): inicio, `quienes-somos`, `mi-escuelita-down`, `aula-wawitas`, `pasos-firmes`, `desarrolla-tea`, `equipo`, `impacto`, `colabora`, `familias`, `blog`, `contacto`, más el panel en `/admin`.
- **Fotos de niños:** Aula Wawitas, Pasos Firmes y Desarrolla TEA **no deben mostrar fotos** hasta que la Fundación entregue la autorización escrita. Si ves una, es un error grave: repórtalo como `urgente`.
- **Documentos de referencia:** `docs/entrega/` (manuales, guía de despliegue, acta), `specs/001-entrega-v1/quickstart.md` (escenarios de validación Q1–Q13), `docs/DESIGN_STANDARD.md` (diseño).
