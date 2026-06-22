/**
 * LanguageContext — app-level language state persisted in localStorage.
 *
 * @requirement *
 * @scope shell
 */
import React, { createContext, useContext, useState } from 'react'
import { translations, type Lang } from '../i18n/translations'

const STORAGE_KEY = 'b4c_lang'

interface LangContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: typeof translations.nl
}

const LangContext = createContext<LangContextValue>({
  lang: 'nl',
  setLang: () => {},
  t: translations.nl,
})

export function useLang(): LangContextValue {
  return useContext(LangContext)
}

export function LanguageProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [lang, setLangState] = useState<Lang>(() => {
    return (localStorage.getItem(STORAGE_KEY) as Lang) ?? 'nl'
  })

  function setLang(l: Lang) {
    localStorage.setItem(STORAGE_KEY, l)
    setLangState(l)
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] as typeof translations.nl }}>
      {children}
    </LangContext.Provider>
  )
}
