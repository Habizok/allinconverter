import { NextRequest, NextResponse } from 'next/server'
import { storageManager } from '@/lib/storage'
import { queueManager } from '@/lib/queue'
import { rateLimitMiddleware } from '@/lib/rate-limit'

export async function GET(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResponse = await rateLimitMiddleware(request, 'download')
  if (rateLimitResponse) {
    return rateLimitResponse
  }

  try {
    const { searchParams } = new URL(request.url)
    const key = searchParams.get('key')
    const jobId = searchParams.get('jobId')

    if (!key || !jobId) {
      return NextResponse.json(
        { error: 'Missing key or jobId parameter' },
        { status: 400 }
      )
    }

    // Verify job exists and is completed
    const job = await queueManager.getJobStatus(jobId)
    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      )
    }

    if (job.status !== 'completed') {
      return NextResponse.json(
        { error: 'Job not completed yet' },
        { status: 400 }
      )
    }

    if (job.outputKey !== key) {
      return NextResponse.json(
        { error: 'Invalid download key' },
        { status: 403 }
      )
    }

    // Enhanced security logging
    const clientIP = request.ip || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const referer = request.headers.get('referer') || 'unknown'
    
    console.log(`Download requested: jobId=${jobId}, key=${key}, ip=${clientIP}, userAgent=${userAgent}, referer=${referer}`)

    // Generate short-lived signed URL (5 minutes max)
    const downloadUrl = await storageManager.getFileUrl(key, 300) // 5 minutes
    
    // Log successful download generation
    console.log(`Download URL generated for jobId=${jobId}, expires in 5 minutes`)

    return NextResponse.json({
      downloadUrl,
      expiresIn: 300, // 5 minutes
      fileName: key.split('/').pop() || 'download',
      message: 'Download URL generated. File will be available for 5 minutes.'
    })

  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
