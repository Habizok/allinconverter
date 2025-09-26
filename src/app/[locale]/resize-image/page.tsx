import { Metadata } from 'next'
import ConverterPage from '@/components/ConverterPage'
import { generateConverterMetadata } from '@/lib/seo-converter'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const config = {
    id: 'resize-image',
    name: {
      en: 'Resize Image',
      hu: 'Kép átméretezés',
      sk: 'Zmeniť veľkosť obrázka',
      de: 'Bildgröße ändern',
      pl: 'Zmień rozmiar obrazu',
      ro: 'Redimensionați imaginea',
      cs: 'Změnit velikost obrázku'
    },
    description: {
      en: 'Resize images to specific dimensions or percentages. Maintain quality while changing size.',
      hu: 'Átméretezd a képeket meghatározott méretekre vagy százalékokra. Tartsd meg a minőséget a méret változtatása közben.',
      sk: 'Zmeňte veľkosť obrázkov na konkrétne rozmery alebo percentá. Zachovajte kvalitu pri zmene veľkosti.',
      de: 'Ändern Sie die Bildgröße auf bestimmte Dimensionen oder Prozentsätze. Behalten Sie die Qualität bei der Größenänderung bei.',
      pl: 'Zmień rozmiar obrazów na określone wymiary lub procenty. Zachowaj jakość podczas zmiany rozmiaru.',
      ro: 'Redimensionați imaginile la dimensiuni specifice sau procente. Păstrați calitatea în timpul schimbării dimensiunii.',
      cs: 'Změňte velikost obrázků na konkrétní rozměry nebo procenta. Zachovejte kvalitu při změně velikosti.'
    },
    inputFormat: 'image',
    outputFormat: 'resized'
  }

  return generateConverterMetadata(config, locale)
}

export default function ResizeImagePage({ params }: Props) {
  const converterConfig = {
    id: 'resize-image',
    name: {
      en: 'Resize Image',
      hu: 'Kép átméretezés',
      sk: 'Zmeniť veľkosť obrázka',
      de: 'Bildgröße ändern',
      pl: 'Zmień rozmiar obrazu',
      ro: 'Redimensionați imaginea',
      cs: 'Změnit velikost obrázku'
    },
    description: {
      en: 'Change image dimensions with precision. Support for pixels, percentages, and common social media sizes.',
      hu: 'Változtasd meg a kép méreteket precízióval. Támogatás pixel, százalék és közösségi média méretekhez.',
      sk: 'Zmeňte rozmery obrázka s presnosťou. Podpora pre pixely, percentá a bežné veľkosti sociálnych médií.',
      de: 'Ändern Sie Bilddimensionen mit Präzision. Unterstützung für Pixel, Prozentsätze und gängige Social-Media-Größen.',
      pl: 'Zmień wymiary obrazu z precyzją. Obsługa pikseli, procentów i popularnych rozmiarów mediów społecznościowych.',
      ro: 'Schimbați dimensiunile imaginii cu precizie. Suport pentru pixeli, procente și dimensiuni comune ale rețelelor sociale.',
      cs: 'Změňte rozměry obrázku s přesností. Podpora pro pixely, procenta a běžné velikosti sociálních médií.'
    },
    inputFormat: 'Image',
    outputFormat: 'Resized',
    maxFileSize: '512 MB',
    supportedFormats: ['.jpg', '.jpeg', '.png', '.webp', '.bmp', '.tiff'],
    features: [
      {
        en: 'Pixel-perfect resizing',
        hu: 'Pixel-tökéletes átméretezés',
        sk: 'Presné zmenenie veľkosti na pixely',
        de: 'Pixelgenaue Größenänderung',
        pl: 'Precyzyjne zmiany rozmiaru w pikselach',
        ro: 'Redimensionare perfectă pe pixeli',
        cs: 'Přesné změny velikosti na pixely'
      },
      {
        en: 'Percentage-based scaling',
        hu: 'Százalék alapú skálázás',
        sk: 'Škálovanie na základe percent',
        de: 'Prozentbasierte Skalierung',
        pl: 'Skalowanie oparte na procentach',
        ro: 'Scalare bazată pe procente',
        cs: 'Škálování založené na procentech'
      },
      {
        en: 'Social media presets',
        hu: 'Közösségi média előbeállítások',
        sk: 'Predvolené nastavenia sociálnych médií',
        de: 'Social-Media-Voreinstellungen',
        pl: 'Predefiniowane ustawienia mediów społecznościowych',
        ro: 'Setări predefinite pentru rețelele sociale',
        cs: 'Přednastavené hodnoty pro sociální média'
      },
      {
        en: 'Maintain aspect ratio',
        hu: 'Képarány megőrzése',
        sk: 'Zachovanie pomeru strán',
        de: 'Seitenverhältnis beibehalten',
        pl: 'Zachowanie proporcji',
        ro: 'Păstrarea raportului de aspect',
        cs: 'Zachování poměru stran'
      }
    ]
  }

  return <ConverterPage config={converterConfig} locale={params.locale} />
}
