# 07 · Documentación final (#83)

**Responsable:** José · **Apoyo:** Rodrigo · **Necesita:** los resultados de Lighthouse (#77), QA web (#79) y QA del CMS (#80) · **Tiempo:** 3 a 4 horas

**Meta:** que manuales, acta y PDFs reflejen lo que realmente se probó, y que la Fundación pueda usarlos sola.

## Qué documentos hay (`docs/entrega/`)

| Archivo | Para quién | Qué actualizar al final |
|---|---|---|
| `MANUAL-CMS.md` | Quien edita contenido | Lo que Leo encontró al seguirlo; capturas reales (hay marcas `[Captura: …]`) |
| `MANUAL-ADMIN.md` | Quien administra cuentas | Cuentas reales que quedaron, quién tiene acceso |
| `GUIA-DESPLIEGUE.md` | Persona ajena (CE-005) | Cualquier paso que falló o confundió |
| `GUIA-DOMINIO.md` | Quien compra el dominio | El dominio real y el registrador, cuando se compre |
| `ACTA-ENTREGA.md` | Fundación + equipo | Estado de requisitos, pendientes, fecha, asistentes, soporte |
| `REUNION-FINAL.md` y `HOJA-REUNION.html` | Equipo | Las notas de la reunión |
| `pdf/` | Fundación | Se regenera, no se edita a mano |

## Pasos

1. **Rama:** `feature/docs-cierre` desde `develop` (`git checkout develop && git pull && git checkout -b feature/docs-cierre`).
2. **Reunir insumos** de los issues: #77 (tabla de Lighthouse), #79 (resumen del QA), #80 (hallazgos del CMS), #82 (decisiones de la Fundación).
3. **Actualizar el acta** (`ACTA-ENTREGA.md`):
   - §2 **Estado de cada requisito**: cambia los 🟡 por ✅ solo si hay evidencia (RF-012 Lighthouse, RF-003 formularios, CE-004 y CE-005).
   - §4 **Pendientes de la Fundación**: marca lo resuelto y deja lo que falta con responsable y fecha.
   - §5 **Deuda técnica**: copia las cifras reales de Lighthouse de Vercel. No inventes ni redondees.
   - §7 **Soporte** (contacto de soporte) y §8 **Capacitación** (asistentes y fecha): complétalos cuando se sepan.
4. **Actualizar los manuales** con lo que Leo y José encontraron: textos confusos, pasos que ya no coinciden con el panel, capturas faltantes. Si el manual dice una cosa y el panel hace otra, el manual se corrige.
5. **Regenerar los PDFs** (ver abajo).
6. **PR a `develop`** con prefijo `docs:` (ej. `docs: actualiza acta y manuales con el QA del cierre`). Rodrigo lo revisa y mergea.

## Regenerar los PDFs

```
npm run docs:pdf
```

Convierte los manuales y el acta a `docs/entrega/pdf/`. Revisa que **abran bien** (tablas completas, sin cortes, capturas visibles) antes de subirlos. Si falla, anota el error en el issue y no insistas más de tres veces.

## Cuidado

- **Nada de datos de menores, familias ni credenciales** en la documentación, ni siquiera en capturas. Difumina o recorta.
- **No cambies decisiones**: si algo cambió (rama `master`, sin Cloudflare R2, límite de 5 MB), el documento debe coincidir, pero la decisión no es tuya cambiarla.
- Mantén el tono: claro, en español, pensado para alguien **no técnico** (en los manuales de la Fundación).
- Los «porqué» de las decisiones técnicas importan: si agregas un cambio, escribe por qué.

## Entregable (pegar en el issue #83)

- [ ] PR a `develop` con los documentos actualizados.
- [ ] PDFs regenerados y revisados.
- [ ] Lista corta de qué cambió y por qué.
- [ ] Capturas pendientes: hechas o anotadas como faltantes.

Referencia: issue #41 (documentación técnica, ya cerrado) y #56 (PDFs).
