import { Metadata } from 'next'
import ConverterPage from '@/components/ConverterPage'
import { generateConverterMetadata } from '@/lib/seo-converter'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const config = {
    id: 'avi-to-mp4',
    name: {
      en: 'AVI to MP4 Converter',
      hu: 'AVI MP4 konvertáló',
      sk: 'AVI na MP4 konvertor',
      de: 'AVI zu MP4 Konverter',
      pl: 'Konwerter AVI na MP4',
      ro: 'Convertor AVI la MP4',
      cs: 'Konvertor AVI na MP4'
    },
    description: {
      en: 'Convert AVI files to MP4 format instantly. Free online AVI to MP4 converter. No registration required.',
      hu: 'Konvertálj AVI fájlokat MP4 formátumba azonnal. Ingyenes online AVI MP4 konvertáló. Regisztráció nélkül.',
      sk: 'Konvertujte AVI súbory na MP4 formát okamžite. Bezplatný online AVI na MP4 konvertor. Bez registrácie.',
      de: 'Konvertieren Sie AVI-Dateien sofort in MP4-Format. Kostenloser Online-AVI-zu-MP4-Konverter. Keine Registrierung erforderlich.',
      pl: 'Konwertuj pliki AVI na format MP4 natychmiast. Darmowy online konwerter AVI na MP4. Bez rejestracji.',
      ro: 'Convertește fișierele AVI în format MP4 instant. Convertor online gratuit AVI la MP4. Fără înregistrare.',
      cs: 'Převádějte soubory AVI na formát MP4 okamžitě. Bezplatný online konvertor AVI na MP4. Bez registrace.'
    },
    inputFormat: 'avi',
    outputFormat: 'mp4'
  }

  return generateConverterMetadata(config, locale)
}

export default function AviToMp4Page({ params }: Props) {
  const converterConfig = {
    id: 'avi-to-mp4',
    name: {
      en: 'AVI to MP4 Converter',
      hu: 'AVI MP4 konvertáló',
      sk: 'AVI na MP4 konvertor',
      de: 'AVI zu MP4 Konverter',
      pl: 'Konwerter AVI na MP4',
      ro: 'Convertor AVI la MP4',
      cs: 'Konvertor AVI na MP4'
    },
    description: {
      en: 'Convert AVI video files to MP4 format for better compatibility and modern playback support.',
      hu: 'Konvertálj AVI videófájlokat MP4 formátumba jobb kompatibilitás és modern lejátszási támogatás érdekében.',
      sk: 'Konvertujte AVI video súbory na MP4 formát pre lepšiu kompatibilitu a modernú podporu prehrávania.',
      de: 'Konvertieren Sie AVI-Videodateien in MP4-Format für bessere Kompatibilität und moderne Wiedergabeunterstützung.',
      pl: 'Konwertuj pliki wideo AVI na format MP4 dla lepszej kompatybilności i nowoczesnego wsparcia odtwarzania.',
      ro: 'Convertește fișierele video AVI în format MP4 pentru compatibilitate mai bună și suport modern de redare.',
      cs: 'Převádějte video soubory AVI na formát MP4 pro lepší kompatibilitu a moderní podporu přehrávání.'
    },
    inputFormat: 'AVI',
    outputFormat: 'MP4',
    maxFileSize: '512 MB',
    supportedFormats: ['.avi'],
    features: [
      {
        en: 'Modern format conversion',
        hu: 'Modern formátum konverzió',
        sk: 'Konverzia moderného formátu',
        de: 'Moderne Format-Konvertierung',
        pl: 'Konwersja nowoczesnego formatu',
        ro: 'Conversie format modern',
        cs: 'Konverze moderního formátu'
      },
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
        en: 'Universal playback support',
        hu: 'Univerzális lejátszási támogatás',
        sk: 'Univerzálna podpora prehrávania',
        de: 'Universelle Wiedergabeunterstützung',
        pl: 'Uniwersalne wsparcie odtwarzania',
        ro: 'Suport universal de redare',
        cs: 'Univerzální podpora přehrávání'
      }
    ]
  }

  return <ConverterPage config={converterConfig} locale={params.locale} />
}
