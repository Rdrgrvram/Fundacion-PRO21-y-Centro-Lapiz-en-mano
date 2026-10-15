# 03 · QA manual del sitio web (#79)

**Responsable:** José · **Necesita:** la URL del deploy de Mauricio (#77) · **Tiempo:** 3 a 4 horas

**Meta:** una lista de fallos con captura y ruta, y la constancia de qué quedó probado.

> Probamos **a mano** lo que los tests automáticos no ven: cómo se siente en un celular real, si los textos tienen sentido, si hay fotos que no deberían estar. Ya hay una suite automática (`npm run test:cms`), que cubre estructura, SEO y accesibilidad.

## Antes de empezar

- La URL del deploy (te la pasa Mauricio). **No la difundas.**
- Un celular real y un computador. Si puedes, dos navegadores (Chrome y otro).
- Para registrar: una copia de la tabla del final (o una hoja de cálculo).
- **Nunca uses datos reales** en los formularios: escribe «Prueba».

## Qué probar

Cada punto se prueba en **español y en inglés**, en **celular (≈375 px de ancho)** y en **escritorio**.

### 1. Todas las rutas cargan

`/`, `/quienes-somos`, `/mi-escuelita-down`, `/aula-wawitas`, `/pasos-firmes`, `/desarrolla-tea`, `/equipo`, `/impacto`, `/colabora`, `/familias`, `/blog`, `/contacto`. Para cada una:

- [ ] No hay errores visibles ni imágenes rotas.
- [ ] Un solo título grande (h1) y la página se lee con sentido.
- [ ] No hay scroll horizontal en celular.
- [ ] El texto en inglés está traducido (no mezclado con español, salvo el blog, que es solo español por decisión).
- [ ] Los enlaces del menú y del pie de página llevan a donde dicen.

### 2. Fotos de menores (lo más importante)

- [ ] **Aula Wawitas, Pasos Firmes y Desarrolla TEA no muestran fotos de niños.** Si ves una, repórtala como `urgente`.
- [ ] Mi Escuelita Down sí puede mostrar fotos (tiene autorización).
- [ ] La galería de Impacto solo muestra fotos de programas autorizados.
- [ ] Testimonios: solo aparecen como «Mamá de T./S./R.», sin nombres completos.

### 3. Formularios

- [ ] **Contacto** (`/contacto`): enviar con datos de prueba. Si hay clave de correo, debe mostrar confirmación y llegar al correo de la Fundación. Si no hay clave, debe mostrar un error claro **y el botón de WhatsApp** (nunca una confirmación falsa).
- [ ] Probar con correo inválido y con campos vacíos: debe pedir corregir.
- [ ] **Voluntariado** (en `/colabora`): lo mismo.

### 4. Botones y enlaces clave

- [ ] **WhatsApp flotante** abre `wa.me/59170106276`.
- [ ] **Donación:** el enlace/QR de `/colabora` funciona. Si el monto viene prellenado, el mensaje de WhatsApp lo incluye.
- [ ] **Selector de idioma** (ES/EN) cambia de página sin perder la ruta.
- [ ] **Mapa** de Contacto carga al pulsar «Ver mapa».
- [ ] **Videos** de YouTube en Impacto se reproducen (si hay).
- [ ] **Descargas** de Familias: si hay PDF, descarga; si no, ofrece WhatsApp.

### 5. Accesibilidad

- [ ] **Barra de accesibilidad:** cambiar tamaño de texto (A−/A/A+) y contraste; **no debe rebotar** al hacer scroll.
- [ ] **Teclado:** con la tecla Tab recorrer una página: se ve dónde está el foco, el enlace «saltar al contenido» funciona, los menús y acordeones se abren con Enter o espacio.
- [ ] En celular, los botones se pulsan sin equivocarse (tamaño táctil cómodo).

### 6. Contenido y cifras

- [ ] «9 profesionales» en Inicio, Quiénes somos, Equipo e Impacto.
- [ ] No aparecen «1000+ sesiones» ni «8 áreas».
- [ ] Teléfono y correo coinciden con lo oficial (WhatsApp `70106276`).

### 7. Con personas reales (CE-004 / CE-005)

Pídele a Rodrigo la fecha. CE-004 la hace una persona de la Fundación (publicar una noticia en < 10 min) y CE-005 una persona ajena (seguir la guía de despliegue). Tú observas y anotas, sin ayudar.

## Cómo reportar un error

Abre un issue con la plantilla **«Error encontrado en QA»**. Incluye: ruta, idioma, dispositivo y navegador, pasos, qué esperabas, qué pasó y **captura**. Etiqueta `qa`; usa `urgente` si hay fotos no autorizadas o algo roto en el formulario. Revisa antes que no esté ya reportado.

## Tabla de resultados (pegar en el issue #79)

| Ruta | Idioma | Dispositivo | Resultado | Issue del error |
|---|---|---|---|---|
| `/` | es | celular | ✅ | |

## Entregable

- [ ] Tabla completa de las 12 rutas × es/en × celular/escritorio.
- [ ] Issues abiertos por cada fallo.
- [ ] Resumen de 3 líneas: qué está bien, qué falla, qué bloquea el lanzamiento.
- [ ] Pasar el resumen a quien hace la documentación (#83).

Referencias: [`specs/001-entrega-v1/quickstart.md`](../../specs/001-entrega-v1/quickstart.md) (escenarios Q1–Q13) y [`docs/entrega/ACTA-ENTREGA.md`](../entrega/ACTA-ENTREGA.md) §2.
