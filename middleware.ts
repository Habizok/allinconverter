import { NextRequest, NextResponse } from 'next/server'

const locales = ['en', 'hu', 'sk', 'de', 'pl', 'ro', 'cs']
const defaultLocale = 'en'

// Bot detection patterns
const botPatterns = [
  'googlebot', 'bingbot', 'duckduckbot', 'yandex', 'baidu',
  'facebookexternalhit', 'twitterbot', 'linkedinbot', 'whatsapp',
  'telegrambot', 'slackbot', 'discordbot', 'applebot'
]

function isBot(userAgent: string): boolean {
  return botPatterns.some(pattern => 
    userAgent.toLowerCase().includes(pattern)
  )
}

function getLocaleFromAcceptLanguage(acceptLanguage: string): string {
  // Parse Accept-Language header
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [locale, qValue] = lang.trim().split(';q=')
      return {
        locale: locale.split('-')[0], // Extract language code
        quality: qValue ? parseFloat(qValue) : 1.0
      }
    })
    .sort((a, b) => b.quality - a.quality)

  // Find first supported locale
  for (const { locale } of languages) {
    if (locales.includes(locale)) {
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

  // Don't redirect bots
  if (isBot(userAgent)) {
    return NextResponse.next()
  }

  // Check if user has language preference cookie
  const cookieLocale = request.cookies.get('lang')?.value
  if (cookieLocale && locales.includes(cookieLocale)) {
    const url = request.nextUrl.clone()
    url.pathname = `/${cookieLocale}${pathname}`
    return NextResponse.redirect(url, 302)
  }

  // Detect locale from Accept-Language header
  const acceptLanguage = request.headers.get('accept-language') || ''
  let detectedLocale = getLocaleFromAcceptLanguage(acceptLanguage)
  
  // Fallback to GeoIP if Accept-Language doesn't help
  if (detectedLocale === defaultLocale) {
    detectedLocale = getLocaleFromGeoIP(request)
  }

  // Redirect to localized path
  const url = request.nextUrl.clone()
  url.pathname = `/${detectedLocale}${pathname}`
  
  const response = NextResponse.redirect(url, 302)
  
  // Set language cookie
  response.cookies.set('lang', detectedLocale, {
    maxAge: 31536000, // 1 year
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
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
