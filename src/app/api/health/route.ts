// src/app/api/health/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'
import { S3Client, HeadBucketCommand } from '@aws-sdk/client-s3'

// Initialize Redis client
const redis = new Redis({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  token: process.env.REDIS_TOKEN || 'local_token',
})

// Initialize S3 client for R2
const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
})

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy'
  timestamp: string
  services: {
    web: {
      status: 'healthy' | 'unhealthy'
      responseTime: number
    }
    redis: {
      status: 'healthy' | 'unhealthy'
      responseTime: number
      error?: string
    }
    r2: {
      status: 'healthy' | 'unhealthy'
      responseTime: number
      error?: string
    }
  }
  uptime: number
  version: string
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const startTime = Date.now()
  const healthStatus: HealthStatus = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      web: {
        status: 'healthy',
        responseTime: 0
      },
      redis: {
        status: 'unhealthy',
        responseTime: 0
      },
      r2: {
        status: 'unhealthy',
        responseTime: 0
      }
    },
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0'
  }

  let overallHealthy = true

  // Check Redis
  try {
    const redisStart = Date.now()
    await redis.ping()
    healthStatus.services.redis.responseTime = Date.now() - redisStart
    healthStatus.services.redis.status = 'healthy'
  } catch (error) {
    healthStatus.services.redis.status = 'unhealthy'
    healthStatus.services.redis.error = error instanceof Error ? error.message : 'Unknown error'
    overallHealthy = false
  }

  // Check R2 Storage
  try {
    const r2Start = Date.now()
    await s3Client.send(new HeadBucketCommand({ 
      Bucket: process.env.R2_BUCKET_NAME || 'aic-files' 
    }))
    healthStatus.services.r2.responseTime = Date.now() - r2Start
    healthStatus.services.r2.status = 'healthy'
  } catch (error) {
    healthStatus.services.r2.status = 'unhealthy'
    healthStatus.services.r2.error = error instanceof Error ? error.message : 'Unknown error'
    overallHealthy = false
  }

  // Calculate web response time
  healthStatus.services.web.responseTime = Date.now() - startTime

  // Determine overall status
  if (overallHealthy) {
    healthStatus.status = 'healthy'
  } else {
    healthStatus.status = 'degraded'
  }

  // Return appropriate HTTP status
  const httpStatus = healthStatus.status === 'healthy' ? 200 : 503

  return NextResponse.json(healthStatus, { 
    status: httpStatus,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  })
}
