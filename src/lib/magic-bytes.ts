// src/lib/magic-bytes.ts
// Magic bytes detection for file type validation

export interface FileTypeInfo {
  mimeType: string
  extension: string
  description: string
}

// Magic bytes signatures for common file types
const MAGIC_SIGNATURES: Record<string, FileTypeInfo> = {
  // PDF
  '25504446': { mimeType: 'application/pdf', extension: 'pdf', description: 'PDF Document' },
  
  // Microsoft Office Documents
  '504B0304': { mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', extension: 'docx', description: 'Word Document' },
  '504B0506': { mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', extension: 'docx', description: 'Word Document' },
  '504B0708': { mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', extension: 'docx', description: 'Word Document' },
  
  // PowerPoint
  '504B030414000600': { mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', extension: 'pptx', description: 'PowerPoint Presentation' },
  
  // Excel
  '504B030414000800': { mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', extension: 'xlsx', description: 'Excel Spreadsheet' },
  
  // Legacy Office Documents
  'D0CF11E0A1B11AE1': { mimeType: 'application/msword', extension: 'doc', description: 'Legacy Word Document' },
  
  // Images
  'FFD8FF': { mimeType: 'image/jpeg', extension: 'jpg', description: 'JPEG Image' },
  '89504E47': { mimeType: 'image/png', extension: 'png', description: 'PNG Image' },
  '47494638': { mimeType: 'image/gif', extension: 'gif', description: 'GIF Image' },
  '52494646': { mimeType: 'image/webp', extension: 'webp', description: 'WebP Image' },
  '3C3F786D6C': { mimeType: 'image/svg+xml', extension: 'svg', description: 'SVG Image' },
  
  // HEIC/HEIF
  '0000001866747970': { mimeType: 'image/heic', extension: 'heic', description: 'HEIC Image' },
  '0000002066747970': { mimeType: 'image/heif', extension: 'heif', description: 'HEIF Image' },
  
  // Audio
  '494433': { mimeType: 'audio/mpeg', extension: 'mp3', description: 'MP3 Audio' },
  '52494646': { mimeType: 'audio/wav', extension: 'wav', description: 'WAV Audio' },
  '664C6143': { mimeType: 'audio/flac', extension: 'flac', description: 'FLAC Audio' },
  
  // Video
  '00000018667479706D703432': { mimeType: 'video/mp4', extension: 'mp4', description: 'MP4 Video' },
  '00000020667479706D703432': { mimeType: 'video/mp4', extension: 'mp4', description: 'MP4 Video' },
  '00000018667479706D703432': { mimeType: 'video/mp4', extension: 'mp4', description: 'MP4 Video' },
  
  // MOV/QuickTime
  '000000146674797071742020': { mimeType: 'video/quicktime', extension: 'mov', description: 'QuickTime Video' },
  
  // AVI
  '52494646': { mimeType: 'video/x-msvideo', extension: 'avi', description: 'AVI Video' },
  
  // WebM
  '1A45DFA3': { mimeType: 'video/webm', extension: 'webm', description: 'WebM Video' },
  
  // Text files
  'EFBBBF': { mimeType: 'text/plain', extension: 'txt', description: 'UTF-8 Text' },
  
  // JSON
  '7B': { mimeType: 'application/json', extension: 'json', description: 'JSON Data' },
  
  // CSV
  '2C': { mimeType: 'text/csv', extension: 'csv', description: 'CSV Data' },
  
  // EPUB
  '504B0304': { mimeType: 'application/epub+zip', extension: 'epub', description: 'EPUB E-book' },
  
  // MOBI
  '504B0304': { mimeType: 'application/x-mobipocket-ebook', extension: 'mobi', description: 'MOBI E-book' },
  
  // SRT
  '31': { mimeType: 'application/x-subrip', extension: 'srt', description: 'SubRip Subtitle' },
  
  // VTT
  '57454256': { mimeType: 'text/vtt', extension: 'vtt', description: 'WebVTT Subtitle' },
  
  // RTF
  '7B5C727466': { mimeType: 'application/rtf', extension: 'rtf', description: 'Rich Text Format' },
  
  // BMP
  '424D': { mimeType: 'image/bmp', extension: 'bmp', description: 'Bitmap Image' },
  
  // TIFF
  '49492A00': { mimeType: 'image/tiff', extension: 'tiff', description: 'TIFF Image' },
  '4D4D002A': { mimeType: 'image/tiff', extension: 'tiff', description: 'TIFF Image' }
}

/**
 * Detect file type from magic bytes
 * @param buffer - First 4KB of file data
 * @returns FileTypeInfo or null if not recognized
 */
export function detectFileType(buffer: Buffer): FileTypeInfo | null {
  if (!buffer || buffer.length === 0) {
    return null
  }

  // Convert buffer to hex string for comparison
  const hex = buffer.toString('hex').toUpperCase()
  
  // Check against all known signatures (longest first for accuracy)
  const signatures = Object.keys(MAGIC_SIGNATURES).sort((a, b) => b.length - a.length)
  
  for (const signature of signatures) {
    if (hex.startsWith(signature)) {
      return MAGIC_SIGNATURES[signature]
    }
  }
  
  return null
}

/**
 * Validate file type against expected converter format
 * @param buffer - File buffer
 * @param converterId - Converter identifier
 * @returns Validation result
 */
export function validateFileType(buffer: Buffer, converterId: string): { isValid: boolean; detectedType?: FileTypeInfo; error?: string } {
  const detectedType = detectFileType(buffer)
  
  if (!detectedType) {
    return {
      isValid: false,
      error: 'Unable to determine file type from content'
    }
  }

  // Define expected types for each converter
  const converterExpectedTypes: Record<string, string[]> = {
    // Document converters
    'pdf-to-docx': ['application/pdf'],
    'docx-to-pdf': ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    'doc-to-pdf': ['application/msword'],
    'rtf-to-pdf': ['application/rtf'],
    'pdf-to-txt': ['application/pdf'],
    'txt-to-pdf': ['text/plain'],
    'pptx-to-pdf': ['application/vnd.openxmlformats-officedocument.presentationml.presentation'],
    'epub-to-mobi': ['application/epub+zip'],
    'mobi-to-epub': ['application/x-mobipocket-ebook'],
    
    // Image converters
    'jpg-to-png': ['image/jpeg'],
    'png-to-jpg': ['image/png'],
    'heic-to-jpg': ['image/heic', 'image/heif'],
    'webp-to-jpg': ['image/webp'],
    'svg-to-png': ['image/svg+xml'],
    'bmp-to-jpg': ['image/bmp'],
    'tiff-to-jpg': ['image/tiff'],
    'jpg-to-webp': ['image/jpeg'],
    'png-to-webp': ['image/png'],
    'remove-background': ['image/jpeg', 'image/png', 'image/webp'],
    'image-upscaler': ['image/jpeg', 'image/png', 'image/webp'],
    'image-compress': ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    'add-watermark': ['image/jpeg', 'image/png', 'application/pdf'],
    'crop-image': ['image/jpeg', 'image/png', 'image/webp'],
    'resize-image': ['image/jpeg', 'image/png', 'image/webp'],
    
    // Audio converters
    'mp4-to-mp3': ['video/mp4'],
    'wav-to-mp3': ['audio/wav'],
    'mp3-to-wav': ['audio/mpeg'],
    'aac-to-mp3': ['audio/mpeg'], // AAC files often have MP3-like headers
    'flac-to-mp3': ['audio/flac'],
    
    // Video converters
    'mov-to-mp4': ['video/quicktime'],
    'avi-to-mp4': ['video/x-msvideo'],
    'mkv-to-mp4': ['video/x-matroska'], // MKV detection would need additional signature
    'mp4-to-gif': ['video/mp4'],
    'gif-to-mp4': ['image/gif'],
    'video-compress': ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm'],
    
    // Data converters
    'xlsx-to-csv': ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    'csv-to-xlsx': ['text/csv'],
    'json-to-csv': ['application/json'],
    'srt-to-vtt': ['application/x-subrip'],
    
    // Compression tools
    'pdf-compress': ['application/pdf']
  }

  const expectedTypes = converterExpectedTypes[converterId]
  
  if (!expectedTypes) {
    return {
      isValid: false,
      error: `Unknown converter: ${converterId}`
    }
  }

  if (!expectedTypes.includes(detectedType.mimeType)) {
    return {
      isValid: false,
      detectedType,
      error: `File type ${detectedType.mimeType} (${detectedType.description}) is not supported for ${converterId}. Expected: ${expectedTypes.join(', ')}`
    }
  }

  return {
    isValid: true,
    detectedType
  }
}

/**
 * Get file type info from buffer
 * @param buffer - File buffer
 * @returns FileTypeInfo or null
 */
export function getFileTypeInfo(buffer: Buffer): FileTypeInfo | null {
  return detectFileType(buffer)
}
