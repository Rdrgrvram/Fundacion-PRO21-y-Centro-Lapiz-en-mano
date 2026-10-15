#!/usr/bin/env bash
# Delega una revisión de SOLO LECTURA a Codex y deja el informe en un archivo (para no gastar tokens leyendo el proceso).
# Uso:   scripts/codex-revisar.sh <nombre> "<instrucciones de la tarea>"
#        scripts/codex-revisar.sh <nombre> -f <archivo-con-instrucciones>
# Salida: $TEMP/codex-<nombre>.txt  (el informe final está al final del archivo)
# Pensado para correr en segundo plano:  (scripts/codex-revisar.sh cms "..." &)   o con run_in_background.
# Regla de AGENTS.md: Codex es REVISOR (no edita). Ver .claude/skills/delegar-a-codex/SKILL.md.
set -euo pipefail

NOMBRE="${1:?falta el nombre de la tarea}"
shift
if [ "${1:-}" = "-f" ]; then TAREA="$(cat "${2:?falta el archivo}")"; else TAREA="${1:?faltan las instrucciones}"; fi

DESTINO="${TEMP:-${TMPDIR:-/tmp}}/codex-${NOMBRE}.txt"

BASE='Actúa como REVISOR (regla de AGENTS.md): NO edites nada, NO ejecutes pruebas, NO levantes servidores ni toques el puerto 3000 ni el 8081, NO leas .env.local ni la carpeta Documentacion/. Solo lee y reporta, en español.
Contexto del proyecto: CLAUDE.md, AGENTS.md y docs/DESIGN_STANDARD.md. Reporta con evidencia archivo:línea, severidad (bloqueante / importante / menor) y el escenario concreto de fallo. Si algo riesgoso está bien resuelto, dilo en una línea. Cierra con un resumen de 5 líneas. No repitas el diff.

TAREA:
'

# stdin a /dev/null: sin esto Codex se queda esperando entrada y se cuelga.
codex exec -s read-only "${BASE}${TAREA}" < /dev/null > "$DESTINO" 2>&1
echo "Informe de Codex en: $DESTINO"
