import { Metadata } from 'next'
import ConverterPage from '@/components/ConverterPage'
import { generateConverterMetadata } from '@/lib/seo-converter'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const config = {
    id: 'png-to-webp',
    name: {
      en: 'PNG to WebP Converter',
      hu: 'PNG WebP konvertáló',
      sk: 'PNG na WebP konvertor',
      de: 'PNG zu WebP Konverter',
      pl: 'Konwerter PNG na WebP',
      ro: 'Convertor PNG la WebP',
      cs: 'Konvertor PNG na WebP'
    },
    description: {
      en: 'Convert PNG files to WebP format instantly. Free online PNG to WebP converter. No registration required.',
      hu: 'Konvertálj PNG fájlokat WebP formátumba azonnal. Ingyenes online PNG WebP konvertáló. Regisztráció nélkül.',
      sk: 'Konvertujte PNG súbory na WebP formát okamžite. Bezplatný online PNG na WebP konvertor. Bez registrácie.',
      de: 'Konvertieren Sie PNG-Dateien sofort in WebP-Format. Kostenloser Online-PNG-zu-WebP-Konverter. Keine Registrierung erforderlich.',
      pl: 'Konwertuj pliki PNG na format WebP natychmiast. Darmowy online konwerter PNG na WebP. Bez rejestracji.',
      ro: 'Convertește fișierele PNG în format WebP instant. Convertor online gratuit PNG la WebP. Fără înregistrare.',
      cs: 'Převádějte soubory PNG na formát WebP okamžitě. Bezplatný online konvertor PNG na WebP. Bez registrace.'
    },
    inputFormat: 'png',
    outputFormat: 'webp'
  }

  return generateConverterMetadata(config, locale)
}

export default function PngToWebpPage({ params }: Props) {
  const converterConfig = {
    id: 'png-to-webp',
    name: {
      en: 'PNG to WebP Converter',
      hu: 'PNG WebP konvertáló',
      sk: 'PNG na WebP konvertor',
      de: 'PNG zu WebP Konverter',
      pl: 'Konwerter PNG na WebP',
      ro: 'Convertor PNG la WebP',
      cs: 'Konvertor PNG na WebP'
    },
    description: {
      en: 'Convert PNG images to WebP format for better compression while preserving transparency.',
      hu: 'Konvertálj PNG képeket WebP formátumba jobb tömörítés érdekében átlátszóság megőrzése mellett.',
      sk: 'Konvertujte PNG obrázky na WebP formát pre lepšiu kompresiu pri zachovaní priehľadnosti.',
      de: 'Konvertieren Sie PNG-Bilder in WebP-Format für bessere Komprimierung bei Erhaltung der Transparenz.',
      pl: 'Konwertuj obrazy PNG na format WebP dla lepszej kompresji przy zachowaniu przezroczystości.',
      ro: 'Convertește imaginile PNG în format WebP pentru compresie mai bună păstrând transparența.',
      cs: 'Převádějte obrázky PNG na formát WebP pro lepší kompresi při zachování průhlednosti.'
    },
    inputFormat: 'PNG',
    outputFormat: 'WebP',
    maxFileSize: '512 MB',
    supportedFormats: ['.png'],
    features: [
      {
        en: 'Transparency preservation',
        hu: 'Átlátszóság megőrzés',
        sk: 'Zachovanie priehľadnosti',
        de: 'Transparenz-Erhaltung',
        pl: 'Zachowanie przezroczystości',
        ro: 'Păstrarea transparenței',
        cs: 'Zachování průhlednosti'
      },
      {
        en: 'Better compression than PNG',
        hu: 'Jobb tömörítés mint PNG',
        sk: 'Lepšia kompresia ako PNG',
        de: 'Bessere Komprimierung als PNG',
        pl: 'Lepsza kompresja niż PNG',
        ro: 'Compresie mai bună decât PNG',
        cs: 'Lepší komprese než PNG'
      },
      {
        en: 'Lossless quality option',
        hu: 'Veszteségmentes minőség opció',
        sk: 'Možnosť bezstratovej kvality',
        de: 'Verlustfreie Qualitätsoption',
        pl: 'Opcja bezstratnej jakości',
        ro: 'Opțiune calitate fără pierderi',
        cs: 'Možnost bezeztrátové kvality'
      },
      {
        en: 'Modern web optimization',
        hu: 'Modern web optimalizálás',
        sk: 'Moderná webová optimalizácia',
        de: 'Moderne Web-Optimierung',
        pl: 'Nowoczesna optymalizacja internetowa',
        ro: 'Optimizare web modernă',
        cs: 'Moderní webová optimalizace'
      }
    ]
  }

  return <ConverterPage config={converterConfig} locale={params.locale} />
}
