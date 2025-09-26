import { Metadata } from 'next'
import ConverterPage from '@/components/ConverterPage'
import { generateConverterMetadata } from '@/lib/seo-converter'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const config = {
    id: 'add-watermark',
    name: {
      en: 'Add Watermark',
      hu: 'Vízjel hozzáadás',
      sk: 'Pridať vodoznak',
      de: 'Wasserzeichen hinzufügen',
      pl: 'Dodaj znak wodny',
      ro: 'Adăugați filigran',
      cs: 'Přidat vodoznak'
    },
    description: {
      en: 'Add text or image watermarks to your images. Protect your content with customizable watermarks.',
      hu: 'Adj hozzá szöveges vagy képes vízjeleket a képeidhez. Védd meg a tartalmad testreszabható vízjelekkel.',
      sk: 'Pridajte textové alebo obrazové vodoznaky k vašim obrázkom. Chráňte svoj obsah prispôsobiteľnými vodoznakmi.',
      de: 'Fügen Sie Text- oder Bildwasserzeichen zu Ihren Bildern hinzu. Schützen Sie Ihre Inhalte mit anpassbaren Wasserzeichen.',
      pl: 'Dodaj tekstowe lub obrazowe znaki wodne do swoich obrazów. Chroń swoją zawartość za pomocą dostosowywalnych znaków wodnych.',
      ro: 'Adăugați filigrane text sau imagine la imaginile dumneavoastră. Protejați conținutul cu filigrane personalizabile.',
      cs: 'Přidejte textové nebo obrazové vodoznaky k vašim obrázkům. Chraňte svůj obsah přizpůsobitelnými vodoznaky.'
    },
    inputFormat: 'image',
    outputFormat: 'watermarked'
  }

  return generateConverterMetadata(config, locale)
}

export default function AddWatermarkPage({ params }: Props) {
  const converterConfig = {
    id: 'add-watermark',
    name: {
      en: 'Add Watermark',
      hu: 'Vízjel hozzáadás',
      sk: 'Pridať vodoznak',
      de: 'Wasserzeichen hinzufügen',
      pl: 'Dodaj znak wodny',
      ro: 'Adăugați filigran',
      cs: 'Přidat vodoznak'
    },
    description: {
      en: 'Protect your images with professional watermarks. Add text or logo watermarks with full customization.',
      hu: 'Védd meg a képeidet professzionális vízjelekkel. Adj hozzá szöveges vagy logó vízjeleket teljes testreszabással.',
      sk: 'Chráňte svoje obrázky profesionálnymi vodoznakmi. Pridajte textové alebo logové vodoznaky s úplným prispôsobením.',
      de: 'Schützen Sie Ihre Bilder mit professionellen Wasserzeichen. Fügen Sie Text- oder Logo-Wasserzeichen mit vollständiger Anpassung hinzu.',
      pl: 'Chroń swoje obrazy profesjonalnymi znakami wodnymi. Dodaj tekstowe lub logo znaki wodne z pełną personalizacją.',
      ro: 'Protejați imaginile cu filigrane profesionale. Adăugați filigrane text sau logo cu personalizare completă.',
      cs: 'Chraňte své obrázky profesionálními vodoznaky. Přidejte textové nebo logo vodoznaky s úplným přizpůsobením.'
    },
    inputFormat: 'Image',
    outputFormat: 'Watermarked',
    maxFileSize: '512 MB',
    supportedFormats: ['.jpg', '.jpeg', '.png', '.webp', '.bmp'],
    features: [
      {
        en: 'Text watermark with custom fonts',
        hu: 'Szöveges vízjel egyedi betűtípusokkal',
        sk: 'Textový vodoznak s vlastnými fontmi',
        de: 'Textwasserzeichen mit benutzerdefinierten Schriftarten',
        pl: 'Tekstowy znak wodny z niestandardowymi czcionkami',
        ro: 'Filigran text cu fonturi personalizate',
        cs: 'Textový vodoznak s vlastními fonty'
      },
      {
        en: 'Image watermark support',
        hu: 'Képes vízjel támogatás',
        sk: 'Podpora obrazového vodoznaku',
        de: 'Bildwasserzeichen-Unterstützung',
        pl: 'Obsługa obrazowego znaku wodnego',
        ro: 'Suport pentru filigran imagine',
        cs: 'Podpora obrazového vodoznaku'
      },
      {
        en: 'Position and opacity control',
        hu: 'Pozíció és átlátszóság vezérlés',
        sk: 'Ovládanie pozície a priehľadnosti',
        de: 'Positions- und Transparenzkontrolle',
        pl: 'Kontrola pozycji i przezroczystości',
        ro: 'Control poziție și opacitate',
        cs: 'Ovládání pozice a průhlednosti'
      },
      {
        en: 'Batch watermark processing',
        hu: 'Kötegelt vízjel feldolgozás',
        sk: 'Dávkové spracovanie vodoznaku',
        de: 'Batch-Wasserzeichen-Verarbeitung',
        pl: 'Przetwarzanie wsadowe znaków wodnych',
        ro: 'Procesare în lot a filigranelor',
        cs: 'Dávkové zpracování vodoznaků'
      }
    ]
  }

  return <ConverterPage config={converterConfig} locale={params.locale} />
}
