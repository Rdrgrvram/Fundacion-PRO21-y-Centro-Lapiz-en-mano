import { spawn } from 'child_process'

// Levanta el sitio (next dev) y el proxy local de Decap (decap-server) juntos.
//
// Por qué hace falta esto: sin decap-server corriendo, /admin cae al backend
// "github" real del CMS — que intenta redirigir el login a fundacionpro21.org
// (el dominio de producción, que no resuelve en desarrollo local) en vez de usar
// local_backend: true de public/admin/config.yml. Ver README.md → "CMS local".

const isWin = process.platform === 'win32'
const COLOR = { next: '36', decap: '35' } // cian / magenta

function run(label, command) {
  const child = spawn(command, { shell: true, stdio: ['ignore', 'pipe', 'pipe'] })
  const prefix = `\x1b[${COLOR[label]}m[${label}]\x1b[0m `

  const pipe = (stream, out) => {
    stream.on('data', (chunk) => {
      for (const line of chunk.toString().split('\n')) {
        if (line.trim() !== '') out.write(prefix + line + '\n')
      }
    })
  }
  pipe(child.stdout, process.stdout)
  pipe(child.stderr, process.stderr)

  child.on('exit', (code) => {
    if (!shuttingDown) {
      console.log(`${prefix}el proceso terminó solo (código ${code}) — apagando todo`)
      shutdown()
    }
  })

  return child
}

// En Windows, child.kill() con shell:true solo mata la shell, no npm/node debajo —
// taskkill /t mata el árbol completo del proceso.
function killTree(child) {
  if (isWin) {
    spawn('taskkill', ['/pid', String(child.pid), '/t', '/f'])
  } else {
    child.kill('SIGTERM')
  }
}

const children = []
let shuttingDown = false

function shutdown() {
  if (shuttingDown) return
  shuttingDown = true
  for (const child of children) killTree(child)
  setTimeout(() => process.exit(), 300)
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)

children.push(run('next', 'npm run dev'))
children.push(run('decap', 'npx decap-server'))

console.log('\nSitio:     http://localhost:3000')
console.log('Panel CMS: http://localhost:3000/admin\n')
console.log('Ctrl+C apaga ambos procesos.\n')
