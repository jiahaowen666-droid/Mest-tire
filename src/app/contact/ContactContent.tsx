'use client'

import ContactForm from './ContactForm'
import { useLanguage } from '@/contexts/LanguageContext'

const officeEmails = ['stanley@mesttire.com', 'denzel@mesttire.com', 'Alan@mesttire.com']
const officePhones = ['+86 186 3010 7074', '+1 469 953 9887', '+61 490 412 627']

export default function ContactContent() {
  const { t } = useLanguage()
  const c = t.contact

  return (
    <>
      <section className="bg-[#f97316] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-3">{c.headerTag}</p>
          <h1 className="text-5xl font-black text-white mb-4">{c.headerTitle}</h1>
          <p className="text-white/80 text-lg max-w-xl">{c.headerBody}</p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3 bg-white p-8 shadow-sm border border-gray-200">
              <h2 className="text-gray-900 font-black text-2xl mb-6">{c.formTitle}</h2>
              <ContactForm />
            </div>

            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white border border-gray-200 p-6 shadow-sm">
                <h3 className="text-gray-900 font-bold mb-2">{c.whatsappTitle}</h3>
                <p className="text-gray-500 text-sm mb-4">{c.whatsappBody}</p>
                <a
                  href="https://wa.me/8618630107074"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-3 text-sm transition-colors w-full justify-center"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {c.whatsappBtn}
                </a>
              </div>

              <div>
                <h3 className="text-gray-900 font-bold text-sm uppercase tracking-widest mb-4">{c.officesTitle}</h3>
                <div className="space-y-4">
                  {c.offices.map((office, i) => (
                    <div key={office.name} className="bg-white border-l-4 border-[#f97316] p-5 shadow-sm">
                      <p className="text-[#f97316] text-xs font-semibold uppercase tracking-wide mb-1">{office.name}</p>
                      <p className="text-gray-900 text-sm font-medium mb-2">{office.location}</p>
                      <a href={`tel:${officePhones[i]}`} className="text-gray-500 hover:text-gray-900 text-xs block transition-colors">{officePhones[i]}</a>
                      <a href={`mailto:${officeEmails[i]}`} className="text-gray-500 hover:text-[#f97316] text-xs block mt-0.5 transition-colors">{officeEmails[i]}</a>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-gray-900 font-semibold text-sm">{c.responseTitle}</p>
                </div>
                <p className="text-gray-600 text-xs leading-relaxed">{c.responseBody}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-[#f97316] text-xs font-semibold uppercase tracking-widest mb-3">{c.distributor.tag}</p>
              <h2 className="text-4xl font-black text-white mb-6 leading-tight">{c.distributor.title}</h2>
              <p className="text-gray-400 text-base leading-relaxed mb-8">{c.distributor.body}</p>
              <a
                href={`mailto:stanley@mesttire.com?subject=Distributor%20Application&body=Hi%2C%20I%20am%20interested%20in%20becoming%20a%20Mest%20Tire%20distributor.%0A%0ACompany%3A%0ARegion%2FTerritory%3A%0ACurrent%20product%20lines%3A%0AAnnual%20tire%20volume%3A`}
                className="inline-block bg-[#f97316] hover:bg-[#ea580c] text-white font-bold px-8 py-4 text-sm transition-colors"
              >
                {c.distributor.cta}
              </a>
              <p className="text-gray-500 text-xs mt-3">{c.distributor.ctaNote}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {c.distributor.benefits.map((benefit) => (
                <div key={benefit.title} className="bg-gray-800 border border-gray-700 p-6">
                  <div className="w-8 h-8 bg-[#f97316]/10 border border-[#f97316]/30 flex items-center justify-center mb-4">
                    <svg className="w-4 h-4 text-[#f97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-white font-bold text-sm mb-2">{benefit.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
