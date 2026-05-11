'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { m, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

// ─── Carousel config ────────────────────────────────────────────────────────
// Maps translation product indices to images (user-specified order)
const CAROUSEL_CONFIG = [
  { idx: 1,  image: '/applications/golf.jpg' },       // Golf Cart
  { idx: 9,  image: '/applications/lawnmower.jpg' },  // Lawn Mower
  { idx: 2,  image: '/applications/airport.jpg' },    // Airport GSE
  { idx: 0,  image: '/applications/karting.jpg' },    // Karting
  { idx: 7,  image: '/applications/bicycle.jpg' },    // Bicycle
  { idx: 5,  image: '/applications/atv.jpg' },        // ATV / Off-road
  { idx: 6,  image: '/applications/powersports.jpg' },// Electric Motorcycle
  { idx: 10, image: '/applications/trailer.jpg' },    // Trailer
  { idx: 3,  image: '/applications/warehouse.jpg' },  // Forklift
  { idx: 4,  image: '/applications/industrial.jpg' }, // Large Industrial
]

// ─── Vehicle type config for Tire Finder ───────────────────────────────────
const VEHICLE_TYPES = [
  { id: 'karting', label: 'Karting',            prodIdx: 0,  image: '/applications/karting.jpg',    sizes: ['10×4.50-5', '10×4.00-5', '11×5.50-5', '11×7.10-5', '6.0/18.0-10'] },
  { id: 'golf',    label: 'Golf Cart',           prodIdx: 1,  image: '/applications/golf.jpg',       sizes: ['18×8.50-8', '20×10-10', '22×11-10', '18×9.50-8', 'ST205/50-10'] },
  { id: 'gse',     label: 'Airport GSE',         prodIdx: 2,  image: '/applications/airport.jpg',    sizes: ['7.00-15', '10.00-20', '355/65R15', '315/70R15', '9.00-20'] },
  { id: 'forklift',label: 'Forklift',            prodIdx: 3,  image: '/applications/warehouse.jpg',  sizes: ['6.50-10', '7.00-12', '8.25-15', '23×9-10', '250-15'] },
  { id: 'industrial',label:'Large Industrial',   prodIdx: 4,  image: '/applications/industrial.jpg', sizes: ['23.5-25', '20.5-25', '17.5-25', '29.5-25', 'L5-25'] },
  { id: 'atv',     label: 'ATV / Off-road',      prodIdx: 5,  image: '/applications/atv.jpg',        sizes: ['25×8-12', '25×10-12', '22×7-10', '20×10-9', '27×11-14'] },
  { id: 'emoto',   label: 'Electric Motorcycle', prodIdx: 6,  image: '/applications/powersports.jpg',sizes: ['90/90-18', '100/90-17', '120/80-17', '130/70-17', '110/80-14'] },
  { id: 'bicycle', label: 'Bicycle',             prodIdx: 7,  image: '/applications/bicycle.jpg',    sizes: ['700×25c', '700×32c', '26×2.10', '27.5×2.25', '29×2.20'] },
  { id: 'lawn',    label: 'Lawn Mower',          prodIdx: 9,  image: '/applications/lawnmower.jpg',  sizes: ['20×8-8', '23×10.5-12', '26×12-12', '18×9.50-8', '16×7.50-8'] },
  { id: 'trailer', label: 'Trailer',             prodIdx: 10, image: '/applications/trailer.jpg',    sizes: ['ST205/75R15', 'ST225/75R15', 'ST235/80R16', 'ST175/80R13', 'ST215/75R14'] },
]

// ═══════════════════════════════════════════════════════════════════════════
// Carousel
// ═══════════════════════════════════════════════════════════════════════════
type Product = { name: string; category: string; desc: string; specs: readonly string[] }

function FeaturedCarousel({ allProducts, requestQuote }: { allProducts: readonly Product[]; requestQuote: string }) {
  const slides = CAROUSEL_CONFIG.map(c => ({ ...allProducts[c.idx], image: c.image }))
  const [cur, setCur] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => setCur(i => (i + 1) % slides.length), [slides.length])
  const prev = () => setCur(i => (i - 1 + slides.length) % slides.length)

  useEffect(() => {
    if (paused) return
    const t = setInterval(next, 6000)
    return () => clearInterval(t)
  }, [paused, next])

  const s = slides[cur]

  return (
    <div className="relative overflow-hidden" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <AnimatePresence mode="wait">
        <m.div
          key={cur}
          className="relative h-[500px] sm:h-[580px] flex items-end pb-16 sm:pb-20"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.55 }}
        >
          <m.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${s.image})` }}
            initial={{ scale: 1.04 }} animate={{ scale: 1 }}
            transition={{ duration: 6, ease: 'easeOut' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
            <div className="max-w-xl">
              <m.span
                className="inline-block text-xs font-bold uppercase tracking-widest text-[#f97316] bg-[#f97316]/15 border border-[#f97316]/40 px-3 py-1 mb-5"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.35 }}
              >{s.category}</m.span>

              <m.h2
                className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight"
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22, duration: 0.38 }}
              >{s.name}</m.h2>

              <m.p
                className="text-white/70 text-sm sm:text-base leading-relaxed mb-5 line-clamp-2 max-w-md"
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.38 }}
              >{s.desc}</m.p>

              <m.ul
                className="flex flex-wrap gap-x-5 gap-y-1.5 mb-7"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.35 }}
              >
                {s.specs.map(spec => (
                  <li key={spec} className="flex items-center gap-1.5 text-white/55 text-xs">
                    <span className="w-1 h-1 rounded-full bg-[#f97316] shrink-0" />{spec}
                  </li>
                ))}
              </m.ul>

              <m.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.35 }}>
                <Link href="/contact" className="btn-lg btn-primary">{requestQuote}</Link>
              </m.div>
            </div>
          </div>
        </m.div>
      </AnimatePresence>

      {/* Counter */}
      <div className="absolute top-6 right-6 text-white/40 text-xs font-semibold tabular-nums select-none">
        {String(cur + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>

      {/* Arrows */}
      <button onClick={prev} aria-label="Previous" className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/55 border border-white/20 flex items-center justify-center text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f97316]">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
      </button>
      <button onClick={next} aria-label="Next" className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/55 border border-white/20 flex items-center justify-center text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f97316]">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-2 flex-wrap justify-center max-w-xs">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCur(i)} aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none ${i === cur ? 'w-6 bg-[#f97316]' : 'w-1.5 bg-white/35 hover:bg-white/60'}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      {!paused && (
        <m.div key={`bar-${cur}`} className="absolute bottom-0 left-0 h-0.5 bg-[#f97316] origin-left"
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 6, ease: 'linear' }} style={{ width: '100%' }}
        />
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Tire Finder — By Vehicle
// ═══════════════════════════════════════════════════════════════════════════
function VehicleFinder({ products }: { products: readonly Product[] }) {
  const [selected, setSelected] = useState<string | null>(null)
  const vt = VEHICLE_TYPES.find(v => v.id === selected)
  const product = vt ? products[vt.prodIdx] : null
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  function pick(id: string) {
    setSelected(prev => prev === id ? null : id)
    setSelectedSize(null)
  }

  return (
    <div>
      <p className="text-gray-500 text-sm mb-6">Select your vehicle type to find compatible tires.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {VEHICLE_TYPES.map(v => (
          <button
            key={v.id}
            onClick={() => pick(v.id)}
            className={`flex flex-col items-center gap-2 p-0 border transition-all duration-200 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f97316] overflow-hidden ${
              selected === v.id
                ? 'border-[#f97316] text-[#b45309]'
                : 'border-gray-200 bg-white hover:border-gray-300 text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="relative w-full h-16 overflow-hidden">
              <Image src={v.image} alt={v.label} fill className="object-cover" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw" />
              {selected === v.id && <div className="absolute inset-0 bg-[#f97316]/20" />}
            </div>
            <span className="text-xs font-semibold leading-tight px-2 pb-3 pt-1">{v.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {product && vt && (
          <m.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
            className="mt-6 border border-[#f97316]/30 bg-orange-50/50 p-6 grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Product info */}
            <div>
              <span className="text-[#f97316] text-xs font-bold uppercase tracking-widest">{product.category}</span>
              <h3 className="text-gray-900 font-extrabold text-2xl mt-1 mb-3">{product.name}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{product.desc}</p>
              <ul className="space-y-1.5 mb-6">
                {product.specs.map(spec => (
                  <li key={spec} className="flex items-center gap-2 text-gray-700 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] shrink-0" />{spec}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn-md btn-primary">Request Quote →</Link>
            </div>

            {/* Common sizes */}
            <div>
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest mb-3">Common Sizes</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {vt.sizes.map(sz => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(prev => prev === sz ? null : sz)}
                    className={`px-3 py-1.5 text-xs font-mono font-semibold border transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f97316] ${
                      selectedSize === sz
                        ? 'bg-[#f97316] border-[#f97316] text-white'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-[#f97316] hover:text-[#b45309]'
                    }`}
                  >{sz}</button>
                ))}
              </div>
              <AnimatePresence>
                {selectedSize && (
                  <m.div
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-white border border-gray-200 p-4 text-sm">
                      <p className="text-gray-700 mb-3">
                        Interested in <span className="font-mono font-bold text-[#b45309]">{selectedSize}</span> for {product.name}?
                      </p>
                      <Link href={`/contact`} className="text-[#f97316] font-semibold text-sm hover:text-[#ea580c] transition-colors">
                        Send specification inquiry →
                      </Link>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
              <p className="text-gray-400 text-xs mt-4">Need a custom size? We manufacture to spec — <Link href="/contact" className="text-[#f97316] hover:underline">contact our engineering team</Link>.</p>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Tire Finder — By Size
// ═══════════════════════════════════════════════════════════════════════════
const WIDTHS  = ['4.00','5.00','6.00','6.50','7.00','8.25','9.00','10.00','11.00','90','100','110','120','130','175','185','195','205','215','225','235','250','315','355']
const PROFILES= ['—','30','35','40','45','50','55','60','65','70','75','80','90']
const RIMS    = ['5','8','9','10','12','13','14','15','16','17','18','20','22','24','25']

function SizeFinder() {
  const [width, setWidth] = useState('')
  const [profile, setProfile] = useState('')
  const [rim, setRim] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const sizeStr = [width, profile !== '—' && profile ? `/${profile}` : '', rim ? `R${rim}` : ''].filter(Boolean).join('')

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (width && rim) setSubmitted(true)
  }

  return (
    <div>
      <p className="text-gray-500 text-sm mb-6">Enter your tire dimensions to find matching products or request a specification quote.</p>
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 items-end mb-6">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Width</label>
          <select value={width} onChange={e => { setWidth(e.target.value); setSubmitted(false) }}
            className="border border-gray-300 px-3 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:border-[#f97316] min-w-[110px]">
            <option value="">Select…</option>
            {WIDTHS.map(w => <option key={w} value={w}>{w}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Aspect Ratio</label>
          <select value={profile} onChange={e => { setProfile(e.target.value); setSubmitted(false) }}
            className="border border-gray-300 px-3 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:border-[#f97316] min-w-[110px]">
            <option value="">Select…</option>
            {PROFILES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Rim Diameter</label>
          <select value={rim} onChange={e => { setRim(e.target.value); setSubmitted(false) }}
            className="border border-gray-300 px-3 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:border-[#f97316] min-w-[110px]">
            <option value="">Select…</option>
            {RIMS.map(r => <option key={r} value={r}>{r}"</option>)}
          </select>
        </div>
        <button type="submit" disabled={!width || !rim}
          className="btn-md btn-primary disabled:opacity-40 disabled:cursor-not-allowed">
          Search
        </button>
      </form>

      <AnimatePresence>
        {submitted && sizeStr && (
          <m.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="border border-gray-200 bg-white p-6"
          >
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Your specification</p>
            <p className="font-mono font-bold text-2xl text-gray-900 mb-3">{sizeStr}</p>
            <p className="text-gray-600 text-sm mb-5 max-w-lg">
              We manufacture specialty tires across a wide range of sizes. Send us your full specification
              (size, load rating, compound, annual volume) and our engineering team will confirm availability and pricing within 24 hours.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn-md btn-primary">Request Quote for {sizeStr}</Link>
              <Link href="/contact" className="btn-md btn-on-dark border border-gray-300 text-gray-700 hover:border-[#f97316] hover:text-[#b45309]">
                Discuss custom spec →
              </Link>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Tire Finder (tabbed container)
// ═══════════════════════════════════════════════════════════════════════════
const TABS = [
  { id: 'vehicle', label: 'Find by Vehicle', image: '/applications/karting.jpg' },
  { id: 'size',    label: 'Find by Size',    image: '/applications/industrial.jpg' },
] as const

function TireFinder({ products }: { products: readonly Product[] }) {
  const [tab, setTab] = useState<'vehicle' | 'size'>('vehicle')

  return (
    <section className="py-20 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="text-[#b45309] text-xs font-semibold uppercase tracking-widest mb-2">Tire Finder</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Find the Right Tire</h2>
        </div>

        {/* Tab bar */}
        <div className="flex gap-0 border-b border-gray-200 mb-8 overflow-x-auto">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors duration-150 focus:outline-none -mb-px ${
                tab === t.id
                  ? 'border-[#f97316] text-[#b45309]'
                  : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
              }`}
            >
              <div className="relative w-5 h-5 overflow-hidden rounded-sm shrink-0">
                <Image src={t.image} alt="" fill className="object-cover" sizes="20px" />
              </div>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <m.div
            key={tab}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
          >
            {tab === 'vehicle' && <VehicleFinder products={products} />}
            {tab === 'size'    && <SizeFinder />}
          </m.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// Page root
// ═══════════════════════════════════════════════════════════════════════════
export default function ProductsContent() {
  const { t } = useLanguage()
  const p = t.products

  return (
    <>
      {/* Page header */}
      <section className="bg-[#f97316] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-3">{p.headerTag}</p>
          <h1 className="text-5xl font-black text-white mb-4">{p.headerTitle}</h1>
          <p className="text-white/80 text-lg max-w-2xl">{p.headerBody}</p>
        </div>
      </section>

      {/* 10-product carousel */}
      <FeaturedCarousel allProducts={p.products} requestQuote={p.requestQuote} />

      {/* Tire Finder */}
      <TireFinder products={p.products} />

      {/* Custom manufacturing CTA */}
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
