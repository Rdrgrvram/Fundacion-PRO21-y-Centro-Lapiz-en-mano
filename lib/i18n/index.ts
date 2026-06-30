export const locales = ['es', 'en'] as const
export type Locale = typeof locales[number]
export const defaultLocale: Locale = 'es'

import es from './es'
import en from './en'

const translations = { es, en } as const

export type TranslationKey = keyof typeof es

export function getTranslation(lang: Locale) {
  return translations[lang] ?? translations[defaultLocale]
}

// Uso: const t = getTranslation(lang); t('nav.home')
