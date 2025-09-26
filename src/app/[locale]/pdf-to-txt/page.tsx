import { Metadata } from 'next'
import ConverterPage from '@/components/ConverterPage'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const titles = {
    en: 'PDF to TXT Converter - Extract Text from PDF Files',
    hu: 'PDF TXT konvertáló - Szöveg kinyerése PDF fájlokból',
    sk: 'PDF na TXT konvertor - Extrakcia textu z PDF súborov',
    de: 'PDF zu TXT Konverter - Text aus PDF-Dateien extrahieren',
    pl: 'Konwerter PDF na TXT - Wyodrębnianie tekstu z plików PDF',
    ro: 'Convertor PDF la TXT - Extragerea textului din fișiere PDF',
    cs: 'Konvertor PDF na TXT - Extrakce textu z PDF souborů'
  }

  const descriptions = {
    en: 'Extract plain text from PDF files instantly. Free online PDF to TXT converter with OCR support for scanned documents.',
    hu: 'Kinyerj egyszerű szöveget PDF fájlokból azonnal. Ingyenes online PDF TXT konvertáló OCR támogatással szkennelt dokumentumokhoz.',
    sk: 'Extrahujte obyčajný text z PDF súborov okamžite. Bezplatný online PDF na TXT konvertor s OCR podporou pre skenované dokumenty.',
    de: 'Extrahieren Sie Klartext aus PDF-Dateien sofort. Kostenloser Online-PDF-zu-TXT-Konverter mit OCR-Unterstützung für gescannte Dokumente.',
    pl: 'Wyodrębnij zwykły tekst z plików PDF natychmiast. Darmowy online konwerter PDF na TXT z obsługą OCR dla zeskanowanych dokumentów.',
    ro: 'Extrageți text simplu din fișierele PDF instant. Convertor online gratuit PDF la TXT cu suport OCR pentru documente scanate.',
    cs: 'Extrahujte prostý text ze souborů PDF okamžitě. Bezplatný online konvertor PDF na TXT s podporou OCR pro skenované dokumenty.'
  }

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
  }
}

export default function PdfToTxtPage({ params }: Props) {
  const converterConfig = {
    id: 'pdf-to-txt',
    name: {
      en: 'PDF to TXT Converter',
      hu: 'PDF TXT konvertáló',
      sk: 'PDF na TXT konvertor',
      de: 'PDF zu TXT Konverter',
      pl: 'Konwerter PDF na TXT',
      ro: 'Convertor PDF la TXT',
      cs: 'Konvertor PDF na TXT'
    },
    description: {
      en: 'Extract clean, readable text from PDF documents. Perfect for copying content, searching, or converting to other formats.',
      hu: 'Kinyerj tiszta, olvasható szöveget PDF dokumentumokból. Tökéletes tartalom másoláshoz, kereséshez vagy más formátumokba konvertáláshoz.',
      sk: 'Extrahujte čistý, čitateľný text z PDF dokumentov. Perfektné na kopírovanie obsahu, vyhľadávanie alebo konverziu do iných formátov.',
      de: 'Extrahieren Sie sauberen, lesbaren Text aus PDF-Dokumenten. Perfekt zum Kopieren von Inhalten, Suchen oder Konvertieren in andere Formate.',
      pl: 'Wyodrębnij czysty, czytelny tekst z dokumentów PDF. Idealne do kopiowania treści, wyszukiwania lub konwersji do innych formatów.',
      ro: 'Extrageți text curat, lizibil din documentele PDF. Perfect pentru copierea conținutului, căutare sau conversie în alte formate.',
      cs: 'Extrahujte čistý, čitelný text z PDF dokumentů. Perfektní pro kopírování obsahu, vyhledávání nebo konverzi do jiných formátů.'
    },
    inputFormat: 'PDF',
    outputFormat: 'TXT',
    maxFileSize: '512 MB',
    supportedFormats: ['.pdf'],
    features: [
      {
        en: 'OCR support for scanned PDFs',
        hu: 'OCR támogatás szkennelt PDF-ekhez',
        sk: 'OCR podpora pre skenované PDF',
        de: 'OCR-Unterstützung für gescannte PDFs',
        pl: 'Obsługa OCR dla zeskanowanych PDF',
        ro: 'Suport OCR pentru PDF-uri scanate',
        cs: 'Podpora OCR pro skenované PDF'
      },
      {
        en: 'Preserves text formatting',
        hu: 'Megőrzi a szöveg formázását',
        sk: 'Zachováva formátovanie textu',
        de: 'Bewahrt Textformatierung',
        pl: 'Zachowuje formatowanie tekstu',
        ro: 'Păstrează formatarea textului',
        cs: 'Zachovává formátování textu'
      },
      {
        en: 'Batch text extraction',
        hu: 'Kötegelt szöveg kinyerés',
        sk: 'Dávková extrakcia textu',
        de: 'Batch-Text-Extraktion',
        pl: 'Wyodrębnianie tekstu wsadowe',
        ro: 'Extragere text în lot',
        cs: 'Dávková extrakce textu'
      }
    ]
  }

  return <ConverterPage config={converterConfig} locale={params.locale} />
}
