import { Metadata } from 'next'
import ConverterPage from '@/components/ConverterPage'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const titles = {
    en: 'PNG to JPG Converter - Convert PNG Images to JPG Format',
    hu: 'PNG JPG konvertáló - PNG képek konvertálása JPG formátumba',
    sk: 'PNG na JPG konvertor - Konverzia PNG obrázkov na JPG formát',
    de: 'PNG zu JPG Konverter - PNG-Bilder in JPG-Format konvertieren',
    pl: 'Konwerter PNG na JPG - Konwersja obrazów PNG na format JPG',
    ro: 'Convertor PNG la JPG - Conversie imagini PNG în format JPG',
    cs: 'Konvertor PNG na JPG - Konverze obrázků PNG na formát JPG'
  }

  const descriptions = {
    en: 'Convert PNG images to JPG format with customizable quality settings. Free online PNG to JPG converter with compression options.',
    hu: 'Konvertálj PNG képeket JPG formátumba testreszabható minőségi beállításokkal. Ingyenes online PNG JPG konvertáló tömörítési opciókkal.',
    sk: 'Konvertujte PNG obrázky na JPG formát s prispôsobiteľnými nastaveniami kvality. Bezplatný online PNG na JPG konvertor s možnosťami kompresie.',
    de: 'Konvertieren Sie PNG-Bilder in JPG-Format mit anpassbaren Qualitätseinstellungen. Kostenloser Online-PNG-zu-JPG-Konverter mit Komprimierungsoptionen.',
    pl: 'Konwertuj obrazy PNG na format JPG z konfigurowalnymi ustawieniami jakości. Darmowy online konwerter PNG na JPG z opcjami kompresji.',
    ro: 'Convertește imagini PNG în format JPG cu setări de calitate personalizabile. Convertor online gratuit PNG la JPG cu opțiuni de comprimare.',
    cs: 'Převeďte obrázky PNG na formát JPG s přizpůsobitelnými nastaveními kvality. Bezplatný online konvertor PNG na JPG s možnostmi komprese.'
  }

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
  }
}

export default function PngToJpgPage({ params }: Props) {
  const converterConfig = {
    id: 'png-to-jpg',
    name: {
      en: 'PNG to JPG Converter',
      hu: 'PNG JPG konvertáló',
      sk: 'PNG na JPG konvertor',
      de: 'PNG zu JPG Konverter',
      pl: 'Konwerter PNG na JPG',
      ro: 'Convertor PNG la JPG',
      cs: 'Konvertor PNG na JPG'
    },
    description: {
      en: 'Convert PNG images to JPG format with customizable quality and compression settings. Perfect for reducing file sizes.',
      hu: 'Konvertálj PNG képeket JPG formátumba testreszabható minőségi és tömörítési beállításokkal. Tökéletes fájlméret csökkentéshez.',
      sk: 'Konvertujte PNG obrázky na JPG formát s prispôsobiteľnými nastaveniami kvality a kompresie. Perfektné na zníženie veľkosti súborov.',
      de: 'Konvertieren Sie PNG-Bilder in JPG-Format mit anpassbaren Qualitäts- und Komprimierungseinstellungen. Perfekt zur Reduzierung der Dateigröße.',
      pl: 'Konwertuj obrazy PNG na format JPG z konfigurowalnymi ustawieniami jakości i kompresji. Idealne do zmniejszania rozmiaru plików.',
      ro: 'Convertește imagini PNG în format JPG cu setări de calitate și comprimare personalizabile. Perfect pentru reducerea dimensiunii fișierelor.',
      cs: 'Převeďte obrázky PNG na formát JPG s přizpůsobitelnými nastaveními kvality a komprese. Perfektní pro snížení velikosti souborů.'
    },
    inputFormat: 'PNG',
    outputFormat: 'JPG',
    maxFileSize: '512 MB',
    supportedFormats: ['.png'],
    features: [
      {
        en: 'Customizable quality settings',
        hu: 'Testreszabható minőségi beállítások',
        sk: 'Prispôsobiteľné nastavenia kvality',
        de: 'Anpassbare Qualitätseinstellungen',
        pl: 'Konfigurowalne ustawienia jakości',
        ro: 'Setări de calitate personalizabile',
        cs: 'Přizpůsobitelná nastavení kvality'
      },
      {
        en: 'File size optimization',
        hu: 'Fájlméret optimalizáció',
        sk: 'Optimalizácia veľkosti súboru',
        de: 'Dateigrößenoptimierung',
        pl: 'Optymalizacja rozmiaru pliku',
        ro: 'Optimizarea dimensiunii fișierului',
        cs: 'Optimalizace velikosti souboru'
      },
      {
        en: 'Batch conversion support',
        hu: 'Kötegelt konverzió támogatás',
        sk: 'Podpora dávkovej konverzie',
        de: 'Batch-Konvertierungsunterstützung',
        pl: 'Obsługa konwersji wsadowej',
        ro: 'Suport pentru conversie în lot',
        cs: 'Podpora dávkové konverze'
      }
    ]
  }

  return <ConverterPage config={converterConfig} locale={params.locale} />
}
