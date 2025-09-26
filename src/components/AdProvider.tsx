'use client'

import React, { useEffect, useState } from 'react'
import Script from 'next/script'

interface AdProviderProps {
  consent: {
    analytics: boolean
    advertising: boolean
  }
}

declare global {
  interface Window {
    adsbygoogle: any[]
    googletag: any
  }
}

const AdProvider: React.FC<AdProviderProps> = ({ consent }) => {
  const [adsLoaded, setAdsLoaded] = useState(false)

  useEffect(() => {
    if (consent.advertising && !adsLoaded) {
      loadAdSense()
    }
  }, [consent.advertising, adsLoaded])

  const loadAdSense = () => {
    if (typeof window === 'undefined') return

    try {
      // Initialize adsbygoogle array
      window.adsbygoogle = window.adsbygoogle || []
      
      setAdsLoaded(true)
      console.log('Google AdSense initialized with consent')
    } catch (error) {
      console.error('Error initializing AdSense:', error)
    }
  }

  // Don't load AdSense if no advertising consent
  if (!consent.advertising) {
    return null
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        onLoad={() => {
          console.log('AdSense script loaded')
        }}
        onError={() => {
          console.error('Failed to load AdSense script')
        }}
      />
    </>
  )
}

export default AdProvider
