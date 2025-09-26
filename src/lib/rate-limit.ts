import { NextRequest } from 'next/server'
import IORedis from 'ioredis'

const redis = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379')

interface RateLimitConfig {
  windowMs: number // Time window in milliseconds
  maxRequests: number // Maximum requests per window
  keyGenerator?: (req: NextRequest) => string
}

interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  resetTime: number
  retryAfter?: number
}

export class RateLimiter {
  private config: RateLimitConfig

  constructor(config: RateLimitConfig) {
    this.config = config
  }

  async checkLimit(req: NextRequest): Promise<RateLimitResult> {
    const key = this.generateKey(req)
    const now = Date.now()
    const windowStart = now - this.config.windowMs

    try {
      // Use Redis sorted set to track requests
      const pipeline = redis.pipeline()
      
      // Remove old entries
      pipeline.zremrangebyscore(key, 0, windowStart)
      
      // Count current requests
      pipeline.zcard(key)
      
      // Add current request
      pipeline.zadd(key, now, `${now}-${Math.random()}`)
      
      // Set expiration
      pipeline.expire(key, Math.ceil(this.config.windowMs / 1000))
      
      const results = await pipeline.exec()
      
      if (!results) {
        throw new Error('Redis pipeline failed')
      }

      const currentCount = results[1][1] as number
      const remaining = Math.max(0, this.config.maxRequests - currentCount - 1)
      const resetTime = now + this.config.windowMs

      if (currentCount >= this.config.maxRequests) {
        return {
          success: false,
          limit: this.config.maxRequests,
          remaining: 0,
          resetTime,
          retryAfter: Math.ceil((resetTime - now) / 1000)
        }
      }

      return {
        success: true,
        limit: this.config.maxRequests,
        remaining,
        resetTime
      }
    } catch (error) {
      console.error('Rate limit check failed:', error)
      // Fail open - allow request if Redis is down
      return {
        success: true,
        limit: this.config.maxRequests,
        remaining: this.config.maxRequests,
        resetTime: now + this.config.windowMs
      }
    }
  }

  private generateKey(req: NextRequest): string {
    if (this.config.keyGenerator) {
      return this.config.keyGenerator(req)
    }

    // Default: IP-based rate limiting
    const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown'
    const endpoint = req.nextUrl.pathname
    
    return `rate_limit:${endpoint}:${ip}`
  }
}

// Pre-configured rate limiters
export const apiRateLimiter = new RateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 60, // 60 requests per minute
  keyGenerator: (req) => {
    const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown'
    return `api_limit:${ip}`
  }
})

export const uploadRateLimiter = new RateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 10, // 10 uploads per minute
  keyGenerator: (req) => {
    const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown'
    return `upload_limit:${ip}`
  }
})

export const downloadRateLimiter = new RateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 30, // 30 downloads per minute
  keyGenerator: (req) => {
    const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown'
    return `download_limit:${ip}`
  }
})

// Utility function to create rate limit headers
export function createRateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': Math.ceil(result.resetTime / 1000).toString(),
    ...(result.retryAfter && { 'Retry-After': result.retryAfter.toString() })
  }
}

// Middleware helper for rate limiting
export async function withRateLimit(
  req: NextRequest,
  limiter: RateLimiter,
  onLimitExceeded?: (result: RateLimitResult) => Response
): Promise<{ success: boolean; result: RateLimitResult; response?: Response }> {
  const result = await limiter.checkLimit(req)
  
  if (!result.success) {
    const response = onLimitExceeded ? onLimitExceeded(result) : new Response(
      JSON.stringify({
        error: 'Rate limit exceeded',
        retryAfter: result.retryAfter
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          ...createRateLimitHeaders(result)
        }
      }
    )
    
    return { success: false, result, response }
  }
  
  return { success: true, result }
}
