'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function WhyMestContent() {
  const { t } = useLanguage()
  const w = t.whyMest

  return (
    <>
      {/* Hero — core statement */}
      <section className="bg-[#f97316] py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-6">{w.headerTag}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-8">
            {w.coreStatement}
          </h1>
          <div className="flex flex-wrap gap-4 justify-center mt-10">
            <Link href="/contact" className="bg-white text-[#f97316] hover:bg-gray-100 font-bold px-8 py-3.5 text-sm transition-colors">
              {w.ctaBtn1}
            </Link>
            <Link href="/products" className="border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-3.5 text-sm transition-colors">
              {w.ctaBtn2}
            </Link>
          </div>
        </div>
      </section>

      {/* Three pillars */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-100">
            {w.pillars.map((pillar, i) => (
              <div key={pillar.title} className={`p-10 flex flex-col gap-5 ${i < 2 ? 'border-b md:border-b-0 md:border-r border-gray-100' : ''}`}>
                <div className="w-12 h-12 bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                  {i === 0 && (
                    <svg className="w-6 h-6 text-[#f97316]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h1.5m-1.5 0h-1.5m-6 0H7.5m-1.5 0H4.5" />
                    </svg>
                  )}
                  {i === 1 && (
                    <svg className="w-6 h-6 text-[#f97316]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                    </svg>
                  )}
                  {i === 2 && (
                    <svg className="w-6 h-6 text-[#f97316]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l5.654-4.654m5.965-3.79a2.548 2.548 0 1 1-3.586-3.586l-5.654 4.655m5.965-3.79 3.03-2.496c.14-.468.382-.89.766-1.208" />
                    </svg>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900 mb-3">{pillar.title}</h2>
                  <p className="text-gray-500 text-sm leading-relaxed">{pillar.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick proof points */}
      <section className="py-16 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {w.proof.map((item) => (
              <div key={item.label}>
                <p className="text-4xl font-black text-[#f97316]">{item.value}</p>
                <p className="text-gray-500 text-sm mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#f97316]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-white mb-4">{w.ctaTitle}</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">{w.ctaBody}</p>
          <Link href="/contact" className="bg-white text-[#f97316] hover:bg-gray-100 font-bold px-8 py-3.5 text-sm transition-colors inline-block">
            {w.ctaBtn1}
          </Link>
        </div>
      </section>
    </>
  )
}
