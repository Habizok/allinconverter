import { Locale, getAlternateLocales } from './i18n'
import { siteConfig, seoConfig } from './config'

export interface SEOProps {
  title?: string
  description?: string
  locale: Locale
  pathname: string
  image?: string
  noindex?: boolean
}

export function generateSEOTags({
  title,
  description,
  locale,
  pathname,
  image,
  noindex = false
}: SEOProps) {
  const siteUrl = siteConfig.url
  const cleanPathname = pathname.replace(/^\/[a-z]{2}/, '') || '/'
  const canonicalPath = `/${locale}${cleanPathname}`
  const canonicalUrl = `${siteUrl}${canonicalPath}`
  
  const finalTitle = title 
    ? `${title} | ${siteConfig.name}`
    : seoConfig.defaultTitle[locale]
    
  const finalDescription = description || seoConfig.defaultDescription[locale]
  const finalImage = image || `${siteUrl}/og-image.jpg`

  const alternateLocales = getAlternateLocales(locale, pathname)

  return {
    title: finalTitle,
    description: finalDescription,
    canonical: canonicalUrl,
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: locale,
      type: 'website',
      images: [
        {
          url: finalImage,
          width: 1200,
          height: 630,
          alt: finalTitle
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: finalDescription,
      images: [finalImage]
    },
    alternates: {
      canonical: canonicalUrl,
      languages: Object.fromEntries(
        alternateLocales.map(alt => [
          alt.locale,
          `${siteUrl}/${alt.locale}${cleanPathname}`
        ])
      )
    },
    robots: {
      index: !noindex,
      follow: true,
      googleBot: {
        index: !noindex,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    }
  }
}

export function generateHreflangTags(locale: Locale, pathname: string) {
  const siteUrl = siteConfig.url
  const cleanPathname = pathname.replace(/^\/[a-z]{2}/, '') || '/'
  const alternateLocales = getAlternateLocales(locale, pathname)

  return alternateLocales.map(alt => ({
    rel: 'alternate',
    hrefLang: alt.locale,
    href: `${siteUrl}/${alt.locale}${cleanPathname}`
  }))
}

export function generateSchemaOrg(locale: Locale, pathname: string, title?: string) {
  const siteUrl = siteConfig.url
  const cleanPathname = pathname.replace(/^\/[a-z]{2}/, '') || '/'
  const currentUrl = `${siteUrl}/${locale}${cleanPathname}`

  const breadcrumbs = []
  const pathSegments = cleanPathname.split('/').filter(Boolean)
  
  // Add home breadcrumb
  breadcrumbs.push({
    '@type': 'ListItem',
    position: 1,
    name: siteConfig.name,
    item: `${siteUrl}/${locale}`
  })

  // Add path breadcrumbs
  let currentPath = ''
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`
    breadcrumbs.push({
      '@type': 'ListItem',
      position: index + 2,
      name: segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      item: `${siteUrl}/${locale}${currentPath}`
    })
  })

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title || seoConfig.defaultTitle[locale],
    description: seoConfig.defaultDescription[locale],
    url: currentUrl,
    inLanguage: locale,
    isPartOf: {
      '@type': 'WebSite',
      name: siteConfig.name,
      url: siteUrl
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs
    }
  }
}
