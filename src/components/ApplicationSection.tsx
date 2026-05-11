'use client'

import Link from 'next/link'
import { m } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const appConfig = [
  { href: '/products', image: '/applications/karting.jpg' },
  { href: '/products', image: '/applications/golf.jpg' },
  { href: '/products', image: '/applications/airport.jpg' },
  { href: '/products', image: '/applications/warehouse.jpg' },
  { href: '/products', image: '/applications/powersports.jpg' },
  { href: '/contact',  image: '/applications/oem.jpg' },
]

export default function ApplicationSection() {
  const { t } = useLanguage()
  const apps = t.applications.items

  return (
    <section className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-[#f97316] text-xs font-semibold uppercase tracking-widest mb-2">{t.applications.tag}</p>
          {/* AUDIT #1.1 — major section: text-4xl sm:text-5xl */}
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">{t.applications.title}</h2>
        </div>

        {/* AUDIT #4.2 — gap-3 → gap-4 to match rest of the site's grid rhythm */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {apps.map((app, i) => (
            <m.div
              key={app.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.07, duration: 0.4, ease: 'easeOut' }}
            >
              <Link
                href={appConfig[i].href}
                className="group relative flex flex-col justify-between overflow-hidden h-52 sm:h-64 transition-all duration-500 p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f97316] focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
              >
                {/* Photo background */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${appConfig[i].image})` }}
                />
                {/* Dark overlay — lightens slightly on hover so image "glows" */}
                <div className="absolute inset-0 bg-black/55 group-hover:bg-black/40 transition-colors duration-500" />

                {/* AUDIT #3.1 — text-[10px] → text-xs */}
                <span className="relative text-xs font-bold uppercase tracking-widest text-white/70">
                  {app.tag}
                </span>
                <div className="relative">
                  <h3 className="text-white font-extrabold text-xl sm:text-2xl leading-tight mb-3 tracking-tight drop-shadow-sm">
                    {app.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-white/60 group-hover:text-[#f97316] transition-colors duration-300">
                    <span className="text-xs font-semibold">{t.applications.explore}</span>
                    <svg className="w-3.5 h-3.5 translate-x-0 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  )
}
