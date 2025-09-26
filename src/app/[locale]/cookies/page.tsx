import { Metadata } from 'next'
import { generateHreflangTags, generateCanonicalUrl } from '@/lib/seo'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const titles = {
    en: 'Cookie Policy - AllInConverter',
    hu: 'Cookie szabályzat - AllInConverter',
    sk: 'Zásady cookies - AllInConverter',
    de: 'Cookie-Richtlinie - AllInConverter',
    pl: 'Polityka plików cookie - AllInConverter',
    ro: 'Politica cookie - AllInConverter',
    cs: 'Zásady cookies - AllInConverter'
  }

  const descriptions = {
    en: 'Learn about how AllInConverter uses cookies to enhance your experience and provide personalized services.',
    hu: 'Ismerje meg, hogyan használja az AllInConverter a cookie-kat a felhasználói élmény javítására és személyre szabott szolgáltatások nyújtására.',
    sk: 'Zistite, ako AllInConverter používa cookies na zlepšenie vašich skúseností a poskytovanie personalizovaných služieb.',
    de: 'Erfahren Sie, wie AllInConverter Cookies verwendet, um Ihr Erlebnis zu verbessern und personalisierte Dienste bereitzustellen.',
    pl: 'Dowiedz się, jak AllInConverter używa plików cookie, aby ulepszyć Twoje doświadczenia i dostarczać spersonalizowane usługi.',
    ro: 'Aflați cum AllInConverter folosește cookie-uri pentru a vă îmbunătăți experiența și a oferi servicii personalizate.',
    cs: 'Zjistěte, jak AllInConverter používá cookies k vylepšení vašich zkušeností a poskytování personalizovaných služeb.'
  }

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    alternates: {
      canonical: generateCanonicalUrl(`/${locale}/cookies`),
      languages: generateHreflangTags('cookies')
    }
  }
}

export default function CookiesPage({ params }: Props) {
  const { locale } = params

  const getLocalizedText = (text: Record<string, string>) => {
    return text[locale] || text.en || ''
  }

  const content = {
    title: {
      en: 'Cookie Policy',
      hu: 'Cookie szabályzat',
      sk: 'Zásady cookies',
      de: 'Cookie-Richtlinie',
      pl: 'Polityka plików cookie',
      ro: 'Politica cookie',
      cs: 'Zásady cookies'
    },
    lastUpdated: {
      en: 'Last updated: December 2024',
      hu: 'Utolsó frissítés: 2024. december',
      sk: 'Posledná aktualizácia: december 2024',
      de: 'Zuletzt aktualisiert: Dezember 2024',
      pl: 'Ostatnia aktualizacja: grudzień 2024',
      ro: 'Ultima actualizare: decembrie 2024',
      cs: 'Poslední aktualizace: prosinec 2024'
    },
    sections: {
      whatAreCookies: {
        title: {
          en: 'What Are Cookies?',
          hu: 'Mik a cookie-k?',
          sk: 'Čo sú cookies?',
          de: 'Was sind Cookies?',
          pl: 'Czym są pliki cookie?',
          ro: 'Ce sunt cookie-urile?',
          cs: 'Co jsou cookies?'
        },
        content: {
          en: 'Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and analyzing how you use our service.',
          hu: 'A cookie-k kis szöveges fájlok, amelyek az eszközén tárolódnak, amikor meglátogatja webhelyünket. Segítenek nekünk jobb felhasználói élményt nyújtani azáltal, hogy megjegyzik az Ön beállításait és elemzik, hogyan használja szolgáltatásunkat.',
          sk: 'Cookies sú malé textové súbory, ktoré sa ukladajú na vašom zariadení, keď navštívite našu webovú stránku. Pomáhajú nám poskytovať vám lepšie skúsenosti zapamätaním si vašich preferencií a analýzou toho, ako používate našu službu.',
          de: 'Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden, wenn Sie unsere Website besuchen. Sie helfen uns, Ihnen eine bessere Erfahrung zu bieten, indem sie Ihre Präferenzen speichern und analysieren, wie Sie unseren Service nutzen.',
          pl: 'Pliki cookie to małe pliki tekstowe, które są przechowywane na Twoim urządzeniu, gdy odwiedzasz naszą stronę internetową. Pomagają nam zapewnić Ci lepsze doświadczenie, zapamiętując Twoje preferencje i analizując sposób korzystania z naszej usługi.',
          ro: 'Cookie-urile sunt mici fișiere text care sunt stocate pe dispozitivul dumneavoastră când vizitați site-ul nostru web. Ne ajută să vă oferim o experiență mai bună prin memorarea preferințelor dumneavoastră și analizarea modului în care folosiți serviciul nostru.',
          cs: 'Cookies jsou malé textové soubory, které se ukládají na vašem zařízení, když navštívíte naši webovou stránku. Pomáhají nám poskytovat vám lepší zážitek zapamatováním si vašich preferencí a analýzou toho, jak používáte naši službu.'
        }
      },
      typesOfCookies: {
        title: {
          en: 'Types of Cookies We Use',
          hu: 'A használt cookie-k típusai',
          sk: 'Typy cookies, ktoré používame',
          de: 'Arten von Cookies, die wir verwenden',
          pl: 'Rodzaje plików cookie, których używamy',
          ro: 'Tipuri de cookie-uri pe care le folosim',
          cs: 'Typy cookies, které používáme'
        },
        content: {
          en: 'We use different types of cookies: Necessary cookies for basic functionality, Analytics cookies to understand usage patterns, and Advertising cookies to show relevant ads.',
          hu: 'Különböző típusú cookie-kat használunk: Szükséges cookie-k az alapvető funkcionalitáshoz, Analitikai cookie-k a használati szokások megértéséhez, és Hirdetési cookie-k releváns hirdetések megjelenítéséhez.',
          sk: 'Používame rôzne typy cookies: Nevyhnutné cookies pre základnú funkčnosť, Analytické cookies na pochopenie vzorcov používania a Reklamné cookies na zobrazovanie relevantných reklám.',
          de: 'Wir verwenden verschiedene Arten von Cookies: Notwendige Cookies für grundlegende Funktionalität, Analyse-Cookies zum Verständnis von Nutzungsmustern und Werbe-Cookies zur Anzeige relevanter Anzeigen.',
          pl: 'Używamy różnych rodzajów plików cookie: Niezbędne pliki cookie do podstawowej funkcjonalności, pliki cookie analityczne do zrozumienia wzorców użytkowania i pliki cookie reklamowe do wyświetlania odpowiednich reklam.',
          ro: 'Folosim diferite tipuri de cookie-uri: Cookie-uri necesare pentru funcționalitatea de bază, cookie-uri de analiză pentru înțelegerea modelelor de utilizare și cookie-uri publicitare pentru afișarea de reclame relevante.',
          cs: 'Používáme různé typy cookies: Nezbytné cookies pro základní funkcionalitu, analytické cookies pro pochopení vzorců používání a reklamní cookies pro zobrazování relevantních reklam.'
        }
      },
      necessaryCookies: {
        title: {
          en: 'Necessary Cookies',
          hu: 'Szükséges cookie-k',
          sk: 'Nevyhnutné cookies',
          de: 'Notwendige Cookies',
          pl: 'Niezbędne pliki cookie',
          ro: 'Cookie-uri necesare',
          cs: 'Nevyhnutelné cookies'
        },
        content: {
          en: 'These cookies are essential for the website to function properly. They enable basic functions like page navigation, access to secure areas, and remembering your cookie preferences. You cannot opt out of these cookies.',
          hu: 'Ezek a cookie-k elengedhetetlenek a webhely megfelelő működéséhez. Lehetővé teszik az alapvető funkciókat, mint az oldal navigálása, a biztonságos területek elérése és a cookie beállítások megjegyzése. Ezekből a cookie-kból nem lehet leiratkozni.',
          sk: 'Tieto cookies sú nevyhnutné pre správne fungovanie webovej stránky. Umožňujú základné funkcie ako navigáciu stránok, prístup k zabezpečeným oblastiam a zapamätanie si vašich preferencií cookies. Z týchto cookies sa nemôžete odhlásiť.',
          de: 'Diese Cookies sind für das ordnungsgemäße Funktionieren der Website unerlässlich. Sie ermöglichen grundlegende Funktionen wie Seitennavigation, Zugang zu sicheren Bereichen und das Speichern Ihrer Cookie-Einstellungen. Sie können sich nicht von diesen Cookies abmelden.',
          pl: 'Te pliki cookie są niezbędne do prawidłowego funkcjonowania strony internetowej. Umożliwiają podstawowe funkcje, takie jak nawigacja po stronach, dostęp do bezpiecznych obszarów i zapamiętywanie Twoich preferencji dotyczących plików cookie. Nie możesz zrezygnować z tych plików cookie.',
          ro: 'Aceste cookie-uri sunt esențiale pentru funcționarea corectă a site-ului web. Ele permit funcții de bază precum navigarea paginilor, accesul la zonele securizate și memorarea preferințelor dumneavoastră pentru cookie-uri. Nu vă puteți dezabona de la aceste cookie-uri.',
          cs: 'Tyto cookies jsou nezbytné pro správné fungování webové stránky. Umožňují základní funkce jako navigaci stránek, přístup k zabezpečeným oblastem a zapamatování si vašich preferencí cookies. Z těchto cookies se nemůžete odhlásit.'
        }
      },
      analyticsCookies: {
        title: {
          en: 'Analytics Cookies',
          hu: 'Analitikai cookie-k',
          sk: 'Analytické cookies',
          de: 'Analyse-Cookies',
          pl: 'Pliki cookie analityczne',
          ro: 'Cookie-uri de analiză',
          cs: 'Analytické cookies'
        },
        content: {
          en: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. We use Google Analytics to track page views, conversion rates, and user behavior patterns.',
          hu: 'Ezek a cookie-k segítenek megérteni, hogyan lépnek kapcsolatba a látogatók a webhelyünkkel, anonim módon gyűjtve és jelentve az információkat. Google Analytics-t használunk az oldalmegtekintések, konverziós arányok és felhasználói viselkedési minták követésére.',
          sk: 'Tieto cookies nám pomáhajú pochopiť, ako návštevníci interagujú s našou webovou stránkou zberom a hlásením informácií anonymne. Používame Google Analytics na sledovanie zobrazení stránok, konverzných mier a vzorcov správania používateľov.',
          de: 'Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren, indem sie Informationen anonym sammeln und melden. Wir verwenden Google Analytics, um Seitenaufrufe, Conversion-Raten und Benutzerverhaltensmuster zu verfolgen.',
          pl: 'Te pliki cookie pomagają nam zrozumieć, jak odwiedzający wchodzą w interakcję z naszą stroną internetową, zbierając i raportując informacje anonimowo. Używamy Google Analytics do śledzenia wyświetleń stron, wskaźników konwersji i wzorców zachowań użytkowników.',
          ro: 'Aceste cookie-uri ne ajută să înțelegem cum interacționează vizitatorii cu site-ul nostru web prin colectarea și raportarea informațiilor în mod anonim. Folosim Google Analytics pentru a urmări vizualizările de pagini, ratele de conversie și modelele de comportament ale utilizatorilor.',
          cs: 'Tyto cookies nám pomáhají pochopit, jak návštěvníci interagují s naší webovou stránkou shromažďováním a hlášením informací anonymně. Používáme Google Analytics ke sledování zobrazení stránek, konverzních sazeb a vzorců chování uživatelů.'
        }
      },
      advertisingCookies: {
        title: {
          en: 'Advertising Cookies',
          hu: 'Hirdetési cookie-k',
          sk: 'Reklamné cookies',
          de: 'Werbungs-Cookies',
          pl: 'Pliki cookie reklamowe',
          ro: 'Cookie-uri publicitare',
          cs: 'Reklamní cookies'
        },
        content: {
          en: 'These cookies are used to deliver advertisements that are relevant to you and your interests. They also help measure the effectiveness of advertising campaigns and prevent the same ad from being shown repeatedly.',
          hu: 'Ezeket a cookie-kat használjuk releváns hirdetések megjelenítésére, amelyek Önhöz és érdeklődési köréhez kapcsolódnak. Segítenek a hirdetési kampányok hatékonyságának mérésében és megakadályozzák, hogy ugyanaz a hirdetés többször megjelenjen.',
          sk: 'Tieto cookies sa používajú na doručovanie reklám, ktoré sú relevantné pre vás a vaše záujmy. Pomáhajú aj merať efektívnosť reklamných kampaní a zabrániť opakovanému zobrazovaniu tej istej reklamy.',
          de: 'Diese Cookies werden verwendet, um Anzeigen zu liefern, die für Sie und Ihre Interessen relevant sind. Sie helfen auch dabei, die Wirksamkeit von Werbekampagnen zu messen und zu verhindern, dass dieselbe Anzeige wiederholt angezeigt wird.',
          pl: 'Te pliki cookie są używane do dostarczania reklam, które są odpowiednie dla Ciebie i Twoich zainteresowań. Pomagają również mierzyć skuteczność kampanii reklamowych i zapobiegać wielokrotnemu wyświetlaniu tej samej reklamy.',
          ro: 'Aceste cookie-uri sunt folosite pentru livrarea de reclame care sunt relevante pentru dumneavoastră și interesele dumneavoastră. De asemenea, ajută la măsurarea eficacității campaniilor publicitare și previne afișarea repetată a aceleiași reclame.',
          cs: 'Tyto cookies se používají k doručování reklam, které jsou relevantní pro vás a vaše zájmy. Pomáhají také měřit efektivitu reklamních kampaní a zabránit opakovanému zobrazování stejné reklamy.'
        }
      },
      manageCookies: {
        title: {
          en: 'Managing Your Cookie Preferences',
          hu: 'Cookie beállítások kezelése',
          sk: 'Spravovanie vašich preferencií cookies',
          de: 'Verwaltung Ihrer Cookie-Einstellungen',
          pl: 'Zarządzanie preferencjami plików cookie',
          ro: 'Gestionarea preferințelor cookie',
          cs: 'Správa vašich preferencí cookies'
        },
        content: {
          en: 'You can control and manage cookies through our cookie consent banner that appears when you first visit our website. You can also change your preferences at any time by clicking the cookie settings button in the footer.',
          hu: 'A cookie beállításokat a webhelyünk első látogatásakor megjelenő cookie hozzájárulási bannerünkön keresztül szabályozhatja és kezelheti. Beállításait bármikor módosíthatja a láblécben található cookie beállítások gombra kattintva.',
          sk: 'Môžete kontrolovať a spravovať cookies cez náš banner súhlasu s cookies, ktorý sa zobrazí pri prvom návšteve našej webovej stránky. Svoje preferencie môžete kedykoľvek zmeniť kliknutím na tlačidlo nastavení cookies v pätičke.',
          de: 'Sie können Cookies über unser Cookie-Einverständnis-Banner steuern und verwalten, das beim ersten Besuch unserer Website angezeigt wird. Sie können Ihre Einstellungen auch jederzeit ändern, indem Sie auf die Cookie-Einstellungen-Schaltfläche in der Fußzeile klicken.',
          pl: 'Możesz kontrolować i zarządzać plikami cookie za pomocą naszego banneru zgody na pliki cookie, który pojawia się przy pierwszej wizycie na naszej stronie internetowej. Możesz również zmienić swoje preferencje w dowolnym momencie, klikając przycisk ustawień plików cookie w stopce.',
          ro: 'Puteți controla și gestiona cookie-urile prin bannerul nostru de consimțământ pentru cookie-uri care apare când vizitați prima dată site-ul nostru web. De asemenea, vă puteți schimba preferințele oricând făcând clic pe butonul de setări cookie din subsol.',
          cs: 'Můžete kontrolovat a spravovat cookies prostřednictvím našeho banneru souhlasu s cookies, který se zobrazí při první návštěvě naší webové stránky. Své preference můžete také kdykoli změnit kliknutím na tlačítko nastavení cookies v zápatí.'
        }
      },
      contact: {
        title: {
          en: 'Contact Us',
          hu: 'Kapcsolat',
          sk: 'Kontaktujte nás',
          de: 'Kontaktieren Sie uns',
          pl: 'Skontaktuj się z nami',
          ro: 'Contactați-ne',
          cs: 'Kontaktujte nás'
        },
        content: {
          en: 'If you have any questions about our use of cookies, please contact us at info@allinconverter.com',
          hu: 'Ha bármilyen kérdése van a cookie-k használatával kapcsolatban, kérjük, lépjen kapcsolatba velünk: info@allinconverter.com',
          sk: 'Ak máte akékoľvek otázky týkajúce sa nášho používania cookies, kontaktujte nás na info@allinconverter.com',
          de: 'Wenn Sie Fragen zu unserer Verwendung von Cookies haben, kontaktieren Sie uns bitte unter info@allinconverter.com',
          pl: 'Jeśli masz pytania dotyczące naszego używania plików cookie, skontaktuj się z nami pod adresem info@allinconverter.com',
          ro: 'Dacă aveți întrebări despre utilizarea cookie-urilor de către noi, vă rugăm să ne contactați la info@allinconverter.com',
          cs: 'Pokud máte jakékoli otázky týkající se našeho používání cookies, kontaktujte nás na info@allinconverter.com'
        }
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="mx-auto max-w-4xl px-6 py-8 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {getLocalizedText(content.title)}
          </h1>
          <p className="text-sm text-gray-500">
            {getLocalizedText(content.lastUpdated)}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <div className="prose prose-lg max-w-none">
            {Object.entries(content.sections).map(([key, section]) => (
              <div key={key} className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {getLocalizedText(section.title)}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {getLocalizedText(section.content)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
