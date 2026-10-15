// Hook PostToolUse (Bash): tras un `git commit` que toca código, CMS o pruebas, recuerda delegar una revisión de solo
// lectura a Codex (skill delegar-a-codex). No molesta con commits solo de documentación o de contenido de texto.
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

let entrada = {}
try {
  entrada = JSON.parse(readFileSync(0, 'utf8'))
} catch {
  process.exit(0)
}

const comando = String(entrada?.tool_input?.command ?? '')
if (!/\bgit\s+(-C\s+\S+\s+)?commit\b/.test(comando)) process.exit(0)

let archivos = []
let resumen = ''
try {
  archivos = execFileSync('git', ['show', '--name-only', '--pretty=format:', 'HEAD'], { encoding: 'utf8' })
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
  resumen = execFileSync('git', ['show', '--shortstat', '--pretty=format:', 'HEAD'], { encoding: 'utf8' }).trim()
} catch {
  process.exit(0) // sin commit reciente (por ejemplo, el comando falló): no hay nada que recordar
}

// Solo se recuerda si el commit toca algo que vale la pena revisar.
const sensibles = archivos.filter((f) => /^(app|components|lib|styles|public\/admin|tests|scripts)\//.test(f) || /^content\/.*\.(yml|md)$/.test(f) && /settings|programs/.test(f))
const soloDocs = archivos.every((f) => /^docs\//.test(f) || /\.md$/.test(f))
if (sensibles.length === 0 || soloDocs) process.exit(0)

const toca = []
if (archivos.some((f) => /^public\/admin\/|^lib\/cms/.test(f))) toca.push('CMS (config.yml / esquemas)')
if (archivos.some((f) => /^(app|components|styles)\//.test(f))) toca.push('interfaz')
if (archivos.some((f) => /^tests\//.test(f))) toca.push('pruebas')

const mensaje =
  `Acabas de hacer un commit (${resumen || archivos.length + ' archivos'}) que toca: ${toca.join(', ') || 'código'}. ` +
  'Según la skill `delegar-a-codex` de este proyecto: si este cambio no se ha revisado todavía en la sesión, delega una revisión ' +
  'de SOLO LECTURA a Codex en segundo plano con `scripts/codex-revisar.sh <nombre> "<tarea>"` (usa run_in_background), ' +
  'sigue con otra cosa y lee solo el resumen final del informe. Verifica cada hallazgo antes de aplicarlo. ' +
  'No lo hagas para commits triviales, y nunca pidas a Codex que edite o ejecute pruebas.'

process.stdout.write(
  JSON.stringify({ hookSpecificOutput: { hookEventName: 'PostToolUse', additionalContext: mensaje } })
)
