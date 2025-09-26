import { Metadata } from 'next'
import ConverterPage from '@/components/ConverterPage'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const titles = {
    en: 'JPG to PNG Converter - Convert Images with Transparency Support',
    hu: 'JPG PNG konvertáló - Képek konvertálása átlátszóság támogatással',
    sk: 'JPG na PNG konvertor - Konverzia obrázkov s podporou priehľadnosti',
    de: 'JPG zu PNG Konverter - Bilder mit Transparenzunterstützung konvertieren',
    pl: 'Konwerter JPG na PNG - Konwersja obrazów z obsługą przezroczystości',
    ro: 'Convertor JPG la PNG - Conversie imagini cu suport pentru transparență',
    cs: 'Konvertor JPG na PNG - Konverze obrázků s podporou průhlednosti'
  }

  const descriptions = {
    en: 'Convert JPG images to PNG format with transparency support. Free online JPG to PNG converter with lossless quality.',
    hu: 'Konvertálj JPG képeket PNG formátumba átlátszóság támogatással. Ingyenes online JPG PNG konvertáló veszteségmentes minőséggel.',
    sk: 'Konvertujte JPG obrázky na PNG formát s podporou priehľadnosti. Bezplatný online JPG na PNG konvertor s bezztrátovou kvalitou.',
    de: 'Konvertieren Sie JPG-Bilder in PNG-Format mit Transparenzunterstützung. Kostenloser Online-JPG-zu-PNG-Konverter mit verlustfreier Qualität.',
    pl: 'Konwertuj obrazy JPG na format PNG z obsługą przezroczystości. Darmowy online konwerter JPG na PNG z jakością bezstratną.',
    ro: 'Convertește imagini JPG în format PNG cu suport pentru transparență. Convertor online gratuit JPG la PNG cu calitate fără pierderi.',
    cs: 'Převeďte obrázky JPG na formát PNG s podporou průhlednosti. Bezplatný online konvertor JPG na PNG s bezztrátovou kvalitou.'
  }

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
  }
}

export default function JpgToPngPage({ params }: Props) {
  const converterConfig = {
    id: 'jpg-to-png',
    name: {
      en: 'JPG to PNG Converter',
      hu: 'JPG PNG konvertáló',
      sk: 'JPG na PNG konvertor',
      de: 'JPG zu PNG Konverter',
      pl: 'Konwerter JPG na PNG',
      ro: 'Convertor JPG la PNG',
      cs: 'Konvertor JPG na PNG'
    },
    description: {
      en: 'Convert JPG images to PNG format with full transparency support. Perfect for web graphics and professional design work.',
      hu: 'Konvertálj JPG képeket PNG formátumba teljes átlátszóság támogatással. Tökéletes webes grafikákhoz és professzionális design munkához.',
      sk: 'Konvertujte JPG obrázky na PNG formát s plnou podporou priehľadnosti. Perfektné pre webovú grafiku a profesionálne dizajnové práce.',
      de: 'Konvertieren Sie JPG-Bilder in PNG-Format mit vollständiger Transparenzunterstützung. Perfekt für Webgrafiken und professionelle Designarbeit.',
      pl: 'Konwertuj obrazy JPG na format PNG z pełną obsługą przezroczystości. Idealne do grafiki internetowej i profesjonalnej pracy projektowej.',
      ro: 'Convertește imagini JPG în format PNG cu suport complet pentru transparență. Perfect pentru grafică web și lucrări de design profesional.',
      cs: 'Převeďte obrázky JPG na formát PNG s plnou podporou průhlednosti. Perfektní pro webovou grafiku a profesionální designové práce.'
    },
    inputFormat: 'JPG',
    outputFormat: 'PNG',
    maxFileSize: '512 MB',
    supportedFormats: ['.jpg', '.jpeg'],
    features: [
      {
        en: 'Lossless quality conversion',
        hu: 'Veszteségmentes minőségű konverzió',
        sk: 'Bezztrátová kvalitná konverzia',
        de: 'Verlustfreie Qualitätskonvertierung',
        pl: 'Konwersja bezstratna',
        ro: 'Conversie fără pierderi de calitate',
        cs: 'Bezztrátová konverze kvality'
      },
      {
        en: 'Transparency support',
        hu: 'Átlátszóság támogatás',
        sk: 'Podpora priehľadnosti',
        de: 'Transparenzunterstützung',
        pl: 'Obsługa przezroczystości',
        ro: 'Suport pentru transparență',
        cs: 'Podpora průhlednosti'
      },
      {
        en: 'Batch processing support',
        hu: 'Kötegelt feldolgozás támogatás',
        sk: 'Podpora dávkového spracovania',
        de: 'Batch-Verarbeitungsunterstützung',
        pl: 'Obsługa przetwarzania wsadowego',
        ro: 'Suport pentru procesare în lot',
        cs: 'Podpora dávkového zpracování'
      }
    ]
  }

  return <ConverterPage config={converterConfig} locale={params.locale} />
}
