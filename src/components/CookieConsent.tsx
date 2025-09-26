'use client'

import { useState, useEffect } from 'react'
import { XMarkIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'

interface CookieConsentProps {
  locale: string
  onAccept: (preferences: CookiePreferences) => void
}

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  advertising: boolean
}

export default function CookieConsent({ locale, onAccept }: CookieConsentProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true
    analytics: false,
    advertising: false
  })

  const getLocalizedText = (text: Record<string, string>) => {
    return text[locale] || text.en || ''
  }

  useEffect(() => {
    // Check if user has already made a choice
    const savedConsent = localStorage.getItem('cookie-consent')
    if (!savedConsent) {
      setIsOpen(true)
    }
  }, [])

  const handleAcceptAll = () => {
    const allPreferences = {
      necessary: true,
      analytics: true,
      advertising: true
    }
    setPreferences(allPreferences)
    onAccept(allPreferences)
    localStorage.setItem('cookie-consent', JSON.stringify(allPreferences))
    setIsOpen(false)
  }

  const handleAcceptSelected = () => {
    onAccept(preferences)
    localStorage.setItem('cookie-consent', JSON.stringify(preferences))
    setIsOpen(false)
  }

  const handleRejectAll = () => {
    const minimalPreferences = {
      necessary: true,
      analytics: false,
      advertising: false
    }
    setPreferences(minimalPreferences)
    onAccept(minimalPreferences)
    localStorage.setItem('cookie-consent', JSON.stringify(minimalPreferences))
    setIsOpen(false)
  }

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return // Can't disable necessary cookies
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 pr-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {getLocalizedText({
                en: 'Cookie Preferences',
                hu: 'Cookie beállítások',
                sk: 'Nastavenia cookies',
                de: 'Cookie-Einstellungen',
                pl: 'Ustawienia plików cookie',
                ro: 'Preferințe cookie',
                cs: 'Nastavení cookies'
              })}
            </h3>
            
            <p className="text-sm text-gray-600 mb-4">
              {getLocalizedText({
                en: 'We use cookies to enhance your experience, analyze site traffic, and personalize content. You can choose which cookies to accept.',
                hu: 'Cookie-kat használunk a felhasználói élmény javítására, a webhely forgalmának elemzésére és a tartalom személyre szabására. Kiválaszthatja, hogy mely cookie-kat fogadja el.',
                sk: 'Používame cookies na zlepšenie vašich skúseností, analýzu návštevnosti stránky a personalizáciu obsahu. Môžete si vybrať, ktoré cookies prijať.',
                de: 'Wir verwenden Cookies, um Ihr Erlebnis zu verbessern, den Website-Traffic zu analysieren und Inhalte zu personalisieren. Sie können wählen, welche Cookies Sie akzeptieren möchten.',
                pl: 'Używamy plików cookie, aby ulepszyć Twoje doświadczenia, analizować ruch na stronie i personalizować treści. Możesz wybrać, które pliki cookie zaakceptować.',
                ro: 'Folosim cookie-uri pentru a vă îmbunătăți experiența, a analiza traficul site-ului și a personaliza conținutul. Puteți alege ce cookie-uri să acceptați.',
                cs: 'Používáme cookies k vylepšení vašich zkušeností, analýze návštěvnosti stránky a personalizaci obsahu. Můžete si vybrat, které cookies přijmout.'
              })}
            </p>

            {showDetails && (
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {getLocalizedText({
                        en: 'Necessary Cookies',
                        hu: 'Szükséges cookie-k',
                        sk: 'Nevyhnutné cookies',
                        de: 'Notwendige Cookies',
                        pl: 'Niezbędne pliki cookie',
                        ro: 'Cookie-uri necesare',
                        cs: 'Nevyhnutelné cookies'
                      })}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {getLocalizedText({
                        en: 'Required for basic site functionality',
                        hu: 'A webhely alapvető működéséhez szükséges',
                        sk: 'Potrebné pre základnú funkčnosť stránky',
                        de: 'Erforderlich für die grundlegende Website-Funktionalität',
                        pl: 'Wymagane do podstawowej funkcjonalności strony',
                        ro: 'Necesare pentru funcționalitatea de bază a site-ului',
                        cs: 'Potřebné pro základní funkčnost stránky'
                      })}
                    </p>
                  </div>
                  <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                    {getLocalizedText({
                      en: 'Always On',
                      hu: 'Mindig be',
                      sk: 'Vždy zapnuté',
                      de: 'Immer an',
                      pl: 'Zawsze włączone',
                      ro: 'Întotdeauna pornit',
                      cs: 'Vždy zapnuto'
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {getLocalizedText({
                        en: 'Analytics Cookies',
                        hu: 'Analitikai cookie-k',
                        sk: 'Analytické cookies',
                        de: 'Analyse-Cookies',
                        pl: 'Pliki cookie analityczne',
                        ro: 'Cookie-uri de analiză',
                        cs: 'Analytické cookies'
                      })}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {getLocalizedText({
                        en: 'Help us understand how visitors interact with our site',
                        hu: 'Segítenek megérteni, hogyan lépnek kapcsolatba a látogatók a webhelyünkkel',
                        sk: 'Pomáhajú nám pochopiť, ako návštevníci interagujú s našou stránkou',
                        de: 'Helfen uns zu verstehen, wie Besucher mit unserer Website interagieren',
                        pl: 'Pomagają nam zrozumieć, jak odwiedzający wchodzą w interakcję z naszą stroną',
                        ro: 'Ne ajută să înțelegem cum interacționează vizitatorii cu site-ul nostru',
                        cs: 'Pomáhají nám pochopit, jak návštěvníci interagují s naší stránkou'
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => togglePreference('analytics')}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      preferences.analytics
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {preferences.analytics ? 'On' : 'Off'}
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {getLocalizedText({
                        en: 'Advertising Cookies',
                        hu: 'Hirdetési cookie-k',
                        sk: 'Reklamné cookies',
                        de: 'Werbungs-Cookies',
                        pl: 'Pliki cookie reklamowe',
                        ro: 'Cookie-uri publicitare',
                        cs: 'Reklamní cookies'
                      })}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {getLocalizedText({
                        en: 'Used to deliver relevant ads and measure ad performance',
                        hu: 'Releváns hirdetések megjelenítésére és a hirdetések teljesítményének mérésére',
                        sk: 'Používané na zobrazovanie relevantných reklám a meranie výkonnosti reklám',
                        de: 'Werden verwendet, um relevante Anzeigen zu liefern und Anzeigenleistung zu messen',
                        pl: 'Używane do dostarczania odpowiednich reklam i mierzenia wydajności reklam',
                        ro: 'Folosite pentru livrarea de reclame relevante și măsurarea performanței reclamei',
                        cs: 'Používané k zobrazování relevantních reklam a měření výkonnosti reklam'
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => togglePreference('advertising')}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      preferences.advertising
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {preferences.advertising ? 'On' : 'Off'}
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleAcceptAll}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {getLocalizedText({
              en: 'Accept All',
              hu: 'Összes elfogadása',
              sk: 'Prijať všetky',
              de: 'Alle akzeptieren',
              pl: 'Zaakceptuj wszystkie',
              ro: 'Acceptă toate',
              cs: 'Přijmout všechny'
            })}
          </button>

          <button
            onClick={handleAcceptSelected}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            {getLocalizedText({
              en: 'Accept Selected',
              hu: 'Kiválasztottak elfogadása',
              sk: 'Prijať vybrané',
              de: 'Ausgewählte akzeptieren',
              pl: 'Zaakceptuj wybrane',
              ro: 'Acceptă selectate',
              cs: 'Přijmout vybrané'
            })}
          </button>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Cog6ToothIcon className="h-4 w-4" />
            <span>
              {getLocalizedText({
                en: showDetails ? 'Hide Details' : 'Customize',
                hu: showDetails ? 'Részletek elrejtése' : 'Testreszabás',
                sk: showDetails ? 'Skryť detaily' : 'Prispôsobiť',
                de: showDetails ? 'Details ausblenden' : 'Anpassen',
                pl: showDetails ? 'Ukryj szczegóły' : 'Dostosuj',
                ro: showDetails ? 'Ascunde detaliile' : 'Personalizează',
                cs: showDetails ? 'Skrýt podrobnosti' : 'Přizpůsobit'
              })}
            </span>
          </button>

          <button
            onClick={handleRejectAll}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            {getLocalizedText({
              en: 'Reject All',
              hu: 'Összes elutasítása',
              sk: 'Odmietnuť všetky',
              de: 'Alle ablehnen',
              pl: 'Odrzuć wszystkie',
              ro: 'Respinge toate',
              cs: 'Odmítnout všechny'
            })}
          </button>
        </div>
      </div>
    </div>
  )
}
