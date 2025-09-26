'use client'

import { useState, useCallback } from 'react'
import { Metadata } from 'next'
import { 
  CloudArrowUpIcon, 
  DocumentTextIcon, 
  ArrowDownTrayIcon,
  ShieldCheckIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import { validateFile, getSupportedFormatsForConverter, getMimeTypesForConverter } from '@/lib/validation'
import { generateHreflangTags, generateCanonicalUrl } from '@/lib/seo'
import ProgressIndicator from './ProgressIndicator'
import AdSlot from './AdSlot'
import { useToast } from './Toast'

interface ConverterConfig {
  id: string
  name: Record<string, string>
  description: Record<string, string>
  inputFormat: string
  outputFormat: string
  maxFileSize: string
  supportedFormats: string[]
  features: Array<Record<string, string>>
}

interface ConverterPageProps {
  config: ConverterConfig
  locale: string
}

interface FileItem {
  id: string
  file: File
  status: 'uploading' | 'processing' | 'completed' | 'error'
  progress: number
  downloadUrl?: string
  error?: string
  jobId?: string
}

export default function ConverterPage({ config, locale }: ConverterPageProps) {
  const [files, setFiles] = useState<FileItem[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const { showSuccess, showError, showWarning, showInfo, ToastContainer } = useToast()

  const getLocalizedText = (text: Record<string, string>) => {
    return text[locale] || text.en || ''
  }

  const handleFileSelect = useCallback(async (selectedFiles: FileList | null) => {
    if (!selectedFiles) return

    // Validate files before processing
    const maxSize = 512 * 1024 * 1024 // 512MB
    const allowedExtensions = getSupportedFormatsForConverter(config.id)
    const allowedTypes = getMimeTypesForConverter(config.id)

    const validFiles: File[] = []
    const invalidFiles: { file: File; error: string }[] = []

    Array.from(selectedFiles).forEach(file => {
      const validation = validateFile(file, {
        maxSize,
        allowedTypes,
        allowedExtensions
      })

      if (validation.isValid) {
        validFiles.push(file)
      } else {
        invalidFiles.push({ file, error: validation.error || 'Invalid file' })
      }
    })

    // Show validation errors with toast notifications
    if (invalidFiles.length > 0) {
      invalidFiles.forEach(({ file, error }) => {
        const fileItem: FileItem = {
          id: Math.random().toString(36).substr(2, 9),
          file,
          status: 'error',
          progress: 0,
          error
        }
        setFiles(prev => [...prev, fileItem])

        // Show specific error messages
        if (error?.includes('File size exceeds')) {
          showError(
            getLocalizedText({
              en: 'File Too Large',
              hu: 'Fájl túl nagy',
              sk: 'Súbor príliš veľký',
              de: 'Datei zu groß',
              pl: 'Plik za duży',
              ro: 'Fișier prea mare',
              cs: 'Soubor příliš velký'
            }),
            getLocalizedText({
              en: `${file.name} exceeds the maximum file size limit.`,
              hu: `${file.name} meghaladja a maximális fájlméret korlátot.`,
              sk: `${file.name} prekračuje maximálnu veľkosť súboru.`,
              de: `${file.name} überschreitet die maximale Dateigröße.`,
              pl: `${file.name} przekracza maksymalny rozmiar pliku.`,
              ro: `${file.name} depășește limita maximă de dimensiune a fișierului.`,
              cs: `${file.name} překračuje maximální velikost souboru.`
            })
          )
        } else if (error?.includes('File type') || error?.includes('File extension')) {
          showError(
            getLocalizedText({
              en: 'Unsupported File Type',
              hu: 'Nem támogatott fájltípus',
              sk: 'Nepodporovaný typ súboru',
              de: 'Nicht unterstützter Dateityp',
              pl: 'Nieobsługiwany typ pliku',
              ro: 'Tip de fișier nesuportat',
              cs: 'Nepodporovaný typ souboru'
            }),
            getLocalizedText({
              en: `${file.name} is not a supported file type for this converter.`,
              hu: `${file.name} nem támogatott fájltípus ehhez a konverterhez.`,
              sk: `${file.name} nie je podporovaný typ súboru pre tento konvertor.`,
              de: `${file.name} ist kein unterstützter Dateityp für diesen Konverter.`,
              pl: `${file.name} nie jest obsługiwanym typem pliku dla tego konwertera.`,
              ro: `${file.name} nu este un tip de fișier suportat pentru acest convertor.`,
              cs: `${file.name} není podporovaný typ souboru pro tento konvertor.`
            })
          )
        } else {
          showError(
            getLocalizedText({
              en: 'File Validation Error',
              hu: 'Fájl validációs hiba',
              sk: 'Chyba validácie súboru',
              de: 'Datei-Validierungsfehler',
              pl: 'Błąd walidacji pliku',
              ro: 'Eroare de validare a fișierului',
              cs: 'Chyba validace souboru'
            }),
            error || getLocalizedText({
              en: 'An error occurred while validating the file.',
              hu: 'Hiba történt a fájl validálása során.',
              sk: 'Pri validácii súboru sa vyskytla chyba.',
              de: 'Bei der Datei-Validierung ist ein Fehler aufgetreten.',
              pl: 'Wystąpił błąd podczas walidacji pliku.',
              ro: 'A apărut o eroare la validarea fișierului.',
              cs: 'Při validaci souboru došlo k chybě.'
            })
          )
        }
      })
    }

    // Process valid files
    const newFiles: FileItem[] = validFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      status: 'uploading' as const,
      progress: 0
    }))

    setFiles(prev => [...prev, ...newFiles])

    // Process each file
    for (const fileItem of newFiles) {
      try {
        // Upload file and create conversion job
        const formData = new FormData()
        formData.append('file', fileItem.file)
        formData.append('converter', config.id)
        formData.append('options', JSON.stringify({}))

        const response = await fetch('/api/convert', {
          method: 'POST',
          body: formData
        })

        if (!response.ok) {
          throw new Error('Upload failed')
        }

        const result = await response.json()
        
        // Update file with job ID and start processing
        setFiles(prev => prev.map(f => 
          f.id === fileItem.id 
            ? { ...f, status: 'processing', progress: 10, jobId: result.jobId }
            : f
        ))

        // Show success toast for upload
        showSuccess(
          getLocalizedText({
            en: 'Upload Successful',
            hu: 'Feltöltés sikeres',
            sk: 'Nahrávanie úspešné',
            de: 'Upload erfolgreich',
            pl: 'Przesłanie udane',
            ro: 'Încărcare reușită',
            cs: 'Nahrávání úspěšné'
          }),
          getLocalizedText({
            en: `${fileItem.file.name} has been uploaded and conversion started.`,
            hu: `${fileItem.file.name} feltöltve és a konverzió elindult.`,
            sk: `${fileItem.file.name} bolo nahrané a konverzia sa začala.`,
            de: `${fileItem.file.name} wurde hochgeladen und die Konvertierung gestartet.`,
            pl: `${fileItem.file.name} zostało przesłane i konwersja rozpoczęta.`,
            ro: `${fileItem.file.name} a fost încărcat și conversia a început.`,
            cs: `${fileItem.file.name} bylo nahráno a konverze byla zahájena.`
          })
        )

        // Start polling for job status
        pollJobStatus(fileItem.id, result.jobId)

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Upload failed'
        
        setFiles(prev => prev.map(f => 
          f.id === fileItem.id 
            ? { ...f, status: 'error', error: errorMessage }
            : f
        ))

        // Show error toast with retry option
        showError(
          getLocalizedText({
            en: 'Upload Failed',
            hu: 'Feltöltés sikertelen',
            sk: 'Nahrávanie zlyhalo',
            de: 'Upload fehlgeschlagen',
            pl: 'Przesłanie nieudane',
            ro: 'Încărcare eșuată',
            cs: 'Nahrávání selhalo'
          }),
          getLocalizedText({
            en: `Failed to upload ${fileItem.file.name}. Please try again.`,
            hu: `${fileItem.file.name} feltöltése sikertelen. Kérjük, próbálja újra.`,
            sk: `Nepodarilo sa nahrať ${fileItem.file.name}. Skúste to znova.`,
            de: `Fehler beim Hochladen von ${fileItem.file.name}. Bitte versuchen Sie es erneut.`,
            pl: `Nie udało się przesłać ${fileItem.file.name}. Spróbuj ponownie.`,
            ro: `Nu s-a putut încărca ${fileItem.file.name}. Vă rugăm să încercați din nou.`,
            cs: `Nepodařilo se nahrát ${fileItem.file.name}. Zkuste to prosím znovu.`
          }),
          {
            label: getLocalizedText({
              en: 'Retry',
              hu: 'Újrapróbálás',
              sk: 'Skúsiť znova',
              de: 'Wiederholen',
              pl: 'Spróbuj ponownie',
              ro: 'Încearcă din nou',
              cs: 'Zkusit znovu'
            }),
            onClick: () => {
              // Remove the failed file and retry
              setFiles(prev => prev.filter(f => f.id !== fileItem.id))
              handleFileSelect([fileItem.file])
            }
          }
        )
      }
    }
  }, [config.id])

  const pollJobStatus = useCallback(async (fileId: string, jobId: string) => {
    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(`/api/status/${jobId}`)
        if (!response.ok) {
          throw new Error('Status check failed')
        }

        const status = await response.json()
        
        setFiles(prev => prev.map(f => {
          if (f.id === fileId) {
            const newFile = { ...f }
            
            switch (status.status) {
              case 'pending':
                newFile.status = 'processing'
                newFile.progress = 10
                break
              case 'downloading':
                newFile.status = 'processing'
                newFile.progress = 20
                break
              case 'processing':
                newFile.status = 'processing'
                newFile.progress = 50
                break
              case 'uploading':
                newFile.status = 'processing'
                newFile.progress = 80
                break
              case 'completed':
                newFile.status = 'completed'
                newFile.progress = 100
                newFile.downloadUrl = status.downloadUrl
                clearInterval(pollInterval)
                break
              case 'failed':
                newFile.status = 'error'
                newFile.error = status.error || 'Conversion failed'
                clearInterval(pollInterval)
                break
            }
            
            return newFile
          }
          return f
        }))

        // Stop polling if job is completed or failed
        if (status.status === 'completed' || status.status === 'failed') {
          clearInterval(pollInterval)
        }

      } catch (error) {
        setFiles(prev => prev.map(f => 
          f.id === fileId 
            ? { ...f, status: 'error', error: 'Status check failed' }
            : f
        ))
        clearInterval(pollInterval)
      }
    }, 2000) // Poll every 2 seconds

    // Cleanup interval after 5 minutes
    setTimeout(() => clearInterval(pollInterval), 300000)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    handleFileSelect(e.dataTransfer.files)
  }, [handleFileSelect])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id))
  }


  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <div className="flex gap-8">
            {/* Main Content */}
            <div className="flex-1">
            {/* Inline Top Ad */}
            <AdSlot position="inline-top" className="mb-8" size="leaderboard" />

            {/* Header */}
            <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <DocumentTextIcon className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              {getLocalizedText(config.name)}
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {getLocalizedText(config.description)}
          </p>
          
          {/* Trust Badges */}
          <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <ShieldCheckIcon className="h-4 w-4 text-green-500" />
              <span>100% Secure</span>
            </div>
            <div className="flex items-center space-x-1">
              <ClockIcon className="h-4 w-4 text-blue-500" />
              <span>Auto-delete in 60 min</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-green-500">✓</span>
              <span>HTTPS Encrypted</span>
            </div>
          </div>
        </div>

        {/* File Upload Area */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-8">
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors duration-200 cursor-pointer ${
              isDragOver 
                ? 'border-blue-400 bg-blue-50' 
                : 'border-gray-300 hover:border-blue-400'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">
              {getLocalizedText({
                en: 'Drop your files here or click to browse',
                hu: 'Húzd ide a fájlokat vagy kattints a böngészéshez',
                sk: 'Presuňte súbory sem alebo kliknite na prehľadávanie',
                de: 'Dateien hier ablegen oder zum Durchsuchen klicken',
                pl: 'Przeciągnij pliki tutaj lub kliknij, aby przeglądać',
                ro: 'Trage fișierele aici sau fă clic pentru a naviga',
                cs: 'Přetáhněte soubory sem nebo klikněte pro procházení'
              })}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              {getLocalizedText({
                en: `Supports ${config.inputFormat} files up to ${config.maxFileSize}`,
                hu: `Támogatja a ${config.inputFormat} fájlokat ${config.maxFileSize}-ig`,
                sk: `Podporuje ${config.inputFormat} súbory až do ${config.maxFileSize}`,
                de: `Unterstützt ${config.inputFormat}-Dateien bis zu ${config.maxFileSize}`,
                pl: `Obsługuje pliki ${config.inputFormat} do ${config.maxFileSize}`,
                ro: `Suportă fișiere ${config.inputFormat} până la ${config.maxFileSize}`,
                cs: `Podporuje soubory ${config.inputFormat} až do ${config.maxFileSize}`
              })}
            </p>
            
            {/* File format help */}
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <InformationCircleIcon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">
                    {getLocalizedText({
                      en: 'Supported file formats:',
                      hu: 'Támogatott fájlformátumok:',
                      sk: 'Podporované formáty súborov:',
                      de: 'Unterstützte Dateiformate:',
                      pl: 'Obsługiwane formaty plików:',
                      ro: 'Formate de fișiere suportate:',
                      cs: 'Podporované formáty souborů:'
                    })}
                  </p>
                  <p className="text-blue-700">
                    {getSupportedFormatsForConverter(config.id).map(ext => ext.toUpperCase()).join(', ')}
                  </p>
                </div>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
              {getLocalizedText({
                en: 'Choose Files',
                hu: 'Fájlok kiválasztása',
                sk: 'Vybrať súbory',
                de: 'Dateien auswählen',
                pl: 'Wybierz pliki',
                ro: 'Alege fișiere',
                cs: 'Vybrat soubory'
              })}
            </button>
          </div>
          
          <input
            id="file-input"
            type="file"
            multiple
            accept={getSupportedFormatsForConverter(config.id).join(',')}
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {getLocalizedText({
                en: 'Files',
                hu: 'Fájlok',
                sk: 'Súbory',
                de: 'Dateien',
                pl: 'Pliki',
                ro: 'Fișiere',
                cs: 'Soubory'
              })}
            </h3>
            <div className="space-y-4">
              {files.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="flex-shrink-0">
                      {file.status === 'uploading' || file.status === 'processing' ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent" />
                      ) : file.status === 'completed' ? (
                        <CheckCircleIcon className="h-4 w-4 text-green-500" />
                      ) : (
                        <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{file.file.name}</p>
                      <p className="text-xs text-gray-500">
                        {(file.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <ProgressIndicator 
                      status={file.status}
                      progress={file.progress}
                      error={file.error}
                    />
                    
                    {file.status === 'completed' && file.downloadUrl && (
                      <button 
                        onClick={() => window.open(file.downloadUrl, '_blank')}
                        className="flex items-center space-x-1 text-green-600 hover:text-green-700"
                      >
                        <ArrowDownTrayIcon className="h-4 w-4" />
                        <span className="text-sm">
                          {getLocalizedText({
                            en: 'Download',
                            hu: 'Letöltés',
                            sk: 'Stiahnuť',
                            de: 'Herunterladen',
                            pl: 'Pobierz',
                            ro: 'Descarcă',
                            cs: 'Stáhnout'
                          })}
                        </span>
                      </button>
                    )}
                    
                    <button 
                      onClick={() => removeFile(file.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

            {/* Inline Bottom Ad */}
            <AdSlot position="inline-bottom" className="mb-8" size="leaderboard" />

            {/* Features */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            {getLocalizedText({
              en: `Why choose our ${config.inputFormat} to ${config.outputFormat} converter?`,
              hu: `Miért válassza a ${config.inputFormat} ${config.outputFormat} konvertálónkat?`,
              sk: `Prečo si vybrať náš ${config.inputFormat} na ${config.outputFormat} konvertor?`,
              de: `Warum unseren ${config.inputFormat}-zu-${config.outputFormat}-Konverter wählen?`,
              pl: `Dlaczego wybrać nasz konwerter ${config.inputFormat} na ${config.outputFormat}?`,
              ro: `De ce să alegeți convertorul nostru ${config.inputFormat} la ${config.outputFormat}?`,
              cs: `Proč si vybrat náš konvertor ${config.inputFormat} na ${config.outputFormat}?`
            })}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {config.features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600">
                  {getLocalizedText(feature)}
                </p>
              </div>
            ))}
          </div>
        </div>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-8">
              <AdSlot position="sidebar" size="skyscraper" />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
