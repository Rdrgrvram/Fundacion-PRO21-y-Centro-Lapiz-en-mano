import { validateVolunteerForm, formLang } from '@/lib/forms'
import { sendMail, mailFailureResponse, singleLine } from '@/lib/mail'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const lang = formLang(body)
    const parsed = validateVolunteerForm(body)
    if (!parsed.ok) {
      return Response.json({ error: parsed.error }, { status: 400 })
    }
    const { name, email, phone, profession, availability, area, motivation } = parsed.data

    const result = await sendMail({
      subject: `[Voluntariado] Nueva postulación: ${singleLine(name)}`,
      replyTo: email,
      text: [
        `Nueva postulación de voluntariado recibida desde el sitio web:\n`,
        `Nombre completo: ${name}`,
        `Correo electrónico: ${email}`,
        `Teléfono / WhatsApp: ${phone || 'No proporcionado'}`,
        `Profesión / Carrera: ${profession}`,
        `Disponibilidad horaria: ${availability}`,
        `Área de interés: ${area || 'General / No especificada'}`,
        motivation ? `\nMotivación / Mensaje:\n${motivation}` : '',
      ]
        .filter(Boolean)
        .join('\n'),
    })
    if (!result.ok) return mailFailureResponse(result.reason, lang)

    return Response.json({ ok: true })
  } catch (error) {
    console.error('Error en /api/volunteer:', error)
    return Response.json({ error: 'Error interno al enviar la postulación.' }, { status: 500 })
  }
}
