# Manual de administración (cuentas, claves, costos y respaldo)

Para: la persona que **administra** el sitio en nombre de la Fundación (no la que edita contenido: esa usa `MANUAL-CMS.md`).

## 1. Mapa de cuentas

| Servicio | Para qué sirve | Quién debe ser dueño | Costo |
|---|---|---|---|
| **GitHub** | Guarda el código **y todo el contenido**; da el login del panel | Cuenta de la Fundación (o del responsable que se quede) — **no** la cuenta personal de un estudiante | $0 |
| **Vercel** (plan Hobby) | Publica el sitio y ejecuta el login y los formularios | Cuenta con correo institucional, conectada al GitHub de la Fundación | $0 |
| **Resend** | Envía los correos de los formularios | Cuenta con correo institucional | $0 (3.000 correos/mes, 100/día) |
| **Registrador de dominio** | Dominio `.org` | La Fundación | ≤ $15 USD/año (único costo recurrente) |
| **Cloudflare R2** | *No se usa en v1* (ver §6) | — | $0 |

**Costo total esperado: ≤ $15 USD/año** (solo el dominio). Si algún servicio pide tarjeta o plan de pago, detente y consulta antes de aceptar.

> Regla de oro: **cada cuenta debe tener al menos dos personas con acceso o un correo institucional de recuperación.** Si la única persona con acceso se va, el sitio sigue funcionando pero no se podrá administrar.

## 2. Variables de entorno

Se cargan en **Vercel → Proyecto → Settings → Environment Variables** (entorno *Production*). Después de cambiar cualquiera hay que **redesplegar** (Deployments → ⋯ → Redeploy). La plantilla completa y comentada está en `.env.example`. Nunca subas valores reales al repositorio.

| Variable | Obligatoria | Qué es |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Sí | URL final sin barra al final (`https://fundacionpro21.org`). Debe coincidir con la OAuth App |
| `GITHUB_CLIENT_ID` | Sí | Identificador de la OAuth App de GitHub (login del panel) |
| `GITHUB_CLIENT_SECRET` | Sí | Secreto de esa OAuth App. **Tratarlo como contraseña** |
| `RESEND_API_KEY` | Sí | Llave de Resend. Sin ella los formularios responden error 503 (nunca fingen éxito) |
| `CONTACT_FROM` | Sí | Remitente de los correos; debe ser de un **dominio verificado** en Resend (ej. `web@fundacionpro21.org`) |
| `CONTACT_EMAIL` | No | Fuerza el correo de destino. Vacío = se usa el correo de *Configuración general* del panel |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics 4, solo si la Fundación decide usarlo |

Las variables `CLOUDFLARE_R2_*` y `NEXT_PUBLIC_R2_PUBLIC_URL` de `.env.example` **no se usan en v1**; no hace falta cargarlas.

## 3. Quién puede editar el sitio

El login de GitHub solo identifica; **quien puede guardar cambios es quien figura como colaborador del repositorio.**

- Agregar editor: GitHub → repositorio → **Settings → Collaborators** → *Add people* → permiso **Write** (no Admin).
- Quitar editor: la misma pantalla → quitar. Pierde el acceso al panel de inmediato.
- Revisa la lista cada 6 meses y cada vez que alguien deje la Fundación.

El login pide el permiso `repo` de GitHub (es el que exige Decap CMS para editar archivos). Por eso solo debe darse a personas de confianza.

## 4. Rotación de claves

Rota una clave **al menos una vez al año**, y **de inmediato** si se filtró (se pegó en un chat, un correo o el repositorio) o si se va alguien que la conocía.

| Clave | Cómo rotarla | Qué se rompe mientras tanto |
|---|---|---|
| `RESEND_API_KEY` | Resend → API Keys → crear nueva → pegar en Vercel → redeploy → borrar la vieja | Nada si haces el orden indicado |
| `GITHUB_CLIENT_SECRET` | GitHub → Settings → Developer settings → OAuth Apps → *Generate a new client secret* → pegar en Vercel → redeploy → borrar el viejo | Nadie puede entrar al panel unos minutos |

Si una clave llegó a subirse al repositorio: **rótala primero** (borrar el archivo del historial no basta) y luego avisa al responsable técnico.

## 5. Revisar que todo funciona (cada mes, 5 minutos)

1. Abre el sitio en español e inglés y recorre Inicio, un programa y Contacto.
2. Envía un mensaje de prueba por el formulario de Contacto: debe llegar al correo de la Fundación. Si el sitio muestra "No pudimos enviar tu mensaje… escríbenos por WhatsApp", el correo **no** está funcionando; el sitio no te engaña.
   - Causas habituales: `RESEND_API_KEY` vencida/borrada, dominio de `CONTACT_FROM` no verificado, límite diario de Resend. Revisa Resend → Logs.
3. Entra a `/admin` con tu cuenta: debe cargar.
4. Vercel → Deployments: el último despliegue debe estar en verde.

## 6. Imágenes y el límite de espacio

En v1 las imágenes subidas desde el panel **se guardan en el repositorio** (`public/images/uploads`) y los PDFs en `public/docs`, con un máximo de 5 MB cada archivo. No se usa Cloudflare R2.

Consecuencias: es simple y gratis, pero el repositorio crece con cada foto. GitHub recomienda mantenerlo bajo 1 GB. Con fotos optimizadas de 300–500 KB y unos pocos PDFs cabrían miles de archivos, así que no es un problema práctico; si algún día lo fuera, se puede migrar a R2 (hay un plan previo en `docs/ARCHITECTURE.md`).

## 7. Respaldo

Todo el contenido **es** el repositorio, así que el respaldo es copiar el repositorio:

- **Mensual:** en tu computadora, `git clone https://github.com/<organizacion>/<repositorio>.git` y guarda la carpeta (o el ZIP desde GitHub: *Code → Download ZIP*) en un disco o nube de la Fundación.
- **Historial:** GitHub conserva cada cambio. Para deshacer uno: repositorio → *Commits* → el cambio → *Revert*.
- Los **mensajes de contacto no se almacenan en el sitio**: solo existen en el correo de la Fundación. Respalda esa bandeja si es importante.
- **No** versiones nunca documentos con datos de menores (autorizaciones firmadas, reseñas originales). Guárdalos en un lugar privado de la Fundación.

## 8. Cambios que requieren a un desarrollador

Estos cambios están en el código, no en el panel:

- Mover el repositorio a otra cuenta de GitHub: hay que actualizar `repo:` en `public/admin/config.yml` **y** la constante `REPO` en `lib/github.ts`, y crear una OAuth App nueva.
- Cambiar de dominio: actualizar `base_url` en `public/admin/config.yml`, `NEXT_PUBLIC_SITE_URL`, la OAuth App y el dominio verificado en Resend.
- Nuevas secciones o rediseño.

## 9. Deuda técnica conocida

Registrada con detalle en `ACTA-ENTREGA.md` (rendimiento de Inicio en el umbral de 90, estructura de encabezados en 14 de 24 rutas).
