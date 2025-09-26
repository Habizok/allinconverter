import { NextRequest, NextResponse } from 'next/server'
import { queueManager } from '@/lib/queue'
import { storageManager } from '@/lib/storage'

export async function GET(
  request: NextRequest,
  { params }: { params: { jobId: string } }
) {
  try {
    const { jobId } = params

    const job = await queueManager.getJobStatus(jobId)
    
    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      )
    }

    let downloadUrl = null
    if (job.status === 'completed' && job.outputKey) {
      downloadUrl = await storageManager.getFileUrl(job.outputKey)
    }

    return NextResponse.json({
      id: job.id,
      status: job.status,
      progress: job.progress,
      error: job.error,
      downloadUrl,
      createdAt: job.createdAt
    })

  } catch (error) {
    console.error('Status check error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
