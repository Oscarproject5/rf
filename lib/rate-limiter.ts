// Rate limiting implementation using in-memory store
// For production, consider using Redis or similar

interface RateLimitEntry {
  count: number
  resetTime: number
}

class RateLimiter {
  private store: Map<string, RateLimitEntry> = new Map()
  private readonly windowMs: number
  private readonly maxRequests: number

  constructor(windowMs: number = 60000, maxRequests: number = 5) {
    this.windowMs = windowMs
    this.maxRequests = maxRequests
    
    // Clean up expired entries every minute
    setInterval(() => this.cleanup(), 60000)
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now()
    const entry = this.store.get(identifier)

    if (!entry || now > entry.resetTime) {
      // Create new entry or reset expired one
      this.store.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs
      })
      return true
    }

    if (entry.count >= this.maxRequests) {
      return false
    }

    // Increment count
    entry.count++
    this.store.set(identifier, entry)
    return true
  }

  cleanup() {
    const now = Date.now()
    for (const [key, entry] of this.store.entries()) {
      if (now > entry.resetTime) {
        this.store.delete(key)
      }
    }
  }

  getRemainingRequests(identifier: string): number {
    const entry = this.store.get(identifier)
    if (!entry) return this.maxRequests
    return Math.max(0, this.maxRequests - entry.count)
  }

  getResetTime(identifier: string): number {
    const entry = this.store.get(identifier)
    return entry ? entry.resetTime : Date.now() + this.windowMs
  }
}

// Create instances for different rate limit tiers
export const formRateLimiter = new RateLimiter(60000, 3) // 3 requests per minute
export const ipRateLimiter = new RateLimiter(3600000, 10) // 10 requests per hour