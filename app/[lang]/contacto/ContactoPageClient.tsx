'use client'
import { useState } from 'react'
import Link from 'next/link'
import type { Locale } from '@/lib/i18n'
import type { ContactPageContent, SiteSettingsContent } from '@/lib/cms-schemas'
import { PALETTE } from '@/lib/palette'
import { waLink } from '@/lib/utils'
import Icon from '@/components/ui/Icon'
import BrandLogo from '@/components/ui/BrandLogo'

const REASON_STYLES = {
  primary: { border: 'border-primary', text: 'text-primary-700' },
  secondary: { border: 'border-secondary', text: 'text-secondary' },
  accent: { border: 'border-accent', text: 'text-accent' },
  neutral: { border: 'border-gray-400', text: 'text-gray-500' },
} as const

interface ContactoPageClientProps {
  lang: Locale
  content: ContactPageContent
  settings: SiteSettingsContent
}

export default function ContactoPageClient({ lang, content, settings }: ContactoPageClientProps) {
  const es = lang === 'es'
  const { contact, social } = settings
  const whatsappUrl = waLink(contact.whatsapp_number)
  const [selectedReason, setSelectedReason] = useState<number | null>(null)
  const [formSent, setFormSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [honeypot, setHoneypot] = useState('')
  const [startTime] = useState(() => Date.now())

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setError(es ? 'Nombre, correo y mensaje son obligatorios.' : 'Name, email, and message are required.')
      return
    }
    setSending(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          program: selectedReason !== null ? content.reasons[selectedReason].label : undefined,
          honeypot,
          startTime,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error)
      setFormSent(true)
    } catch (err: any) {
      setError(err.message || (es ? 'Hubo un error. Intenta de nuevo o contáctanos por WhatsApp.' : 'Something went wrong. Please try again or contact us via WhatsApp.'))
    } finally {
      setSending(false)
    }
  }

  const contactInfo = [
    { brand: 'whatsapp', iconName: undefined as string | undefined, title: 'WhatsApp', primary: `+591 ${contact.phone_display}`, secondary: es ? 'Respuesta en menos de 2 horas' : 'Reply in less than 2 hours', href: whatsappUrl, action: es ? 'Escribir ahora' : 'Write now', hex: '#128c3e', bg: 'bg-green-50' },
    { brand: undefined as string | undefined, iconName: 'mail', title: es ? 'Correo electrónico' : 'Email', primary: contact.email, secondary: es ? 'Respuesta en 24 horas' : 'Reply in 24 hours', href: `mailto:${contact.email}`, action: es ? 'Enviar correo' : 'Send email', hex: PALETTE.secondary.hex, bg: PALETTE.secondary.bg },
    { brand: undefined as string | undefined, iconName: 'phone', title: es ? 'Teléfono' : 'Phone', primary: `+591 ${contact.phone_display}`, secondary: es ? 'Lunes a viernes, 8:00 – 18:00' : 'Monday to Friday, 8:00 – 18:00', href: `tel:${contact.phone_display}`, action: es ? 'Llamar' : 'Call', hex: PALETTE.secondary.hex, bg: PALETTE.secondary.bg },
  ]

  const socialLinks = [
    { name: 'Facebook', handle: 'Centro Lapiz en Mano', hex: PALETTE.secondary.hex, url: social.facebook },
    { name: 'Instagram', handle: '@Centro_Lapiz_en_Mano', hex: PALETTE.accent.hex, url: social.instagram },
    { name: 'TikTok', handle: '@lapiz.en.mano65', hex: '#111827', url: social.tiktok_lapiz },
  ]

  return (
    <div className="overflow-x-hidden w-full bg-gray-50">

      {/* 1. Page Hero */}
      <section className="relative bg-accent overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-1/4 -left-16 w-64 h-64 bg-white/10 rounded-full" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" fill="none" className="block w-full h-8 md:h-16 lg:h-20 text-gray-50 fill-current">
            <path d="M0 0 Q360 60 720 30 Q1080 0 1440 0 L1440 60 L0 60 Z" />
          </svg>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-20">
          <nav className="flex items-center gap-2 text-white/60 text-xs mb-8">
            <Link href={`/${lang}`} className="hover:text-white transition-colors">{es ? 'Inicio' : 'Home'}</Link>
            <span>/</span>
            <span className="text-white font-semibold">{es ? 'Contacto' : 'Contact'}</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-1.5 mb-5">
            <span className="text-xs font-bold uppercase tracking-wider text-white select-none">{content.hero.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-extrabold leading-tight mb-4">
            {content.hero.title_line1} <br className="hidden sm:inline" />
            <span className="font-extrabold text-primary">{content.hero.title_line2}</span>
          </h1>

          <p className="text-sm md:text-base lg:text-lg text-white/80 max-w-2xl leading-relaxed">{content.hero.subtitle}</p>
        </div>
      </section>

      {/* 2. Quick Contact Cards Grid */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.map((c, i) => (
              <a
                key={i}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-300 group text-left"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4 select-none">
                    <div className={`w-14 h-14 rounded-2xl ${c.bg} flex items-center justify-center flex-shrink-0 shadow-sm`} style={{ color: c.hex }}>
                      {c.brand ? <BrandLogo name={c.brand} className="h-7 w-7" /> : <Icon name={c.iconName} className="h-7 w-7" />}
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">{c.title}</div>
                      <div className="text-sm sm:text-base font-bold text-gray-900 mt-0.5 break-all">{c.primary}</div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 font-semibold mb-6">{c.secondary}</p>
                </div>
                <div className="flex items-center justify-center gap-2 p-3 rounded-xl border font-bold text-xs sm:text-sm select-none transition-colors" style={{ color: c.hex, backgroundColor: `${c.hex}10`, borderColor: `${c.hex}20` }}>
                  <span>{c.action}</span>
                  <span>→</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Form and Info columns */}
      <section className="py-12 md:py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

            {/* Formulario de Mensaje */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-10 border border-gray-200 shadow-sm text-left flex flex-col justify-between">
              {!formSent ? (
                <>
                  <div>
                    <h3 className="text-2xl text-gray-900 font-bold mb-1.5">{content.form_section.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-400 mb-8 leading-relaxed">{content.form_section.subtitle}</p>

                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 block select-none">
                          {es ? '¿Motivo de tu consulta?' : 'Reason for your inquiry?'}
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {content.reasons.map((r, i) => {
                            const isSelected = selectedReason === i
                            const style = REASON_STYLES[r.color]
                            return (
                              <button
                                key={i}
                                type="button"
                                onClick={() => setSelectedReason(isSelected ? null : i)}
                                className={`px-4 py-2 rounded-full border-2 text-xs font-bold transition-all focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center gap-1.5 ${
                                  isSelected ? `${style.border} bg-gray-50 ${style.text}` : 'border-gray-200 bg-white text-gray-600'
                                }`}
                              >
                                <Icon emoji={r.icon} className="h-4 w-4" />
                                <span>{r.label}</span>
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {[
                        { label: es ? 'Nombre completo' : 'Full name', placeholder: es ? 'Tu nombre completo' : 'Your full name', type: 'text', key: 'name' as const },
                        { label: es ? 'Correo electrónico' : 'Email address', placeholder: 'ejemplo@correo.com', type: 'email', key: 'email' as const },
                        { label: es ? 'Teléfono / WhatsApp' : 'Phone / WhatsApp', placeholder: '+591 ...', type: 'tel', key: 'phone' as const },
                      ].map((f) => (
                        <div key={f.key}>
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 block select-none">{f.label}</label>
                          <input
                            type={f.type}
                            placeholder={f.placeholder}
                            required={f.key !== 'phone'}
                            value={form[f.key]}
                            onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-secondary bg-gray-50 focus:outline-none text-xs sm:text-sm"
                          />
                        </div>
                      ))}

                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 block select-none">
                          {es ? 'Mensaje o consulta' : 'Message or inquiry'}
                        </label>
                        <textarea
                          rows={4}
                          placeholder={es ? 'Escribe aquí tu consulta en detalle...' : 'Write here your inquiry in detail...'}
                          required
                          value={form.message}
                          onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-secondary bg-gray-50 focus:outline-none text-xs sm:text-sm resize-y"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Honeypot anti-spam: invisible para humanos, los bots lo rellenan */}
                  <input
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    className="absolute opacity-0 pointer-events-none -z-10 w-0 h-0"
                    aria-hidden="true"
                  />

                  {error && <p className="mt-3 text-xs text-red-500 font-semibold">{error}</p>}

                  <button
                    onClick={handleSubmit}
                    disabled={sending}
                    className="w-full mt-8 bg-gradient-to-r from-secondary to-secondary text-white font-extrabold text-xs sm:text-sm py-3.5 px-6 rounded-full transition-all hover:scale-[1.01] active:scale-[0.99] shadow-md shadow-secondary/10 min-h-[44px] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {sending ? (es ? 'Enviando...' : 'Sending...') : es ? 'Enviar mensaje' : 'Send message'}
                  </button>
                </>
              ) : (
                <div className="text-center py-16 px-4 flex flex-col items-center justify-center h-full">
                  <Icon name="check-circle" className="mx-auto mb-4 h-12 w-12 text-green-600" />
                  <h3 className="text-xl sm:text-2xl text-gray-900 font-bold mb-3">{es ? '¡Mensaje recibido!' : 'Message received!'}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-6 max-w-sm">
                    {es
                      ? 'Muchas gracias por escribirnos. Nuestro equipo se pondrá en contacto contigo en las próximas 24 horas hábiles por el medio que indicaste.'
                      : 'Thank you very much for writing to us. Our team will contact you within the next 24 business hours through the medium you specified.'}
                  </p>
                  <div className="mt-4 p-4 bg-green-50 border border-green-500/20 rounded-2xl flex flex-col items-center gap-2 max-w-xs select-none">
                    <span className="text-xs font-bold text-gray-500">{es ? '¿Deseas respuesta inmediata?' : 'Need immediate answer?'}</span>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 hover:bg-green-500/90 text-white font-extrabold text-xs px-5 py-2.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[44px] flex items-center justify-center gap-1.5"
                    >
                      <BrandLogo name="whatsapp" className="h-4 w-4" />
                      {es ? 'WhatsApp directo' : 'Direct WhatsApp'}
                    </a>
                  </div>
                  <button onClick={() => setFormSent(false)} className="text-xs font-bold text-secondary hover:underline mt-8">
                    {es ? '← Enviar otro mensaje' : '← Send another message'}
                  </button>
                </div>
              )}
            </div>

            {/* Columna Derecha: Mapa + Horarios + Redes */}
            <div className="lg:col-span-5 flex flex-col gap-6 text-left">
              <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between min-h-[220px]">
                <div className="flex items-center gap-3.5 mb-4 select-none">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shadow-inner text-accent">
                    <Icon name="pin" className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 leading-none">{content.map_card.title}</h4>
                    <p className="text-[10px] text-gray-400 font-semibold mt-1">{content.map_card.subtitle}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-5">{contact.address}</p>
                <a
                  href="https://maps.google.com/?q=La+Paz+Bolivia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl border border-gray-200 hover:border-primary bg-white hover:bg-gray-50 text-xs font-bold text-center text-gray-600 hover:text-primary transition-all select-none min-h-[44px] flex items-center justify-center gap-1.5"
                >
                  {es ? 'Abrir en Google Maps' : 'Open in Google Maps'}
                  <span>→</span>
                </a>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-sm">
                <div className="flex items-center gap-3.5 mb-4 select-none">
                  <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shadow-inner text-primary-700">
                    <Icon name="clock" className="h-5 w-5" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900">{content.hours_title}</h4>
                </div>
                <div className="divide-y divide-gray-100 flex flex-col gap-0.5">
                  {content.hours.map((h, i) => (
                    <div key={i} className="flex justify-between items-center py-2.5 text-xs">
                      <span className={`font-semibold ${h.active ? 'text-gray-700' : 'text-gray-400'}`}>{h.day}</span>
                      <span className={`font-bold px-2.5 py-0.5 rounded-full ${h.active ? 'bg-secondary/10 text-secondary' : 'bg-gray-100 text-gray-400'}`}>{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-sm">
                <div className="flex items-center gap-3.5 mb-4 select-none">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center shadow-inner text-secondary">
                    <Icon name="globe" className="h-5 w-5" />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900">{content.social_title}</h4>
                </div>
                <div className="grid grid-cols-3 gap-2.5 select-none">
                  {socialLinks.map((s, idx) => (
                    <a
                      key={idx}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-50 border border-transparent hover:border-gray-200 rounded-xl text-center transition-all flex flex-col items-center justify-center gap-1.5 min-h-[80px]"
                    >
                      <BrandLogo name={s.name} className="h-6 w-6" />
                      <span className="text-[10px] font-extrabold text-gray-700">{s.name}</span>
                      <span className="text-[8px] text-gray-400 font-semibold truncate max-w-[72px]">{s.handle}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Quick FAQs List */}
      <section className="py-16 md:py-24 px-4 bg-gray-50 border-t border-b border-gray-200/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-700" />
              <span className="text-xs font-bold uppercase tracking-wider text-primary-700">{content.faq_section.badge}</span>
            </div>
            <h2 className="text-3xl md:text-4xl text-gray-900 font-extrabold tracking-tight mb-4">{content.faq_section.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto text-left">
            {content.faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm flex items-start gap-4 hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm text-white select-none" style={{ backgroundColor: PALETTE[faq.color].hex }}>
                  <Icon emoji={faq.icon} className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-base md:text-lg text-gray-900 font-bold mb-2">{faq.q}</h4>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 select-none">
            <Link href={`/${lang}/familias`} className="text-xs sm:text-sm font-bold text-secondary hover:underline">
              {es ? 'Ver todas las preguntas frecuentes de familias →' : 'See all family FAQs →'}
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Direct WhatsApp Cta */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-green-500 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-xl shadow-green-500/10">
            <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
              <div className="absolute top-1/2 right-[10%] w-44 h-44 rounded-full border border-white/5" />
              <div className="absolute top-1/2 right-[20%] w-32 h-32 rounded-full border border-white/5" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8">
              <div className="max-w-md">
                <h3 className="text-2xl md:text-3xl text-white font-bold mb-3 leading-snug">{content.whatsapp_cta.title}</h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">{content.whatsapp_cta.text}</p>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/15 hover:bg-white/25 border border-white/20 backdrop-blur-md px-8 py-5 rounded-2xl text-white transition-all hover:scale-[1.02] active:scale-[0.98] flex flex-col items-center justify-center min-h-[44px] select-none"
              >
                <BrandLogo name="whatsapp" className="mb-1.5 h-7 w-7" />
                <span className="text-xl font-bold leading-none">70106276</span>
                <span className="text-[10px] text-white/70 font-semibold mt-1">{es ? 'Presiona para chatear' : 'Tap to chat'}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Footer philosophy card */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-2xl text-center relative">
          <Icon name="heart" className="mx-auto mb-4 h-8 w-8 text-primary-700" />
          <p className="font-display text-lg sm:text-xl font-semibold italic text-gray-900 leading-relaxed mb-6">&ldquo;{content.closing_quote.text}&rdquo;</p>
          <div className="w-12 h-0.5 bg-primary/30 mx-auto mb-4" />
          <span className="text-xs text-gray-600 font-semibold uppercase tracking-widest block">{content.closing_quote.attribution}</span>
        </div>
      </section>

    </div>
  )
}
