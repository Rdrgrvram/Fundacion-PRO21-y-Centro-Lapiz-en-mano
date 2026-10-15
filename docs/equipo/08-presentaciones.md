# 08 · Presentaciones: CMS y producto final (#84 y #85)

Dos presentaciones para la Fundación: el **CMS** (Leo, #84) y el **producto final** (Einar y Huascar, #85). Van en la reunión final (#67) o en la de avance si la Fundación quiere verlas antes.

**Públicos:** personas **no técnicas** (dirección, terapeutas, administrativos). Evita términos como «commit», «deploy» o «repositorio» sin explicarlos.

> Hazlas con la herramienta que prefieran (Canva, PowerPoint o Google Slides). Lo importante es el guion y la **demostración en vivo**. **Nunca uses datos ni fotos de menores** en las diapositivas.

---

## Presentación del CMS (#84 · Leo · ≈ 20 min)

**Meta:** que dos o tres personas de la Fundación salgan sabiendo editar el sitio sin ayuda.

**Base:** [`MANUAL-CMS.md`](../entrega/MANUAL-CMS.md) y tus hallazgos del QA (#80).

### Guion

1. **Cómo funciona en 30 segundos** (manual §1): editas en el panel → se guarda → en ≈ 3 minutos está en el sitio.
2. **Entrar al panel** (§2): `/admin`, Login with GitHub. Si alguien no tiene acceso, a quién pedirlo.
3. **Mapa del menú** (§3): qué sección edita qué página.
4. **Demostración en vivo** (la parte más importante), con datos de prueba:
   - Publicar una noticia en el blog (≈ 10 min).
   - Ocultar algo con «Visible en el sitio» y volver a mostrarlo.
   - Subir una imagen y un PDF (máximo 5 MB; cómo comprimir).
   - Cambiar un teléfono o un texto.
5. **La regla más importante** (§4.3): **fotos de niños solo con autorización escrita de los padres**, y el interruptor `photos_authorized`.
6. **Deshacer un error** (§5 y `MANUAL-ADMIN.md` §7).
7. **Qué NO tocar** (§6).
8. **Práctica guiada:** una persona de la Fundación lo hace mientras tú observas. Si logra publicar en < 10 minutos usando solo el manual, queda cumplido **CE-004**.

### Antes de presentar

- [ ] Ensaya la demostración completa con el deploy. Ten un plan B (capturas o video corto) por si falla internet.
- [ ] Prepara los datos de prueba y deja el panel limpio después.
- [ ] Lleva el manual impreso o en PDF para cada asistente.

---

## Presentación del producto final (#85 · Einar y Huascar · ≈ 20 min)

**Meta:** mostrar el sitio terminado, lo que logra para la Fundación y qué sigue.

**Base:** el sitio en vivo, [`ACTA-ENTREGA.md`](../entrega/ACTA-ENTREGA.md) y los resultados de QA (#79) y Lighthouse (#77).

### Guion

1. **Qué se pidió y qué se hizo** (2 min): la propuesta de mayo y el alcance entregado (acta §1). Sé honesto con las diferencias (acta §4b de `REUNION-FINAL.md`).
2. **Recorrido por el sitio** (8 min): Inicio, los 4 programas, Equipo, Impacto, Colabora, Familias, Blog, Contacto. En español y en inglés, y en el celular.
3. **Accesibilidad** (2 min): barra de tamaño de texto y contraste, navegación con teclado.
4. **Cómo se mantiene** (2 min): el panel (lo explica Leo), costos (**$0 + dominio ≤ $15 USD/año**) y por qué se eligió cada tecnología (que sea gratuito y que la Fundación pueda mantenerlo sola).
5. **Estado y pendientes** (3 min): lo que ya funciona, lo que depende de la Fundación (autorizaciones, cuentas, donaciones, dominio).
6. **Siguientes pasos** (3 min): traspaso de cuentas, capacitación, firma del acta, **30 días de soporte**, lanzamiento.

### Reparto sugerido

- **Einar:** pasos 1, 4 y 5 (qué se hizo, cómo se mantiene, pendientes).
- **Huascar:** pasos 2 y 3 (recorrido y accesibilidad).
- **Ambos:** paso 6.

### Antes de presentar

- [ ] Ensayo completo con cronómetro.
- [ ] Usar la **URL de prueba** y revisar que **no aparezcan fotos no autorizadas** (Wawitas, Pasos Firmes, Desarrolla TEA).
- [ ] No prometer fechas de lanzamiento: dependen de las autorizaciones y del dominio.
- [ ] Preparar respuestas para preguntas probables: ¿cuánto cuesta?, ¿quién lo mantiene?, ¿qué pasa si se va el equipo?, ¿se puede cambiar el diseño? (respuestas en `MANUAL-ADMIN.md` §1, §8 y §9).

## Entregable (pegar en los issues #84 y #85)

- [ ] Archivo de la presentación (enlace, **no** subirlo al repo si pesa mucho).
- [ ] Ensayo hecho y tiempos medidos.
- [ ] Lista de preguntas esperadas y sus respuestas.
