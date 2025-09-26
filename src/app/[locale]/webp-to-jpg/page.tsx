import { Metadata } from 'next'
import ConverterPage from '@/components/ConverterPage'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const titles = {
    en: 'WEBP to JPG Converter - Convert WEBP Images to JPG',
    hu: 'WEBP JPG konvertáló - WEBP képek konvertálása JPG-be',
    sk: 'WEBP na JPG konvertor - Konverzia WEBP obrázkov na JPG',
    de: 'WEBP zu JPG Konverter - WEBP-Bilder in JPG konvertieren',
    pl: 'Konwerter WEBP na JPG - Konwersja obrazów WEBP na JPG',
    ro: 'Convertor WEBP la JPG - Conversie imagini WEBP în JPG',
    cs: 'Konvertor WEBP na JPG - Konverze obrázků WEBP na JPG'
  }

  const descriptions = {
    en: 'Convert WEBP images to JPG format for better compatibility. Free online WEBP to JPG converter with quality optimization.',
    hu: 'Konvertálj WEBP képeket JPG formátumba jobb kompatibilitásért. Ingyenes online WEBP JPG konvertáló minőségi optimalizációval.',
    sk: 'Konvertujte WEBP obrázky na JPG formát pre lepšiu kompatibilitu. Bezplatný online WEBP na JPG konvertor s optimalizáciou kvality.',
    de: 'Konvertieren Sie WEBP-Bilder in JPG-Format für bessere Kompatibilität. Kostenloser Online-WEBP-zu-JPG-Konverter mit Qualitätsoptimierung.',
    pl: 'Konwertuj obrazy WEBP na format JPG dla lepszej kompatybilności. Darmowy online konwerter WEBP na JPG z optymalizacją jakości.',
    ro: 'Convertește imagini WEBP în format JPG pentru compatibilitate mai bună. Convertor online gratuit WEBP la JPG cu optimizare calitate.',
    cs: 'Převeďte obrázky WEBP na formát JPG pro lepší kompatibilitu. Bezplatný online konvertor WEBP na JPG s optimalizací kvality.'
  }

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
  }
}

export default function WebpToJpgPage({ params }: Props) {
  const converterConfig = {
    id: 'webp-to-jpg',
    name: {
      en: 'WEBP to JPG Converter',
      hu: 'WEBP JPG konvertáló',
      sk: 'WEBP na JPG konvertor',
      de: 'WEBP zu JPG Konverter',
      pl: 'Konwerter WEBP na JPG',
      ro: 'Convertor WEBP la JPG',
      cs: 'Konvertor WEBP na JPG'
    },
    description: {
      en: 'Convert modern WEBP images to universal JPG format. Perfect for sharing images on older platforms or devices that don\'t support WEBP.',
      hu: 'Konvertálj modern WEBP képeket univerzális JPG formátumba. Tökéletes képek megosztásához régebbi platformokon vagy eszközökön, amelyek nem támogatják a WEBP-t.',
      sk: 'Konvertujte moderné WEBP obrázky na univerzálny JPG formát. Perfektné na zdieľanie obrázkov na starších platformách alebo zariadeniach, ktoré nepodporujú WEBP.',
      de: 'Konvertieren Sie moderne WEBP-Bilder in universelles JPG-Format. Perfekt zum Teilen von Bildern auf älteren Plattformen oder Geräten, die WEBP nicht unterstützen.',
      pl: 'Konwertuj nowoczesne obrazy WEBP na uniwersalny format JPG. Idealne do udostępniania obrazów na starszych platformach lub urządzeniach, które nie obsługują WEBP.',
      ro: 'Convertește imagini moderne WEBP în format universal JPG. Perfect pentru partajarea imaginilor pe platforme mai vechi sau dispozitive care nu suportă WEBP.',
      cs: 'Převeďte moderní obrázky WEBP na univerzální formát JPG. Perfektní pro sdílení obrázků na starších platformách nebo zařízeních, která nepodporují WEBP.'
    },
    inputFormat: 'WEBP',
    outputFormat: 'JPG',
    maxFileSize: '512 MB',
    supportedFormats: ['.webp'],
    features: [
      {
        en: 'Universal compatibility',
        hu: 'Univerzális kompatibilitás',
        sk: 'Univerzálna kompatibilita',
        de: 'Universelle Kompatibilität',
        pl: 'Uniwersalna kompatybilność',
        ro: 'Compatibilitate universală',
        cs: 'Univerzální kompatibilita'
      },
      {
        en: 'Quality preservation',
        hu: 'Minőség megőrzése',
        sk: 'Zachovanie kvality',
        de: 'Qualitätserhaltung',
        pl: 'Zachowanie jakości',
        ro: 'Păstrarea calității',
        cs: 'Zachování kvality'
      },
      {
        en: 'Fast batch processing',
        hu: 'Gyors kötegelt feldolgozás',
        sk: 'Rýchle dávkové spracovanie',
        de: 'Schnelle Batch-Verarbeitung',
        pl: 'Szybkie przetwarzanie wsadowe',
        ro: 'Procesare rapidă în lot',
        cs: 'Rychlé dávkové zpracování'
      }
    ]
  }

  return <ConverterPage config={converterConfig} locale={params.locale} />
}
