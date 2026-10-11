import { validateContactForm, formLang } from '@/lib/forms'
import { sendMail, mailFailureResponse, singleLine } from '@/lib/mail'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const lang = formLang(body)
    const parsed = validateContactForm(body)
    if (!parsed.ok) {
      return Response.json({ error: parsed.error }, { status: 400 })
    }
    const { name, email, phone, message, reason } = parsed.data

    const result = await sendMail({
      subject: `[Web] Mensaje de ${singleLine(name)} — ${singleLine(reason)}`,
      replyTo: email,
      text: `Nuevo mensaje recibido desde el sitio web de la Fundación:\n\nNombre: ${name}\nEmail: ${email}\nTeléfono / WhatsApp: ${phone || 'No proporcionado'}\nMotivo de consulta: ${reason}\n\nMensaje:\n${message}`,
    })
    if (!result.ok) return mailFailureResponse(result.reason, lang)

    return Response.json({ ok: true })
  } catch (error) {
    console.error('Error en /api/contact:', error)
    return Response.json({ error: 'Error interno del servidor al enviar el mensaje.' }, { status: 500 })
  }
}
