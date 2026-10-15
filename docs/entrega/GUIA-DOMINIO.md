# Guía del dominio y del correo institucional

Objetivo: tener `https://<dominio>.org` apuntando al sitio, y poder enviar los correos de los formularios desde una dirección del mismo dominio.

**Cuándo hacerlo:** el dominio se compra **cuando el desarrollo esté aprobado** por la Fundación, no antes (decisión del proyecto). Presupuesto máximo: **$15 USD/año**. El dominio de ejemplo en el código es `fundacionpro21.org`; si el definitivo es otro, ver paso 6.

Ejecuta esto después de tener el sitio desplegado en Vercel (`GUIA-DESPLIEGUE.md`, pasos 1–3).

## 1. Elegir y comprar el dominio

1. Compara el precio **de renovación** (no solo el del primer año) en un registrador reconocido (Cloudflare Registrar, Namecheap, Porkbun, GoDaddy). Cloudflare vende al costo, sin sobreprecio.
2. Compra el `.org` con una cuenta de la Fundación y su correo institucional. **El titular del dominio debe ser la Fundación**, no una persona.
3. Activa la **renovación automática** y el **bloqueo de transferencia**. Anota la fecha de vencimiento en el calendario de la Fundación.
4. Ignora los extras que ofrecen (hosting, correo, SSL de pago, "privacidad" si ya es gratis): no se necesitan.

## 2. Apuntar el dominio a Vercel

1. Vercel → Proyecto → **Settings → Domains → Add** → escribe `fundacionpro21.org` (tu dominio).
2. Agrega también `www.<dominio>` y deja que Vercel redirija uno al otro.
3. Vercel te mostrará los registros DNS exactos. Normalmente:

| Tipo | Nombre | Valor |
|---|---|---|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

> Usa **los valores que muestre Vercel**, que pueden haber cambiado.

4. Entra al panel DNS de tu registrador y crea esos registros. Borra registros A/CNAME previos del mismo nombre.
5. Espera de unos minutos a unas horas. Vercel marca el dominio con un check verde y emite el certificado HTTPS solo.

## 3. Verificar el dominio en Resend (para enviar correos)

Sin esto, Resend **rechaza** los envíos y el sitio muestra el error con la alternativa de WhatsApp.

1. Resend → **Domains → Add Domain** → tu dominio.
2. Resend muestra 3 o 4 registros DNS (SPF, DKIM y MX/retorno). Créalos tal cual en el mismo panel DNS del paso 2.
3. Pulsa **Verify** en Resend. Cuando el dominio diga *Verified*, ya puedes enviar.
4. En Vercel define `CONTACT_FROM` con una dirección de ese dominio, por ejemplo `web@fundacionpro21.org` (no hace falta que exista como buzón: solo envía).
5. Redespliega.

## 4. Dónde recibe la Fundación los mensajes

Los mensajes llegan al correo de **Configuración general → Datos de contacto → Correo electrónico** del panel (hoy un Gmail de la Fundación), o a `CONTACT_EMAIL` si el administrador lo fijó. **No es obligatorio comprar buzones de correo** en el dominio: basta con reenviar a un Gmail o similar institucional. Si la Fundación quiere buzones `@dominio.org`, es un servicio aparte (ej. Google Workspace, de pago) y **excede el presupuesto de v1**.

## 5. Actualizar el login del panel

Tras cambiar a un dominio definitivo, la OAuth App de GitHub debe coincidir exactamente:

- Homepage URL: `https://<dominio>`
- Authorization callback URL: `https://<dominio>/api/auth/callback`
- `NEXT_PUBLIC_SITE_URL` en Vercel: `https://<dominio>`

Si no coinciden, `/admin` falla al iniciar sesión.

## 6. Si el dominio no es `fundacionpro21.org`

Cambia, en un commit hecho por un desarrollador:

- `base_url` en `public/admin/config.yml`.
- El valor por defecto de `CONTACT_FROM` en `lib/mail.ts` (o define siempre la variable).
- `NEXT_PUBLIC_SITE_URL` y `CONTACT_FROM` en Vercel.

## 7. Comprobación final

- [ ] `https://<dominio>` y `https://www.<dominio>` abren el sitio con candado HTTPS.
- [ ] `https://<dominio>/sitemap.xml` y `/robots.txt` responden y usan el dominio nuevo.
- [ ] `https://<dominio>/admin` permite entrar con GitHub.
- [ ] Un mensaje de prueba por Contacto llega al correo de la Fundación.
- [ ] La renovación automática está activa y hay un recordatorio de vencimiento.
