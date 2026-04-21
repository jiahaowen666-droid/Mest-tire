'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function HomeContent() {
  const { t } = useLanguage()
  const h = t.home

  return (
    <>
      {/* Why Choose Us */}
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#f97316] text-xs font-semibold uppercase tracking-widest mb-2">{h.whyTag}</p>
            <h2 className="text-4xl font-black text-gray-900">{h.whyTitle}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {h.whyCards.map((item, i) => (
              <div key={item.title} className="bg-orange-50 border border-orange-100 p-8 relative">
                <div className="text-[#f97316]/20 font-black text-6xl absolute -top-2 -left-1 select-none">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="relative pt-6 pl-2">
                  <h3 className="text-gray-900 font-bold text-base mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
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
              <p className="text-[#f97316] text-xs font-semibold uppercase tracking-widest mb-2">{h.storyTag}</p>
              <h2 className="text-4xl font-black text-gray-900 mb-6">
                {h.storyTitle.split('\n').map((line, i) => (
                  <span key={i}>{line}{i === 0 && <br />}</span>
                ))}
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mb-4">{h.storyP1}</p>
              <p className="text-gray-600 text-base leading-relaxed mb-8">{h.storyP2}</p>
              <Link href="/about" className="bg-[#f97316] hover:bg-[#ea580c] text-white text-sm font-semibold px-6 py-3 transition-colors inline-block">
                {h.storyBtn}
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {h.timeline.map((item) => (
                <div key={item.year} className="bg-white border-l-4 border-[#f97316] p-4 shadow-sm">
                  <p className="text-[#f97316] font-black text-xl">{item.year}</p>
                  <p className="text-gray-600 text-xs leading-relaxed mt-1">{item.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
