# GITHUB_VERCEL_HANDOFF.md — Checklist para el dueño del repo/Vercel

> El código de la Fase 0 del CMS (`docs/CMS_DEVELOPMENT_PLAN.md`) ya está listo en la rama `CMS`,
> pero necesita que alguien con acceso de administrador al repo de GitHub
> (`Rdrgrvram/Fundacion-PRO21-y-Centro-Lapiz-en-mano`) y al proyecto de Vercel haga las siguientes
> tareas — ninguna de ellas se puede hacer desde el código. Enviar esta lista tal cual.

---

## 0. Antes de empezar — confirmar 2 datos

Sin esto no se puede completar el resto del checklist con precisión:

- [ ] **¿Cuál es el dominio real de producción hoy?** ¿Ya está activo `fundacionpro21.org`
      apuntando a Vercel, o el sitio todavía vive en una URL tipo
      `fundacion-pro21-xxxx.vercel.app`? El `config.yml` del CMS ya asume
      `https://fundacionpro21.org` — si el dominio real es otro, hay que corregirlo antes de
      publicar.
- [ ] **¿El repositorio de GitHub debe seguir siendo público, o conviene hacerlo privado?** El
      proyecto va a manejar datos sensibles con el tiempo (fotos de niños con autorización,
      posibles datos bancarios reales) que pasan por el historial de Git — vale la pena que el
      dueño del repo lo decida explícitamente, no asumirlo.

---

## 1. GitHub — crear la OAuth App (no una "GitHub App")

Esto es lo que permite que un admin de la fundación inicie sesión en `/admin` con su cuenta de
GitHub para editar contenido. GitHub ofrece dos tipos de app parecidos — **es importante crear el
tipo correcto**:

- ✅ **"OAuth Apps"** (`github.com/settings/developers` → pestaña "OAuth Apps") — es este.
- ❌ **NO** "GitHub Apps" (la otra pestaña) — es un modelo distinto, basado en instalación, y no
  funciona con la implementación ya construida.

**Pasos:**
1. Ir a `github.com/settings/developers` → **OAuth Apps** → **New OAuth App**.
2. Completar:
   | Campo | Valor |
   |---|---|
   | Application name | `Fundación PRO-21 — CMS` |
   | Homepage URL | `https://<dominio-real-de-produccion>` |
   | Authorization callback URL | `https://<dominio-real-de-produccion>/api/auth/callback` |
3. Crear la app. GitHub muestra un **Client ID** (público, se puede compartir sin problema) y da la
   opción de **Generate a new client secret** (⚠️ tratar como una contraseña — no pegarlo en Slack,
   WhatsApp, ni en esta conversación; va directo a Vercel, ver §3).
4. Enviar de vuelta al equipo de desarrollo: el **Client ID**, y confirmar que el **Client Secret**
   ya quedó cargado en Vercel (§3) — el secreto en sí no hace falta compartirlo con el equipo de
   desarrollo si quien crea la app también tiene acceso a Vercel para cargarlo directamente.

**¿Quién debe crearla?** Idealmente una cuenta de GitHub que vaya a seguir asociada al proyecto a
largo plazo (del dueño del repo o de una cuenta institucional), no la cuenta personal de un
estudiante que se gradúa — si esa cuenta se elimina o pierde acceso, el login del CMS dejaría de
funcionar.

---

## 2. GitHub — agregar colaboradores con acceso de escritura

El login de GitHub por sí solo **no** decide quién puede publicar cambios — decide quién puede
*intentar* entrar. Quien realmente autoriza a alguien a guardar contenido es la lista de
**colaboradores del repositorio**.

- [ ] Ir a `Settings → Collaborators and teams` del repo.
- [ ] Agregar ahí, con permiso de **Write** (no hace falta Admin), la cuenta de GitHub de cada
      persona que deba poder editar contenido desde `/admin` — esto incluye tanto a los admins
      reales de la fundación (una vez que se les cree cuenta) como al equipo de desarrollo mientras
      se prueba.
- [ ] **Pendiente de confirmar**: ¿quiénes son exactamente esas personas? (nombres de usuario de
      GitHub) — hace falta esa lista para completar este paso.

---

## 3. Vercel — variables de entorno

En el dashboard de Vercel del proyecto → **Settings → Environment Variables**, agregar (entorno
*Production*, y opcionalmente *Preview* si se quiere probar el flujo completo de PRs):

| Variable | Valor | Notas |
|---|---|---|
| `GITHUB_CLIENT_ID` | el Client ID del paso 1 | no es secreto, pero se carga igual como env var |
| `GITHUB_CLIENT_SECRET` | el Client Secret del paso 1 | ⚠️ sensible — Vercel lo encripta automáticamente |
| `NEXT_PUBLIC_SITE_URL` | `https://<dominio-real-de-producción>` | debe coincidir exactamente con el dominio usado en la OAuth App |

Ya existían en `.env.example` (confirmar si ya están cargadas en Vercel, si no, agregarlas también):
`RESEND_API_KEY`, `CONTACT_EMAIL`.

- [ ] Después de cargar las variables, **hacer un redeploy** — Vercel no aplica variables nuevas a
      un build ya existente, necesita un despliegue nuevo para tomarlas.

---

## 4. Vercel — confirmar la rama de producción

- [ ] En **Settings → Git → Production Branch**, confirmar que dice `master` (no `main`).
      Tiene que coincidir exactamente con `backend.branch: master` de
      `public/admin/config.yml` — si no coinciden, el CMS podría terminar publicando cambios a una
      rama que nunca llega al sitio real.
- [ ] Confirmar que **Preview Deployments** está activo para Pull Requests (suele venir activado
      por defecto en proyectos conectados a GitHub). No es bloqueante para que el login funcione,
      pero permite que quien revise un PR generado por el CMS (recordar: se usa
      `publish_mode: editorial_workflow`, cada cambio del admin abre un PR en vez de publicar
      directo) vea una vista previa en vivo antes de aprobar.

---

## 5. Resumen — qué necesita el equipo de desarrollo de vuelta

1. Dominio real de producción (§0).
2. Decisión sobre visibilidad del repo (§0).
3. Confirmación de que la OAuth App fue creada + el Client ID (§1).
4. Confirmación de que `GITHUB_CLIENT_ID`/`GITHUB_CLIENT_SECRET`/`NEXT_PUBLIC_SITE_URL` ya están
   cargadas en Vercel y se hizo un redeploy (§3).
5. Lista de usuarios de GitHub a agregar como colaboradores (§2).
6. Confirmación de que la rama de producción en Vercel es `master` (§4).

Con esos 6 puntos resueltos, queda pendiente solo una prueba end-to-end (abrir `/admin` en
producción, iniciar sesión con GitHub, editar la colección `equipo` y confirmar que se abre un PR)
— documentada como parte de la verificación de la Fase 0 en `docs/CMS_DEVELOPMENT_PLAN.md` §10.
