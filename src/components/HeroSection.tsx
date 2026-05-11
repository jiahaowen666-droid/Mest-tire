'use client'

import Link from 'next/link'
import { m } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: 'easeOut' as const },
  }),
}

export default function HeroSection() {
  const { t } = useLanguage()
  const h = t.hero

  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">
      <video autoPlay muted loop playsInline preload="auto" poster="/hero-poster.jpg" className="absolute inset-0 w-full h-full object-cover">
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />

      <m.div
        className="absolute left-0 top-0 bottom-0 w-1 bg-[#f97316]"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        style={{ originY: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' as const, delay: 0.3 }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          <m.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 border border-[#f97316]/40 text-[#f97316] text-xs font-semibold uppercase tracking-widest px-3 py-1.5 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#f97316]" />
            {h.badge}
          </m.div>

          <div className="overflow-hidden mb-2">
            <m.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight"
            >
              {h.h1}
            </m.h1>
          </div>
          <div className="overflow-hidden mb-6">
            <m.h1
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#f97316] leading-tight tracking-tight"
            >
              {h.h1orange}
            </m.h1>
          </div>

          <m.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl"
          >
            {h.body}
          </m.p>

          <m.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-4 mb-10"
          >
            {/* AUDIT #4.3 + #5.2 — unified btn-lg token + active:scale press feedback */}
            <Link href="/contact" className="btn-lg btn-primary">
              {h.cta1}
            </Link>
            <a
              href="https://wa.me/8618630107074"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-lg btn-on-dark"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {h.cta2}
            </a>
          </m.div>

          <m.div
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-6"
          >
            {h.badges.map((badge) => (
              // AUDIT #1.3 — was text-white/50 (3.5:1). Now text-white/70 for proper layer.
              <div key={badge} className="flex items-center gap-2 text-white/70 text-xs">
                <svg className="w-3.5 h-3.5 text-[#f97316]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {badge}
              </div>
            ))}
          </m.div>
        </div>
      </div>

      <m.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-white/60 text-xs uppercase tracking-widest">{h.scroll}</span>
        <m.div
          className="w-px h-10 bg-gradient-to-b from-white/60 to-transparent"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        />
      </m.div>
    </section>
  )
}
