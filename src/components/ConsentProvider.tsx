'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import Analytics from './Analytics'
import AdProvider from './AdProvider'

interface ConsentState {
  necessary: boolean
  analytics: boolean
  advertising: boolean
}

interface ConsentContextType {
  consent: ConsentState
  updateConsent: (newConsent: ConsentState) => void
  hasConsent: (type: keyof ConsentState) => boolean
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined)

interface ConsentProviderProps {
  children: ReactNode
}

const COOKIE_CONSENT_KEY = 'cookie_consent'

export function ConsentProvider({ children }: ConsentProviderProps) {
  const [consent, setConsent] = useState<ConsentState>({
    necessary: true, // Always true
    analytics: false,
    advertising: false,
  })
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Load consent from localStorage on mount
    const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (storedConsent) {
      try {
        const parsedConsent = JSON.parse(storedConsent)
        setConsent(parsedConsent)
      } catch (error) {
        console.error('Error parsing stored consent:', error)
      }
    }
    setIsInitialized(true)
  }, [])

  const updateConsent = (newConsent: ConsentState) => {
    setConsent(newConsent)
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(newConsent))
    
    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('consent_updated', { 
      detail: newConsent 
    }))
  }

  const hasConsent = (type: keyof ConsentState): boolean => {
    return consent[type] === true
  }

  const contextValue: ConsentContextType = {
    consent,
    updateConsent,
    hasConsent,
  }

  // Don't render children until consent is initialized to prevent SSR/CSR mismatch
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <ConsentContext.Provider value={contextValue}>
      {children}
      
      {/* Conditionally load Analytics and AdSense based on consent */}
      <Analytics consent={consent} />
      <AdProvider consent={consent} />
    </ConsentContext.Provider>
  )
}

export function useConsent(): ConsentContextType {
  const context = useContext(ConsentContext)
  if (context === undefined) {
    throw new Error('useConsent must be used within a ConsentProvider')
  }
  return context
}

// Hook for checking specific consent types
export function useAnalyticsConsent(): boolean {
  const { hasConsent } = useConsent()
  return hasConsent('analytics')
}

export function useAdvertisingConsent(): boolean {
  const { hasConsent } = useConsent()
  return hasConsent('advertising')
}
