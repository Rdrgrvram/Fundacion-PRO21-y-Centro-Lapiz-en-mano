# CONTRIBUTING.md — Guía de Contribución

> Para desarrolladores que retomen o extiendan este proyecto en el futuro.

---

## Requisitos previos

- Node.js 18+
- npm 9+
- Git

---

## Instalación local

```bash
git clone https://github.com/Rdrgrvram/Fundacion-PRO21-y-Centro-Lapiz-en-mano.git
cd Fundacion-PRO21-y-Centro-Lapiz-en-mano
npm install
cp .env.example .env.local
# Completar .env.local con los valores reales
npm run dev
```

Sitio disponible en `http://localhost:3000`
Panel CMS en `http://localhost:3000/admin`

---

## Estructura de ramas

| Rama | Uso |
|---|---|
| `main` | Producción — solo merges desde `develop` tras QA |
| `develop` | Integración — rama principal de desarrollo |
| `feature/us-XX-nombre` | Una rama por historia de usuario |

**Flujo de trabajo:**
1. Crear rama desde `develop`: `git checkout -b feature/us-XX-descripcion develop`
2. Desarrollar y commitear con mensajes en español: `feat:`, `fix:`, `style:`, `content:`, `docs:`
3. Abrir Pull Request a `develop`
4. Al menos 1 aprobación antes de mergear
5. Mergear y eliminar la rama feature

---

## Convenciones de código

- **Componentes:** PascalCase — `HeroSection.tsx`
- **Utilidades:** camelCase — `formatDate.ts`
- **Commits:** en español con prefijos: `feat:` `fix:` `content:` `style:` `docs:`
- **Clases Tailwind:** orden layout → spacing → color → typography
- **Comentarios:** en español

---

## Internacionalización (i18n)

El sitio es bilingüe. Toda cadena visible al usuario debe estar en:
- `lib/i18n/es.ts` — español (idioma principal)
- `lib/i18n/en.ts` — inglés

Las rutas se estructuran como `/es/[pagina]` y `/en/[pagina]`.

---

## Colores oficiales

| Token | HEX | Uso |
|---|---|---|
| `primary` | `#ffc500` | Amarillo — identidad PRO-21 |
| `secondary` | `#229cc2` | Azul — confianza |
| `accent` | `#8c3cbd` | Morado — creatividad |

---

## Variables de entorno

Ver `.env.example`. Las críticas para desarrollo local son `RESEND_API_KEY` (formularios) y `CLOUDFLARE_R2_*` (imágenes CMS).

---

## Contacto del proyecto

- **Supervisor:** M.Sc. Orlando Rivera — UCB La Paz
- **Repositorio:** https://github.com/Rdrgrvram/Fundacion-PRO21-y-Centro-Lapiz-en-mano
- **Fundación:** WhatsApp +591 70106276
