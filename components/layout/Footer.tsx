import Link from 'next/link'
import type { Locale } from '@/lib/i18n'

interface FooterProps {
  lang: Locale
}

export default function Footer({ lang }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Columna 1: Identidad */}
          <div>
            <h3 className="font-bold text-lg mb-3">Fundación PRO-21</h3>
            <p className="text-gray-400 text-sm">
              Centro Lápiz en Mano — La Paz, Bolivia
            </p>
            <p className="text-gray-400 text-sm mt-2">
              WhatsApp: <a href="https://wa.me/59170106276" className="underline">70106276</a>
            </p>
          </div>
          {/* Columna 2: Programas */}
          <div>
            <h3 className="font-bold text-lg mb-3">Programas</h3>
            <ul className="space-y-1 text-gray-400 text-sm">
              <li><Link href={`/${lang}/mi-escuelita-down`} className="hover:text-white">Mi Escuelita Down</Link></li>
              <li><Link href={`/${lang}/aula-wawitas`} className="hover:text-white">Aula Wawitas</Link></li>
              <li><Link href={`/${lang}/pasos-firmes`} className="hover:text-white">Pasos Firmes</Link></li>
            </ul>
          </div>
          {/* Columna 3: Institución */}
          <div>
            <h3 className="font-bold text-lg mb-3">Institución</h3>
            <ul className="space-y-1 text-gray-400 text-sm">
              <li><Link href={`/${lang}/quienes-somos`} className="hover:text-white">Quiénes somos</Link></li>
              <li><Link href={`/${lang}/equipo`} className="hover:text-white">Equipo</Link></li>
              <li><Link href={`/${lang}/impacto`} className="hover:text-white">Impacto</Link></li>
              <li><Link href={`/${lang}/colabora`} className="hover:text-white">Colabora</Link></li>
              <li><Link href={`/${lang}/contacto`} className="hover:text-white">Contacto</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-xs">
          <p>© {new Date().getFullYear()} Fundación PRO-21. Desarrollado por estudiantes de Ingeniería de Sistemas, UCB La Paz.</p>
        </div>
      </div>
    </footer>
  )
}
