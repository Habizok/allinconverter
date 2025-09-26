import { Metadata } from 'next'
import ConverterPage from '@/components/ConverterPage'
import { generateConverterMetadata } from '@/lib/seo-converter'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const config = {
    id: 'rtf-to-pdf',
    name: {
      en: 'RTF to PDF Converter',
      hu: 'RTF PDF konvertáló',
      sk: 'RTF na PDF konvertor',
      de: 'RTF zu PDF Konverter',
      pl: 'Konwerter RTF na PDF',
      ro: 'Convertor RTF la PDF',
      cs: 'Konvertor RTF na PDF'
    },
    description: {
      en: 'Convert RTF files to PDF format instantly. Free online RTF to PDF converter. No registration required.',
      hu: 'Konvertálj RTF fájlokat PDF formátumba azonnal. Ingyenes online RTF PDF konvertáló. Regisztráció nélkül.',
      sk: 'Konvertujte RTF súbory na PDF formát okamžite. Bezplatný online RTF na PDF konvertor. Bez registrácie.',
      de: 'Konvertieren Sie RTF-Dateien sofort in PDF-Format. Kostenloser Online-RTF-zu-PDF-Konverter. Keine Registrierung erforderlich.',
      pl: 'Konwertuj pliki RTF na format PDF natychmiast. Darmowy online konwerter RTF na PDF. Bez rejestracji.',
      ro: 'Convertește fișierele RTF în format PDF instant. Convertor online gratuit RTF la PDF. Fără înregistrare.',
      cs: 'Převádějte soubory RTF na formát PDF okamžitě. Bezplatný online konvertor RTF na PDF. Bez registrace.'
    },
    inputFormat: 'rtf',
    outputFormat: 'pdf'
  }

  return generateConverterMetadata(config, locale)
}

export default function RtfToPdfPage({ params }: Props) {
  const converterConfig = {
    id: 'rtf-to-pdf',
    name: {
      en: 'RTF to PDF Converter',
      hu: 'RTF PDF konvertáló',
      sk: 'RTF na PDF konvertor',
      de: 'RTF zu PDF Konverter',
      pl: 'Konwerter RTF na PDF',
      ro: 'Convertor RTF la PDF',
      cs: 'Konvertor RTF na PDF'
    },
    description: {
      en: 'Convert Rich Text Format files to PDF. Maintains formatting and text styling.',
      hu: 'Konvertálj Rich Text Format fájlokat PDF-be. Megőrzi a formázást és szöveg stílust.',
      sk: 'Konvertujte súbory Rich Text Format na PDF. Zachováva formátovanie a štýlovanie textu.',
      de: 'Konvertieren Sie Rich Text Format-Dateien zu PDF. Bewahrt Formatierung und Textstyling.',
      pl: 'Konwertuj pliki Rich Text Format na PDF. Zachowuje formatowanie i stylowanie tekstu.',
      ro: 'Convertește fișierele Rich Text Format în PDF. Păstrează formatarea și stilizarea textului.',
      cs: 'Převádějte soubory Rich Text Format na PDF. Zachovává formátování a stylování textu.'
    },
    inputFormat: 'RTF',
    outputFormat: 'PDF',
    maxFileSize: '512 MB',
    supportedFormats: ['.rtf'],
    features: [
      {
        en: 'Rich text formatting',
        hu: 'Rich text formázás',
        sk: 'Formátovanie rich textu',
        de: 'Rich Text-Formatierung',
        pl: 'Formatowanie rich text',
        ro: 'Formatare rich text',
        cs: 'Formátování rich textu'
      },
      {
        en: 'Font and style preservation',
        hu: 'Betűtípus és stílus megőrzés',
        sk: 'Zachovanie fontu a štýlu',
        de: 'Schriftart- und Stil-Erhaltung',
        pl: 'Zachowanie czcionki i stylu',
        ro: 'Păstrarea fontului și stilului',
        cs: 'Zachování fontu a stylu'
      },
      {
        en: 'Cross-platform compatibility',
        hu: 'Platformfüggetlen kompatibilitás',
        sk: 'Kompatibilita naprieč platformami',
        de: 'Plattformübergreifende Kompatibilität',
        pl: 'Kompatybilność międzyplatformowa',
        ro: 'Compatibilitate cross-platform',
        cs: 'Kompatibilita napříč platformami'
      }
    ]
  }

  return <ConverterPage config={converterConfig} locale={params.locale} />
}
