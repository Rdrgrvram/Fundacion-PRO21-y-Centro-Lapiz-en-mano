# Acta de entrega — Sitio web Fundación PRO-21 y Centro Lápiz en Mano (v1)

| | |
|---|---|
| **Proyecto** | Sitio web institucional (Proyecto Social UCB) |
| **Versión entregada** | v1 — rama `integracion` (base: `develop`) |
| **Supervisor académico** | M.Sc. Orlando Rivera |
| **Fecha de entrega** | _por definir_ |
| **Estado del documento** | Borrador para firma. Verificación final realizada el 10-oct-2026 (T075) |

## 1. Alcance entregado

Sitio bilingüe (español/inglés) de 11 páginas más blog, con panel de administración `/admin` (Decap CMS, edita contenido sin programar), formularios de contacto y voluntariado por correo, SEO básico, accesibilidad y la documentación de esta carpeta. **Costo recurrente: solo el dominio (≤ $15 USD/año).**

**No incluye (acordado):** pasarela de pagos (las donaciones usan QR/plataforma externa), cuentas de usuario del sitio, rediseño, traducción de contenido nuevo, ni **el despliegue en las cuentas de la Fundación**: se deja listo y documentado (`GUIA-DESPLIEGUE.md`).

## 2. Estado de cada requisito

Leyenda: ✅ cumple · 🟡 cumple con salvedad · ⏳ implementado, pendiente de la verificación final · ❌ no cumple.

| ID | Requisito | Estado | Evidencia |
|---|---|---|---|
| RF-001 | Fotos de niños ocultas en programas sin autorización; reactivables sin código | ✅ | Campo `photos_authorized` (por defecto apagado). Aula Wawitas y Pasos Firmes apagados. `tests/consent/consent.spec.ts` |
| RF-002 | Solo los 3 testimonios entregados, sin nombres completos | ✅ | "Mamá de T./S./R." en testimonios, hero de Inicio, Impacto y Familias. `tests/consent` |
| RF-003 | Formularios al correo oficial; nunca confirman un envío que no ocurrió | ✅ | Sin `RESEND_API_KEY` responden 503 y la página ofrece WhatsApp. `tests/api/forms.spec.ts`. **Envío real con clave: pendiente de prueba en el despliegue** (§4) |
| RF-004 | Validación de correo, campos y spam, en ambos idiomas | ✅ | Respuestas 400. `tests/api/forms.spec.ts` |
| RF-005 | Idioma correcto del documento (`lang`) | ✅ | `<html lang>` por idioma. `tests/seo/lang.spec.ts` |
| RF-006 | Sitemap, robots, metadatos de vista previa, `hreflang`, favicon | ✅ | `tests/seo/seo.spec.ts` |
| RF-007 | Solo cifras respaldadas; "9 profesionales" consistente | ✅ | Sin "1000+ sesiones" ni "8 áreas". `tests/consent` |
| RF-008 | 3 últimas publicaciones del blog en Inicio | ✅ | `tests/blog/blog.spec.ts` |
| RF-009 | Guías de Familias: descarga real o solicitud por WhatsApp sin prometer lo inexistente | ✅ | Hoy por WhatsApp (sin PDFs subidos) |
| RF-010 | Ninguna imagen rota | ✅ | Barrido de 44 vistas (11 rutas × es/en × 375/1280 px), 10-oct-2026: sin imágenes rotas, errores de consola ni enlaces internos caídos |
| RF-011 | Objetivos táctiles ≥ 44 px y contraste AA en móvil | 🟡 | `tests/a11y` (axe, 375 px). Corregido con tokens existentes. Salvedad: `heading-order` (§5) |
| RF-012 | Inicio, Mi Escuelita Down y Contacto ≥ 90 en Lighthouse | 🟡 | Mi Escuelita Down 92–93 y Contacto 92–95 cumplen. **Inicio 85–92 (mediana ≈ 90): en el umbral** (§5) |
| RF-013 | Entradas creadas desde el panel con nombre legible | ✅ | `identifier_field` en testimonios y equipo; `tests/cms/slugs.spec.ts` |
| RF-014 | Suite de pruebas del CMS al 100 % | 🟡 | Corrida completa 10-oct-2026: 260/261. El fallo (`impacto.spec.ts:110`, aviso "Entrada guardada") es intermitente y pasa al repetir el archivo (7/7) |
| RF-015 | Guía de despliegue, manuales y acta; sin secretos ni datos de menores en el repositorio | ✅ | Esta carpeta; `.gitignore` excluye `documentacion/` |
| RF-016 | Rama de integración compila y es la base de la entrega | ✅ | `tsc` + `build` sin errores (10-oct-2026). PR #49 `integracion → develop` |

**Criterios de éxito sin comprobar aún:** CE-004 (una persona no técnica publica una noticia en < 10 min usando solo el manual) y CE-005 (una persona ajena despliega con solo la guía) requieren una prueba con personas reales; se recomiendan durante la capacitación.

## 3. Riesgos registrados

### 3.1 Fotos de uso general (riesgo aceptado por el responsable)

Las fotos de Inicio, Quiénes Somos, Impacto, Colabora y Familias **no están asociadas a un programa**, por lo que **no es posible vincular cada una a una autorización firmada**. Por decisión del responsable (9-oct-2026) se mantienen publicadas. **La Fundación asume este riesgo** y puede retirar cualquier foto desde el panel sin tocar código. Se recomienda revisarlas con el equipo y las familias antes de la publicación abierta.

### 3.2 Autorizaciones con defectos

Los 10 permisos recibidos corresponden **solo a Mi Escuelita Down**. Algunos tienen defectos (sin fecha, sin nombre o sin firma institucional) y la institución no firmó ninguno. Por decisión del responsable basta con la **declaración de la Fundación** de que cuenta con las autorizaciones; queda registrada aquí. Los documentos originales contienen datos de menores y **no se incluyen en el repositorio**.

### 3.3 Fotografías de Aula Wawitas y Pasos Firmes

Ocultas hasta recibir autorizaciones firmadas de esos programas. Esas páginas se ven completas sin fotos.

## 4. Pendientes de la Fundación

| # | Pendiente | Bloquea |
|---|---|---|
| 1 | Autorizaciones firmadas de uso de imagen de **Aula Wawitas** y **Pasos Firmes** (para activar sus fotos) | Fotos de esos programas |
| 2 | Firma y fecha de la **institución** en las autorizaciones existentes | Cierre formal del riesgo 3.2 |
| 3 | Autorización escrita de las **3 familias** de los testimonios para publicarlos en la web | Testimonios en línea |
| 4 | Autorización formal de los **logos de aliados y medios** (UCB, Red Uno, ATB, Página Siete) | Sección de aliados |
| 5 | **Cuenta institucional de donaciones** (banco/QR definitivo) | Página Colabora |
| 6 | Cuentas: GitHub, Vercel, Resend (correo institucional) y **compra del dominio `.org`** | Despliegue |
| 7 | Guías en **PDF** para Familias (subir desde el panel; la descarga se activa sola) | Opcional |
| 8 | Fotos de **Helan Medrano** y **Luis Machicado** (hoy aparecen con iniciales) | Opcional |
| 9 | Validar cifras de **sesiones al año** y **áreas terapéuticas** si se quieren volver a mostrar | Opcional |
| 10 | **Fecha de entrega** | Cronograma |
| 11 | Prueba con clave real: envío de los dos formularios y publicación desde el panel (Quickstart Q4, Q11, Q13) | Cierre de RF-003 en producción |

## 5. Deuda técnica conocida

1. **Rendimiento de Inicio:** Lighthouse móvil 85–92 (11 corridas, mediana ≈ 90). Ya era así en `develop`; se descartaron regresión, fuentes y JavaScript; la causa es la foto protagonista del hero y el CSS bloqueante en el perfil más lento. Se redujo la foto de 53 KB a 36 KB con AVIF/WebP. Más margen exige tocar diseño. Una corrida de verificación del 10-oct-2026 en un equipo con carga dio rendimiento 65–91 (LCP 3,3–4,4 s) en las tres rutas, por debajo de lo medido antes; accesibilidad 98–100, buenas prácticas 100 y SEO 100. **Se recomienda repetir la medición en un equipo sin carga antes de citar cifras.** Detalle: `specs/001-entrega-v1/notas-rendimiento.md`.
2. **Encabezados:** la regla `heading-order` de axe (buena práctica, no criterio WCAG AA) falla en 14 de 24 rutas por saltos h1→h3/h4. Contacto ya está corregida.
3. **Blog en inglés:** las publicaciones se muestran en español en ambos idiomas (decisión acordada).
4. **Imágenes en el repositorio:** no se usa Cloudflare R2; crecimiento del repositorio explicado en `MANUAL-ADMIN.md` §6.
5. **Pruebas del CMS** editan contenido real: correr una sola instancia a la vez.

## 6. Documentación entregada

`docs/entrega/`: `MANUAL-CMS.md`, `MANUAL-ADMIN.md`, `GUIA-DOMINIO.md`, `GUIA-DESPLIEGUE.md` y esta acta. Especificación y trazabilidad en `specs/001-entrega-v1/`.

## 7. Soporte posterior

**30 días calendario** desde la fecha de entrega para corregir defectos del alcance entregado y resolver dudas de uso. No cubre contenido nuevo, rediseños ni funcionalidades fuera de §1. Contacto: _responsable del proyecto (por completar)_.

## 8. Capacitación

Sesión de capacitación a las personas que editarán contenido, usando `MANUAL-CMS.md`. Asistentes: _por completar_. Fecha: _por completar_.

## 9. Conformidad

Con esta acta la Fundación declara haber recibido el sitio y la documentación descritos, conocer los riesgos de la sección 3 y los pendientes de la sección 4.

| | Nombre | Cargo | Firma | Fecha |
|---|---|---|---|---|
| Por la Fundación PRO-21 | | | | |
| Por el equipo de desarrollo | | | | |
| Supervisor académico | M.Sc. Orlando Rivera | | | |
