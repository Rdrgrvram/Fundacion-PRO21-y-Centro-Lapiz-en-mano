import { Component, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { List as ImmutableList, type Map as ImmutableMap } from 'immutable'
import type { CmsWidgetControlProps } from 'decap-cms-app'

// Cuando el campo ya tenía un valor, Decap abre la Media Library con ese valor en el
// payload (`value: [actual]`) y, tras confirmar la selección, `mediaPaths` termina
// guardando una Lista [valor_viejo, valor_nuevo] para este controlID en vez de un
// string suelto — confirmado en vivo (el string plano solo aparece cuando el campo
// arrancaba vacío). El último elemento es siempre la selección real del usuario.
function resolveMediaPath(raw: unknown): string | undefined {
  if (typeof raw === 'string') return raw || undefined
  if (ImmutableList.isList(raw)) return (raw as ImmutableList<string>).last() as string | undefined
  if (Array.isArray(raw)) return raw[raw.length - 1]
  return undefined
}

// Vista previa instantánea (sin esperar a publicar): cuando se sube/elige un archivo,
// Decap ya crea una blob: URL en memoria (`URL.createObjectURL`, ver
// decap-cms-core/.../valueObjects/AssetProxy.js) y la registra en
// `entryDraft.entry.mediaFiles` — pero indexada por la ruta de ALMACENAMIENTO
// (`media_folder`, ej. "public/images/uploads/foo.png"), mientras que el valor real
// del campo (y lo que le pasamos a `getAsset`) es la ruta PÚBLICA (`public_folder`, ej.
// "/images/uploads/foo.png") — dos strings distintos para el mismo archivo. Por eso
// `getAsset` nunca encuentra esta entrada y cae directo a pedirle la URL al servidor
// (que 404 hasta publicar). Se hace el match por nombre de archivo en vez de ruta
// completa — confirmado leyendo actions/mediaLibrary.js (`createMediaFileFromAsset`).
function findDraftPreviewUrl(entry: ImmutableMap<string, unknown> | undefined, value: string): string | undefined {
  if (!entry) return undefined
  const mediaFiles = entry.get('mediaFiles') as ImmutableList<ImmutableMap<string, unknown>> | undefined
  if (!mediaFiles) return undefined
  const fileName = value.split('/').pop()
  const match = mediaFiles.find((f) => f?.get('name') === fileName)
  return match?.get('url') as string | undefined
}

// Reemplaza el control nativo del widget `image` de Decap (registrado globalmente en
// entry.tsx para TODAS las colecciones, no solo una). El nativo (ver
// node_modules/decap-cms-widget-file/src/withFileControl.js, que decap-cms-widget-image
// reutiliza con forImage:true) solo ofrece links de texto plano ("Elige una imagen
// diferente" / "Quita la imagen"). Este control replica el mismo mecanismo de
// selección/publicación de Decap (controlID + mediaPaths, ver componentDidUpdate) pero
// con una UI de thumbnail clicable + basurero, según lo acordado con el usuario.
//
// Por qué es una CLASE y no un componente de función: el wrapper interno de Decap
// (decap-cms-core/.../Widget.js) solo vuelve a renderizar el control cuando cambia
// `value`/`classNameWrapper`/`hasActiveStyle` — A MENOS que el control exponga su propio
// método de instancia `shouldComponentUpdate` (lo busca vía `ref`, que solo existe en
// clases; en un componente de función el ref llega `null` y Decap ignora el método).
// Sin esto, cuando el usuario elige una imagen en la Media Library, Decap escribe el
// path en `mediaPaths` pero el control nunca se entera — la selección no se aplica.
// Confirmado leyendo Widget.js y withFileControl.js (el control nativo sí es clase por
// esto mismo) tras reproducir el bug en vivo con Playwright.
//
// Fuera de alcance a propósito: no toca la sección "Media" del panel, no borra el
// archivo físico del repo (onClearMediaControl solo limpia la referencia del campo).

export default class ImageControl extends Component<CmsWidgetControlProps> {
  controlID = crypto.randomUUID()
  // Valor que tenía el campo al abrir la entrada — si el valor actual difiere, la
  // imagen se eligió recién en esta sesión de edición y todavía no se escribió a
  // disco (backend local_fs: eso solo pasa al publicar). Se usa para no mostrarle al
  // usuario un "No se pudo cargar" alarmante por algo que es esperado y temporal.
  initialValue = this.props.value as string | undefined

  // Este método existe únicamente para que Widget.js (decap-cms-core) detecte que el
  // control SABE manejar sus propias actualizaciones y le delegue la decisión — sin él,
  // Widget usa su propio chequeo por defecto (solo value/classNameWrapper/hasActiveStyle)
  // y jamás nos entera de que mediaPaths cambió (ver comentario grande arriba). No hay
  // ninguna razón de performance real para negar una actualización acá — es un solo
  // control de imagen en un panel de administración de baja frecuencia, no una lista de
  // miles de filas — así que, a propósito, SIEMPRE devuelve true. Se intentó antes una
  // versión con chequeos condicionales (value/mediaPaths/confirmingDelete) para evitar
  // renders de más, pero cualquier caso no contemplado ahí dejaba el control "congelado"
  // hasta refrescar la página (reportado en uso real: agregar/quitar imagen a veces no
  // actualizaba el indicador de "cambios pendientes"). Devolver siempre true elimina esa
  // categoría entera de bugs de una vez.
  shouldComponentUpdate() {
    return true
  }

  componentDidUpdate() {
    const mediaPath = resolveMediaPath((this.props.mediaPaths as ImmutableMap<string, unknown>).get(this.controlID))
    const value = this.props.value as string | undefined

    if (mediaPath && mediaPath !== value) {
      this.props.onChange(mediaPath)
    } else if (mediaPath && mediaPath === value) {
      this.props.onRemoveInsertedMedia?.(this.controlID)
    }
  }

  componentWillUnmount() {
    this.props.onRemoveMediaControl?.(this.controlID)
  }

  openLibrary = () => {
    // Defensa extra: la copia deshabilitada (ver render()) ya no renderiza ningún
    // handler que llegue a esto, pero se deja el chequeo acá también por si algo más
    // termina invocándolo.
    if (this.props.isDisabled) return
    const field = this.props.field as ImmutableMap<string, unknown>
    const value = (this.props.value as string | undefined) ?? ''
    const mediaLibraryOptions = field.get('media_library') as ImmutableMap<string, unknown> | undefined
    this.props.onOpenMediaLibrary?.({
      controlID: this.controlID,
      forImage: true,
      privateUpload: field.get('private'),
      value: value ? [value] : [],
      allowMultiple: false,
      config: mediaLibraryOptions?.get('config'),
      field,
    })
  }

  handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      this.openLibrary()
    }
  }

  // Un solo clic borra directamente (sin doble confirmación): así lo pidió el usuario
  // originalmente ("un boton de basurero para borrar"). Una confirmación de dos pasos
  // agregada después por precaución resultó ser justamente la causa de un bug real
  // reportado en uso: el primer clic solo "armaba" la confirmación sin llamar a
  // onChange, así que un usuario que hace un solo clic (el gesto normal para un ícono
  // de basurero) nunca disparaba el cambio — Decap nunca se enteraba y "Publicar"
  // seguía gris como si nada hubiera pasado, en todos los navegadores, sin ningún error
  // en consola, porque técnicamente nada había cambiado. El borrado ya está protegido
  // por el propio flujo de publicación de Decap (no se pierde nada hasta hacer clic en
  // "Publicar"), así que no hace falta un segundo paso de confirmación acá.
  handleDeleteClick = () => {
    if (this.props.isDisabled) return
    this.props.onClearMediaControl?.(this.controlID)
    this.props.onChange('')
  }

  render() {
    const value = (this.props.value as string | undefined) ?? ''
    const field = this.props.field as ImmutableMap<string, unknown>
    const fieldLabel = (field.get('label') as string | undefined) ?? (field.get('name') as string | undefined) ?? 'imagen'

    // Causa raíz de un bug real reportado en uso: en una colección i18n:true, un campo
    // no traducible (como `photo`, sin i18n:true/duplicate) igual se monta DOS VECES —
    // una instancia interactiva (columna ES) y una "espejo" deshabilitada (columna EN,
    // visualmente oculta pero presente en el DOM). Decap le manda `isDisabled: true` a
    // esa segunda instancia (confirmado leyendo EditorControlPane.js), pero antes este
    // control ignoraba esa prop — un clic real que cayera sobre la copia deshabilitada
    // (foco por teclado, superposición de layout, etc.) le "robaba" el controlID activo
    // de la Media Library, y la instancia visible nunca se enteraba de la selección
    // (Publicar quedaba gris como si nada hubiera cambiado). Ahora la copia
    // deshabilitada se renderiza totalmente inerte: sin `role`, sin `tabIndex`, sin
    // handlers de click/teclado, y con `pointer-events: none` como capa extra de
    // defensa — nunca puede volver a disparar `onOpenMediaLibrary`/`onChange`.
    if (this.props.isDisabled) {
      return (
        <div className={this.props.classNameWrapper} style={{ pointerEvents: 'none', opacity: 0.5 }} aria-hidden="true">
          {!value ? (
            <div style={dropzoneStyle}>
              <span style={{ fontSize: 28, lineHeight: 1 }}>🖼️</span>
              <span style={{ fontSize: 13, color: '#6b7280' }}>Subir imagen</span>
            </div>
          ) : (
            <div style={frameStyle}>
              <ImageThumbnail
                value={value}
                field={field}
                getAsset={this.props.getAsset}
                draftPreviewUrl={findDraftPreviewUrl(this.props.entry, value)}
                onReplace={() => {}}
                onReplaceKeyDown={() => {}}
                fieldLabel={fieldLabel}
                isPendingPublish={false}
              />
            </div>
          )}
        </div>
      )
    }

    return (
      <div className={this.props.classNameWrapper}>
        {!value ? (
          <div
            id={this.props.forID}
            role="button"
            tabIndex={0}
            onClick={this.openLibrary}
            onKeyDown={this.handleKeyDown}
            aria-label={`Elegir ${fieldLabel}`}
            style={dropzoneStyle}
          >
            <span style={{ fontSize: 28, lineHeight: 1 }}>🖼️</span>
            <span style={{ fontSize: 13, color: '#6b7280' }}>Subir imagen</span>
          </div>
        ) : (
          <div style={frameStyle}>
            <ImageThumbnail
              id={this.props.forID}
              value={value}
              field={field}
              getAsset={this.props.getAsset}
              draftPreviewUrl={findDraftPreviewUrl(this.props.entry, value)}
              onReplace={this.openLibrary}
              onReplaceKeyDown={this.handleKeyDown}
              fieldLabel={fieldLabel}
              isPendingPublish={value !== this.initialValue}
            />

            <button
              type="button"
              onClick={this.handleDeleteClick}
              aria-label="Quitar imagen"
              style={trashButtonStyle}
            >
              🗑
            </button>
          </div>
        )}
      </div>
    )
  }
}

// Sub-componente de función: solo presentación (asset/loading/broken), sin contrato con
// Decap — puede usar hooks sin problema, React lo vuelve a renderizar normalmente como
// hijo cada vez que ImageControl (la clase) se actualiza.
function ImageThumbnail({
  id,
  value,
  field,
  getAsset,
  draftPreviewUrl,
  onReplace,
  onReplaceKeyDown,
  fieldLabel,
  isPendingPublish,
}: {
  id?: string
  value: string
  field: ImmutableMap<string, unknown>
  getAsset?: (value: string, field: ImmutableMap<string, unknown>) => unknown
  draftPreviewUrl?: string
  onReplace: () => void
  onReplaceKeyDown: (e: KeyboardEvent) => void
  fieldLabel: string
  isPendingPublish: boolean
}) {
  const [asset, setAsset] = useState<unknown>(null)
  const [loading, setLoading] = useState(true)
  const [broken, setBroken] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  // ImageControl (la clase padre) ahora vuelve a renderizar en CADA actualización, sin
  // condiciones (ver shouldComponentUpdate) — eso significa que `field`/`getAsset`
  // pueden llegar como una referencia de objeto nueva en cada render aunque el dato no
  // cambió de verdad. Si el efecto de abajo dependiera solo de esas referencias,
  // resetearía `loading` a true en cada render y nunca llegaría a asentarse (el <img>
  // carga bien pero el overlay "Reemplazar" queda escondido para siempre porque
  // `loading` nunca queda en false el tiempo suficiente) — confirmado en vivo: el <img>
  // con el blob: correcto SÍ estaba en el DOM, pero loading nunca se estabilizaba.
  // Por eso se compara el ASSET YA RESUELTO (no las referencias de entrada) antes de
  // decidir si hace falta resetear el estado de carga.
  const resolvedAssetRef = useRef<unknown>(null)

  useEffect(() => {
    const nextAsset = draftPreviewUrl ?? getAsset?.(value, field)
    if (nextAsset === resolvedAssetRef.current) return
    resolvedAssetRef.current = nextAsset
    setBroken(false)
    setLoading(true)
    setRetryCount(0)
    // La blob: URL en memoria (si existe) se muestra al toque, sin pedirle nada al
    // servidor — evita por completo la espera/el 404 pre-publicación.
    setAsset(nextAsset)
  }, [value, field, getAsset, draftPreviewUrl])

  // El backend local_fs (decap-server) recién escribe el archivo subido en disco al
  // PUBLICAR la entrada, no al confirmar la selección en la Media Library — hasta ese
  // momento la imagen da 404 aunque el campo ya apunte a la ruta correcta. No es una
  // condición de carrera que se resuelva en un par de segundos: puede pasar el tiempo
  // que el usuario tarde en decidirse a publicar. Por eso, mientras `isPendingPublish`
  // sea true, se reintenta con paciencia (cada 3s, hasta 20 veces ≈ 1 min) en vez de
  // rendirse rápido — y el mensaje mientras tanto es tranquilizador, no de error, para
  // no hacerle pensar al usuario que algo salió mal cuando en realidad es esperado.
  const RETRY_DELAY_MS = 3000
  const MAX_RETRIES_PENDING = 20
  const MAX_RETRIES_STALE = 3

  function handleImageError() {
    const maxRetries = isPendingPublish ? MAX_RETRIES_PENDING : MAX_RETRIES_STALE
    if (retryCount < maxRetries) {
      setTimeout(() => setRetryCount((n) => n + 1), isPendingPublish ? RETRY_DELAY_MS : 800 * (retryCount + 1))
    } else {
      setLoading(false)
      setBroken(true)
    }
  }

  // El <img> real se mantiene siempre montado (aunque quede tapado por un overlay) —
  // si se desmonta al fallar, deja de disparar onError y el reintento se corta ahí.
  const showPending = !broken && loading && isPendingPublish && retryCount > 0

  return (
    <>
      <img
        key={retryCount}
        id={id}
        src={asset as string}
        alt=""
        onLoad={() => setLoading(false)}
        onError={handleImageError}
        style={{ ...imgStyle, visibility: broken || showPending ? 'hidden' : 'visible' }}
      />

      {broken && (
        <div style={brokenStyle}>
          <span style={{ fontSize: 22 }}>⚠️</span>
          <span style={{ fontSize: 12 }}>No se pudo cargar</span>
        </div>
      )}

      {showPending && (
        <div style={brokenStyle}>
          <span style={{ fontSize: 22 }}>🕓</span>
          <span style={{ fontSize: 12, textAlign: 'center', padding: '0 8px' }}>
            Se verá acá al publicar
          </span>
        </div>
      )}

      {loading && !isPendingPublish && <div style={spinnerOverlayStyle}>Cargando…</div>}

      {!broken && !loading && (
        <div
          role="button"
          tabIndex={0}
          onClick={onReplace}
          onKeyDown={onReplaceKeyDown}
          aria-label={`Reemplazar ${fieldLabel}`}
          style={replaceOverlayStyle}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
        >
          Reemplazar
        </div>
      )}
    </>
  )
}

const dropzoneStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6,
  width: 220,
  height: 150,
  border: '2px dashed #d1d5db',
  borderRadius: 8,
  cursor: 'pointer',
  background: '#f9fafb',
}

const frameStyle: CSSProperties = {
  position: 'relative',
  width: 220,
  height: 150,
  borderRadius: 8,
  overflow: 'hidden',
  border: '1px solid #e5e7eb',
  background:
    'repeating-conic-gradient(#f3f4f6 0% 25%, #ffffff 0% 50%) 50% / 16px 16px',
}

const imgStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  display: 'block',
}

const brokenStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 4,
  color: '#9ca3af',
}

const spinnerOverlayStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(255,255,255,0.75)',
  fontSize: 13,
  color: '#374151',
}

const replaceOverlayStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(17,24,39,0.55)',
  color: '#fff',
  fontWeight: 600,
  fontSize: 13,
  cursor: 'pointer',
  opacity: 0,
  transition: 'opacity 120ms ease',
}

const trashButtonStyle: CSSProperties = {
  position: 'absolute',
  top: 6,
  right: 6,
  border: 'none',
  borderRadius: 6,
  padding: '4px 8px',
  fontSize: 13,
  cursor: 'pointer',
  background: 'rgba(17,24,39,0.65)',
  color: '#fff',
}
