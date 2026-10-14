# Guía de despliegue paso a paso

Deja el sitio publicado con el panel `/admin`, los formularios por correo y el dominio. Pensada para que una persona ajena al equipo la siga sola (Quickstart Q13).

**Tiempo estimado:** 1 a 2 horas, más la espera de DNS. **Costo:** $0 + dominio (≤ $15 USD/año).
**Necesitas:** un correo institucional de la Fundación, un computador con navegador, y (solo para el paso 1) Git instalado.

Orden: 1 GitHub → 2 Vercel → 3 Login del panel → 4 Correo (Resend) → 5 Dominio → 6 Verificación.

> No uses datos reales de menores para probar. Para las pruebas escribe "Prueba" como nombre.

---

## Paso 1 — GitHub: poner el código en la cuenta de la Fundación

1. Crea (o usa) la cuenta de GitHub de la Fundación y, opcionalmente, una **organización**. Activa verificación en dos pasos.
2. Crea un repositorio **privado** vacío (recomendado: contendrá fotos de actividades). Anota `<propietario>/<repositorio>`.
3. Desde una copia del proyecto, sube **todas las ramas necesarias** (`master` es la de producción):
   ```
   git remote add fundacion https://github.com/<propietario>/<repositorio>.git
   git push fundacion master
   ```
4. **Actualiza el repositorio en el código** (hace un desarrollador, una sola vez), en estos dos lugares, y súbelo:
   - `public/admin/config.yml` → `backend.repo: <propietario>/<repositorio>`
   - `lib/github.ts` → constante `REPO`
5. Agrega a quienes editarán: **Settings → Collaborators → Add people → permiso Write**.

✅ Listo cuando: ves el código en GitHub y la rama `master` es la predeterminada.

## Paso 2 — Vercel: publicar el sitio

1. Entra a vercel.com con el correo institucional → **Sign up with GitHub** (con la cuenta de la Fundación). Plan **Hobby** (gratis).
2. **Add New → Project** → importa el repositorio del paso 1.
3. Configuración:
   - Framework: **Next.js** (autodetectado).
   - Build Command: déjalo (`npm run build`; ya incluye la construcción del panel).
   - **Settings → Git → Production Branch = `master`**. Debe coincidir con `backend.branch` de `public/admin/config.yml`.
4. **Antes de pulsar Deploy**, abre *Environment Variables* y agrega:

   | Variable | Valor por ahora |
   |---|---|
   | `NEXT_PUBLIC_SITE_URL` | La URL provisoria que da Vercel (`https://<proyecto>.vercel.app`); luego se cambia por el dominio |

   Las demás se agregan en los pasos 3 y 4.
5. Pulsa **Deploy** y espera (≈ 3 min).

✅ Listo cuando: `https://<proyecto>.vercel.app/es` abre el sitio. Revisa también `/en`.

## Paso 3 — Login del panel `/admin` (OAuth de GitHub)

Debe ser una **OAuth App**, no una "GitHub App".

1. GitHub → **Settings → Developer settings → OAuth Apps → New OAuth App**.
2. Completa:

   | Campo | Valor |
   |---|---|
   | Application name | `Fundación PRO-21 — CMS` |
   | Homepage URL | `https://<proyecto>.vercel.app` (luego el dominio) |
   | Authorization callback URL | `https://<proyecto>.vercel.app/api/auth/callback` |

3. Crea la app y copia el **Client ID**. Pulsa **Generate a new client secret** y cópialo (solo se muestra una vez).
4. En Vercel → Settings → Environment Variables agrega `GITHUB_CLIENT_ID` y `GITHUB_CLIENT_SECRET`. **Nunca** pegues el secreto en chats, correos ni en el repositorio.
5. **Redespliega** (Deployments → ⋯ → Redeploy). Vercel no aplica variables nuevas a un despliegue ya hecho.

✅ Listo cuando: `/admin` → *Login with GitHub* → entras y ves el menú de secciones.
❌ Si falla con "redirect_uri": la callback URL no coincide **exactamente** con la URL del sitio.

## Paso 4 — Correo de los formularios (Resend)

1. Crea cuenta en resend.com con el correo institucional (plan gratis).
2. **Domains → Add Domain** con tu dominio y crea los registros DNS (ver `GUIA-DOMINIO.md` §3). *Esto requiere tener ya el dominio* (paso 5); si aún no lo tienes, puedes probar con el remitente de pruebas de Resend (`onboarding@resend.dev`), que solo envía al correo del titular de la cuenta de Resend.
3. **API Keys → Create API Key** (permiso *Sending access*). Cópiala.
4. En Vercel agrega:
   - `RESEND_API_KEY` = la llave.
   - `CONTACT_FROM` = `web@<tu-dominio>` (dominio verificado). Para la prueba provisoria: `onboarding@resend.dev`.
   - `CONTACT_EMAIL` solo si quieres fijar el destino; vacío = el correo del panel (*Configuración general*).
5. Redespliega.

✅ Listo cuando: el formulario de `/es/contacto` con datos de prueba muestra confirmación y el correo llega. **Sin** `RESEND_API_KEY`, el formulario muestra error y botón de WhatsApp (comportamiento correcto, nunca finge éxito).

## Paso 5 — Dominio

Sigue `GUIA-DOMINIO.md` completa (compra, DNS hacia Vercel, verificación en Resend). Después:

1. Cambia `NEXT_PUBLIC_SITE_URL` en Vercel al dominio definitivo.
2. Cambia en la OAuth App del paso 3 la *Homepage URL* y la *callback URL* al dominio definitivo.
3. Si el dominio no es `fundacionpro21.org`, actualiza `base_url` en `public/admin/config.yml` (ver GUIA-DOMINIO §6).
4. Redespliega.

## Paso 6 — Imágenes

No hay nada que configurar: las imágenes subidas desde el panel se guardan en el repositorio (`public/images/uploads`; los PDFs en `public/docs`; máximo 5 MB por archivo). **Cloudflare R2 no se usa en v1**; ignora las variables `CLOUDFLARE_R2_*`.

## Paso 7 — Verificación final (Quickstart)

Marca cada punto en el sitio real:

- [ ] `/es` y `/en` cargan; el idioma del navegador al compartir el enlace es correcto.
- [ ] `/sitemap.xml`, `/robots.txt` y el ícono de la pestaña (favicon) existen.
- [ ] `/es/aula-wawitas`, `/es/pasos-firmes` y `/es/desarrolla-tea` **no muestran fotos de niños**; `/es/mi-escuelita-down` sí.
- [ ] Testimonios: solo "Mamá de T./S./R.".
- [ ] "9 profesionales" en Inicio, Quiénes Somos, Equipo e Impacto; sin "1000+ sesiones" ni "8 áreas".
- [ ] Formulario de **Contacto** y de **Voluntariado** (Colabora): llegan al correo de la Fundación.
- [ ] `/admin`: login con GitHub, crear una publicación de prueba en Blog, pasarla a *Listo*, publicarla y verla en `/es/blog` en ≈ 3 min. Luego ocúltala con *Visible en el sitio*.
- [ ] Subir una imagen y un PDF de prueba (< 5 MB) desde el panel y comprobar que se ven y se descargan en el sitio.
- [ ] Vercel → Deployments: último despliegue en verde.

Cuando todo está marcado, el despliegue está completo. Registra la fecha y quién lo hizo en el acta.

## Problemas frecuentes

| Síntoma | Causa probable |
|---|---|
| `/admin` queda en blanco | El build falló: Vercel → Deployments → ver el log |
| "Falta configurar GITHUB_CLIENT_ID" | La variable no está cargada o no se redesplegó |
| Login entra pero no guarda | Esa cuenta no es colaborador con permiso Write |
| Formulario muestra error + WhatsApp | Falta `RESEND_API_KEY`, o el dominio de `CONTACT_FROM` no está verificado |
| El panel publica pero el sitio no cambia | La rama de producción de Vercel no es `master` |
