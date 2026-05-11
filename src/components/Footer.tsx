'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'

const offices = [
  { phone: '+86 186 3010 7074', email: 'stanley@mesttire.com' },
  { phone: '+1 469 953 9887', email: 'denzel@mesttire.com' },
  { phone: '+61 490 412 627', email: 'Alan@mesttire.com' },
]

export default function Footer() {
  const { t } = useLanguage()

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/products', label: t.nav.products },
    { href: '/why-mest', label: t.nav.whyMest },
    { href: '/about', label: t.nav.about },
    { href: '/blog', label: t.nav.blog },
    { href: '/contact', label: t.nav.contact },
  ]

  return (
    <footer className="bg-[#0f0f0f] border-t border-[#2a2a2a] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <Image
              src="/logo-white.png"
              alt="Mest Tire"
              width={140}
              height={48}
              className="h-10 w-auto mb-4"
            />
            <p className="text-gray-400 text-sm leading-relaxed mt-3">
              {t.footer.tagline}
            </p>
            <p className="text-brand text-sm font-medium mt-4 italic">
              {t.footer.slogan}
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
              {t.footer.navigation}
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-brand text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
              {t.footer.globalOffices}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {t.contact.offices.map((office, i) => (
                <div key={office.name}>
                  <p className="text-brand text-xs font-semibold uppercase tracking-wide mb-1">{office.name}</p>
                  <p className="text-gray-400 text-xs leading-relaxed">{office.location}</p>
                  <a href={`tel:${offices[i].phone}`} className="text-gray-400 hover:text-white text-xs block mt-1 py-1 transition-colors">
                    {offices[i].phone}
                  </a>
                  <a href={`mailto:${offices[i].email}`} className="text-gray-400 hover:text-brand text-xs block py-1 transition-colors">
                    {offices[i].email}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#2a2a2a] mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-xs">
            © {new Date().getFullYear()} {t.footer.rights}
          </p>
          <a
            href="https://wa.me/8618630107074"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white text-xs font-semibold px-4 py-2 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            {t.footer.whatsapp}
          </a>
        </div>
      </div>
    </footer>
  )
}
