import { Metadata } from 'next'
import ConverterPage from '@/components/ConverterPage'
import { generateConverterMetadata } from '@/lib/seo-converter'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const config = {
    id: 'pdf-compress',
    name: {
      en: 'PDF Compressor',
      hu: 'PDF tömörítő',
      sk: 'Kompresor PDF',
      de: 'PDF-Komprimierer',
      pl: 'Kompresor PDF',
      ro: 'Compresor PDF',
      cs: 'Kompresor PDF'
    },
    description: {
      en: 'Compress PDF files to reduce size while maintaining readability. Perfect for email attachments.',
      hu: 'Tömörítsd a PDF fájlokat a méret csökkentésére olvashatóság megtartása mellett. Tökéletes email mellékletekhez.',
      sk: 'Komprimujte PDF súbory na zníženie veľkosti pri zachovaní čitateľnosti. Perfektné pre emailové prílohy.',
      de: 'Komprimieren Sie PDF-Dateien, um die Größe zu reduzieren und dabei die Lesbarkeit zu erhalten. Perfekt für E-Mail-Anhänge.',
      pl: 'Kompresuj pliki PDF, aby zmniejszyć rozmiar przy zachowaniu czytelności. Idealne do załączników e-mail.',
      ro: 'Comprimați fișierele PDF pentru a reduce dimensiunea păstrând lizibilitatea. Perfect pentru atașamente email.',
      cs: 'Komprimujte PDF soubory pro snížení velikosti při zachování čitelnosti. Perfektní pro emailové přílohy.'
    },
    inputFormat: 'pdf',
    outputFormat: 'compressed'
  }

  return generateConverterMetadata(config, locale)
}

export default function PdfCompressPage({ params }: Props) {
  const converterConfig = {
    id: 'pdf-compress',
    name: {
      en: 'PDF Compressor',
      hu: 'PDF tömörítő',
      sk: 'Kompresor PDF',
      de: 'PDF-Komprimierer',
      pl: 'Kompresor PDF',
      ro: 'Compresor PDF',
      cs: 'Kompresor PDF'
    },
    description: {
      en: 'Reduce PDF file size without losing quality. Optimize images and remove unnecessary elements.',
      hu: 'Csökkentsd a PDF fájl méretét minőségvesztés nélkül. Optimalizáld a képeket és távolítsd el a szükségtelen elemeket.',
      sk: 'Znížte veľkosť súboru PDF bez straty kvality. Optimalizujte obrázky a odstráňte nepotrebné prvky.',
      de: 'Reduzieren Sie die PDF-Dateigröße ohne Qualitätsverlust. Optimieren Sie Bilder und entfernen Sie unnötige Elemente.',
      pl: 'Zmniejsz rozmiar pliku PDF bez utraty jakości. Optymalizuj obrazy i usuń niepotrzebne elementy.',
      ro: 'Reduceți dimensiunea fișierului PDF fără pierderea calității. Optimizați imaginile și eliminați elementele inutile.',
      cs: 'Snižte velikost souboru PDF bez ztráty kvality. Optimalizujte obrázky a odstraňte zbytečné prvky.'
    },
    inputFormat: 'PDF',
    outputFormat: 'Compressed',
    maxFileSize: '512 MB',
    supportedFormats: ['.pdf'],
    features: [
      {
        en: 'Smart image compression',
        hu: 'Okos kép tömörítés',
        sk: 'Inteligentná kompresia obrázkov',
        de: 'Intelligente Bildkomprimierung',
        pl: 'Inteligentna kompresja obrazów',
        ro: 'Compresie inteligentă a imaginilor',
        cs: 'Inteligentní komprese obrázků'
      },
      {
        en: 'Remove duplicate elements',
        hu: 'Duplikált elemek eltávolítása',
        sk: 'Odstránenie duplicitných prvkov',
        de: 'Entfernung doppelter Elemente',
        pl: 'Usuwanie zduplikowanych elementów',
        ro: 'Eliminarea elementelor duplicate',
        cs: 'Odstranění duplicitních prvků'
      },
      {
        en: 'Optimize fonts and metadata',
        hu: 'Betűtípusok és metaadatok optimalizálása',
        sk: 'Optimalizácia fontov a metadát',
        de: 'Optimierung von Schriftarten und Metadaten',
        pl: 'Optymalizacja czcionek i metadanych',
        ro: 'Optimizarea fonturilor și metadatelor',
        cs: 'Optimalizace fontů a metadat'
      },
      {
        en: 'Preserve text quality',
        hu: 'Szöveg minőség megőrzése',
        sk: 'Zachovanie kvality textu',
        de: 'Erhaltung der Textqualität',
        pl: 'Zachowanie jakości tekstu',
        ro: 'Păstrarea calității textului',
        cs: 'Zachování kvality textu'
      }
    ]
  }

  return <ConverterPage config={converterConfig} locale={params.locale} />
}
