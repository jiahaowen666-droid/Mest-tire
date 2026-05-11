'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

const productOptionsEN = [
  'Karting Tires', 'Golf Cart Tires', 'Airport GSE Tires', 'Forklift Tires',
  'Large Industrial Tires', 'Motorcycle Tires', 'Electric Motorcycle Tires',
  'Bicycle Tires', 'Electric Scooter Tires', 'Lawn Mower Tires', 'Trailer Tires', 'Custom / Not Listed',
]

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', product: '', quantity: '', message: '' })
  const { t } = useLanguage()
  const f = t.form
  const productOptions = t.products.products.map((p) => p.name)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, product: productOptionsEN[productOptions.indexOf(form.product as typeof productOptions[number])] ?? form.product }),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', company: '', email: '', phone: '', product: '', quantity: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClass = 'w-full bg-white border border-gray-300 text-gray-900 placeholder-gray-400 px-4 py-3 text-sm focus:outline-none focus:border-[#f97316] transition-colors'

  if (status === 'success') {
    return (
      <div className="bg-orange-50 border border-orange-200 p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-[#f97316] flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-gray-900 font-bold text-lg mb-2">{f.successTitle}</h3>
        <p className="text-gray-600 text-sm mb-6">{f.successBody}</p>
        <button onClick={() => setStatus('idle')} className="text-[#f97316] text-sm font-semibold hover:text-[#ea580c] transition-colors">
          {f.sendAnother}
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-600 text-xs font-semibold uppercase tracking-wide mb-1.5">
            {f.fullName} <span className="text-[#f97316]">*</span>
          </label>
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="John Smith" required className={inputClass} />
        </div>
        <div>
          <label className="block text-gray-600 text-xs font-semibold uppercase tracking-wide mb-1.5">{f.company}</label>
          <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="ABC Karting Club" className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-600 text-xs font-semibold uppercase tracking-wide mb-1.5">
            {f.email} <span className="text-[#f97316]">*</span>
          </label>
          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@company.com" required className={inputClass} />
        </div>
        <div>
          <label className="block text-gray-600 text-xs font-semibold uppercase tracking-wide mb-1.5">{f.phone}</label>
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+1 555 000 0000" className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="product" className="block text-gray-600 text-xs font-semibold uppercase tracking-wide mb-1.5">{f.product}</label>
          <select id="product" name="product" value={form.product} onChange={handleChange} className={inputClass}>
            <option value="">{f.selectProduct}</option>
            {productOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-600 text-xs font-semibold uppercase tracking-wide mb-1.5">{f.quantity}</label>
          <input type="text" name="quantity" value={form.quantity} onChange={handleChange} placeholder={f.quantityPlaceholder} className={inputClass} />
        </div>
      </div>

      <div>
        <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wide mb-1.5">
          {f.message} <span className="text-[#f97316]">*</span>
        </label>
        <textarea name="message" value={form.message} onChange={handleChange} placeholder={f.messagePlaceholder} required rows={5} className={inputClass + ' resize-none'} />
      </div>

      {status === 'error' && <p className="text-red-400 text-sm">{f.error}</p>}

      <button type="submit" disabled={status === 'sending'} className="w-full bg-[#f97316] hover:bg-[#ea580c] disabled:opacity-50 text-white font-bold py-3.5 text-sm transition-colors">
        {status === 'sending' ? f.sending : f.submit}
      </button>

      <p className="text-gray-400 text-xs text-center">{f.footer}</p>
    </form>
  )
}
