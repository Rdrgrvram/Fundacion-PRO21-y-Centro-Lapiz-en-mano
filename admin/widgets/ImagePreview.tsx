import { useEffect, useState } from 'react'
import type { CmsWidgetPreviewProps } from 'decap-cms-app'

// Preview del panel lateral para el widget `image` — mismo comportamiento que el
// nativo (node_modules/decap-cms-widget-image/src/ImagePreview.js): nada si el campo
// está vacío, la imagen resuelta si tiene valor. registerWidget('image', ...) reemplaza
// control Y preview juntos, sin merge — si no registráramos este componente, el panel
// de preview quedaría vacío para los 3 campos de imagen existentes.
export default function ImagePreview(props: CmsWidgetPreviewProps) {
  const value = props.value as string | undefined
  const [asset, setAsset] = useState<unknown>(null)

  useEffect(() => {
    if (!value) {
      setAsset(null)
      return
    }
    setAsset(props.getAsset?.(value, props.field))
  }, [value, props.field, props.getAsset])

  if (!value || !asset) return null

  return <img src={asset as string} alt="" style={{ display: 'block', maxWidth: '100%', height: 'auto' }} />
}
