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
  const [selectedTier, setSelectedTier] = useState(1)
  const [customAmount, setCustomAmount] = useState('')
  const [selectedVolArea, setSelectedVolArea] = useState<number | null>(null)
  const [openAlliance, setOpenAlliance] = useState<number | null>(null)
  const [formSent, setFormSent] = useState(false)


  // Volunteer form state
  const [volName, setVolName] = useState('')
  const [volEmail, setVolEmail] = useState('')
  const [volPhone, setVolPhone] = useState('')
  const [volProfession, setVolProfession] = useState('')
  const [volAvailability, setVolAvailability] = useState('2-4 hrs')
  const [volMotivation, setVolMotivation] = useState('')
  const [volSubmitting, setVolSubmitting] = useState(false)
  const [volError, setVolError] = useState<string | null>(null)
  const [volValidationErrors, setVolValidationErrors] = useState<Record<string, string>>({})

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
    if (!volMotivation.trim()) {
      errors.motivation = es ? 'Por favor dinos tu motivación o mensaje' : 'Please tell us your motivation'
    }

    if (Object.keys(errors).length > 0) {
      setVolValidationErrors(errors)
      return
    }

    setVolValidationErrors({})
    setVolSubmitting(true)

    try {
      const selectedAreaTitle = selectedVolArea !== null ? volunteerAreas[selectedVolArea]?.title : ''
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
      console.error(err)
      setVolError(err.message || (es ? 'Ocurrió un error al enviar tu solicitud.' : 'An error occurred while sending.'))
    } finally {
      setVolSubmitting(false)
    }
  }

  const donationTiers = [
    {
      amount: 'Bs 100',
      usd: '≈ $14',
      label: es ? 'Semilla' : 'Seed',
      icon: '🌱',
      color: '#229cc2',
      bg: 'bg-secondary/10',
      impact: es ? 'Cubre materiales terapéuticos para un niño durante un mes.' : 'Covers therapeutic materials for one child for a month.',
      items: es 
        ? ['Materiales de estimulación', 'Fichas psicopedagógicas', 'Insumos terapéuticos']
        : ['Stimulation materials', 'Psychopedagogical sheets', 'Therapeutic supplies']
    },
    {
      amount: 'Bs 300',
      usd: '≈ $43',
      label: es ? 'Acompañante' : 'Companion',
      icon: '💚',
      color: '#229cc2',
      bg: 'bg-secondary/10',
      impact: es ? 'Financia 2 sesiones de terapia especializada.' : 'Finances 2 specialized therapy sessions.',
      items: es 
        ? ['1 sesión de fisioterapia', '1 sesión de lenguaje', 'Evaluación de avances']
        : ['1 physical therapy session', '1 speech therapy session', 'Progress evaluation'],
      featured: true
    },
    {
      amount: 'Bs 500',
      usd: '≈ $72',
      label: es ? 'Guardián' : 'Guardian',
      icon: '⭐',
      color: '#ffc500',
      bg: 'bg-primary/15',
      impact: es ? 'Cubre un mes completo de atención para una familia con beca.' : 'Covers one full month of care for a family on scholarship.',
      items: es 
        ? ['Plan terapéutico mensual', 'Orientación familiar', 'Materiales + sesiones']
        : ['Monthly therapeutic plan', 'Family guidance', 'Materials + sessions']
    },
    {
      amount: es ? 'Libre' : 'Custom',
      usd: '',
      label: es ? 'A tu medida' : 'To your measure',
      icon: '💛',
      color: '#8c3cbd',
      bg: 'bg-accent/10',
      impact: es ? 'Elige el monto que puedas. Todo suma y todo cambia vidas.' : 'Choose the amount you can. Everything counts and transforms lives.',
      items: es 
        ? ['Cualquier monto ayuda', 'Recibo de donación', 'Impacto verificable']
        : ['Any amount helps', 'Official donation receipt', 'Verifiable impact']
    }
  ]

  const paymentMethods = [
    {
      icon: '🏦',
      title: es ? 'Transferencia bancaria' : 'Bank transfer',
      color: '#229cc2',
      bg: 'bg-secondary/10',
      lines: [
        `${CONTACT.donation.bank}`,
        `Cta: ${CONTACT.donation.account}`,
        `${CONTACT.donation.holder}`
      ]
    },
    {
      icon: '📱',
      title: es ? 'QR de pago directo' : 'Direct QR payment',
      color: '#229cc2',
      bg: 'bg-secondary/10',
      lines: es 
        ? ['Escanea desde tu app bancaria.', 'Compatible con Simple QR en Bolivia.']
        : ['Scan from your banking app.', 'Compatible with Simple QR in Bolivia.']
    },
    {
      icon: '🌐',
      title: es ? 'Donación internacional' : 'International donation',
      color: '#8c3cbd',
      bg: 'bg-accent/10',
      lines: es 
        ? ['PayPal o transferencia directa.', 'Escríbenos para recibir los códigos Swift/IBAN.']
        : ['PayPal or direct wire transfer.', 'Contact us to receive Swift/IBAN codes.']
    }
  ]

  const volunteerAreas = [
    { icon: '🩺', title: es ? 'Salud y terapia' : 'Health & therapy', desc: es ? 'Fisioterapia, psicología, fonoaudiología, psicomotricidad, nutrición.' : 'Physiotherapy, psychology, speech therapy, psychomotor, nutrition.', color: '#229cc2', bg: 'bg-secondary/10' },
    { icon: '📖', title: es ? 'Educación y tutorías' : 'Education & tutoring', desc: es ? 'Apoyo escolar, adaptaciones curriculares, psicopedagogía, talleres.' : 'School support, curricular adaptations, psychopedagogy, workshops.', color: '#229cc2', bg: 'bg-secondary/10' },
    { icon: '🎨', title: es ? 'Arte y recreación' : 'Art & recreation', desc: es ? 'Música, pintura, teatro, expresión corporal, deportes adaptados.' : 'Music, painting, theater, body expression, adapted sports.', color: '#8c3cbd', bg: 'bg-accent/10' },
    { icon: '💻', title: es ? 'Tecnología y diseño' : 'Tech & design', desc: es ? 'Desarrollo web, redes sociales, diseño gráfico, edición multimedia.' : 'Web dev, social media, graphic design, multimedia editing.', color: '#8c3cbd', bg: 'bg-accent/10' },
    { icon: '📋', title: es ? 'Gestión y eventos' : 'Management & events', desc: es ? 'Planificación, captación de fondos, logística de talleres, campañas.' : 'Planning, fundraising, workshop logistics, campaigns.', color: '#ffc500', bg: 'bg-primary/15' },
    { icon: '🌍', title: es ? 'Trabajo comunitario' : 'Community work', desc: es ? 'Trabajo social, orientación legal, visitas domiciliarias, difusión.' : 'Social work, legal guidance, home visits, outreach.', color: '#229cc2', bg: 'bg-secondary/10' }
  ]

  const partnerTypes = [
    {
      icon: '🏢',
      title: es ? 'Empresas comprometidas' : 'Committed Corporations',
      color: '#229cc2',
      bg: 'bg-secondary/10',
      desc: es ? 'RSE, auspicios, donaciones corporativas con impacto social verificado.' : 'CSR, sponsorship, corporate donations with verified social impact.',
      benefits: es 
        ? ['Recibo oficial de donación', 'Logotipo en sitio web', 'Informes semestrales de impacto']
        : ['Official donation receipt', 'Logo on the website', 'Bi-annual impact reports']
    },
    {
      icon: '🎓',
      title: es ? 'Universidades y Colegios' : 'Universities & Schools',
      color: '#8c3cbd',
      bg: 'bg-accent/10',
      desc: es ? 'Prácticas profesionales, voluntariado estudiantil e investigación.' : 'Professional internships, student volunteering, and research.',
      benefits: es 
        ? ['Convenios marco certificados', 'Campos de práctica guiados', 'Acceso a datos de investigación']
        : ['Certified frameworks', 'Guided practice fields', 'Access to research data']
    },
    {
      icon: '🌍',
      title: es ? 'Cooperación Internacional' : 'International Aid',
      color: '#229cc2',
      bg: 'bg-secondary/10',
      desc: es ? 'Proyectos conjuntos de desarrollo y financiamiento de equipamiento.' : 'Joint development projects and equipment financing.',
      benefits: es 
        ? ['Auditorías de transparencia', 'Cumplimiento de objetivos ODS', 'Reportes técnicos de ejecución']
        : ['Transparency audits', 'SDG alignment compliance', 'Technical execution reports']
    },
    {
      icon: '📺',
      title: es ? 'Medios y difusores' : 'Media & Outreach',
      color: '#8c3cbd',
      bg: 'bg-accent/10',
      desc: es ? 'Difusión de campañas, reportajes de sensibilización y eventos.' : 'Campaign dissemination, awareness reports, and events.',
      benefits: es 
        ? ['Contenido de prensa exclusivo', 'Entrevistas con especialistas', 'Menciones de agradecimiento']
        : ['Exclusive press content', 'Interviews with specialists', 'Thank-you mentions']
    }
  ]

  return (
    <div className="overflow-x-hidden w-full bg-gray-50">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[480px] flex items-center bg-gradient-to-br from-gray-900 via-secondary-700 to-secondary py-16 px-4 overflow-hidden">
        {/* Decoraciones */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          <div className="absolute -top-[12%] -right-[8%] w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full border border-white/5 opacity-30" />
          <div className="absolute -bottom-[20%] -left-[6%] w-[250px] h-[250px] md:w-[400px] md:h-[400px] rounded-full bg-radial-gradient(circle, rgba(252,197,0,0.05), transparent 70%)" />
          {['💛', '🙌', '🌍', '❤️'].map((e, i) => (
            <div key={i} className="absolute text-white/5 text-4xl animate-bounce" style={{ left: `${15 + i * 20}%`, top: `${15 + (i % 3) * 20}%` }}>
              {e}
            </div>
          ))}
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 80" fill="none" className="block w-full h-8 md:h-16 lg:h-20 text-[#f9fafb] fill-current">
            <path d="M0 45C320 20 640 60 960 35C1200 15 1380 40 1440 38V80H0Z" />
          </svg>
        </div>

        <div className="container mx-auto max-w-6xl relative z-20 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
            <div>
              <div className="inline-flex items-center gap-2.5 bg-white/8 backdrop-blur-md border border-white/10 rounded-full py-1.5 pl-2.5 pr-4 mb-6 shadow-md select-none">
                <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs text-black font-extrabold shadow-sm select-none">❤️</span>
                <span className="text-white/90 text-xs font-semibold">{es ? 'Colabora con nosotros' : 'Support us'}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-normal leading-[1.1] mb-4 tracking-tight">
                {es ? (
                  <>
                    Tu apoyo <br />
                    <span className="font-bold italic text-primary">transforma</span> vidas
                  </>
                ) : (
                  <>
                    Your support <br />
                    <span className="font-bold italic text-primary">transforms</span> lives
                  </>
                )}
              </h1>

              <p className="text-sm md:text-base text-white/70 leading-relaxed mb-8 max-w-lg">
                {es 
                  ? 'Existen muchas formas de ser parte de este camino inclusivo. Aportando una donación, brindando voluntariado o firmando una alianza corporativa, estás sembrando esperanza en Bolivia.'
                  : 'There are many ways to be part of this inclusive path. By providing a donation, volunteering, or signing a corporate alliance, you are sowing hope in Bolivia.'}
              </p>

              <div className="flex flex-wrap gap-4 items-center">
                <a
                  href="#donaciones"
                  className="bg-primary hover:bg-primary/95 text-black font-extrabold text-sm px-8 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-primary/10 min-h-[44px] flex items-center justify-center"
                >
                  {es ? 'Donar ahora' : 'Donate now'}
                </a>
                <a
                  href="#voluntariado"
                  className="border-2 border-white/20 hover:border-white/50 bg-transparent hover:bg-white/5 text-white font-bold text-sm px-8 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[44px] flex items-center justify-center"
                >
                  {es ? 'Ser voluntario' : 'Volunteer'}
                </a>
              </div>
            </div>

            {/* Impact Highlights */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { n: '100+', l: es ? 'Familias que acompañar' : 'Families to support', icon: '👨‍👩‍👧' },
                { n: '20+', l: es ? 'Profesionales comprometidos' : 'Staff professionals', icon: '🩺' },
                { n: '3', l: es ? 'Programas especializados' : 'Specialized programs', icon: '📋' },
                { n: 'Bs 0', l: es ? 'Costo para familias con beca' : 'Cost for scholarship families', icon: '💚' }
              ].map((s, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/8 backdrop-blur-md rounded-2xl p-5 text-center hover:bg-white/10 transition-all select-none"
                >
                  <div className="text-2xl mb-1.5">{s.icon}</div>
                  <div className="font-serif text-2xl text-primary font-bold leading-none">{s.n}</div>
                  <div className="text-[10px] sm:text-xs text-white/60 font-semibold mt-2 leading-tight">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Donations Section (Donation tiers responsive grid) */}
      <section id="donaciones" className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">💛</span>
              <span className="text-xs font-bold uppercase tracking-wider text-primary-700">
                {es ? 'Donaciones con impacto' : 'Donations with impact'}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#111827] font-normal tracking-tight mb-4">
              {es ? 'Elige cómo quieres colaborar' : 'Choose how you wish to support'}
            </h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
              {es 
                ? 'Cada aporte se destina al equipamiento de salas multisensoriales, insumos escolares y subvención de becas familiares.' 
                : 'Every contribution goes to equipping multisensory rooms, school supplies, and subsidizing family scholarships.'}
            </p>
          </div>

          {/* Tarjetas de donación */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto text-left mb-10">
            {donationTiers.map((tier, i) => {
              const isSelected = selectedTier === i
              return (
                <div
                  key={i}
                  onClick={() => setSelectedTier(i)}
                  className={`bg-white rounded-3xl overflow-hidden border cursor-pointer relative shadow-sm hover:shadow-md transition-all duration-300 ${
                    isSelected ? 'border-primary scale-[1.01]' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {tier.featured && (
                    <div className="absolute top-3 right-3 bg-primary text-black font-extrabold text-[8px] uppercase tracking-wider px-2 py-0.5 rounded-full select-none shadow-sm">
                      {es ? 'Popular' : 'Popular'}
                    </div>
                  )}

                  <div className="h-1 w-full" style={{ backgroundColor: tier.color }} />
                  
                  <div className="p-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 transition-all duration-300 ${isSelected ? 'bg-primary text-black' : tier.bg}`}>
                      {tier.icon}
                    </div>

                    <div className="font-serif text-2xl font-bold text-gray-900 leading-none mb-1">
                      {tier.amount}
                    </div>
                    {tier.usd && <span className="text-[10px] text-gray-400 font-semibold block mb-3">{tier.usd} USD</span>}
                    <div className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">{tier.label}</div>
                    
                    <p className="text-xs text-gray-400 leading-relaxed mb-4 min-h-[48px]">
                      {tier.impact}
                    </p>

                    <div className="space-y-1 pt-3 border-t border-gray-100 flex flex-col gap-0.5">
                      {tier.items.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-[10px] font-semibold text-gray-600">
                          <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: tier.color }} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )
            })}
          </div>

          {/* Formas de Pago (Custom amount + Bank details stacked on mobile) */}
          <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-gray-200 p-6 md:p-10 shadow-sm text-left">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
              
              {/* Lado izquierdo: Monto personalizado */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-3 select-none">
                    {es ? 'Monto personalizado (Bs)' : 'Custom amount (Bs)'}
                  </div>
                  <div className="relative mb-5 max-w-xs">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-serif text-lg text-primary font-bold select-none">Bs</span>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 focus:border-primary rounded-xl font-serif text-lg focus:outline-none bg-gray-50"
                    />
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed max-w-sm">
                    {es 
                      ? 'El 100% de tu donación se destina de forma directa y transparente a los programas del centro. Emitimos recibos oficiales de donación.'
                      : '100% of your donation is designated directly and transparently to center programs. We issue official donation receipts.'}
                  </p>
                </div>

                <div className="mt-8 select-none">
                  <a
                    href="https://wa.me/59170106276"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary hover:bg-primary/95 text-black font-extrabold text-sm sm:text-base px-8 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-primary/10 min-h-[44px] inline-flex items-center gap-2"
                  >
                    <span>💛</span>
                    {es ? 'Confirmar donación por WhatsApp' : 'Confirm donation via WhatsApp'}
                  </a>
                  <p className="text-[10px] text-gray-400 mt-2">
                    {es ? 'Coordinamos la confirmación del depósito de forma segura.' : 'We coordinate deposit confirmation securely.'}
                  </p>
                </div>
              </div>

              {/* Lado derecho: Métodos de transferencia */}
              <div className="flex flex-col gap-4">
                <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase select-none">
                  {es ? 'Medios de depósito autorizados' : 'Authorized deposit methods'}
                </div>
                {paymentMethods.map((m, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 border border-gray-200/80 rounded-2xl p-4 flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-xl shadow-sm flex-shrink-0 select-none">
                      {m.icon}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#111827] mb-0.5">{m.title}</h4>
                      {m.lines.map((line, lidx) => (
                        <div key={lidx} className="text-[11px] text-gray-500 font-semibold leading-relaxed">
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. Volunteer Section (Form and Details side-by-side) */}
      <section id="voluntariado" className="py-16 md:py-24 px-4 bg-[#f9fafb] border-t border-b border-gray-200/50">
        <div className="container mx-auto max-w-6xl">
          
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">🙌</span>
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">
                {es ? 'Voluntariado con propósito' : 'Volunteering with purpose'}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#111827] font-normal tracking-tight mb-4">
              {es ? 'Comparte tu talento y haz la diferencia' : 'Share your talent and make a difference'}
            </h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
              {es 
                ? 'Buscamos profesionales de la salud, pedagogos y personas motivadas que deseen certificar horas de Servicio Social.' 
                : 'We look for health professionals, educators, and motivated people wishing to certify Social Service hours.'}
            </p>
          </div>

          {/* Selector de Áreas de Voluntariado */}
          <div className="mb-10 text-center select-none">
            <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-4">
              {es ? '¿En qué área te gustaría colaborar?' : 'In which area would you like to help?'}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-5xl mx-auto">
              {volunteerAreas.map((a, i) => {
                const isSelected = selectedVolArea === i
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedVolArea(isSelected ? null : i)}
                    className={`p-4 rounded-2xl border-2 flex flex-col items-center text-center transition-all duration-300 focus:outline-none min-h-[110px] justify-center ${
                      isSelected 
                        ? 'border-secondary bg-secondary/10 text-gray-900 shadow-sm' 
                        : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-2xl mb-2">{a.icon}</span>
                    <span className="text-[10px] font-bold leading-tight">{a.title}</span>
                  </button>
                )
              })}
            </div>
            {selectedVolArea !== null && (
              <div className="mt-4 p-4 rounded-xl bg-white border border-gray-200 max-w-xl mx-auto text-xs font-semibold text-gray-600 animate-fadeSlideUp text-left">
                💡 <strong className="text-secondary">{volunteerAreas[selectedVolArea].title}:</strong> {volunteerAreas[selectedVolArea].desc}
              </div>
            )}
          </div>

          {/* Formulario e Información */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
            
            {/* Lado Formulario */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm text-left">
              {!formSent ? (
                <form onSubmit={handleVolunteerSubmit}>
                  <h4 className="font-serif text-lg md:text-xl text-[#111827] font-bold mb-6">
                    {es ? 'Inscríbete como voluntario' : 'Register as volunteer'}
                  </h4>
                  
                  <div className="space-y-4">
                    {/* Nombre completo */}
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 block select-none">
                        {es ? 'Nombre completo *' : 'Full name *'}
                      </label>
                      <input
                        type="text"
                        placeholder={es ? 'Ej: María Flores' : 'E.g., Maria Flores'}
                        value={volName}
                        onChange={(e) => setVolName(e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-xl border-2 bg-gray-50 focus:outline-none text-xs sm:text-sm ${
                          volValidationErrors.name ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-secondary'
                        }`}
                      />
                      {volValidationErrors.name && (
                        <p className="text-[10px] text-red-500 mt-1 font-semibold">{volValidationErrors.name}</p>
                      )}
                    </div>

                    {/* Correo electrónico */}
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 block select-none">
                        {es ? 'Correo electrónico *' : 'Email address *'}
                      </label>
                      <input
                        type="email"
                        placeholder="maria@example.com"
                        value={volEmail}
                        onChange={(e) => setVolEmail(e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-xl border-2 bg-gray-50 focus:outline-none text-xs sm:text-sm ${
                          volValidationErrors.email ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-secondary'
                        }`}
                      />
                      {volValidationErrors.email && (
                        <p className="text-[10px] text-red-500 mt-1 font-semibold">{volValidationErrors.email}</p>
                      )}
                    </div>

                    {/* Teléfono / WhatsApp */}
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 block select-none">
                        {es ? 'Teléfono / WhatsApp' : 'Phone / WhatsApp'}
                      </label>
                      <input
                        type="tel"
                        placeholder="+591 ..."
                        value={volPhone}
                        onChange={(e) => setVolPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-secondary bg-gray-50 focus:outline-none text-xs sm:text-sm"
                      />
                    </div>

                    {/* Profesión o Carrera */}
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 block select-none">
                        {es ? 'Profesión o Carrera *' : 'Profession or Career *'}
                      </label>
                      <input
                        type="text"
                        placeholder={es ? 'Ej: Psicóloga' : 'E.g., Psychologist'}
                        value={volProfession}
                        onChange={(e) => setVolProfession(e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-xl border-2 bg-gray-50 focus:outline-none text-xs sm:text-sm ${
                          volValidationErrors.profession ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-secondary'
                        }`}
                      />
                      {volValidationErrors.profession && (
                        <p className="text-[10px] text-red-500 mt-1 font-semibold">{volValidationErrors.profession}</p>
                      )}
                    </div>

                    {/* Disponibilidad */}
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
                              volAvailability === h
                                ? 'bg-secondary text-white border-secondary shadow-sm'
                                : 'border-gray-300 bg-white hover:bg-gray-50 text-gray-600'
                            }`}
                          >
                            {h}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Motivación */}
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 block select-none">
                        {es ? 'Motivación o mensaje *' : 'Motivation or message *'}
                      </label>
                      <textarea
                        rows={3}
                        placeholder={es ? '¿Por qué te gustaría colaborar con nosotros?' : 'Why would you like to volunteer with us?'}
                        value={volMotivation}
                        onChange={(e) => setVolMotivation(e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-xl border-2 bg-gray-50 focus:outline-none text-xs sm:text-sm resize-y ${
                          volValidationErrors.motivation ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-secondary'
                        }`}
                      />
                      {volValidationErrors.motivation && (
                        <p className="text-[10px] text-red-500 mt-1 font-semibold">{volValidationErrors.motivation}</p>
                      )}
                    </div>
                  </div>

                  {volError && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-semibold">
                      ⚠️ {volError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={volSubmitting}
                    className="w-full mt-6 bg-gradient-to-r from-[#229cc2] to-[#229cc2] hover:scale-[1.01] active:scale-[0.99] text-white font-extrabold text-xs sm:text-sm py-3 px-6 rounded-full transition-all shadow-md shadow-[#229cc2]/10 min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {volSubmitting ? (es ? 'Enviando postulación...' : 'Submitting application...') : (es ? 'Enviar inscripción' : 'Submit registration')}
                  </button>
                </form>
              ) : (
                <div className="text-center py-12 px-4">
                  <span className="text-5xl block mb-4 select-none">🎉</span>
                  <h3 className="font-serif text-xl text-[#111827] font-bold mb-3">
                    {es ? '¡Inscripción recibida!' : 'Registration received!'}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-6">
                    {es 
                      ? 'Muchas gracias por tu postulación. El equipo de Trabajo Social revisará tu perfil y te contactará en los próximos días por WhatsApp.'
                      : 'Thank you very much for applying. The Social Work team will review your profile and contact you in the coming days via WhatsApp.'}
                  </p>
                  <button
                    onClick={() => setFormSent(false)}
                    className="text-xs font-bold text-secondary hover:underline"
                  >
                    {es ? '← Enviar otra solicitud' : '← Submit another request'}
                  </button>
                </div>
              )}
            </div>

            {/* Lado Información */}
            <div className="flex flex-col gap-6 justify-between text-left">
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-sm flex-1">
                <h4 className="font-serif text-lg text-[#111827] font-bold mb-4">
                  {es ? '¿Qué implica el voluntariado?' : 'What does volunteering involve?'}
                </h4>
                
                <div className="space-y-4">
                  {[
                    { icon: '📅', text: es ? 'Horarios adaptados a tu disponibilidad' : 'Schedules adapted to your availability' },
                    { icon: '🎓', text: es ? 'Inducción y capacitación metodológica inicial' : 'Initial induction and methodological training' },
                    { icon: '📋', text: es ? 'Certificado oficial de horas voluntarias/prácticas' : 'Official certificate of volunteer/practice hours' },
                    { icon: '🌍', text: es ? 'Acreditación válida para servicio social universitario' : 'Valid accreditation for university social service' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3.5 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                      <span className="text-xl select-none">{item.icon}</span>
                      <span className="text-xs sm:text-sm font-semibold text-gray-600">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Frase / Testimonio */}
              <div className="bg-gradient-to-br from-[#e8f7fb] to-[#e8f7fb] rounded-3xl p-6 border border-secondary/10 relative overflow-hidden flex flex-col justify-center">
                <span className="absolute top-1 left-2 font-serif text-7xl text-secondary/5 pointer-events-none select-none">&ldquo;</span>
                <p className="font-serif text-sm text-[#111827] font-bold italic leading-relaxed mb-4 relative z-10">
                  {es 
                    ? '«Llegué al Centro como practicante de fonoaudiología y decidí quedarme como voluntaria. Ver cómo un niño pronuncia sus primeras palabras es el regalo más grande de mi vida profesional».' 
                    : '“I came to the Center as a speech therapy intern and decided to stay as a volunteer. Seeing how a child pronounces their first words is the greatest gift of my professional life.”'}
                </p>
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#229cc2] to-[#229cc2] flex items-center justify-center text-white text-base select-none">
                    🩺
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#111827]">{es ? 'Voluntaria activa' : 'Active Volunteer'}</div>
                    <div className="text-[10px] text-gray-500 font-semibold">{es ? 'Terapia de lenguaje' : 'Speech therapy'}</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Alliances Section (Corporate & Institutional) */}
      <section id="alianzas" className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/15 rounded-full px-4 py-1.5 mb-3 select-none">
              <span className="text-sm">🤝</span>
              <span className="text-xs font-bold uppercase tracking-wider text-accent">
                {es ? 'Alianzas de valor' : 'Valuable Alliances'}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#111827] font-normal tracking-tight mb-4">
              {es ? 'Trabajemos juntos por la inclusión' : 'Let\'s work together for inclusion'}
            </h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
              {es 
                ? 'Construimos puentes con empresas, universidades, ONGs y medios para potenciar el impacto en la comunidad boliviana.' 
                : 'We build bridges with corporations, universities, NGOs, and media to boost impact in the Bolivian community.'}
            </p>
          </div>

          {/* Tarjetas de Alianzas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto text-left mb-12">
            {partnerTypes.map((p, idx) => {
              const isOpen = openAlliance === idx
              return (
                <div
                  key={p.title}
                  onClick={() => setOpenAlliance(isOpen ? null : idx)}
                  className={`bg-white rounded-3xl border overflow-hidden shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 ${
                    isOpen ? 'border-accent' : 'border-gray-200'
                  }`}
                >
                  <div className="h-1 w-full" style={{ backgroundColor: p.color }} />
                  <div className="p-6 md:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 transition-all duration-300 ${isOpen ? p.bg : 'bg-gray-100'}`}>
                        {p.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-serif text-lg text-[#111827] font-bold leading-snug">{p.title}</h4>
                        <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed">{p.desc}</p>
                      </div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                        isOpen ? 'bg-accent/10 text-accent rotate-180' : 'bg-gray-50 text-gray-400'
                      }`}>
                        ▾
                      </div>
                    </div>

                    {/* Beneficios expandibles */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        isOpen ? 'max-h-[250px] opacity-100 mt-6' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="pt-4 border-t border-gray-100">
                        <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-3">
                          {es ? 'Beneficios de la alianza' : 'Benefits of the alliance'}
                        </div>
                        <div className="flex flex-col gap-2">
                          {p.benefits.map((b) => (
                            <div key={b} className={`flex items-center gap-2 p-2 rounded-xl text-xs font-semibold text-gray-700 ${p.bg}`}>
                              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: p.color }} />
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

          {/* Vitrina de Aliados Actuales */}
          <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8 max-w-5xl mx-auto shadow-sm text-center select-none">
            <h4 className="font-serif text-lg text-[#111827] font-bold mb-2">
              {es ? 'Aliados que ya nos respaldan' : 'Allies already supporting us'}
            </h4>
            <p className="text-xs text-gray-400 mb-8">{es ? 'Organizaciones que confían activamente en nuestro impacto social' : 'Organizations actively trusting our social impact'}</p>
            
            <div className="flex flex-wrap gap-4 justify-center items-center">
              {[
                { name: 'Universidad Católica Boliviana', type: es ? 'UCB La Paz' : 'UCB La Paz', icon: '🎓' },
                { name: 'Red Uno de Bolivia', type: es ? 'Televisión' : 'Television', icon: '📺' },
                { name: 'ATB Red Nacional', type: es ? 'Televisión' : 'Television', icon: '🎬' },
                { name: 'Página Siete', type: es ? 'Prensa' : 'Press', icon: '📰' }
              ].map((ally, i) => (
                <div
                  key={i}
                  className="bg-gray-50 border border-gray-200 rounded-2xl py-4 px-5 text-center min-w-[140px] flex-1 sm:flex-none shadow-sm hover:border-primary transition-colors"
                >
                  <div className="text-2xl mb-1.5">{ally.icon}</div>
                  <div className="text-xs font-bold text-[#111827] whitespace-nowrap">{ally.name.split(' ')[0]}</div>
                  <div className="text-[9px] text-gray-400 font-semibold mt-1">{ally.type}</div>
                </div>
              ))}
              <div className="border-2 border-dashed border-gray-200 rounded-2xl py-4 px-5 min-w-[140px] flex items-center justify-center flex-col text-gray-400 flex-1 sm:flex-none">
                <span className="text-xl font-bold">+</span>
                <span className="text-[10px] font-bold mt-1">{es ? 'Tu organización' : 'Your organization'}</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Contact CTA */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-gray-900 via-secondary-700 to-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient(circle, rgba(232,168,56,0.06), transparent 70%) pointer-events-none" />
        
        <div className="container mx-auto max-w-3xl relative z-10 text-center">
          <span className="text-5xl block mb-5 animate-[float_4s_ease-in-out_infinite] select-none">❤️</span>
          <h2 className="font-serif text-3xl md:text-4xl text-white font-normal leading-tight mb-4">
            {es ? '¿Tienes dudas sobre cómo apoyar?' : 'Questions about how to support?'}
          </h2>
          
          <p className="text-sm md:text-base text-white/70 max-w-xl mx-auto leading-relaxed mb-10">
            {es 
              ? 'Escríbenos directamente y te explicamos detalladamente cómo tu aporte se traduce en materiales de estimulación, sesiones terapéuticas o becas de estudio.'
              : 'Write to us directly and we will explain in detail how your support translates into stimulation materials, therapy sessions, or study scholarships.'}
          </p>

          <div className="flex flex-wrap gap-4 justify-center items-center">
            <a
              href="https://wa.me/59170106276"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#22c55e] hover:bg-[#22c55e]/90 text-white font-extrabold text-sm sm:text-base px-8 py-3.5 sm:py-4 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#22c55e]/20 min-h-[44px] flex items-center justify-center gap-2"
            >
              <span className="text-xl">💬</span>
              {es ? 'Escribir al 70106276' : 'Message 70106276'}
            </a>
            <a
              href="mailto:contacto@fundacionpro21.org"
              className="border border-white/20 hover:border-white/50 bg-white/5 text-white font-bold text-sm px-8 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[44px] flex items-center justify-center"
            >
              {es ? 'Enviar correo' : 'Send email'}
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
