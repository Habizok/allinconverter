import { Metadata } from 'next'
import ConverterPage from '@/components/ConverterPage'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const titles = {
    en: 'TXT to PDF Converter - Create PDF from Text Files',
    hu: 'TXT PDF konvertáló - PDF létrehozása szövegfájlokból',
    sk: 'TXT na PDF konvertor - Vytvorenie PDF zo textových súborov',
    de: 'TXT zu PDF Konverter - PDF aus Textdateien erstellen',
    pl: 'Konwerter TXT na PDF - Tworzenie PDF z plików tekstowych',
    ro: 'Convertor TXT la PDF - Crearea PDF din fișiere text',
    cs: 'Konvertor TXT na PDF - Vytvoření PDF ze textových souborů'
  }

  const descriptions = {
    en: 'Convert text files to PDF format with custom fonts and formatting. Free online TXT to PDF converter with professional layout.',
    hu: 'Konvertálj szövegfájlokat PDF formátumba egyedi betűtípusokkal és formázással. Ingyenes online TXT PDF konvertáló professzionális elrendezéssel.',
    sk: 'Konvertujte textové súbory na PDF formát s vlastnými fontmi a formátovaním. Bezplatný online TXT na PDF konvertor s profesionálnym rozložením.',
    de: 'Konvertieren Sie Textdateien in PDF-Format mit benutzerdefinierten Schriftarten und Formatierung. Kostenloser Online-TXT-zu-PDF-Konverter mit professionellem Layout.',
    pl: 'Konwertuj pliki tekstowe na format PDF z niestandardowymi czcionkami i formatowaniem. Darmowy online konwerter TXT na PDF z profesjonalnym układem.',
    ro: 'Convertește fișierele text în format PDF cu fonturi personalizate și formatare. Convertor online gratuit TXT la PDF cu layout profesional.',
    cs: 'Převeďte textové soubory na formát PDF s vlastními fonty a formátováním. Bezplatný online konvertor TXT na PDF s profesionálním rozložením.'
  }

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
  }
}

export default function TxtToPdfPage({ params }: Props) {
  const converterConfig = {
    id: 'txt-to-pdf',
    name: {
      en: 'TXT to PDF Converter',
      hu: 'TXT PDF konvertáló',
      sk: 'TXT na PDF konvertor',
      de: 'TXT zu PDF Konverter',
      pl: 'Konwerter TXT na PDF',
      ro: 'Convertor TXT la PDF',
      cs: 'Konvertor TXT na PDF'
    },
    description: {
      en: 'Transform plain text files into professional PDF documents. Perfect for creating reports, documents, and printable files.',
      hu: 'Alakítsd át egyszerű szövegfájlokat professzionális PDF dokumentumokká. Tökéletes jelentések, dokumentumok és nyomtatható fájlok készítéséhez.',
      sk: 'Transformujte obyčajné textové súbory na profesionálne PDF dokumenty. Perfektné na vytvorenie správ, dokumentov a tlačiteľných súborov.',
      de: 'Verwandeln Sie einfache Textdateien in professionelle PDF-Dokumente. Perfekt zum Erstellen von Berichten, Dokumenten und druckbaren Dateien.',
      pl: 'Przekształć zwykłe pliki tekstowe w profesjonalne dokumenty PDF. Idealne do tworzenia raportów, dokumentów i plików do druku.',
      ro: 'Transformați fișierele text simple în documente PDF profesionale. Perfect pentru crearea de rapoarte, documente și fișiere de tipărit.',
      cs: 'Převeďte jednoduché textové soubory na profesionální PDF dokumenty. Perfektní pro vytváření zpráv, dokumentů a tisknutelných souborů.'
    },
    inputFormat: 'TXT',
    outputFormat: 'PDF',
    maxFileSize: '512 MB',
    supportedFormats: ['.txt'],
    features: [
      {
        en: 'Custom font selection',
        hu: 'Egyedi betűtípus választás',
        sk: 'Výber vlastného fontu',
        de: 'Benutzerdefinierte Schriftartenauswahl',
        pl: 'Wybór niestandardowej czcionki',
        ro: 'Selecție font personalizat',
        cs: 'Výběr vlastního fontu'
      },
      {
        en: 'Professional page layout',
        hu: 'Professzionális oldal elrendezés',
        sk: 'Profesionálne rozloženie stránky',
        de: 'Professionelles Seitenlayout',
        pl: 'Profesjonalny układ strony',
        ro: 'Layout profesional de pagină',
        cs: 'Profesionální rozložení stránky'
      },
      {
        en: 'Header and footer support',
        hu: 'Fejléc és lábléc támogatás',
        sk: 'Podpora hlavičky a päty',
        de: 'Kopf- und Fußzeilen-Unterstützung',
        pl: 'Obsługa nagłówka i stopki',
        ro: 'Suport pentru antet și subsol',
        cs: 'Podpora záhlaví a zápatí'
      }
    ]
  }

  return <ConverterPage config={converterConfig} locale={params.locale} />
}
