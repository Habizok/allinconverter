import { Metadata } from 'next'
import ConverterPage from '@/components/ConverterPage'
import { generateConverterMetadata } from '@/lib/seo-converter'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const config = {
    id: 'flac-to-mp3',
    name: {
      en: 'FLAC to MP3 Converter',
      hu: 'FLAC MP3 konvertáló',
      sk: 'FLAC na MP3 konvertor',
      de: 'FLAC zu MP3 Konverter',
      pl: 'Konwerter FLAC na MP3',
      ro: 'Convertor FLAC la MP3',
      cs: 'Konvertor FLAC na MP3'
    },
    description: {
      en: 'Convert FLAC files to MP3 format instantly. Free online FLAC to MP3 converter. No registration required.',
      hu: 'Konvertálj FLAC fájlokat MP3 formátumba azonnal. Ingyenes online FLAC MP3 konvertáló. Regisztráció nélkül.',
      sk: 'Konvertujte FLAC súbory na MP3 formát okamžite. Bezplatný online FLAC na MP3 konvertor. Bez registrácie.',
      de: 'Konvertieren Sie FLAC-Dateien sofort in MP3-Format. Kostenloser Online-FLAC-zu-MP3-Konverter. Keine Registrierung erforderlich.',
      pl: 'Konwertuj pliki FLAC na format MP3 natychmiast. Darmowy online konwerter FLAC na MP3. Bez rejestracji.',
      ro: 'Convertește fișierele FLAC în format MP3 instant. Convertor online gratuit FLAC la MP3. Fără înregistrare.',
      cs: 'Převádějte soubory FLAC na formát MP3 okamžitě. Bezplatný online konvertor FLAC na MP3. Bez registrace.'
    },
    inputFormat: 'flac',
    outputFormat: 'mp3'
  }

  return generateConverterMetadata(config, locale)
}

export default function FlacToMp3Page({ params }: Props) {
  const converterConfig = {
    id: 'flac-to-mp3',
    name: {
      en: 'FLAC to MP3 Converter',
      hu: 'FLAC MP3 konvertáló',
      sk: 'FLAC na MP3 konvertor',
      de: 'FLAC zu MP3 Konverter',
      pl: 'Konwerter FLAC na MP3',
      ro: 'Convertor FLAC la MP3',
      cs: 'Konvertor FLAC na MP3'
    },
    description: {
      en: 'Convert lossless FLAC audio files to MP3 format for better compatibility and smaller file sizes.',
      hu: 'Konvertálj veszteségmentes FLAC hangfájlokat MP3 formátumba jobb kompatibilitás és kisebb fájlméret érdekében.',
      sk: 'Konvertujte bezstratové FLAC audio súbory na MP3 formát pre lepšiu kompatibilitu a menšie veľkosti súborov.',
      de: 'Konvertieren Sie verlustfreie FLAC-Audiodateien in MP3-Format für bessere Kompatibilität und kleinere Dateigrößen.',
      pl: 'Konwertuj bezstratne pliki audio FLAC na format MP3 dla lepszej kompatybilności i mniejszych rozmiarów plików.',
      ro: 'Convertește fișierele audio FLAC fără pierderi în format MP3 pentru compatibilitate mai bună și dimensiuni mai mici ale fișierelor.',
      cs: 'Převádějte bezeztrátové audio soubory FLAC na formát MP3 pro lepší kompatibilitu a menší velikosti souborů.'
    },
    inputFormat: 'FLAC',
    outputFormat: 'MP3',
    maxFileSize: '512 MB',
    supportedFormats: ['.flac'],
    features: [
      {
        en: 'Lossless to lossy conversion',
        hu: 'Veszteségmentes veszteséges konverzió',
        sk: 'Konverzia z bezstratového na stratový',
        de: 'Verlustfreie zu verlustbehaftete Konvertierung',
        pl: 'Konwersja z bezstratnej na stratną',
        ro: 'Conversie de la fără pierderi la cu pierderi',
        cs: 'Konverze z bezeztrátového na ztrátový'
      },
      {
        en: 'Bitrate customization',
        hu: 'Bitráta testreszabás',
        sk: 'Prispôsobenie bitrate',
        de: 'Bitrate-Anpassung',
        pl: 'Dostosowanie bitrate',
        ro: 'Personalizare bitrate',
        cs: 'Přizpůsobení bitrate'
      },
      {
        en: 'Metadata preservation',
        hu: 'Metaadatok megőrzés',
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
