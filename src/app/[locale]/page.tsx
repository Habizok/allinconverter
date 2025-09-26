import { Metadata } from 'next'
import Hero from '@/components/Hero'
import ConverterGrid from '@/components/ConverterGrid'
import Features from '@/components/Features'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const titles = {
    en: 'AllInConverter - Free Online File Converter',
    hu: 'AllInConverter - Ingyenes Online Fájl Konvertáló',
    sk: 'AllInConverter - Bezplatný Online Konvertor Súborov',
    de: 'AllInConverter - Kostenloser Online-Dateikonverter',
    pl: 'AllInConverter - Darmowy Konwerter Plików Online',
    ro: 'AllInConverter - Convertor de Fișiere Online Gratuit',
    cs: 'AllInConverter - Bezplatný Online Konvertor Souborů'
  }

  const descriptions = {
    en: 'Convert files online for free. PDF to DOCX, MP4 to MP3, JPG to PNG and more. Fast, secure, and easy to use file conversion tools.',
    hu: 'Konvertálj fájlokat online ingyen. PDF-ből DOCX-be, MP4-ből MP3-ba, JPG-ből PNG-be és még sok más. Gyors, biztonságos és könnyen használható fájl konvertáló eszközök.',
    sk: 'Konvertujte súbory online zadarmo. PDF na DOCX, MP4 na MP3, JPG na PNG a ďalšie. Rýchle, bezpečné a ľahko použiteľné nástroje na konverziu súborov.',
    de: 'Konvertieren Sie Dateien kostenlos online. PDF zu DOCX, MP4 zu MP3, JPG zu PNG und mehr. Schnelle, sichere und benutzerfreundliche Dateikonvertierungstools.',
    pl: 'Konwertuj pliki online za darmo. PDF na DOCX, MP4 na MP3, JPG na PNG i więcej. Szybkie, bezpieczne i łatwe w użyciu narzędzia do konwersji plików.',
    ro: 'Convertește fișiere online gratuit. PDF la DOCX, MP4 la MP3, JPG la PNG și multe altele. Instrumente rapide, sigure și ușor de folosit pentru conversia fișierelor.',
    cs: 'Převádějte soubory online zdarma. PDF na DOCX, MP4 na MP3, JPG na PNG a další. Rychlé, bezpečné a snadno použitelné nástroje pro převod souborů.'
  }

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
  }
}

export default function LocaleHomePage({ params }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Hero />
      <ConverterGrid />
      <Features />
    </div>
  )
}
