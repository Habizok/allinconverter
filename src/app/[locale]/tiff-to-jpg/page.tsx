import { Metadata } from 'next'
import ConverterPage from '@/components/ConverterPage'
import { generateConverterMetadata } from '@/lib/seo-converter'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const config = {
    id: 'tiff-to-jpg',
    name: {
      en: 'TIFF to JPG Converter',
      hu: 'TIFF JPG konvertáló',
      sk: 'TIFF na JPG konvertor',
      de: 'TIFF zu JPG Konverter',
      pl: 'Konwerter TIFF na JPG',
      ro: 'Convertor TIFF la JPG',
      cs: 'Konvertor TIFF na JPG'
    },
    description: {
      en: 'Convert TIFF files to JPG format instantly. Free online TIFF to JPG converter. No registration required.',
      hu: 'Konvertálj TIFF fájlokat JPG formátumba azonnal. Ingyenes online TIFF JPG konvertáló. Regisztráció nélkül.',
      sk: 'Konvertujte TIFF súbory na JPG formát okamžite. Bezplatný online TIFF na JPG konvertor. Bez registrácie.',
      de: 'Konvertieren Sie TIFF-Dateien sofort in JPG-Format. Kostenloser Online-TIFF-zu-JPG-Konverter. Keine Registrierung erforderlich.',
      pl: 'Konwertuj pliki TIFF na format JPG natychmiast. Darmowy online konwerter TIFF na JPG. Bez rejestracji.',
      ro: 'Convertește fișierele TIFF în format JPG instant. Convertor online gratuit TIFF la JPG. Fără înregistrare.',
      cs: 'Převádějte soubory TIFF na formát JPG okamžitě. Bezplatný online konvertor TIFF na JPG. Bez registrace.'
    },
    inputFormat: 'tiff',
    outputFormat: 'jpg'
  }

  return generateConverterMetadata(config, locale)
}

export default function TiffToJpgPage({ params }: Props) {
  const converterConfig = {
    id: 'tiff-to-jpg',
    name: {
      en: 'TIFF to JPG Converter',
      hu: 'TIFF JPG konvertáló',
      sk: 'TIFF na JPG konvertor',
      de: 'TIFF zu JPG Konverter',
      pl: 'Konwerter TIFF na JPG',
      ro: 'Convertor TIFF la JPG',
      cs: 'Konvertor TIFF na JPG'
    },
    description: {
      en: 'Convert TIFF images to JPG format for smaller file sizes and universal compatibility.',
      hu: 'Konvertálj TIFF képeket JPG formátumba kisebb fájlméret és univerzális kompatibilitás érdekében.',
      sk: 'Konvertujte TIFF obrázky na JPG formát pre menšie veľkosti súborov a univerzálnu kompatibilitu.',
      de: 'Konvertieren Sie TIFF-Bilder in JPG-Format für kleinere Dateigrößen und universelle Kompatibilität.',
      pl: 'Konwertuj obrazy TIFF na format JPG dla mniejszych rozmiarów plików i uniwersalnej kompatybilności.',
      ro: 'Convertește imaginile TIFF în format JPG pentru dimensiuni mai mici ale fișierelor și compatibilitate universală.',
      cs: 'Převádějte obrázky TIFF na formát JPG pro menší velikosti souborů a univerzální kompatibilitu.'
    },
    inputFormat: 'TIFF',
    outputFormat: 'JPG',
    maxFileSize: '512 MB',
    supportedFormats: ['.tiff', '.tif'],
    features: [
      {
        en: 'Professional image format',
        hu: 'Professzionális képformátum',
        sk: 'Profesionálny formát obrázka',
        de: 'Professionelles Bildformat',
        pl: 'Profesjonalny format obrazu',
        ro: 'Format imagine profesional',
        cs: 'Profesionální formát obrázku'
      },
      {
        en: 'High-quality compression',
        hu: 'Magas minőségű tömörítés',
        sk: 'Vysokokvalitná kompresia',
        de: 'Hochwertige Komprimierung',
        pl: 'Wysokiej jakości kompresja',
        ro: 'Compresie de înaltă calitate',
        cs: 'Vysokokvalitní komprese'
      },
      {
        en: 'Universal compatibility',
        hu: 'Univerzális kompatibilitás',
        sk: 'Univerzálna kompatibilita',
        de: 'Universelle Kompatibilität',
        pl: 'Uniwersalna kompatybilność',
        ro: 'Compatibilitate universală',
        cs: 'Univerzální kompatibilita'
      }
    ]
  }

  return <ConverterPage config={converterConfig} locale={params.locale} />
}
