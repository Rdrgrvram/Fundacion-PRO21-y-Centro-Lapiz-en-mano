# Especificación: Entrega v1 del sitio de la Fundación PRO-21 y Centro Lápiz en Mano

**Rama/ID:** `001-entrega-v1` (trabajo sobre la rama `integracion`)
**Estado:** Aprobada para planificar (clarificaciones resueltas 9-oct-2026; solo la fecha de entrega queda por definir)
**Entrada:** "Terminar el desarrollo del proyecto y dejarlo listo para entrega"

Basada en: auditoría end-to-end de `design` (9-oct-2026), barrido de `integracion`,
`docs/REQUIREMENTS.md` (RF-01..15, RNF-01..07), issues US-01..US-17 y US-DOC, y los
materiales reales de la fundación (`documentacion/`). Cuando el contenido real
contradice los requerimientos originales, **manda el contenido real**.

## Decisiones ya tomadas (clarificadas con el responsable, 9-oct-2026)
- **Fotos sin permiso:** las fotos de Aula Wawitas y Pasos Firmes se ocultan hasta
  que la fundación entregue autorizaciones firmadas de esos programas.
- **Testimonios:** la fuente de verdad son los 3 testimonios entregados por la
  fundación (`reseñas.docx`); reemplazan a los actuales. Se identifican sin nombre
  completo ("Mamá de T.", "Mamá de S.", "Mamá de R.").
- **Despliegue:** se deja listo y documentado paso a paso; la fundación o el
  responsable lo ejecutan con sus cuentas. No se despliega dentro de este trabajo.
- **Cifras de Impacto:** se muestran solo las respaldadas por la fundación (70 niños,
  8 años, 10 profesionales); "1000+ sesiones al año" y "8 áreas terapéuticas" se quitan
  hasta que la fundación las valide.
- **Fotos de uso general** (Inicio, Quiénes Somos, Impacto, Colabora, Familias): se dejan
  como están. El riesgo (no se puede vincular cada foto a una autorización) queda
  registrado en el acta de entrega.
- **Permisos con defectos:** basta con la declaración de la fundación; se registra en el acta.
- **Profesionales:** son **9**; todo el sitio debe decir 9.
- **Guías de Familias:** en v1 se solicitan por WhatsApp; si la fundación sube un PDF desde
  el panel, el sitio ofrece la descarga automáticamente. No se bloquea la entrega por ello.
- **Blog en inglés:** las publicaciones se muestran en español, sin traducción.

## Reglas al generar este documento
- Enfocado en QUÉ y POR QUÉ; el CÓMO va en `plan.md`.
- Toda ambigüedad se marca `[NECESITA CLARIFICACIÓN: …]`; no se inventa.

## Historias de usuario

### Historia 1 — Solo se publica lo que está autorizado (Prioridad: P1)
Como fundación, quiero que el sitio no muestre fotos de niños de programas sin autorización
escrita ni testimonios no validados, para no exponer a menores ni incumplir lo firmado
por las familias.

**Por qué P1:** es el bloqueante legal y ético de la entrega.
**Prueba independiente:** recorrer las páginas de programas y las de uso general y comprobar
que no hay fotos de Wawitas/Pasos Firmes y que los testimonios son los 3 entregados.

**Escenarios de aceptación:**
1. **Dado** que un programa no tiene autorizaciones firmadas, **Cuando** se visita su
   página, **Entonces** no aparece ninguna foto de niños de ese programa (ni en hero,
   galería, ni en otras páginas) y la página sigue viéndose completa y digna.
2. **Dado** los 3 testimonios entregados, **Cuando** se visitan Inicio, Impacto y la
   página de su programa, **Entonces** se muestran solo esos, sin nombres completos
   de menores, cada uno en el programa que indica el documento.
3. **Dado** que la fundación entrega nuevas autorizaciones, **Cuando** se actualiza el
   registro, **Entonces** el contenido de ese programa puede reactivarse sin cambiar código.

### Historia 2 — Los mensajes de las familias llegan o fallan a la vista (P1)
Como familia que contacta o se inscribe como voluntaria, quiero saber con certeza si
mi mensaje se envió; como fundación, quiero no perder ninguno.

**Por qué P1:** hoy, sin el servicio de correo configurado, el sitio confirma envíos que no ocurrieron.
**Prueba independiente:** enviar ambos formularios con el servicio configurado y sin configurar.

**Escenarios de aceptación:**
1. **Dado** el servicio de correo configurado, **Cuando** se envía un formulario válido,
   **Entonces** la fundación recibe el correo en su dirección oficial y el usuario ve confirmación.
2. **Dado** el servicio sin configurar o caído, **Cuando** se envía el formulario,
   **Entonces** el usuario ve un error claro con alternativa (WhatsApp) y **no** una falsa confirmación.
3. **Dado** un correo inválido, campos obligatorios vacíos o un bot, **Cuando** se envía,
   **Entonces** se rechaza con mensaje comprensible.

### Historia 3 — El sitio es correcto y encontrable en español e inglés (P1)
Como persona que busca ayuda (o un aliado extranjero), quiero encontrar el sitio en mi
idioma y que cada idioma se presente como tal.

**Por qué P1:** requisito RNF-03 / US-06 incumplido (sin mapa del sitio, sin vista previa
al compartir, sin declaración de idioma).
**Prueba independiente:** inspeccionar cada ruta en ambos idiomas y compartir un enlace.

**Escenarios de aceptación:**
1. **Dado** cualquier página, **Cuando** se carga en `/en`, **Entonces** el documento declara
   idioma inglés; en `/es`, español.
2. **Dado** un buscador o red social, **Cuando** consulta el sitio, **Entonces** encuentra mapa
   del sitio, reglas de rastreo, título/descripción/imagen de vista previa por página, y la
   relación entre la versión en español y en inglés.
3. **Dado** cualquier pestaña del navegador, **Entonces** muestra el ícono de la fundación.
4. **Dado** una página en inglés, **Entonces** no contiene texto en español salvo nombres propios
   y las publicaciones del blog, que se muestran en español (decisión del responsable).

### Historia 4 — La información publicada es veraz y completa (P1)
Como visitante, quiero cifras y datos que la fundación pueda respaldar.

**Por qué P1:** cifras sin sustento dañan la credibilidad ante donantes.
**Prueba independiente:** contrastar cada cifra y dato visible con una fuente de la fundación.

**Escenarios de aceptación:**
1. **Dado** la página Impacto, **Entonces** muestra solo cifras respaldadas (70 niños, 8 años,
   10 profesionales) y sin "1000+ sesiones" ni "8 áreas terapéuticas".
2. **Dado** que Equipo muestra 9 profesionales y Inicio/Impacto dicen 10,
   **Entonces** todo el sitio dice 9 profesionales (en español e inglés).
3. **Dado** la página Familias, **Entonces** cada guía ofrece una descarga real si existe el
   archivo; si no, ofrece solicitarla por WhatsApp y el texto no promete una descarga inexistente.
4. **Dado** cualquier imagen del sitio, **Entonces** carga (sin imágenes rotas).

### Historia 5 — El sitio es rápido y accesible (Prioridad: P2)
Como familia con un celular modesto o con baja visión, quiero que el sitio cargue
rápido y se pueda leer y tocar sin esfuerzo.

**Prueba independiente:** auditoría de rendimiento/accesibilidad y barrido a 375px y 1280px.

**Escenarios de aceptación:**
1. **Dado** Inicio, Mi Escuelita Down y Contacto, **Cuando** se auditan, **Entonces**
   rendimiento, accesibilidad, buenas prácticas y SEO son ≥ 90 en cada uno.
2. **Dado** cualquier página en móvil, **Entonces** todo elemento tocable mide al menos 44px
   y todo texto cumple contraste AA.
3. **Dado** la barra de accesibilidad, **Entonces** el tamaño de texto y el alto contraste
   persisten al navegar y al cambiar de idioma.

### Historia 6 — El blog está vivo y se ve en Inicio (Prioridad: P2)
Como visitante, quiero ver las novedades recientes de la fundación desde la página de inicio.

**Escenarios de aceptación:**
1. **Dado** que hay publicaciones visibles, **Cuando** se abre Inicio, **Entonces** aparecen las
   3 más recientes con imagen, título, fecha y enlace.
2. **Dado** una publicación, **Entonces** su imagen carga y, si tiene PDF adjunto, se puede abrir.
3. **Dado** que no hay publicaciones, **Entonces** la sección no aparece (no queda vacía).

### Historia 7 — La fundación opera el CMS sin ayuda (Prioridad: P2)
Como persona de la fundación sin conocimientos técnicos, quiero crear y editar
contenido sin romper el sitio.

**Escenarios de aceptación:**
1. **Dado** el panel de administración, **Cuando** se crea una publicación, un testimonio o
   un miembro del equipo y se publica, **Entonces** aparece en el sitio con un nombre de
   archivo legible y se puede localizar después.
2. **Dado** contenido inválido, **Entonces** el error indica archivo y campo, y no se despliega
   una versión rota.
3. **Dado** la suite de pruebas del CMS, **Cuando** se ejecuta completa, **Entonces** pasa al 100%.

### Historia 8 — La entrega se puede ejecutar y recibir formalmente (Prioridad: P1)
Como responsable del proyecto y como fundación, quiero poder desplegar el sitio con
nuestras cuentas, administrarlo y firmar la recepción.

**Prueba independiente:** una persona ajena sigue la guía de despliegue en un entorno de prueba.

**Escenarios de aceptación:**
1. **Dado** la guía de despliegue, **Cuando** se sigue paso a paso, **Entonces** el sitio queda
   publicado con el panel de administración funcionando, el envío de correos y la subida de imágenes.
2. **Dado** la entrega, **Entonces** existen: manual del panel de administración (para quien
   edita contenido), manual de administración (cuentas, claves, costos, respaldos), guía del
   dominio, y acta de entrega con el estado de cada requisito y los pendientes de la fundación.
3. **Dado** el repositorio, **Entonces** no contiene secretos ni los documentos con datos de
   menores, y todas las variables necesarias están documentadas.

### Historia 9 — Todo el trabajo está integrado en una sola base (Prioridad: P1)
Como equipo, quiero una única rama estable que reúna lo diseñado, lo programado y lo
configurable desde el CMS.

**Escenarios de aceptación:**
1. **Dado** la rama de integración, **Entonces** compila sin errores, su verificación de tipos
   pasa y las pruebas pasan.
2. **Dado** que existen PRs abiertos con trabajo ya cubierto por la integración, **Entonces**
   quedan cerrados o reconciliados, sin duplicar ni perder trabajo.

## Casos límite
- Una autorización tiene defectos (sin fecha, sin firma institucional, nombre vacío):
  ¿vale para publicar? Sí: basta con la declaración de la fundación, registrada en el acta.
- Fotos de uso general (Inicio, Quiénes Somos, Impacto, Colabora, Familias) no están asociadas
  a un programa: se dejan, y el acta advierte que no pueden vincularse a una autorización.
- Un programa nuevo creado desde el panel sin fotos autorizadas: debe verse bien sin imágenes.
- Un visitante con JavaScript desactivado o conexión lenta: el contenido principal debe leerse.
- Se revoca una autorización: debe poder retirarse la foto sin tocar código.

## Requisitos funcionales
- **RF-001:** El sistema DEBE ocultar las fotos de niños de los programas sin autorización (Aula Wawitas y Pasos Firmes) y poder reactivarlas sin cambiar código; los testimonios publicados DEBEN ser solo los entregados por la fundación.
- **RF-002:** El sistema DEBE mostrar los 3 testimonios de la fundación, sin nombres completos de menores, asociados a su programa.
- **RF-003:** El sistema DEBE enviar los formularios de contacto y voluntariado al correo oficial de la fundación y NUNCA confirmar un envío que no ocurrió.
- **RF-004:** El sistema DEBE validar formato de correo y campos obligatorios y rechazar spam, con mensajes comprensibles en ambos idiomas.
- **RF-005:** El sistema DEBE declarar el idioma correcto del documento en cada ruta.
- **RF-006:** El sistema DEBE publicar mapa del sitio, reglas de rastreo, metadatos de vista previa por página, relación entre idiomas y favicon.
- **RF-007:** El sistema DEBE mostrar solo cifras respaldadas por la fundación y mantenerlas consistentes entre páginas (9 profesionales).
- **RF-008:** El sistema DEBE mostrar las 3 publicaciones más recientes del blog en Inicio.
- **RF-009:** El sistema DEBE ofrecer en Familias descargas reales de guías, o comunicar su disponibilidad sin prometer lo inexistente.
- **RF-010:** Ninguna imagen del sitio DEBE estar rota.
- **RF-011:** Todo elemento interactivo en móvil DEBE medir ≥ 44px y todo texto cumplir contraste AA.
- **RF-012:** Inicio, Mi Escuelita Down y Contacto DEBEN obtener ≥ 90 en rendimiento, accesibilidad, buenas prácticas y SEO.
- **RF-013:** Las publicaciones, testimonios y miembros del equipo creados desde el panel DEBEN guardarse con identificadores legibles.
- **RF-014:** La suite de pruebas del CMS DEBE pasar completa.
- **RF-015:** El repositorio DEBE incluir la guía de despliegue, los manuales y el acta de entrega, y excluir secretos y datos de menores.
- **RF-016:** La rama de integración DEBE compilar y verificarse sin errores y ser la base de la entrega.

## Entidades clave
- **Autorización de imagen:** niño(a) (identificado solo por iniciales en el registro público), programa, fecha de la familia, fecha/firma de la institución, estado (vigente/revocada). El documento original nunca se versiona.
- **Testimonio:** texto, programa, identificación anonimizada, estado de autorización.
- **Publicación del blog:** título, fecha, imagen, resumen, contenido, PDF opcional, visible sí/no, idioma(s).
- **Programa:** contenido, fotos autorizadas, visible sí/no.
- **Guía descargable:** título, archivo (si existe).

## Criterios de éxito
- **CE-001:** 0 fotos de niños de Aula Wawitas y Pasos Firmes visibles; los testimonios publicados son exactamente los 3 de la fundación.
- **CE-002:** 0 páginas con errores de consola, imágenes rotas, enlaces internos 404 o scroll horizontal en las 12 rutas × 2 idiomas × 2 anchos.
- **CE-003:** ≥ 90 en las 4 categorías de la auditoría en las 3 rutas de referencia.
- **CE-004:** Una persona no técnica de la fundación crea y publica una entrada del blog en menos de 10 minutos usando solo el manual.
- **CE-005:** Una persona ajena despliega el sitio en un entorno de prueba siguiendo solo la guía, sin ayuda del equipo.
- **CE-006:** Los 100% de las pruebas pasan y el acta de entrega está lista para firmar.

## Fuera de alcance (v1)
- Pasarela de pagos o e-commerce real (las donaciones redirigen a una plataforma externa o QR).
- Autenticación de usuarios del sitio.
- Despliegue real en las cuentas de la fundación (solo se deja listo y documentado).
- Nuevas secciones o rediseño: se conserva el diseño aprobado.
- Traducción de contenido nuevo más allá de lo existente.

## Dependencias externas (no son código; bloquean la entrega formal)
- Autorizaciones firmadas de Aula Wawitas y Pasos Firmes, y firma/fecha de la institución en las existentes.
- Cuenta GitHub de la fundación, cuentas de Vercel, Cloudflare y Resend con correo institucional, y compra del dominio `.org` (≤ $15/año) al aprobar el desarrollo.
- Fotos de Helan Medrano y Luis Machicado (hoy salen con iniciales) — opcional.
- Cifras validadas de sesiones y áreas, si se quieren volver a mostrar.
- Fecha de entrega: por definir por el responsable (no bloquea el desarrollo; se prioriza por riesgo).

## Checklist de completitud del requisito
- [x] No quedan marcadores `[NECESITA CLARIFICACIÓN]` (la fecha es una dependencia externa, no una ambigüedad)
- [x] Los requisitos son verificables y sin ambigüedad
- [x] Los criterios de éxito son medibles
- [x] No hay detalles de implementación (stack, APIs, esquemas)
- [x] Cada historia de usuario es probable de forma independiente
- [x] No hay features especulativas
- [x] Alcance delimitado (qué SÍ y qué NO)
