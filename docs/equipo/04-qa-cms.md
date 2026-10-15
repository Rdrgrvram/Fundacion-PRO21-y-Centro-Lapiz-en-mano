# 04 · QA manual del CMS (`/admin`) (#80)

**Responsable:** Leo · **Necesita:** la URL del deploy (#77) y que el login de `/admin` funcione · **Tiempo:** 3 a 4 horas

**Meta:** comprobar que una persona sin conocimientos técnicos puede editar el sitio sin romperlo, y dejar una lista de fallos.

> El CMS (Decap) edita archivos del repositorio: **cada guardado hace un commit en `master`** y Vercel vuelve a publicar en ≈ 3 minutos. Por eso: **trabaja con datos de prueba y deshaz lo que crees**.

## Antes de empezar

- Lee [`docs/entrega/MANUAL-CMS.md`](../entrega/MANUAL-CMS.md). Probarás **siguiéndolo al pie de la letra**: si algo del manual no coincide con el panel, es un hallazgo.
- Necesitas una cuenta de GitHub con permiso **Write** en el repo (Rodrigo te la da).
- El login requiere una OAuth App (paso 3 de [`GUIA-DESPLIEGUE.md`](../entrega/GUIA-DESPLIEGUE.md)). Si Mauricio aún no la creó, pídele que lo haga con la URL de prueba, o créala tú. Si las cuentas institucionales aún no están (#81), prueba con las actuales y repite una verificación corta cuando estén.
- Usa nombres como «Prueba» y **no subas fotos de menores**.

## Qué probar, por colección

Para cada una: **crear → guardar → publicar → verlo en el sitio → ocultar/deshacer**.

| Sección del panel | Qué probar |
|---|---|
| Configuración general | Cambiar un texto del pie de página; verlo en el sitio; **devolverlo** |
| Inicio, Quiénes somos, Impacto, Colabora, Familias, Contacto | Editar un texto y una foto; verificar es y en |
| Programas | Abrir cada uno (incluido Desarrolla TEA); guardar **sin cambios** y comprobar que no queda en «cambios no guardados» |
| Testimonios | Crear uno de prueba; usar el interruptor **«Visible en el sitio»** para ocultarlo |
| Equipo (profesionales, áreas, voluntarios) | Crear una persona de prueba; ocultarla |
| Blog | Crear una publicación de prueba (≈ 10 min con el manual); la fecha debe llenarse sola; verla en `/es/blog` y en Inicio; ocultarla |

## Casos que suelen fallar

- [ ] **Subir imagen** (< 5 MB) y verla en el sitio. La imagen queda en `public/images/uploads`.
- [ ] **Subir PDF** (< 5 MB) y descargarlo desde el sitio. Queda en `public/docs`. El panel **no impide** subir uno más grande: el manual lo explica.
- [ ] **Selector de ícono**: elegir uno y comprobar que aparece.
- [ ] **Campos es/en**: dejar uno vacío y ver qué pasa en el sitio.
- [ ] **Guardar con un campo obligatorio vacío**: el panel debe avisar.
- [ ] **Ocultar un programa** y comprobar que desaparece del menú y de Inicio.
- [ ] **Deshacer un cambio** como indica el manual (§5 y `MANUAL-ADMIN.md` §7).
- [ ] **Tiempo real:** medir cuánto tarda en verse un cambio publicado. Debería ser ≈ 3 min.

## Confirmación en GitHub

Tras publicar, abre el repo → **Commits**: debe haber un commit nuevo con el cambio. Comprueba que el autor no sea una cuenta equivocada.

## Después de probar

- [ ] **Deshacer todo lo de prueba** (ocultar o borrar entradas, devolver textos). No dejes publicaciones de prueba visibles.
- [ ] Cada fallo → issue con la plantilla «Error encontrado en QA» (captura incluida).
- [ ] Anotar sugerencias para el manual en el issue (pasa a documentación, #83).

## Entregable (pegar en el issue #80)

- [ ] Checklist por colección (hecho / falló / observación).
- [ ] Tiempo medido entre guardar y ver el cambio.
- [ ] Lista de errores con enlaces a sus issues.
- [ ] Confirmación de que todo lo de prueba quedó deshecho.
- [ ] Notas útiles para la presentación del CMS ([08](08-presentaciones.md)).

Issue técnico relacionado: #62 (OAuth y publicación en producción).
