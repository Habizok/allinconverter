import { Metadata } from 'next'
import ConverterPage from '@/components/ConverterPage'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const titles = {
    en: 'Image Upscaler - AI-Powered Image Enhancement',
    hu: 'Kép felbontás növelő - AI-alapú kép javítás',
    sk: 'Zvýšenie rozlíšenia obrázka - AI-powered vylepšenie obrázka',
    de: 'Bild-Upscaler - KI-gestützte Bildverbesserung',
    pl: 'Upscaler obrazów - Ulepszanie obrazów AI',
    ro: 'Upscaler imagini - Îmbunătățire imagini AI',
    cs: 'Upscaler obrázků - AI vylepšení obrázků'
  }

  const descriptions = {
    en: 'Enhance image quality and resolution with AI technology. Free online image upscaler with professional results up to 4x resolution.',
    hu: 'Javítsd a kép minőségét és felbontását AI technológiával. Ingyenes online kép felbontás növelő professzionális eredményekkel 4x felbontásig.',
    sk: 'Vylepšite kvalitu a rozlíšenie obrázka pomocou AI technológie. Bezplatný online upscaler obrázkov s profesionálnymi výsledkami až do 4x rozlíšenia.',
    de: 'Verbessern Sie Bildqualität und Auflösung mit KI-Technologie. Kostenloser Online-Bild-Upscaler mit professionellen Ergebnissen bis zu 4x Auflösung.',
    pl: 'Ulepsz jakość i rozdzielczość obrazów dzięki technologii AI. Darmowy online upscaler obrazów z profesjonalnymi wynikami do 4x rozdzielczości.',
    ro: 'Îmbunătățiți calitatea și rezoluția imaginilor cu tehnologia AI. Upscaler online gratuit pentru imagini cu rezultate profesionale până la 4x rezoluție.',
    cs: 'Vylepšete kvalitu a rozlišení obrázků pomocí AI technologie. Bezplatný online upscaler obrázků s profesionálními výsledky až do 4x rozlišení.'
  }

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
  }
}

export default function ImageUpscalerPage({ params }: Props) {
  const converterConfig = {
    id: 'image-upscaler',
    name: {
      en: 'Image Upscaler',
      hu: 'Kép felbontás növelő',
      sk: 'Zvýšenie rozlíšenia obrázka',
      de: 'Bild-Upscaler',
      pl: 'Upscaler obrazów',
      ro: 'Upscaler imagini',
      cs: 'Upscaler obrázků'
    },
    description: {
      en: 'Enhance image quality and resolution using advanced AI algorithms. Perfect for enlarging photos, artwork, and graphics without quality loss.',
      hu: 'Javítsd a kép minőségét és felbontását fejlett AI algoritmusokkal. Tökéletes fotók, műalkotások és grafikák nagyításához minőségvesztés nélkül.',
      sk: 'Vylepšite kvalitu a rozlíšenie obrázka pomocou pokročilých AI algoritmov. Perfektné na zväčšenie fotiek, umeleckých diel a grafiky bez straty kvality.',
      de: 'Verbessern Sie Bildqualität und Auflösung mit fortschrittlichen KI-Algorithmen. Perfekt zum Vergrößern von Fotos, Kunstwerken und Grafiken ohne Qualitätsverlust.',
      pl: 'Ulepsz jakość i rozdzielczość obrazów za pomocą zaawansowanych algorytmów AI. Idealne do powiększania zdjęć, dzieł sztuki i grafiki bez utraty jakości.',
      ro: 'Îmbunătățiți calitatea și rezoluția imaginilor folosind algoritmi AI avansați. Perfect pentru mărirea fotografiilor, operelor de artă și graficii fără pierderea calității.',
      cs: 'Vylepšete kvalitu a rozlišení obrázků pomocí pokročilých AI algoritmů. Perfektní pro zvětšení fotografií, uměleckých děl a grafiky bez ztráty kvality.'
    },
    inputFormat: 'Image',
    outputFormat: 'Enhanced Image',
    maxFileSize: '512 MB',
    supportedFormats: ['.jpg', '.jpeg', '.png', '.webp', '.bmp'],
    features: [
      {
        en: 'Up to 4x resolution increase',
        hu: 'Akár 4x felbontás növelés',
        sk: 'Až 4x zvýšenie rozlíšenia',
        de: 'Bis zu 4x Auflösungssteigerung',
        pl: 'Do 4x zwiększenie rozdzielczości',
        ro: 'Până la 4x creștere rezoluție',
        cs: 'Až 4x zvýšení rozlišení'
      },
      {
        en: 'AI-powered enhancement',
        hu: 'AI-alapú javítás',
        sk: 'AI-powered vylepšenie',
        de: 'KI-gestützte Verbesserung',
        pl: 'Ulepszanie AI',
        ro: 'Îmbunătățire AI',
        cs: 'AI vylepšení'
      },
      {
        en: 'Preserves image details',
        hu: 'Megőrzi a kép részleteket',
        sk: 'Zachováva detaily obrázka',
        de: 'Bewahrt Bilddetails',
        pl: 'Zachowuje szczegóły obrazu',
        ro: 'Păstrează detaliile imaginii',
        cs: 'Zachovává detaily obrázku'
      }
    ]
  }

  return <ConverterPage config={converterConfig} locale={params.locale} />
}
