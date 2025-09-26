import { NextRequest, NextResponse } from 'next/server'

/**
 * 🌍 AllInConverter - i18n Middleware
 * 
 * SEO-SAFE automatic language detection and redirection:
 * 
 * ✅ FIRST VISIT ONLY: Redirect based on Accept-Language header
 * ✅ COOKIE PERSISTENCE: Save user choice for 1 year
 * ✅ BOT PROTECTION: Never redirect bots (Googlebot, Bingbot, etc.)
 * ✅ SEO SAFE: Bots can crawl all language versions via hreflang
 * 
 * Flow:
 * 1. Bot? → No redirect (SEO safety)
 * 2. Has cookie? → Redirect to saved language
 * 3. First visit? → Detect from Accept-Language → Set cookie → Redirect
 * 4. Already localized? → Skip middleware
 */

const locales = ['en', 'hu', 'sk', 'de', 'pl', 'ro', 'cs']
const defaultLocale = 'en'

// Comprehensive bot detection patterns (SEO-safe)
const botPatterns = [
  'googlebot', 'bingbot', 'duckduckbot', 'yandexbot', 'baiduspider',
  'facebookexternalhit', 'twitterbot', 'linkedinbot', 'whatsapp',
  'telegrambot', 'slackbot', 'discordbot', 'applebot', 'crawler',
  'spider', 'bot', 'crawling', 'indexing', 'seo'
]

function isBot(userAgent: string): boolean {
  const ua = userAgent.toLowerCase()
  return botPatterns.some(pattern => ua.includes(pattern))
}

function getLocaleFromAcceptLanguage(acceptLanguage: string): string {
  // Parse Accept-Language header with proper quality values
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [locale, qValue] = lang.trim().split(';q=')
      return {
        locale: locale.split('-')[0].toLowerCase(), // Extract language code
        quality: qValue ? parseFloat(qValue) : 1.0
      }
    })
    .sort((a, b) => b.quality - a.quality)

  // Find first supported locale
  for (const { locale } of languages) {
    if (locales.includes(locale as any)) {
      return locale
    }
  }

  return defaultLocale
}

function getLocaleFromGeoIP(request: NextRequest): string {
  // In production, you would use a GeoIP service
  // For now, return default locale
  return defaultLocale
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const userAgent = request.headers.get('user-agent') || ''
  
  // Skip middleware for static files, API routes, and already localized paths
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/robots') ||
    pathname.startsWith('/sitemap') ||
    pathname.match(/^\/[a-z]{2}(-|$)/) // Already localized path
  ) {
    return NextResponse.next()
  }

  // 🚨 CRITICAL: Don't redirect bots - SEO safety!
  if (isBot(userAgent)) {
    return NextResponse.next()
  }

  // Check if user has language preference cookie (persistent choice)
  const cookieLocale = request.cookies.get('lang')?.value
  if (cookieLocale && locales.includes(cookieLocale as any)) {
    const url = request.nextUrl.clone()
    url.pathname = `/${cookieLocale}${pathname}`
    return NextResponse.redirect(url, 302)
  }

  // First visit: Detect locale from Accept-Language header
  const acceptLanguage = request.headers.get('accept-language') || ''
  let detectedLocale = getLocaleFromAcceptLanguage(acceptLanguage)
  
  // Fallback to GeoIP if Accept-Language doesn't help
  if (detectedLocale === defaultLocale) {
    detectedLocale = getLocaleFromGeoIP(request)
  }

  // Redirect to localized path (first visit only)
  const url = request.nextUrl.clone()
  url.pathname = `/${detectedLocale}${pathname}`
  
  const response = NextResponse.redirect(url, 302)
  
  // Set language cookie for future visits (1 year persistence)
  response.cookies.set('lang', detectedLocale, {
    maxAge: 31536000, // 1 year
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/'
  })

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt, sitemap.xml (SEO files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.*).*)',
  ],
}
