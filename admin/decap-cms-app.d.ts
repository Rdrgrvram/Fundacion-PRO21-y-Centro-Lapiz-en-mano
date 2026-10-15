declare module 'decap-cms-app' {
  import type { ComponentType } from 'react'
  import type { Map as ImmutableMap } from 'immutable'

  // Copiado a mano leyendo el código fuente real de los widgets nativos
  // (admin/node_modules/decap-cms-widget-file/src/withFileControl.js,
  // decap-cms-core/src/components/Editor/EditorControlPane/Widget.js) — el
  // index.d.ts público de decap-cms-core está incompleto para estas props
  // (varias marcadas `// TODO: type properly` en el propio paquete), así que este
  // ambient module ya no delega en esos tipos, los reemplaza. Ampliar a mano si un
  // futuro widget custom necesita otra prop que no esté listada acá.
  export interface CmsWidgetControlProps<T = unknown> {
    value: T
    field: ImmutableMap<string, unknown>
    onChange: (value: T) => void
    forID: string
    classNameWrapper: string
    mediaPaths: ImmutableMap<string, string>
    entry: ImmutableMap<string, unknown>
    isDisabled?: boolean
    getAsset?: (value: string, field: ImmutableMap<string, unknown>) => unknown
    onOpenMediaLibrary?: (payload: Record<string, unknown>) => void
    onClearMediaControl?: (controlID: string) => void
    onRemoveMediaControl?: (controlID: string) => void
    onRemoveInsertedMedia?: (controlID: string) => void
    t?: (key: string, opts?: Record<string, unknown>) => string
  }

  export interface CmsWidgetPreviewProps<T = unknown> {
    value: T
    field: ImmutableMap<string, unknown>
    metadata: ImmutableMap<string, unknown>
    entry: ImmutableMap<string, unknown>
    getAsset?: (value: string, field: ImmutableMap<string, unknown>) => unknown
  }

  // Nombres reales soportados por decap-cms-core (ver lib/registry.js, `allowedEvents`)
  // — cualquier otro string tira un error en runtime al registrar.
  type CmsEventName = 'prePublish' | 'postPublish' | 'preUnpublish' | 'postUnpublish' | 'preSave' | 'postSave'

  interface DecapCms {
    init: (config?: unknown) => void
    registerPreviewTemplate: (name: string, component: unknown) => void
    registerPreviewStyle: (style: string, options?: { raw?: boolean }) => void
    registerWidget: (
      name: string,
      control?: ComponentType<CmsWidgetControlProps>,
      preview?: ComponentType<CmsWidgetPreviewProps>,
      schema?: Record<string, unknown>
    ) => void
    registerEventListener?: (
      event: { name: CmsEventName; handler: (data: Record<string, unknown>) => void | Promise<void> },
      options?: Record<string, unknown>
    ) => void
  }

  const CMS: DecapCms
  export default CMS
}
