import Link from 'next/link'
import Image from 'next/image'
import type { Locale } from '@/lib/i18n'
import { getSiteSettings } from '@/lib/cms'
import { getAllPrograms } from '@/lib/content'
import { waLink } from '@/lib/utils'
import BrandLogo from '@/components/ui/BrandLogo'

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
              <a href={social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors">
                <BrandLogo name="facebook" className="w-5 h-5" />
              </a>
              <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors">
                <BrandLogo name="instagram" className="w-5 h-5" />
              </a>
              <a href={social.tiktok_lapiz} target="_blank" rel="noopener noreferrer" aria-label="TikTok Centro Lápiz en Mano" className="text-gray-400 hover:text-white transition-colors">
                <BrandLogo name="tiktok" className="w-5 h-5" />
              </a>
              <a href={social.tiktok_pro21} target="_blank" rel="noopener noreferrer" aria-label="TikTok Fundación PRO-21" className="text-gray-400 hover:text-white transition-colors">
                <BrandLogo name="tiktok" className="w-5 h-5" />
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
