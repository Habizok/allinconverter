'use client'

import { useState, useEffect, useCallback } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useAdvertisingConsent } from '@/components/ConsentProvider'
import AdSlot from './AdSlot'

interface AdInterstitialProps {
  isOpen: boolean
  onClose: () => void
  onProceed: () => void
  locale: string
}

export default function AdInterstitial({ isOpen, onClose, onProceed, locale }: AdInterstitialProps) {
  const [countdown, setCountdown] = useState(3)
  const [canClose, setCanClose] = useState(false)
  const hasAdvertisingConsent = useAdvertisingConsent()

  const getLocalizedText = (text: Record<string, string>) => {
    return text[locale] || text.en || ''
  }

  const handleClose = useCallback(() => {
    if (canClose) {
      onClose()
    }
  }, [canClose, onClose])

  const handleProceed = useCallback(() => {
    if (canClose) {
      onProceed()
      onClose()
    }
  }, [canClose, onProceed, onClose])

  useEffect(() => {
    if (!isOpen) return

    setCountdown(3)
    setCanClose(false)

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setCanClose(true)
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && canClose) {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, canClose, handleClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={canClose ? handleClose : undefined}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {getLocalizedText({
                en: 'Download Ready!',
                hu: 'Letöltés kész!',
                sk: 'Stiahnutie pripravené!',
                de: 'Download bereit!',
                pl: 'Pobieranie gotowe!',
                ro: 'Descărcare gata!',
                cs: 'Stahování připraveno!'
              })}
            </h2>
            {canClose && (
              <button
                onClick={handleClose}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {getLocalizedText({
                en: 'Your file is ready!',
                hu: 'A fájl készen áll!',
                sk: 'Váš súbor je pripravený!',
                de: 'Ihre Datei ist bereit!',
                pl: 'Twój plik jest gotowy!',
                ro: 'Fișierul tău este gata!',
                cs: 'Váš soubor je připraven!'
              })}
            </h3>
            
            <p className="text-gray-600">
              {getLocalizedText({
                en: 'Click the button below to start your download.',
                hu: 'Kattints az alábbi gombra a letöltés megkezdéséhez.',
                sk: 'Kliknite na tlačidlo nižšie a začnite sťahovanie.',
                de: 'Klicken Sie auf die Schaltfläche unten, um Ihren Download zu starten.',
                pl: 'Kliknij przycisk poniżej, aby rozpocząć pobieranie.',
                ro: 'Faceți clic pe butonul de mai jos pentru a începe descărcarea.',
                cs: 'Klikněte na tlačítko níže a začněte stahování.'
              })}
            </p>
          </div>

          {/* Ad Space */}
          <div className="mb-6">
            <AdSlot 
              position="modal" 
              size="rectangle" 
              className="w-full h-48"
            />
          </div>

          {/* Countdown */}
          {!canClose && (
            <div className="text-center mb-4">
              <div className="text-sm text-gray-500 mb-2">
                {getLocalizedText({
                  en: 'Please wait',
                  hu: 'Kérjük várjon',
                  sk: 'Prosím čakajte',
                  de: 'Bitte warten',
                  pl: 'Proszę czekać',
                  ro: 'Vă rugăm să așteptați',
                  cs: 'Prosím čekejte'
                })}
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {countdown}
              </div>
            </div>
          )}

          {/* Download Button */}
          <button
            onClick={handleProceed}
            disabled={!canClose}
            className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
              canClose
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {getLocalizedText({
              en: 'Download File',
              hu: 'Fájl letöltése',
              sk: 'Stiahnuť súbor',
              de: 'Datei herunterladen',
              pl: 'Pobierz plik',
              ro: 'Descarcă fișierul',
              cs: 'Stáhnout soubor'
            })}
          </button>
        </div>
      </div>
    </div>
  )
}
