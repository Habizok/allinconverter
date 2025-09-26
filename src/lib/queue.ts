import Redis from 'ioredis'
import { v4 as uuidv4 } from 'uuid'

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379')

export interface ConversionJob {
  id: string
  converter: string
  inputKey: string
  outputKey: string
  options?: Record<string, any>
  createdAt: string
  status: 'pending' | 'downloading' | 'processing' | 'uploading' | 'completed' | 'failed'
  progress: number
  error?: string
}

export interface JobOptions {
  bitrate?: string
  quality?: string
  resolution?: number
  scale?: number
}

export class QueueManager {
  private redis: Redis

  constructor() {
    this.redis = redis
  }

  async createJob(
    converter: string,
    inputKey: string,
    outputKey: string,
    options: JobOptions = {}
  ): Promise<string> {
    const jobId = uuidv4()
    const job: ConversionJob = {
      id: jobId,
      converter,
      inputKey,
      outputKey,
      options,
      createdAt: new Date().toISOString(),
      status: 'pending',
      progress: 0
    }

    // Store job data
    await this.redis.hset(`job:${jobId}`, job)

    // Add to appropriate queue
    const queueName = this.getQueueName(converter)
    await this.redis.lpush(queueName, JSON.stringify(job))

    return jobId
  }

  async getJobStatus(jobId: string): Promise<ConversionJob | null> {
    const jobData = await this.redis.hgetall(`job:${jobId}`)
    if (!jobData || Object.keys(jobData).length === 0) {
      return null
    }

    return {
      id: jobId,
      converter: jobData.converter,
      inputKey: jobData.inputKey,
      outputKey: jobData.outputKey,
      options: jobData.options ? JSON.parse(jobData.options) : {},
      createdAt: jobData.createdAt,
      status: jobData.status as ConversionJob['status'],
      progress: parseInt(jobData.progress) || 0,
      error: jobData.error
    }
  }

  async updateJobStatus(
    jobId: string,
    status: ConversionJob['status'],
    progress: number = 0,
    error?: string
  ): Promise<void> {
    const updates: Record<string, string> = {
      status,
      progress: progress.toString()
    }

    if (error) {
      updates.error = error
    }

    await this.redis.hset(`job:${jobId}`, updates)
  }

  private getQueueName(converter: string): string {
    // Map converters to appropriate queues
    if (converter.includes('pdf') || converter.includes('docx') || converter.includes('txt') || converter.includes('pptx')) {
      return 'doc_queue'
    }
    
    if (converter.includes('jpg') || converter.includes('png') || converter.includes('heic') || 
        converter.includes('webp') || converter.includes('svg') || converter.includes('background') || 
        converter.includes('upscaler')) {
      return 'img_queue'
    }
    
    if (converter.includes('mp4') || converter.includes('mp3') || converter.includes('mov') || 
        converter.includes('wav') || converter.includes('srt') || converter.includes('vtt')) {
      return 'av_queue'
    }

    // Default to document queue
    return 'doc_queue'
  }

  async getQueueStats(): Promise<Record<string, number>> {
    const queues = ['doc_queue', 'img_queue', 'av_queue']
    const stats: Record<string, number> = {}

    for (const queue of queues) {
      const length = await this.redis.llen(queue)
      stats[queue] = length
    }

    return stats
  }

  async cleanup(): Promise<void> {
    // This would be called by the janitor worker
    // Implementation is in the janitor worker
  }
}

export const queueManager = new QueueManager()
