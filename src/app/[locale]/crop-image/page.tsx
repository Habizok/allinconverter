import { Metadata } from 'next'
import ConverterPage from '@/components/ConverterPage'
import { generateConverterMetadata } from '@/lib/seo-converter'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const config = {
    id: 'crop-image',
    name: {
      en: 'Crop Image',
      hu: 'Kép vágás',
      sk: 'Orezať obrázok',
      de: 'Bild zuschneiden',
      pl: 'Przytnij obraz',
      ro: 'Decupați imaginea',
      cs: 'Oříznout obrázek'
    },
    description: {
      en: 'Crop images to remove unwanted parts or focus on specific areas. Precise cropping with aspect ratio control.',
      hu: 'Vágd ki a képeket a nemkívánatos részek eltávolítására vagy meghatározott területek kiemelésére. Precíz vágás képarány vezérléssel.',
      sk: 'Orežte obrázky na odstránenie nežiaducich častí alebo zameranie na konkrétne oblasti. Presné orezanie s ovládaním pomeru strán.',
      de: 'Schneiden Sie Bilder zu, um unerwünschte Teile zu entfernen oder sich auf bestimmte Bereiche zu konzentrieren. Präzises Zuschneiden mit Seitenverhältnis-Kontrolle.',
      pl: 'Przytnij obrazy, aby usunąć niechciane części lub skupić się na określonych obszarach. Precyzyjne przycinanie z kontrolą proporcji.',
      ro: 'Decupați imaginile pentru a elimina părțile nedorite sau pentru a vă concentra pe zone specifice. Decupare precisă cu controlul raportului de aspect.',
      cs: 'Ořízněte obrázky pro odstranění nežádoucích částí nebo zaměření na konkrétní oblasti. Přesné oříznutí s ovládáním poměru stran.'
    },
    inputFormat: 'image',
    outputFormat: 'cropped'
  }

  return generateConverterMetadata(config, locale)
}

export default function CropImagePage({ params }: Props) {
  const converterConfig = {
    id: 'crop-image',
    name: {
      en: 'Crop Image',
      hu: 'Kép vágás',
      sk: 'Orezať obrázok',
      de: 'Bild zuschneiden',
      pl: 'Przytnij obraz',
      ro: 'Decupați imaginea',
      cs: 'Oříznout obrázek'
    },
    description: {
      en: 'Precisely crop your images with interactive tools. Maintain aspect ratios or crop freely.',
      hu: 'Vágd ki pontosan a képeidet interaktív eszközökkel. Tartsd meg a képarányokat vagy vágj szabadon.',
      sk: 'Presne orežte svoje obrázky pomocou interaktívnych nástrojov. Zachovajte pomery strán alebo orežte voľne.',
      de: 'Schneiden Sie Ihre Bilder präzise mit interaktiven Tools zu. Behalten Sie Seitenverhältnisse bei oder schneiden Sie frei.',
      pl: 'Precyzyjnie przytnij swoje obrazy za pomocą interaktywnych narzędzi. Zachowaj proporcje lub przytnij swobodnie.',
      ro: 'Decupați precis imaginile cu instrumente interactive. Păstrați rapoartele de aspect sau decupați liber.',
      cs: 'Přesně ořízněte své obrázky pomocí interaktivních nástrojů. Zachovejte poměry stran nebo ořízněte volně.'
    },
    inputFormat: 'Image',
    outputFormat: 'Cropped',
    maxFileSize: '512 MB',
    supportedFormats: ['.jpg', '.jpeg', '.png', '.webp', '.bmp', '.tiff'],
    features: [
      {
        en: 'Interactive crop selection',
        hu: 'Interaktív vágási kijelölés',
        sk: 'Interaktívny výber orezania',
        de: 'Interaktive Zuschnitt-Auswahl',
        pl: 'Interaktywny wybór przycinania',
        ro: 'Selecție interactivă de decupare',
        cs: 'Interaktivní výběr oříznutí'
      },
      {
        en: 'Aspect ratio presets',
        hu: 'Képarány előbeállítások',
        sk: 'Predvolené pomery strán',
        de: 'Seitenverhältnis-Voreinstellungen',
        pl: 'Predefiniowane proporcje',
        ro: 'Rapoarte de aspect predefinite',
        cs: 'Přednastavené poměry stran'
      },
      {
        en: 'Free-form cropping',
        hu: 'Szabad formájú vágás',
        sk: 'Voľné orezanie',
        de: 'Freiform-Zuschnitt',
        pl: 'Swobodne przycinanie',
        ro: 'Decupare în formă liberă',
        cs: 'Volné oříznutí'
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
