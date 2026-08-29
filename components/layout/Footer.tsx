import Link from 'next/link'
import Image from 'next/image'
import type { Locale } from '@/lib/i18n'
import { getSiteSettings } from '@/lib/cms'
import { getAllPrograms } from '@/lib/content'
import { waLink } from '@/lib/utils'

interface FooterProps {
  lang: Locale
}

export default function Footer({ lang }: FooterProps) {
  const settings = getSiteSettings(lang)
  const programs = getAllPrograms(lang)
  const { contact, social, footer } = settings

  return (
    <footer className="bg-gray-950 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Columna 1: Identidad + contacto */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image src="/icons/logo-pro21.png" alt="Fundación PRO-21" width={40} height={48} className="h-12 w-auto object-contain" />
              <div className="w-px h-10 bg-white/20" />
              <Image src="/icons/logo-lapiz.png" alt="Centro Lápiz en Mano" width={40} height={40} className="h-12 w-auto object-contain" />
            </div>

            <ul className="mt-4 space-y-2 text-sm text-gray-400">
              <li className="flex gap-2">
                <span className="shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M12 2C7.86 2 4.5 5.36 4.5 9.5c0 5.5 6.5 11.5 7.02 11.97a.7.7 0 00.96 0C13 21 19.5 15 19.5 9.5 19.5 5.36 16.14 2 12 2zm0 10.25a2.75 2.75 0 110-5.5 2.75 2.75 0 010 5.5z" clipRule="evenodd"/>
                  </svg>
                </span>
                <span>{contact.address}</span>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.36 11.36 0 003.56.57 1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.49a1 1 0 011 1 11.36 11.36 0 00.57 3.56 1 1 0 01-.25 1.02l-2.19 2.21z"/>
                  </svg>
                </span>
                <a href={waLink(contact.whatsapp_number)} className="underline hover:text-white" target="_blank" rel="noopener noreferrer">
                  {contact.phone_display}
                </a>
              </li>
              <li className="flex gap-2">
                <span className="shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M2 6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm2.4-.5l7.05 5.4a1 1 0 001.1 0l7.05-5.4A.5.5 0 0019.4 5H4.6a.5.5 0 00-.2.5z"/>
                  </svg>
                </span>
                <a href={`mailto:${contact.email}`} className="underline hover:text-white">
                  {contact.email}
                </a>
              </li>
            </ul>

            {/* Redes sociales */}
            <div className="mt-5 flex gap-3">
              <a
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M13.5 21v-7.5h2.52l.38-2.93H13.5V8.66c0-.85.24-1.43 1.46-1.43h1.56V4.6C16.26 4.5 15.36 4.4 14.3 4.4c-2.2 0-3.71 1.34-3.71 3.8v2.37H8.06v2.93h2.53V21h2.91z"/>
                </svg>
              </a>
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={social.tiktok_lapiz}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok Centro Lápiz en Mano"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
                </svg>
              </a>
              <a
                href={social.tiktok_pro21}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok Fundación PRO-21"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Columna 2: Programas */}
          <div>
            <h3 className="font-bold text-lg mb-3">{footer.programs_title}</h3>
            <ul className="space-y-1 text-gray-400 text-sm">
              {programs.map((p) => (
                <li key={p.slug}><Link href={`/${lang}/${p.slug}`} className="hover:text-white">{p.title}</Link></li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Institución */}
          <div>
            <h3 className="font-bold text-lg mb-3">{footer.institution_title}</h3>
            <ul className="space-y-1 text-gray-400 text-sm">
              {footer.institution_links.map((link) => (
                <li key={link.route}><Link href={`/${lang}/${link.route}`} className="hover:text-white">{link.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-xs">
          <p>© {new Date().getFullYear()} {footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
