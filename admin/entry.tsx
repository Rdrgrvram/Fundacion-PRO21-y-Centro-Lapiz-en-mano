import CMS from 'decap-cms-app'

// Punto de entrada del panel admin, compilado por scripts/build-admin.mjs hacia
// public/admin/bundle.js. Los previews de marca por colección (ProgramPreview, etc.)
// se registran aquí a medida que se construyen en las fases 2-5.
CMS.init()
