import { Metadata } from 'next'
import ConverterPage from '@/components/ConverterPage'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const titles = {
    en: 'DOCX to PDF Converter - Convert Word Documents to PDF',
    hu: 'DOCX PDF konvertáló - Word dokumentumok konvertálása PDF-be',
    sk: 'DOCX na PDF konvertor - Konverzia Word dokumentov na PDF',
    de: 'DOCX zu PDF Konverter - Word-Dokumente in PDF konvertieren',
    pl: 'Konwerter DOCX na PDF - Konwersja dokumentów Word na PDF',
    ro: 'Convertor DOCX la PDF - Conversie documente Word în PDF',
    cs: 'Konvertor DOCX na PDF - Konverze dokumentů Word na PDF'
  }

  const descriptions = {
    en: 'Convert Word documents (DOCX) to PDF format instantly. Free online DOCX to PDF converter with perfect formatting.',
    hu: 'Konvertálj Word dokumentumokat (DOCX) PDF formátumba azonnal. Ingyenes online DOCX PDF konvertáló tökéletes formázással.',
    sk: 'Konvertujte Word dokumenty (DOCX) na PDF formát okamžite. Bezplatný online DOCX na PDF konvertor s perfektným formátovaním.',
    de: 'Konvertieren Sie Word-Dokumente (DOCX) sofort in PDF-Format. Kostenloser Online-DOCX-zu-PDF-Konverter mit perfekter Formatierung.',
    pl: 'Konwertuj dokumenty Word (DOCX) na format PDF natychmiast. Darmowy online konwerter DOCX na PDF z doskonałym formatowaniem.',
    ro: 'Convertește documente Word (DOCX) în format PDF instant. Convertor online gratuit DOCX la PDF cu formatare perfectă.',
    cs: 'Převeďte dokumenty Word (DOCX) na formát PDF okamžitě. Bezplatný online konvertor DOCX na PDF s perfektním formátováním.'
  }

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
  }
}

export default function DocxToPdfPage({ params }: Props) {
  const converterConfig = {
    id: 'docx-to-pdf',
    name: {
      en: 'DOCX to PDF Converter',
      hu: 'DOCX PDF konvertáló',
      sk: 'DOCX na PDF konvertor',
      de: 'DOCX zu PDF Konverter',
      pl: 'Konwerter DOCX na PDF',
      ro: 'Convertor DOCX la PDF',
      cs: 'Konvertor DOCX na PDF'
    },
    description: {
      en: 'Convert Word documents to PDF format while preserving all formatting, images, and layout. Perfect for sharing and archiving.',
      hu: 'Konvertálj Word dokumentumokat PDF formátumba minden formázás, kép és elrendezés megőrzésével. Tökéletes megosztáshoz és archiváláshoz.',
      sk: 'Konvertujte Word dokumenty na PDF formát s zachovaním všetkého formátovania, obrázkov a rozloženia. Perfektné na zdieľanie a archivovanie.',
      de: 'Konvertieren Sie Word-Dokumente in PDF-Format unter Beibehaltung aller Formatierungen, Bilder und Layouts. Perfekt zum Teilen und Archivieren.',
      pl: 'Konwertuj dokumenty Word na format PDF zachowując wszystkie formatowania, obrazy i układ. Idealne do udostępniania i archiwizacji.',
      ro: 'Convertește documente Word în format PDF păstrând toate formatările, imaginile și layout-ul. Perfect pentru partajare și arhivare.',
      cs: 'Převeďte dokumenty Word na formát PDF zachováním všech formátování, obrázků a rozložení. Perfektní pro sdílení a archivaci.'
    },
    inputFormat: 'DOCX',
    outputFormat: 'PDF',
    maxFileSize: '512 MB',
    supportedFormats: ['.docx', '.doc'],
    features: [
      {
        en: 'Preserves all formatting',
        hu: 'Megőrzi az összes formázást',
        sk: 'Zachováva všetko formátovanie',
        de: 'Bewahrt alle Formatierungen',
        pl: 'Zachowuje wszystkie formatowania',
        ro: 'Păstrează toate formatările',
        cs: 'Zachovává všechna formátování'
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
        en: 'Professional PDF output',
        hu: 'Professzionális PDF kimenet',
        sk: 'Profesionálny PDF výstup',
        de: 'Professionelle PDF-Ausgabe',
        pl: 'Profesjonalne wyjście PDF',
        ro: 'Ieșire PDF profesională',
        cs: 'Profesionální PDF výstup'
      }
    ]
  }

  return <ConverterPage config={converterConfig} locale={params.locale} />
}
