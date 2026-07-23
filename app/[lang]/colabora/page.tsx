import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n'
import { CONTACT } from '@/lib/contact'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Colabora | Fundación PRO-21',
}

export default function Page({ params }: { params: { lang: Locale } }) {
  const es = params.lang === 'es'

  return (
    <>
      {/* Encabezado */}
      <section className="bg-gradient-to-br from-accent/10 to-primary/10 py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            {es ? 'Colabora con Nosotros' : 'Support Us'}
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            {es
              ? 'Tu apoyo hace posible que más niños reciban la atención que merecen.'
              : 'Your support makes it possible for more children to receive the care they deserve.'}
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl space-y-10">

          {/* Donación bancaria */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🏦</span>
              <h2 className="text-2xl font-bold text-gray-900">
                {es ? 'Donación por transferencia bancaria' : 'Bank Transfer Donation'}
              </h2>
            </div>
            <p className="text-gray-600 mb-6">
              {es
                ? 'Puedes realizar tu donación directamente a la cuenta de la fundación en Bolivia:'
                : 'You can make your donation directly to the foundation\'s account in Bolivia:'}
            </p>
            <div className="bg-gray-50 rounded-xl p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                  {es ? 'Banco' : 'Bank'}
                </p>
                <p className="font-bold text-gray-900">{CONTACT.donation.bank}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                  {es ? 'Número de cuenta' : 'Account number'}
                </p>
                <p className="font-bold text-gray-900 font-mono">{CONTACT.donation.account}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                  {es ? 'Titular' : 'Account holder'}
                </p>
                <p className="font-bold text-gray-900">{CONTACT.donation.holder}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              {es
                ? '💬 Después de tu transferencia, escríbenos por WhatsApp para confirmar tu donación.'
                : '💬 After your transfer, message us on WhatsApp to confirm your donation.'}
            </p>
            <div className="mt-4">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {es ? 'Confirmar por WhatsApp' : 'Confirm via WhatsApp'}
              </a>
            </div>
          </div>

          {/* Voluntariado */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🤝</span>
              <h2 className="text-2xl font-bold text-gray-900">
                {es ? 'Voluntariado' : 'Volunteering'}
              </h2>
            </div>
            <p className="text-gray-600 mb-6">
              {es
                ? 'Si eres profesional de la salud, educación o simplemente quieres aportar tu tiempo, contáctanos. Tu ayuda transforma vidas.'
                : 'If you are a health or education professional, or simply want to contribute your time, contact us. Your help transforms lives.'}
            </p>
            <Button href={`/${params.lang}/contacto`} variant="outline">
              {es ? 'Quiero ser voluntario' : 'I want to volunteer'}
            </Button>
          </div>

          {/* Redes sociales */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="font-bold text-gray-900 mb-2">
              {es ? 'Comparte nuestra misión' : 'Share our mission'}
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              {es
                ? 'Síguenos y comparte nuestro trabajo. Cada difusión nos acerca a más familias que necesitan apoyo.'
                : 'Follow us and share our work. Every share brings us closer to more families in need.'}
            </p>
            <div className="flex gap-3">
              <a
                href={CONTACT.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:border-pink-400 hover:text-pink-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-pink-500">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Instagram
              </a>
              <a
                href={CONTACT.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
                </svg>
                TikTok
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
