export interface ValidationResult {
  isValid: boolean
  error?: string
}

export interface FileValidationOptions {
  maxSize: number // in bytes
  allowedTypes: string[]
  allowedExtensions: string[]
  checkMagicBytes?: boolean // Whether to check file magic bytes
}

export function validateFile(file: File, options: FileValidationOptions): ValidationResult {
  // Check file size
  if (file.size > options.maxSize) {
    const maxSizeMB = Math.round(options.maxSize / (1024 * 1024))
    return {
      isValid: false,
      error: `File size exceeds ${maxSizeMB}MB limit`
    }
  }

  // Check file type
  if (options.allowedTypes.length > 0 && !options.allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `File type ${file.type} is not supported`
    }
  }

  // Check file extension
  const extension = file.name.split('.').pop()?.toLowerCase()
  if (options.allowedExtensions.length > 0 && extension && !options.allowedExtensions.includes(`.${extension}`)) {
    return {
      isValid: false,
      error: `File extension .${extension} is not supported`
    }
  }

  return { isValid: true }
}

export function getFileSizeString(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function getSupportedFormatsForConverter(converterId: string): string[] {
  const formatMap: Record<string, string[]> = {
    'pdf-to-docx': ['.pdf'],
    'docx-to-pdf': ['.docx'],
    'pdf-to-txt': ['.pdf'],
    'txt-to-pdf': ['.txt'],
    'pptx-to-pdf': ['.pptx'],
    'jpg-to-png': ['.jpg', '.jpeg'],
    'png-to-jpg': ['.png'],
    'heic-to-jpg': ['.heic'],
    'webp-to-jpg': ['.webp'],
    'svg-to-png': ['.svg'],
    'remove-background': ['.jpg', '.jpeg', '.png', '.webp', '.bmp'],
    'image-upscaler': ['.jpg', '.jpeg', '.png', '.webp', '.bmp'],
    'mp4-to-mp3': ['.mp4'],
    'mov-to-mp4': ['.mov'],
    'wav-to-mp3': ['.wav'],
    'srt-to-vtt': ['.srt'],
    'epub-to-mobi': ['.epub'],
    'mobi-to-epub': ['.mobi', '.azw'],
    'json-to-csv': ['.json']
  }

  return formatMap[converterId] || []
}

export function getMimeTypesForConverter(converterId: string): string[] {
  const mimeMap: Record<string, string[]> = {
    'pdf-to-docx': ['application/pdf'],
    'docx-to-pdf': ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    'pdf-to-txt': ['application/pdf'],
    'txt-to-pdf': ['text/plain'],
    'pptx-to-pdf': ['application/vnd.openxmlformats-officedocument.presentationml.presentation'],
    'jpg-to-png': ['image/jpeg'],
    'png-to-jpg': ['image/png'],
    'heic-to-jpg': ['image/heic', 'image/heif'],
    'webp-to-jpg': ['image/webp'],
    'svg-to-png': ['image/svg+xml'],
    'remove-background': ['image/jpeg', 'image/png', 'image/webp', 'image/bmp'],
    'image-upscaler': ['image/jpeg', 'image/png', 'image/webp', 'image/bmp'],
    'mp4-to-mp3': ['video/mp4'],
    'mov-to-mp4': ['video/quicktime'],
    'wav-to-mp3': ['audio/wav'],
    'srt-to-vtt': ['text/plain'],
    'epub-to-mobi': ['application/epub+zip'],
    'mobi-to-epub': ['application/x-mobipocket-ebook'],
    'json-to-csv': ['application/json']
  }

  return mimeMap[converterId] || []
}
