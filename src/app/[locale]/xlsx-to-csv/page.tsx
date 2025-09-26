import { Metadata } from 'next'
import ConverterPage from '@/components/ConverterPage'
import { generateConverterMetadata } from '@/lib/seo-converter'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const config = {
    id: 'xlsx-to-csv',
    name: {
      en: 'XLSX to CSV Converter',
      hu: 'XLSX CSV konvertáló',
      sk: 'XLSX na CSV konvertor',
      de: 'XLSX zu CSV Konverter',
      pl: 'Konwerter XLSX na CSV',
      ro: 'Convertor XLSX la CSV',
      cs: 'Konvertor XLSX na CSV'
    },
    description: {
      en: 'Convert Excel XLSX files to CSV format instantly. Free online XLSX to CSV converter. No registration required.',
      hu: 'Konvertálj Excel XLSX fájlokat CSV formátumba azonnal. Ingyenes online XLSX CSV konvertáló. Regisztráció nélkül.',
      sk: 'Konvertujte Excel XLSX súbory na CSV formát okamžite. Bezplatný online XLSX na CSV konvertor. Bez registrácie.',
      de: 'Konvertieren Sie Excel XLSX-Dateien sofort in CSV-Format. Kostenloser Online-XLSX-zu-CSV-Konverter. Keine Registrierung erforderlich.',
      pl: 'Konwertuj pliki Excel XLSX na format CSV natychmiast. Darmowy online konwerter XLSX na CSV. Bez rejestracji.',
      ro: 'Convertește fișierele Excel XLSX în format CSV instant. Convertor online gratuit XLSX la CSV. Fără înregistrare.',
      cs: 'Převádějte soubory Excel XLSX na formát CSV okamžitě. Bezplatný online konvertor XLSX na CSV. Bez registrace.'
    },
    inputFormat: 'xlsx',
    outputFormat: 'csv'
  }

  return generateConverterMetadata(config, locale)
}

export default function XlsxToCsvPage({ params }: Props) {
  const converterConfig = {
    id: 'xlsx-to-csv',
    name: {
      en: 'XLSX to CSV Converter',
      hu: 'XLSX CSV konvertáló',
      sk: 'XLSX na CSV konvertor',
      de: 'XLSX zu CSV Konverter',
      pl: 'Konwerter XLSX na CSV',
      ro: 'Convertor XLSX la CSV',
      cs: 'Konvertor XLSX na CSV'
    },
    description: {
      en: 'Convert Excel spreadsheets to CSV format for data analysis and import into other applications.',
      hu: 'Konvertálj Excel táblázatokat CSV formátumba adatelemzéshez és más alkalmazásokba való importáláshoz.',
      sk: 'Konvertujte Excel tabuľky na CSV formát pre analýzu údajov a import do iných aplikácií.',
      de: 'Konvertieren Sie Excel-Tabellen in CSV-Format für Datenanalyse und Import in andere Anwendungen.',
      pl: 'Konwertuj arkusze Excel na format CSV do analizy danych i importu do innych aplikacji.',
      ro: 'Convertește foile de calcul Excel în format CSV pentru analiza datelor și import în alte aplicații.',
      cs: 'Převádějte tabulky Excel na formát CSV pro analýzu dat a import do jiných aplikací.'
    },
    inputFormat: 'XLSX',
    outputFormat: 'CSV',
    maxFileSize: '512 MB',
    supportedFormats: ['.xlsx'],
    features: [
      {
        en: 'Multiple sheet support',
        hu: 'Több lap támogatás',
        sk: 'Podpora viacerých listov',
        de: 'Mehrere Blätter-Unterstützung',
        pl: 'Obsługa wielu arkuszy',
        ro: 'Suport pentru mai multe foi',
        cs: 'Podpora více listů'
      },
      {
        en: 'Data type preservation',
        hu: 'Adattípus megőrzés',
        sk: 'Zachovanie typov údajov',
        de: 'Datentyp-Erhaltung',
        pl: 'Zachowanie typów danych',
        ro: 'Păstrarea tipurilor de date',
        cs: 'Zachování typů dat'
      },
      {
        en: 'Custom delimiter options',
        hu: 'Egyedi elválasztó opciók',
        sk: 'Možnosti vlastného oddeľovača',
        de: 'Benutzerdefinierte Trennzeichen-Optionen',
        pl: 'Opcje niestandardowego separatora',
        ro: 'Opțiuni delimitator personalizat',
        cs: 'Možnosti vlastního oddělovače'
      }
    ]
  }

  return <ConverterPage config={converterConfig} locale={params.locale} />
}
