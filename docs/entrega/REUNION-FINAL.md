# Reunión final con la Fundación PRO-21 — guía para el equipo

> Objetivo: salir de la reunión con **todo lo que falta para desplegar y entregar** resuelto o con responsable y fecha.
> Fecha: ____________ · Asistentes: ____________________ · Estado: borrador (14-oct-2026)
> Seguimiento en GitHub: milestone **Sprint 6-Deploy** (issues #52 a #69).

---

## 1. Antes de la reunión (equipo de desarrollo)

- [ ] Mergear la rama de cierre a `develop` y poner `master` al día (#52). El CMS publica en `master`.
- [ ] Revocar el token expuesto de `scripts/subir-instrucciones-github.ps1` (#59).
- [ ] Hacer el deploy de prueba en `.vercel.app`, sin difundir, y llevar la URL (#60).
- [ ] Medir Lighthouse en Vercel (#61) y probar un envío real de formularios con Resend (#63).
- [ ] Decidir el límite de archivos del CMS (ver §3, decisión 1).
- [ ] Llevar impresos: esta guía, `ACTA-ENTREGA.md` y `HOJA-REUNION.html`.

## 2. Qué mostrar (15 min)

1. El sitio en la URL de prueba: Inicio, los 4 programas, Equipo, Impacto, Colabora, Familias, Blog, Contacto, en español e inglés y en el celular.
2. El panel `/admin`: editar un texto, ocultar una publicación y subir una imagen y un PDF (ver §3, decisión 1).
3. Un envío real del formulario de contacto, que llega al correo de la Fundación.

## 3. Decisiones que tomar (con el porqué)

| # | Decisión | Opciones | Recomendación y porqué |
|---|---|---|---|
| 1 | **Límite de archivos del CMS (#69).** Ya aplicada la opción A: 5 MB por archivo y carpeta propia para PDFs, con prueba automática (`tests/cms/recursos.spec.ts`). Antes eran 500 KB, y una guía o informe normal era rechazada. US-15 pedía "sin límite técnico" | A) subir el límite (≈5 MB) y separar carpeta de PDFs · B) Cloudflare R2 | **A** para la v1: costo $0, sin cuenta nueva, lo ya construido sigue igual. El repositorio crece; el manual explica cómo comprimir. R2 queda como mejora futura |
| 2 | **Rama de producción (#52)** | `master` (la usa el CMS) · cambiar a `main` | `master`: no hay que tocar el CMS ni Vercel |
| 3 | **Qué hacer con fotos sin autorización** | Mantener ocultas · quitar el contenido | Mantener ocultas con `photos_authorized: false`; se activan al llegar la firma |
| 4 | **Fotos de uso general** (Inicio, Quiénes somos, Impacto, Colabora, Familias) | Mantener · retirar | Ya aceptado por escrito en el acta §3.1; reconfirmar que la Fundación asume el riesgo |
| 5 | **Fecha de lanzamiento público** y quién anuncia | — | Después de dominio, cuentas institucionales y autorizaciones |

## 4. Preguntas sobre los programas (#68)

Los criterios de las historias US-02/03/04 venían de la entrevista de junio. El documento oficial que entregó la Fundación los contradice en varios puntos, y el sitio sigue el documento. Confirmar:

- [ ] **¿Existe el "Programa Crecer"** para jóvenes (Mi Escuelita Down)? No aparece en el documento oficial ni en el sitio.
- [ ] **Mi Escuelita Down:** ¿se mantiene el esquema Pre-Kínder / Kínder / Primaria? (no son "4 niveles")
- [ ] **Aula Wawitas:** el documento la define como programa **preescolar** (3, 4 y 5 años), sin autismo. ¿Es correcto? El autismo lo cubre Desarrolla TEA. Ya se corrigió el hito de 2023 de "Quiénes somos" en ese sentido.
- [ ] **Pasos Firmes:** la lista de dislexia, discalculia, TDAH, disgrafía, etc. no está en el documento oficial. ¿De dónde sale y es correcta?
- [ ] **Inicio:** la frase "síndrome de Down, autismo y dificultades de aprendizaje" ¿se mantiene?
- [ ] **Desarrolla TEA:** ¿nombre público definitivo y posición en el menú? (hoy `order: 40`)
- [ ] **Cifras:** el documento dice "10 profesionales y voluntarios"; el sitio dice "9 profesionales". ¿Se muestran aparte los voluntarios? También: 70 niños (40 y 30) y 8 años de vida institucional.

## 4b. Compromisos de la propuesta inicial (mayo de 2026)

La propuesta que presentó M.Sc. Orlando Rivera a la Fundación (`Proyecto_Social_Web_FundacionPRO21.docx`) es el **compromiso formal**. La redactó la UCB antes de recibir el documento oficial de la Fundación, por lo que los detalles de los programas eran supuestos. Esto explica las diferencias del §4: **no se omitió nada que la Fundación hubiera pedido; la Fundación validó después otro contenido.** Aun así, el acta debe registrar las diferencias y que la Fundación las acepta.

| Compromiso de la propuesta | Estado |
|---|---|
| Mi Escuelita Down: 4 niveles, 8 servicios terapéuticos, Programa Crecer | Diferente. El documento oficial trae 4 áreas de terapia y el área Educativa (§4) |
| Aula Wawitas: programa de autismo, 9 servicios, detección temprana | Diferente. El documento oficial la define como preescolar; el autismo lo cubre Desarrolla TEA |
| Pasos Firmes: 7 áreas de intervención | Diferente. El documento oficial define 4 áreas |
| Quiénes somos: **8 valores** | Cumple (8 valores). El documento oficial menciona 5; confirmar cuáles prefiere la Fundación |
| Impacto: galería de fotos **y videos** | **Falta video.** Hay fotos; ningún video. Pedir videos o retirar el compromiso |
| Contacto: formulario, **mapa**, WhatsApp, redes | El mapa es un enlace a Google Maps, no un mapa incrustado. Confirmar si basta |
| Almacenamiento en **Cloudflare R2** | No se usa; las imágenes van al repositorio (#69). Registrar en el acta |
| Hospedaje, CMS y SSL a $0; dominio ≈ $12–15/año | Cumple |
| Panel de administración sin código | Cumple, pendiente de probar con una persona de la Fundación (#62) |
| Manuales, capacitación y 30 días de soporte | Manuales hechos; capacitación y soporte empiezan en la entrega (#67) |
| 3 a 4 reuniones de revisión | Confirmar cuántas se hicieron |
| La Fundación proporciona el dominio o autoriza a la UCB a gestionar uno temporal | Pendiente (#65) |

## 5. Lo que la Fundación debe entregar o firmar (#66)

| Pendiente | Qué bloquea |
|---|---|
| Autorizaciones firmadas de uso de imagen: Aula Wawitas, Pasos Firmes, Desarrolla TEA | Fotos y galerías de esos programas |
| Firma y fecha institucional en las autorizaciones existentes (Mi Escuelita Down) | Cierre formal del riesgo del acta §3.2 |
| Autorización escrita de las 3 familias de los testimonios | Testimonios en línea |
| Autorización de los logos de aliados (UCB, Red Uno, ATB, Página Siete) | Sección de aliados |
| Cuenta institucional de donaciones (hoy: Banco Sol, a nombre de una persona, "en trámite") | Página Colabora |
| Guías en PDF para Familias | Hoy el botón ofrece WhatsApp |
| Informes anuales en PDF (2022 a 2025) | Hoy el botón ofrece WhatsApp |
| Fotos de Helan Medrano y Luis Machicado | Hoy aparecen con iniciales |
| Al menos una segunda publicación real del blog (#57) | Criterio de US-16 |

## 6. Cuentas, dominio y traspaso (#64, #65)

- [ ] Correo institucional para crear: GitHub, Vercel y Resend.
- [ ] Transferir el repositorio y volver a importar en Vercel con la cuenta institucional; rotar claves.
- [ ] **Comprar el dominio `.org`** (≤ $15/año) con medio de pago de la Fundación; recién cuando el desarrollo esté aprobado.
- [ ] Verificar el dominio en Resend para que el correo de los formularios salga desde el dominio propio.
- [ ] Crear la OAuth App de GitHub para el login de `/admin` y probar con una persona de la Fundación (#62).
- [ ] Entregar credenciales por gestor de contraseñas, nunca por chat ni correo.

## 7. Capacitación y pruebas con personas reales (#67)

- [ ] **CE-004:** una persona de la Fundación publica una noticia en menos de 10 minutos usando solo `MANUAL-CMS.md`.
- [ ] **CE-005:** una persona ajena sigue `GUIA-DESPLIEGUE.md` y despliega.
- [ ] Mostrar cómo subir una imagen y un PDF, cómo ocultar un contenido y qué NO tocar.
- [ ] Repasar `MANUAL-ADMIN.md` (cuentas, claves, costos, respaldo).

## 8. Cierre

- [ ] Completar el acta: fecha, asistentes, contacto de soporte.
- [ ] Firmas: Fundación, equipo de desarrollo y M.Sc. Orlando Rivera.
- [ ] Iniciar los **30 días de soporte**.
- [ ] Quitar el `noindex` del deploy y anunciar el lanzamiento.

## 9. Riesgos que se informan (no bloquean)

- Lighthouse de rendimiento queda cerca de 90 sin llegar de forma estable en local; se confirma en Vercel (#61).
- Las pruebas del CMS editan contenido real: correr una sola instancia a la vez.
- El blog se muestra en español en ambos idiomas (decisión acordada).

## Notas de la reunión

_Decisiones, responsables y fechas:_

