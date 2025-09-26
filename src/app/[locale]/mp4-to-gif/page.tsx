import { Metadata } from 'next'
import ConverterPage from '@/components/ConverterPage'
import { generateConverterMetadata } from '@/lib/seo-converter'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const config = {
    id: 'mp4-to-gif',
    name: {
      en: 'MP4 to GIF Converter',
      hu: 'MP4 GIF konvertáló',
      sk: 'MP4 na GIF konvertor',
      de: 'MP4 zu GIF Konverter',
      pl: 'Konwerter MP4 na GIF',
      ro: 'Convertor MP4 la GIF',
      cs: 'Konvertor MP4 na GIF'
    },
    description: {
      en: 'Convert MP4 files to GIF format instantly. Free online MP4 to GIF converter. No registration required.',
      hu: 'Konvertálj MP4 fájlokat GIF formátumba azonnal. Ingyenes online MP4 GIF konvertáló. Regisztráció nélkül.',
      sk: 'Konvertujte MP4 súbory na GIF formát okamžite. Bezplatný online MP4 na GIF konvertor. Bez registrácie.',
      de: 'Konvertieren Sie MP4-Dateien sofort in GIF-Format. Kostenloser Online-MP4-zu-GIF-Konverter. Keine Registrierung erforderlich.',
      pl: 'Konwertuj pliki MP4 na format GIF natychmiast. Darmowy online konwerter MP4 na GIF. Bez rejestracji.',
      ro: 'Convertește fișierele MP4 în format GIF instant. Convertor online gratuit MP4 la GIF. Fără înregistrare.',
      cs: 'Převádějte soubory MP4 na formát GIF okamžitě. Bezplatný online konvertor MP4 na GIF. Bez registrace.'
    },
    inputFormat: 'mp4',
    outputFormat: 'gif'
  }

  return generateConverterMetadata(config, locale)
}

export default function Mp4ToGifPage({ params }: Props) {
  const converterConfig = {
    id: 'mp4-to-gif',
    name: {
      en: 'MP4 to GIF Converter',
      hu: 'MP4 GIF konvertáló',
      sk: 'MP4 na GIF konvertor',
      de: 'MP4 zu GIF Konverter',
      pl: 'Konwerter MP4 na GIF',
      ro: 'Convertor MP4 la GIF',
      cs: 'Konvertor MP4 na GIF'
    },
    description: {
      en: 'Convert MP4 videos to animated GIF format for social media sharing and web use.',
      hu: 'Konvertálj MP4 videókat animált GIF formátumba közösségi média megosztáshoz és webes használathoz.',
      sk: 'Konvertujte MP4 videá na animovaný GIF formát pre zdieľanie na sociálnych sieťach a webové použitie.',
      de: 'Konvertieren Sie MP4-Videos in animiertes GIF-Format für Social-Media-Sharing und Web-Nutzung.',
      pl: 'Konwertuj wideo MP4 na animowany format GIF do udostępniania w mediach społecznościowych i użycia internetowego.',
      ro: 'Convertește videoclipuri MP4 în format GIF animat pentru partajarea pe rețelele sociale și utilizarea web.',
      cs: 'Převádějte videa MP4 na animovaný formát GIF pro sdílení na sociálních sítích a webové použití.'
    },
    inputFormat: 'MP4',
    outputFormat: 'GIF',
    maxFileSize: '512 MB',
    supportedFormats: ['.mp4', '.mov', '.avi'],
    features: [
      {
        en: 'Animated GIF creation',
        hu: 'Animált GIF létrehozás',
        sk: 'Vytvorenie animovaného GIF',
        de: 'Animierte GIF-Erstellung',
        pl: 'Tworzenie animowanego GIF',
        ro: 'Crearea GIF animat',
        cs: 'Vytváření animovaného GIF'
      },
      {
        en: 'Custom frame rate control',
        hu: 'Egyedi képkocka sebesség vezérlés',
        sk: 'Ovládanie vlastnej snímkovej frekvencie',
        de: 'Benutzerdefinierte Bildrate-Kontrolle',
        pl: 'Kontrola niestandardowej częstotliwości klatek',
        ro: 'Control frecvență cadre personalizat',
        cs: 'Ovládání vlastní snímkové frekvence'
      },
      {
        en: 'Size optimization',
        hu: 'Méret optimalizálás',
        sk: 'Optimalizácia veľkosti',
        de: 'Größenoptimierung',
        pl: 'Optymalizacja rozmiaru',
        ro: 'Optimizare dimensiune',
        cs: 'Optimalizace velikosti'
      },
      {
        en: 'Social media ready',
        hu: 'Közösségi média kész',
        sk: 'Pripravené pre sociálne médiá',
        de: 'Social-Media-bereit',
        pl: 'Gotowe do mediów społecznościowych',
        ro: 'Gata pentru rețelele sociale',
        cs: 'Připraveno pro sociální média'
      }
    ]
  }

  return <ConverterPage config={converterConfig} locale={params.locale} />
}
