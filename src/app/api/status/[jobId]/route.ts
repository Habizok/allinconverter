import { NextRequest, NextResponse } from 'next/server'
import { queueManager } from '@/lib/queue'
import { storageManager } from '@/lib/storage'
import { rateLimitMiddleware } from '@/lib/rate-limit'

export async function GET(
  request: NextRequest,
  { params }: { params: { jobId: string } }
) {
  // Apply rate limiting
  const rateLimitResponse = await rateLimitMiddleware(request, 'status')
  if (rateLimitResponse) {
    return rateLimitResponse
  }

  try {
    const { jobId } = params

    const job = await queueManager.getJobStatus(jobId)
    
    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      )
    }

    // For security: never return direct download URL in status response
    // Client must use /api/download endpoint with proper validation
    const response: any = {
      id: job.id,
      status: job.status,
      progress: job.progress,
      error: job.error,
      createdAt: job.createdAt
    }

    // Only indicate if file is ready for download
    if (job.status === 'completed' && job.outputKey) {
      response.downloadReady = true
      response.downloadEndpoint = `/api/download?key=${job.outputKey}&jobId=${jobId}`
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Status check error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
