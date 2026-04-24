'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const appConfig = [
  {
    href: '/products',
    gradient: 'from-red-950 to-gray-950',
    accent: 'group-hover:from-red-900 group-hover:to-gray-900',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={0.75} className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.5a9 9 0 1 1 18 0M3 13.5h18M7.5 13.5V9m4.5 4.5V6m4.5 7.5V9" />
      </svg>
    ),
  },
  {
    href: '/products',
    gradient: 'from-emerald-950 to-gray-950',
    accent: 'group-hover:from-emerald-900 group-hover:to-gray-900',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={0.75} className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      </svg>
    ),
  },
  {
    href: '/products',
    gradient: 'from-sky-950 to-gray-950',
    accent: 'group-hover:from-sky-900 group-hover:to-gray-900',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={0.75} className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
      </svg>
    ),
  },
  {
    href: '/products',
    gradient: 'from-amber-950 to-gray-950',
    accent: 'group-hover:from-amber-900 group-hover:to-gray-900',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={0.75} className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
      </svg>
    ),
  },
  {
    href: '/products',
    gradient: 'from-violet-950 to-gray-950',
    accent: 'group-hover:from-violet-900 group-hover:to-gray-900',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={0.75} className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    href: '/contact',
    gradient: 'from-gray-800 to-gray-950',
    accent: 'group-hover:from-gray-700 group-hover:to-gray-900',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={0.75} className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.43l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
  },
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
            <motion.div
              key={app.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.07, duration: 0.4, ease: 'easeOut' }}
            >
              <Link
                href={appConfig[i].href}
                className={`group relative flex flex-col justify-between overflow-hidden h-52 sm:h-64 bg-gradient-to-br ${appConfig[i].gradient} ${appConfig[i].accent} transition-all duration-500 p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f97316] focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950`}
              >
                <div className="absolute -right-4 -bottom-4 w-36 h-36 sm:w-44 sm:h-44 text-white/5 group-hover:text-white/10 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6">
                  {appConfig[i].icon}
                </div>
                {/* AUDIT #3.1 — text-[10px] → text-xs */}
                <span className="text-xs font-bold uppercase tracking-widest text-white/50">
                  {app.tag}
                </span>
                <div className="relative">
                  <h3 className="text-white font-extrabold text-xl sm:text-2xl leading-tight mb-3 tracking-tight">
                    {app.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-white/50 group-hover:text-[#f97316] transition-colors duration-300">
                    <span className="text-xs font-semibold">{t.applications.explore}</span>
                    <svg className="w-3.5 h-3.5 translate-x-0 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
