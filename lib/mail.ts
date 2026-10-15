import { Resend } from 'resend'
import { getSiteSettings } from '@/lib/cms'

// Envío de correo a la fundación. Regla de la constitución (Art. VI): un servicio sin
// configurar NUNCA simula éxito — el llamador recibe un resultado explícito y responde
// con un error visible al usuario.

export type MailResult = { ok: true } | { ok: false; reason: 'not_configured' | 'send_failed' }

/** Destino de los mensajes: CONTACT_EMAIL si está definido; si no, el correo de site_settings. */
export function getRecipient(): string {
  return process.env.CONTACT_EMAIL?.trim() || getSiteSettings('es').contact.email
}

/** Remitente: CONTACT_FROM (dominio verificado en Resend). Ver docs/entrega/GUIA-DOMINIO.md. */
function getSender(): string {
  return process.env.CONTACT_FROM?.trim() || 'web@fundacionpro21.org'
}

/** Quita saltos de línea para que un nombre no pueda inyectar cabeceras en el asunto. */
export function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim()
}

export async function sendMail(input: { subject: string; text: string; replyTo?: string }): Promise<MailResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey) {
    console.error('[mail] RESEND_API_KEY no configurado: el mensaje NO se envió.')
    return { ok: false, reason: 'not_configured' }
  }

  try {
    const resend = new Resend(apiKey)
    // Resend no lanza si falla el envío (p. ej. dominio no verificado): devuelve { error }.
    const { error } = await resend.emails.send({
      from: getSender(),
      to: getRecipient(),
      subject: singleLine(input.subject),
      text: input.text,
      reply_to: input.replyTo,
    })
    if (error) {
      console.error('[mail] Resend rechazó el envío:', error)
      return { ok: false, reason: 'send_failed' }
    }
    return { ok: true }
  } catch (err) {
    console.error('[mail] Error al enviar:', err)
    return { ok: false, reason: 'send_failed' }
  }
}

/** Respuesta HTTP estándar cuando el correo no pudo enviarse. */
export function mailFailureResponse(reason: 'not_configured' | 'send_failed', lang: 'es' | 'en' = 'es'): Response {
  const message =
    lang === 'en'
      ? 'We could not send your message right now. Please write to us on WhatsApp or try again later.'
      : 'No pudimos enviar tu mensaje en este momento. Por favor escríbenos por WhatsApp o inténtalo más tarde.'
  // `unavailable: true` le indica al formulario que ofrezca WhatsApp como alternativa.
  return Response.json({ error: message, unavailable: true }, { status: reason === 'not_configured' ? 503 : 502 })
}
