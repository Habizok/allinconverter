import { Metadata } from 'next'
import ConverterPage from '@/components/ConverterPage'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const titles = {
    en: 'WAV to MP3 Converter - Convert Audio Files to MP3',
    hu: 'WAV MP3 konvertáló - Audio fájlok konvertálása MP3-ba',
    sk: 'WAV na MP3 konvertor - Konverzia audio súborov na MP3',
    de: 'WAV zu MP3 Konverter - Audiodateien in MP3 konvertieren',
    pl: 'Konwerter WAV na MP3 - Konwersja plików audio na MP3',
    ro: 'Convertor WAV la MP3 - Conversie fișiere audio în MP3',
    cs: 'Konvertor WAV na MP3 - Konverze audio souborů na MP3'
  }

  const descriptions = {
    en: 'Convert WAV audio files to MP3 format with customizable bitrate. Free online WAV to MP3 converter with high quality compression.',
    hu: 'Konvertálj WAV audio fájlokat MP3 formátumba testreszabható bitrátával. Ingyenes online WAV MP3 konvertáló magas minőségű tömörítéssel.',
    sk: 'Konvertujte WAV audio súbory na MP3 formát s prispôsobiteľnou bitovou rýchlosťou. Bezplatný online WAV na MP3 konvertor s vysokokvalitnou kompresiou.',
    de: 'Konvertieren Sie WAV-Audiodateien in MP3-Format mit anpassbarer Bitrate. Kostenloser Online-WAV-zu-MP3-Konverter mit hochwertiger Komprimierung.',
    pl: 'Konwertuj pliki audio WAV na format MP3 z konfigurowalną przepływnością. Darmowy online konwerter WAV na MP3 z wysokiej jakości kompresją.',
    ro: 'Convertește fișiere audio WAV în format MP3 cu rată de biți personalizabilă. Convertor online gratuit WAV la MP3 cu comprimare de înaltă calitate.',
    cs: 'Převeďte audio soubory WAV na formát MP3 s přizpůsobitelnou bitovou rychlostí. Bezplatný online konvertor WAV na MP3 s vysokokvalitní kompresí.'
  }

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
  }
}

export default function WavToMp3Page({ params }: Props) {
  const converterConfig = {
    id: 'wav-to-mp3',
    name: {
      en: 'WAV to MP3 Converter',
      hu: 'WAV MP3 konvertáló',
      sk: 'WAV na MP3 konvertor',
      de: 'WAV zu MP3 Konverter',
      pl: 'Konwerter WAV na MP3',
      ro: 'Convertor WAV la MP3',
      cs: 'Konvertor WAV na MP3'
    },
    description: {
      en: 'Convert high-quality WAV audio files to compressed MP3 format. Perfect for reducing file sizes while maintaining good audio quality.',
      hu: 'Konvertálj magas minőségű WAV audio fájlokat tömörített MP3 formátumba. Tökéletes fájlméret csökkentéshez jó audio minőség megőrzésével.',
      sk: 'Konvertujte vysokokvalitné WAV audio súbory na komprimovaný MP3 formát. Perfektné na zníženie veľkosti súborov pri zachovaní dobrej audio kvality.',
      de: 'Konvertieren Sie hochwertige WAV-Audiodateien in komprimiertes MP3-Format. Perfekt zur Reduzierung der Dateigröße bei Beibehaltung guter Audioqualität.',
      pl: 'Konwertuj wysokiej jakości pliki audio WAV na skompresowany format MP3. Idealne do zmniejszania rozmiaru plików przy zachowaniu dobrej jakości audio.',
      ro: 'Convertește fișiere audio WAV de înaltă calitate în format MP3 comprimat. Perfect pentru reducerea dimensiunii fișierelor păstrând calitatea audio bună.',
      cs: 'Převeďte vysoce kvalitní audio soubory WAV na komprimovaný formát MP3. Perfektní pro snížení velikosti souborů při zachování dobré audio kvality.'
    },
    inputFormat: 'WAV',
    outputFormat: 'MP3',
    maxFileSize: '512 MB',
    supportedFormats: ['.wav'],
    features: [
      {
        en: 'Customizable bitrate',
        hu: 'Testreszabható bitráta',
        sk: 'Prispôsobiteľná bitová rýchlosť',
        de: 'Anpassbare Bitrate',
        pl: 'Konfigurowalna przepływność',
        ro: 'Rată de biți personalizabilă',
        cs: 'Přizpůsobitelná bitová rychlost'
      },
      {
        en: 'Lossless to lossy conversion',
        hu: 'Veszteségmentes veszteséges konverzió',
        sk: 'Konverzia z bezztrátového na strátový',
        de: 'Verlustfreie zu verlustbehaftete Konvertierung',
        pl: 'Konwersja z bezstratnej na stratną',
        ro: 'Conversie de la fără pierderi la cu pierderi',
        cs: 'Konverze z bezztrátové na ztrátové'
      },
      {
        en: 'Professional audio processing',
        hu: 'Professzionális audio feldolgozás',
        sk: 'Profesionálne spracovanie zvuku',
        de: 'Professionelle Audioverarbeitung',
        pl: 'Profesjonalne przetwarzanie audio',
        ro: 'Procesare audio profesională',
        cs: 'Profesionální zpracování zvuku'
      }
    ]
  }

  return <ConverterPage config={converterConfig} locale={params.locale} />
}
