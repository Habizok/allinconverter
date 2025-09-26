import { Metadata } from 'next'
import { generateHreflangTags, generateCanonicalUrl } from '@/lib/seo'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const titles = {
    en: 'Privacy Policy - AllInConverter',
    hu: 'Adatvédelmi irányelvek - AllInConverter',
    sk: 'Zásady ochrany súkromia - AllInConverter',
    de: 'Datenschutzrichtlinie - AllInConverter',
    pl: 'Polityka prywatności - AllInConverter',
    ro: 'Politica de confidențialitate - AllInConverter',
    cs: 'Zásady ochrany soukromí - AllInConverter'
  }

  const descriptions = {
    en: 'Learn how AllInConverter protects your privacy and handles your data. GDPR compliant file conversion service.',
    hu: 'Ismerje meg, hogyan védi az AllInConverter az Ön adatait és kezeli az adatvédelmet. GDPR-kompatibilis fájlkonvertáló szolgáltatás.',
    sk: 'Zistite, ako AllInConverter chráni vaše súkromie a spracúva vaše údaje. GDPR-kompatibilná služba konverzie súborov.',
    de: 'Erfahren Sie, wie AllInConverter Ihre Privatsphäre schützt und Ihre Daten verarbeitet. GDPR-konformer Dateikonvertierungsdienst.',
    pl: 'Dowiedz się, jak AllInConverter chroni Twoją prywatność i przetwarza Twoje dane. Usługa konwersji plików zgodna z RODO.',
    ro: 'Aflați cum AllInConverter vă protejează confidențialitatea și își gestionează datele. Serviciu de conversie fișiere conform GDPR.',
    cs: 'Zjistěte, jak AllInConverter chrání vaše soukromí a zpracovává vaše údaje. GDPR-kompatibilní služba konverze souborů.'
  }

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    alternates: {
      canonical: generateCanonicalUrl(`/${locale}/privacy`),
      languages: generateHreflangTags('privacy')
    }
  }
}

export default function PrivacyPage({ params }: Props) {
  const { locale } = params

  const getLocalizedText = (text: Record<string, string>) => {
    return text[locale] || text.en || ''
  }

  const content = {
    title: {
      en: 'Privacy Policy',
      hu: 'Adatvédelmi irányelvek',
      sk: 'Zásady ochrany súkromia',
      de: 'Datenschutzrichtlinie',
      pl: 'Polityka prywatności',
      ro: 'Politica de confidențialitate',
      cs: 'Zásady ochrany soukromí'
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
      introduction: {
        title: {
          en: 'Introduction',
          hu: 'Bevezetés',
          sk: 'Úvod',
          de: 'Einführung',
          pl: 'Wprowadzenie',
          ro: 'Introducere',
          cs: 'Úvod'
        },
        content: {
          en: 'AllInConverter ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our file conversion service.',
          hu: 'Az AllInConverter ("mi", "miénk" vagy "nekünk") elkötelezett az Ön adatainak védelme mellett. Ez az Adatvédelmi irányelv elmagyarázza, hogyan gyűjtjük, használjuk, közöljük és védjük az Ön adatait, amikor a fájlkonvertáló szolgáltatásunkat használja.',
          sk: 'AllInConverter ("my", "naše" alebo "nám") sa zaväzuje chrániť vaše súkromie. Tieto zásady ochrany súkromia vysvetľujú, ako zhromažďujeme, používame, zverejňujeme a chránime vaše informácie pri používaní našej služby konverzie súborov.',
          de: 'AllInConverter ("wir", "unser" oder "uns") verpflichtet sich, Ihre Privatsphäre zu schützen. Diese Datenschutzrichtlinie erklärt, wie wir Ihre Informationen sammeln, verwenden, offenlegen und schützen, wenn Sie unseren Dateikonvertierungsdienst nutzen.',
          pl: 'AllInConverter ("my", "nasz" lub "nam") zobowiązuje się do ochrony Twojej prywatności. Ta Polityka Prywatności wyjaśnia, jak zbieramy, używamy, ujawniamy i chronimy Twoje informacje podczas korzystania z naszej usługi konwersji plików.',
          ro: 'AllInConverter ("noi", "al nostru" sau "ne") se angajează să vă protejeze confidențialitatea. Această Politică de Confidențialitate explică cum colectăm, folosim, dezvăluim și protejăm informațiile dumneavoastră când folosiți serviciul nostru de conversie fișiere.',
          cs: 'AllInConverter ("my", "naše" nebo "nám") se zavazuje chránit vaše soukromí. Tyto zásady ochrany soukromí vysvětlují, jak shromažďujeme, používáme, zveřejňujeme a chráníme vaše informace při používání naší služby konverze souborů.'
        }
      },
      dataCollection: {
        title: {
          en: 'Information We Collect',
          hu: 'Az általunk gyűjtött információk',
          sk: 'Informácie, ktoré zhromažďujeme',
          de: 'Informationen, die wir sammeln',
          pl: 'Informacje, które zbieramy',
          ro: 'Informațiile pe care le colectăm',
          cs: 'Informace, které shromažďujeme'
        },
        content: {
          en: 'We collect information you provide directly to us, such as when you upload files for conversion. We also automatically collect certain information about your device and usage patterns.',
          hu: 'Az Ön által közvetlenül nekünk megadott információkat gyűjtjük, például amikor fájlokat tölt fel konvertálásra. Automatikusan gyűjtünk bizonyos információkat az Ön eszközéről és használati szokásairól.',
          sk: 'Zhromažďujeme informácie, ktoré nám poskytujete priamo, napríklad keď nahrávate súbory na konverziu. Automaticky zhromažďujeme aj určité informácie o vašom zariadení a vzorcoch používania.',
          de: 'Wir sammeln Informationen, die Sie uns direkt zur Verfügung stellen, z.B. wenn Sie Dateien zur Konvertierung hochladen. Wir sammeln auch automatisch bestimmte Informationen über Ihr Gerät und Nutzungsmuster.',
          pl: 'Zbieramy informacje, które przekazujesz nam bezpośrednio, na przykład gdy przesyłasz pliki do konwersji. Automatycznie zbieramy również określone informacje o Twoim urządzeniu i wzorcach użytkowania.',
          ro: 'Colectăm informațiile pe care ni le furnizați direct, cum ar fi când încărcați fișiere pentru conversie. De asemenea, colectăm automat anumite informații despre dispozitivul dumneavoastră și modelele de utilizare.',
          cs: 'Shromažďujeme informace, které nám poskytujete přímo, například když nahráváte soubory pro konverzi. Automaticky shromažďujeme také určité informace o vašem zařízení a vzorcích používání.'
        }
      },
      dataUsage: {
        title: {
          en: 'How We Use Your Information',
          hu: 'Hogyan használjuk az Ön információit',
          sk: 'Ako používame vaše informácie',
          de: 'Wie wir Ihre Informationen verwenden',
          pl: 'Jak używamy Twoich informacji',
          ro: 'Cum folosim informațiile dumneavoastră',
          cs: 'Jak používáme vaše informace'
        },
        content: {
          en: 'We use the information we collect to provide, maintain, and improve our services, process file conversions, and communicate with you about our services.',
          hu: 'Az általunk gyűjtött információkat arra használjuk, hogy szolgáltatásainkat nyújtsuk, karbantartsuk és javítsuk, fájlkonverziókat dolgozzunk fel, és kommunikáljunk Önnel szolgáltatásainkról.',
          sk: 'Používame informácie, ktoré zhromažďujeme, na poskytovanie, údržbu a zlepšovanie našich služieb, spracovanie konverzií súborov a komunikáciu s vami o našich službách.',
          de: 'Wir verwenden die von uns gesammelten Informationen, um unsere Dienste bereitzustellen, zu warten und zu verbessern, Dateikonvertierungen zu verarbeiten und mit Ihnen über unsere Dienste zu kommunizieren.',
          pl: 'Używamy informacji, które zbieramy, aby świadczyć, utrzymywać i ulepszać nasze usługi, przetwarzać konwersje plików i komunikować się z Tobą o naszych usługach.',
          ro: 'Folosim informațiile pe care le colectăm pentru a oferi, întreține și îmbunătăți serviciile noastre, pentru a procesa conversiile de fișiere și pentru a comunica cu dumneavoastră despre serviciile noastre.',
          cs: 'Používáme informace, které shromažďujeme, k poskytování, údržbě a zlepšování našich služeb, zpracování konverzí souborů a komunikaci s vámi o našich službách.'
        }
      },
      dataRetention: {
        title: {
          en: 'Data Retention',
          hu: 'Adatmegőrzés',
          sk: 'Uchovávanie údajov',
          de: 'Datenspeicherung',
          pl: 'Przechowywanie danych',
          ro: 'Păstrarea datelor',
          cs: 'Uchovávání údajů'
        },
        content: {
          en: 'We automatically delete uploaded files and conversion results within 1 hour of processing completion. We do not store your files permanently on our servers.',
          hu: 'A feltöltött fájlokat és konverziós eredményeket automatikusan töröljük a feldolgozás befejezésétől számított 1 órán belül. Fájljait nem tároljuk véglegesen szervereinken.',
          sk: 'Automaticky vymažeme nahrané súbory a výsledky konverzie do 1 hodiny po dokončení spracovania. Vaše súbory trvalo neukladáme na našich serveroch.',
          de: 'Wir löschen hochgeladene Dateien und Konvertierungsergebnisse automatisch innerhalb von 1 Stunde nach Abschluss der Verarbeitung. Wir speichern Ihre Dateien nicht dauerhaft auf unseren Servern.',
          pl: 'Automatycznie usuwamy przesłane pliki i wyniki konwersji w ciągu 1 godziny od zakończenia przetwarzania. Nie przechowujemy Twoich plików trwale na naszych serwerach.',
          ro: 'Ștergem automat fișierele încărcate și rezultatele conversiei în termen de 1 oră de la finalizarea procesării. Nu stocăm fișierele dumneavoastră permanent pe serverele noastre.',
          cs: 'Automaticky mažeme nahrané soubory a výsledky konverze do 1 hodiny po dokončení zpracování. Vaše soubory trvale neukládáme na našich serverech.'
        }
      },
      cookies: {
        title: {
          en: 'Cookies and Tracking',
          hu: 'Cookie-k és követés',
          sk: 'Cookies a sledovanie',
          de: 'Cookies und Tracking',
          pl: 'Pliki cookie i śledzenie',
          ro: 'Cookie-uri și urmărire',
          cs: 'Cookies a sledování'
        },
        content: {
          en: 'We use cookies and similar technologies to enhance your experience, analyze usage patterns, and provide personalized content. You can control cookie preferences through our cookie consent banner.',
          hu: 'Cookie-kat és hasonló technológiákat használunk a felhasználói élmény javítására, a használati szokások elemzésére és személyre szabott tartalom nyújtására. A cookie beállításokat a cookie hozzájárulási bannerünkön keresztül szabályozhatja.',
          sk: 'Používame cookies a podobné technológie na zlepšenie vašich skúseností, analýzu vzorcov používania a poskytovanie personalizovaného obsahu. Preferencie cookies môžete ovládať cez náš banner súhlasu s cookies.',
          de: 'Wir verwenden Cookies und ähnliche Technologien, um Ihr Erlebnis zu verbessern, Nutzungsmuster zu analysieren und personalisierte Inhalte bereitzustellen. Sie können Cookie-Einstellungen über unser Cookie-Einverständnis-Banner steuern.',
          pl: 'Używamy plików cookie i podobnych technologii, aby ulepszyć Twoje doświadczenia, analizować wzorce użytkowania i dostarczać spersonalizowane treści. Możesz kontrolować preferencje plików cookie przez nasz banner zgody na pliki cookie.',
          ro: 'Folosim cookie-uri și tehnologii similare pentru a vă îmbunătăți experiența, a analiza modelele de utilizare și a oferi conținut personalizat. Puteți controla preferințele cookie-urilor prin bannerul nostru de consimțământ pentru cookie-uri.',
          cs: 'Používáme cookies a podobné technologie k vylepšení vašich zkušeností, analýze vzorců používání a poskytování personalizovaného obsahu. Předvolby cookies můžete ovládat prostřednictvím našeho banneru souhlasu s cookies.'
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
          en: 'If you have any questions about this Privacy Policy, please contact us at info@allinconverter.com',
          hu: 'Ha bármilyen kérdése van ezzel az Adatvédelmi irányelvvel kapcsolatban, kérjük, lépjen kapcsolatba velünk: info@allinconverter.com',
          sk: 'Ak máte akékoľvek otázky týkajúce sa týchto zásad ochrany súkromia, kontaktujte nás na info@allinconverter.com',
          de: 'Wenn Sie Fragen zu dieser Datenschutzrichtlinie haben, kontaktieren Sie uns bitte unter info@allinconverter.com',
          pl: 'Jeśli masz pytania dotyczące tej Polityki Prywatności, skontaktuj się z nami pod adresem info@allinconverter.com',
          ro: 'Dacă aveți întrebări despre această Politică de Confidențialitate, vă rugăm să ne contactați la info@allinconverter.com',
          cs: 'Pokud máte jakékoli otázky týkající se těchto zásad ochrany soukromí, kontaktujte nás na info@allinconverter.com'
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
