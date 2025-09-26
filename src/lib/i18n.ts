import { locales, defaultLocale } from './config'

export type Locale = typeof locales[number]

export interface LocaleConfig {
  code: string
  name: string
  flag: string
  dir: 'ltr' | 'rtl'
}

export const localeConfigs: Record<Locale, LocaleConfig> = {
  en: { code: 'en', name: 'English', flag: '🇺🇸', dir: 'ltr' },
  hu: { code: 'hu', name: 'Magyar', flag: '🇭🇺', dir: 'ltr' },
  sk: { code: 'sk', name: 'Slovenčina', flag: '🇸🇰', dir: 'ltr' },
  de: { code: 'de', name: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  pl: { code: 'pl', name: 'Polski', flag: '🇵🇱', dir: 'ltr' },
  ro: { code: 'ro', name: 'Română', flag: '🇷🇴', dir: 'ltr' },
  cs: { code: 'cs', name: 'Čeština', flag: '🇨🇿', dir: 'ltr' }
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}

export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split('/')
  const firstSegment = segments[1]
  
  if (firstSegment && isValidLocale(firstSegment)) {
    return firstSegment as Locale
  }
  
  return defaultLocale
}

export function removeLocaleFromPathname(pathname: string): string {
  const segments = pathname.split('/')
  const firstSegment = segments[1]
  
  if (firstSegment && isValidLocale(firstSegment)) {
    return '/' + segments.slice(2).join('/')
  }
  
  return pathname
}

export function addLocaleToPathname(pathname: string, locale: Locale): string {
  if (pathname === '/') {
    return `/${locale}`
  }
  
  return `/${locale}${pathname}`
}

export function getAlternateLocales(currentLocale: Locale, pathname: string) {
  const cleanPathname = removeLocaleFromPathname(pathname)
  
  return locales.map(locale => ({
    locale,
    href: addLocaleToPathname(cleanPathname, locale),
    isCurrent: locale === currentLocale
  }))
}
