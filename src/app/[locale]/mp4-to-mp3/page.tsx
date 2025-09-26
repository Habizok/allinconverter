import { Metadata } from 'next'
import ConverterPage from '@/components/ConverterPage'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const titles = {
    en: 'MP4 to MP3 Converter - Extract Audio from Video Files',
    hu: 'MP4 MP3 konvertáló - Audio kinyerése videó fájlokból',
    sk: 'MP4 na MP3 konvertor - Extrakcia zvuku z video súborov',
    de: 'MP4 zu MP3 Konverter - Audio aus Videodateien extrahieren',
    pl: 'Konwerter MP4 na MP3 - Wyodrębnianie audio z plików wideo',
    ro: 'Convertor MP4 la MP3 - Extragerea audio din fișiere video',
    cs: 'Konvertor MP4 na MP3 - Extrakce zvuku z video souborů'
  }

  const descriptions = {
    en: 'Extract audio from MP4 video files and convert to MP3 format. Free online MP4 to MP3 converter with high quality output.',
    hu: 'Kinyerj audio-t MP4 videó fájlokból és konvertáld MP3 formátumba. Ingyenes online MP4 MP3 konvertáló magas minőséggel.',
    sk: 'Extrahujte zvuk z MP4 video súborov a konvertujte na MP3 formát. Bezplatný online MP4 na MP3 konvertor s vysokou kvalitou.',
    de: 'Extrahieren Sie Audio aus MP4-Videodateien und konvertieren Sie in MP3-Format. Kostenloser Online-MP4-zu-MP3-Konverter mit hoher Qualität.',
    pl: 'Wyodrębnij audio z plików wideo MP4 i konwertuj na format MP3. Darmowy online konwerter MP4 na MP3 z wysoką jakością.',
    ro: 'Extrageți audio din fișierele video MP4 și convertiți în format MP3. Convertor online gratuit MP4 la MP3 cu calitate înaltă.',
    cs: 'Extrahujte zvuk ze souborů MP4 a převeďte na formát MP3. Bezplatný online konvertor MP4 na MP3 s vysokou kvalitou.'
  }

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
  }
}

export default function Mp4ToMp3Page({ params }: Props) {
  const converterConfig = {
    id: 'mp4-to-mp3',
    name: {
      en: 'MP4 to MP3 Converter',
      hu: 'MP4 MP3 konvertáló',
      sk: 'MP4 na MP3 konvertor',
      de: 'MP4 zu MP3 Konverter',
      pl: 'Konwerter MP4 na MP3',
      ro: 'Convertor MP4 la MP3',
      cs: 'Konvertor MP4 na MP3'
    },
    description: {
      en: 'Extract high-quality audio from MP4 video files and convert to MP3 format. Perfect for creating music files from videos.',
      hu: 'Kinyerj magas minőségű audio-t MP4 videó fájlokból és konvertáld MP3 formátumba. Tökéletes zenei fájlok készítéséhez videókból.',
      sk: 'Extrahujte vysokokvalitný zvuk z MP4 video súborov a konvertujte na MP3 formát. Perfektné na vytvorenie hudobných súborov z videí.',
      de: 'Extrahieren Sie hochwertiges Audio aus MP4-Videodateien und konvertieren Sie in MP3-Format. Perfekt zum Erstellen von Musikdateien aus Videos.',
      pl: 'Wyodrębnij wysokiej jakości audio z plików wideo MP4 i konwertuj na format MP3. Idealne do tworzenia plików muzycznych z filmów.',
      ro: 'Extrageți audio de înaltă calitate din fișierele video MP4 și convertiți în format MP3. Perfect pentru crearea fișierelor muzicale din videoclipuri.',
      cs: 'Extrahujte vysoce kvalitní zvuk ze souborů MP4 a převeďte na formát MP3. Perfektní pro vytváření hudebních souborů z videí.'
    },
    inputFormat: 'MP4',
    outputFormat: 'MP3',
    maxFileSize: '512 MB',
    supportedFormats: ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm', '.mkv'],
    features: [
      {
        en: 'High-quality audio extraction',
        hu: 'Magas minőségű audio kinyerés',
        sk: 'Vysokokvalitná extrakcia zvuku',
        de: 'Hochwertige Audio-Extraktion',
        pl: 'Wyodrębnianie audio wysokiej jakości',
        ro: 'Extragere audio de înaltă calitate',
        cs: 'Vysoce kvalitní extrakce zvuku'
      },
      {
        en: 'Multiple video format support',
        hu: 'Több videó formátum támogatás',
        sk: 'Podpora viacerých video formátov',
        de: 'Unterstützung mehrerer Videoformate',
        pl: 'Obsługa wielu formatów wideo',
        ro: 'Suport pentru multiple formate video',
        cs: 'Podpora více video formátů'
      },
      {
        en: 'Fast processing with FFmpeg',
        hu: 'Gyors feldolgozás FFmpeg-gel',
        sk: 'Rýchle spracovanie s FFmpeg',
        de: 'Schnelle Verarbeitung mit FFmpeg',
        pl: 'Szybkie przetwarzanie z FFmpeg',
        ro: 'Procesare rapidă cu FFmpeg',
        cs: 'Rychlé zpracování s FFmpeg'
      }
    ]
  }

  return <ConverterPage config={converterConfig} locale={params.locale} />
}
