import { NextRequest, NextResponse } from 'next/server'
import { storageManager } from '@/lib/storage'
import { queueManager } from '@/lib/queue'

export async function GET(request: NextRequest) {
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

    // Log download attempt
    console.log(`Download requested: jobId=${jobId}, key=${key}, ip=${request.ip}, userAgent=${request.headers.get('user-agent')}`)

    // Generate signed URL with short expiration (5 minutes)
    const downloadUrl = await storageManager.getFileUrl(key)
    
    // TODO: Add analytics tracking here
    // await trackDownload(jobId, request.ip, request.headers.get('user-agent'))

    return NextResponse.json({
      downloadUrl,
      expiresIn: 300, // 5 minutes
      fileName: key.split('/').pop() || 'download'
    })

  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
