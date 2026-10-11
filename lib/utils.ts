// Utilidades generales del proyecto

/** Formatea una fecha ISO a formato legible en español o inglés */
export function formatDate(dateStr: string, locale = 'es-BO') {
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return dateStr
  return date.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })
}

/** Genera las clases CSS para el tamaño de texto accesible */
export function cx(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

/** URL base del sitio */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fundacionpro21.org'

/** Construye un enlace de WhatsApp a partir del número (con código de país, sin '+') */
export function waLink(whatsappNumber: string, message?: string): string {
  return message ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}` : `https://wa.me/${whatsappNumber}`
}

/**
 * Mensaje de WhatsApp prellenado para confirmar una donación. Un monto personalizado
 * válido (> 0) tiene prioridad sobre la tarjeta elegida. Una tarjeta de monto libre
 * ("Libre"/"Free", sin cifra) sin monto personalizado no menciona ninguna cantidad.
 */
export function donationMessage(
  es: boolean,
  tier: { amount: string; label: string },
  customAmount: string
): string {
  const custom = Number(customAmount)
  const hasCustom = customAmount.trim() !== '' && Number.isFinite(custom) && custom > 0
  const tierHasAmount = /\d/.test(tier.amount)
  const amount = hasCustom ? `Bs ${custom}` : tierHasAmount ? tier.amount : ''
  const level = !hasCustom && tierHasAmount ? ` (${es ? 'nivel' : 'tier'} ${tier.label})` : ''
  if (es) {
    return `Hola, quiero hacer una donación${amount ? ` de ${amount}` : ''}${level} a la Fundación PRO-21. ¿Me indican cómo confirmar el depósito?`
  }
  return `Hello, I would like to make a donation${amount ? ` of ${amount}` : ''}${level} to Fundación PRO-21. Could you tell me how to confirm the deposit?`
}

/**
 * Busca la etiqueta de una ruta en site_settings.nav (fuente real del menú, ya
 * editable desde el CMS) — para reusar en breadcrumbs en vez de hardcodear el
 * nombre de cada página de nuevo. Si la ruta no está en nav (ej. "inicio", que no
 * es parte del menú editable), el llamador debe usar otro fallback.
 */
export function getNavLabel(nav: { route: string; label: string }[], route: string): string | undefined {
  return nav.find((item) => item.route === route)?.label
}
