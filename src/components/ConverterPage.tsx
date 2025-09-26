'use client'

import { useState, useCallback } from 'react'
import { 
  CloudArrowUpIcon, 
  DocumentTextIcon, 
  ArrowDownTrayIcon,
  ShieldCheckIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

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
}

export default function ConverterPage({ config, locale }: ConverterPageProps) {
  const [files, setFiles] = useState<FileItem[]>([])
  const [isDragOver, setIsDragOver] = useState(false)

  const getLocalizedText = (text: Record<string, string>) => {
    return text[locale] || text.en || ''
  }

  const handleFileSelect = useCallback((selectedFiles: FileList | null) => {
    if (!selectedFiles) return

    const newFiles: FileItem[] = Array.from(selectedFiles).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      status: 'uploading' as const,
      progress: 0
    }))

    setFiles(prev => [...prev, ...newFiles])

    // Simulate file processing
    newFiles.forEach(fileItem => {
      setTimeout(() => {
        setFiles(prev => prev.map(f => 
          f.id === fileItem.id 
            ? { ...f, status: 'processing', progress: 50 }
            : f
        ))
      }, 1000)

      setTimeout(() => {
        setFiles(prev => prev.map(f => 
          f.id === fileItem.id 
            ? { 
                ...f, 
                status: 'completed', 
                progress: 100,
                downloadUrl: `#download-${fileItem.id}`
              }
            : f
        ))
      }, 3000)
    })
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

  const getStatusIcon = (status: FileItem['status']) => {
    switch (status) {
      case 'uploading':
      case 'processing':
        return <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent" />
      case 'completed':
        return <CheckCircleIcon className="h-4 w-4 text-green-500" />
      case 'error':
        return <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />
    }
  }

  const getStatusText = (status: FileItem['status']) => {
    const statusTexts = {
      uploading: { en: 'Uploading...', hu: 'Feltöltés...', sk: 'Nahrávanie...', de: 'Hochladen...', pl: 'Przesyłanie...', ro: 'Se încarcă...', cs: 'Nahrávání...' },
      processing: { en: 'Processing...', hu: 'Feldolgozás...', sk: 'Spracovanie...', de: 'Verarbeitung...', pl: 'Przetwarzanie...', ro: 'Se procesează...', cs: 'Zpracování...' },
      completed: { en: 'Ready', hu: 'Kész', sk: 'Pripravené', de: 'Fertig', pl: 'Gotowe', ro: 'Gata', cs: 'Připraveno' },
      error: { en: 'Error', hu: 'Hiba', sk: 'Chyba', de: 'Fehler', pl: 'Błąd', ro: 'Eroare', cs: 'Chyba' }
    }
    return getLocalizedText(statusTexts[status])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="mx-auto max-w-4xl px-6 py-8 lg:px-8">
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
            accept={config.supportedFormats.join(',')}
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
                    {getStatusIcon(file.status)}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{file.file.name}</p>
                      <p className="text-xs text-gray-500">
                        {(file.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 min-w-0">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${file.progress}%` }}
                        />
                      </div>
                    </div>
                    
                    <span className="text-sm text-gray-500 min-w-0">
                      {getStatusText(file.status)}
                    </span>
                    
                    {file.status === 'completed' && (
                      <button className="flex items-center space-x-1 text-green-600 hover:text-green-700">
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

        {/* Features */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            {getLocalizedText({
              en: 'Why choose our PDF to DOCX converter?',
              hu: 'Miért válassza a PDF DOCX konvertálónkat?',
              sk: 'Prečo si vybrať náš PDF na DOCX konvertor?',
              de: 'Warum unseren PDF-zu-DOCX-Konverter wählen?',
              pl: 'Dlaczego wybrać nasz konwerter PDF na DOCX?',
              ro: 'De ce să alegeți convertorul nostru PDF la DOCX?',
              cs: 'Proč si vybrat náš konvertor PDF na DOCX?'
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
    </div>
  )
}
