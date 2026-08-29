import type { ReactNode } from 'react'
import { cx } from '@/lib/utils'

// Set de íconos de línea del sitio — reemplaza el uso de emoji como glifo en
// tarjetas, cifras, timeline, etc. Un solo trazo, `currentColor`, grilla de 24.
//
// El contenido del CMS sigue guardando un emoji en el campo `icon`; acá se
// traduce a un ícono real (mapa EMOJI). Si el emoji no está mapeado se muestra
// tal cual — así la Fundación puede seguir escribiendo cualquier emoji y los
// más comunes se ven como ícono.

const P: Record<string, ReactNode> = {
  clipboard: (
    <>
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <rect x="9" y="2.5" width="6" height="3" rx="1" />
      <path d="M9 11h6M9 15h4" />
    </>
  ),
  graduation: (
    <>
      <path d="M12 4 2 9l10 5 10-5-10-5Z" />
      <path d="M6 11v5c0 1.4 2.7 3 6 3s6-1.6 6-3v-5" />
      <path d="M22 9v6" />
    </>
  ),
  puzzle: (
    <>
      <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1.6" />
      <rect x="13" y="3.5" width="7.5" height="7.5" rx="1.6" />
      <rect x="3.5" y="13" width="7.5" height="7.5" rx="1.6" />
      <rect x="13" y="13" width="7.5" height="7.5" rx="1.6" />
    </>
  ),
  heart: <path d="M12 20s-7-4.4-9.3-8.8C1.3 8.4 3.1 4.5 6.6 4.5c2.3 0 4.1 1.6 5.4 3 1.3-1.4 3.1-3 5.4-3 3.5 0 5.3 3.9 3.9 6.7C19 15.6 12 20 12 20Z" />,
  sparkle: <path d="M12 3l2.2 5.6L20 10l-5.8 1.4L12 17l-2.2-5.6L4 10l5.8-1.4L12 3Z" />,
  book: (
    <>
      <path d="M5 4h11a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2V4Z" />
      <path d="M5 18a2 2 0 0 1 2-2h11" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  activity: <path d="M3 12h4l3 8 4-16 3 8h4" />,
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20c0-3 2.5-5.2 5.5-5.2s5.5 2.2 5.5 5.2" />
      <path d="M16 4.5a3 3 0 0 1 0 6M17 14.9c2 .5 3.5 2.4 3.5 5.1" />
    </>
  ),
  sprout: (
    <>
      <path d="M12 21v-9" />
      <path d="M12 13c-1-4-4-5.5-8-5.5.5 4 3 6.5 8 6.5Z" />
      <path d="M12 12c1-3.5 3.5-5 7-5-.5 3.5-2.5 5.5-7 5Z" />
    </>
  ),
  smile: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 10h.01M15 10h.01" />
      <path d="M8.5 14.5a4.5 4.5 0 0 0 7 0" />
    </>
  ),
  building: (
    <>
      <path d="M3 21h18" />
      <path d="M5 21V8l7-4 7 4v13" />
      <path d="M9.5 21v-4h5v4" />
      <path d="M9 10h.01M15 10h.01M9 13.5h.01M15 13.5h.01" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c3 2.6 3 15.4 0 18M12 3c-3 2.6-3 15.4 0 18" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="16" rx="2" />
      <path d="M4 10h16M8 3v4M16 3v4" />
    </>
  ),
  blocks: (
    <>
      <rect x="3" y="13" width="8" height="8" rx="1.4" />
      <rect x="13" y="13" width="8" height="8" rx="1.4" />
      <rect x="8" y="3" width="8" height="8" rx="1.4" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="m20 20-4.6-4.6" />
    </>
  ),
  tv: (
    <>
      <rect x="3" y="7" width="18" height="12" rx="2" />
      <path d="m8 3 4 4 4-4M9 23h6" />
    </>
  ),
  mobile: (
    <>
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <path d="M11 18h2" />
    </>
  ),
  newspaper: (
    <>
      <path d="M4 5h13v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Z" />
      <path d="M17 9h3v10a1 1 0 0 1-1 1M8 9h5M8 13h5M8 17h3" />
    </>
  ),
  coins: (
    <>
      <circle cx="9" cy="9" r="5" />
      <path d="M14.7 6.3a5 5 0 1 1-5 8.4" />
    </>
  ),
  bulb: (
    <>
      <path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.4 1 2.5h6c0-1.1.3-1.8 1-2.5A6 6 0 0 0 12 3Z" />
      <path d="M9.5 19h5M10.5 22h3" />
    </>
  ),
  scale: (
    <>
      <path d="M12 4v16M7 20h10M5 8h14" />
      <path d="M5 8 2.5 13a2.5 2.5 0 0 0 5 0L5 8M19 8l-2.5 5a2.5 2.5 0 0 0 5 0L19 8" />
    </>
  ),
  chart: <path d="M4 20V4M4 20h16M8 20v-5M13 20v-9M18 20v-4" />,
  palette: (
    <>
      <path d="M12 3a9 9 0 1 0 0 18c1 0 1.7-.8 1.7-1.7 0-.4-.2-.8-.5-1.1-.3-.3-.5-.7-.5-1.1 0-.9.8-1.7 1.7-1.7H16a5 5 0 0 0 5-5c0-4-4-7.4-9-7.4Z" />
      <circle cx="7.5" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="10" cy="7.8" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="8" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 3c2.8 2 4.5 5.6 4.5 9.5L14 15h-4l-2.5-2.5C7.5 8.6 9.2 5 12 3Z" />
      <path d="M10 15c-2 1-3 3-3 5.5 2.2 0 4.2-1 5-3M14 15c2 1 3 3 3 5.5-2.2 0-4.2-1-5-3" />
      <circle cx="12" cy="10" r="1.5" />
    </>
  ),
  chat: <path d="M4 5h16v11H9l-4 4V5Z" />,
  image: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="9" cy="10" r="2" />
      <path d="m4 18 5-4.5 4 3 3-3 4.5 4" />
    </>
  ),
  laptop: (
    <>
      <rect x="4" y="5" width="16" height="11" rx="1.5" />
      <path d="M2 20h20" />
    </>
  ),
  phone: <path d="M6 3h3.5l1.5 4.5-2.2 1.5a12.5 12.5 0 0 0 5.7 5.7l1.5-2.2L21 15.5V19a2 2 0 0 1-2 2A17 17 0 0 1 4 5a2 2 0 0 1 2-2Z" />,
  refresh: (
    <>
      <path d="M20 11a8 8 0 0 0-14-5M4 13a8 8 0 0 0 14 5" />
      <path d="M18 3v4h-4M6 21v-4h4" />
    </>
  ),
  megaphone: (
    <>
      <path d="M4 10v4l11 4V6L4 10Z" />
      <path d="M15 8.5a4 4 0 0 1 0 7M6 14v4.5l3 1V15" />
    </>
  ),
  shield: <path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3Z" />,
  download: <path d="M12 3v12M7 11l5 5 5-5M5 20h14" />,
  check: <path d="M5 13l4 4L19 7" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  'check-circle': (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12.5 2.5 2.5 4.5-5" />
    </>
  ),
}

const EMOJI: Record<string, string> = {
  '📋': 'clipboard',
  '🎓': 'graduation',
  '🧩': 'puzzle', '🧠': 'puzzle', '🔬': 'puzzle',
  '🤝': 'heart', '🤲': 'heart', '🙌': 'heart', '💛': 'heart', '💚': 'heart', '❤️': 'heart', '💌': 'heart',
  '🌟': 'sparkle', '⭐': 'sparkle', '✨': 'sparkle',
  '📚': 'book', '📖': 'book', '📕': 'book',
  '🎯': 'target',
  '🩺': 'activity', '👩‍⚕️': 'activity', '💪': 'activity', '🤸': 'activity', '🏥': 'activity',
  '👨‍👩‍👧': 'users', '👪': 'users', '👨‍👩‍👧‍👦': 'users',
  '🌱': 'sprout', '🥗': 'sprout', '🌿': 'sprout',
  '👶': 'smile', '🙂': 'smile', '😊': 'smile',
  '🏫': 'building', '🏛️': 'building', '🏢': 'building', '🏦': 'building', '🏠': 'building',
  '🌍': 'globe', '🌎': 'globe', '🌐': 'globe',
  '📅': 'calendar', '🗓️': 'calendar',
  '🧸': 'blocks',
  '🔍': 'search', '🔎': 'search',
  '📺': 'tv', '🎬': 'tv', '📹': 'tv',
  '📱': 'mobile',
  '📰': 'newspaper', '🗞️': 'newspaper',
  '💰': 'coins', '💵': 'coins', '💸': 'coins',
  '💡': 'bulb',
  '⚖️': 'scale',
  '📈': 'chart', '📊': 'chart', '📉': 'chart',
  '🎨': 'palette',
  '🧭': 'compass',
  '🔭': 'eye', '👁️': 'eye', '👀': 'eye',
  '🚀': 'rocket',
  '🗣️': 'chat', '💬': 'chat', '🗨️': 'chat',
  '🖼️': 'image',
  '💻': 'laptop', '🖥️': 'laptop',
  '📞': 'phone', '☎️': 'phone',
  '🔄': 'refresh', '♻️': 'refresh',
  '📣': 'megaphone', '📢': 'megaphone',
  '🛡️': 'shield',
}

interface IconProps {
  /** Nombre directo del ícono. */
  name?: string
  /** Emoji del CMS — se traduce a ícono si está mapeado. */
  emoji?: string
  className?: string
}

export function hasIconFor(emoji?: string): boolean {
  return !!emoji && EMOJI[emoji.trim()] != null
}

export default function Icon({ name, emoji, className = 'h-6 w-6' }: IconProps) {
  const key = name ?? (emoji ? EMOJI[emoji.trim()] : undefined)

  if (!key || !P[key]) {
    if (emoji) {
      return (
        <span className={cx('inline-flex items-center justify-center leading-none', className)} aria-hidden>
          {emoji}
        </span>
      )
    }
    return null
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {P[key]}
    </svg>
  )
}
