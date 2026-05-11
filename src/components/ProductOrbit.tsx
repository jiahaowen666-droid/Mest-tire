'use client'

import { m } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

const PRODUCT_IMAGES = [
  '/applications/karting.jpg',
  '/applications/golf.jpg',
  '/applications/airport.jpg',
  '/applications/warehouse.jpg',
  '/applications/powersports.jpg',
  '/applications/oem.jpg',
]

export default function ProductOrbit() {
  const { t } = useLanguage()
  const PRODUCTS = t.orbit.products

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-14 gap-4">
          <div>
            <p className="text-[#b45309] text-xs font-semibold uppercase tracking-widest mb-2">{t.orbit.tag}</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
              {t.orbit.title}<br />{t.orbit.titleLine2}
            </h2>
          </div>
          <Link
            href="/products"
            className="text-[#b45309] hover:text-[#92400e] text-sm font-semibold transition-colors whitespace-nowrap"
          >
            {t.orbit.viewAll}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product, i) => (
            <m.div
              key={product.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.07, duration: 0.4, ease: 'easeOut' }}
            >
              <Link
                href="/products"
                className="group flex flex-col bg-white border border-gray-200 hover:border-[#f97316] hover:shadow-xl transition-all duration-300 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f97316] focus-visible:ring-offset-2"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-52">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${PRODUCT_IMAGES[i]})` }}
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500" />
                  <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-widest text-white bg-[#f97316] px-2.5 py-1">
                    {product.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6 border-l-4 border-transparent group-hover:border-[#f97316] transition-colors duration-300">
                  <h3 className="text-gray-900 font-extrabold text-xl mb-2 tracking-tight group-hover:text-[#b45309] transition-colors duration-200">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">
                    {product.desc}
                  </p>
                  <div className="flex items-center gap-1.5 mt-5 text-[#b45309] text-sm font-semibold">
                    <span>{t.orbit.explore}</span>
                    <svg
                      className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform duration-200"
                      fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"
                    >
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
