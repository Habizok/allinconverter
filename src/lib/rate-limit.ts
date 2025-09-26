// src/lib/rate-limit.ts
// Enhanced rate limiting for critical endpoints

import { NextRequest, NextResponse } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Initialize Redis for rate limiting
const redis = new Redis({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  token: process.env.REDIS_TOKEN || 'local_token',
})

// Different rate limits for different endpoint types
const rateLimiters = {
  // File upload endpoints - stricter limits
  upload: new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(5, '60s'), // 5 uploads per minute
    analytics: true,
    prefix: '@upstash/ratelimit/upload',
  }),
  
  // Conversion endpoints - moderate limits
  convert: new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(10, '60s'), // 10 conversions per minute
    analytics: true,
    prefix: '@upstash/ratelimit/convert',
  }),
  
  // Download endpoints - stricter limits
  download: new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(20, '60s'), // 20 downloads per minute
    analytics: true,
    prefix: '@upstash/ratelimit/download',
  }),
  
  // General API endpoints
  api: new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(30, '60s'), // 30 requests per minute
    analytics: true,
    prefix: '@upstash/ratelimit/api',
  }),
  
  // Status check endpoints - more lenient
  status: new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(60, '60s'), // 60 status checks per minute
    analytics: true,
    prefix: '@upstash/ratelimit/status',
  })
}

export type RateLimitType = keyof typeof rateLimiters

/**
 * Apply rate limiting to a request
 * @param request - Next.js request object
 * @param type - Type of endpoint for appropriate rate limiting
 * @returns Rate limit result or null if limit exceeded
 */
export async function applyRateLimit(
  request: NextRequest, 
  type: RateLimitType = 'api'
): Promise<{ success: boolean; limit: number; remaining: number; reset: number } | null> {
  try {
    // Get client IP and User Agent for rate limiting
    const ip = getClientIP(request)
    const userAgent = request.headers.get('user-agent') || 'unknown'
    
    // Create unique identifier combining IP and User Agent
    const identifier = `${ip}:${userAgent}`
    
    const limiter = rateLimiters[type]
    const { success, limit, remaining, reset } = await limiter.limit(identifier)
    
    return { success, limit, remaining, reset }
  } catch (error) {
    console.error('Rate limiting error:', error)
    // In case of Redis failure, allow the request but log the error
    return { success: true, limit: 0, remaining: 0, reset: 0 }
  }
}

/**
 * Get client IP address from request
 * @param request - Next.js request object
 * @returns Client IP address
 */
function getClientIP(request: NextRequest): string {
  // Check for forwarded IP (from proxy/load balancer)
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  // Check for real IP header
  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP
  }
  
  // Check for CF-Connecting-IP (Cloudflare)
  const cfIP = request.headers.get('cf-connecting-ip')
  if (cfIP) {
    return cfIP
  }
  
  // Fallback to request IP
  return request.ip || '127.0.0.1'
}

/**
 * Create rate limit response
 * @param limit - Rate limit info
 * @returns NextResponse with 429 status
 */
export function createRateLimitResponse(limit: { limit: number; remaining: number; reset: number }): NextResponse {
  const response = NextResponse.json(
    { 
      error: 'Too many requests',
      message: 'Rate limit exceeded. Please try again later.',
      retryAfter: Math.ceil((limit.reset - Date.now()) / 1000)
    },
    { status: 429 }
  )
  
  // Add rate limit headers
  response.headers.set('X-RateLimit-Limit', limit.limit.toString())
  response.headers.set('X-RateLimit-Remaining', limit.remaining.toString())
  response.headers.set('X-RateLimit-Reset', limit.reset.toString())
  response.headers.set('Retry-After', Math.ceil((limit.reset - Date.now()) / 1000).toString())
  
  return response
}

/**
 * Middleware function for rate limiting
 * @param request - Next.js request object
 * @param type - Rate limit type
 * @returns NextResponse or null (if request should proceed)
 */
export async function rateLimitMiddleware(
  request: NextRequest,
  type: RateLimitType = 'api'
): Promise<NextResponse | null> {
  const limitResult = await applyRateLimit(request, type)
  
  if (!limitResult) {
    // Redis error - allow request but log
    console.warn('Rate limiting disabled due to Redis error')
    return null
  }
  
  if (!limitResult.success) {
    return createRateLimitResponse(limitResult)
  }
  
  return null // Request can proceed
}

/**
 * Log rate limit events for monitoring
 * @param request - Next.js request object
 * @param type - Rate limit type
 * @param limit - Rate limit info
 */
export function logRateLimitEvent(
  request: NextRequest,
  type: RateLimitType,
  limit: { success: boolean; limit: number; remaining: number; reset: number }
): void {
  const ip = getClientIP(request)
  const userAgent = request.headers.get('user-agent') || 'unknown'
  const endpoint = request.nextUrl.pathname
  
  console.log(`Rate limit event: ${type} - IP: ${ip} - Endpoint: ${endpoint} - Success: ${limit.success} - Remaining: ${limit.remaining}`)
  
  // Log to external monitoring service if configured
  if (process.env.NODE_ENV === 'production' && !limit.success) {
    // TODO: Send to monitoring service (Sentry, DataDog, etc.)
    console.warn(`Rate limit exceeded: ${ip} - ${endpoint} - ${type}`)
  }
}