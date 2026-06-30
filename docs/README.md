# Fundación PRO-21 — Página Web Institucional

> Proyecto Social · UCB Carrera Ingeniería de Sistemas · La Paz, Bolivia · 2026

---

## Descripción

Página web institucional desarrollada de forma gratuita para la **Fundación PRO-21 y Centro Lápiz en Mano**, como parte del Programa de Proyectos Sociales de la Universidad Católica Boliviana "San Pablo" — Regional La Paz.

El sitio cubre 11 secciones, es bilingüe (español/inglés), responsive, y cuenta con panel de administración para que la fundación actualice su contenido de forma autónoma.

---

## Stack

- **Next.js 14+** (App Router, SSG)
- **Tailwind CSS**
- **Decap CMS** (panel de administración, gratuito)
- **Cloudflare R2** (almacenamiento de imágenes, gratuito)
- **Vercel** (hosting, gratuito)
- **GitHub** (repositorio + CI/CD)

---

## Documentación del proyecto

| Archivo | Descripción |
|---|---|
| [`CONTEXT.md`](./CONTEXT.md) | Contexto general para Claude Code — leer primero |
| [`REQUIREMENTS.md`](./REQUIREMENTS.md) | Especificación de requerimientos funcionales y no funcionales |
| [`ARCHITECTURE.md`](./ARCHITECTURE.md) | Arquitectura técnica, estructura de carpetas, decisiones de diseño |
| [`ROADMAP.md`](./ROADMAP.md) | Plan de trabajo semana a semana, hitos y entregables |
| [`CONTENT.md`](./CONTENT.md) | Guía de contenido por sección — tracker de materiales recibidos |
| [`TEAM.md`](./TEAM.md) | Roles, responsabilidades y registro de horas del equipo |
| [`ENTREVISTA.md`](./ENTREVISTA.md) | Guía para la reunión inicial con la fundación |

---

## Inicio rápido

```bash
# Clonar el repositorio
git clone https://github.com/ucb-sistemas/fundacion-pro21.git
cd fundacion-pro21

# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env.local
# Editar .env.local con los valores correctos

# Iniciar en desarrollo
npm run dev
```

El sitio estará disponible en `http://localhost:3000`
El panel CMS estará en `http://localhost:3000/admin`

---

## Variables de entorno requeridas

Ver `.env.example` para la lista completa. Las principales:

```
CLOUDFLARE_R2_ACCESS_KEY=
CLOUDFLARE_R2_SECRET_KEY=
CLOUDFLARE_R2_BUCKET=
RESEND_API_KEY=
```

---

## Deploy

El deploy es automático: cualquier push a `main` desencadena un nuevo deploy en Vercel.

- **Preview:** cada Pull Request genera una URL de preview automáticamente
- **Producción:** `https://fundacionpro21.org` (tras configurar el dominio)

---

## Costo operativo anual

| Servicio | Costo |
|---|---|
| Hosting (Vercel) | $0 |
| CMS (Decap) | $0 |
| SSL | $0 |
| Almacenamiento (Cloudflare R2) | $0 |
| Dominio `.org` | ~$12–15 USD/año |
| **Total** | **~$12–15 USD/año** |

---

## Equipo

Desarrollado por 8 estudiantes de Ingeniería de Sistemas, UCB La Paz.
Supervisado por M.Sc. Orlando Rivera, Director de la Carrera.

---

## Licencia

Código desarrollado para uso exclusivo de la Fundación PRO-21.
Contacto: WhatsApp 70106276
