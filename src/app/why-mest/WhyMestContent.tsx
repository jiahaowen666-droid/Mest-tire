'use client'

import Link from 'next/link'
import Image from 'next/image'
import { m, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

const PILLAR_CONFIG = [
  { image: '/why-factory.jpg', side: 'left'  as const, bg: 'bg-white' },
  { image: '/why-variety.jpg', side: 'right' as const, bg: 'bg-gray-50' },
  { image: '/why-quality.jpg', side: 'left'  as const, bg: 'bg-white' },
]

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let current = 0
    const increment = target / (1600 / 16)
    const timer = setInterval(() => {
      current += increment
      if (current >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(current))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function WhyMestContent() {
  const { t } = useLanguage()
  const w = t.whyMest

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="bg-[#f97316] py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)', backgroundSize: '36px 36px' }} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <m.p
            className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-6"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          >
            {w.headerTag}
          </m.p>
          <m.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-10"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}
          >
            {w.coreStatement}
          </m.h1>
          <m.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/contact" className="bg-white text-[#c2410c] hover:bg-gray-100 font-bold px-8 py-3.5 text-sm transition-colors">
              {w.ctaBtn1}
            </Link>
            <Link href="/products" className="border-2 border-white/70 text-white hover:bg-white/10 font-bold px-8 py-3.5 text-sm transition-colors">
              {w.ctaBtn2}
            </Link>
          </m.div>
        </div>
      </section>

      {/* ── Three pillar sections ──────────────────────────────── */}
      {w.pillars.map((pillar, i) => {
        const { image, side, bg } = PILLAR_CONFIG[i]
        const imgLeft = side === 'left'

        return (
          <section key={pillar.title} className={`flex flex-col ${imgLeft ? 'md:flex-row' : 'md:flex-row-reverse'} ${bg}`} style={{ minHeight: 540 }}>

            {/* Photo */}
            <m.div
              className="relative w-full md:w-1/2 overflow-hidden"
              style={{ minHeight: 300 }}
              initial={{ opacity: 0, x: imgLeft ? -80 : 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Image
                src={image}
                alt={pillar.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/25" />
            </m.div>

            {/* Text */}
            <div className="relative w-full md:w-1/2 flex items-center px-8 sm:px-12 lg:px-20 py-16 overflow-hidden">
              {/* Watermark */}
              <span
                aria-hidden
                className={`absolute text-[clamp(100px,14vw,160px)] font-black text-gray-100 select-none leading-none top-1/2 -translate-y-1/2 ${imgLeft ? 'right-0 translate-x-4' : 'left-0 -translate-x-4'}`}
              >
                0{i + 1}
              </span>

              <m.div
                className="relative"
                initial={{ opacity: 0, x: imgLeft ? 60 : -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.65, ease: 'easeOut', delay: 0.18 }}
              >
                <p className="text-[#f97316] text-xs font-bold uppercase tracking-widest mb-5">
                  {String(i + 1).padStart(2, '0')} — {w.headerTag}
                </p>
                <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight mb-6">
                  {pillar.title}
                </h2>
                <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-sm">
                  {pillar.body}
                </p>
                {pillar.badge && (
                  <span className="inline-flex items-center gap-2 border border-[#f97316]/30 bg-orange-50 px-4 py-2 text-xs font-bold text-[#c2410c] uppercase tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] shrink-0" />
                    {pillar.badge}
                  </span>
                )}
              </m.div>
            </div>
          </section>
        )
      })}

      {/* ── Stats bar ──────────────────────────────────────────── */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 text-center">
            {w.proof.map((item, i) => {
              const match = item.value.match(/^(\d+)(.*)$/)
              const num    = match ? parseInt(match[1]) : 0
              const suffix = match ? match[2] : item.value
              const isNumeric = !!match && num > 0

              return (
                <m.div
                  key={item.label}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <p className="text-5xl sm:text-6xl font-black text-[#f97316] tabular-nums">
                    {isNumeric ? <CountUp target={num} suffix={suffix} /> : item.value}
                  </p>
                  <p className="text-gray-400 text-sm mt-3 leading-snug">{item.label}</p>
                </m.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Comparison strip ───────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <m.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[#f97316] text-xs font-bold uppercase tracking-widest mb-3">{w.comparison.tag}</p>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">{w.comparison.title}</h2>
          </m.div>

          {/* Column headers */}
          <div className="grid grid-cols-2 mb-2 px-5">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{w.comparison.themHeader}</p>
            <p className="text-xs font-bold uppercase tracking-widest text-[#c2410c]">{w.comparison.usHeader}</p>
          </div>

          <div className="space-y-px">
            {w.comparison.rows.map((row, i) => (
              <m.div
                key={i}
                className="grid grid-cols-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.38, delay: i * 0.09 }}
              >
                <div className="bg-gray-50 border border-gray-100 px-5 py-5 flex items-start gap-3">
                  <svg className="w-4 h-4 text-gray-300 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                  <p className="text-gray-400 text-sm leading-relaxed">{row.them}</p>
                </div>
                <div className="bg-orange-50 border border-orange-100 px-5 py-5 flex items-start gap-3">
                  <svg className="w-4 h-4 text-[#f97316] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  <p className="text-gray-900 text-sm font-medium leading-relaxed">{row.us}</p>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#f97316]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">{w.ctaTitle}</h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">{w.ctaBody}</p>
            <Link href="/contact" className="bg-white text-[#c2410c] hover:bg-gray-100 font-bold px-10 py-4 text-sm transition-colors inline-block">
              {w.ctaBtn1}
            </Link>
          </m.div>
        </div>
      </section>
    </>
  )
}
