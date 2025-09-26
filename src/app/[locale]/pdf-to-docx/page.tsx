import { Metadata } from 'next'
import ConverterPage from '@/components/ConverterPage'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const titles = {
    en: 'PDF to DOCX Converter - Free Online PDF to Word Converter',
    hu: 'PDF DOCX konvertáló - Ingyenes online PDF Word konvertáló',
    sk: 'PDF na DOCX konvertor - Bezplatný online PDF na Word konvertor',
    de: 'PDF zu DOCX Konverter - Kostenloser Online PDF zu Word Konverter',
    pl: 'Konwerter PDF na DOCX - Darmowy online konwerter PDF na Word',
    ro: 'Convertor PDF la DOCX - Convertor online gratuit PDF la Word',
    cs: 'Konvertor PDF na DOCX - Bezplatný online konvertor PDF na Word'
  }

  const descriptions = {
    en: 'Convert PDF to DOCX format instantly. Free online PDF to Word converter. No registration required, secure file processing.',
    hu: 'Konvertálj PDF-et DOCX formátumba azonnal. Ingyenes online PDF Word konvertáló. Regisztráció nélkül, biztonságos fájlfeldolgozás.',
    sk: 'Konvertujte PDF na DOCX formát okamžite. Bezplatný online PDF na Word konvertor. Bez registrácie, bezpečné spracovanie súborov.',
    de: 'Konvertieren Sie PDF sofort in DOCX-Format. Kostenloser Online-PDF-zu-Word-Konverter. Keine Registrierung erforderlich, sichere Dateiverarbeitung.',
    pl: 'Konwertuj PDF na format DOCX natychmiast. Darmowy online konwerter PDF na Word. Bez rejestracji, bezpieczne przetwarzanie plików.',
    ro: 'Convertește PDF în format DOCX instant. Convertor online gratuit PDF la Word. Fără înregistrare, procesare sigură a fișierelor.',
    cs: 'Převádějte PDF na formát DOCX okamžitě. Bezplatný online konvertor PDF na Word. Bez registrace, bezpečné zpracování souborů.'
  }

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
  }
}

export default function PdfToDocxPage({ params }: Props) {
  const converterConfig = {
    id: 'pdf-to-docx',
    name: {
      en: 'PDF to DOCX Converter',
      hu: 'PDF DOCX konvertáló',
      sk: 'PDF na DOCX konvertor',
      de: 'PDF zu DOCX Konverter',
      pl: 'Konwerter PDF na DOCX',
      ro: 'Convertor PDF la DOCX',
      cs: 'Konvertor PDF na DOCX'
    },
    description: {
      en: 'Convert PDF files to editable Word documents (DOCX format) instantly. Perfect for editing PDF content.',
      hu: 'Konvertálj PDF fájlokat szerkeszthető Word dokumentumokká (DOCX formátum) azonnal. Tökéletes PDF tartalom szerkesztéséhez.',
      sk: 'Konvertujte PDF súbory na editovateľné Word dokumenty (DOCX formát) okamžite. Perfektné na úpravu PDF obsahu.',
      de: 'Konvertieren Sie PDF-Dateien sofort in bearbeitbare Word-Dokumente (DOCX-Format). Perfekt zum Bearbeiten von PDF-Inhalten.',
      pl: 'Konwertuj pliki PDF na edytowalne dokumenty Word (format DOCX) natychmiast. Idealne do edycji treści PDF.',
      ro: 'Convertește fișierele PDF în documente Word editabile (format DOCX) instant. Perfect pentru editarea conținutului PDF.',
      cs: 'Převádějte soubory PDF na editovatelné dokumenty Word (formát DOCX) okamžitě. Perfektní pro úpravu obsahu PDF.'
    },
    inputFormat: 'PDF',
    outputFormat: 'DOCX',
    maxFileSize: '512 MB',
    supportedFormats: ['.pdf'],
    features: [
      {
        en: 'Preserves text formatting and layout',
        hu: 'Megőrzi a szöveg formázását és elrendezést',
        sk: 'Zachováva formátovanie textu a rozloženie',
        de: 'Bewahrt Textformatierung und Layout',
        pl: 'Zachowuje formatowanie tekstu i układ',
        ro: 'Păstrează formatarea textului și layout-ul',
        cs: 'Zachovává formátování textu a rozložení'
      },
      {
        en: 'Maintains images and tables',
        hu: 'Megőrzi a képeket és táblázatokat',
        sk: 'Zachováva obrázky a tabuľky',
        de: 'Bewahrt Bilder und Tabellen',
        pl: 'Zachowuje obrazy i tabele',
        ro: 'Păstrează imaginile și tabelele',
        cs: 'Zachovává obrázky a tabulky'
      },
      {
        en: 'High-quality conversion',
        hu: 'Magas minőségű konverzió',
        sk: 'Vysokokvalitná konverzia',
        de: 'Hochwertige Konvertierung',
        pl: 'Wysokiej jakości konwersja',
        ro: 'Conversie de înaltă calitate',
        cs: 'Vysokokvalitní převod'
      }
    ]
  }

  return <ConverterPage config={converterConfig} locale={params.locale} />
}
