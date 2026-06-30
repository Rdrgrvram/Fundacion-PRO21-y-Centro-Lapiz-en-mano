import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, email, phone, message, program } = await req.json()

    if (!name || !email || !message) {
      return Response.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }

    await resend.emails.send({
      from: 'web@fundacionpro21.org',
      to: 'contacto@fundacionpro21.org',
      subject: `[Web] Mensaje de ${name}${program ? ` — ${program}` : ''}`,
      text: `Nombre: ${name}\nEmail: ${email}\nTeléfono: ${phone ?? 'No proporcionado'}\nPrograma de interés: ${program ?? 'General'}\n\nMensaje:\n${message}`,
    })

    return Response.json({ ok: true })
  } catch (error) {
    console.error('Error al enviar email:', error)
    return Response.json({ error: 'Error interno al enviar el mensaje' }, { status: 500 })
  }
}
