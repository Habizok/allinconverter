import { Metadata } from 'next'
import ConverterPage from '@/components/ConverterPage'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const titles = {
    en: 'Remove Background - AI-Powered Background Removal Tool',
    hu: 'Háttér eltávolítás - AI-alapú háttér eltávolító eszköz',
    sk: 'Odstránenie pozadia - AI-powered nástroj na odstránenie pozadia',
    de: 'Hintergrund entfernen - KI-gestütztes Hintergrund-Entfernungstool',
    pl: 'Usuń tło - Narzędzie AI do usuwania tła',
    ro: 'Eliminare fundal - Instrument AI pentru eliminarea fundalului',
    cs: 'Odstranit pozadí - AI nástroj pro odstranění pozadí'
  }

  const descriptions = {
    en: 'Remove backgrounds from images instantly with AI technology. Free online background removal tool with professional results.',
    hu: 'Távolítsd el a képek hátterét azonnal AI technológiával. Ingyenes online háttér eltávolító eszköz professzionális eredményekkel.',
    sk: 'Odstráňte pozadia z obrázkov okamžite pomocou AI technológie. Bezplatný online nástroj na odstránenie pozadia s profesionálnymi výsledkami.',
    de: 'Entfernen Sie Hintergründe von Bildern sofort mit KI-Technologie. Kostenloses Online-Hintergrund-Entfernungstool mit professionellen Ergebnissen.',
    pl: 'Usuń tła z obrazów natychmiast dzięki technologii AI. Darmowe narzędzie online do usuwania tła z profesjonalnymi wynikami.',
    ro: 'Eliminați fundalurile din imagini instant cu tehnologia AI. Instrument online gratuit pentru eliminarea fundalului cu rezultate profesionale.',
    cs: 'Odstraňte pozadí z obrázků okamžitě pomocí AI technologie. Bezplatný online nástroj pro odstranění pozadí s profesionálními výsledky.'
  }

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
  }
}

export default function RemoveBackgroundPage({ params }: Props) {
  const converterConfig = {
    id: 'remove-background',
    name: {
      en: 'Remove Background',
      hu: 'Háttér eltávolítás',
      sk: 'Odstránenie pozadia',
      de: 'Hintergrund entfernen',
      pl: 'Usuń tło',
      ro: 'Eliminare fundal',
      cs: 'Odstranit pozadí'
    },
    description: {
      en: 'Remove backgrounds from images with AI-powered precision. Perfect for product photos, portraits, and professional graphics.',
      hu: 'Távolítsd el a képek hátterét AI-alapú precizitással. Tökéletes termékfotókhoz, portrékhoz és professzionális grafikákhoz.',
      sk: 'Odstráňte pozadia z obrázkov s AI-powered presnosťou. Perfektné pre produktové fotky, portréty a profesionálnu grafiku.',
      de: 'Entfernen Sie Hintergründe von Bildern mit KI-gestützter Präzision. Perfekt für Produktfotos, Porträts und professionelle Grafiken.',
      pl: 'Usuń tła z obrazów z precyzją AI. Idealne do zdjęć produktów, portretów i profesjonalnej grafiki.',
      ro: 'Eliminați fundalurile din imagini cu precizie AI. Perfect pentru fotografiile de produse, portrete și grafică profesională.',
      cs: 'Odstraňte pozadí z obrázků s AI přesností. Perfektní pro produktové fotky, portréty a profesionální grafiku.'
    },
    inputFormat: 'Image',
    outputFormat: 'PNG',
    maxFileSize: '512 MB',
    supportedFormats: ['.jpg', '.jpeg', '.png', '.webp', '.bmp'],
    features: [
      {
        en: 'AI-powered precision',
        hu: 'AI-alapú precizitás',
        sk: 'AI-powered presnosť',
        de: 'KI-gestützte Präzision',
        pl: 'Precyzja AI',
        ro: 'Precizie AI',
        cs: 'AI přesnost'
      },
      {
        en: 'Automatic edge detection',
        hu: 'Automatikus szélfelismerés',
        sk: 'Automatická detekcia okrajov',
        de: 'Automatische Kantenerkennung',
        pl: 'Automatyczne wykrywanie krawędzi',
        ro: 'Detectare automată a marginilor',
        cs: 'Automatická detekce hran'
      },
      {
        en: 'Transparent PNG output',
        hu: 'Átlátszó PNG kimenet',
        sk: 'Priehľadný PNG výstup',
        de: 'Transparente PNG-Ausgabe',
        pl: 'Przezroczyste wyjście PNG',
        ro: 'Ieșire PNG transparentă',
        cs: 'Průhledný PNG výstup'
      }
    ]
  }

  return <ConverterPage config={converterConfig} locale={params.locale} />
}
