import { test, expect } from '@playwright/test'

// RF-003 / RF-004 — contrato de las rutas de formularios, contra el servidor real
// (Art. IX: sin mocks). El servidor de Playwright arranca SIN RESEND_API_KEY, así que
// los casos "sin servicio de correo" son el escenario por defecto; si alguien corre la
// suite con la clave real en el entorno, esos casos se omiten para no enviar correos.
const HAS_MAIL_KEY = Boolean(process.env.RESEND_API_KEY)

const validContact = {
  name: 'Prueba QA',
  email: 'qa@example.com',
  phone: '70000000',
  message: 'Mensaje de prueba automatizada.',
  reason: 'Consulta General',
}

const validVolunteer = {
  name: 'Voluntaria QA',
  email: 'qa@example.com',
  phone: '70000000',
  profession: 'Psicóloga',
  availability: '2-4 hrs',
  area: 'Salud y terapia',
  motivation: 'Quiero ayudar.',
}

test.describe('POST /api/contact', () => {
  test('sin servicio de correo responde 503 con mensaje y NUNCA confirma éxito', async ({ request }) => {
    test.skip(HAS_MAIL_KEY, 'hay RESEND_API_KEY real en el entorno')
    const res = await request.post('/api/contact', { data: validContact })
    expect(res.status()).toBe(503)
    const body = await res.json()
    expect(typeof body.error).toBe('string')
    expect(body.error.length).toBeGreaterThan(5)
    expect(body.ok).toBeUndefined()
    expect(body.simulated).toBeUndefined()
    // El formulario usa esta bandera para ofrecer WhatsApp como alternativa.
    expect(body.unavailable).toBe(true)
  })

  test('el mensaje de error respeta el idioma del formulario (en)', async ({ request }) => {
    const res = await request.post('/api/contact', {
      data: { ...validContact, email: 'esto-no-es-un-correo', lang: 'en' },
    })
    expect(res.status()).toBe(400)
    expect((await res.json()).error).toMatch(/valid email/i)
  })

  test('correo inválido → 400', async ({ request }) => {
    const res = await request.post('/api/contact', { data: { ...validContact, email: 'esto-no-es-un-correo' } })
    expect(res.status()).toBe(400)
  })

  test('nombre vacío → 400', async ({ request }) => {
    const res = await request.post('/api/contact', { data: { ...validContact, name: '' } })
    expect(res.status()).toBe(400)
  })

  test('mensaje demasiado corto → 400', async ({ request }) => {
    const res = await request.post('/api/contact', { data: { ...validContact, message: 'hi' } })
    expect(res.status()).toBe(400)
  })

  test('honeypot lleno (bot) → 400', async ({ request }) => {
    const res = await request.post('/api/contact', { data: { ...validContact, honeypot: 'soy un bot' } })
    expect(res.status()).toBe(400)
  })

  test('envío ultrarrápido (< 1,5 s) → 400', async ({ request }) => {
    const res = await request.post('/api/contact', { data: { ...validContact, startTime: Date.now() } })
    expect(res.status()).toBe(400)
  })
})

test.describe('POST /api/volunteer', () => {
  test('sin servicio de correo responde 503 con mensaje y NUNCA confirma éxito', async ({ request }) => {
    test.skip(HAS_MAIL_KEY, 'hay RESEND_API_KEY real en el entorno')
    const res = await request.post('/api/volunteer', { data: validVolunteer })
    expect(res.status()).toBe(503)
    const body = await res.json()
    expect(typeof body.error).toBe('string')
    expect(body.ok).toBeUndefined()
    expect(body.simulated).toBeUndefined()
  })

  test('falta la profesión → 400', async ({ request }) => {
    const res = await request.post('/api/volunteer', { data: { ...validVolunteer, profession: '' } })
    expect(res.status()).toBe(400)
  })

  test('correo inválido → 400', async ({ request }) => {
    const res = await request.post('/api/volunteer', { data: { ...validVolunteer, email: 'esto-no-es-un-correo' } })
    expect(res.status()).toBe(400)
  })

  test('nombre demasiado corto → 400', async ({ request }) => {
    const res = await request.post('/api/volunteer', { data: { ...validVolunteer, name: 'A' } })
    expect(res.status()).toBe(400)
  })

  test('honeypot lleno (bot) → 400', async ({ request }) => {
    const res = await request.post('/api/volunteer', { data: { ...validVolunteer, honeypot: 'soy un bot' } })
    expect(res.status()).toBe(400)
  })
})
