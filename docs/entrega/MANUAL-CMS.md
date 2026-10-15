# Manual del panel de administración (para quien edita el contenido)

Para: personal de la Fundación PRO-21 y Centro Lápiz en Mano. No necesitas saber programar.
Dirección del panel: `https://<dominio-del-sitio>/admin` (ejemplo: `https://fundacionpro21.org/admin`).

> **Capturas:** este manual indica con **[Captura: …]** dónde va cada imagen. Se agregan en `docs/entrega/capturas/` al hacer la prueba de despliegue (ver `ACTA-ENTREGA.md`, pendientes).

---

## 1. Cómo funciona (en 30 segundos)

- Todo el contenido del sitio (textos, fotos, equipo, blog) vive en archivos del repositorio de GitHub. El panel `/admin` es una pantalla cómoda para editarlos.
- **Un solo botón: Publicar.** No hay borradores ni estados intermedios. Cuando pulsas **Publicar**, el cambio queda guardado y el sitio se actualiza solo en **2–3 minutos**. Por eso, **revisa bien antes de pulsar Publicar**. Si algo sale mal, se puede deshacer (ver la sección 5).
- Cada persona que edita necesita **una cuenta de GitHub** que el administrador haya agregado al repositorio con permiso *Write* (ver `MANUAL-ADMIN.md`).
- El sitio está en **español e inglés**. Casi todas las pantallas tienen pestañas **ES / EN**: completa las dos.

## 2. Entrar al panel

1. Abre `/admin`, o baja hasta el final de cualquier página del sitio y pulsa **Acceso del equipo** (enlace pequeño junto al copyright).
2. Pulsa **Login with GitHub** e inicia sesión con tu cuenta.
3. Si GitHub pide autorizar la aplicación, pulsa **Authorize**.

**[Captura: pantalla de login]**

Si dice que no tienes acceso: tu cuenta no fue agregada al repositorio. Pídele al administrador que lo haga.

## 3. Qué hay en el menú lateral

Las secciones siguen el orden del sitio. Cada una dice en su descripción en qué página aparece.

| Sección del panel | Qué edita |
|---|---|
| Configuración general | Teléfono, WhatsApp, correo, redes, menú, pie de página (aparece en **todo** el sitio) |
| Inicio, Quiénes Somos, Impacto, Colabora, Familias, Contacto | Textos y fotos de cada página |
| Programas | Una entrada por programa (Mi Escuelita Down, Aula Wawitas, Pasos Firmes, Desarrolla TEA…) |
| Testimonios | Citas de familias |
| Equipo (profesionales, áreas, voluntarios, página) | Personas y áreas del equipo |
| Blog | Noticias |

## 4. Tareas frecuentes

### 4.1 Publicar una noticia en el blog (≈ 10 minutos)

1. Menú **Blog → Nueva Publicación**.
2. Completa: **Título**, **Fecha de publicación**, **Imagen destacada** (opcional), **Resumen** (texto corto para la lista) y **Contenido**.
3. Si tienes un PDF (boletín, informe), súbelo en **PDF adjunto**: al hacer clic en la imagen en el listado se abre el PDF en lugar del artículo.
4. Deja **Visible en el sitio** activado.
5. Arriba a la derecha: **Guardar** y luego **Publicar → Publicar ahora** (ver §5 para el flujo completo).

**[Captura: formulario de nueva publicación]**

Las 3 publicaciones visibles más recientes aparecen también en Inicio, en "Últimas noticias". Las noticias se muestran en español en ambos idiomas.

### 4.2 Ocultar o mostrar algo sin borrarlo

- **Blog:** desactiva **Visible en el sitio**. La publicación deja de existir públicamente (error 404) hasta que la reactives. También puedes hacerlo rápido desde `/admin/blog`.
- **Programas:** desactiva **Visible públicamente**. El programa desaparece del menú, Inicio y el pie de página, pero sigue editable.
- **Testimonios y equipo:** cada entrada tiene el interruptor **Visible en el sitio** (arriba del formulario). Apágalo para quitar un testimonio —por ejemplo, si una familia retira su permiso— o a una persona del equipo sin borrarla; se oculta en español e inglés a la vez. Con un testimonio también se retiran sus citas copiadas en la portada de Inicio, la historia destacada de Impacto y la carta de Familias. Al ocultar a una persona del equipo, las cifras escritas a mano («9 profesionales» en Inicio, Quiénes somos e Impacto) hay que actualizarlas. Para volver a mostrarla, enciéndelo. **No borres** la entrada para ocultarla.

Ocultar es siempre preferible a borrar: se puede deshacer.

### 4.3 Fotos de niños: la regla más importante

> **Solo publica fotos de niños cuya familia firmó la autorización de uso de imagen para ese programa.**

Cada programa tiene el interruptor **Fotos de niños autorizadas**:

- **Apagado** (valor por defecto): el programa no muestra ninguna foto de niños, ni portada ni galería. La página se ve completa igual.
- **Encendido:** solo cuando la Fundación tiene las autorizaciones firmadas de **ese** programa.

Hoy está encendido solo en *Mi Escuelita Down*. *Aula Wawitas*, *Pasos Firmes* y *Desarrolla TEA* siguen apagados hasta recibir permisos firmados. Si una familia revoca su permiso, apaga el interruptor (o quita la foto) y publica: no hay que tocar código.

Si dudas de una foto, no la publiques y consulta a la dirección.

> **Al crear o editar un programa:** completa siempre el *Título de sección* de la galería, aunque todavía no tengas fotos. Si queda vacío, el panel no te deja guardar. Sin fotos autorizadas la galería no se muestra en el sitio.

### 4.4 Subir imágenes y PDFs

- Pulsa el campo de imagen/archivo → **Elegir una imagen** → **Subir**.
- **Tamaño máximo recomendado: 5 MB por archivo.** El panel está configurado con ese límite, pero en las pruebas no siempre lo hace cumplir al subir PDFs: cuida tú el peso, porque cada archivo engorda el repositorio para siempre (GitHub rechaza sin más lo que pase de 100 MB). Para fotos, bájalas antes a unos 300–500 KB (por ejemplo con la app Fotos o squoosh.app: ancho 1600 px, calidad 75–80 %). Para PDFs, usa "reducir tamaño" al exportar; una guía de pocas páginas cabe holgada.
- Los **PDFs** se guardan en `public/docs` y las **fotos** en `public/images/uploads`. En el sitio, el botón de la guía o del informe cambia solo de "Solicitar por WhatsApp" a "Descargar PDF" cuando subes el archivo.
- Formato recomendado: JPG o WebP. Nombres sin tildes.
- Las imágenes se guardan dentro del repositorio (`public/images/uploads`). Por eso el límite: cada foto engorda el repositorio para siempre.
- Escribe siempre el **texto alternativo** cuando exista el campo: lo leen las personas con lectores de pantalla y mejora la búsqueda.

### 4.4b Videos, medios de pago y QR

- **Videos (Impacto):** en **Impacto → Videos de YouTube**, pulsa **Agregar**, escribe un título y pega el enlace del video (`https://youtu.be/…` o `https://www.youtube.com/watch?v=…`). El video vive en YouTube: no pesa en el sitio y solo se descarga cuando alguien pulsa **Reproducir**. Si no hay videos, la sección no aparece. **Videos donde se vea a un niño: solo con autorización escrita de los padres.**
- **QR de donación:** en **Colabora → Métodos de pago**, abre el método del QR y cambia **Imagen de QR**. Úsalo cuando el banco o la cuenta cambien (la cuenta actual es provisoria).
- **PayPal u otra plataforma de pago:** en el mismo lugar, escribe el **Enlace de pago** (debe empezar con `https://`) y, si quieres, el texto del botón. Aparece un botón «Donar ahora» que abre la plataforma en otra pestaña. Si el enlace queda vacío, no aparece ningún botón.
- **Fecha de una noticia nueva:** viene rellena con el día de hoy; cámbiala solo si la noticia es de otro día.

### 4.5 Cambiar teléfono, WhatsApp o correo

**Configuración general → Datos de contacto.** El número de WhatsApp va **con código de país y sin "+" ni espacios** (ejemplo: `59170106276`). Cambia todos los botones de WhatsApp del sitio a la vez. El **correo** de esta pantalla es donde llegan los mensajes de los formularios (salvo que el administrador haya fijado otro en `CONTACT_EMAIL`).

### 4.6 Crear un testimonio o un miembro del equipo

**Testimonios → Nuevo** / **Equipo — Profesionales → Nuevo**. Se guardan con un nombre de archivo legible (por ejemplo `mama-de-t`). Para testimonios usa solo el formato acordado: **"Mamá de T."** (inicial, nunca el nombre completo del niño) y solo textos que la familia validó.

## 5. Publicar y deshacer

1. Editas lo que necesites. Para ver cómo queda, usa la **vista previa** (el ojo, a la derecha del editor).
2. Pulsas **Publicar** → **Publicar ahora**. Aparece el aviso «Entrada guardada».
3. En **2–3 minutos** el sitio ya muestra el cambio. Abre el sitio y compruébalo.

**Si te equivocaste:**
- **Una noticia o programa que no debe verse:** edítalo y desactiva *Visible en el sitio* (o *Visible públicamente*). No lo borres.
- **Un texto mal escrito:** vuelve a editarlo y publica de nuevo.
- **Algo que no sabes arreglar:** no insistas ni borres. Avisa a quien administra el sitio. Cada cambio queda guardado en el historial de GitHub y se puede **revertir** en un minuto (ver `MANUAL-ADMIN.md` §7).

> Antes la publicación pasaba por borradores y revisión. Se simplificó porque una o dos personas editan el sitio y cada paso extra era un lugar donde atascarse. A cambio, nadie revisa antes de publicar: la revisión la haces tú con la vista previa.

## 6. Qué NO tocar

- **No edites archivos directamente en GitHub** ni cambies ramas: usa siempre el panel.
- **No cambies** el campo *Orden de aparición* de los programas sin avisar: reordena menú, Inicio y pie.
- **No borres** un programa para "ocultarlo": usa *Visible públicamente*.
- **No pegues** nombres completos de niños, documentos de identidad, ni datos médicos en ninguna parte.
- **No compartas** tu sesión de GitHub ni tu contraseña.
- Si algo sale mal, **no insistas**: ver §7.

## 7. Problemas comunes

| Síntoma | Qué hacer |
|---|---|
| "No tienes acceso" al entrar | El administrador debe agregar tu cuenta de GitHub al repositorio (permiso *Write*) |
| El archivo no se sube | Pesa más de 5 MB: redúcelo (foto: ancho 1600 px; PDF: exportar con menor tamaño) |
| Publiqué y no veo el cambio | Espera 3 minutos y recarga con Ctrl+F5. Si sigue igual, avisa al administrador (puede haber un error de construcción) |
| Un cambio mío rompió algo | Avisa al administrador: todo cambio queda en el historial de GitHub y se puede revertir |
| El panel pide login otra vez | Normal tras unas horas; vuelve a entrar con GitHub |
| Un formulario del sitio no llega al correo | Ver `MANUAL-ADMIN.md` §5 |

Soporte: durante los 30 días posteriores a la entrega, escribe al responsable del proyecto indicado en el acta.
