import { Metadata } from 'next'
import ConverterPage from '@/components/ConverterPage'
import { generateConverterMetadata } from '@/lib/seo-converter'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const config = {
    id: 'doc-to-pdf',
    name: {
      en: 'DOC to PDF Converter',
      hu: 'DOC PDF konvertáló',
      sk: 'DOC na PDF konvertor',
      de: 'DOC zu PDF Konverter',
      pl: 'Konwerter DOC na PDF',
      ro: 'Convertor DOC la PDF',
      cs: 'Konvertor DOC na PDF'
    },
    description: {
      en: 'Convert DOC files to PDF format instantly. Free online DOC to PDF converter. No registration required.',
      hu: 'Konvertálj DOC fájlokat PDF formátumba azonnal. Ingyenes online DOC PDF konvertáló. Regisztráció nélkül.',
      sk: 'Konvertujte DOC súbory na PDF formát okamžite. Bezplatný online DOC na PDF konvertor. Bez registrácie.',
      de: 'Konvertieren Sie DOC-Dateien sofort in PDF-Format. Kostenloser Online-DOC-zu-PDF-Konverter. Keine Registrierung erforderlich.',
      pl: 'Konwertuj pliki DOC na format PDF natychmiast. Darmowy online konwerter DOC na PDF. Bez rejestracji.',
      ro: 'Convertește fișierele DOC în format PDF instant. Convertor online gratuit DOC la PDF. Fără înregistrare.',
      cs: 'Převádějte soubory DOC na formát PDF okamžitě. Bezplatný online konvertor DOC na PDF. Bez registrace.'
    },
    inputFormat: 'doc',
    outputFormat: 'pdf'
  }

  return generateConverterMetadata(config, locale)
}

export default function DocToPdfPage({ params }: Props) {
  const converterConfig = {
    id: 'doc-to-pdf',
    name: {
      en: 'DOC to PDF Converter',
      hu: 'DOC PDF konvertáló',
      sk: 'DOC na PDF konvertor',
      de: 'DOC zu PDF Konverter',
      pl: 'Konwerter DOC na PDF',
      ro: 'Convertor DOC la PDF',
      cs: 'Konvertor DOC na PDF'
    },
    description: {
      en: 'Convert legacy DOC files to modern PDF format. Perfect for sharing and archiving documents.',
      hu: 'Konvertálj régi DOC fájlokat modern PDF formátumba. Tökéletes dokumentumok megosztásához és archiválásához.',
      sk: 'Konvertujte staré DOC súbory na moderný PDF formát. Perfektné pre zdieľanie a archivovanie dokumentov.',
      de: 'Konvertieren Sie alte DOC-Dateien in modernes PDF-Format. Perfekt zum Teilen und Archivieren von Dokumenten.',
      pl: 'Konwertuj stare pliki DOC na nowoczesny format PDF. Idealne do udostępniania i archiwizacji dokumentów.',
      ro: 'Convertește fișierele DOC vechi în format PDF modern. Perfect pentru partajarea și arhivarea documentelor.',
      cs: 'Převádějte staré soubory DOC na moderní formát PDF. Perfektní pro sdílení a archivaci dokumentů.'
    },
    inputFormat: 'DOC',
    outputFormat: 'PDF',
    maxFileSize: '512 MB',
    supportedFormats: ['.doc'],
    features: [
      {
        en: 'Legacy format support',
        hu: 'Régi formátum támogatás',
        sk: 'Podpora starých formátov',
        de: 'Legacy-Format-Unterstützung',
        pl: 'Obsługa starych formatów',
        ro: 'Suport pentru formate vechi',
        cs: 'Podpora starých formátů'
      },
      {
        en: 'Preserves formatting',
        hu: 'Megőrzi a formázást',
        sk: 'Zachováva formátovanie',
        de: 'Bewahrt Formatierung',
        pl: 'Zachowuje formatowanie',
        ro: 'Păstrează formatarea',
        cs: 'Zachovává formátování'
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
