'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const statValues = [
  { value: 30, suffix: '+' },
  { value: 11, suffix: '' },
  { value: 3, suffix: '' },
  { value: 50, suffix: '+' },
]

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1500
    const step = 16
    const increment = target / (duration / step)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, step)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function StatsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const { t } = useLanguage()

  return (
    <section className="bg-[#f97316]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statValues.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <p className="text-4xl font-black text-white">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-white/80 text-sm mt-1">{t.stats.labels[i]}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
