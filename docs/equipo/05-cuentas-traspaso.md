# 05 · Cuentas institucionales y traspaso (#81)

**Responsable:** Einar · **Apoyo:** Huascar · **Cuándo:** cuando la Fundación apruebe y entregue un correo institucional · **Tiempo:** 2 a 3 horas

**Meta:** que GitHub, Vercel y Resend queden a nombre de la Fundación, el sitio siga funcionando y las credenciales se entreguen de forma segura.

> **No hagas esto antes de la aprobación.** Hasta entonces el sitio vive en cuentas del equipo. Y **Cloudflare R2 no se usa en v1**: no crees esa cuenta.

## Qué necesitas de la Fundación

- Un **correo institucional** (de preferencia con recuperación a un segundo correo de otra persona de la Fundación).
- Una persona de la Fundación presente para aceptar términos y guardar claves.
- Decisión sobre el **dominio `.org`** (se compra aparte, ver [`GUIA-DOMINIO.md`](../entrega/GUIA-DOMINIO.md), solo cuando el desarrollo esté aprobado).

## Orden

1. **GitHub** → 2. **Vercel** → 3. **OAuth del panel** → 4. **Resend** → 5. **Verificación** → 6. **Entrega de credenciales**.

La referencia completa, con capturas de qué pulsar, es [`GUIA-DESPLIEGUE.md`](../entrega/GUIA-DESPLIEGUE.md). Aquí va solo lo que cambia en un **traspaso**.

### 1. GitHub

- Crear la cuenta (u organización) de la Fundación con **verificación en dos pasos**.
- **Transferir el repo** (Settings → General → Transfer ownership) o hacer un fork privado. Recomendado: **repositorio privado** (contiene fotos de actividades).
- Agregar como colaboradores con permiso **Write** a quienes editarán el contenido.
- **Código (lo hace Rodrigo, una sola vez):** actualizar `backend.repo` en `public/admin/config.yml` y la constante `REPO` en `lib/github.ts`, y subir el cambio. Avísale con el nombre exacto `<propietario>/<repositorio>`.

### 2. Vercel

- Crear la cuenta con el correo institucional → **Sign up with GitHub** (con la cuenta de la Fundación). Plan **Hobby**.
- Importar el repo. **Production Branch = `master`**.
- Cargar las variables (valores reales **solo en Vercel**):

  | Variable | Qué es |
  |---|---|
  | `NEXT_PUBLIC_SITE_URL` | URL final, sin barra |
  | `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | De la OAuth App nueva (paso 3) |
  | `RESEND_API_KEY` | De Resend (paso 4) |
  | `CONTACT_FROM` | Dirección de un dominio verificado |

### 3. OAuth App del panel

- GitHub (cuenta de la Fundación) → Settings → Developer settings → **OAuth Apps** → New. (No es una «GitHub App».)
- Callback: `<NEXT_PUBLIC_SITE_URL>/api/auth/callback`, que debe coincidir **exactamente**.
- **Rotar las claves:** el Client Secret anterior (el del equipo) se revoca.

### 4. Resend

- Cuenta con el correo institucional → API Key con permiso **Sending access**.
- Verificar el dominio cuando exista (SPF/DKIM, ver `GUIA-DOMINIO.md` §3). Hasta entonces solo envía al titular de la cuenta.

### 5. Verificación (obligatoria antes de dar por hecho)

- [ ] `/es` y `/en` abren desde la cuenta nueva.
- [ ] Login en `/admin` con una cuenta que **no sea del equipo**; crear, ocultar y deshacer una entrada.
- [ ] Formulario de contacto: llega el correo al destino de la Fundación.
- [ ] El último despliegue está en verde y la rama de producción es `master`.

### 6. Entrega de credenciales

- **Gestor de contraseñas** (Bitwarden, por ejemplo), nunca por chat ni correo. Comparte la bóveda con dos personas de la Fundación como mínimo.
- Repasar con ellos [`MANUAL-ADMIN.md`](../entrega/MANUAL-ADMIN.md) §1 (mapa de cuentas), §4 (rotación de claves) y §7 (respaldo).
- Regla de oro: **cada cuenta con al menos dos personas con acceso**.

## Antes de borrar lo del equipo

Verifica que **todo** funciona en la cuenta nueva. Recién entonces elimina el proyecto de Vercel y la OAuth App del equipo, y revoca los tokens personales que hayan quedado.

## Entregable (pegar en el issue #81)

- [ ] Cuentas creadas (GitHub, Vercel, Resend) con el correo institucional.
- [ ] Repo transferido y `config.yml` actualizado (confirmación de Rodrigo).
- [ ] Verificación del paso 5 completa.
- [ ] Credenciales entregadas por gestor de contraseñas (solo anota **a quién** y **cuándo**, nunca los valores).
- [ ] Claves del equipo rotadas o revocadas.

Issues relacionados: #64 (cuentas), #62 (OAuth), #65 (dominio, solo después de la aprobación).
