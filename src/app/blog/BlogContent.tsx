'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function BlogContent() {
  const { t } = useLanguage()
  const b = t.blog

  return (
    <>
      <section className="bg-[#f97316] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-3">{b.headerTag}</p>
          <h1 className="text-5xl font-black text-white mb-4">
            {b.headerTitle.split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
          </h1>
          <p className="text-white/80 text-lg max-w-2xl">{b.headerBody}</p>
        </div>
      </section>

      <section className="bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
            {b.categories.map((cat, i) => (
              <span
                key={cat}
                className={`text-xs font-semibold px-4 py-1.5 shrink-0 cursor-default transition-colors ${
                  i === 0 ? 'bg-[#f97316] text-white' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {b.posts.map((post) => (
              <article key={post.title} className="border border-gray-100 hover:border-[#f97316]/40 transition-colors group flex flex-col">
                <div className="bg-gray-50 h-44 flex items-center justify-center border-b border-gray-100 group-hover:bg-orange-50 transition-colors">
                  <span className="text-gray-300 text-xs font-semibold uppercase tracking-widest">{post.category}</span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[#f97316] text-xs font-semibold uppercase tracking-wide">{post.category}</span>
                    <span className="text-gray-300 text-xs">·</span>
                    <span className="text-gray-400 text-xs">{post.date}</span>
                  </div>
                  <h2 className="text-gray-900 font-black text-base leading-snug mb-3 group-hover:text-[#f97316] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">{post.excerpt}</p>
                  <div className="mt-5 pt-4 border-t border-gray-100">
                    <span className="text-[#f97316] text-xs font-semibold uppercase tracking-wide">{b.comingSoon}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-[#f97316] text-xs font-semibold uppercase tracking-widest mb-3">{b.contactTag}</p>
            <h2 className="text-3xl font-black text-gray-900 mb-4">{b.contactTitle}</h2>
            <p className="text-gray-500 text-base leading-relaxed mb-8">{b.contactBody}</p>
            <Link href="/contact" className="bg-[#f97316] hover:bg-[#ea580c] text-white text-sm font-semibold px-6 py-3 transition-colors inline-block">
              {b.contactBtn}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
