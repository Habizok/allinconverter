import { Metadata } from 'next'
import ConverterPage from '@/components/ConverterPage'
import { generateConverterMetadata } from '@/lib/seo-converter'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const config = {
    id: 'gif-to-mp4',
    name: {
      en: 'GIF to MP4 Converter',
      hu: 'GIF MP4 konvertáló',
      sk: 'GIF na MP4 konvertor',
      de: 'GIF zu MP4 Konverter',
      pl: 'Konwerter GIF na MP4',
      ro: 'Convertor GIF la MP4',
      cs: 'Konvertor GIF na MP4'
    },
    description: {
      en: 'Convert GIF files to MP4 format instantly. Free online GIF to MP4 converter. No registration required.',
      hu: 'Konvertálj GIF fájlokat MP4 formátumba azonnal. Ingyenes online GIF MP4 konvertáló. Regisztráció nélkül.',
      sk: 'Konvertujte GIF súbory na MP4 formát okamžite. Bezplatný online GIF na MP4 konvertor. Bez registrácie.',
      de: 'Konvertieren Sie GIF-Dateien sofort in MP4-Format. Kostenloser Online-GIF-zu-MP4-Konverter. Keine Registrierung erforderlich.',
      pl: 'Konwertuj pliki GIF na format MP4 natychmiast. Darmowy online konwerter GIF na MP4. Bez rejestracji.',
      ro: 'Convertește fișierele GIF în format MP4 instant. Convertor online gratuit GIF la MP4. Fără înregistrare.',
      cs: 'Převádějte soubory GIF na formát MP4 okamžitě. Bezplatný online konvertor GIF na MP4. Bez registrace.'
    },
    inputFormat: 'gif',
    outputFormat: 'mp4'
  }

  return generateConverterMetadata(config, locale)
}

export default function GifToMp4Page({ params }: Props) {
  const converterConfig = {
    id: 'gif-to-mp4',
    name: {
      en: 'GIF to MP4 Converter',
      hu: 'GIF MP4 konvertáló',
      sk: 'GIF na MP4 konvertor',
      de: 'GIF zu MP4 Konverter',
      pl: 'Konwerter GIF na MP4',
      ro: 'Convertor GIF la MP4',
      cs: 'Konvertor GIF na MP4'
    },
    description: {
      en: 'Convert animated GIF files to MP4 video format for better compression and modern playback.',
      hu: 'Konvertálj animált GIF fájlokat MP4 videó formátumba jobb tömörítés és modern lejátszás érdekében.',
      sk: 'Konvertujte animované GIF súbory na MP4 video formát pre lepšiu kompresiu a moderné prehrávanie.',
      de: 'Konvertieren Sie animierte GIF-Dateien in MP4-Videoformat für bessere Komprimierung und moderne Wiedergabe.',
      pl: 'Konwertuj animowane pliki GIF na format wideo MP4 dla lepszej kompresji i nowoczesnego odtwarzania.',
      ro: 'Convertește fișierele GIF animate în format video MP4 pentru compresie mai bună și redare modernă.',
      cs: 'Převádějte animované soubory GIF na formát videa MP4 pro lepší kompresi a moderní přehrávání.'
    },
    inputFormat: 'GIF',
    outputFormat: 'MP4',
    maxFileSize: '512 MB',
    supportedFormats: ['.gif'],
    features: [
      {
        en: 'Better compression',
        hu: 'Jobb tömörítés',
        sk: 'Lepšia kompresia',
        de: 'Bessere Komprimierung',
        pl: 'Lepsza kompresja',
        ro: 'Compresie mai bună',
        cs: 'Lepší komprese'
      },
      {
        en: 'Modern video format',
        hu: 'Modern videó formátum',
        sk: 'Moderný video formát',
        de: 'Modernes Videoformat',
        pl: 'Nowoczesny format wideo',
        ro: 'Format video modern',
        cs: 'Moderní formát videa'
      },
      {
        en: 'Audio support',
        hu: 'Hang támogatás',
        sk: 'Podpora zvuku',
        de: 'Audio-Unterstützung',
        pl: 'Obsługa audio',
        ro: 'Suport audio',
        cs: 'Podpora zvuku'
      },
      {
        en: 'Streaming compatibility',
        hu: 'Streaming kompatibilitás',
        sk: 'Kompatibilita streamovania',
        de: 'Streaming-Kompatibilität',
        pl: 'Kompatybilność streamingu',
        ro: 'Compatibilitate streaming',
        cs: 'Kompatibilita streamingu'
      }
    ]
  }

  return <ConverterPage config={converterConfig} locale={params.locale} />
}
