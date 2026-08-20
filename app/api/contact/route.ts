import { Resend } from 'resend'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, message, program, reason, honeypot, startTime } = body

    // 1. Protección Anti-Spam: Campo Honeypot
    if (honeypot && honeypot.trim() !== '') {
      console.warn('[Anti-Spam] Bot detectado mediante campo honeypot.')
      return Response.json({ error: 'Solicitud rechazada por spam.' }, { status: 400 })
    }

    // 2. Protección Anti-Spam: Trampa de tiempo (envío menor a 1.5 segundos)
    if (startTime && typeof startTime === 'number') {
      const elapsed = Date.now() - startTime
      if (elapsed < 1500) {
        console.warn('[Anti-Spam] Bot detectado por envío ultrarrápido (<1.5s).')
        return Response.json({ error: 'Envío demasiado rápido. Por favor intenta de nuevo.' }, { status: 400 })
      }
    }

    // 3. Validación estricta de campos obligatorios
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return Response.json({ error: 'El nombre debe tener al menos 2 caracteres.' }, { status: 400 })
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return Response.json({ error: 'Ingresa un correo electrónico válido (ejemplo: usuario@dominio.com).' }, { status: 400 })
    }

    const digitsOnly = typeof phone === 'string' ? phone.trim().replace(/\D/g, '') : ''
    if (!phone || typeof phone !== 'string' || digitsOnly.length < 6) {
      return Response.json({ error: 'Ingresa un número de teléfono válido (mínimo 6 dígitos).' }, { status: 400 })
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return Response.json({ error: 'El mensaje debe tener al menos 5 caracteres.' }, { status: 400 })
    }

    const selectedReason = reason || program || 'Consulta General'
    const targetEmail = process.env.CONTACT_EMAIL || 'contacto@fundacionpro21.org'

    // 4. Envío de correo o simulación en desarrollo
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.log('--------------------------------------------------')
      console.log('[API Contacto] RESEND_API_KEY no configurada. Mensaje recibido con éxito (Simulado):')
      console.log(`• Nombre: ${name}`)
      console.log(`• Email: ${email}`)
      console.log(`• Teléfono: ${phone}`)
      console.log(`• Motivo: ${selectedReason}`)
      console.log(`• Mensaje:\n${message}`)
      console.log('--------------------------------------------------')
      return Response.json({ ok: true, simulated: true })
    }

    const resend = new Resend(apiKey)
    await resend.emails.send({
      from: 'web@fundacionpro21.org',
      to: targetEmail,
      subject: `[Web Contacto] Mensaje de ${name} — ${selectedReason}`,
      text: `Nuevo mensaje recibido desde el sitio web de la Fundación:

Nombre: ${name}
Email: ${email}
Teléfono / WhatsApp: ${phone}
Motivo de consulta: ${selectedReason}

Mensaje:
${message}
`,
    })

    return Response.json({ ok: true })
  } catch (error) {
    console.error('Error procesando el formulario de contacto:', error)
    return Response.json({ error: 'Error interno del servidor al enviar el mensaje.' }, { status: 500 })
  }
}
