import { Metadata } from 'next'
import { generateHreflangTags, generateCanonicalUrl } from '@/lib/seo'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const titles = {
    en: 'About AllInConverter - Universal File Converter Platform',
    hu: 'Az AllInConverter-ről - Univerzális fájlkonvertáló platform',
    sk: 'O AllInConverter - Univerzálna platforma na konverziu súborov',
    de: 'Über AllInConverter - Universelle Dateikonvertierungsplattform',
    pl: 'O AllInConverter - Uniwersalna platforma konwersji plików',
    ro: 'Despre AllInConverter - Platformă universală de conversie fișiere',
    cs: 'O AllInConverter - Univerzální platforma pro konverzi souborů'
  }

  const descriptions = {
    en: 'Learn about AllInConverter, the leading online file conversion platform. Discover our mission, technology, and commitment to providing fast, secure, and free file conversion services.',
    hu: 'Ismerje meg az AllInConverter-t, a vezető online fájlkonvertáló platformot. Fedezze fel küldetésünket, technológiánkat és elkötelezettségünket a gyors, biztonságos és ingyenes fájlkonvertálási szolgáltatások nyújtásában.',
    sk: 'Získajte informácie o AllInConverter, poprednej online platforme na konverziu súborov. Objavte našu misiu, technológiu a záväzok poskytovať rýchle, bezpečné a bezplatné služby konverzie súborov.',
    de: 'Erfahren Sie mehr über AllInConverter, die führende Online-Dateikonvertierungsplattform. Entdecken Sie unsere Mission, Technologie und unser Engagement für schnelle, sichere und kostenlose Dateikonvertierungsdienste.',
    pl: 'Dowiedz się więcej o AllInConverter, wiodącej platformie konwersji plików online. Odkryj naszą misję, technologię i zaangażowanie w zapewnianie szybkich, bezpiecznych i bezpłatnych usług konwersji plików.',
    ro: 'Aflați despre AllInConverter, platforma de conversie fișiere online de lider. Descoperiți misiunea noastră, tehnologia și angajamentul nostru de a oferi servicii de conversie fișiere rapide, sigure și gratuite.',
    cs: 'Přečtěte si o AllInConverter, přední online platformě pro konverzi souborů. Objevte naši misi, technologii a závazek poskytovat rychlé, bezpečné a bezplatné služby konverze souborů.'
  }

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    alternates: {
      canonical: generateCanonicalUrl(`/${locale}/about`),
      languages: generateHreflangTags('about')
    }
  }
}

export default function AboutPage({ params }: Props) {
  const { locale } = params

  const getLocalizedText = (text: Record<string, string>) => {
    return text[locale] || text.en || ''
  }

  const content = {
    title: {
      en: 'About AllInConverter',
      hu: 'Az AllInConverter-ről',
      sk: 'O AllInConverter',
      de: 'Über AllInConverter',
      pl: 'O AllInConverter',
      ro: 'Despre AllInConverter',
      cs: 'O AllInConverter'
    },
    subtitle: {
      en: 'The Universal File Conversion Platform',
      hu: 'Az univerzális fájlkonvertáló platform',
      sk: 'Univerzálna platforma na konverziu súborov',
      de: 'Die universelle Dateikonvertierungsplattform',
      pl: 'Uniwersalna platforma konwersji plików',
      ro: 'Platforma universală de conversie fișiere',
      cs: 'Univerzální platforma pro konverzi souborů'
    },
    sections: {
      mission: {
        title: {
          en: 'Our Mission',
          hu: 'Küldetésünk',
          sk: 'Naša misia',
          de: 'Unsere Mission',
          pl: 'Nasza misja',
          ro: 'Misiunea noastră',
          cs: 'Naše poslání'
        },
        content: {
          en: 'AllInConverter was created with a simple mission: to make file conversion accessible, fast, and secure for everyone. We believe that technology should simplify your workflow, not complicate it. Our platform eliminates the need for expensive software licenses, complex installations, and technical expertise.',
          hu: 'Az AllInConverter egy egyszerű küldetéssel jött létre: hogy a fájlkonvertálást mindenki számára elérhetővé, gyorssá és biztonságossá tegyük. Úgy gondoljuk, hogy a technológia egyszerűsítenie kell a munkafolyamatot, nem bonyolítania. Platformunk megszünteti a drága szoftverlicencek, bonyolult telepítések és technikai szakértelem szükségességét.',
          sk: 'AllInConverter bol vytvorený s jednoduchou misiou: urobiť konverziu súborov dostupnú, rýchlu a bezpečnú pre každého. Veríme, že technológia by mala zjednodušiť váš pracovný tok, nie ho komplikovať. Naša platforma eliminuje potrebu drahých softvérových licencií, zložitých inštalácií a technických znalostí.',
          de: 'AllInConverter wurde mit einer einfachen Mission erstellt: Dateikonvertierung für jeden zugänglich, schnell und sicher zu machen. Wir glauben, dass Technologie Ihren Workflow vereinfachen, nicht komplizieren sollte. Unsere Plattform eliminiert die Notwendigkeit teurer Softwarelizenzen, komplexer Installationen und technischer Expertise.',
          pl: 'AllInConverter został stworzony z prostą misją: uczynić konwersję plików dostępną, szybką i bezpieczną dla wszystkich. Wierzymy, że technologia powinna upraszczać Twój przepływ pracy, a nie go komplikować. Nasza platforma eliminuje potrzebę drogich licencji oprogramowania, skomplikowanych instalacji i wiedzy technicznej.',
          ro: 'AllInConverter a fost creat cu o misiune simplă: să facă conversia fișierelor accesibilă, rapidă și sigură pentru toată lumea. Credem că tehnologia ar trebui să simplifice fluxul de lucru, nu să-l compliceze. Platforma noastră elimină necesitatea licențelor software scumpe, instalărilor complexe și expertizei tehnice.',
          cs: 'AllInConverter byl vytvořen s jednoduchou misí: učinit konverzi souborů dostupnou, rychlou a bezpečnou pro každého. Věříme, že technologie by měla zjednodušit váš pracovní tok, ne ho komplikovat. Naše platforma eliminuje potřebu drahých softwarových licencí, složitých instalací a technických znalostí.'
        }
      },
      technology: {
        title: {
          en: 'Our Technology',
          hu: 'Technológiánk',
          sk: 'Naša technológia',
          de: 'Unsere Technologie',
          pl: 'Nasza technologia',
          ro: 'Tehnologia noastră',
          cs: 'Naše technologie'
        },
        content: {
          en: 'Built with modern web technologies including Next.js, TypeScript, and Docker containers, AllInConverter delivers enterprise-grade performance with consumer-friendly simplicity. Our distributed architecture ensures your files are processed securely and efficiently, with automatic cleanup for privacy protection.',
          hu: 'Modern webtechnológiákkal építve, beleértve a Next.js-t, TypeScript-et és Docker konténereket, az AllInConverter vállalati szintű teljesítményt nyújt fogyasztóbarát egyszerűséggel. Elosztott architektúránk biztosítja, hogy fájljai biztonságosan és hatékonyan legyenek feldolgozva, automatikus tisztítással az adatvédelem érdekében.',
          sk: 'Postavené s modernými webovými technológiami vrátane Next.js, TypeScript a Docker kontajnerov, AllInConverter poskytuje výkon na úrovni podniku s jednoduchosťou priateľskou pre spotrebiteľov. Naša distribuovaná architektúra zabezpečuje, že vaše súbory sú spracované bezpečne a efektívne, s automatickým čistením na ochranu súkromia.',
          de: 'Gebaut mit modernen Web-Technologien einschließlich Next.js, TypeScript und Docker-Containern, liefert AllInConverter Enterprise-Grade-Performance mit verbraucherfreundlicher Einfachheit. Unsere verteilte Architektur stellt sicher, dass Ihre Dateien sicher und effizient verarbeitet werden, mit automatischer Bereinigung zum Schutz der Privatsphäre.',
          pl: 'Zbudowane z nowoczesnymi technologiami internetowymi, w tym Next.js, TypeScript i kontenerami Docker, AllInConverter zapewnia wydajność na poziomie przedsiębiorstwa z prostotą przyjazną konsumentowi. Nasza rozproszona architektura zapewnia bezpieczne i efektywne przetwarzanie plików z automatycznym czyszczeniem w celu ochrony prywatności.',
          ro: 'Construit cu tehnologii web moderne, inclusiv Next.js, TypeScript și containere Docker, AllInConverter oferă performanță de nivel enterprise cu simplitate prietenoasă pentru consumatori. Arhitectura noastră distribuită asigură că fișierele dumneavoastră sunt procesate în siguranță și eficient, cu curățare automată pentru protecția confidențialității.',
          cs: 'Postaveno s moderními webovými technologiemi včetně Next.js, TypeScript a Docker kontejnerů, AllInConverter poskytuje výkon na úrovni podniku s jednoduchostí přátelskou pro spotřebitele. Naše distribuovaná architektura zajišťuje, že vaše soubory jsou zpracovávány bezpečně a efektivně, s automatickým čištěním pro ochranu soukromí.'
        }
      },
      features: {
        title: {
          en: 'Why Choose AllInConverter?',
          hu: 'Miért válassza az AllInConverter-t?',
          sk: 'Prečo si vybrať AllInConverter?',
          de: 'Warum AllInConverter wählen?',
          pl: 'Dlaczego wybrać AllInConverter?',
          ro: 'De ce să alegeți AllInConverter?',
          cs: 'Proč si vybrat AllInConverter?'
        },
        items: {
          en: [
            '40+ file conversion formats supported',
            'No registration or software installation required',
            'Files automatically deleted after 1 hour for privacy',
            'Enterprise-grade security and encryption',
            'Multilingual support in 7 languages',
            'Mobile-friendly responsive design',
            'Fast processing with modern cloud infrastructure'
          ],
          hu: [
            '40+ fájlkonverziós formátum támogatott',
            'Nincs szükség regisztrációra vagy szoftver telepítésre',
            'Fájlok automatikusan törlődnek 1 óra után az adatvédelem érdekében',
            'Vállalati szintű biztonság és titkosítás',
            'Többnyelvű támogatás 7 nyelven',
            'Mobilbarát reszponzív design',
            'Gyors feldolgozás modern felhő infrastruktúrával'
          ],
          sk: [
            'Podporuje 40+ formátov konverzie súborov',
            'Nie je potrebná registrácia ani inštalácia softvéru',
            'Súbory sa automaticky vymažú po 1 hodine kvôli súkromiu',
            'Bezpečnosť a šifrovanie na úrovni podniku',
            'Viacjazyčná podpora v 7 jazykoch',
            'Mobilne priateľský responzívny dizajn',
            'Rýchle spracovanie s modernou cloud infraštruktúrou'
          ],
          de: [
            '40+ Dateikonvertierungsformate unterstützt',
            'Keine Registrierung oder Softwareinstallation erforderlich',
            'Dateien werden automatisch nach 1 Stunde für die Privatsphäre gelöscht',
            'Enterprise-Grade-Sicherheit und -Verschlüsselung',
            'Mehrsprachige Unterstützung in 7 Sprachen',
            'Mobilfreundliches responsives Design',
            'Schnelle Verarbeitung mit moderner Cloud-Infrastruktur'
          ],
          pl: [
            'Obsługuje 40+ formatów konwersji plików',
            'Nie wymaga rejestracji ani instalacji oprogramowania',
            'Pliki automatycznie usuwane po 1 godzinie dla prywatności',
            'Bezpieczeństwo i szyfrowanie na poziomie przedsiębiorstwa',
            'Wielojęzyczne wsparcie w 7 językach',
            'Przyjazny dla urządzeń mobilnych responsywny design',
            'Szybkie przetwarzanie z nowoczesną infrastrukturą chmurową'
          ],
          ro: [
            'Suportă 40+ formate de conversie fișiere',
            'Nu necesită înregistrare sau instalare software',
            'Fișierele sunt șterse automat după 1 oră pentru confidențialitate',
            'Securitate și criptare de nivel enterprise',
            'Suport multilingv în 7 limbi',
            'Design responsiv prietenos cu mobilele',
            'Procesare rapidă cu infrastructură cloud modernă'
          ],
          cs: [
            'Podporuje 40+ formátů konverze souborů',
            'Nevyžaduje registraci ani instalaci softwaru',
            'Soubory se automaticky mažou po 1 hodině pro soukromí',
            'Bezpečnost a šifrování na úrovni podniku',
            'Vícejazyčná podpora v 7 jazycích',
            'Mobilně přívětivý responzivní design',
            'Rychlé zpracování s moderní cloud infrastrukturou'
          ]
        }
      },
      team: {
        title: {
          en: 'Our Team',
          hu: 'Csapatunk',
          sk: 'Náš tím',
          de: 'Unser Team',
          pl: 'Nasz zespół',
          ro: 'Echipa noastră',
          cs: 'Náš tým'
        },
        content: {
          en: 'AllInConverter is developed by a passionate team of engineers, designers, and product managers who believe in the power of simple, effective solutions. We are committed to continuously improving our platform and adding new features based on user feedback.',
          hu: 'Az AllInConverter-t egy szenvedélyes mérnökökből, tervezőkből és termékvezetők csapata fejleszti, akik hisznek az egyszerű, hatékony megoldások erejében. Elkötelezettek vagyunk platformunk folyamatos fejlesztésében és új funkciók hozzáadásában a felhasználói visszajelzések alapján.',
          sk: 'AllInConverter je vyvinutý vášnivým tímom inžinierov, dizajnérov a produktových manažérov, ktorí veria v silu jednoduchých, efektívnych riešení. Sme odhodlaní neustále zlepšovať našu platformu a pridávať nové funkcie na základe spätnej väzby používateľov.',
          de: 'AllInConverter wird von einem leidenschaftlichen Team von Ingenieuren, Designern und Produktmanagern entwickelt, die an die Kraft einfacher, effektiver Lösungen glauben. Wir sind verpflichtet, unsere Plattform kontinuierlich zu verbessern und neue Funktionen basierend auf Benutzerfeedback hinzuzufügen.',
          pl: 'AllInConverter jest rozwijany przez pasjonatów zespołu inżynierów, projektantów i menedżerów produktów, którzy wierzą w moc prostych, skutecznych rozwiązań. Jesteśmy zaangażowani w ciągłe ulepszanie naszej platformy i dodawanie nowych funkcji na podstawie opinii użytkowników.',
          ro: 'AllInConverter este dezvoltat de o echipă pasionată de ingineri, designeri și manageri de produse care cred în puterea soluțiilor simple și eficiente. Suntem angajați să îmbunătățim continuu platforma noastră și să adăugăm noi funcții bazate pe feedback-ul utilizatorilor.',
          cs: 'AllInConverter je vyvíjen vášnivým týmem inženýrů, designérů a produktových manažerů, kteří věří v sílu jednoduchých, efektivních řešení. Jsme odhodláni neustále zlepšovat naši platformu a přidávat nové funkce na základě zpětné vazby uživatelů.'
        }
      },
      contact: {
        title: {
          en: 'Get in Touch',
          hu: 'Lépjen kapcsolatba',
          sk: 'Kontaktujte nás',
          de: 'Kontakt aufnehmen',
          pl: 'Skontaktuj się',
          ro: 'Contactați-ne',
          cs: 'Kontaktujte nás'
        },
        content: {
          en: 'Have questions, suggestions, or need support? We\'d love to hear from you. Contact us at info@allinconverter.com or visit our help center for detailed guides and FAQs.',
          hu: 'Van kérdése, javaslata vagy támogatásra van szüksége? Szívesen hallanánk Öntől. Lépjen kapcsolatba velünk: info@allinconverter.com vagy látogassa meg súgó központunkat részletes útmutatókért és GYIK-ért.',
          sk: 'Máte otázky, návrhy alebo potrebujete podporu? Radi by sme počuli od vás. Kontaktujte nás na info@allinconverter.com alebo navštívte naše centrum pomoci pre podrobné sprievodcov a často kladené otázky.',
          de: 'Haben Sie Fragen, Vorschläge oder benötigen Sie Support? Wir würden gerne von Ihnen hören. Kontaktieren Sie uns unter info@allinconverter.com oder besuchen Sie unser Hilfezentrum für detaillierte Anleitungen und FAQs.',
          pl: 'Masz pytania, sugestie lub potrzebujesz wsparcia? Chcielibyśmy usłyszeć od Ciebie. Skontaktuj się z nami pod adresem info@allinconverter.com lub odwiedź nasze centrum pomocy, aby uzyskać szczegółowe przewodniki i często zadawane pytania.',
          ro: 'Aveți întrebări, sugestii sau aveți nevoie de suport? Ne-ar plăcea să auzim de la dumneavoastră. Contactați-ne la info@allinconverter.com sau vizitați centrul nostru de ajutor pentru ghiduri detaliate și întrebări frecvente.',
          cs: 'Máte otázky, návrhy nebo potřebujete podporu? Rádi bychom slyšeli od vás. Kontaktujte nás na info@allinconverter.com nebo navštivte naše centrum nápovědy pro podrobné průvodce a často kladené otázky.'
        }
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
        <div className="space-y-12">
          {/* Mission */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {getLocalizedText(content.sections.mission.title)}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {getLocalizedText(content.sections.mission.content)}
            </p>
          </div>

          {/* Technology */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {getLocalizedText(content.sections.technology.title)}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {getLocalizedText(content.sections.technology.content)}
            </p>
          </div>

          {/* Features */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {getLocalizedText(content.sections.features.title)}
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getLocalizedText(content.sections.features.items).map((item: string, index: number) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Team */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {getLocalizedText(content.sections.team.title)}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {getLocalizedText(content.sections.team.content)}
            </p>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
            <h2 className="text-2xl font-semibold mb-6">
              {getLocalizedText(content.sections.contact.title)}
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              {getLocalizedText(content.sections.contact.content)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:info@allinconverter.com"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Contact Us
              </a>
              <a
                href="/help"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition-colors"
              >
                Help Center
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
