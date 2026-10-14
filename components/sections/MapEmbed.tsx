'use client'

import { useState } from 'react'
import Icon from '@/components/ui/Icon'

interface MapEmbedProps {
  address: string
  es: boolean
}

// Mapa de Google Maps dentro de la página. Carga SOLO al pulsar "Ver mapa": así no pesa en el rendimiento de
// Contacto ni envía datos a Google sin que la persona lo pida. No necesita clave ni costo (issue #71).
export default function MapEmbed({ address, es }: MapEmbedProps) {
  const [loaded, setLoaded] = useState(false)
  const src = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`

  if (loaded) {
    return (
      <iframe
        title={es ? `Mapa de ubicación: ${address}` : `Location map: ${address}`}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="mb-5 h-56 w-full rounded-2xl border border-gray-200"
      />
    )
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className="mb-5 flex min-h-[44px] w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center text-xs font-bold text-gray-700 transition-colors hover:border-primary hover:bg-white active:scale-[0.99]"
    >
      <Icon name="pin" className="h-6 w-6 text-accent" />
      <span>{es ? 'Ver mapa' : 'Show map'}</span>
      <span className="text-xs font-semibold text-gray-500">
        {es ? 'Se carga desde Google Maps al pulsar' : 'Loads from Google Maps when you tap'}
      </span>
    </button>
  )
}
