import { Metadata } from 'next'
import { generateHreflangTags, generateCanonicalUrl } from '@/lib/seo'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const titles = {
    en: 'Terms of Service - AllInConverter',
    hu: 'Szolgáltatási feltételek - AllInConverter',
    sk: 'Podmienky služby - AllInConverter',
    de: 'Nutzungsbedingungen - AllInConverter',
    pl: 'Warunki usługi - AllInConverter',
    ro: 'Termeni de serviciu - AllInConverter',
    cs: 'Podmínky služby - AllInConverter'
  }

  const descriptions = {
    en: 'Terms of Service for AllInConverter file conversion platform. Learn about usage terms, limitations, and user responsibilities.',
    hu: 'Az AllInConverter fájlkonvertáló platform szolgáltatási feltételei. Ismerje meg a használati feltételeket, korlátozásokat és felhasználói felelősségeket.',
    sk: 'Podmienky služby pre platformu konverzie súborov AllInConverter. Zistite o podmienkach používania, obmedzeniach a zodpovednostiach používateľov.',
    de: 'Nutzungsbedingungen für die AllInConverter-Dateikonvertierungsplattform. Erfahren Sie mehr über Nutzungsbedingungen, Einschränkungen und Benutzerverantwortlichkeiten.',
    pl: 'Warunki usługi dla platformy konwersji plików AllInConverter. Dowiedz się o warunkach użytkowania, ograniczeniach i odpowiedzialności użytkowników.',
    ro: 'Termeni de serviciu pentru platforma de conversie fișiere AllInConverter. Aflați despre termenii de utilizare, limitări și responsabilitățile utilizatorilor.',
    cs: 'Podmínky služby pro platformu konverze souborů AllInConverter. Zjistěte o podmínkách používání, omezeních a odpovědnostech uživatelů.'
  }

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    alternates: {
      canonical: generateCanonicalUrl(`/${locale}/terms`),
      languages: generateHreflangTags('terms')
    }
  }
}

export default function TermsPage({ params }: Props) {
  const { locale } = params

  const getLocalizedText = (text: Record<string, string>) => {
    return text[locale] || text.en || ''
  }

  const content = {
    title: {
      en: 'Terms of Service',
      hu: 'Szolgáltatási feltételek',
      sk: 'Podmienky služby',
      de: 'Nutzungsbedingungen',
      pl: 'Warunki usługi',
      ro: 'Termeni de serviciu',
      cs: 'Podmínky služby'
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
      acceptance: {
        title: {
          en: 'Acceptance of Terms',
          hu: 'Feltételek elfogadása',
          sk: 'Prijatie podmienok',
          de: 'Annahme der Bedingungen',
          pl: 'Akceptacja warunków',
          ro: 'Acceptarea termenilor',
          cs: 'Přijetí podmínek'
        },
        content: {
          en: 'By using AllInConverter, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.',
          hu: 'Az AllInConverter használatával Ön elfogadja ezeket a Szolgáltatási feltételeket. Ha nem ért egyet ezekkel a feltételekkel, kérjük, ne használja szolgáltatásunkat.',
          sk: 'Používaním AllInConverter súhlasíte s týmto zviazaním týmito Podmienkami služby. Ak s týmito podmienkami nesúhlasíte, nepoužívajte našu službu.',
          de: 'Durch die Nutzung von AllInConverter stimmen Sie zu, an diese Nutzungsbedingungen gebunden zu sein. Wenn Sie diesen Bedingungen nicht zustimmen, nutzen Sie bitte unseren Service nicht.',
          pl: 'Używając AllInConverter, zgadzasz się być związany tymi Warunkami Usługi. Jeśli nie zgadzasz się z tymi warunkami, nie używaj naszej usługi.',
          ro: 'Prin utilizarea AllInConverter, sunteți de acord să fiți legați de acești Termeni de Serviciu. Dacă nu sunteți de acord cu acești termeni, vă rugăm să nu utilizați serviciul nostru.',
          cs: 'Používáním AllInConverter souhlasíte s tím, že budete vázáni těmito Podmínkami služby. Pokud s těmito podmínkami nesouhlasíte, nepoužívejte naši službu.'
        }
      },
      service: {
        title: {
          en: 'Service Description',
          hu: 'Szolgáltatás leírása',
          sk: 'Popis služby',
          de: 'Servicebeschreibung',
          pl: 'Opis usługi',
          ro: 'Descrierea serviciului',
          cs: 'Popis služby'
        },
        content: {
          en: 'AllInConverter provides online file conversion services. We convert files between various formats including documents, images, audio, and video files.',
          hu: 'Az AllInConverter online fájlkonvertáló szolgáltatásokat nyújt. Fájlokat konvertálunk különböző formátumok között, beleértve a dokumentumokat, képeket, hang- és videofájlokat.',
          sk: 'AllInConverter poskytuje služby online konverzie súborov. Konvertujeme súbory medzi rôznymi formátmi vrátane dokumentov, obrázkov, zvukových a video súborov.',
          de: 'AllInConverter bietet Online-Dateikonvertierungsdienste an. Wir konvertieren Dateien zwischen verschiedenen Formaten, einschließlich Dokumenten, Bildern, Audio- und Videodateien.',
          pl: 'AllInConverter świadczy usługi konwersji plików online. Konwertujemy pliki między różnymi formatami, w tym dokumentami, obrazami, plikami audio i wideo.',
          ro: 'AllInConverter oferă servicii de conversie fișiere online. Convertim fișiere între diferite formate, inclusiv documente, imagini, fișiere audio și video.',
          cs: 'AllInConverter poskytuje služby online konverze souborů. Konvertujeme soubory mezi různými formáty včetně dokumentů, obrázků, audio a video souborů.'
        }
      },
      limitations: {
        title: {
          en: 'Service Limitations',
          hu: 'Szolgáltatási korlátozások',
          sk: 'Obmedzenia služby',
          de: 'Serviceeinschränkungen',
          pl: 'Ograniczenia usługi',
          ro: 'Limitări ale serviciului',
          cs: 'Omezení služby'
        },
        content: {
          en: 'File size is limited to 512MB per upload. We reserve the right to limit or suspend service for users who abuse our platform. Files are automatically deleted after 1 hour.',
          hu: 'A fájlméret feltöltésenként 512MB-ra korlátozott. Fenntartjuk a jogot a szolgáltatás korlátozására vagy felfüggesztésére azok számára, akik visszaélnek platformunkkal. A fájlok automatikusan törlődnek 1 óra után.',
          sk: 'Veľkosť súboru je obmedzená na 512MB na nahrávanie. Vyhradzujeme si právo obmedziť alebo pozastaviť službu pre používateľov, ktorí zneužívajú našu platformu. Súbory sa automaticky vymažú po 1 hodine.',
          de: 'Die Dateigröße ist auf 512MB pro Upload begrenzt. Wir behalten uns das Recht vor, den Service für Benutzer zu begrenzen oder auszusetzen, die unsere Plattform missbrauchen. Dateien werden nach 1 Stunde automatisch gelöscht.',
          pl: 'Rozmiar pliku jest ograniczony do 512MB na przesłanie. Zastrzegamy sobie prawo do ograniczenia lub zawieszenia usługi dla użytkowników, którzy nadużywają naszej platformy. Pliki są automatycznie usuwane po 1 godzinie.',
          ro: 'Dimensiunea fișierului este limitată la 512MB per încărcare. Ne rezervăm dreptul de a limita sau suspenda serviciul pentru utilizatorii care abuzează platforma noastră. Fișierele sunt șterse automat după 1 oră.',
          cs: 'Velikost souboru je omezena na 512MB na nahrání. Vyhrazujeme si právo omezit nebo pozastavit službu pro uživatele, kteří zneužívají naši platformu. Soubory se automaticky mažou po 1 hodině.'
        }
      },
      prohibited: {
        title: {
          en: 'Prohibited Uses',
          hu: 'Tiltott használat',
          sk: 'Zakázané použitie',
          de: 'Verbotene Verwendungen',
          pl: 'Zabronione użycia',
          ro: 'Utilizări interzise',
          cs: 'Zakázané použití'
        },
        content: {
          en: 'You may not use our service to convert illegal, copyrighted, or malicious content. You are responsible for ensuring you have the right to convert any files you upload.',
          hu: 'Szolgáltatásunkat nem használhatja illegális, szerzői joggal védett vagy rosszindulatú tartalom konvertálására. Ön felelős azért, hogy biztosítsa, hogy jogosultsága van a feltöltött fájlok konvertálására.',
          sk: 'Našu službu nemôžete použiť na konverziu nezákonného, autorsky chráneného alebo škodlivého obsahu. Zodpovedáte za zabezpečenie, že máte právo konvertovať akékoľvek súbory, ktoré nahrajete.',
          de: 'Sie dürfen unseren Service nicht zur Konvertierung illegaler, urheberrechtlich geschützter oder bösartiger Inhalte verwenden. Sie sind dafür verantwortlich, sicherzustellen, dass Sie das Recht haben, alle von Ihnen hochgeladenen Dateien zu konvertieren.',
          pl: 'Nie możesz używać naszej usługi do konwersji nielegalnej, chronionej prawem autorskim lub złośliwej treści. Jesteś odpowiedzialny za zapewnienie, że masz prawo konwertować wszystkie przesłane pliki.',
          ro: 'Nu puteți folosi serviciul nostru pentru a converti conținut ilegal, protejat de drepturi de autor sau răuvoitor. Sunteți responsabil pentru a vă asigura că aveți dreptul să convertiți orice fișiere pe care le încărcați.',
          cs: 'Naši službu nemůžete použít k převodu nezákonného, autorsky chráněného nebo škodlivého obsahu. Jste odpovědní za zajištění, že máte právo převádět jakékoli soubory, které nahrajete.'
        }
      },
      liability: {
        title: {
          en: 'Limitation of Liability',
          hu: 'Felelősség korlátozása',
          sk: 'Obmedzenie zodpovednosti',
          de: 'Haftungsbeschränkung',
          pl: 'Ograniczenie odpowiedzialności',
          ro: 'Limitarea răspunderii',
          cs: 'Omezení odpovědnosti'
        },
        content: {
          en: 'AllInConverter is provided "as is" without warranties. We are not liable for any loss of data, files, or damages resulting from the use of our service.',
          hu: 'Az AllInConverter "ahogy van" alapon kerül nyújtásra garanciák nélkül. Nem vagyunk felelősek adatvesztésért, fájlvesztésért vagy a szolgáltatásunk használatából eredő károkért.',
          sk: 'AllInConverter sa poskytuje "tak, ako je" bez záruk. Nie sme zodpovední za akúkoľvek stratu údajov, súborov alebo škody vyplývajúce z používania našej služby.',
          de: 'AllInConverter wird "wie besehen" ohne Gewährleistungen bereitgestellt. Wir haften nicht für Datenverlust, Dateiverlust oder Schäden, die aus der Nutzung unseres Services resultieren.',
          pl: 'AllInConverter jest dostarczany "jak jest" bez gwarancji. Nie ponosimy odpowiedzialności za utratę danych, plików lub szkody wynikające z korzystania z naszej usługi.',
          ro: 'AllInConverter este oferit "așa cum este" fără garanții. Nu suntem responsabili pentru pierderea de date, fișiere sau daune rezultate din utilizarea serviciului nostru.',
          cs: 'AllInConverter je poskytován "tak, jak je" bez záruk. Nejsme odpovědní za ztrátu dat, souborů nebo škody vyplývající z používání naší služby.'
        }
      },
      changes: {
        title: {
          en: 'Changes to Terms',
          hu: 'Feltételek módosítása',
          sk: 'Zmeny podmienok',
          de: 'Änderungen der Bedingungen',
          pl: 'Zmiany warunków',
          ro: 'Modificări ale termenilor',
          cs: 'Změny podmínek'
        },
        content: {
          en: 'We reserve the right to modify these terms at any time. Continued use of our service after changes constitutes acceptance of the new terms.',
          hu: 'Fenntartjuk a jogot ezen feltételek bármikori módosítására. A szolgáltatásunk további használata a módosítások után az új feltételek elfogadását jelenti.',
          sk: 'Vyhradzujeme si právo kedykoľvek upraviť tieto podmienky. Pokračovanie v používaní našej služby po zmene predstavuje prijatie nových podmienok.',
          de: 'Wir behalten uns das Recht vor, diese Bedingungen jederzeit zu ändern. Die fortgesetzte Nutzung unseres Services nach Änderungen stellt die Annahme der neuen Bedingungen dar.',
          pl: 'Zastrzegamy sobie prawo do modyfikacji tych warunków w dowolnym momencie. Kontynuowanie korzystania z naszej usługi po zmianach oznacza akceptację nowych warunków.',
          ro: 'Ne rezervăm dreptul de a modifica acești termeni în orice moment. Utilizarea continuă a serviciului nostru după modificări constituie acceptarea noilor termeni.',
          cs: 'Vyhrazujeme si právo kdykoli upravit tyto podmínky. Pokračování v používání naší služby po změně představuje přijetí nových podmínek.'
        }
      },
      contact: {
        title: {
          en: 'Contact Information',
          hu: 'Kapcsolati információk',
          sk: 'Kontaktné informácie',
          de: 'Kontaktinformationen',
          pl: 'Informacje kontaktowe',
          ro: 'Informații de contact',
          cs: 'Kontaktní informace'
        },
        content: {
          en: 'For questions about these Terms of Service, please contact us at info@allinconverter.com',
          hu: 'Ha kérdései vannak ezekkel a Szolgáltatási feltételekkel kapcsolatban, kérjük, lépjen kapcsolatba velünk: info@allinconverter.com',
          sk: 'Pre otázky týkajúce sa týchto Podmienok služby nás kontaktujte na info@allinconverter.com',
          de: 'Bei Fragen zu diesen Nutzungsbedingungen kontaktieren Sie uns bitte unter info@allinconverter.com',
          pl: 'W przypadku pytań dotyczących tych Warunków Usługi skontaktuj się z nami pod adresem info@allinconverter.com',
          ro: 'Pentru întrebări despre acești Termeni de Serviciu, vă rugăm să ne contactați la info@allinconverter.com',
          cs: 'Pro otázky týkající se těchto Podmínek služby nás kontaktujte na info@allinconverter.com'
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
