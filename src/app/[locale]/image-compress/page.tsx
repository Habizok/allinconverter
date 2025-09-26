import { Metadata } from 'next'
import ConverterPage from '@/components/ConverterPage'
import { generateConverterMetadata } from '@/lib/seo-converter'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const config = {
    id: 'image-compress',
    name: {
      en: 'Image Compressor',
      hu: 'Kép tömörítő',
      sk: 'Kompresor obrázkov',
      de: 'Bildkomprimierer',
      pl: 'Kompresor obrazów',
      ro: 'Compresor imagini',
      cs: 'Kompresor obrázků'
    },
    description: {
      en: 'Compress images to reduce file size while maintaining quality. Support for JPG, PNG, WebP formats.',
      hu: 'Tömörítsd a képeket a fájlméret csökkentésére minőség megtartása mellett. JPG, PNG, WebP formátumok támogatása.',
      sk: 'Komprimujte obrázky na zníženie veľkosti súboru pri zachovaní kvality. Podpora pre JPG, PNG, WebP formáty.',
      de: 'Komprimieren Sie Bilder, um die Dateigröße zu reduzieren und dabei die Qualität zu erhalten. Unterstützung für JPG, PNG, WebP Formate.',
      pl: 'Kompresuj obrazy, aby zmniejszyć rozmiar pliku przy zachowaniu jakości. Obsługa formatów JPG, PNG, WebP.',
      ro: 'Comprimați imaginile pentru a reduce dimensiunea fișierului păstrând calitatea. Suport pentru formate JPG, PNG, WebP.',
      cs: 'Komprimujte obrázky pro snížení velikosti souboru při zachování kvality. Podpora pro JPG, PNG, WebP formáty.'
    },
    inputFormat: 'image',
    outputFormat: 'compressed'
  }

  return generateConverterMetadata(config, locale)
}

export default function ImageCompressPage({ params }: Props) {
  const converterConfig = {
    id: 'image-compress',
    name: {
      en: 'Image Compressor',
      hu: 'Kép tömörítő',
      sk: 'Kompresor obrázkov',
      de: 'Bildkomprimierer',
      pl: 'Kompresor obrazów',
      ro: 'Compresor imagini',
      cs: 'Kompresor obrázků'
    },
    description: {
      en: 'Reduce image file size without losing quality. Perfect for web optimization and faster loading.',
      hu: 'Csökkentsd a képfájl méretét minőségvesztés nélkül. Tökéletes webes optimalizáláshoz és gyorsabb betöltéshez.',
      sk: 'Znížte veľkosť súboru obrázka bez straty kvality. Perfektné pre webovú optimalizáciu a rýchlejšie načítanie.',
      de: 'Reduzieren Sie die Bilddateigröße ohne Qualitätsverlust. Perfekt für Web-Optimierung und schnellere Ladezeiten.',
      pl: 'Zmniejsz rozmiar pliku obrazu bez utraty jakości. Idealne do optymalizacji internetowej i szybszego ładowania.',
      ro: 'Reduceți dimensiunea fișierului imagine fără pierderea calității. Perfect pentru optimizarea web și încărcare mai rapidă.',
      cs: 'Snižte velikost souboru obrázku bez ztráty kvality. Perfektní pro webovou optimalizaci a rychlejší načítání.'
    },
    inputFormat: 'Image',
    outputFormat: 'Compressed',
    maxFileSize: '512 MB',
    supportedFormats: ['.jpg', '.jpeg', '.png', '.webp', '.bmp', '.tiff'],
    features: [
      {
        en: 'Smart compression algorithm',
        hu: 'Okos tömörítési algoritmus',
        sk: 'Inteligentný kompresný algoritmus',
        de: 'Intelligenter Komprimierungsalgorithmus',
        pl: 'Inteligentny algorytm kompresji',
        ro: 'Algoritm inteligent de compresie',
        cs: 'Inteligentní kompresní algoritmus'
      },
      {
        en: 'Quality slider control',
        hu: 'Minőség csúszka vezérlés',
        sk: 'Ovládanie posuvníka kvality',
        de: 'Qualitätsregler-Steuerung',
        pl: 'Kontrola suwaka jakości',
        ro: 'Control cursor calitate',
        cs: 'Ovládání posuvníku kvality'
      },
      {
        en: 'Batch processing support',
        hu: 'Kötegelt feldolgozás támogatás',
        sk: 'Podpora dávkového spracovania',
        de: 'Batch-Verarbeitungsunterstützung',
        pl: 'Obsługa przetwarzania wsadowego',
        ro: 'Suport procesare în lot',
        cs: 'Podpora dávkového zpracování'
      },
      {
        en: 'Preview before download',
        hu: 'Előnézet letöltés előtt',
        sk: 'Náhľad pred stiahnutím',
        de: 'Vorschau vor dem Download',
        pl: 'Podgląd przed pobraniem',
        ro: 'Previzualizare înainte de descărcare',
        cs: 'Náhled před stažením'
      }
    ]
  }

  return <ConverterPage config={converterConfig} locale={params.locale} />
}
