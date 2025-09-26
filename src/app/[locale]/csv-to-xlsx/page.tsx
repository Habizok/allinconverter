import { Metadata } from 'next'
import ConverterPage from '@/components/ConverterPage'
import { generateConverterMetadata } from '@/lib/seo-converter'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const config = {
    id: 'csv-to-xlsx',
    name: {
      en: 'CSV to XLSX Converter',
      hu: 'CSV XLSX konvertáló',
      sk: 'CSV na XLSX konvertor',
      de: 'CSV zu XLSX Konverter',
      pl: 'Konwerter CSV na XLSX',
      ro: 'Convertor CSV la XLSX',
      cs: 'Konvertor CSV na XLSX'
    },
    description: {
      en: 'Convert CSV files to Excel XLSX format instantly. Free online CSV to XLSX converter. No registration required.',
      hu: 'Konvertálj CSV fájlokat Excel XLSX formátumba azonnal. Ingyenes online CSV XLSX konvertáló. Regisztráció nélkül.',
      sk: 'Konvertujte CSV súbory na Excel XLSX formát okamžite. Bezplatný online CSV na XLSX konvertor. Bez registrácie.',
      de: 'Konvertieren Sie CSV-Dateien sofort in Excel XLSX-Format. Kostenloser Online-CSV-zu-XLSX-Konverter. Keine Registrierung erforderlich.',
      pl: 'Konwertuj pliki CSV na format Excel XLSX natychmiast. Darmowy online konwerter CSV na XLSX. Bez rejestracji.',
      ro: 'Convertește fișierele CSV în format Excel XLSX instant. Convertor online gratuit CSV la XLSX. Fără înregistrare.',
      cs: 'Převádějte soubory CSV na formát Excel XLSX okamžitě. Bezplatný online konvertor CSV na XLSX. Bez registrace.'
    },
    inputFormat: 'csv',
    outputFormat: 'xlsx'
  }

  return generateConverterMetadata(config, locale)
}

export default function CsvToXlsxPage({ params }: Props) {
  const converterConfig = {
    id: 'csv-to-xlsx',
    name: {
      en: 'CSV to XLSX Converter',
      hu: 'CSV XLSX konvertáló',
      sk: 'CSV na XLSX konvertor',
      de: 'CSV zu XLSX Konverter',
      pl: 'Konwerter CSV na XLSX',
      ro: 'Convertor CSV la XLSX',
      cs: 'Konvertor CSV na XLSX'
    },
    description: {
      en: 'Convert CSV data to Excel format for advanced spreadsheet features and data analysis.',
      hu: 'Konvertálj CSV adatokat Excel formátumba fejlett táblázat funkciókhoz és adatelemzéshez.',
      sk: 'Konvertujte CSV údaje na Excel formát pre pokročilé funkcie tabuľky a analýzu údajov.',
      de: 'Konvertieren Sie CSV-Daten in Excel-Format für erweiterte Tabellenfunktionen und Datenanalyse.',
      pl: 'Konwertuj dane CSV na format Excel do zaawansowanych funkcji arkusza i analizy danych.',
      ro: 'Convertește datele CSV în format Excel pentru funcții avansate de foaie de calcul și analiza datelor.',
      cs: 'Převádějte data CSV na formát Excel pro pokročilé funkce tabulky a analýzu dat.'
    },
    inputFormat: 'CSV',
    outputFormat: 'XLSX',
    maxFileSize: '512 MB',
    supportedFormats: ['.csv'],
    features: [
      {
        en: 'Excel formatting support',
        hu: 'Excel formázás támogatás',
        sk: 'Podpora formátovania Excel',
        de: 'Excel-Formatierungsunterstützung',
        pl: 'Obsługa formatowania Excel',
        ro: 'Suport formatare Excel',
        cs: 'Podpora formátování Excel'
      },
      {
        en: 'Multiple sheet creation',
        hu: 'Több lap létrehozás',
        sk: 'Vytvorenie viacerých listov',
        de: 'Mehrere Blätter-Erstellung',
        pl: 'Tworzenie wielu arkuszy',
        ro: 'Crearea mai multor foi',
        cs: 'Vytváření více listů'
      },
      {
        en: 'Data validation rules',
        hu: 'Adatvalidációs szabályok',
        sk: 'Pravidlá validácie údajov',
        de: 'Datenvalidierungsregeln',
        pl: 'Reguły walidacji danych',
        ro: 'Reguli de validare a datelor',
        cs: 'Pravidla validace dat'
      }
    ]
  }

  return <ConverterPage config={converterConfig} locale={params.locale} />
}
