import { Metadata } from 'next'
import ConverterPage from '@/components/ConverterPage'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const titles = {
    en: 'MOV to MP4 Converter - Convert QuickTime to MP4',
    hu: 'MOV MP4 konvertáló - QuickTime konvertálása MP4-be',
    sk: 'MOV na MP4 konvertor - Konverzia QuickTime na MP4',
    de: 'MOV zu MP4 Konverter - QuickTime in MP4 konvertieren',
    pl: 'Konwerter MOV na MP4 - Konwersja QuickTime na MP4',
    ro: 'Convertor MOV la MP4 - Conversie QuickTime în MP4',
    cs: 'Konvertor MOV na MP4 - Konverze QuickTime na MP4'
  }

  const descriptions = {
    en: 'Convert MOV QuickTime videos to MP4 format for better compatibility. Free online MOV to MP4 converter with high quality preservation.',
    hu: 'Konvertálj MOV QuickTime videókat MP4 formátumba jobb kompatibilitásért. Ingyenes online MOV MP4 konvertáló magas minőség megőrzésével.',
    sk: 'Konvertujte MOV QuickTime videá na MP4 formát pre lepšiu kompatibilitu. Bezplatný online MOV na MP4 konvertor s zachovaním vysokej kvality.',
    de: 'Konvertieren Sie MOV QuickTime-Videos in MP4-Format für bessere Kompatibilität. Kostenloser Online-MOV-zu-MP4-Konverter mit hoher Qualitätserhaltung.',
    pl: 'Konwertuj filmy MOV QuickTime na format MP4 dla lepszej kompatybilności. Darmowy online konwerter MOV na MP4 z zachowaniem wysokiej jakości.',
    ro: 'Convertește videoclipuri MOV QuickTime în format MP4 pentru compatibilitate mai bună. Convertor online gratuit MOV la MP4 cu păstrarea calității înalte.',
    cs: 'Převeďte MOV QuickTime videa na formát MP4 pro lepší kompatibilitu. Bezplatný online konvertor MOV na MP4 s zachováním vysoké kvality.'
  }

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
  }
}

export default function MovToMp4Page({ params }: Props) {
  const converterConfig = {
    id: 'mov-to-mp4',
    name: {
      en: 'MOV to MP4 Converter',
      hu: 'MOV MP4 konvertáló',
      sk: 'MOV na MP4 konvertor',
      de: 'MOV zu MP4 Konverter',
      pl: 'Konwerter MOV na MP4',
      ro: 'Convertor MOV la MP4',
      cs: 'Konvertor MOV na MP4'
    },
    description: {
      en: 'Convert MOV QuickTime videos to universal MP4 format. Perfect for sharing videos on social media, websites, or any device.',
      hu: 'Konvertálj MOV QuickTime videókat univerzális MP4 formátumba. Tökéletes videók megosztásához közösségi médiában, weboldalakon vagy bármilyen eszközön.',
      sk: 'Konvertujte MOV QuickTime videá na univerzálny MP4 formát. Perfektné na zdieľanie videí na sociálnych sieťach, webových stránkach alebo akomkoľvek zariadení.',
      de: 'Konvertieren Sie MOV QuickTime-Videos in universelles MP4-Format. Perfekt zum Teilen von Videos in sozialen Medien, auf Websites oder auf jedem Gerät.',
      pl: 'Konwertuj filmy MOV QuickTime na uniwersalny format MP4. Idealne do udostępniania filmów w mediach społecznościowych, na stronach internetowych lub na dowolnym urządzeniu.',
      ro: 'Convertește videoclipuri MOV QuickTime în format universal MP4. Perfect pentru partajarea videoclipurilor pe rețelele sociale, site-uri web sau orice dispozitiv.',
      cs: 'Převeďte MOV QuickTime videa na univerzální formát MP4. Perfektní pro sdílení videí na sociálních sítích, webových stránkách nebo jakémkoli zařízení.'
    },
    inputFormat: 'MOV',
    outputFormat: 'MP4',
    maxFileSize: '512 MB',
    supportedFormats: ['.mov'],
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
        hu: 'Minőség megőrzése',
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
