'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

const SIZE_LG = 420 // AUDIT #4.1 — was hard-coded 520, overflows 1024–1100px
const SIZE_XL = 520

// AUDIT #2 + #6.1 — replaced emoji with matching outline SVG icons (strokeWidth 1.5),
// consistent with ApplicationSection icon language.
const PRODUCT_ICONS = [
  // Karting — speedometer / gauge
  <svg key="kart" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 13.5a9 9 0 1 1 18 0M3 13.5h18M7.5 13.5V9m4.5 4.5V6m4.5 7.5V9" />
  </svg>,
  // Golf cart — sun/settings (leisure)
  <svg key="golf" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
  </svg>,
  // Airport GSE — paper airplane
  <svg key="gse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
  </svg>,
  // Industrial / forklift — archive box
  <svg key="fork" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
  </svg>,
  // Motorcycle — truck/bike silhouette
  <svg key="moto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="5.5" cy="17.5" r="3.5" />
    <circle cx="18.5" cy="17.5" r="3.5" />
    <path d="M5.5 17.5h13M10 17.5l3-9h4M13 8.5h2.5" />
  </svg>,
  // OEM / Custom — cog
  <svg key="oem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.43l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
    <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>,
]

function getPosition(index: number, total: number, size: number) {
  const center = size / 2
  const radius = size * 0.362  // keep proportional to SIZE
  const angle = (index * 360) / total - 90
  const rad = (angle * Math.PI) / 180
  return {
    x: center + Math.cos(rad) * radius,
    y: center + Math.sin(rad) * radius,
    radius,
    center,
  }
}

export default function ProductOrbit() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const { t } = useLanguage()
  const PRODUCTS = t.orbit.products

  // AUDIT #4.1 — responsive sizing. Use xl: 520 via Tailwind arbitrary variant.
  // Render two SVG stacks? Simpler: use a CSS custom-property + viewBox stays 1:1.
  const SIZE = SIZE_LG

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16 gap-4">
          <div>
            <p className="text-[#b45309] text-xs font-semibold uppercase tracking-widest mb-2">{t.orbit.tag}</p>
            {/* AUDIT #1.1 + #3.2 — major section h2: text-4xl sm:text-5xl, font-extrabold */}
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
              {t.orbit.title}<br />{t.orbit.titleLine2}
            </h2>
          </div>
          <Link href="/products" className="text-[#b45309] hover:text-[#92400e] text-sm font-semibold transition-colors whitespace-nowrap">
            {t.orbit.viewAll}
          </Link>
        </div>

        {/* Desktop: orbit — AUDIT #4.1 responsive size via xl: breakpoint */}
        <div className="hidden lg:flex items-center gap-12 xl:gap-20">
          <div
            className="relative flex-shrink-0 w-[420px] h-[420px] xl:w-[520px] xl:h-[520px]"
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* AUDIT #5.1 — fixed pause bug: transition now reacts to isPaused */}
            <motion.svg
              className="absolute inset-0 pointer-events-none"
              width="100%" height="100%"
              viewBox={`0 0 ${SIZE} ${SIZE}`}
              animate={{ rotate: isPaused ? undefined : 360 }}
              transition={
                isPaused
                  ? { duration: 0 }
                  : { duration: 36, repeat: Infinity, ease: 'linear' }
              }
              style={{ transformOrigin: 'center' }}
            >
              <circle cx={SIZE / 2} cy={SIZE / 2} r={SIZE * 0.362} fill="none" stroke="#f97316" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="6 10" />
              <circle cx={SIZE / 2} cy={SIZE / 2} r={SIZE * 0.362 * 0.55} fill="none" stroke="#d1d5db" strokeWidth="1" strokeOpacity="0.5" strokeDasharray="2 6" />
              {PRODUCTS.map((_, i) => {
                const angle = (i * 360) / PRODUCTS.length - 90
                const rad = (angle * Math.PI) / 180
                const r = SIZE * 0.362
                const x1 = SIZE / 2 + Math.cos(rad) * (r - 10)
                const y1 = SIZE / 2 + Math.sin(rad) * (r - 10)
                const x2 = SIZE / 2 + Math.cos(rad) * (r + 10)
                const y2 = SIZE / 2 + Math.sin(rad) * (r + 10)
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#f97316" strokeWidth="1.5" strokeOpacity="0.4" />
              })}
            </motion.svg>

            <svg className="absolute inset-0 pointer-events-none" width="100%" height="100%" viewBox={`0 0 ${SIZE} ${SIZE}`}>
              {(() => {
                const pos = getPosition(activeIndex, PRODUCTS.length, SIZE)
                return (
                  <motion.line
                    key={activeIndex}
                    x1={pos.center} y1={pos.center} x2={pos.x} y2={pos.y}
                    stroke="#f97316" strokeWidth="1.5" strokeOpacity="0.6" strokeDasharray="4 5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                )
              })()}
            </svg>

            {PRODUCTS.map((product, i) => {
              const pos = getPosition(i, PRODUCTS.length, SIZE)
              const isActive = i === activeIndex
              const pctX = (pos.x / SIZE) * 100
              const pctY = (pos.y / SIZE) * 100
              return (
                <button
                  key={product.name}
                  // AUDIT #5.4 — focus-visible ring (was focus:outline-none with no replacement)
                  className="absolute focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f97316] focus-visible:ring-offset-2 group"
                  style={{ left: `${pctX}%`, top: `${pctY}%`, transform: 'translate(-50%, -50%)' }}
                  onMouseEnter={() => { setActiveIndex(i); setIsPaused(true) }}
                  onClick={() => setActiveIndex(i)}
                  aria-label={product.name}
                >
                  <motion.div
                    animate={{ scale: isActive ? 1.15 : 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="flex flex-col items-center gap-1.5"
                  >
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
                      isActive ? 'bg-[#f97316] shadow-orange-200 shadow-lg ring-2 ring-[#f97316]/30' : 'bg-white border border-gray-200 group-hover:border-orange-300'
                    }`}>
                      {/* AUDIT #2 — SVG icon, white when active, gray otherwise */}
                      <div className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-700'}`}>
                        {PRODUCT_ICONS[i]}
                      </div>
                    </div>
                    <span className={`text-xs font-semibold text-center leading-tight max-w-[88px] transition-colors duration-200 ${
                      isActive ? 'text-[#b45309]' : 'text-gray-600 group-hover:text-gray-900'
                    }`}>
                      {product.name}
                    </span>
                  </motion.div>
                </button>
              )
            })}

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white border border-gray-200 shadow-md flex flex-col items-center justify-center text-center select-none">
              <span className="text-[#f97316] font-black text-2xl leading-none">6</span>
              {/* AUDIT #3.1 — was text-[10px] (non-token, unreadable). Now text-xs + normal tracking. */}
              <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider leading-tight mt-1">
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
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#b45309] bg-orange-50 border border-orange-100 px-2.5 py-1 mb-4">
                  {PRODUCTS[activeIndex].tag}
                </span>
                {/* AUDIT #3.2 — font-extrabold instead of font-black on supporting h3 */}
                <h3 className="text-3xl font-extrabold text-gray-900 mb-3 leading-tight tracking-tight">{PRODUCTS[activeIndex].name}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{PRODUCTS[activeIndex].desc}</p>

                <div className="flex items-center gap-2 mt-8">
                  {PRODUCTS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f97316] focus-visible:ring-offset-2 ${i === activeIndex ? 'w-6 bg-[#f97316]' : 'w-1.5 bg-gray-300 hover:bg-gray-400'}`}
                      aria-label={`Select ${PRODUCTS[i].name}`}
                    />
                  ))}
                </div>

                <Link href="/products" className="inline-block mt-6 text-sm font-semibold text-[#b45309] hover:text-[#92400e] transition-colors">
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
              {/* AUDIT #2 — SVG instead of emoji on mobile cards too */}
              <div className="w-8 h-8 mb-3 text-gray-700">{PRODUCT_ICONS[i]}</div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#b45309] mb-1">{product.tag}</div>
              <h3 className="text-gray-900 font-bold text-base mb-1.5 group-hover:text-[#b45309] transition-colors">{product.name}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{product.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
