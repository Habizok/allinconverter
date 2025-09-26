import { Metadata } from 'next'
import ConverterPage from '@/components/ConverterPage'
import { generateConverterMetadata } from '@/lib/seo-converter'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const config = {
    id: 'aac-to-mp3',
    name: {
      en: 'AAC to MP3 Converter',
      hu: 'AAC MP3 konvertáló',
      sk: 'AAC na MP3 konvertor',
      de: 'AAC zu MP3 Konverter',
      pl: 'Konwerter AAC na MP3',
      ro: 'Convertor AAC la MP3',
      cs: 'Konvertor AAC na MP3'
    },
    description: {
      en: 'Convert AAC files to MP3 format instantly. Free online AAC to MP3 converter. No registration required.',
      hu: 'Konvertálj AAC fájlokat MP3 formátumba azonnal. Ingyenes online AAC MP3 konvertáló. Regisztráció nélkül.',
      sk: 'Konvertujte AAC súbory na MP3 formát okamžite. Bezplatný online AAC na MP3 konvertor. Bez registrácie.',
      de: 'Konvertieren Sie AAC-Dateien sofort in MP3-Format. Kostenloser Online-AAC-zu-MP3-Konverter. Keine Registrierung erforderlich.',
      pl: 'Konwertuj pliki AAC na format MP3 natychmiast. Darmowy online konwerter AAC na MP3. Bez rejestracji.',
      ro: 'Convertește fișierele AAC în format MP3 instant. Convertor online gratuit AAC la MP3. Fără înregistrare.',
      cs: 'Převádějte soubory AAC na formát MP3 okamžitě. Bezplatný online konvertor AAC na MP3. Bez registrace.'
    },
    inputFormat: 'aac',
    outputFormat: 'mp3'
  }

  return generateConverterMetadata(config, locale)
}

export default function AacToMp3Page({ params }: Props) {
  const converterConfig = {
    id: 'aac-to-mp3',
    name: {
      en: 'AAC to MP3 Converter',
      hu: 'AAC MP3 konvertáló',
      sk: 'AAC na MP3 konvertor',
      de: 'AAC zu MP3 Konverter',
      pl: 'Konwerter AAC na MP3',
      ro: 'Convertor AAC la MP3',
      cs: 'Konvertor AAC na MP3'
    },
    description: {
      en: 'Convert AAC audio files to MP3 format for better compatibility and smaller file sizes.',
      hu: 'Konvertálj AAC hangfájlokat MP3 formátumba jobb kompatibilitás és kisebb fájlméret érdekében.',
      sk: 'Konvertujte AAC audio súbory na MP3 formát pre lepšiu kompatibilitu a menšie veľkosti súborov.',
      de: 'Konvertieren Sie AAC-Audiodateien in MP3-Format für bessere Kompatibilität und kleinere Dateigrößen.',
      pl: 'Konwertuj pliki audio AAC na format MP3 dla lepszej kompatybilności i mniejszych rozmiarów plików.',
      ro: 'Convertește fișierele audio AAC în format MP3 pentru compatibilitate mai bună și dimensiuni mai mici ale fișierelor.',
      cs: 'Převádějte audio soubory AAC na formát MP3 pro lepší kompatibilitu a menší velikosti souborů.'
    },
    inputFormat: 'AAC',
    outputFormat: 'MP3',
    maxFileSize: '512 MB',
    supportedFormats: ['.aac', '.m4a'],
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
        hu: 'Minőség megőrzés',
        sk: 'Zachovanie kvality',
        de: 'Qualitätserhaltung',
        pl: 'Zachowanie jakości',
        ro: 'Păstrarea calității',
        cs: 'Zachování kvality'
      },
      {
        en: 'Fast conversion speed',
        hu: 'Gyors konverziós sebesség',
        sk: 'Rýchla rýchlosť konverzie',
        de: 'Schnelle Konvertierungsgeschwindigkeit',
        pl: 'Szybka prędkość konwersji',
        ro: 'Viteză rapidă de conversie',
        cs: 'Rychlá rychlost konverze'
      }
    ]
  }

  return <ConverterPage config={converterConfig} locale={params.locale} />
}
