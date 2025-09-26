import { Metadata } from 'next'
import ConverterPage from '@/components/ConverterPage'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const titles = {
    en: 'EPUB to MOBI Converter - Convert E-books for Kindle',
    hu: 'EPUB MOBI konvertáló - E-könyvek konvertálása Kindle-re',
    sk: 'EPUB na MOBI konvertor - Konverzia e-kníh pre Kindle',
    de: 'EPUB zu MOBI Konverter - E-Books für Kindle konvertieren',
    pl: 'Konwerter EPUB na MOBI - Konwersja e-booków na Kindle',
    ro: 'Convertor EPUB la MOBI - Conversie e-cărți pentru Kindle',
    cs: 'Konvertor EPUB na MOBI - Konverze e-knih pro Kindle'
  }

  const descriptions = {
    en: 'Convert EPUB e-books to MOBI format for Amazon Kindle devices. Free online EPUB to MOBI converter with perfect formatting preservation.',
    hu: 'Konvertálj EPUB e-könyveket MOBI formátumba Amazon Kindle eszközökre. Ingyenes online EPUB MOBI konvertáló tökéletes formázás megőrzéssel.',
    sk: 'Konvertujte EPUB e-knihy na MOBI formát pre Amazon Kindle zariadenia. Bezplatný online EPUB na MOBI konvertor s perfektným zachovaním formátovania.',
    de: 'Konvertieren Sie EPUB-E-Books in MOBI-Format für Amazon Kindle-Geräte. Kostenloser Online-EPUB-zu-MOBI-Konverter mit perfekter Formatierungserhaltung.',
    pl: 'Konwertuj e-booki EPUB na format MOBI dla urządzeń Amazon Kindle. Darmowy online konwerter EPUB na MOBI z doskonałym zachowaniem formatowania.',
    ro: 'Convertește e-cărți EPUB în format MOBI pentru dispozitivele Amazon Kindle. Convertor online gratuit EPUB la MOBI cu păstrarea perfectă a formatării.',
    cs: 'Převeďte e-knihy EPUB na formát MOBI pro zařízení Amazon Kindle. Bezplatný online konvertor EPUB na MOBI s perfektním zachováním formátování.'
  }

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
  }
}

export default function EpubToMobiPage({ params }: Props) {
  const converterConfig = {
    id: 'epub-to-mobi',
    name: {
      en: 'EPUB to MOBI Converter',
      hu: 'EPUB MOBI konvertáló',
      sk: 'EPUB na MOBI konvertor',
      de: 'EPUB zu MOBI Konverter',
      pl: 'Konwerter EPUB na MOBI',
      ro: 'Convertor EPUB la MOBI',
      cs: 'Konvertor EPUB na MOBI'
    },
    description: {
      en: 'Convert EPUB e-books to MOBI format for Amazon Kindle. Perfect for reading your favorite books on Kindle devices with preserved formatting.',
      hu: 'Konvertálj EPUB e-könyveket MOBI formátumba Amazon Kindle-re. Tökéletes kedvenc könyveid olvasásához Kindle eszközökön megőrzött formázással.',
      sk: 'Konvertujte EPUB e-knihy na MOBI formát pre Amazon Kindle. Perfektné na čítanie vašich obľúbených kníh na Kindle zariadeniach s zachovaným formátovaním.',
      de: 'Konvertieren Sie EPUB-E-Books in MOBI-Format für Amazon Kindle. Perfekt zum Lesen Ihrer Lieblingsbücher auf Kindle-Geräten mit erhaltener Formatierung.',
      pl: 'Konwertuj e-booki EPUB na format MOBI dla Amazon Kindle. Idealne do czytania ulubionych książek na urządzeniach Kindle z zachowanym formatowaniem.',
      ro: 'Convertește e-cărți EPUB în format MOBI pentru Amazon Kindle. Perfect pentru citirea cărților preferate pe dispozitivele Kindle cu formatarea păstrată.',
      cs: 'Převeďte e-knihy EPUB na formát MOBI pro Amazon Kindle. Perfektní pro čtení oblíbených knih na zařízeních Kindle se zachovaným formátováním.'
    },
    inputFormat: 'EPUB',
    outputFormat: 'MOBI',
    maxFileSize: '512 MB',
    supportedFormats: ['.epub'],
    features: [
      {
        en: 'Kindle-optimized formatting',
        hu: 'Kindle optimalizált formázás',
        sk: 'Kindle optimalizované formátovanie',
        de: 'Kindle-optimierte Formatierung',
        pl: 'Formatowanie zoptymalizowane pod Kindle',
        ro: 'Formatare optimizată pentru Kindle',
        cs: 'Formátování optimalizované pro Kindle'
      },
      {
        en: 'Table of contents preservation',
        hu: 'Tartalomjegyzék megőrzése',
        sk: 'Zachovanie obsahu',
        de: 'Inhaltsverzeichnis-Erhaltung',
        pl: 'Zachowanie spisu treści',
        ro: 'Păstrarea cuprinsului',
        cs: 'Zachování obsahu'
      },
      {
        en: 'Cover image support',
        hu: 'Borító kép támogatás',
        sk: 'Podpora obálky',
        de: 'Cover-Bild-Unterstützung',
        pl: 'Obsługa okładki',
        ro: 'Suport pentru copertă',
        cs: 'Podpora obálky'
      }
    ]
  }

  return <ConverterPage config={converterConfig} locale={params.locale} />
}
