'use client'

import React, { useEffect, useState, useRef } from 'react'

interface AdSlotProps {
  position: 'inline-top' | 'inline-bottom' | 'sidebar' | 'modal'
  className?: string
  adUnitId?: string
  size?: 'banner' | 'rectangle' | 'skyscraper' | 'leaderboard'
  responsive?: boolean
}

const AdSlot: React.FC<AdSlotProps> = ({
  position,
  className = '',
  adUnitId,
  size = 'banner',
  responsive = true
}) => {
  const [consent, setConsent] = useState<{ analytics: boolean; advertising: boolean } | null>(null)
  const [adLoaded, setAdLoaded] = useState(false)
  const adRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check consent status
    const checkConsent = () => {
      const storedConsent = localStorage.getItem('cookie_consent')
      if (storedConsent) {
        const consentData = JSON.parse(storedConsent)
        setConsent(consentData)
      }
    }

    checkConsent()

    // Listen for consent updates
    const handleConsentUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<{ analytics: boolean; advertising: boolean }>
      setConsent(customEvent.detail)
    }

    window.addEventListener('consent_updated', handleConsentUpdate as EventListener)

    return () => {
      window.removeEventListener('consent_updated', handleConsentUpdate as EventListener)
    }
  }, [])

  useEffect(() => {
    // Load ad script only if advertising consent is given
    if (consent?.advertising && adRef.current && !adLoaded) {
      loadAdScript()
    }
  }, [consent, adLoaded])

  const loadAdScript = () => {
    if (typeof window === 'undefined') return

    // Check if Google AdSense is already loaded
    if (window.adsbygoogle) {
      renderAd()
      return
    }

    // Load Google AdSense script
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
    script.onload = () => {
      renderAd()
    }
    script.onerror = () => {
      console.warn('Failed to load AdSense script')
      showPlaceholder()
    }

    document.head.appendChild(script)
  }

  const renderAd = () => {
    if (!adRef.current || adLoaded) return

    try {
      // Create ad element
      const adElement = document.createElement('ins')
      adElement.className = 'adsbygoogle'
      adElement.style.display = 'block'
      
      // Set ad unit ID or use default
      const unitId = adUnitId || getDefaultAdUnitId(position, size)
      adElement.setAttribute('data-ad-client', process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-1234567890123456')
      adElement.setAttribute('data-ad-slot', unitId)
      
      if (responsive) {
        adElement.setAttribute('data-ad-format', 'auto')
        adElement.setAttribute('data-full-width-responsive', 'true')
      } else {
        adElement.setAttribute('data-ad-format', 'rectangle')
      }

      // Clear container and add ad
      adRef.current.innerHTML = ''
      adRef.current.appendChild(adElement)

      // Push ad to AdSense
      if (window.adsbygoogle) {
        window.adsbygoogle.push({})
        setAdLoaded(true)
      }
    } catch (error) {
      console.error('Error rendering ad:', error)
      showPlaceholder()
    }
  }

  const showPlaceholder = () => {
    if (!adRef.current) return

    const placeholder = document.createElement('div')
    placeholder.className = 'bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500 text-sm'
    
    // Set placeholder size based on position
    const sizeClasses = getPlaceholderSize(position, size)
    placeholder.className += ` ${sizeClasses}`
    
    placeholder.innerHTML = `
      <div class="text-center">
        <div class="text-gray-400 mb-2">📢</div>
        <div>Advertisement</div>
        <div class="text-xs mt-1">Ad will appear here</div>
      </div>
    `

    adRef.current.innerHTML = ''
    adRef.current.appendChild(placeholder)
  }

  const getDefaultAdUnitId = (position: string, size: string): string => {
    // Default ad unit IDs for different positions
    const adUnits: Record<string, Record<string, string>> = {
      'inline-top': {
        banner: '1234567890',
        leaderboard: '1234567891'
      },
      'inline-bottom': {
        banner: '1234567892',
        leaderboard: '1234567893'
      },
      'sidebar': {
        banner: '1234567894',
        skyscraper: '1234567895'
      },
      'modal': {
        rectangle: '1234567896'
      }
    }

    return adUnits[position]?.[size] || '1234567890'
  }

  const getPlaceholderSize = (position: string, size: string): string => {
    const sizes: Record<string, Record<string, string>> = {
      'inline-top': {
        banner: 'w-full h-32',
        leaderboard: 'w-full h-20'
      },
      'inline-bottom': {
        banner: 'w-full h-32',
        leaderboard: 'w-full h-20'
      },
      'sidebar': {
        banner: 'w-full h-64',
        skyscraper: 'w-full h-96'
      },
      'modal': {
        rectangle: 'w-full h-48'
      }
    }

    return sizes[position]?.[size] || 'w-full h-32'
  }

  // Don't render if no advertising consent
  if (!consent?.advertising) {
    return (
      <div className={`${className} ${getPlaceholderSize(position, size)} bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-sm`}>
        <div className="text-center">
          <div className="text-gray-300 mb-2">📢</div>
          <div>Advertisement</div>
          <div className="text-xs mt-1">Consent required</div>
        </div>
      </div>
    )
  }

  return (
    <div className={`${className} ${getPlaceholderSize(position, size)}`}>
      <div ref={adRef} className="w-full h-full" />
    </div>
  )
}

export default AdSlot
