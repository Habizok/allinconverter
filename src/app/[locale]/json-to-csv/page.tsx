import { Metadata } from 'next'
import ConverterPage from '@/components/ConverterPage'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const titles = {
    en: 'JSON to CSV Converter - Convert Data Files',
    hu: 'JSON CSV konvertáló - Adat fájlok konvertálása',
    sk: 'JSON na CSV konvertor - Konverzia dátových súborov',
    de: 'JSON zu CSV Konverter - Datendateien konvertieren',
    pl: 'Konwerter JSON na CSV - Konwersja plików danych',
    ro: 'Convertor JSON la CSV - Conversie fișiere date',
    cs: 'Konvertor JSON na CSV - Konverze datových souborů'
  }

  const descriptions = {
    en: 'Convert JSON data files to CSV format for spreadsheet applications. Free online JSON to CSV converter with data structure preservation.',
    hu: 'Konvertálj JSON adat fájlokat CSV formátumba táblázatkezelő alkalmazásokhoz. Ingyenes online JSON CSV konvertáló adatstruktúra megőrzésével.',
    sk: 'Konvertujte JSON dátové súbory na CSV formát pre tabuľkové aplikácie. Bezplatný online JSON na CSV konvertor s zachovaním dátovej štruktúry.',
    de: 'Konvertieren Sie JSON-Datendateien in CSV-Format für Tabellenkalkulationsanwendungen. Kostenloser Online-JSON-zu-CSV-Konverter mit Datenstrukturerhaltung.',
    pl: 'Konwertuj pliki danych JSON na format CSV dla aplikacji arkuszy kalkulacyjnych. Darmowy online konwerter JSON na CSV z zachowaniem struktury danych.',
    ro: 'Convertește fișierele de date JSON în format CSV pentru aplicațiile de foi de calcul. Convertor online gratuit JSON la CSV cu păstrarea structurii datelor.',
    cs: 'Převeďte datové soubory JSON na formát CSV pro aplikace tabulkových procesorů. Bezplatný online konvertor JSON na CSV se zachováním datové struktury.'
  }

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
  }
}

export default function JsonToCsvPage({ params }: Props) {
  const converterConfig = {
    id: 'json-to-csv',
    name: {
      en: 'JSON to CSV Converter',
      hu: 'JSON CSV konvertáló',
      sk: 'JSON na CSV konvertor',
      de: 'JSON zu CSV Konverter',
      pl: 'Konwerter JSON na CSV',
      ro: 'Convertor JSON la CSV',
      cs: 'Konvertor JSON na CSV'
    },
    description: {
      en: 'Convert JSON data files to CSV format for Excel, Google Sheets, and other spreadsheet applications. Perfect for data analysis and reporting.',
      hu: 'Konvertálj JSON adat fájlokat CSV formátumba Excel, Google Sheets és más táblázatkezelő alkalmazásokhoz. Tökéletes adatelemzéshez és jelentéskészítéshez.',
      sk: 'Konvertujte JSON dátové súbory na CSV formát pre Excel, Google Sheets a ďalšie tabuľkové aplikácie. Perfektné pre analýzu dát a vytváranie správ.',
      de: 'Konvertieren Sie JSON-Datendateien in CSV-Format für Excel, Google Sheets und andere Tabellenkalkulationsanwendungen. Perfekt für Datenanalyse und Berichterstellung.',
      pl: 'Konwertuj pliki danych JSON na format CSV dla Excel, Google Sheets i innych aplikacji arkuszy kalkulacyjnych. Idealne do analizy danych i tworzenia raportów.',
      ro: 'Convertește fișierele de date JSON în format CSV pentru Excel, Google Sheets și alte aplicații de foi de calcul. Perfect pentru analiza datelor și crearea rapoartelor.',
      cs: 'Převeďte datové soubory JSON na formát CSV pro Excel, Google Sheets a další aplikace tabulkových procesorů. Perfektní pro analýzu dat a vytváření zpráv.'
    },
    inputFormat: 'JSON',
    outputFormat: 'CSV',
    maxFileSize: '512 MB',
    supportedFormats: ['.json'],
    features: [
      {
        en: 'Excel compatibility',
        hu: 'Excel kompatibilitás',
        sk: 'Excel kompatibilita',
        de: 'Excel-Kompatibilität',
        pl: 'Kompatybilność z Excel',
        ro: 'Compatibilitate Excel',
        cs: 'Kompatibilita s Excel'
      },
      {
        en: 'Data structure preservation',
        hu: 'Adatstruktúra megőrzése',
        sk: 'Zachovanie dátovej štruktúry',
        de: 'Datenstrukturerhaltung',
        pl: 'Zachowanie struktury danych',
        ro: 'Păstrarea structurii datelor',
        cs: 'Zachování datové struktury'
      },
      {
        en: 'Batch processing support',
        hu: 'Kötegelt feldolgozás támogatás',
        sk: 'Podpora dávkového spracovania',
        de: 'Batch-Verarbeitungsunterstützung',
        pl: 'Obsługa przetwarzania wsadowego',
        ro: 'Suport pentru procesare în lot',
        cs: 'Podpora dávkového zpracování'
      }
    ]
  }

  return <ConverterPage config={converterConfig} locale={params.locale} />
}
