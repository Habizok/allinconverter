import { Metadata } from 'next'
import ConverterPage from '@/components/ConverterPage'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const titles = {
    en: 'SRT to VTT Converter - Convert Subtitle Files',
    hu: 'SRT VTT konvertáló - Felirat fájlok konvertálása',
    sk: 'SRT na VTT konvertor - Konverzia súborov titulkov',
    de: 'SRT zu VTT Konverter - Untertitel-Dateien konvertieren',
    pl: 'Konwerter SRT na VTT - Konwersja plików napisów',
    ro: 'Convertor SRT la VTT - Conversie fișiere subtitrări',
    cs: 'Konvertor SRT na VTT - Konverze souborů titulků'
  }

  const descriptions = {
    en: 'Convert SRT subtitle files to VTT format for web video players. Free online SRT to VTT converter with timing preservation.',
    hu: 'Konvertálj SRT felirat fájlokat VTT formátumba webes videó lejátszókhoz. Ingyenes online SRT VTT konvertáló időzítés megőrzésével.',
    sk: 'Konvertujte SRT súbory titulkov na VTT formát pre webové video prehrávače. Bezplatný online SRT na VTT konvertor s zachovaním časovania.',
    de: 'Konvertieren Sie SRT-Untertitel-Dateien in VTT-Format für Web-Video-Player. Kostenloser Online-SRT-zu-VTT-Konverter mit Zeiterhaltung.',
    pl: 'Konwertuj pliki napisów SRT na format VTT dla odtwarzaczy wideo internetowych. Darmowy online konwerter SRT na VTT z zachowaniem synchronizacji.',
    ro: 'Convertește fișierele de subtitrări SRT în format VTT pentru playerele video web. Convertor online gratuit SRT la VTT cu păstrarea sincronizării.',
    cs: 'Převeďte soubory titulků SRT na formát VTT pro webové video přehrávače. Bezplatný online konvertor SRT na VTT se zachováním časování.'
  }

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
  }
}

export default function SrtToVttPage({ params }: Props) {
  const converterConfig = {
    id: 'srt-to-vtt',
    name: {
      en: 'SRT to VTT Converter',
      hu: 'SRT VTT konvertáló',
      sk: 'SRT na VTT konvertor',
      de: 'SRT zu VTT Konverter',
      pl: 'Konwerter SRT na VTT',
      ro: 'Convertor SRT la VTT',
      cs: 'Konvertor SRT na VTT'
    },
    description: {
      en: 'Convert SRT subtitle files to VTT format for modern web video players. Perfect for HTML5 video compatibility and web streaming.',
      hu: 'Konvertálj SRT felirat fájlokat VTT formátumba modern webes videó lejátszókhoz. Tökéletes HTML5 videó kompatibilitáshoz és webes streameléshez.',
      sk: 'Konvertujte SRT súbory titulkov na VTT formát pre moderné webové video prehrávače. Perfektné pre HTML5 video kompatibilitu a webové streamovanie.',
      de: 'Konvertieren Sie SRT-Untertitel-Dateien in VTT-Format für moderne Web-Video-Player. Perfekt für HTML5-Video-Kompatibilität und Web-Streaming.',
      pl: 'Konwertuj pliki napisów SRT na format VTT dla nowoczesnych odtwarzaczy wideo internetowych. Idealne do kompatybilności z HTML5 video i streamingu internetowego.',
      ro: 'Convertește fișierele de subtitrări SRT în format VTT pentru playerele video web moderne. Perfect pentru compatibilitatea cu HTML5 video și streaming web.',
      cs: 'Převeďte soubory titulků SRT na formát VTT pro moderní webové video přehrávače. Perfektní pro kompatibilitu s HTML5 video a webovým streamováním.'
    },
    inputFormat: 'SRT',
    outputFormat: 'VTT',
    maxFileSize: '512 MB',
    supportedFormats: ['.srt'],
    features: [
      {
        en: 'HTML5 video compatibility',
        hu: 'HTML5 videó kompatibilitás',
        sk: 'HTML5 video kompatibilita',
        de: 'HTML5-Video-Kompatibilität',
        pl: 'Kompatybilność z HTML5 video',
        ro: 'Compatibilitate HTML5 video',
        cs: 'Kompatibilita s HTML5 video'
      },
      {
        en: 'Precise timing preservation',
        hu: 'Pontos időzítés megőrzése',
        sk: 'Presné zachovanie časovania',
        de: 'Präzise Zeiterhaltung',
        pl: 'Precyzyjne zachowanie synchronizacji',
        ro: 'Păstrarea precisă a sincronizării',
        cs: 'Přesné zachování časování'
      },
      {
        en: 'Web streaming optimized',
        hu: 'Webes streamelés optimalizált',
        sk: 'Optimalizované pre web streamovanie',
        de: 'Web-Streaming optimiert',
        pl: 'Zoptymalizowane pod streaming internetowy',
        ro: 'Optimizat pentru streaming web',
        cs: 'Optimalizováno pro webové streamování'
      }
    ]
  }

  return <ConverterPage config={converterConfig} locale={params.locale} />
}
