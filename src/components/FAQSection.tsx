'use client'

import { useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)
  const { t } = useLanguage()
  const faqs = t.faq.items

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#b45309] text-xs font-semibold uppercase tracking-widest mb-2">{t.faq.sectionTag}</p>
          {/* AUDIT #1.1 + #3.2 — supporting section: text-3xl sm:text-4xl font-extrabold */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">{t.faq.title}</h2>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-gray-100 border-t border-b border-gray-100">
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <div key={i}>
                <button
                  className="w-full text-left py-5 flex items-start justify-between gap-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f97316] focus-visible:ring-offset-2"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="text-gray-900 font-semibold text-sm sm:text-base leading-snug group-hover:text-[#b45309] transition-colors">
                    {faq.q}
                  </span>
                  <span className="flex-shrink-0 mt-0.5 w-7 h-7 rounded-full bg-[#f97316] flex items-center justify-center">
                    <svg
                      className={`w-3.5 h-3.5 text-white transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>
                {/* AUDIT #5.3 — replaced max-height CSS transition with Framer Motion height auto */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-gray-600 text-sm leading-relaxed">
                        {faq.a}
                      </p>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
