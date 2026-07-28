'use client'
import { useState } from 'react'
import Link from 'next/link'
import { CONTACT } from '@/lib/contact'
import type { Locale } from '@/lib/i18n'

interface PageProps {
  params: {
    lang: Locale
  }
}

export default function Page({ params: { lang } }: PageProps) {
  const es = lang === 'es'
  const [selectedReason, setSelectedReason] = useState<number | null>(null)
  const [formSent, setFormSent] = useState(false)

  const reasons = [
    { label: es ? 'Quiero inscribir a mi hijo/a' : 'I want to enroll my child', icon: '🌟', colorClass: 'border-[#2466a8] text-[#2466a8] hover:bg-[#2466a8]/5' },
    { label: es ? 'Solicitar una evaluación' : 'Request an evaluation', icon: '🔍', colorClass: 'border-[#e86840] text-[#e86840] hover:bg-[#e86840]/5' },
    { label: es ? 'Ser voluntario/a' : 'Become a volunteer', icon: '🙌', colorClass: 'border-[#1a8a7d] text-[#1a8a7d] hover:bg-[#1a8a7d]/5' },
    { label: es ? 'Alianza institucional' : 'Institutional alliance', icon: '🤝', colorClass: 'border-[#6c5ce7] text-[#6c5ce7] hover:bg-[#6c5ce7]/5' },
    { label: es ? 'Donación o patrocinio' : 'Donation or sponsorship', icon: '💛', colorClass: 'border-[#e8a838] text-[#e8a838] hover:bg-[#e8a838]/5' },
    { label: es ? 'Prensa o medios' : 'Press or media', icon: '📰', colorClass: 'border-[#2d8a4e] text-[#2d8a4e] hover:bg-[#2d8a4e]/5' },
    { label: es ? 'Otro motivo' : 'Other reason', icon: '💬', colorClass: 'border-gray-500 text-gray-500 hover:bg-gray-500/5' }
  ]

  const contactInfo = [
    { icon: '📱', title: 'WhatsApp', primary: '+591 70106276', secondary: es ? 'Respuesta en menos de 2 horas' : 'Reply in less than 2 hours', href: CONTACT.whatsapp, action: es ? 'Escribir ahora' : 'Write now', color: '#25d366', bg: 'bg-[#e8faf0]' },
    { icon: '✉️', title: es ? 'Correo electrónico' : 'Email', primary: CONTACT.email, secondary: es ? 'Respuesta en 24 horas' : 'Reply in 24 hours', href: `mailto:${CONTACT.email}`, action: es ? 'Enviar correo' : 'Send email', color: '#2466a8', bg: 'bg-[#e8f1fa]' },
    { icon: '📞', title: es ? 'Teléfono' : 'Phone', primary: '+591 70106276', secondary: es ? 'Lunes a viernes, 8:00 – 18:00' : 'Monday to Friday, 8:00 – 18:00', href: `tel:${CONTACT.phone}`, action: es ? 'Llamar' : 'Call', color: '#1a8a7d', bg: 'bg-[#e0f5f0]' }
  ]

  const hours = [
    { day: es ? 'Lunes a viernes' : 'Monday to Friday', time: '8:00 – 12:00 / 14:00 – 18:00', active: true },
    { day: es ? 'Sábados' : 'Saturdays', time: es ? '9:00 – 12:00 (con cita)' : '9:00 – 12:00 (by appt)', active: true },
    { day: es ? 'Domingos y feriados' : 'Sundays & holidays', time: es ? 'Cerrado' : 'Closed', active: false }
  ]

  const socialLinks = [
    { name: 'Facebook', handle: 'Centro Lapiz en Mano', color: '#1877f2', bg: 'bg-[#e8f0fe]', url: 'https://facebook.com/Centro_Lapiz_en_Mano' },
    { name: 'Instagram', handle: '@Centro_Lapiz_en_Mano', color: '#e4405f', bg: 'bg-[#fce8ec]', url: CONTACT.social.instagram },
    { name: 'TikTok', handle: '@lapiz.en.mano65', color: '#111', bg: 'bg-[#f0f0f0]', url: CONTACT.social.tiktok }
  ]

  const faqs = [
    { q: es ? '¿Cómo inscribo a mi hijo?' : 'How do I enroll my child?', a: es ? 'Agenda una evaluación inicial de diagnóstico escribiendo a nuestro WhatsApp. Nuestro equipo multidisciplinario sugerirá el programa terapéutico o escolar adecuado.' : 'Schedule an initial diagnostic evaluation by messaging our WhatsApp. Our team will suggest the appropriate therapeutic or school program.', icon: '🌟', color: '#2466a8' },
    { q: es ? '¿Tiene costo la atención?' : 'Is there a cost for care?', a: es ? 'Cada programa cuenta con cuotas mensuales solidarias. Si la familia no puede cubrirlas, contamos con becas parciales y completas. Ningún niño queda sin atención por motivos económicos.' : 'Each program has supportive monthly fees. If a family cannot cover them, we offer partial and full scholarships. No child is left without care due to economic reasons.', icon: '💰', color: '#e8a838' },
    { q: es ? '¿Se requiere diagnóstico previo?' : 'Is a prior diagnosis required?', a: es ? 'No es necesario. Puedes consultarnos ante cualquier señal de alerta en el desarrollo, comunicación o conducta de tu hijo. Nosotros realizamos la evaluación correspondiente.' : 'It is not necessary. You can consult us for any developmental, communication, or behavioral warning sign in your child. We perform the evaluation.', icon: '📋', color: '#1a8a7d' },
    { q: es ? '¿Atienden fuera de La Paz?' : 'Do you serve outside La Paz?', a: es ? 'La atención terapéutica y escolar presencial es en La Paz. Sin embargo, ofrecemos orientación familiar y capacitaciones virtuales para todo el país.' : 'Physical therapy and school care are in La Paz. However, we offer family guidance and virtual training sessions nationwide.', icon: '🌎', color: '#e86840' }
  ]

  return (
    <div className="overflow-x-hidden w-full bg-[#fafbfd]">
      
      {/* 1. Page Hero */}
      <section className="relative min-h-[400px] flex items-center bg-gradient-to-br from-[#0c2340] via-[#142d4c] to-[#2466a8] py-16 px-4 overflow-hidden">
        {/* Decoraciones */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          <div className="absolute -top-[15%] -right-[8%] w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full border border-white/5 opacity-30" />
          <div className="absolute top-[60%] right-[15%] w-3.5 h-3.5 rounded-full bg-primary/80 animate-ping" />
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 70" fill="none" className="block w-full h-8 md:h-16 lg:h-20 text-[#fafbfd] fill-current">
            <path d="M0 30C360 55 720 15 1080 40C1260 50 1380 42 1440 38V70H0Z" />
          </svg>
        </div>

        <div className="container mx-auto max-w-4xl text-center relative z-20 mt-8">
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full py-1 px-3.5 mb-5 select-none">
            <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] text-black font-extrabold">✦</span>
            <span className="text-white/80 text-xs font-semibold">{es ? 'Canales de comunicación' : 'Communication channels'}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-normal leading-tight mb-4">
            {es ? (
              <>
                Estamos a un mensaje de <br />
                <span className="font-bold italic text-primary">distancia</span>
              </>
            ) : (
              <>
                We are just a message <br />
                <span className="font-bold italic text-primary">away</span>
              </>
            )}
          </h1>

          <p className="text-sm md:text-base lg:text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
            {es 
              ? 'Ya sea que busques inscribir a tu hijo, realizar prácticas profesionales, proponer una alianza o hacernos llegar tus dudas, estamos listos para escucharte.'
              : 'Whether you want to enroll your child, complete professional practice, propose an alliance, or ask questions, we are ready to listen.'}
          </p>
        </div>
      </section>

      {/* 2. Quick Contact Cards Grid */}
      <section className="py-12 px-4 bg-[#fafbfd]">
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
                    <div className={`w-14 h-14 rounded-2xl ${c.bg} flex items-center justify-center text-3xl flex-shrink-0 shadow-sm`}>
                      {c.icon}
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">{c.title}</div>
                      <div className="text-sm sm:text-base font-bold text-[#0c2340] mt-0.5 break-all">{c.primary}</div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 font-semibold mb-6">
                    {c.secondary}
                  </p>
                </div>

                <div 
                  className="flex items-center justify-center gap-2 p-3 rounded-xl border font-bold text-xs sm:text-sm select-none transition-colors"
                  style={{ color: c.color, backgroundColor: `${c.bg.replace('bg-[', '').replace(']', '')}40`, borderColor: `${c.color}20` }}
                >
                  <span>{c.action}</span>
                  <span>→</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Form and Info columns */}
      <section className="py-12 md:py-16 px-4 bg-[#fafbfd]">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Formulario de Mensaje */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-10 border border-gray-200 shadow-sm text-left flex flex-col justify-between">
              {!formSent ? (
                <>
                  <div>
                    <h3 className="font-serif text-2xl text-[#0c2340] font-bold mb-1.5">
                      {es ? 'Envíanos un mensaje' : 'Send us a message'}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 mb-8 leading-relaxed">
                      {es 
                        ? 'Completa los siguientes datos y nuestro equipo te responderá en menos de 24 horas hábiles.' 
                        : 'Complete the following fields and our team will respond within 24 working hours.'}
                    </p>

                    <div className="space-y-4">
                      {/* Selector de Motivo */}
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 block select-none">
                          {es ? '¿Motivo de tu consulta?' : 'Reason for your inquiry?'}
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {reasons.map((r, i) => {
                            const isSelected = selectedReason === i
                            return (
                              <button
                                key={i}
                                type="button"
                                onClick={() => setSelectedReason(isSelected ? null : i)}
                                className={`px-4 py-2 rounded-full border-2 text-xs font-bold transition-all focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center gap-1.5 ${
                                  isSelected 
                                    ? r.colorClass.split(' ')[0] + ' bg-gray-50 ' + r.colorClass.split(' ')[1]
                                    : 'border-gray-200 bg-white text-gray-600'
                                }`}
                              >
                                <span className="text-sm select-none">{r.icon}</span>
                                <span>{r.label}</span>
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Campos comunes */}
                      {[
                        { label: es ? 'Nombre completo' : 'Full name', placeholder: es ? 'Tu nombre completo' : 'Your full name', type: 'text' },
                        { label: es ? 'Correo electrónico' : 'Email address', placeholder: 'ejemplo@correo.com', type: 'email' },
                        { label: es ? 'Teléfono / WhatsApp' : 'Phone / WhatsApp', placeholder: '+591 ...', type: 'tel' }
                      ].map((f) => (
                        <div key={f.label}>
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 block select-none">
                            {f.label}
                          </label>
                          <input
                            type={f.type}
                            placeholder={f.placeholder}
                            required
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2466a8] bg-[#fafbfd] focus:outline-none text-xs sm:text-sm"
                          />
                        </div>
                      ))}

                      {/* Mensaje */}
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 block select-none">
                          {es ? 'Mensaje o consulta' : 'Message or inquiry'}
                        </label>
                        <textarea
                          rows={4}
                          placeholder={es ? 'Escribe aquí tu consulta en detalle...' : 'Write here your inquiry in detail...'}
                          required
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2466a8] bg-[#fafbfd] focus:outline-none text-xs sm:text-sm resize-y"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setFormSent(true)}
                    className="w-full mt-8 bg-gradient-to-r from-[#2466a8] to-[#1a8a7d] text-white font-extrabold text-xs sm:text-sm py-3.5 px-6 rounded-full transition-all hover:scale-[1.01] active:scale-[0.99] shadow-md shadow-[#2466a8]/10 min-h-[44px]"
                  >
                    {es ? 'Enviar mensaje' : 'Send message'}
                  </button>
                </>
              ) : (
                <div className="text-center py-16 px-4 flex flex-col items-center justify-center h-full">
                  <span className="text-5xl block mb-4 select-none">✅</span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#0c2340] font-bold mb-3">
                    {es ? '¡Mensaje recibido!' : 'Message received!'}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-6 max-w-sm">
                    {es 
                      ? 'Muchas gracias por escribirnos. Nuestro equipo se pondrá en contacto contigo en las próximas 24 horas hábiles por el medio que indicaste.'
                      : 'Thank you very much for writing to us. Our team will contact you within the next 24 business hours through the medium you specified.'}
                  </p>
                  
                  <div className="mt-4 p-4 bg-[#e8faf0] border border-[#25d366]/20 rounded-2xl flex flex-col items-center gap-2 max-w-xs select-none">
                    <span className="text-xs font-bold text-gray-500">{es ? '¿Deseas respuesta inmediata?' : 'Need immediate answer?'}</span>
                    <a
                      href={CONTACT.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#25d366] hover:bg-[#25d366]/90 text-white font-extrabold text-xs px-5 py-2.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[44px] flex items-center justify-center gap-1.5"
                    >
                      <span className="text-lg">💬</span>
                      {es ? 'WhatsApp directo' : 'Direct WhatsApp'}
                    </a>
                  </div>

                  <button
                    onClick={() => setFormSent(false)}
                    className="text-xs font-bold text-[#2466a8] hover:underline mt-8"
                  >
                    {es ? '← Enviar otro mensaje' : '← Send another message'}
                  </button>
                </div>
              )}
            </div>

            {/* Columna Derecha: Mapa + Horarios + Redes */}
            <div className="lg:col-span-5 flex flex-col gap-6 text-left">
              
              {/* Mapa de Ubicación */}
              <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between min-h-[220px]">
                <div className="flex items-center gap-3.5 mb-4 select-none">
                  <div className="w-10 h-10 rounded-xl bg-[#fef0e8] flex items-center justify-center text-xl shadow-inner">
                    📍
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0c2340] leading-none">{es ? 'Centro Lápiz en Mano' : 'Lápiz en Mano Center'}</h4>
                    <p className="text-[10px] text-gray-400 font-semibold mt-1">{es ? 'La Paz, Bolivia' : 'La Paz, Bolivia'}</p>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 leading-relaxed mb-5">
                  {CONTACT.address}
                </p>

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

              {/* Horarios de Atención */}
              <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-sm">
                <div className="flex items-center gap-3.5 mb-4 select-none">
                  <div className="w-10 h-10 rounded-xl bg-[#fdf6e3] flex items-center justify-center text-xl shadow-inner">
                    🕐
                  </div>
                  <h4 className="text-sm font-bold text-[#0c2340]">{es ? 'Horarios de atención' : 'Opening Hours'}</h4>
                </div>
                <div className="divide-y divide-gray-100 flex flex-col gap-0.5">
                  {hours.map((h, i) => (
                    <div key={i} className="flex justify-between items-center py-2.5 text-xs">
                      <span className={`font-semibold ${h.active ? 'text-gray-700' : 'text-gray-400'}`}>{h.day}</span>
                      <span className={`font-bold px-2.5 py-0.5 rounded-full ${h.active ? 'bg-[#e5f5eb] text-[#2d8a4e]' : 'bg-gray-100 text-gray-400'}`}>
                        {h.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enlaces de Redes */}
              <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-sm">
                <div className="flex items-center gap-3.5 mb-4 select-none">
                  <div className="w-10 h-10 rounded-xl bg-[#e8f1fa] flex items-center justify-center text-xl shadow-inner">
                    🌐
                  </div>
                  <h4 className="text-sm font-bold text-[#0c2340]">{es ? 'Presencia digital' : 'Digital Presence'}</h4>
                </div>
                <div className="grid grid-cols-3 gap-2.5 select-none">
                  {socialLinks.map((s, idx) => (
                    <a
                      key={idx}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-50 border border-transparent hover:border-gray-200 rounded-xl text-center transition-all flex flex-col items-center justify-center min-h-[72px]"
                    >
                      <span className="text-[10px] font-extrabold" style={{ color: s.color }}>{s.name}</span>
                      <span className="text-[8px] text-gray-400 font-semibold mt-1 truncate max-w-[64px]">{s.handle}</span>
                    </a>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. Quick FAQs List */}
      <section className="py-16 md:py-24 px-4 bg-[#f7f5f0] border-t border-b border-gray-200/50">
        <div className="container mx-auto max-w-6xl">
          
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#fdf6e3] border border-[#e8a838]/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">⚡</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#e8a838]">
                {es ? 'Preguntas y respuestas' : 'Questions and answers'}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0c2340] font-normal tracking-tight mb-4">
              {es ? 'Preguntas frecuentes rápidas' : 'Quick Frequently Asked Questions'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto text-left">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm flex items-start gap-4 hover:shadow-md transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-sm text-white select-none"
                  style={{ backgroundColor: faq.color }}
                >
                  {faq.icon}
                </div>
                <div>
                  <h4 className="font-serif text-base md:text-lg text-[#0c2340] font-bold mb-2">
                    {faq.q}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 select-none">
            <Link
              href={`/${lang}/familias`}
              className="text-xs sm:text-sm font-bold text-[#2466a8] hover:underline"
            >
              {es ? 'Ver todas las preguntas frecuentes de familias →' : 'See all family FAQs →'}
            </Link>
          </div>

        </div>
      </section>

      {/* 5. Direct WhatsApp Cta */}
      <section className="py-16 px-4 bg-[#fafbfd]">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-[#128c52] to-[#25d366] rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-xl shadow-[#25d366]/10">
            <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
              <div className="absolute top-1/2 right-[10%] w-44 h-44 rounded-full border border-white/5" />
              <div className="absolute top-1/2 right-[20%] w-32 h-32 rounded-full border border-white/5" />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8">
              <div className="max-w-md">
                <h3 className="font-serif text-2xl md:text-3xl text-white font-bold mb-3 leading-snug">
                  {es ? '¿Prefieres una respuesta inmediata?' : 'Do you prefer an immediate response?'}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  {es 
                    ? 'Escríbenos directamente por WhatsApp y recibirás atención personalizada en menos de 2 horas hábiles. Sin esperas.'
                    : 'Write to us directly on WhatsApp and you will receive personalized attention in less than 2 business hours. No waiting.'}
                </p>
              </div>

              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/15 hover:bg-white/25 border border-white/20 backdrop-blur-md px-8 py-5 rounded-2xl text-white transition-all hover:scale-[1.02] active:scale-[0.98] flex flex-col items-center justify-center min-h-[44px] select-none"
              >
                <span className="text-3xl mb-1 block">💬</span>
                <span className="font-serif text-xl font-bold leading-none">70106276</span>
                <span className="text-[10px] text-white/70 font-semibold mt-1">{es ? 'Presiona para chatear' : 'Tap to chat'}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Footer philosophy card */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#0c2340] via-[#142d4c] to-[#2466a8]">
        <div className="container mx-auto max-w-2xl text-center text-white/75 relative">
          <span className="text-4xl block mb-4 select-none">💛</span>
          <p className="font-serif text-lg sm:text-xl font-bold italic leading-relaxed mb-6">
            &ldquo;{es 
              ? 'Creemos que el síndrome de Down no es una barrera, sino una manera diferente y valiosa de aprender, crecer y desarrollar todo su potencial.' 
              : 'We believe Down syndrome is not a barrier, but a different and valuable way to learn, grow, and develop one\'s full potential.'}&rdquo;
          </p>
          <div className="w-12 h-0.5 bg-primary/30 mx-auto mb-4" />
          <span className="text-xs text-white/40 font-semibold uppercase tracking-widest block">
            {es ? 'Fundación PRO-21 & Centro Lápiz en Mano' : 'PRO-21 Foundation & Lápiz en Mano Center'}
          </span>
        </div>
      </section>

    </div>
  )
}
