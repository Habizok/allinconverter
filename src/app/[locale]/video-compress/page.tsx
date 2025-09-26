import { Metadata } from 'next'
import ConverterPage from '@/components/ConverterPage'
import { generateConverterMetadata } from '@/lib/seo-converter'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const config = {
    id: 'video-compress',
    name: {
      en: 'Video Compressor',
      hu: 'Video tömörítő',
      sk: 'Kompresor videí',
      de: 'Videokomprimierer',
      pl: 'Kompresor wideo',
      ro: 'Compresor video',
      cs: 'Kompresor videí'
    },
    description: {
      en: 'Compress video files to reduce size while maintaining quality. Support for MP4, AVI, MOV formats.',
      hu: 'Tömörítsd a videófájlokat a méret csökkentésére minőség megtartása mellett. MP4, AVI, MOV formátumok támogatása.',
      sk: 'Komprimujte video súbory na zníženie veľkosti pri zachovaní kvality. Podpora pre MP4, AVI, MOV formáty.',
      de: 'Komprimieren Sie Videodateien, um die Größe zu reduzieren und dabei die Qualität zu erhalten. Unterstützung für MP4, AVI, MOV Formate.',
      pl: 'Kompresuj pliki wideo, aby zmniejszyć rozmiar przy zachowaniu jakości. Obsługa formatów MP4, AVI, MOV.',
      ro: 'Comprimați fișierele video pentru a reduce dimensiunea păstrând calitatea. Suport pentru formate MP4, AVI, MOV.',
      cs: 'Komprimujte video soubory pro snížení velikosti při zachování kvality. Podpora pro MP4, AVI, MOV formáty.'
    },
    inputFormat: 'video',
    outputFormat: 'compressed'
  }

  return generateConverterMetadata(config, locale)
}

export default function VideoCompressPage({ params }: Props) {
  const converterConfig = {
    id: 'video-compress',
    name: {
      en: 'Video Compressor',
      hu: 'Video tömörítő',
      sk: 'Kompresor videí',
      de: 'Videokomprimierer',
      pl: 'Kompresor wideo',
      ro: 'Compresor video',
      cs: 'Kompresor videí'
    },
    description: {
      en: 'Reduce video file size without losing quality. Perfect for sharing and storage optimization.',
      hu: 'Csökkentsd a videófájl méretét minőségvesztés nélkül. Tökéletes megosztáshoz és tárhely optimalizáláshoz.',
      sk: 'Znížte veľkosť súboru videa bez straty kvality. Perfektné pre zdieľanie a optimalizáciu úložiska.',
      de: 'Reduzieren Sie die Videodateigröße ohne Qualitätsverlust. Perfekt für das Teilen und die Speicheroptimierung.',
      pl: 'Zmniejsz rozmiar pliku wideo bez utraty jakości. Idealne do udostępniania i optymalizacji przechowywania.',
      ro: 'Reduceți dimensiunea fișierului video fără pierderea calității. Perfect pentru partajare și optimizarea stocării.',
      cs: 'Snižte velikost souboru videa bez ztráty kvality. Perfektní pro sdílení a optimalizaci úložiště.'
    },
    inputFormat: 'Video',
    outputFormat: 'Compressed',
    maxFileSize: '512 MB',
    supportedFormats: ['.mp4', '.avi', '.mov', '.mkv', '.webm', '.flv'],
    features: [
      {
        en: 'Advanced compression settings',
        hu: 'Fejlett tömörítési beállítások',
        sk: 'Pokročilé nastavenia kompresie',
        de: 'Erweiterte Komprimierungseinstellungen',
        pl: 'Zaawansowane ustawienia kompresji',
        ro: 'Setări avansate de compresie',
        cs: 'Pokročilá nastavení komprese'
      },
      {
        en: 'Bitrate and quality control',
        hu: 'Bitráta és minőség vezérlés',
        sk: 'Ovládanie bitrate a kvality',
        de: 'Bitrate- und Qualitätskontrolle',
        pl: 'Kontrola bitrate i jakości',
        ro: 'Control bitrate și calitate',
        cs: 'Ovládání bitrate a kvality'
      },
      {
        en: 'Resolution optimization',
        hu: 'Felbontás optimalizálás',
        sk: 'Optimalizácia rozlíšenia',
        de: 'Auflösungsoptimierung',
        pl: 'Optymalizacja rozdzielczości',
        ro: 'Optimizare rezoluție',
        cs: 'Optimalizace rozlišení'
      },
      {
        en: 'Fast processing with progress',
        hu: 'Gyors feldolgozás folyamattal',
        sk: 'Rýchle spracovanie s pokrokom',
        de: 'Schnelle Verarbeitung mit Fortschritt',
        pl: 'Szybkie przetwarzanie z postępem',
        ro: 'Procesare rapidă cu progres',
        cs: 'Rychlé zpracování s pokrokem'
      }
    ]
  }

  return <ConverterPage config={converterConfig} locale={params.locale} />
}
