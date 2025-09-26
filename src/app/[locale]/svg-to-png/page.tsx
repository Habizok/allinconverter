import { Metadata } from 'next'
import ConverterPage from '@/components/ConverterPage'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const titles = {
    en: 'SVG to PNG Converter - Convert Vector Graphics to PNG',
    hu: 'SVG PNG konvertáló - Vektor grafikák konvertálása PNG-be',
    sk: 'SVG na PNG konvertor - Konverzia vektorovej grafiky na PNG',
    de: 'SVG zu PNG Konverter - Vektorgrafiken in PNG konvertieren',
    pl: 'Konwerter SVG na PNG - Konwersja grafiki wektorowej na PNG',
    ro: 'Convertor SVG la PNG - Conversie grafică vectorială în PNG',
    cs: 'Konvertor SVG na PNG - Konverze vektorové grafiky na PNG'
  }

  const descriptions = {
    en: 'Convert SVG vector graphics to PNG raster images with customizable resolution. Free online SVG to PNG converter with high quality output.',
    hu: 'Konvertálj SVG vektor grafikákat PNG raszter képekké testreszabható felbontással. Ingyenes online SVG PNG konvertáló magas minőséggel.',
    sk: 'Konvertujte SVG vektorovú grafiku na PNG rastrové obrázky s prispôsobiteľným rozlíšením. Bezplatný online SVG na PNG konvertor s vysokou kvalitou.',
    de: 'Konvertieren Sie SVG-Vektorgrafiken in PNG-Rasterbilder mit anpassbarer Auflösung. Kostenloser Online-SVG-zu-PNG-Konverter mit hoher Qualität.',
    pl: 'Konwertuj grafikę wektorową SVG na obrazy rastrowe PNG z konfigurowalną rozdzielczością. Darmowy online konwerter SVG na PNG z wysoką jakością.',
    ro: 'Convertește grafica vectorială SVG în imagini raster PNG cu rezoluție personalizabilă. Convertor online gratuit SVG la PNG cu calitate înaltă.',
    cs: 'Převeďte vektorovou grafiku SVG na rastrové obrázky PNG s přizpůsobitelným rozlišením. Bezplatný online konvertor SVG na PNG s vysokou kvalitou.'
  }

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
  }
}

export default function SvgToPngPage({ params }: Props) {
  const converterConfig = {
    id: 'svg-to-png',
    name: {
      en: 'SVG to PNG Converter',
      hu: 'SVG PNG konvertáló',
      sk: 'SVG na PNG konvertor',
      de: 'SVG zu PNG Konverter',
      pl: 'Konwerter SVG na PNG',
      ro: 'Convertor SVG la PNG',
      cs: 'Konvertor SVG na PNG'
    },
    description: {
      en: 'Transform scalable SVG vector graphics into high-resolution PNG images. Perfect for logos, icons, and illustrations.',
      hu: 'Alakítsd át skálázható SVG vektor grafikákat magas felbontású PNG képekké. Tökéletes logókhoz, ikonokhoz és illusztrációkhoz.',
      sk: 'Transformujte škálovateľnú SVG vektorovú grafiku na vysokorozlíšené PNG obrázky. Perfektné pre logá, ikony a ilustrácie.',
      de: 'Verwandeln Sie skalierbare SVG-Vektorgrafiken in hochauflösende PNG-Bilder. Perfekt für Logos, Icons und Illustrationen.',
      pl: 'Przekształć skalowalną grafikę wektorową SVG w obrazy PNG o wysokiej rozdzielczości. Idealne do logo, ikon i ilustracji.',
      ro: 'Transformați grafica vectorială SVG scalabilă în imagini PNG de înaltă rezoluție. Perfect pentru logo-uri, icoane și ilustrații.',
      cs: 'Převeďte škálovatelnou vektorovou grafiku SVG na vysoce rozlišené obrázky PNG. Perfektní pro loga, ikony a ilustrace.'
    },
    inputFormat: 'SVG',
    outputFormat: 'PNG',
    maxFileSize: '512 MB',
    supportedFormats: ['.svg'],
    features: [
      {
        en: 'Customizable resolution',
        hu: 'Testreszabható felbontás',
        sk: 'Prispôsobiteľné rozlíšenie',
        de: 'Anpassbare Auflösung',
        pl: 'Konfigurowalna rozdzielczość',
        ro: 'Rezoluție personalizabilă',
        cs: 'Přizpůsobitelné rozlišení'
      },
      {
        en: 'Vector to raster conversion',
        hu: 'Vektor raszter konverzió',
        sk: 'Konverzia vektor na rastor',
        de: 'Vektor-zu-Raster-Konvertierung',
        pl: 'Konwersja wektor na rastor',
        ro: 'Conversie vector la raster',
        cs: 'Konverze vektor na rastr'
      },
      {
        en: 'Transparent background support',
        hu: 'Átlátszó háttér támogatás',
        sk: 'Podpora priehľadného pozadia',
        de: 'Transparenter Hintergrund-Support',
        pl: 'Obsługa przezroczystego tła',
        ro: 'Suport pentru fundal transparent',
        cs: 'Podpora průhledného pozadí'
      }
    ]
  }

  return <ConverterPage config={converterConfig} locale={params.locale} />
}
