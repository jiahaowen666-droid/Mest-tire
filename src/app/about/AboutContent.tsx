'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function AboutContent() {
  const { t } = useLanguage()
  const a = t.about

  return (
    <>
      <section className="bg-[#f97316] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-3">{a.headerTag}</p>
          <h1 className="text-5xl font-black text-white mb-4">
            {a.headerTitle.split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
          </h1>
          <p className="text-white/80 text-lg max-w-2xl">{a.headerBody}</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <blockquote className="border-l-4 border-[#f97316] pl-8 bg-orange-50 py-6 pr-6">
              <p className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">{a.missionQuote}</p>
              <p className="text-gray-600 mt-4 leading-relaxed">{a.missionBody}</p>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#f97316] text-xs font-semibold uppercase tracking-widest mb-3">{a.timelineTag}</p>
          <h2 className="text-4xl font-black text-gray-900 mb-16">{a.timelineTitle}</h2>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-[#f97316]/30 ml-[19px] hidden sm:block" />
            <div className="space-y-12">
              {a.timeline.map((item, i) => (
                <div key={item.year} className="flex gap-8 items-start">
                  <div className="flex flex-col items-center shrink-0 hidden sm:flex">
                    <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-black z-10 ${i === a.timeline.length - 1 ? 'bg-[#f97316] border-[#f97316] text-white' : 'bg-white border-[#f97316] text-[#f97316]'}`}>
                      {item.year.slice(2)}
                    </div>
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-[#f97316] font-black text-xl">{item.year}</span>
                      <span className="text-gray-900 font-bold">{item.title}</span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-2xl">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#f97316] text-xs font-semibold uppercase tracking-widest mb-3">{a.valuesTag}</p>
          <h2 className="text-4xl font-black text-gray-900 mb-12">{a.valuesTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {a.values.map((value, i) => (
              <div key={value.title} className="bg-orange-50 border border-orange-100 p-8">
                <div className="text-[#f97316]/25 font-black text-5xl mb-2 select-none">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="text-gray-900 font-bold text-lg mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#f97316] text-xs font-semibold uppercase tracking-widest mb-3">{a.officesTag}</p>
          <h2 className="text-4xl font-black text-gray-900 mb-12">{a.officesTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {a.offices.map((office) => (
              <div key={office.name} className="bg-white border-t-4 border-[#f97316] p-6 shadow-sm">
                <p className="text-[#f97316] text-xs font-semibold uppercase tracking-widest mb-1">{office.name}</p>
                <p className="text-gray-900 font-bold mb-2">{office.location}</p>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{office.detail}</p>
                <a href={`mailto:${office.contact}`} className="text-gray-500 hover:text-[#f97316] text-xs block transition-colors">{office.contact}</a>
                <a href={`tel:${office.phone}`} className="text-gray-500 hover:text-gray-900 text-xs block mt-1 transition-colors">{office.phone}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#f97316]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-white mb-4">{a.ctaTitle}</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">{a.ctaBody}</p>
          <Link href="/contact" className="bg-white text-[#f97316] hover:bg-gray-100 font-bold px-8 py-3.5 text-sm transition-colors inline-block">
            {a.ctaBtn}
          </Link>
        </div>
      </section>
    </>
  )
}
