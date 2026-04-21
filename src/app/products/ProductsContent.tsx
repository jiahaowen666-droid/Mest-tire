'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

const ICONS = ['🏎', '⛳', '✈', '🏭', '⚙', '🏍', '⚡', '🚲', '🛴', '🌿', '🚛']

export default function ProductsContent() {
  const { t } = useLanguage()
  const p = t.products
  const products = p.products

  const highlighted = products.filter((_, i) => i < 3)
  const rest = products.filter((_, i) => i >= 3)

  return (
    <>
      <section className="bg-[#f97316] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-3">{p.headerTag}</p>
          <h1 className="text-5xl font-black text-white mb-4">{p.headerTitle}</h1>
          <p className="text-white/80 text-lg max-w-2xl">{p.headerBody}</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-[#f97316] mb-8">{p.featuredLabel}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4">
            {highlighted.map((product, i) => (
              <div key={product.name} className="bg-white border-2 border-[#f97316] p-8 flex flex-col shadow-sm">
                <div className="text-4xl mb-4">{ICONS[i]}</div>
                <span className="text-[#f97316] text-xs font-semibold uppercase tracking-widest mb-2">{product.category}</span>
                <h3 className="text-gray-900 font-black text-2xl mb-3">{product.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">{product.desc}</p>
                <ul className="space-y-1.5 mb-6">
                  {product.specs.map((spec) => (
                    <li key={spec} className="flex items-center gap-2 text-gray-700 text-xs">
                      <span className="w-1 h-1 rounded-full bg-[#f97316] shrink-0" />
                      {spec}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="bg-[#f97316] hover:bg-[#ea580c] text-white text-sm font-semibold px-5 py-2.5 text-center transition-colors">
                  {p.requestQuote}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-8">{p.rangeLabel}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {rest.map((product, i) => (
              <div key={product.name} className="bg-white border border-gray-200 hover:border-[#f97316] transition-colors p-6 group shadow-sm">
                <div className="text-2xl mb-3">{ICONS[i + 3]}</div>
                <span className="text-gray-400 text-xs font-medium uppercase tracking-wide">{product.category}</span>
                <h3 className="text-gray-900 font-bold text-base mt-1 mb-2 group-hover:text-[#f97316] transition-colors">{product.name}</h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-4">{product.desc}</p>
                <ul className="space-y-1 mb-4">
                  {product.specs.map((spec) => (
                    <li key={spec} className="flex items-center gap-2 text-gray-500 text-xs">
                      <span className="w-1 h-1 rounded-full bg-[#f97316] shrink-0" />
                      {spec}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="text-[#f97316] text-xs font-semibold hover:text-[#ea580c] transition-colors">
                  {p.inquire}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#f97316]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-3">{p.customTag}</p>
            <h2 className="text-3xl font-black text-white mb-4">{p.customTitle}</h2>
            <p className="text-white/80 leading-relaxed mb-6">{p.customBody}</p>
            <Link href="/contact" className="bg-white text-[#f97316] hover:bg-gray-100 font-semibold px-8 py-3.5 text-sm transition-colors inline-block">
              {p.customBtn}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
