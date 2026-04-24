'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {h.whyCards.map((item, i) => (
              <div key={item.title} className="bg-orange-50 border border-orange-100 p-8 relative">
                <div className="text-[#f97316]/25 font-black text-6xl absolute -top-2 -left-1 select-none">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="relative pt-6 pl-2">
                  <h3 className="text-gray-900 font-bold text-base mb-2">{item.title}</h3>
                  {/* AUDIT #2.3 — text-gray-500 → text-gray-600 (AA) */}
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
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
            <div className="grid grid-cols-2 gap-4">
              {h.timeline.map((item) => (
                <div key={item.year} className="bg-white border-l-4 border-[#f97316] p-4 shadow-sm">
                  <p className="text-[#f97316] font-black text-xl">{item.year}</p>
                  <p className="text-gray-700 text-xs leading-relaxed mt-1">{item.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
