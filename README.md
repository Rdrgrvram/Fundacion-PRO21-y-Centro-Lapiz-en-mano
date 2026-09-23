# Fundación PRO-21 y Centro Lápiz en Mano

Página web institucional de la Fundación PRO-21 y Centro Lápiz en Mano (La Paz, Bolivia). Proyecto Social UCB — Ingeniería de Sistemas.

Stack, arquitectura y roadmap completos en [`CLAUDE.md`](./CLAUDE.md) y [`docs/`](./docs/).

## Requisitos

- Node.js 18+
- npm

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Levanta el sitio en [http://localhost:3000](http://localhost:3000).

### CMS local (Decap)

El panel de administración de contenido vive en `/admin`. En **local**, el CMS no
usa el login real de GitHub — usa un backend de filesystem (`local_backend: true`
en `public/admin/config.yml`) que necesita su propio proceso corriendo aparte:
[`decap-server`](https://www.npmjs.com/package/decap-server), en el puerto 8081.

Sin ese proceso, `/admin` cae al backend `github` real y el botón de login intenta
redirigir a `fundacionpro21.org` (el dominio de producción) — que no resuelve en
desarrollo local y da un error de DNS.

**Para evitarlo**, levantar el sitio y el CMS juntos con un solo comando:

```bash
npm run dev:cms
```

Esto corre `next dev` (puerto 3000) y `npx decap-server` (puerto 8081) a la vez,
con la salida de cada uno prefijada (`[next]` / `[decap]`) para distinguirlos.
Ctrl+C apaga ambos procesos.

Alternativa manual (dos terminales separadas):

```bash
# Terminal 1
npm run dev

# Terminal 2
npx decap-server
```

Con cualquiera de las dos formas, abrir [http://localhost:3000/admin](http://localhost:3000/admin)
entra directo al panel, sin pedir login de GitHub.

> El script vive en [`scripts/dev-cms.mjs`](./scripts/dev-cms.mjs) — sin dependencias
> nuevas (usa `child_process` de Node), consistente con el resto del proyecto.

### Panel rápido de visibilidad del Blog

[http://localhost:3000/admin/blog](http://localhost:3000/admin/blog) — herramienta
interna (no enlazada desde ningún lugar público del sitio) para mostrar/ocultar
publicaciones del blog sin borrarlas, con un botón por fila. Decap CMS no tiene
ningún gancho oficial para agregar esto al listado de entradas de su propio panel,
así que vive en una página aparte que reutiliza la misma sesión de GitHub que ya usa
`/admin` (ver `app/admin/blog/`). En local (sin sesión real de GitHub) escribe
directo al filesystem; en producción usa la Contents API de GitHub con el token de
la sesión activa.

## Otros comandos

| Comando | Qué hace |
|---|---|
| `npm run build` | Build de producción (compila el panel admin + Next.js) |
| `npm run start` | Sirve el build de producción |
| `npm run lint` | ESLint |
| `npm run type-check` | Chequeo de tipos TypeScript, sin emitir archivos |
| `npm run test:cms` | Suite de auditoría del CMS (Playwright) — ver `tests/cms/` |

## Auditoría del CMS

`tests/cms/` contiene un test Playwright por página/colección del CMS, verificando
que cada campo definido en `public/admin/config.yml` es editable, se publica
correctamente y se refleja en el sitio. Requiere `npm run dev:cms` corriendo en
paralelo (o los dos procesos manuales de arriba).

```bash
npm run test:cms
```
