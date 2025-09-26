import { Metadata } from 'next'
import ConverterPage from '@/components/ConverterPage'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const titles = {
    en: 'HEIC to JPG Converter - Convert iPhone Photos to JPG',
    hu: 'HEIC JPG konvertáló - iPhone fotók konvertálása JPG-be',
    sk: 'HEIC na JPG konvertor - Konverzia iPhone fotiek na JPG',
    de: 'HEIC zu JPG Konverter - iPhone-Fotos in JPG konvertieren',
    pl: 'Konwerter HEIC na JPG - Konwersja zdjęć iPhone na JPG',
    ro: 'Convertor HEIC la JPG - Conversie fotografii iPhone în JPG',
    cs: 'Konvertor HEIC na JPG - Konverze fotografií iPhone na JPG'
  }

  const descriptions = {
    en: 'Convert HEIC photos from iPhone to JPG format. Free online HEIC to JPG converter with high quality output.',
    hu: 'Konvertálj HEIC fotókat iPhone-ról JPG formátumba. Ingyenes online HEIC JPG konvertáló magas minőséggel.',
    sk: 'Konvertujte HEIC fotky z iPhone na JPG formát. Bezplatný online HEIC na JPG konvertor s vysokou kvalitou.',
    de: 'Konvertieren Sie HEIC-Fotos vom iPhone in JPG-Format. Kostenloser Online-HEIC-zu-JPG-Konverter mit hoher Qualität.',
    pl: 'Konwertuj zdjęcia HEIC z iPhone na format JPG. Darmowy online konwerter HEIC na JPG z wysoką jakością.',
    ro: 'Convertește fotografiile HEIC de la iPhone în format JPG. Convertor online gratuit HEIC la JPG cu calitate înaltă.',
    cs: 'Převeďte fotografie HEIC z iPhone na formát JPG. Bezplatný online konvertor HEIC na JPG s vysokou kvalitou.'
  }

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
  }
}

export default function HeicToJpgPage({ params }: Props) {
  const converterConfig = {
    id: 'heic-to-jpg',
    name: {
      en: 'HEIC to JPG Converter',
      hu: 'HEIC JPG konvertáló',
      sk: 'HEIC na JPG konvertor',
      de: 'HEIC zu JPG Konverter',
      pl: 'Konwerter HEIC na JPG',
      ro: 'Convertor HEIC la JPG',
      cs: 'Konvertor HEIC na JPG'
    },
    description: {
      en: 'Convert HEIC photos from iPhone and other Apple devices to JPG format. Perfect for sharing photos on social media.',
      hu: 'Konvertálj HEIC fotókat iPhone-ról és más Apple eszközökről JPG formátumba. Tökéletes fotók megosztásához közösségi médiában.',
      sk: 'Konvertujte HEIC fotky z iPhone a iných Apple zariadení na JPG formát. Perfektné na zdieľanie fotiek na sociálnych sieťach.',
      de: 'Konvertieren Sie HEIC-Fotos von iPhone und anderen Apple-Geräten in JPG-Format. Perfekt zum Teilen von Fotos in sozialen Medien.',
      pl: 'Konwertuj zdjęcia HEIC z iPhone i innych urządzeń Apple na format JPG. Idealne do udostępniania zdjęć w mediach społecznościowych.',
      ro: 'Convertește fotografiile HEIC de la iPhone și alte dispozitive Apple în format JPG. Perfect pentru partajarea fotografiilor pe rețelele sociale.',
      cs: 'Převeďte fotografie HEIC z iPhone a dalších zařízení Apple na formát JPG. Perfektní pro sdílení fotografií na sociálních sítích.'
    },
    inputFormat: 'HEIC',
    outputFormat: 'JPG',
    maxFileSize: '512 MB',
    supportedFormats: ['.heic', '.heif'],
    features: [
      {
        en: 'iPhone photo compatibility',
        hu: 'iPhone fotó kompatibilitás',
        sk: 'Kompatibilita s iPhone fotkami',
        de: 'iPhone-Foto-Kompatibilität',
        pl: 'Kompatybilność ze zdjęciami iPhone',
        ro: 'Compatibilitate cu fotografiile iPhone',
        cs: 'Kompatibilita s fotografiemi iPhone'
      },
      {
        en: 'High-quality image processing',
        hu: 'Magas minőségű képfeldolgozás',
        sk: 'Vysokokvalitné spracovanie obrázkov',
        de: 'Hochwertige Bildverarbeitung',
        pl: 'Przetwarzanie obrazów wysokiej jakości',
        ro: 'Procesare de imagini de înaltă calitate',
        cs: 'Vysoce kvalitní zpracování obrazů'
      },
      {
        en: 'Fast batch conversion',
        hu: 'Gyors kötegelt konverzió',
        sk: 'Rýchla dávková konverzia',
        de: 'Schnelle Batch-Konvertierung',
        pl: 'Szybka konwersja wsadowa',
        ro: 'Conversie rapidă în lot',
        cs: 'Rychlá dávková konverze'
      }
    ]
  }

  return <ConverterPage config={converterConfig} locale={params.locale} />
}
