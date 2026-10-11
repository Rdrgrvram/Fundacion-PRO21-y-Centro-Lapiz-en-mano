# Manual del panel de administración (para quien edita el contenido)

Para: personal de la Fundación PRO-21 y Centro Lápiz en Mano. No necesitas saber programar.
Dirección del panel: `https://<dominio-del-sitio>/admin` (ejemplo: `https://fundacionpro21.org/admin`).

> **Capturas:** este manual indica con **[Captura: …]** dónde va cada imagen. Se agregan en `docs/entrega/capturas/` al hacer la prueba de despliegue (ver `ACTA-ENTREGA.md`, pendientes).

---

## 1. Cómo funciona (en 30 segundos)

- Todo el contenido del sitio (textos, fotos, equipo, blog) vive en archivos del repositorio de GitHub. El panel `/admin` es una pantalla cómoda para editarlos.
- **Nada se publica de inmediato.** Cada cambio pasa por tres estados: *Borradores → En revisión → Listo*. Al pasar a *Listo* y publicar, el sitio se actualiza solo en **2–3 minutos**.
- Cada persona que edita necesita **una cuenta de GitHub** que el administrador haya agregado al repositorio con permiso *Write* (ver `MANUAL-ADMIN.md`).
- El sitio está en **español e inglés**. Casi todas las pantallas tienen pestañas **ES / EN**: completa las dos.

## 2. Entrar al panel

1. Abre `/admin`.
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
| Programas | Una entrada por programa (Mi Escuelita Down, Aula Wawitas, Pasos Firmes…) |
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
- **Testimonios y equipo:** cada entrada tiene su interruptor *visible*.

Ocultar es siempre preferible a borrar: se puede deshacer.

### 4.3 Fotos de niños: la regla más importante

> **Solo publica fotos de niños cuya familia firmó la autorización de uso de imagen para ese programa.**

Cada programa tiene el interruptor **Fotos de niños autorizadas**:

- **Apagado** (valor por defecto): el programa no muestra ninguna foto de niños, ni portada ni galería. La página se ve completa igual.
- **Encendido:** solo cuando la Fundación tiene las autorizaciones firmadas de **ese** programa.

Hoy está encendido solo en *Mi Escuelita Down*. *Aula Wawitas* y *Pasos Firmes* siguen apagados hasta recibir permisos firmados. Si una familia revoca su permiso, apaga el interruptor (o quita la foto) y publica: no hay que tocar código.

Si dudas de una foto, no la publiques y consulta a la dirección.

### 4.4 Subir imágenes y PDFs

- Pulsa el campo de imagen/archivo → **Elegir una imagen** → **Subir**.
- **Tamaño máximo: 500 KB por imagen.** Si pesa más, el panel la rechaza. Reduce la foto antes (por ejemplo con la app Fotos o squoosh.app: ancho 1600 px, calidad 75–80 %).
- Formato recomendado: JPG o WebP. Nombres sin tildes.
- Las imágenes se guardan dentro del repositorio (`public/images/uploads`). Por eso el límite: cada foto engorda el repositorio para siempre.
- Escribe siempre el **texto alternativo** cuando exista el campo: lo leen las personas con lectores de pantalla y mejora la búsqueda.

### 4.5 Cambiar teléfono, WhatsApp o correo

**Configuración general → Datos de contacto.** El número de WhatsApp va **con código de país y sin "+" ni espacios** (ejemplo: `59170106276`). Cambia todos los botones de WhatsApp del sitio a la vez. El **correo** de esta pantalla es donde llegan los mensajes de los formularios (salvo que el administrador haya fijado otro en `CONTACT_EMAIL`).

### 4.6 Crear un testimonio o un miembro del equipo

**Testimonios → Nuevo** / **Equipo — Profesionales → Nuevo**. Se guardan con un nombre de archivo legible (por ejemplo `mama-de-t`). Para testimonios usa solo el formato acordado: **"Mamá de T."** (inicial, nunca el nombre completo del niño) y solo textos que la familia validó.

## 5. Del borrador al sitio (flujo de publicación)

1. Editas y pulsas **Guardar**: queda como **Borrador**.
2. Cambia el estado a **En revisión** (menú *Establecer estado*).
3. Alguien de la Fundación revisa. Puede abrir la **vista previa** (enlace en el PR de GitHub).
4. Pasa a **Listo → Publicar**. El sitio se reconstruye solo en 2–3 minutos.

También puedes ver todo en la pestaña **Flujo de trabajo** (Workflow) del panel.

**[Captura: tablero Flujo de trabajo]**

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
| La imagen no se sube | Pesa más de 500 KB: redúcela |
| Publiqué y no veo el cambio | Espera 3 minutos y recarga con Ctrl+F5. Si sigue igual, avisa al administrador (puede haber un error de construcción) |
| Un cambio mío rompió algo | Avisa al administrador: todo cambio queda en el historial de GitHub y se puede revertir |
| El panel pide login otra vez | Normal tras unas horas; vuelve a entrar con GitHub |
| Un formulario del sitio no llega al correo | Ver `MANUAL-ADMIN.md` §5 |

Soporte: durante los 30 días posteriores a la entrega, escribe al responsable del proyecto indicado en el acta.
