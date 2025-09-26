import { Metadata } from 'next'
import ConverterPage from '@/components/ConverterPage'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const titles = {
    en: 'MOBI to EPUB Converter - Convert Kindle Books to EPUB',
    hu: 'MOBI EPUB konvertáló - Kindle könyvek konvertálása EPUB-be',
    sk: 'MOBI na EPUB konvertor - Konverzia Kindle kníh na EPUB',
    de: 'MOBI zu EPUB Konverter - Kindle-Bücher in EPUB konvertieren',
    pl: 'Konwerter MOBI na EPUB - Konwersja książek Kindle na EPUB',
    ro: 'Convertor MOBI la EPUB - Conversie cărți Kindle în EPUB',
    cs: 'Konvertor MOBI na EPUB - Konverze knih Kindle na EPUB'
  }

  const descriptions = {
    en: 'Convert MOBI Kindle books to EPUB format for universal e-reader compatibility. Free online MOBI to EPUB converter with formatting preservation.',
    hu: 'Konvertálj MOBI Kindle könyveket EPUB formátumba univerzális e-olvasó kompatibilitásért. Ingyenes online MOBI EPUB konvertáló formázás megőrzéssel.',
    sk: 'Konvertujte MOBI Kindle knihy na EPUB formát pre univerzálnu kompatibilitu e-čitateľov. Bezplatný online MOBI na EPUB konvertor s zachovaním formátovania.',
    de: 'Konvertieren Sie MOBI Kindle-Bücher in EPUB-Format für universelle E-Reader-Kompatibilität. Kostenloser Online-MOBI-zu-EPUB-Konverter mit Formatierungserhaltung.',
    pl: 'Konwertuj książki MOBI Kindle na format EPUB dla uniwersalnej kompatybilności z e-czytnikami. Darmowy online konwerter MOBI na EPUB z zachowaniem formatowania.',
    ro: 'Convertește cărți MOBI Kindle în format EPUB pentru compatibilitate universală cu e-readerele. Convertor online gratuit MOBI la EPUB cu păstrarea formatării.',
    cs: 'Převeďte knihy MOBI Kindle na formát EPUB pro univerzální kompatibilitu s e-čtečkami. Bezplatný online konvertor MOBI na EPUB se zachováním formátování.'
  }

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
  }
}

export default function MobiToEpubPage({ params }: Props) {
  const converterConfig = {
    id: 'mobi-to-epub',
    name: {
      en: 'MOBI to EPUB Converter',
      hu: 'MOBI EPUB konvertáló',
      sk: 'MOBI na EPUB konvertor',
      de: 'MOBI zu EPUB Konverter',
      pl: 'Konwerter MOBI na EPUB',
      ro: 'Convertor MOBI la EPUB',
      cs: 'Konvertor MOBI na EPUB'
    },
    description: {
      en: 'Convert MOBI Kindle books to EPUB format for reading on any e-reader device. Perfect for cross-platform e-book compatibility.',
      hu: 'Konvertálj MOBI Kindle könyveket EPUB formátumba bármilyen e-olvasó eszközön való olvasáshoz. Tökéletes platformok közötti e-könyv kompatibilitáshoz.',
      sk: 'Konvertujte MOBI Kindle knihy na EPUB formát na čítanie na akomkoľvek e-čitateľskom zariadení. Perfektné pre kompatibilitu e-kníh medzi platformami.',
      de: 'Konvertieren Sie MOBI Kindle-Bücher in EPUB-Format zum Lesen auf jedem E-Reader-Gerät. Perfekt für plattformübergreifende E-Book-Kompatibilität.',
      pl: 'Konwertuj książki MOBI Kindle na format EPUB do czytania na dowolnym urządzeniu e-czytnika. Idealne do kompatybilności e-booków między platformami.',
      ro: 'Convertește cărți MOBI Kindle în format EPUB pentru citire pe orice dispozitiv e-reader. Perfect pentru compatibilitatea e-cărților între platforme.',
      cs: 'Převeďte knihy MOBI Kindle na formát EPUB pro čtení na jakémkoli zařízení e-čtečky. Perfektní pro kompatibilitu e-knih mezi platformami.'
    },
    inputFormat: 'MOBI',
    outputFormat: 'EPUB',
    maxFileSize: '512 MB',
    supportedFormats: ['.mobi', '.azw'],
    features: [
      {
        en: 'Universal e-reader support',
        hu: 'Univerzális e-olvasó támogatás',
        sk: 'Univerzálna podpora e-čitateľov',
        de: 'Universelle E-Reader-Unterstützung',
        pl: 'Uniwersalne wsparcie e-czytników',
        ro: 'Suport universal pentru e-readere',
        cs: 'Univerzální podpora e-čteček'
      },
      {
        en: 'Cross-platform compatibility',
        hu: 'Platformok közötti kompatibilitás',
        sk: 'Kompatibilita medzi platformami',
        de: 'Plattformübergreifende Kompatibilität',
        pl: 'Kompatybilność między platformami',
        ro: 'Compatibilitate între platforme',
        cs: 'Kompatibilita mezi platformami'
      },
      {
        en: 'Metadata preservation',
        hu: 'Metaadatok megőrzése',
        sk: 'Zachovanie metadát',
        de: 'Metadaten-Erhaltung',
        pl: 'Zachowanie metadanych',
        ro: 'Păstrarea metadatelor',
        cs: 'Zachování metadat'
      }
    ]
  }

  return <ConverterPage config={converterConfig} locale={params.locale} />
}
