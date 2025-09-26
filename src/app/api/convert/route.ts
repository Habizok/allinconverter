import { NextRequest, NextResponse } from 'next/server'
import { queueManager } from '@/lib/queue'
import { storageManager } from '@/lib/storage'
import { validateFile } from '@/lib/validation'
import { rateLimitMiddleware } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResponse = await rateLimitMiddleware(request, 'convert')
  if (rateLimitResponse) {
    return rateLimitResponse
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const converter = formData.get('converter') as string
    const options = JSON.parse(formData.get('options') as string || '{}')

    if (!file || !converter) {
      return NextResponse.json(
        { error: 'Missing file or converter type' },
        { status: 400 }
      )
    }

    // Enhanced file validation with magic bytes
    const validationResult = await validateFile(file, {
      maxSize: 512 * 1024 * 1024, // 512MB
      allowedTypes: [], // Will be checked by magic bytes
      allowedExtensions: [], // Will be checked by magic bytes
      checkMagicBytes: true,
      converterId: converter
    })

    if (!validationResult.isValid) {
      return NextResponse.json(
        { error: validationResult.error || 'File validation failed' },
        { status: 415 } // Unsupported Media Type
      )
    }

    // Upload input file
    const inputKey = await storageManager.uploadFile(file, 'input')
    
    // Generate output key
    const outputExtension = getOutputExtension(converter, file.name)
    const outputKey = storageManager.generateKey('output', outputExtension)

    // Create conversion job
    const jobId = await queueManager.createJob(converter, inputKey, outputKey, options)

    // Return only jobId - no direct download URL for security
    return NextResponse.json({
      jobId,
      status: 'pending',
      progress: 0,
      message: 'Conversion started. Use jobId to check status and get download URL.'
    })

  } catch (error) {
    console.error('Conversion error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function getOutputExtension(converter: string, inputFileName: string): string {
  const inputExtension = inputFileName.split('.').pop()?.toLowerCase()
  
  switch (converter) {
    case 'pdf-to-docx':
      return 'docx'
    case 'docx-to-pdf':
      return 'pdf'
    case 'pdf-to-txt':
      return 'txt'
    case 'txt-to-pdf':
      return 'pdf'
    case 'pptx-to-pdf':
      return 'pdf'
    case 'jpg-to-png':
      return 'png'
    case 'png-to-jpg':
      return 'jpg'
    case 'heic-to-jpg':
      return 'jpg'
    case 'webp-to-jpg':
      return 'jpg'
    case 'svg-to-png':
      return 'png'
    case 'remove-background':
      return 'png'
    case 'image-upscaler':
      return inputExtension || 'png'
    case 'mp4-to-mp3':
      return 'mp3'
    case 'mov-to-mp4':
      return 'mp4'
    case 'wav-to-mp3':
      return 'mp3'
    case 'srt-to-vtt':
      return 'vtt'
    case 'epub-to-mobi':
      return 'mobi'
    case 'mobi-to-epub':
      return 'epub'
    case 'json-to-csv':
      return 'csv'
    default:
      return inputExtension || 'bin'
  }
}
