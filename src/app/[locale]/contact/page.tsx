import { Metadata } from 'next'
import { generateHreflangTags, generateCanonicalUrl } from '@/lib/seo'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const titles = {
    en: 'Contact AllInConverter - Get Support & Help',
    hu: 'Kapcsolat az AllInConverter-rel - Támogatás és segítség',
    sk: 'Kontakt AllInConverter - Získajte podporu a pomoc',
    de: 'AllInConverter kontaktieren - Support & Hilfe erhalten',
    pl: 'Kontakt z AllInConverter - Uzyskaj wsparcie i pomoc',
    ro: 'Contactați AllInConverter - Obțineți suport și ajutor',
    cs: 'Kontaktujte AllInConverter - Získejte podporu a pomoc'
  }

  const descriptions = {
    en: 'Contact AllInConverter support team for help with file conversion, technical issues, or general inquiries. We provide fast, professional support via email.',
    hu: 'Lépjen kapcsolatba az AllInConverter támogatási csapatával fájlkonvertálással, technikai problémákkal vagy általános kérdésekkel kapcsolatban. Gyors, professzionális támogatást nyújtunk e-mailben.',
    sk: 'Kontaktujte tím podpory AllInConverter pre pomoc s konverziou súborov, technickými problémami alebo všeobecnými otázkami. Poskytujeme rýchlu, profesionálnu podporu cez e-mail.',
    de: 'Kontaktieren Sie das AllInConverter-Support-Team für Hilfe bei Dateikonvertierung, technischen Problemen oder allgemeinen Anfragen. Wir bieten schnellen, professionellen Support per E-Mail.',
    pl: 'Skontaktuj się z zespołem wsparcia AllInConverter w celu uzyskania pomocy z konwersją plików, problemami technicznymi lub ogólnymi zapytaniami. Zapewniamy szybkie, profesjonalne wsparcie przez e-mail.',
    ro: 'Contactați echipa de suport AllInConverter pentru ajutor cu conversia fișierelor, problemele tehnice sau întrebările generale. Oferim suport rapid și profesional prin e-mail.',
    cs: 'Kontaktujte tým podpory AllInConverter pro pomoc s konverzí souborů, technickými problémy nebo obecnými dotazy. Poskytujeme rychlou, profesionální podporu prostřednictvím e-mailu.'
  }

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    alternates: {
      canonical: generateCanonicalUrl(`/${locale}/contact`),
      languages: generateHreflangTags('contact')
    }
  }
}

export default function ContactPage({ params }: Props) {
  const { locale } = params

  const getLocalizedText = (text: Record<string, string>) => {
    return text[locale] || text.en || ''
  }

  const content = {
    title: {
      en: 'Contact Us',
      hu: 'Kapcsolat',
      sk: 'Kontaktujte nás',
      de: 'Kontaktieren Sie uns',
      pl: 'Skontaktuj się z nami',
      ro: 'Contactați-ne',
      cs: 'Kontaktujte nás'
    },
    subtitle: {
      en: 'We\'re here to help with any questions or issues you may have',
      hu: 'Itt vagyunk, hogy segítsünk minden kérdésben vagy problémában',
      sk: 'Sme tu, aby sme pomohli s akýmikoľvek otázkami alebo problémami',
      de: 'Wir sind hier, um bei allen Fragen oder Problemen zu helfen',
      pl: 'Jesteśmy tutaj, aby pomóc w każdych pytaniach lub problemach',
      ro: 'Suntem aici pentru a ajuta cu orice întrebări sau probleme',
      cs: 'Jsme tu, abychom pomohli s jakýmikoli otázkami nebo problémy'
    },
    sections: {
      email: {
        title: {
          en: 'Email Support',
          hu: 'E-mail támogatás',
          sk: 'E-mailová podpora',
          de: 'E-Mail-Support',
          pl: 'Wsparcie e-mailowe',
          ro: 'Suport e-mail',
          cs: 'E-mailová podpora'
        },
        description: {
          en: 'For technical support, feature requests, or general inquiries, please email us at:',
          hu: 'Technikai támogatásért, funkciókérésért vagy általános kérdésekért, kérjük, írjon nekünk:',
          sk: 'Pre technickú podporu, požiadavky na funkcie alebo všeobecné otázky nám prosím napíšte na:',
          de: 'Für technischen Support, Funktionsanfragen oder allgemeine Anfragen senden Sie uns bitte eine E-Mail an:',
          pl: 'W przypadku wsparcia technicznego, próśb o funkcje lub ogólnych zapytań, wyślij nam e-mail na:',
          ro: 'Pentru suport tehnic, cereri de funcții sau întrebări generale, vă rugăm să ne trimiteți un e-mail la:',
          cs: 'Pro technickou podporu, požadavky na funkce nebo obecné dotazy nám prosím napište na:'
        },
        email: 'info@allinconverter.com',
        responseTime: {
          en: 'We typically respond within 24 hours',
          hu: 'Általában 24 órán belül válaszolunk',
          sk: 'Obvykle odpovedáme do 24 hodín',
          de: 'Wir antworten normalerweise innerhalb von 24 Stunden',
          pl: 'Zwykle odpowiadamy w ciągu 24 godzin',
          ro: 'De obicei răspundem în 24 de ore',
          cs: 'Obvykle odpovídáme do 24 hodin'
        }
      },
      help: {
        title: {
          en: 'Self-Help Resources',
          hu: 'Önsegítő források',
          sk: 'Zdroje samoobsluhy',
          de: 'Selbsthilfe-Ressourcen',
          pl: 'Zasoby samopomocy',
          ro: 'Resurse de auto-ajutor',
          cs: 'Zdroje svépomoci'
        },
        description: {
          en: 'Before contacting us, you might find answers to common questions in our help center:',
          hu: 'Mielőtt kapcsolatba lépne velünk, talán válaszokat találhat gyakori kérdésekre a súgó központunkban:',
          sk: 'Pred kontaktovaním nás možno nájdete odpovede na bežné otázky v našom centre pomoci:',
          de: 'Bevor Sie uns kontaktieren, finden Sie möglicherweise Antworten auf häufige Fragen in unserem Hilfezentrum:',
          pl: 'Przed skontaktowaniem się z nami możesz znaleźć odpowiedzi na częste pytania w naszym centrum pomocy:',
          ro: 'Înainte de a ne contacta, s-ar putea să găsiți răspunsuri la întrebările frecvente în centrul nostru de ajutor:',
          cs: 'Před kontaktováním nás možná najdete odpovědi na běžné otázky v našem centru nápovědy:'
        }
      },
      business: {
        title: {
          en: 'Business Inquiries',
          hu: 'Üzleti megkeresések',
          sk: 'Obchodné dopyty',
          de: 'Geschäftsanfragen',
          pl: 'Zapytania biznesowe',
          ro: 'Întrebări de afaceri',
          cs: 'Obchodní dotazy'
        },
        description: {
          en: 'For partnership opportunities, enterprise solutions, or media inquiries, please contact us at:',
          hu: 'Partnerségi lehetőségekért, vállalati megoldásokért vagy média megkeresésekért, kérjük, lépjen kapcsolatba velünk:',
          sk: 'Pre partnerské príležitosti, podnikové riešenia alebo mediálne dopyty nás prosím kontaktujte na:',
          de: 'Für Partnerschaftsmöglichkeiten, Unternehmenslösungen oder Medienanfragen kontaktieren Sie uns bitte unter:',
          pl: 'W przypadku możliwości partnerstwa, rozwiązań dla przedsiębiorstw lub zapytań medialnych, skontaktuj się z nami pod adresem:',
          ro: 'Pentru oportunități de parteneriat, soluții pentru întreprinderi sau întrebări media, vă rugăm să ne contactați la:',
          cs: 'Pro partnerské příležitosti, podniková řešení nebo mediální dotazy nás prosím kontaktujte na:'
        },
        email: 'business@allinconverter.com'
      },
      feedback: {
        title: {
          en: 'Feedback & Suggestions',
          hu: 'Visszajelzés és javaslatok',
          sk: 'Spätná väzba a návrhy',
          de: 'Feedback & Vorschläge',
          pl: 'Opinie i sugestie',
          ro: 'Feedback și sugestii',
          cs: 'Zpětná vazba a návrhy'
        },
        description: {
          en: 'We value your feedback! Help us improve AllInConverter by sharing your thoughts, suggestions, or reporting issues:',
          hu: 'Értékeljük visszajelzését! Segítsen nekünk fejleszteni az AllInConverter-t gondolatai, javaslatai megosztásával vagy problémák bejelentésével:',
          sk: 'Ceníme si vašu spätnú väzbu! Pomôžte nám zlepšiť AllInConverter zdieľaním svojich myšlienok, návrhov alebo nahlásením problémov:',
          de: 'Wir schätzen Ihr Feedback! Helfen Sie uns, AllInConverter zu verbessern, indem Sie Ihre Gedanken, Vorschläge teilen oder Probleme melden:',
          pl: 'Cenimy Twoją opinię! Pomóż nam ulepszyć AllInConverter, dzieląc się swoimi przemyśleniami, sugestiami lub zgłaszając problemy:',
          ro: 'Apreciem feedback-ul dumneavoastră! Ajutați-ne să îmbunătățim AllInConverter prin împărtășirea gândurilor, sugestiilor sau raportarea problemelor:',
          cs: 'Vážíme si vaší zpětné vazby! Pomozte nám zlepšit AllInConverter sdílením svých myšlenek, návrhů nebo hlášením problémů:'
        },
        email: 'feedback@allinconverter.com'
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="mx-auto max-w-4xl px-6 py-8 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {getLocalizedText(content.title)}
          </h1>
          <p className="text-xl text-gray-600">
            {getLocalizedText(content.subtitle)}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Email Support */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {getLocalizedText(content.sections.email.title)}
            </h2>
            <p className="text-gray-600 mb-4">
              {getLocalizedText(content.sections.email.description)}
            </p>
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <a
                href="mailto:info@allinconverter.com"
                className="text-2xl font-mono text-blue-600 hover:text-blue-800 transition-colors"
              >
                {content.sections.email.email}
              </a>
            </div>
            <p className="text-sm text-gray-500">
              {getLocalizedText(content.sections.email.responseTime)}
            </p>
          </div>

          {/* Self-Help */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {getLocalizedText(content.sections.help.title)}
            </h2>
            <p className="text-gray-600 mb-6">
              {getLocalizedText(content.sections.help.description)}
            </p>
            <a
              href="/help"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Visit Help Center
            </a>
          </div>

          {/* Business Inquiries */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {getLocalizedText(content.sections.business.title)}
            </h2>
            <p className="text-gray-600 mb-4">
              {getLocalizedText(content.sections.business.description)}
            </p>
            <div className="bg-green-50 rounded-lg p-4">
              <a
                href="mailto:business@allinconverter.com"
                className="text-xl font-mono text-green-600 hover:text-green-800 transition-colors"
              >
                {content.sections.business.email}
              </a>
            </div>
          </div>

          {/* Feedback */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {getLocalizedText(content.sections.feedback.title)}
            </h2>
            <p className="text-gray-600 mb-4">
              {getLocalizedText(content.sections.feedback.description)}
            </p>
            <div className="bg-purple-50 rounded-lg p-4">
              <a
                href="mailto:feedback@allinconverter.com"
                className="text-xl font-mono text-purple-600 hover:text-purple-800 transition-colors"
              >
                {content.sections.feedback.email}
              </a>
            </div>
          </div>

          {/* Quick Contact Form */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
            <h2 className="text-2xl font-semibold mb-6">
              Quick Contact
            </h2>
            <p className="text-lg mb-6">
              Need immediate assistance? Send us a quick message and we'll get back to you as soon as possible.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="mailto:info@allinconverter.com?subject=Technical Support"
                className="inline-flex items-center justify-center px-4 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Technical Support
              </a>
              <a
                href="mailto:business@allinconverter.com?subject=Business Inquiry"
                className="inline-flex items-center justify-center px-4 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Business Inquiry
              </a>
              <a
                href="mailto:feedback@allinconverter.com?subject=Feedback"
                className="inline-flex items-center justify-center px-4 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Send Feedback
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
