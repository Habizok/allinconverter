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

    // Enhanced status response with detailed progress
    const response: any = {
      id: job.id,
      status: job.status,
      progress: job.progress || 0,
      error: job.error,
      createdAt: job.createdAt,
      updatedAt: new Date().toISOString()
    }

    // Add detailed progress information
    if (job.status === 'processing') {
      response.processingDetails = {
        stage: job.stage || 'converting',
        estimatedTimeRemaining: job.estimatedTimeRemaining || null,
        currentStep: job.currentStep || 'Processing file...'
      }
    }

    // Only indicate if file is ready for download
    if (job.status === 'completed' && job.outputKey) {
      response.downloadReady = true
      response.downloadEndpoint = `/api/download?key=${job.outputKey}&jobId=${jobId}`
      response.outputSize = job.outputSize || null
      response.processingTime = job.processingTime || null
    }

    // Add retry information if applicable
    if (job.status === 'retrying') {
      response.retryInfo = {
        attempt: job.retryAttempt || 1,
        maxRetries: job.maxRetries || 2,
        nextRetryAt: job.nextRetryAt || null
      }
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
