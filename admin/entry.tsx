import CMS from 'decap-cms-app'
import ImageControl from './widgets/ImageControl'
import ImagePreview from './widgets/ImagePreview'

// Punto de entrada del panel admin, compilado por scripts/build-admin.mjs hacia
// public/admin/bundle.js. Los previews de marca por colección (ProgramPreview, etc.)
// se registran aquí a medida que se construyen en las fases 2-5.

// Sobrescribe el widget nativo 'image' en TODAS las colecciones a la vez (equipo.photo,
// impact.gallery.image, blog.image) — debe registrarse antes de CMS.init().
CMS.registerWidget('image', ImageControl, ImagePreview)

// Recarga forzada de toda la SPA tras cada publicación exitosa. Medida preventiva: hay
// reportado en uso real un caso donde, tras publicar y sin recargar, una acción opuesta
// inmediata (ej. quitar una imagen que se acababa de agregar) no queda reflejada como
// "cambios pendientes" — la causa exacta no está confirmada al 100% en este punto, así
// que en vez de perseguir cada variante posible se elimina la clase entera de bug: cada
// publicación deja el panel en un estado 100% fresco desde el servidor. `postPublish` se
// dispara siempre con el backend `local_fs` (editorial_workflow se degrada a `simple`,
// así que `useWorkflow` es `false` y el evento se invoca en cada `persistEntry`,
// confirmado leyendo decap-cms-core/dist/esm/backend.js). Pequeño delay antes de
// recargar para que el toast nativo "Entrada guardada" alcance a verse.
CMS.registerEventListener?.({
  name: 'postPublish',
  handler: () => {
    setTimeout(() => window.location.reload(), 800)
  },
})

CMS.init()
