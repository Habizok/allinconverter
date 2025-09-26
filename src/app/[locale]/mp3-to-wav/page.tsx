import { Metadata } from 'next'
import ConverterPage from '@/components/ConverterPage'
import { generateConverterMetadata } from '@/lib/seo-converter'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const config = {
    id: 'mp3-to-wav',
    name: {
      en: 'MP3 to WAV Converter',
      hu: 'MP3 WAV konvertáló',
      sk: 'MP3 na WAV konvertor',
      de: 'MP3 zu WAV Konverter',
      pl: 'Konwerter MP3 na WAV',
      ro: 'Convertor MP3 la WAV',
      cs: 'Konvertor MP3 na WAV'
    },
    description: {
      en: 'Convert MP3 files to WAV format instantly. Free online MP3 to WAV converter. No registration required.',
      hu: 'Konvertálj MP3 fájlokat WAV formátumba azonnal. Ingyenes online MP3 WAV konvertáló. Regisztráció nélkül.',
      sk: 'Konvertujte MP3 súbory na WAV formát okamžite. Bezplatný online MP3 na WAV konvertor. Bez registrácie.',
      de: 'Konvertieren Sie MP3-Dateien sofort in WAV-Format. Kostenloser Online-MP3-zu-WAV-Konverter. Keine Registrierung erforderlich.',
      pl: 'Konwertuj pliki MP3 na format WAV natychmiast. Darmowy online konwerter MP3 na WAV. Bez rejestracji.',
      ro: 'Convertește fișierele MP3 în format WAV instant. Convertor online gratuit MP3 la WAV. Fără înregistrare.',
      cs: 'Převádějte soubory MP3 na formát WAV okamžitě. Bezplatný online konvertor MP3 na WAV. Bez registrace.'
    },
    inputFormat: 'mp3',
    outputFormat: 'wav'
  }

  return generateConverterMetadata(config, locale)
}

export default function Mp3ToWavPage({ params }: Props) {
  const converterConfig = {
    id: 'mp3-to-wav',
    name: {
      en: 'MP3 to WAV Converter',
      hu: 'MP3 WAV konvertáló',
      sk: 'MP3 na WAV konvertor',
      de: 'MP3 zu WAV Konverter',
      pl: 'Konwerter MP3 na WAV',
      ro: 'Convertor MP3 la WAV',
      cs: 'Konvertor MP3 na WAV'
    },
    description: {
      en: 'Convert MP3 audio files to uncompressed WAV format for professional audio editing.',
      hu: 'Konvertálj MP3 hangfájlokat tömörítetlen WAV formátumba professzionális hangszerkesztéshez.',
      sk: 'Konvertujte MP3 audio súbory na nekomprimovaný WAV formát pre profesionálne audio editovanie.',
      de: 'Konvertieren Sie MP3-Audiodateien in unkomprimiertes WAV-Format für professionelle Audio-Bearbeitung.',
      pl: 'Konwertuj pliki audio MP3 na nieskompresowany format WAV do profesjonalnej edycji audio.',
      ro: 'Convertește fișierele audio MP3 în format WAV necomprimat pentru editarea profesională audio.',
      cs: 'Převádějte audio soubory MP3 na nekomprimovaný formát WAV pro profesionální audio editaci.'
    },
    inputFormat: 'MP3',
    outputFormat: 'WAV',
    maxFileSize: '512 MB',
    supportedFormats: ['.mp3'],
    features: [
      {
        en: 'Lossless audio quality',
        hu: 'Veszteségmentes hangminőség',
        sk: 'Bezstratová audio kvalita',
        de: 'Verlustlose Audioqualität',
        pl: 'Bezstratna jakość audio',
        ro: 'Calitate audio fără pierderi',
        cs: 'Bezeztrátová audio kvalita'
      },
      {
        en: 'Professional audio editing',
        hu: 'Professzionális hangszerkesztés',
        sk: 'Profesionálne audio editovanie',
        de: 'Professionelle Audio-Bearbeitung',
        pl: 'Profesjonalna edycja audio',
        ro: 'Editare profesională audio',
        cs: 'Profesionální audio editace'
      },
      {
        en: 'High bitrate support',
        hu: 'Magas bitráta támogatás',
        sk: 'Podpora vysokého bitrate',
        de: 'Hohe Bitrate-Unterstützung',
        pl: 'Obsługa wysokiego bitrate',
        ro: 'Suport pentru bitrate înalt',
        cs: 'Podpora vysokého bitrate'
      }
    ]
  }

  return <ConverterPage config={converterConfig} locale={params.locale} />
}
