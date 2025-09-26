import { MetadataRoute } from 'next'

const locales = ['en', 'hu', 'sk', 'de', 'pl', 'ro', 'cs']
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://allinconverter.com'

// All converter routes
const converters = [
  'pdf-to-docx', 'docx-to-pdf', 'pdf-to-txt', 'txt-to-pdf', 'pptx-to-pdf',
  'jpg-to-png', 'png-to-jpg', 'heic-to-jpg', 'webp-to-jpg', 'svg-to-png',
  'mp4-to-mp3', 'mov-to-mp4', 'wav-to-mp3', 'srt-to-vtt',
  'epub-to-mobi', 'mobi-to-epub', 'json-to-csv',
  'remove-background', 'image-upscaler',
  'image-compress', 'video-compress', 'pdf-compress',
  'add-watermark', 'crop-image', 'resize-image',
  'doc-to-pdf', 'rtf-to-pdf', 'xlsx-to-csv', 'csv-to-xlsx',
  'mp3-to-wav', 'aac-to-mp3', 'flac-to-mp3',
  'avi-to-mp4', 'mkv-to-mp4', 'mp4-to-gif',
  'bmp-to-jpg', 'tiff-to-jpg', 'gif-to-mp4', 'jpg-to-webp', 'png-to-webp'
]

// Static pages
const staticPages = [
  '', 'privacy', 'terms', 'cookies', 'help', 'contact', 'about'
]

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemap: MetadataRoute.Sitemap = []

  // Add homepage for each locale
  locales.forEach(locale => {
    sitemap.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: Object.fromEntries(
          locales.map(l => [l, `${baseUrl}/${l}`])
        )
      }
    })
  })

  // Add static pages for each locale
  staticPages.forEach(page => {
    locales.forEach(locale => {
      const url = page ? `${baseUrl}/${locale}/${page}` : `${baseUrl}/${locale}`
      sitemap.push({
        url,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: page === '' ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map(l => [l, l === 'en' ? `${baseUrl}/${page}` : `${baseUrl}/${l}/${page}`])
          )
        }
      })
    })
  })

  // Add converter pages for each locale
  converters.forEach(converter => {
    locales.forEach(locale => {
      const url = `${baseUrl}/${locale}/${converter}`
      sitemap.push({
        url,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
        alternates: {
          languages: Object.fromEntries(
            locales.map(l => [l, `${baseUrl}/${l}/${converter}`])
          )
        }
      })
    })
  })

  return sitemap
}
