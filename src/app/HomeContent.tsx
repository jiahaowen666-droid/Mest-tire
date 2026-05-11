'use client'

import Link from 'next/link'
import { useState } from 'react'
import { m } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

function TimelineColumn({ timeline }: { timeline: readonly { year: string; event: string }[] }) {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div className="relative pl-8">
      {/* Static rail */}
      <div className="absolute left-0 top-2 bottom-2 w-px bg-gray-200" />
      {/* Animated highlight rail — grows toward hovered item */}
      <m.div
        className="absolute left-0 top-2 w-px bg-[#f97316] origin-top"
        animate={{
          scaleY: hovered !== null ? (hovered + 1) / timeline.length : 0,
          opacity: hovered !== null ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{ height: 'calc(100% - 1rem)' }}
      />

      <div className="space-y-8">
        {timeline.map((item, i) => {
          const isLast = i === timeline.length - 1
          const isHovered = hovered === i
          const isPast = hovered !== null && i <= hovered

          return (
            <m.div
              key={item.year}
              className="relative flex items-start gap-5 cursor-default"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: 'easeOut' }}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
            >
              {/* Dot */}
              <m.div
                className="absolute -left-8 mt-1 rounded-full border-2 flex-shrink-0"
                animate={{
                  width:  isHovered ? 20 : 16,
                  height: isHovered ? 20 : 16,
                  translateX: isHovered ? -10 : -6,
                  backgroundColor: isPast || isLast ? '#f97316' : '#ffffff',
                  borderColor: '#f97316',
                  boxShadow: isHovered ? '0 0 0 4px rgba(249,115,22,0.18)' : '0 0 0 0px rgba(249,115,22,0)',
                }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              />

              {/* Content */}
              <m.div
                className="min-w-0"
                animate={{ x: isHovered ? 6 : 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <m.span
                  className="text-sm font-black tracking-tight block"
                  animate={{ color: isHovered || isLast ? '#f97316' : '#b45309' }}
                  transition={{ duration: 0.15 }}
                >
                  {item.year}
                </m.span>
                <m.p
                  className="text-sm leading-relaxed mt-0.5"
                  animate={{ color: isHovered ? '#111111' : '#374151' }}
                  transition={{ duration: 0.15 }}
                >
                  {item.event}
                </m.p>
              </m.div>
            </m.div>
          )
        })}
      </div>
    </div>
  )
}

export default function HomeContent() {
  const { t } = useLanguage()
  const h = t.home

  return (
    <>
      {/* Why Choose Us — AUDIT #2.2: combined visually with Brand Story below
          (both now on white + gray-50 respectively already, so we keep). */}
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* AUDIT #6.3 — supporting section now left-aligned for consistency */}
          <div className="mb-16 max-w-3xl">
            <p className="text-[#b45309] text-xs font-semibold uppercase tracking-widest mb-2">{h.whyTag}</p>
            {/* AUDIT #1.1 + #3.2 — supporting section: 3xl→4xl, font-extrabold */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">{h.whyTitle}</h2>
          </div>
          {/* Bento grid — asymmetric, 3-col × 2-row on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* ── 30 Years — dark tall cell, spans 2 rows ── */}
            <m.div
              className="lg:row-span-2 bg-gray-900 p-8 xl:p-10 flex flex-col justify-between min-h-[260px] lg:min-h-0"
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <p className="text-[#f97316] text-xs font-bold uppercase tracking-widest">Est. 1990</p>
              <div>
                <div className="flex items-end leading-none mt-6 mb-3">
                  <span className="text-[#f97316] font-black text-8xl xl:text-9xl leading-none select-none">30</span>
                  <span className="text-white font-black text-4xl leading-none mb-1 ml-1">+</span>
                </div>
                <h3 className="text-white font-extrabold text-xl xl:text-2xl tracking-tight mb-4">
                  {h.whyCards[1].title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{h.whyCards[1].desc}</p>
              </div>
            </m.div>

            {/* ── Factory Pricing — wide white cell ── */}
            <m.div
              className="lg:col-span-2 bg-white border border-gray-200 hover:border-[#f97316] hover:shadow-lg transition-all duration-300 p-8 flex flex-col justify-between group"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: 0.1, ease: 'easeOut' }}
            >
              <div className="w-10 h-10 bg-orange-50 group-hover:bg-[#f97316] transition-colors duration-300 flex items-center justify-center mb-8">
                <svg className="w-5 h-5 text-[#f97316] group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <div>
                <h3 className="text-gray-900 font-extrabold text-xl xl:text-2xl mb-2 tracking-tight">{h.whyCards[0].title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{h.whyCards[0].desc}</p>
              </div>
            </m.div>

            {/* ── Precision Manufacturing — orange tint ── */}
            <m.div
              className="bg-orange-50 border border-orange-100 hover:bg-orange-100 transition-colors duration-300 p-8 flex flex-col justify-between group"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: 0.18, ease: 'easeOut' }}
            >
              <div className="w-10 h-10 border border-orange-200 group-hover:border-[#f97316] flex items-center justify-center mb-6 transition-colors duration-300">
                <svg className="w-5 h-5 text-[#b45309]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <div>
                <h3 className="text-gray-900 font-extrabold text-lg xl:text-xl mb-2 tracking-tight">{h.whyCards[2].title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{h.whyCards[2].desc}</p>
              </div>
            </m.div>

            {/* ── Custom Solutions — solid amber ── */}
            <m.div
              className="bg-[#b45309] hover:bg-[#92400e] transition-colors duration-300 p-8 flex flex-col justify-between"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: 0.24, ease: 'easeOut' }}
            >
              <div className="w-10 h-10 border border-white/25 flex items-center justify-center mb-6">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.43l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-extrabold text-lg xl:text-xl mb-2 tracking-tight">{h.whyCards[3].title}</h3>
                <p className="text-white/75 text-sm leading-relaxed">{h.whyCards[3].desc}</p>
              </div>
            </m.div>

          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#b45309] text-xs font-semibold uppercase tracking-widest mb-2">{h.storyTag}</p>
              {/* AUDIT #1.1 + #3.2 — supporting section: 3xl→4xl, font-extrabold */}
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
                {h.storyTitle.split('\n').map((line, i) => (
                  <span key={i}>{line}{i === 0 && <br />}</span>
                ))}
              </h2>
              <p className="text-gray-700 text-base leading-relaxed mb-4">{h.storyP1}</p>
              <p className="text-gray-700 text-base leading-relaxed mb-8">{h.storyP2}</p>
              {/* AUDIT #4.3 + #5.2 — unified btn token */}
              <Link href="/about" className="btn-md btn-primary inline-flex">
                {h.storyBtn}
              </Link>
            </div>
            {/* Vertical timeline */}
            <TimelineColumn timeline={h.timeline} />
          </div>
        </div>
      </section>
    </>
  )
}
