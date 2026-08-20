import { build } from 'esbuild'
import { existsSync } from 'fs'

// Compila el panel admin (Decap CMS) como parte del build del proyecto, en vez de
// cargarlo desde un CDN externo en tiempo de ejecución. Ver docs/CMS_DEVELOPMENT_PLAN.md §2.
//
// admin/ es un mini-proyecto npm aislado (admin/package.json, admin/node_modules propios):
// decap-cms-app necesita React 19 mientras el sitio (Next 14) usa React 18. Mantenerlos en
// árboles de node_modules separados evita que dos versiones de React terminen en el mismo
// bundle. `npm run build:admin` instala esas dependencias aisladas antes de compilar.
if (!existsSync('admin/node_modules')) {
  console.error('✗ Falta admin/node_modules — corré "npm --prefix admin install" primero (o "npm run build:admin", que ya lo hace).')
  process.exit(1)
}

await build({
  entryPoints: ['admin/entry.tsx'],
  bundle: true,
  outfile: 'public/admin/bundle.js',
  define: { 'process.env.NODE_ENV': '"production"' },
  jsx: 'automatic',
  minify: true,
  target: ['es2018'],
  logLevel: 'info',
})

console.log('✓ Panel admin compilado en public/admin/bundle.js')
