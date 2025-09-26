import { Metadata } from 'next'
import ConverterPage from '@/components/ConverterPage'
import { generateConverterMetadata } from '@/lib/seo-converter'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const config = {
    id: 'mkv-to-mp4',
    name: {
      en: 'MKV to MP4 Converter',
      hu: 'MKV MP4 konvertáló',
      sk: 'MKV na MP4 konvertor',
      de: 'MKV zu MP4 Konverter',
      pl: 'Konwerter MKV na MP4',
      ro: 'Convertor MKV la MP4',
      cs: 'Konvertor MKV na MP4'
    },
    description: {
      en: 'Convert MKV files to MP4 format instantly. Free online MKV to MP4 converter. No registration required.',
      hu: 'Konvertálj MKV fájlokat MP4 formátumba azonnal. Ingyenes online MKV MP4 konvertáló. Regisztráció nélkül.',
      sk: 'Konvertujte MKV súbory na MP4 formát okamžite. Bezplatný online MKV na MP4 konvertor. Bez registrácie.',
      de: 'Konvertieren Sie MKV-Dateien sofort in MP4-Format. Kostenloser Online-MKV-zu-MP4-Konverter. Keine Registrierung erforderlich.',
      pl: 'Konwertuj pliki MKV na format MP4 natychmiast. Darmowy online konwerter MKV na MP4. Bez rejestracji.',
      ro: 'Convertește fișierele MKV în format MP4 instant. Convertor online gratuit MKV la MP4. Fără înregistrare.',
      cs: 'Převádějte soubory MKV na formát MP4 okamžitě. Bezplatný online konvertor MKV na MP4. Bez registrace.'
    },
    inputFormat: 'mkv',
    outputFormat: 'mp4'
  }

  return generateConverterMetadata(config, locale)
}

export default function MkvToMp4Page({ params }: Props) {
  const converterConfig = {
    id: 'mkv-to-mp4',
    name: {
      en: 'MKV to MP4 Converter',
      hu: 'MKV MP4 konvertáló',
      sk: 'MKV na MP4 konvertor',
      de: 'MKV zu MP4 Konverter',
      pl: 'Konwerter MKV na MP4',
      ro: 'Convertor MKV la MP4',
      cs: 'Konvertor MKV na MP4'
    },
    description: {
      en: 'Convert MKV video files to MP4 format for better compatibility and streaming support.',
      hu: 'Konvertálj MKV videófájlokat MP4 formátumba jobb kompatibilitás és streaming támogatás érdekében.',
      sk: 'Konvertujte MKV video súbory na MP4 formát pre lepšiu kompatibilitu a podporu streamovania.',
      de: 'Konvertieren Sie MKV-Videodateien in MP4-Format für bessere Kompatibilität und Streaming-Unterstützung.',
      pl: 'Konwertuj pliki wideo MKV na format MP4 dla lepszej kompatybilności i wsparcia streamingu.',
      ro: 'Convertește fișierele video MKV în format MP4 pentru compatibilitate mai bună și suport de streaming.',
      cs: 'Převádějte video soubory MKV na formát MP4 pro lepší kompatibilitu a podporu streamingu.'
    },
    inputFormat: 'MKV',
    outputFormat: 'MP4',
    maxFileSize: '512 MB',
    supportedFormats: ['.mkv'],
    features: [
      {
        en: 'High-quality video conversion',
        hu: 'Magas minőségű videó konverzió',
        sk: 'Vysokokvalitná video konverzia',
        de: 'Hochwertige Video-Konvertierung',
        pl: 'Wysokiej jakości konwersja wideo',
        ro: 'Conversie video de înaltă calitate',
        cs: 'Vysokokvalitní konverze videa'
      },
      {
        en: 'Multiple audio track support',
        hu: 'Több hangpálya támogatás',
        sk: 'Podpora viacerých audio stôp',
        de: 'Mehrere Audiospur-Unterstützung',
        pl: 'Obsługa wielu ścieżek audio',
        ro: 'Suport pentru mai multe piste audio',
        cs: 'Podpora více audio stop'
      },
      {
        en: 'Subtitle preservation',
        hu: 'Felirat megőrzés',
        sk: 'Zachovanie titulkov',
        de: 'Untertitel-Erhaltung',
        pl: 'Zachowanie napisów',
        ro: 'Păstrarea subtitrărilor',
        cs: 'Zachování titulků'
      }
    ]
  }

  return <ConverterPage config={converterConfig} locale={params.locale} />
}
