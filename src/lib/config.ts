export const locales = ['en', 'hu', 'sk', 'de', 'pl', 'ro', 'cs'] as const
export const defaultLocale = 'en' as const

export const siteConfig = {
  name: 'AllInConverter',
  url: 'https://allinconverter.com',
  email: 'info@allinconverter.com',
  description: {
    en: 'Convert files online - PDF to DOCX, MP4 to MP3, JPG to PNG and more. Fast, secure, and free file conversion tools.',
    hu: 'Fájlok online konvertálása - PDF-ből DOCX-be, MP4-ből MP3-ba, JPG-ből PNG-be és még sok más. Gyors, biztonságos és ingyenes fájl konvertáló eszközök.',
    sk: 'Konvertujte súbory online - PDF na DOCX, MP4 na MP3, JPG na PNG a ďalšie. Rýchle, bezpečné a bezplatné nástroje na konverziu súborov.',
    de: 'Konvertieren Sie Dateien online - PDF zu DOCX, MP4 zu MP3, JPG zu PNG und mehr. Schnelle, sichere und kostenlose Dateikonvertierungstools.',
    pl: 'Konwertuj pliki online - PDF na DOCX, MP4 na MP3, JPG na PNG i więcej. Szybkie, bezpieczne i darmowe narzędzia do konwersji plików.',
    ro: 'Convertește fișiere online - PDF la DOCX, MP4 la MP3, JPG la PNG și multe altele. Instrumente rapide, sigure și gratuite pentru conversia fișierelor.',
    cs: 'Převádějte soubory online - PDF na DOCX, MP4 na MP3, JPG na PNG a další. Rychlé, bezpečné a bezplatné nástroje pro převod souborů.'
  }
}

export const converterConfig = {
  limits: {
    maxFileSizeMB: 512,
    maxParallelJobs: 1,
    timeoutSeconds: 120
  },
  supportedFormats: {
    documents: ['pdf', 'docx', 'doc', 'txt', 'rtf'],
    images: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'heic', 'svg'],
    video: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv'],
    audio: ['mp3', 'wav', 'aac', 'flac', 'ogg', 'm4a']
  }
}

export const seoConfig = {
  defaultTitle: {
    en: 'AllInConverter - Free Online File Converter',
    hu: 'AllInConverter - Ingyenes Online Fájl Konvertáló',
    sk: 'AllInConverter - Bezplatný Online Konvertor Súborov',
    de: 'AllInConverter - Kostenloser Online-Dateikonverter',
    pl: 'AllInConverter - Darmowy Konwerter Plików Online',
    ro: 'AllInConverter - Convertor de Fișiere Online Gratuit',
    cs: 'AllInConverter - Bezplatný Online Konvertor Souborů'
  },
  defaultDescription: {
    en: 'Convert files online for free. PDF to DOCX, MP4 to MP3, JPG to PNG and more. Fast, secure, and easy to use file conversion tools.',
    hu: 'Konvertálj fájlokat online ingyen. PDF-ből DOCX-be, MP4-ből MP3-ba, JPG-ből PNG-be és még sok más. Gyors, biztonságos és könnyen használható fájl konvertáló eszközök.',
    sk: 'Konvertujte súbory online zadarmo. PDF na DOCX, MP4 na MP3, JPG na PNG a ďalšie. Rýchle, bezpečné a ľahko použiteľné nástroje na konverziu súborov.',
    de: 'Konvertieren Sie Dateien kostenlos online. PDF zu DOCX, MP4 zu MP3, JPG zu PNG und mehr. Schnelle, sichere und benutzerfreundliche Dateikonvertierungstools.',
    pl: 'Konwertuj pliki online za darmo. PDF na DOCX, MP4 na MP3, JPG na PNG i więcej. Szybkie, bezpieczne i łatwe w użyciu narzędzia do konwersji plików.',
    ro: 'Convertește fișiere online gratuit. PDF la DOCX, MP4 la MP3, JPG la PNG și multe altele. Instrumente rapide, sigure și ușor de folosit pentru conversia fișierelor.',
    cs: 'Převádějte soubory online zdarma. PDF na DOCX, MP4 na MP3, JPG na PNG a další. Rychlé, bezpečné a snadno použitelné nástroje pro převod souborů.'
  }
}
