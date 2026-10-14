# AGENTS.md — Sitio web Fundación PRO-21 (reglas compartidas Claude Code + Codex)

Sitio de la Fundación PRO-21 y el Centro Lápiz en Mano. Next.js (App Router) + Decap CMS, español/inglés (`app/[lang]`), Tailwind, Playwright, Resend, deploy en Vercel.
Responde siempre en **español**. Contexto completo: `CLAUDE.md`, `docs/DESIGN_STANDARD.md`, `STATE.md` (solo local).

## Cómo se trabaja
- SDD: cada cambio grande vive en `specs/<NNN>-*/` (`spec.md`, `plan.md`, `tasks.md`). Usa `specs/001-entrega-v1/` como modelo de formato.
- Rama por feature desde `develop`: `feature/<nombre>`. Commits en español con prefijo (`feat:`, `fix:`, `content:`, `style:`, `docs:`).
- Todo contenido es bilingüe: cada `.es.md` tiene su `.en.md`; cada campo del CMS que muestra texto lleva `i18n`.
- Diseño: respetar `docs/DESIGN_STANDARD.md` y los colores oficiales de `CLAUDE.md`. No inventes estilos nuevos.

## Verificar antes de decir "listo"
- `npx tsc --noEmit` y `npm run build`.
- `npm run test:cms` (Playwright). **Antes, apaga cualquier `npm run dev` viejo en el puerto 3000**: Playwright lo reutiliza.

## Líneas rojas
- **Fotos de menores:** solo con autorización escrita (`photos_authorized: false` hasta tenerla). No publiques fotos nuevas de niños sin ese dato.
- `Documentacion/` está fuera de git y tiene datos de menores y padres: no copies ni subas nada de ahí. Solo se lee el documento del programa que el usuario indique (por ejemplo `PROYECTO DESARROLLATEA.md`).
- No leas ni muestres `.env.local`. Ningún secreto en archivos versionados.
- `scripts/subir-instrucciones-github.ps1` contiene un token: **nunca lo commitees**.
- Nada de `push`, `merge` a `develop`/`main` ni deploy: eso lo hace el usuario.
- Costo cero: no agregues servicios ni cuentas nuevas.
- Nada del BCP.

## Cuando actúas como REVISOR (por ejemplo Codex)
- Revisa el `git diff` contra la tarea y la spec. No edites, solo informa.
- Reporta con evidencia (archivo:línea) y severidad **bloqueante / importante / menor**.
- Busca sobre todo: textos sin traducir o desalineados es/en, campos del CMS sin `i18n` o sin el slug nuevo, listas de programas hardcodeadas que quedaron sin actualizar, fotos de menores sin autorización, tests que no cubren lo nuevo.
