// Validación de los formularios del sitio (contacto y voluntariado). Funciones puras:
// reciben el cuerpo crudo de la petición y devuelven datos limpios o un mensaje de error.
// Las rutas de API solo orquestan (Art. I y II de memory/constitution.md).
// Los mensajes de error van en el idioma del formulario (`lang`; por defecto español).

export type Validation<T> = { ok: true; data: T } | { ok: false; error: string }
export type FormLang = 'es' | 'en'

const MESSAGES = {
  es: {
    spam: 'Solicitud rechazada por spam.',
    tooFast: 'Envío demasiado rápido. Por favor intenta de nuevo.',
    name: 'El nombre debe tener al menos 2 caracteres.',
    email: 'Ingresa un correo electrónico válido (ejemplo: usuario@dominio.com).',
    phone: 'Ingresa un número de teléfono válido (mínimo 6 dígitos).',
    message: 'El mensaje debe tener al menos 5 caracteres.',
    volunteer: 'Faltan campos requeridos en la postulación.',
  },
  en: {
    spam: 'Request rejected as spam.',
    tooFast: 'Submitted too fast. Please try again.',
    name: 'Name must be at least 2 characters long.',
    email: 'Enter a valid email address (example: user@domain.com).',
    phone: 'Enter a valid phone number (at least 6 digits).',
    message: 'The message must be at least 5 characters long.',
    volunteer: 'Required fields are missing in the application.',
  },
} as const

/** Idioma del formulario según el cuerpo de la petición. */
export function formLang(body: Record<string, unknown>): FormLang {
  return body.lang === 'en' ? 'en' : 'es'
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const MIN_FILL_MS = 1500 // un humano tarda más de 1,5 s en llenar el formulario

type Raw = Record<string, unknown>

function str(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

/** Anti-spam común: honeypot invisible y trampa de tiempo. Devuelve el error o null. */
function spamError(body: Raw): string | null {
  const m = MESSAGES[formLang(body)]
  if (str(body.honeypot) !== '') return m.spam
  if (typeof body.startTime === 'number' && Date.now() - body.startTime < MIN_FILL_MS) return m.tooFast
  return null
}

function commonError(body: Raw): string | null {
  const m = MESSAGES[formLang(body)]
  if (str(body.name).length < 2) return m.name
  if (!EMAIL_REGEX.test(str(body.email))) return m.email
  const phone = str(body.phone)
  if (phone !== '' && phone.replace(/\D/g, '').length < 6) return m.phone
  return null
}

export interface ContactForm {
  name: string
  email: string
  phone: string
  message: string
  reason: string
}

export function validateContactForm(body: Raw): Validation<ContactForm> {
  const error = spamError(body) ?? commonError(body)
  if (error) return { ok: false, error }
  if (str(body.message).length < 5) return { ok: false, error: MESSAGES[formLang(body)].message }
  return {
    ok: true,
    data: {
      name: str(body.name),
      email: str(body.email),
      phone: str(body.phone),
      message: str(body.message),
      reason: str(body.reason) || str(body.program) || 'Consulta General',
    },
  }
}

export interface VolunteerForm {
  name: string
  email: string
  phone: string
  profession: string
  availability: string
  area: string
  motivation: string
}

export function validateVolunteerForm(body: Raw): Validation<VolunteerForm> {
  const error = spamError(body) ?? commonError(body)
  if (error) return { ok: false, error }
  if (str(body.profession) === '' || str(body.availability) === '') {
    return { ok: false, error: MESSAGES[formLang(body)].volunteer }
  }
  return {
    ok: true,
    data: {
      name: str(body.name),
      email: str(body.email),
      phone: str(body.phone),
      profession: str(body.profession),
      availability: str(body.availability),
      area: str(body.area),
      motivation: str(body.motivation),
    },
  }
}
