// src/app/api/admin/metrics/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'
import { rateLimitMiddleware } from '@/lib/rate-limit'

// Initialize Redis client
const redis = new Redis({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  token: process.env.REDIS_TOKEN || 'local_token',
})

interface QueueMetrics {
  name: string
  waiting: number
  active: number
  completed: number
  failed: number
  delayed: number
  paused: boolean
}

interface SystemMetrics {
  timestamp: string
  queues: QueueMetrics[]
  system: {
    uptime: number
    memory: {
      used: number
      total: number
      percentage: number
    }
    cpu: {
      load: number[]
    }
  }
  jobs: {
    total: number
    completed: number
    failed: number
    successRate: number
  }
  performance: {
    avgProcessingTime: number
    throughput: number
  }
}

// Simple admin authentication (in production, use proper auth)
function isAdmin(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  const adminKey = process.env.ADMIN_API_KEY || 'admin-key-123'
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false
  }
  
  const token = authHeader.substring(7)
  return token === adminKey
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  // Apply rate limiting
  const rateLimitResponse = await rateLimitMiddleware(request, 'api')
  if (rateLimitResponse) {
    return rateLimitResponse
  }

  // Check admin authentication
  if (!isAdmin(request)) {
    return NextResponse.json(
      { error: 'Unauthorized. Admin access required.' },
      { status: 401 }
    )
  }

  try {
    const metrics: SystemMetrics = {
      timestamp: new Date().toISOString(),
      queues: [],
      system: {
        uptime: process.uptime(),
        memory: {
          used: process.memoryUsage().heapUsed,
          total: process.memoryUsage().heapTotal,
          percentage: 0
        },
        cpu: {
          load: process.cpuUsage()
        }
      },
      jobs: {
        total: 0,
        completed: 0,
        failed: 0,
        successRate: 0
      },
      performance: {
        avgProcessingTime: 0,
        throughput: 0
      }
    }

    // Calculate memory percentage
    metrics.system.memory.percentage = Math.round(
      (metrics.system.memory.used / metrics.system.memory.total) * 100
    )

    // Get queue metrics
    const queueNames = ['doc_queue', 'img_queue', 'av_queue', 'janitor_queue']
    
    for (const queueName of queueNames) {
      try {
        // Get queue statistics from Redis
        const waiting = await redis.llen(`${queueName}:waiting`) || 0
        const active = await redis.llen(`${queueName}:active`) || 0
        const completed = await redis.llen(`${queueName}:completed`) || 0
        const failed = await redis.llen(`${queueName}:failed`) || 0
        const delayed = await redis.llen(`${queueName}:delayed`) || 0
        
        const queueMetrics: QueueMetrics = {
          name: queueName,
          waiting: Number(waiting),
          active: Number(active),
          completed: Number(completed),
          failed: Number(failed),
          delayed: Number(delayed),
          paused: false // Would need additional Redis key to track this
        }
        
        metrics.queues.push(queueMetrics)
        
        // Aggregate job statistics
        metrics.jobs.total += queueMetrics.completed + queueMetrics.failed
        metrics.jobs.completed += queueMetrics.completed
        metrics.jobs.failed += queueMetrics.failed
        
      } catch (error) {
        console.error(`Error getting metrics for queue ${queueName}:`, error)
        // Add empty metrics for failed queue
        metrics.queues.push({
          name: queueName,
          waiting: 0,
          active: 0,
          completed: 0,
          failed: 0,
          delayed: 0,
          paused: false
        })
      }
    }

    // Calculate success rate
    if (metrics.jobs.total > 0) {
      metrics.jobs.successRate = Math.round(
        (metrics.jobs.completed / metrics.jobs.total) * 100
      )
    }

    // Get recent job performance data
    try {
      const recentJobs = await redis.lrange('job:performance', 0, 99) // Last 100 jobs
      if (recentJobs.length > 0) {
        const processingTimes = recentJobs
          .map(job => JSON.parse(job))
          .filter(job => job.duration)
          .map(job => job.duration)
        
        if (processingTimes.length > 0) {
          metrics.performance.avgProcessingTime = Math.round(
            processingTimes.reduce((a, b) => a + b, 0) / processingTimes.length
          )
        }
      }
    } catch (error) {
      console.error('Error getting performance data:', error)
    }

    // Calculate throughput (jobs per hour)
    const uptimeHours = metrics.system.uptime / 3600
    if (uptimeHours > 0) {
      metrics.performance.throughput = Math.round(metrics.jobs.total / uptimeHours)
    }

    return NextResponse.json(metrics, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })

  } catch (error) {
    console.error('Error getting admin metrics:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve metrics' },
      { status: 500 }
    )
  }
}

// POST endpoint for clearing metrics/resetting counters
export async function POST(request: NextRequest): Promise<NextResponse> {
  // Apply rate limiting
  const rateLimitResponse = await rateLimitMiddleware(request, 'api')
  if (rateLimitResponse) {
    return rateLimitResponse
  }

  // Check admin authentication
  if (!isAdmin(request)) {
    return NextResponse.json(
      { error: 'Unauthorized. Admin access required.' },
      { status: 401 }
    )
  }

  try {
    const { action } = await request.json()
    
    if (action === 'clear_metrics') {
      // Clear performance data
      await redis.del('job:performance')
      
      return NextResponse.json({ 
        message: 'Metrics cleared successfully' 
      })
    }
    
    if (action === 'reset_queues') {
      // Clear all queue data (use with caution!)
      const queueNames = ['doc_queue', 'img_queue', 'av_queue', 'janitor_queue']
      
      for (const queueName of queueNames) {
        await redis.del(`${queueName}:waiting`)
        await redis.del(`${queueName}:active`)
        await redis.del(`${queueName}:completed`)
        await redis.del(`${queueName}:failed`)
        await redis.del(`${queueName}:delayed`)
      }
      
      return NextResponse.json({ 
        message: 'Queues reset successfully' 
      })
    }
    
    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )
    
  } catch (error) {
    console.error('Error processing admin action:', error)
    return NextResponse.json(
      { error: 'Failed to process action' },
      { status: 500 }
    )
  }
}
