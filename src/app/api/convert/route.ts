import { NextRequest, NextResponse } from 'next/server'
import { queueManager } from '@/lib/queue'
import { storageManager } from '@/lib/storage'

export async function POST(request: NextRequest) {
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

    // Validate file size (512MB limit)
    const maxSize = 512 * 1024 * 1024 // 512MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 512MB.' },
        { status: 400 }
      )
    }

    // Upload input file
    const inputKey = await storageManager.uploadFile(file, 'input')
    
    // Generate output key
    const outputExtension = getOutputExtension(converter, file.name)
    const outputKey = storageManager.generateKey('output', outputExtension)

    // Create conversion job
    const jobId = await queueManager.createJob(converter, inputKey, outputKey, options)

    return NextResponse.json({
      jobId,
      status: 'pending',
      progress: 0
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
