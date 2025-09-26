import { Metadata } from 'next'
import ConverterPage from '@/components/ConverterPage'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  const titles = {
    en: 'PPTX to PDF Converter - Convert PowerPoint to PDF',
    hu: 'PPTX PDF konvertáló - PowerPoint konvertálása PDF-be',
    sk: 'PPTX na PDF konvertor - Konverzia PowerPoint na PDF',
    de: 'PPTX zu PDF Konverter - PowerPoint in PDF konvertieren',
    pl: 'Konwerter PPTX na PDF - Konwersja PowerPoint na PDF',
    ro: 'Convertor PPTX la PDF - Conversie PowerPoint în PDF',
    cs: 'Konvertor PPTX na PDF - Konverze PowerPoint na PDF'
  }

  const descriptions = {
    en: 'Convert PowerPoint presentations to PDF format while preserving all slides, animations, and formatting. Free online PPTX to PDF converter.',
    hu: 'Konvertálj PowerPoint prezentációkat PDF formátumba minden dia, animáció és formázás megőrzésével. Ingyenes online PPTX PDF konvertáló.',
    sk: 'Konvertujte PowerPoint prezentácie na PDF formát s zachovaním všetkých snímok, animácií a formátovania. Bezplatný online PPTX na PDF konvertor.',
    de: 'Konvertieren Sie PowerPoint-Präsentationen in PDF-Format unter Beibehaltung aller Folien, Animationen und Formatierungen. Kostenloser Online-PPTX-zu-PDF-Konverter.',
    pl: 'Konwertuj prezentacje PowerPoint na format PDF zachowując wszystkie slajdy, animacje i formatowania. Darmowy online konwerter PPTX na PDF.',
    ro: 'Convertește prezentările PowerPoint în format PDF păstrând toate slide-urile, animațiile și formatările. Convertor online gratuit PPTX la PDF.',
    cs: 'Převeďte PowerPoint prezentace na formát PDF zachováním všech snímků, animací a formátování. Bezplatný online konvertor PPTX na PDF.'
  }

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
  }
}

export default function PptxToPdfPage({ params }: Props) {
  const converterConfig = {
    id: 'pptx-to-pdf',
    name: {
      en: 'PPTX to PDF Converter',
      hu: 'PPTX PDF konvertáló',
      sk: 'PPTX na PDF konvertor',
      de: 'PPTX zu PDF Konverter',
      pl: 'Konwerter PPTX na PDF',
      ro: 'Convertor PPTX la PDF',
      cs: 'Konvertor PPTX na PDF'
    },
    description: {
      en: 'Transform PowerPoint presentations into professional PDF documents. Perfect for sharing presentations, archiving, or printing slides.',
      hu: 'Alakítsd át PowerPoint prezentációkat professzionális PDF dokumentumokká. Tökéletes prezentációk megosztásához, archiváláshoz vagy diák nyomtatásához.',
      sk: 'Transformujte PowerPoint prezentácie na profesionálne PDF dokumenty. Perfektné na zdieľanie prezentácií, archivovanie alebo tlač snímok.',
      de: 'Verwandeln Sie PowerPoint-Präsentationen in professionelle PDF-Dokumente. Perfekt zum Teilen von Präsentationen, Archivieren oder Drucken von Folien.',
      pl: 'Przekształć prezentacje PowerPoint w profesjonalne dokumenty PDF. Idealne do udostępniania prezentacji, archiwizacji lub drukowania slajdów.',
      ro: 'Transformați prezentările PowerPoint în documente PDF profesionale. Perfect pentru partajarea prezentărilor, arhivare sau tipărirea slide-urilor.',
      cs: 'Převeďte PowerPoint prezentace na profesionální PDF dokumenty. Perfektní pro sdílení prezentací, archivaci nebo tisk snímků.'
    },
    inputFormat: 'PPTX',
    outputFormat: 'PDF',
    maxFileSize: '512 MB',
    supportedFormats: ['.pptx', '.ppt'],
    features: [
      {
        en: 'Preserves slide layouts',
        hu: 'Megőrzi a dia elrendezéseket',
        sk: 'Zachováva rozloženie snímok',
        de: 'Bewahrt Folienlayouts',
        pl: 'Zachowuje układy slajdów',
        ro: 'Păstrează layout-urile slide-urilor',
        cs: 'Zachovává rozložení snímků'
      },
      {
        en: 'Maintains animations',
        hu: 'Megőrzi az animációkat',
        sk: 'Zachováva animácie',
        de: 'Bewahrt Animationen',
        pl: 'Zachowuje animacje',
        ro: 'Păstrează animațiile',
        cs: 'Zachovává animace'
      },
      {
        en: 'High-resolution output',
        hu: 'Magas felbontású kimenet',
        sk: 'Vysoké rozlíšenie výstupu',
        de: 'Hochauflösende Ausgabe',
        pl: 'Wysokiej rozdzielczości wyjście',
        ro: 'Ieșire de înaltă rezoluție',
        cs: 'Vysoké rozlišení výstupu'
      }
    ]
  }

  return <ConverterPage config={converterConfig} locale={params.locale} />
}
