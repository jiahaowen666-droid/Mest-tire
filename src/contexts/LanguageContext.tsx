'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { translations, type Lang } from '@/lib/translations'

type LanguageContextType = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: typeof translations['en']
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    const saved = localStorage.getItem('mest-lang') as Lang | null
    if (saved && ['en', 'es', 'ru'].includes(saved)) {
      setLangState(saved)
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = 'ltr'
  }, [lang])

  function setLang(l: Lang) {
    setLangState(l)
    localStorage.setItem('mest-lang', l)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] as typeof translations['en'] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
