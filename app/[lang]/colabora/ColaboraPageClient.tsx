'use client'
import { useState } from 'react'
import Image from 'next/image'
import type { Locale } from '@/lib/i18n'
import type { CollaborateContent } from '@/lib/cms-schemas'
import { PALETTE } from '@/lib/palette'
import ProtagonistPhoto from '@/components/sections/ProtagonistPhoto'
import Icon from '@/components/ui/Icon'

interface ColaboraPageClientProps {
  lang: Locale
  content: CollaborateContent
}

export default function ColaboraPageClient({ lang, content }: ColaboraPageClientProps) {
  const es = lang === 'es'
  const [selectedTier, setSelectedTier] = useState(1)
  const [customAmount, setCustomAmount] = useState('')
  const [selectedVolArea, setSelectedVolArea] = useState<number | null>(null)
  const [openAlliance, setOpenAlliance] = useState<number | null>(null)
  const [formSent, setFormSent] = useState(false)

  // Formulario de voluntariado (US-17)
  const [volName, setVolName] = useState('')
  const [volEmail, setVolEmail] = useState('')
  const [volPhone, setVolPhone] = useState('')
  const [volProfession, setVolProfession] = useState('')
  const [volAvailability, setVolAvailability] = useState('2-4 hrs')
  const [volMotivation, setVolMotivation] = useState('')
  const [volSubmitting, setVolSubmitting] = useState(false)
  const [volError, setVolError] = useState<string | null>(null)
  const [volValidationErrors, setVolValidationErrors] = useState<Record<string, string>>({})

  const handleVolunteerSubmit = async () => {
    setVolError(null)
    const errors: Record<string, string> = {}

    if (!volName.trim()) {
      errors.name = es ? 'El nombre completo es obligatorio' : 'Full name is required'
    }
    if (!volEmail.trim()) {
      errors.email = es ? 'El correo electrónico es obligatorio' : 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(volEmail.trim())) {
      errors.email = es ? 'Ingresa un correo electrónico válido' : 'Enter a valid email address'
    }
    if (!volProfession.trim()) {
      errors.profession = es ? 'La profesión o carrera es obligatoria' : 'Profession or career is required'
    }

    if (Object.keys(errors).length > 0) {
      setVolValidationErrors(errors)
      return
    }

    setVolValidationErrors({})
    setVolSubmitting(true)

    try {
      const selectedAreaTitle = selectedVolArea !== null ? content.volunteer_areas[selectedVolArea]?.title : ''
      const res = await fetch('/api/volunteer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: volName,
          email: volEmail,
          phone: volPhone,
          profession: volProfession,
          availability: volAvailability,
          area: selectedAreaTitle,
          motivation: volMotivation,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || (es ? 'Error al enviar el formulario' : 'Error submitting form'))
      }

      setFormSent(true)
      setVolName('')
      setVolEmail('')
      setVolPhone('')
      setVolProfession('')
      setVolMotivation('')
    } catch (err: any) {
      setVolError(err.message || (es ? 'Ocurrió un error al enviar tu solicitud.' : 'An error occurred while sending.'))
    } finally {
      setVolSubmitting(false)
    }
  }

  return (
    <div className="overflow-x-hidden w-full bg-gray-50">

      {/* 1. Hero Section */}
      <section className="relative bg-secondary overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-1/4 -left-16 w-64 h-64 bg-white/10 rounded-full" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" fill="none" className="block w-full h-8 md:h-16 lg:h-20 text-gray-50 fill-current">
            <path d="M0 0 Q360 60 720 30 Q1080 0 1440 0 L1440 60 L0 60 Z" />
          </svg>
        </div>

        <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
            <div>
              <div className="inline-flex items-center gap-2.5 bg-white/8 backdrop-blur-md border border-white/10 rounded-full py-1.5 pl-2.5 pr-4 mb-6 shadow-md select-none">
                <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-gray-900 shadow-sm select-none">
                  <Icon name="heart" className="h-3.5 w-3.5" />
                </span>
                <span className="text-white/90 text-xs font-semibold">{content.hero.badge}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-extrabold leading-tight mb-4 tracking-tight">
                {content.hero.title_line1} <br />
                <span className="font-extrabold">{content.hero.title_line2}</span>
              </h1>

              <p className="text-sm md:text-base text-white/70 leading-relaxed mb-8 max-w-lg">{content.hero.subtitle}</p>

              <div className="flex flex-wrap gap-4 items-center">
                <a href="#donaciones" className="bg-primary hover:bg-primary/95 text-black font-extrabold text-sm px-8 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-primary/10 min-h-[44px] flex items-center justify-center">
                  {es ? 'Donar ahora' : 'Donate now'}
                </a>
                <a href="#voluntariado" className="border-2 border-white/20 hover:border-white/50 bg-transparent hover:bg-white/5 text-white font-bold text-sm px-8 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[44px] flex items-center justify-center">
                  {es ? 'Ser voluntario' : 'Volunteer'}
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {content.hero_highlights.map((s, i) => (
                <div key={i} className="bg-white/5 border border-white/8 backdrop-blur-md rounded-2xl p-5 text-center hover:bg-white/10 transition-all select-none">
                  <Icon emoji={s.icon} className="mx-auto mb-1.5 h-5 w-5 text-white/80" />
                  <div className="text-2xl text-white font-extrabold leading-none">{s.value}</div>
                  <div className="text-[10px] sm:text-xs text-white/60 font-semibold mt-2 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Donations Section */}
      <section id="donaciones" className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-700" />
              <span className="text-xs font-bold uppercase tracking-wider text-primary-700">{content.donation_section.badge}</span>
            </div>
            <h2 className="text-3xl md:text-4xl text-gray-900 font-extrabold tracking-tight mb-4">{content.donation_section.title}</h2>
            {content.donation_section.subtitle && <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">{content.donation_section.subtitle}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto text-left mb-10">
            {content.donation_tiers.map((tier, i) => {
              const isSelected = selectedTier === i
              const hex = PALETTE[tier.color].hex
              return (
                <div
                  key={i}
                  onClick={() => setSelectedTier(i)}
                  className={`bg-white rounded-3xl overflow-hidden border cursor-pointer relative shadow-sm hover:shadow-md transition-all duration-300 ${isSelected ? 'border-primary scale-[1.01]' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  {tier.featured && (
                    <div className="absolute top-3 right-3 bg-primary text-black font-extrabold text-[8px] uppercase tracking-wider px-2 py-0.5 rounded-full select-none shadow-sm">
                      {es ? 'Popular' : 'Popular'}
                    </div>
                  )}
                  <div className="h-1 w-full" style={{ backgroundColor: hex }} />
                  <div className="p-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${isSelected ? 'bg-primary text-gray-900' : `${PALETTE[tier.color].bg} text-gray-700`}`}>
                      <Icon emoji={tier.icon} className="h-6 w-6" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 leading-none mb-1">{tier.amount}</div>
                    {tier.usd && <span className="text-[10px] text-gray-400 font-semibold block mb-3">{tier.usd} USD</span>}
                    <div className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">{tier.label}</div>
                    <p className="text-xs text-gray-400 leading-relaxed mb-4 min-h-[48px]">{tier.impact}</p>
                    <div className="space-y-1 pt-3 border-t border-gray-100 flex flex-col gap-0.5">
                      {tier.items.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-[10px] font-semibold text-gray-600">
                          <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: hex }} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-gray-200 p-6 md:p-10 shadow-sm text-left">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
              <div className="flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-3 select-none">
                    {es ? 'Monto personalizado (Bs)' : 'Custom amount (Bs)'}
                  </div>
                  <div className="relative mb-5 max-w-xs">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-primary font-bold select-none">Bs</span>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 focus:border-primary rounded-xl text-lg focus:outline-none bg-gray-50"
                    />
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed max-w-sm">{content.payment_note}</p>
                </div>

                <div className="mt-8 select-none">
                  <a
                    href="https://wa.me/59170106276"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary hover:bg-primary/95 text-black font-extrabold text-sm sm:text-base px-8 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-primary/10 min-h-[44px] inline-flex items-center gap-2"
                  >
                    <Icon name="heart" className="h-4 w-4" />
                    {es ? 'Confirmar donación por WhatsApp' : 'Confirm donation via WhatsApp'}
                  </a>
                  <p className="text-[10px] text-gray-400 mt-2">
                    {es ? 'Coordinamos la confirmación del depósito de forma segura.' : 'We coordinate deposit confirmation securely.'}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase select-none">
                  {es ? 'Medios de depósito autorizados' : 'Authorized deposit methods'}
                </div>
                {content.payment_methods.map((m, idx) => {
                  const isBank = idx === 0
                  const lines = isBank
                    ? [content.donation_bank.bank, `${es ? 'Cta' : 'Acct'}: ${content.donation_bank.account}`, content.donation_bank.holder]
                    : m.lines
                  return (
                    <div key={idx} className="bg-gray-50 border border-gray-200/80 rounded-2xl p-4 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm flex-shrink-0 select-none">
                        <Icon emoji={m.icon} className="h-5 w-5 text-secondary-700" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-gray-900 mb-0.5">{m.title}</h4>
                        {lines.map((line, lidx) => (
                          <div key={lidx} className="text-[11px] text-gray-500 font-semibold leading-relaxed">{line}</div>
                        ))}
                        {isBank && content.donation_bank.note && (
                          <div className="text-[10px] text-gray-400 italic mt-1">{content.donation_bank.note}</div>
                        )}
                        {m.qrImage && (
                          <div className="mt-3 border border-gray-200 rounded-2xl p-3 bg-white max-w-[180px] shadow-sm">
                            <Image
                              src={m.qrImage}
                              alt={es ? 'Código QR para donación' : 'Donation QR code'}
                              width={160}
                              height={160}
                              className="w-full h-auto object-contain rounded-lg"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Volunteer Section */}
      <section id="voluntariado" className="py-16 md:py-24 px-4 bg-gray-50 border-t border-b border-gray-200/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">{content.volunteer_section.badge}</span>
            </div>
            <h2 className="text-3xl md:text-4xl text-gray-900 font-extrabold tracking-tight mb-4">{content.volunteer_section.title}</h2>
            {content.volunteer_section.subtitle && <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">{content.volunteer_section.subtitle}</p>}
          </div>

          <div className="mb-10 text-center select-none">
            <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-4">
              {es ? '¿En qué área te gustaría colaborar?' : 'In which area would you like to help?'}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-5xl mx-auto">
              {content.volunteer_areas.map((a, i) => {
                const isSelected = selectedVolArea === i
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedVolArea(isSelected ? null : i)}
                    className={`p-4 rounded-2xl border-2 flex flex-col items-center text-center transition-all duration-300 focus:outline-none min-h-[110px] justify-center ${
                      isSelected ? 'border-secondary bg-secondary/10 text-gray-900 shadow-sm' : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <Icon emoji={a.icon} className={`mb-2 h-6 w-6 ${isSelected ? 'text-secondary-700' : 'text-gray-400'}`} />
                    <span className="text-[10px] font-bold leading-tight">{a.title}</span>
                  </button>
                )
              })}
            </div>
            {selectedVolArea !== null && (
              <div className="mt-4 p-4 rounded-xl bg-white border border-gray-200 max-w-xl mx-auto text-xs font-semibold text-gray-600 animate-fade-slide-up text-left">
                <Icon name="bulb" className="mr-1.5 inline h-4 w-4 align-[-2px] text-secondary" /><strong className="text-secondary">{content.volunteer_areas[selectedVolArea].title}:</strong> {content.volunteer_areas[selectedVolArea].desc}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm text-left">
              {!formSent ? (
                <>
                  <h4 className="text-lg md:text-xl text-gray-900 font-bold mb-6">{es ? 'Inscríbete como voluntario' : 'Register as volunteer'}</h4>
                  <div className="space-y-4">
                    {[
                      { label: es ? 'Nombre completo' : 'Full name', placeholder: es ? 'Ej: María Flores' : 'E.g., Maria Flores', type: 'text', value: volName, set: setVolName, err: 'name' },
                      { label: es ? 'Correo electrónico' : 'Email address', placeholder: 'maria@example.com', type: 'email', value: volEmail, set: setVolEmail, err: 'email' },
                      { label: es ? 'Teléfono / WhatsApp' : 'Phone / WhatsApp', placeholder: '+591 ...', type: 'tel', value: volPhone, set: setVolPhone, err: null },
                      { label: es ? 'Profesión o Carrera' : 'Profession or Career', placeholder: es ? 'Ej: Psicóloga' : 'E.g., Psychologist', type: 'text', value: volProfession, set: setVolProfession, err: 'profession' },
                    ].map((f) => (
                      <div key={f.label}>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 block select-none">{f.label}</label>
                        <input
                          type={f.type}
                          placeholder={f.placeholder}
                          required
                          value={f.value}
                          onChange={(e) => f.set(e.target.value)}
                          className={`w-full px-4 py-2.5 rounded-xl border-2 bg-gray-50 focus:outline-none text-xs sm:text-sm ${
                            f.err && volValidationErrors[f.err] ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-secondary'
                          }`}
                        />
                        {f.err && volValidationErrors[f.err] && (
                          <p className="mt-1 text-[10px] text-red-500 font-semibold">{volValidationErrors[f.err]}</p>
                        )}
                      </div>
                    ))}
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 block select-none">
                        {es ? 'Disponibilidad horaria semanal' : 'Weekly time availability'}
                      </label>
                      <div className="flex gap-2 select-none flex-wrap">
                        {['2-4 hrs', '4-8 hrs', '8+ hrs', es ? 'Flexible' : 'Flexible'].map((h) => (
                          <button
                            key={h}
                            type="button"
                            onClick={() => setVolAvailability(h)}
                            className={`px-3 py-1.5 rounded-full border text-[10px] sm:text-xs font-bold transition-colors ${
                              volAvailability === h ? 'bg-secondary text-white border-secondary' : 'border-gray-300 bg-white hover:bg-gray-50 text-gray-600'
                            }`}
                          >
                            {h}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 block select-none">
                        {es ? 'Motivación o mensaje (opcional)' : 'Motivation or message (optional)'}
                      </label>
                      <textarea
                        rows={3}
                        value={volMotivation}
                        onChange={(e) => setVolMotivation(e.target.value)}
                        placeholder={es ? 'Cuéntanos por qué quieres ser voluntario/a...' : 'Tell us why you want to volunteer...'}
                        className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-secondary bg-gray-50 focus:outline-none text-xs sm:text-sm resize-y"
                      />
                    </div>
                  </div>

                  {volError && <p className="mt-3 text-xs text-red-500 font-semibold">{volError}</p>}

                  <button
                    onClick={handleVolunteerSubmit}
                    disabled={volSubmitting}
                    className="w-full mt-6 bg-secondary hover:scale-[1.01] active:scale-[0.99] text-white font-extrabold text-xs sm:text-sm py-3 px-6 rounded-full transition-all shadow-md shadow-secondary/10 min-h-[44px] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {volSubmitting ? (es ? 'Enviando...' : 'Sending...') : es ? 'Enviar inscripción' : 'Submit registration'}
                  </button>
                </>
              ) : (
                <div className="text-center py-12 px-4">
                  <Icon name="check-circle" className="mx-auto mb-4 h-12 w-12 text-secondary" />
                  <h3 className="text-xl text-gray-900 font-bold mb-3">{es ? '¡Inscripción recibida!' : 'Registration received!'}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-6">
                    {es
                      ? 'Muchas gracias por tu postulación. El equipo de Trabajo Social revisará tu perfil y te contactará en los próximos días por WhatsApp.'
                      : 'Thank you very much for applying. The Social Work team will review your profile and contact you in the coming days via WhatsApp.'}
                  </p>
                  <button onClick={() => setFormSent(false)} className="text-xs font-bold text-secondary hover:underline">
                    {es ? '← Enviar otra solicitud' : '← Submit another request'}
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-6 justify-between text-left">
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm flex-1">
                <h4 className="text-lg text-gray-900 font-bold mb-4">{es ? '¿Qué implica el voluntariado?' : 'What does volunteering involve?'}</h4>
                <div className="space-y-4">
                  {content.volunteer_perks.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3.5 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                      <Icon emoji={item.icon} className="h-5 w-5 flex-shrink-0 text-secondary" />
                      <span className="text-xs sm:text-sm font-semibold text-gray-600">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {content.volunteer_testimonial.image && (
                <ProtagonistPhoto
                  src={content.volunteer_testimonial.image}
                  alt={es ? 'Actividad de voluntariado en el Centro Lápiz en Mano' : 'Volunteering activity at Lápiz en Mano Center'}
                  ratio="square"
                  blobs={['secondary', 'accent']}
                  focus="center 26%"
                />
              )}

              <div className="bg-secondary-50 rounded-3xl p-6 border border-secondary/10 relative overflow-hidden flex flex-col justify-center">
                <span className="absolute top-1 left-2 font-display text-7xl text-secondary/10 pointer-events-none select-none">&ldquo;</span>
                <p className="font-display text-sm text-gray-900 font-semibold italic leading-relaxed mb-4 relative z-10">
                  &laquo;{content.volunteer_testimonial.quote}&raquo;
                </p>
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white text-base select-none">🩺</div>
                  <div>
                    <div className="text-xs font-bold text-gray-900">{es ? 'Voluntaria activa' : 'Active Volunteer'}</div>
                    <div className="text-[10px] text-gray-500 font-semibold">{content.volunteer_testimonial.role}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Alliances Section */}
      <section id="alianzas" className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="text-xs font-bold uppercase tracking-wider text-accent">{content.alliances_section.badge}</span>
            </div>
            <h2 className="text-3xl md:text-4xl text-gray-900 font-extrabold tracking-tight mb-4">{content.alliances_section.title}</h2>
            {content.alliances_section.subtitle && <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">{content.alliances_section.subtitle}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto text-left mb-12">
            {content.partner_types.map((p, idx) => {
              const isOpen = openAlliance === idx
              const hex = PALETTE[p.color].hex
              return (
                <div
                  key={p.title}
                  onClick={() => setOpenAlliance(isOpen ? null : idx)}
                  className={`bg-white rounded-3xl border overflow-hidden shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 ${isOpen ? 'border-accent' : 'border-gray-200'}`}
                >
                  <div className="h-1 w-full" style={{ backgroundColor: hex }} />
                  <div className="p-6 md:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen ? PALETTE[p.color].bg : 'bg-gray-100'}`}>
                        <Icon emoji={p.icon} className="h-7 w-7 text-gray-700" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg text-gray-900 font-bold leading-snug">{p.title}</h4>
                        <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed">{p.desc}</p>
                      </div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${isOpen ? 'bg-accent/10 text-accent rotate-180' : 'bg-gray-50 text-gray-400'}`}>▾</div>
                    </div>

                    <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-[250px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                      <div className="pt-4 border-t border-gray-100">
                        <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-3">{es ? 'Beneficios de la alianza' : 'Benefits of the alliance'}</div>
                        <div className="flex flex-col gap-2">
                          {p.benefits.map((b) => (
                            <div key={b} className={`flex items-center gap-2 p-2 rounded-xl text-xs font-semibold text-gray-700 ${PALETTE[p.color].bg}`}>
                              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: hex }} />
                              <span>{b}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8 max-w-5xl mx-auto shadow-sm text-center select-none">
            <h4 className="text-lg text-gray-900 font-bold mb-2">{content.allies_title}</h4>
            <p className="text-xs text-gray-400 mb-8">{content.allies_subtitle}</p>
            <div className="flex flex-wrap gap-4 justify-center items-center">
              {content.allies.map((ally, i) => {
                const initials = ally.name
                  .split(/\s+/)
                  .slice(0, 2)
                  .map((w) => w.charAt(0))
                  .join('')
                  .toUpperCase()
                return (
                  <div
                    key={i}
                    className="bg-gray-50 border border-gray-200 rounded-2xl py-4 px-5 text-center min-w-[150px] flex-1 sm:flex-none shadow-sm hover:border-primary transition-colors flex flex-col items-center gap-2"
                  >
                    {ally.logo ? (
                      <div className="h-10 flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={ally.logo} alt={ally.name} className="max-h-10 max-w-[120px] w-auto object-contain" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-sm font-extrabold text-gray-700">
                        {initials}
                      </div>
                    )}
                    <div className="text-xs font-bold text-gray-900 leading-tight">{ally.name}</div>
                    <div className="text-[9px] text-gray-400 font-semibold">{ally.type}</div>
                  </div>
                )
              })}
              <div className="border-2 border-dashed border-gray-200 rounded-2xl py-4 px-5 min-w-[140px] flex items-center justify-center flex-col text-gray-400 flex-1 sm:flex-none">
                <span className="text-xl font-bold">+</span>
                <span className="text-[10px] font-bold mt-1">{es ? 'Tu organización' : 'Your organization'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Contact CTA */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">{content.cta.title}</h2>
          <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">{content.cta.text}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/59170106276"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-900 text-white font-bold px-8 py-4 rounded-full hover:bg-gray-800 transition-colors min-h-[52px]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              {es ? 'Escribir al 70106276' : 'Message 70106276'}
            </a>
            <a
              href="mailto:contacto@fundacionpro21.org"
              className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors min-h-[52px]"
            >
              {es ? 'Enviar correo' : 'Send email'}
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
