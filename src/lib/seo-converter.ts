import { Metadata } from 'next'
import { generateHreflangTags, generateCanonicalUrl } from './seo'

interface ConverterSEOConfig {
  id: string
  name: Record<string, string>
  description: Record<string, string>
  inputFormat: string
  outputFormat: string
}

export function generateConverterMetadata(
  config: ConverterSEOConfig,
  locale: string
): Metadata {
  const converterName = config.name[locale] || config.name.en || ''
  const converterDescription = config.description[locale] || config.description.en || ''
  
  const title = `${converterName} - AllInConverter`
  const description = `${converterDescription} Convert ${config.inputFormat.toUpperCase()} to ${config.outputFormat.toUpperCase()} files online for free.`

  return {
    title,
    description,
    keywords: [
      `${config.inputFormat} to ${config.outputFormat}`,
      `${config.inputFormat} converter`,
      `${config.outputFormat} converter`,
      'file converter',
      'online converter',
      'free converter',
      'convert files',
      'document converter',
      'image converter',
      'video converter',
      'audio converter'
    ],
    alternates: {
      canonical: generateCanonicalUrl(`/${locale}/${config.id}`),
      languages: generateHreflangTags(config.id)
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: generateCanonicalUrl(`/${locale}/${config.id}`),
      siteName: 'AllInConverter',
      images: [
        {
          url: '/images/cutin24-hero-pic.png',
          width: 1200,
          height: 630,
          alt: `${converterName} - AllInConverter`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/cutin24-hero-pic.png']
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    }
  }
}

export function generateConverterStructuredData(
  config: ConverterSEOConfig,
  locale: string
) {
  const converterName = config.name[locale] || config.name.en || ''
  const converterDescription = config.description[locale] || config.description.en || ''
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: converterName,
    description: converterDescription,
    url: generateCanonicalUrl(`/${locale}/${config.id}`),
    applicationCategory: 'FileConverter',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    featureList: [
      `Convert ${config.inputFormat.toUpperCase()} to ${config.outputFormat.toUpperCase()}`,
      'Free online conversion',
      'No registration required',
      'Secure file processing',
      'Fast conversion speed'
    ],
    provider: {
      '@type': 'Organization',
      name: 'AllInConverter',
      url: 'https://allinconverter.com'
    }
  }
}
