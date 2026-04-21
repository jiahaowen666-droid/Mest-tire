'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

const ICONS = ['🏎', '⛳', '✈', '🏭', '🏍', '⚙']

const SIZE = 520
const CENTER = SIZE / 2
const RADIUS = 188

function getPosition(index: number, total: number) {
  const angle = (index * 360) / total - 90
  const rad = (angle * Math.PI) / 180
  return {
    x: CENTER + Math.cos(rad) * RADIUS,
    y: CENTER + Math.sin(rad) * RADIUS,
  }
}

export default function ProductOrbit() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const { t } = useLanguage()
  const PRODUCTS = t.orbit.products

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16 gap-4">
          <div>
            <p className="text-[#f97316] text-xs font-semibold uppercase tracking-widest mb-2">{t.orbit.tag}</p>
            <h2 className="text-4xl font-black text-gray-900">
              {t.orbit.title}<br />{t.orbit.titleLine2}
            </h2>
          </div>
          <Link href="/products" className="text-[#f97316] hover:text-[#ea580c] text-sm font-semibold transition-colors whitespace-nowrap">
            {t.orbit.viewAll}
          </Link>
        </div>

        {/* Desktop: orbit */}
        <div className="hidden lg:flex items-center gap-12 xl:gap-20">
          <div
            className="relative flex-shrink-0"
            style={{ width: SIZE, height: SIZE }}
            onMouseLeave={() => setIsPaused(false)}
          >
            <motion.svg
              className="absolute inset-0 pointer-events-none"
              width={SIZE} height={SIZE}
              viewBox={`0 0 ${SIZE} ${SIZE}`}
              animate={{ rotate: 360 }}
              transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: 'center' }}
              data-paused={isPaused}
            >
              <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="#f97316" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="6 10" />
              <circle cx={CENTER} cy={CENTER} r={RADIUS * 0.55} fill="none" stroke="#d1d5db" strokeWidth="1" strokeOpacity="0.5" strokeDasharray="2 6" />
              {PRODUCTS.map((_, i) => {
                const angle = (i * 360) / PRODUCTS.length - 90
                const rad = (angle * Math.PI) / 180
                const x1 = CENTER + Math.cos(rad) * (RADIUS - 10)
                const y1 = CENTER + Math.sin(rad) * (RADIUS - 10)
                const x2 = CENTER + Math.cos(rad) * (RADIUS + 10)
                const y2 = CENTER + Math.sin(rad) * (RADIUS + 10)
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#f97316" strokeWidth="1.5" strokeOpacity="0.4" />
              })}
            </motion.svg>

            <svg className="absolute inset-0 pointer-events-none" width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
              {(() => {
                const pos = getPosition(activeIndex, PRODUCTS.length)
                return (
                  <motion.line
                    key={activeIndex}
                    x1={CENTER} y1={CENTER} x2={pos.x} y2={pos.y}
                    stroke="#f97316" strokeWidth="1.5" strokeOpacity="0.6" strokeDasharray="4 5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                )
              })()}
            </svg>

            {PRODUCTS.map((product, i) => {
              const pos = getPosition(i, PRODUCTS.length)
              const isActive = i === activeIndex
              return (
                <button
                  key={product.name}
                  className="absolute focus:outline-none group"
                  style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)' }}
                  onMouseEnter={() => { setActiveIndex(i); setIsPaused(true) }}
                  onClick={() => setActiveIndex(i)}
                  aria-label={product.name}
                >
                  <motion.div
                    animate={{ scale: isActive ? 1.15 : 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="flex flex-col items-center gap-1.5"
                  >
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all duration-300 shadow-sm ${
                      isActive ? 'bg-[#f97316] shadow-orange-200 shadow-lg ring-2 ring-[#f97316]/30' : 'bg-white border border-gray-200 group-hover:border-orange-300'
                    }`}>
                      {ICONS[i]}
                    </div>
                    <span className={`text-xs font-semibold text-center leading-tight max-w-[88px] transition-colors duration-200 ${
                      isActive ? 'text-[#f97316]' : 'text-gray-500 group-hover:text-gray-800'
                    }`}>
                      {product.name}
                    </span>
                  </motion.div>
                </button>
              )
            })}

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white border border-gray-200 shadow-md flex flex-col items-center justify-center text-center select-none">
              <span className="text-[#f97316] font-black text-2xl leading-none">6</span>
              <span className="text-gray-400 text-[10px] font-medium uppercase tracking-widest leading-tight mt-0.5">
                {t.orbit.productLines.split('\n').map((line, i) => <span key={i} className="block">{line}</span>)}
              </span>
            </div>
          </div>

          <div className="flex-1 max-w-xs xl:max-w-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
              >
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#f97316] bg-orange-50 border border-orange-100 px-2.5 py-1 mb-4">
                  {PRODUCTS[activeIndex].tag}
                </span>
                <h3 className="text-3xl font-black text-gray-900 mb-3 leading-tight">{PRODUCTS[activeIndex].name}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{PRODUCTS[activeIndex].desc}</p>

                <div className="flex items-center gap-2 mt-8">
                  {PRODUCTS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-6 bg-[#f97316]' : 'w-1.5 bg-gray-300 hover:bg-gray-400'}`}
                      aria-label={`Select ${PRODUCTS[i].name}`}
                    />
                  ))}
                </div>

                <Link href="/products" className="inline-block mt-6 text-sm font-semibold text-[#f97316] hover:text-[#ea580c] transition-colors">
                  {t.orbit.explore} {PRODUCTS[activeIndex].name} →
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile grid */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: 'easeOut' }}
              className="bg-white border border-gray-200 hover:border-[#f97316] transition-colors duration-200 p-6 group"
            >
              <div className="text-3xl mb-3">{ICONS[i]}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#f97316] mb-1">{product.tag}</div>
              <h3 className="text-gray-900 font-bold text-base mb-1.5 group-hover:text-[#f97316] transition-colors">{product.name}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{product.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
