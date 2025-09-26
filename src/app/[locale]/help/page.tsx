import { Metadata } from 'next'
import { generateHreflangTags, generateCanonicalUrl } from '@/lib/seo'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const titles = {
    en: 'Help & Support - AllInConverter',
    hu: 'Súgó és támogatás - AllInConverter',
    sk: 'Pomoc a podpora - AllInConverter',
    de: 'Hilfe & Support - AllInConverter',
    pl: 'Pomoc i wsparcie - AllInConverter',
    ro: 'Ajutor și suport - AllInConverter',
    cs: 'Nápověda a podpora - AllInConverter'
  }

  const descriptions = {
    en: 'Get help with AllInConverter file conversion service. Find answers to common questions, learn how to use our tools, and get support.',
    hu: 'Segítség az AllInConverter fájlkonvertáló szolgáltatáshoz. Találjon válaszokat gyakori kérdésekre, tanulja meg, hogyan használja eszközeinket, és kapjon támogatást.',
    sk: 'Získajte pomoc so službou konverzie súborov AllInConverter. Nájdite odpovede na bežné otázky, naučte sa používať naše nástroje a získajte podporu.',
    de: 'Erhalten Sie Hilfe mit dem AllInConverter-Dateikonvertierungsdienst. Finden Sie Antworten auf häufige Fragen, lernen Sie, wie Sie unsere Tools verwenden, und erhalten Sie Support.',
    pl: 'Uzyskaj pomoc z usługą konwersji plików AllInConverter. Znajdź odpowiedzi na częste pytania, naucz się korzystać z naszych narzędzi i uzyskaj wsparcie.',
    ro: 'Obțineți ajutor cu serviciul de conversie fișiere AllInConverter. Găsiți răspunsuri la întrebările frecvente, învățați cum să folosiți instrumentele noastre și obțineți suport.',
    cs: 'Získejte pomoc se službou konverze souborů AllInConverter. Najděte odpovědi na běžné otázky, naučte se používat naše nástroje a získejte podporu.'
  }

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    alternates: {
      canonical: generateCanonicalUrl(`/${locale}/help`),
      languages: generateHreflangTags('help')
    }
  }
}

export default function HelpPage({ params }: Props) {
  const { locale } = params

  const getLocalizedText = (text: Record<string, string>) => {
    return text[locale] || text.en || ''
  }

  const content = {
    title: {
      en: 'Help & Support',
      hu: 'Súgó és támogatás',
      sk: 'Pomoc a podpora',
      de: 'Hilfe & Support',
      pl: 'Pomoc i wsparcie',
      ro: 'Ajutor și suport',
      cs: 'Nápověda a podpora'
    },
    sections: {
      howToUse: {
        title: {
          en: 'How to Use AllInConverter',
          hu: 'Hogyan használja az AllInConverter-t',
          sk: 'Ako používať AllInConverter',
          de: 'Wie man AllInConverter verwendet',
          pl: 'Jak używać AllInConverter',
          ro: 'Cum să folosiți AllInConverter',
          cs: 'Jak používat AllInConverter'
        },
        steps: {
          en: [
            'Select the conversion type you need from our homepage or converter pages',
            'Click the upload area or drag and drop your file',
            'Wait for the conversion to complete (usually takes a few seconds)',
            'Download your converted file'
          ],
          hu: [
            'Válassza ki a szükséges konverziós típust a főoldalunkról vagy konverter oldalakról',
            'Kattintson a feltöltési területre vagy húzza be a fájlt',
            'Várja meg a konverzió befejezését (általában néhány másodperc)',
            'Töltse le a konvertált fájlt'
          ],
          sk: [
            'Vyberte typ konverzie, ktorý potrebujete z našej domovskej stránky alebo stránok konvertora',
            'Kliknite na oblasť nahrávania alebo pretiahnite súbor',
            'Počkajte na dokončenie konverzie (obvykle trvá niekoľko sekúnd)',
            'Stiahnite si konvertovaný súbor'
          ],
          de: [
            'Wählen Sie den gewünschten Konvertierungstyp von unserer Homepage oder Konverter-Seiten',
            'Klicken Sie auf den Upload-Bereich oder ziehen Sie Ihre Datei hinein',
            'Warten Sie auf den Abschluss der Konvertierung (dauert normalerweise einige Sekunden)',
            'Laden Sie Ihre konvertierte Datei herunter'
          ],
          pl: [
            'Wybierz typ konwersji, którego potrzebujesz z naszej strony głównej lub stron konwertera',
            'Kliknij obszar przesyłania lub przeciągnij plik',
            'Poczekaj na zakończenie konwersji (zwykle trwa kilka sekund)',
            'Pobierz przekonwertowany plik'
          ],
          ro: [
            'Selectați tipul de conversie de care aveți nevoie de pe pagina noastră principală sau paginile convertorului',
            'Faceți clic pe zona de încărcare sau trageți fișierul',
            'Așteptați finalizarea conversiei (de obicei durează câteva secunde)',
            'Descărcați fișierul convertit'
          ],
          cs: [
            'Vyberte typ konverze, který potřebujete z naší domovské stránky nebo stránek konvertoru',
            'Klikněte na oblast nahrávání nebo přetáhněte soubor',
            'Počkejte na dokončení konverze (obvykle trvá několik sekund)',
            'Stáhněte si převedený soubor'
          ]
        }
      },
      supportedFormats: {
        title: {
          en: 'Supported File Formats',
          hu: 'Támogatott fájlformátumok',
          sk: 'Podporované formáty súborov',
          de: 'Unterstützte Dateiformate',
          pl: 'Obsługiwane formaty plików',
          ro: 'Formate de fișiere suportate',
          cs: 'Podporované formáty souborů'
        },
        formats: {
          en: {
            documents: 'Documents: PDF, DOCX, TXT, PPTX, EPUB, MOBI',
            images: 'Images: JPG, PNG, HEIC, WEBP, SVG',
            audio: 'Audio: MP3, WAV, AAC',
            video: 'Video: MP4, MOV, AVI, WEBM',
            other: 'Other: SRT, VTT, JSON, CSV'
          },
          hu: {
            documents: 'Dokumentumok: PDF, DOCX, TXT, PPTX, EPUB, MOBI',
            images: 'Képek: JPG, PNG, HEIC, WEBP, SVG',
            audio: 'Hang: MP3, WAV, AAC',
            video: 'Videó: MP4, MOV, AVI, WEBM',
            other: 'Egyéb: SRT, VTT, JSON, CSV'
          },
          sk: {
            documents: 'Dokumenty: PDF, DOCX, TXT, PPTX, EPUB, MOBI',
            images: 'Obrázky: JPG, PNG, HEIC, WEBP, SVG',
            audio: 'Audio: MP3, WAV, AAC',
            video: 'Video: MP4, MOV, AVI, WEBM',
            other: 'Iné: SRT, VTT, JSON, CSV'
          },
          de: {
            documents: 'Dokumente: PDF, DOCX, TXT, PPTX, EPUB, MOBI',
            images: 'Bilder: JPG, PNG, HEIC, WEBP, SVG',
            audio: 'Audio: MP3, WAV, AAC',
            video: 'Video: MP4, MOV, AVI, WEBM',
            other: 'Andere: SRT, VTT, JSON, CSV'
          },
          pl: {
            documents: 'Dokumenty: PDF, DOCX, TXT, PPTX, EPUB, MOBI',
            images: 'Obrazy: JPG, PNG, HEIC, WEBP, SVG',
            audio: 'Audio: MP3, WAV, AAC',
            video: 'Wideo: MP4, MOV, AVI, WEBM',
            other: 'Inne: SRT, VTT, JSON, CSV'
          },
          ro: {
            documents: 'Documente: PDF, DOCX, TXT, PPTX, EPUB, MOBI',
            images: 'Imagini: JPG, PNG, HEIC, WEBP, SVG',
            audio: 'Audio: MP3, WAV, AAC',
            video: 'Video: MP4, MOV, AVI, WEBM',
            other: 'Altele: SRT, VTT, JSON, CSV'
          },
          cs: {
            documents: 'Dokumenty: PDF, DOCX, TXT, PPTX, EPUB, MOBI',
            images: 'Obrázky: JPG, PNG, HEIC, WEBP, SVG',
            audio: 'Audio: MP3, WAV, AAC',
            video: 'Video: MP4, MOV, AVI, WEBM',
            other: 'Jiné: SRT, VTT, JSON, CSV'
          }
        }
      },
      fileLimits: {
        title: {
          en: 'File Size Limits',
          hu: 'Fájlméret korlátok',
          sk: 'Obmedzenia veľkosti súboru',
          de: 'Dateigrößenbeschränkungen',
          pl: 'Ograniczenia rozmiaru pliku',
          ro: 'Limitări de dimensiune a fișierului',
          cs: 'Omezení velikosti souboru'
        },
        content: {
          en: 'Maximum file size: 512MB per upload. Files are automatically deleted after 1 hour for security and privacy.',
          hu: 'Maximális fájlméret: 512MB feltöltésenként. A fájlok biztonsági és adatvédelmi okokból automatikusan törlődnek 1 óra után.',
          sk: 'Maximálna veľkosť súboru: 512MB na nahrávanie. Súbory sa automaticky vymažú po 1 hodine z dôvodov bezpečnosti a súkromia.',
          de: 'Maximale Dateigröße: 512MB pro Upload. Dateien werden aus Sicherheits- und Datenschutzgründen nach 1 Stunde automatisch gelöscht.',
          pl: 'Maksymalny rozmiar pliku: 512MB na przesłanie. Pliki są automatycznie usuwane po 1 godzinie ze względów bezpieczeństwa i prywatności.',
          ro: 'Dimensiunea maximă a fișierului: 512MB per încărcare. Fișierele sunt șterse automat după 1 oră din motive de securitate și confidențialitate.',
          cs: 'Maximální velikost souboru: 512MB na nahrání. Soubory se automaticky mažou po 1 hodině z bezpečnostních a soukromých důvodů.'
        }
      },
      troubleshooting: {
        title: {
          en: 'Troubleshooting',
          hu: 'Hibaelhárítás',
          sk: 'Riešenie problémov',
          de: 'Fehlerbehebung',
          pl: 'Rozwiązywanie problemów',
          ro: 'Depanare',
          cs: 'Řešení problémů'
        },
        issues: {
          en: [
            'File upload failed: Check your internet connection and file size',
            'Conversion taking too long: Large files may take longer to process',
            'Download not working: Try refreshing the page or using a different browser',
            'Unsupported file format: Check our supported formats list'
          ],
          hu: [
            'Fájl feltöltés sikertelen: Ellenőrizze internetkapcsolatát és fájlméretét',
            'Konverzió túl sokáig tart: A nagy fájlok feldolgozása tovább tarthat',
            'Letöltés nem működik: Próbálja meg frissíteni az oldalt vagy másik böngészőt használni',
            'Nem támogatott fájlformátum: Ellenőrizze a támogatott formátumok listáját'
          ],
          sk: [
            'Nahrávanie súboru zlyhalo: Skontrolujte internetové pripojenie a veľkosť súboru',
            'Konverzia trvá príliš dlho: Veľké súbory môžu trvať dlhšie na spracovanie',
            'Sťahovanie nefunguje: Skúste obnoviť stránku alebo použiť iný prehliadač',
            'Nepodporovaný formát súboru: Skontrolujte náš zoznam podporovaných formátov'
          ],
          de: [
            'Datei-Upload fehlgeschlagen: Überprüfen Sie Ihre Internetverbindung und Dateigröße',
            'Konvertierung dauert zu lange: Große Dateien können länger zur Verarbeitung benötigen',
            'Download funktioniert nicht: Versuchen Sie, die Seite zu aktualisieren oder einen anderen Browser zu verwenden',
            'Nicht unterstütztes Dateiformat: Überprüfen Sie unsere Liste der unterstützten Formate'
          ],
          pl: [
            'Przesyłanie pliku nie powiodło się: Sprawdź połączenie internetowe i rozmiar pliku',
            'Konwersja trwa zbyt długo: Duże pliki mogą wymagać więcej czasu na przetworzenie',
            'Pobieranie nie działa: Spróbuj odświeżyć stronę lub użyć innej przeglądarki',
            'Nieobsługiwany format pliku: Sprawdź naszą listę obsługiwanych formatów'
          ],
          ro: [
            'Încărcarea fișierului a eșuat: Verificați conexiunea la internet și dimensiunea fișierului',
            'Conversia durează prea mult: Fișierele mari pot dura mai mult să fie procesate',
            'Descărcarea nu funcționează: Încercați să reîmprospătați pagina sau să folosiți un alt browser',
            'Format de fișier nesuportat: Verificați lista noastră de formate suportate'
          ],
          cs: [
            'Nahrávání souboru selhalo: Zkontrolujte internetové připojení a velikost souboru',
            'Konverze trvá příliš dlouho: Velké soubory mohou trvat déle zpracovat',
            'Stahování nefunguje: Zkuste obnovit stránku nebo použít jiný prohlížeč',
            'Nepodporovaný formát souboru: Zkontrolujte náš seznam podporovaných formátů'
          ]
        }
      },
      contact: {
        title: {
          en: 'Contact Support',
          hu: 'Támogatás elérése',
          sk: 'Kontaktujte podporu',
          de: 'Support kontaktieren',
          pl: 'Skontaktuj wsparcie',
          ro: 'Contactați suportul',
          cs: 'Kontaktujte podporu'
        },
        content: {
          en: 'If you need additional help or have questions not covered in this guide, please contact our support team at info@allinconverter.com. We typically respond within 24 hours.',
          hu: 'Ha további segítségre van szüksége vagy kérdései vannak, amelyeket ez az útmutató nem fed le, kérjük, lépjen kapcsolatba támogatási csapatunkkal: info@allinconverter.com. Általában 24 órán belül válaszolunk.',
          sk: 'Ak potrebujete dodatočnú pomoc alebo máte otázky, ktoré nie sú pokryté v tomto sprievodcovi, kontaktujte náš tím podpory na info@allinconverter.com. Obvykle odpovedáme do 24 hodín.',
          de: 'Wenn Sie zusätzliche Hilfe benötigen oder Fragen haben, die in diesem Leitfaden nicht behandelt werden, kontaktieren Sie bitte unser Support-Team unter info@allinconverter.com. Wir antworten normalerweise innerhalb von 24 Stunden.',
          pl: 'Jeśli potrzebujesz dodatkowej pomocy lub masz pytania nieobjęte tym przewodnikiem, skontaktuj się z naszym zespołem wsparcia pod adresem info@allinconverter.com. Zwykle odpowiadamy w ciągu 24 godzin.',
          ro: 'Dacă aveți nevoie de ajutor suplimentar sau aveți întrebări care nu sunt acoperite în acest ghid, vă rugăm să contactați echipa noastră de suport la info@allinconverter.com. De obicei răspundem în 24 de ore.',
          cs: 'Pokud potřebujete další pomoc nebo máte otázky, které nejsou pokryty v tomto průvodci, kontaktujte prosím náš tým podpory na info@allinconverter.com. Obvykle odpovídáme do 24 hodin.'
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
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* How to Use */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {getLocalizedText(content.sections.howToUse.title)}
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              {getLocalizedText(content.sections.howToUse.steps).map((step: string, index: number) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>

          {/* Supported Formats */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {getLocalizedText(content.sections.supportedFormats.title)}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(getLocalizedText(content.sections.supportedFormats.formats)).map(([key, value]) => (
                <div key={key} className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2 capitalize">{key}</h3>
                  <p className="text-gray-600">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* File Limits */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {getLocalizedText(content.sections.fileLimits.title)}
            </h2>
            <p className="text-gray-600">
              {getLocalizedText(content.sections.fileLimits.content)}
            </p>
          </div>

          {/* Troubleshooting */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {getLocalizedText(content.sections.troubleshooting.title)}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              {getLocalizedText(content.sections.troubleshooting.issues).map((issue: string, index: number) => (
                <li key={index}>{issue}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {getLocalizedText(content.sections.contact.title)}
            </h2>
            <p className="text-gray-600">
              {getLocalizedText(content.sections.contact.content)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
