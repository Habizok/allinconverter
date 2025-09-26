import { Metadata } from 'next'
import ConverterPage from '@/components/ConverterPage'
import { generateConverterMetadata } from '@/lib/seo-converter'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const config = {
    id: 'bmp-to-jpg',
    name: {
      en: 'BMP to JPG Converter',
      hu: 'BMP JPG konvertáló',
      sk: 'BMP na JPG konvertor',
      de: 'BMP zu JPG Konverter',
      pl: 'Konwerter BMP na JPG',
      ro: 'Convertor BMP la JPG',
      cs: 'Konvertor BMP na JPG'
    },
    description: {
      en: 'Convert BMP files to JPG format instantly. Free online BMP to JPG converter. No registration required.',
      hu: 'Konvertálj BMP fájlokat JPG formátumba azonnal. Ingyenes online BMP JPG konvertáló. Regisztráció nélkül.',
      sk: 'Konvertujte BMP súbory na JPG formát okamžite. Bezplatný online BMP na JPG konvertor. Bez registrácie.',
      de: 'Konvertieren Sie BMP-Dateien sofort in JPG-Format. Kostenloser Online-BMP-zu-JPG-Konverter. Keine Registrierung erforderlich.',
      pl: 'Konwertuj pliki BMP na format JPG natychmiast. Darmowy online konwerter BMP na JPG. Bez rejestracji.',
      ro: 'Convertește fișierele BMP în format JPG instant. Convertor online gratuit BMP la JPG. Fără înregistrare.',
      cs: 'Převádějte soubory BMP na formát JPG okamžitě. Bezplatný online konvertor BMP na JPG. Bez registrace.'
    },
    inputFormat: 'bmp',
    outputFormat: 'jpg'
  }

  return generateConverterMetadata(config, locale)
}

export default function BmpToJpgPage({ params }: Props) {
  const converterConfig = {
    id: 'bmp-to-jpg',
    name: {
      en: 'BMP to JPG Converter',
      hu: 'BMP JPG konvertáló',
      sk: 'BMP na JPG konvertor',
      de: 'BMP zu JPG Konverter',
      pl: 'Konwerter BMP na JPG',
      ro: 'Convertor BMP la JPG',
      cs: 'Konvertor BMP na JPG'
    },
    description: {
      en: 'Convert BMP bitmap images to JPG format for smaller file sizes and better web compatibility.',
      hu: 'Konvertálj BMP bitmap képeket JPG formátumba kisebb fájlméret és jobb web kompatibilitás érdekében.',
      sk: 'Konvertujte BMP bitmap obrázky na JPG formát pre menšie veľkosti súborov a lepšiu webovú kompatibilitu.',
      de: 'Konvertieren Sie BMP-Bitmap-Bilder in JPG-Format für kleinere Dateigrößen und bessere Web-Kompatibilität.',
      pl: 'Konwertuj obrazy bitmap BMP na format JPG dla mniejszych rozmiarów plików i lepszej kompatybilności internetowej.',
      ro: 'Convertește imaginile bitmap BMP în format JPG pentru dimensiuni mai mici ale fișierelor și compatibilitate web mai bună.',
      cs: 'Převádějte bitmapové obrázky BMP na formát JPG pro menší velikosti souborů a lepší webovou kompatibilitu.'
    },
    inputFormat: 'BMP',
    outputFormat: 'JPG',
    maxFileSize: '512 MB',
    supportedFormats: ['.bmp'],
    features: [
      {
        en: 'File size reduction',
        hu: 'Fájlméret csökkentés',
        sk: 'Zníženie veľkosti súboru',
        de: 'Dateigrößenreduzierung',
        pl: 'Zmniejszenie rozmiaru pliku',
        ro: 'Reducerea dimensiunii fișierului',
        cs: 'Snížení velikosti souboru'
      },
      {
        en: 'Web optimization',
        hu: 'Web optimalizálás',
        sk: 'Webová optimalizácia',
        de: 'Web-Optimierung',
        pl: 'Optymalizacja internetowa',
        ro: 'Optimizare web',
        cs: 'Webová optimalizace'
      },
      {
        en: 'Quality preservation',
        hu: 'Minőség megőrzés',
        sk: 'Zachovanie kvality',
        de: 'Qualitätserhaltung',
        pl: 'Zachowanie jakości',
        ro: 'Păstrarea calității',
        cs: 'Zachování kvality'
      }
    ]
  }

  return <ConverterPage config={converterConfig} locale={params.locale} />
}
