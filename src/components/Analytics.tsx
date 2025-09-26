'use client'

import { useEffect } from 'react'
import Script from 'next/script'

interface AnalyticsProps {
  consent: {
    analytics: boolean
    advertising: boolean
  }
}

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

export default function Analytics({ consent }: AnalyticsProps) {
  const GA_TRACKING_ID = process.env.NEXT_PUBLIC_ANALYTICS_ID

  useEffect(() => {
    if (!consent.analytics || !GA_TRACKING_ID) return

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
      window.dataLayer.push(arguments)
    }

    // Configure gtag
    window.gtag('js', new Date())
    window.gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure'
    })
  }, [consent.analytics, GA_TRACKING_ID])

  const trackEvent = (action: string, category: string, label?: string, value?: number) => {
    if (!consent.analytics || !window.gtag) return

    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    })
  }

  const trackConversion = (converter: string, fileSize: number) => {
    if (!consent.analytics || !window.gtag) return

    window.gtag('event', 'conversion', {
      event_category: 'File Conversion',
      event_label: converter,
      value: fileSize
    })
  }

  const trackDownload = (converter: string) => {
    if (!consent.analytics || !window.gtag) return

    window.gtag('event', 'file_download', {
      event_category: 'Downloads',
      event_label: converter
    })
  }

  // Expose tracking functions globally for use in other components
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).trackEvent = trackEvent
      ;(window as any).trackConversion = trackConversion
      ;(window as any).trackDownload = trackDownload
    }
  }, [consent.analytics])

  if (!consent.analytics || !GA_TRACKING_ID) {
    return null
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_title: document.title,
              page_location: window.location.href,
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure'
            });
          `
        }}
      />
    </>
  )
}

// Helper functions for tracking
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_ANALYTICS_ID!, {
      page_path: url
    })
  }
}

export const trackFileUpload = (converter: string, fileSize: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'file_upload', {
      event_category: 'File Upload',
      event_label: converter,
      value: fileSize
    })
  }
}

export const trackConversionStart = (converter: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion_start', {
      event_category: 'File Conversion',
      event_label: converter
    })
  }
}

export const trackConversionComplete = (converter: string, duration: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion_complete', {
      event_category: 'File Conversion',
      event_label: converter,
      value: duration
    })
  }
}

export const trackError = (error: string, context: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'error', {
      event_category: 'Errors',
      event_label: error,
      custom_map: {
        context: context
      }
    })
  }
}
