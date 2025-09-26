import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ConsentProvider } from '@/components/ConsentProvider'
import CookieConsent from '@/components/CookieConsent'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AllInConverter - Free Online File Converter',
  description: 'Convert files online for free. PDF to DOCX, MP4 to MP3, JPG to PNG and more. Fast, secure, and easy to use file conversion tools.',
  keywords: 'file converter, PDF converter, MP4 to MP3, JPG to PNG, online converter, free converter',
  authors: [{ name: 'AllInConverter Team', url: 'https://allinconverter.com' }],
  creator: 'AllInConverter',
  publisher: 'AllInConverter',
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
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://allinconverter.com',
    siteName: 'AllInConverter',
    title: 'AllInConverter - Free Online File Converter',
    description: 'Convert files online for free. PDF to DOCX, MP4 to MP3, JPG to PNG and more. Fast, secure, and easy to use file conversion tools.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AllInConverter - Free Online File Converter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AllInConverter - Free Online File Converter',
    description: 'Convert files online for free. PDF to DOCX, MP4 to MP3, JPG to PNG and more. Fast, secure, and easy to use file conversion tools.',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-gray-50 antialiased`}>
        <ConsentProvider>
          <div className="min-h-full">
            {children}
          </div>
          <CookieConsent />
        </ConsentProvider>
      </body>
    </html>
  )
}