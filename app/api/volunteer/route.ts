import { Resend } from 'resend'

export async function POST(req: Request) {
  try {
    const { name, email, phone, profession, availability, area, motivation } = await req.json()

    if (!name || !email || !profession || !availability) {
      return Response.json({ error: 'Faltan campos requeridos en la postulación' }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    const destinationEmail = 'fundacionpro211@gmail.com'

    if (!apiKey) {
      console.warn('RESEND_API_KEY no configurado. Simulando envío de correo de voluntariado.')
      return Response.json({ ok: true, simulated: true })
    }

    const resend = new Resend(apiKey)
    await resend.emails.send({
      from: 'web@fundacionpro21.org',
      to: destinationEmail,
      subject: `[Voluntariado] Nueva postulación: ${name}`,
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

    return Response.json({ ok: true })
  } catch (error) {
    console.error('Error al procesar la postulación de voluntariado:', error)
    return Response.json({ error: 'Error interno al enviar la postulación' }, { status: 500 })
  }
}
