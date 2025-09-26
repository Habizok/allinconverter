import { Metadata } from 'next'
import ConverterPage from '@/components/ConverterPage'
import { generateConverterMetadata } from '@/lib/seo-converter'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const config = {
    id: 'jpg-to-webp',
    name: {
      en: 'JPG to WebP Converter',
      hu: 'JPG WebP konvertáló',
      sk: 'JPG na WebP konvertor',
      de: 'JPG zu WebP Konverter',
      pl: 'Konwerter JPG na WebP',
      ro: 'Convertor JPG la WebP',
      cs: 'Konvertor JPG na WebP'
    },
    description: {
      en: 'Convert JPG files to WebP format instantly. Free online JPG to WebP converter. No registration required.',
      hu: 'Konvertálj JPG fájlokat WebP formátumba azonnal. Ingyenes online JPG WebP konvertáló. Regisztráció nélkül.',
      sk: 'Konvertujte JPG súbory na WebP formát okamžite. Bezplatný online JPG na WebP konvertor. Bez registrácie.',
      de: 'Konvertieren Sie JPG-Dateien sofort in WebP-Format. Kostenloser Online-JPG-zu-WebP-Konverter. Keine Registrierung erforderlich.',
      pl: 'Konwertuj pliki JPG na format WebP natychmiast. Darmowy online konwerter JPG na WebP. Bez rejestracji.',
      ro: 'Convertește fișierele JPG în format WebP instant. Convertor online gratuit JPG la WebP. Fără înregistrare.',
      cs: 'Převádějte soubory JPG na formát WebP okamžitě. Bezplatný online konvertor JPG na WebP. Bez registrace.'
    },
    inputFormat: 'jpg',
    outputFormat: 'webp'
  }

  return generateConverterMetadata(config, locale)
}

export default function JpgToWebpPage({ params }: Props) {
  const converterConfig = {
    id: 'jpg-to-webp',
    name: {
      en: 'JPG to WebP Converter',
      hu: 'JPG WebP konvertáló',
      sk: 'JPG na WebP konvertor',
      de: 'JPG zu WebP Konverter',
      pl: 'Konwerter JPG na WebP',
      ro: 'Convertor JPG la WebP',
      cs: 'Konvertor JPG na WebP'
    },
    description: {
      en: 'Convert JPG images to WebP format for superior compression and faster web loading.',
      hu: 'Konvertálj JPG képeket WebP formátumba kiváló tömörítés és gyorsabb web betöltés érdekében.',
      sk: 'Konvertujte JPG obrázky na WebP formát pre nadradenú kompresiu a rýchlejšie načítanie webu.',
      de: 'Konvertieren Sie JPG-Bilder in WebP-Format für überlegene Komprimierung und schnelleres Web-Laden.',
      pl: 'Konwertuj obrazy JPG na format WebP dla lepszej kompresji i szybszego ładowania internetu.',
      ro: 'Convertește imaginile JPG în format WebP pentru compresie superioară și încărcare web mai rapidă.',
      cs: 'Převádějte obrázky JPG na formát WebP pro lepší kompresi a rychlejší načítání webu.'
    },
    inputFormat: 'JPG',
    outputFormat: 'WebP',
    maxFileSize: '512 MB',
    supportedFormats: ['.jpg', '.jpeg'],
    features: [
      {
        en: 'Superior compression',
        hu: 'Kiváló tömörítés',
        sk: 'Nadradená kompresia',
        de: 'Überlegene Komprimierung',
        pl: 'Lepsza kompresja',
        ro: 'Compresie superioară',
        cs: 'Lepší komprese'
      },
      {
        en: 'Faster web loading',
        hu: 'Gyorsabb web betöltés',
        sk: 'Rýchlejšie načítanie webu',
        de: 'Schnelleres Web-Laden',
        pl: 'Szybsze ładowanie internetu',
        ro: 'Încărcare web mai rapidă',
        cs: 'Rychlejší načítání webu'
      },
      {
        en: 'Modern web standard',
        hu: 'Modern web szabvány',
        sk: 'Moderný webový štandard',
        de: 'Moderner Web-Standard',
        pl: 'Nowoczesny standard internetowy',
        ro: 'Standard web modern',
        cs: 'Moderní webový standard'
      },
      {
        en: 'Lossless and lossy options',
        hu: 'Veszteségmentes és veszteséges opciók',
        sk: 'Bezstratové a stratové možnosti',
        de: 'Verlustfreie und verlustbehaftete Optionen',
        pl: 'Opcje bezstratne i stratne',
        ro: 'Opțiuni fără pierderi și cu pierderi',
        cs: 'Bezeztrátové a ztrátové možnosti'
      }
    ]
  }

  return <ConverterPage config={converterConfig} locale={params.locale} />
}
