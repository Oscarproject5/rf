import { createHash, randomBytes } from 'crypto'
import DOMPurify from 'isomorphic-dompurify'

// CSRF Token Management
class CSRFTokenManager {
  private tokens: Map<string, { token: string; expires: number }> = new Map()

  generateToken(sessionId: string): string {
    const token = randomBytes(32).toString('hex')
    const expires = Date.now() + 3600000 // 1 hour
    
    this.tokens.set(sessionId, { token, expires })
    
    // Clean up expired tokens
    this.cleanup()
    
    return token
  }

  verifyToken(sessionId: string, token: string): boolean {
    const stored = this.tokens.get(sessionId)
    
    if (!stored) return false
    if (Date.now() > stored.expires) {
      this.tokens.delete(sessionId)
      return false
    }
    
    return stored.token === token
  }

  private cleanup() {
    const now = Date.now()
    for (const [key, value] of this.tokens.entries()) {
      if (now > value.expires) {
        this.tokens.delete(key)
      }
    }
  }
}

export const csrfManager = new CSRFTokenManager()

// Input Sanitization
export function sanitizeInput(input: string): string {
  // Remove any HTML/script tags
  let sanitized = DOMPurify.sanitize(input, { 
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  })
  
  // Remove any potential SQL injection patterns
  sanitized = sanitized.replace(/['";\\]/g, '')
  
  // Trim and normalize whitespace
  sanitized = sanitized.trim().replace(/\s+/g, ' ')
  
  return sanitized
}

// Email validation with additional security checks
export function validateEmail(email: string): boolean {
  // Basic format check
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!emailRegex.test(email)) return false
  
  // Check for common disposable email domains
  const disposableDomains = [
    'tempmail.com', 'throwaway.email', '10minutemail.com',
    'guerrillamail.com', 'mailinator.com', 'temp-mail.org'
  ]
  
  const domain = email.split('@')[1]?.toLowerCase()
  if (disposableDomains.some(d => domain?.includes(d))) {
    return false
  }
  
  // Length checks
  if (email.length > 254) return false
  
  return true
}

// Phone validation with security checks
export function validatePhone(phone: string): boolean {
  // Remove all non-digit characters for validation
  const digits = phone.replace(/\D/g, '')
  
  // Check for valid length (10-15 digits for international)
  if (digits.length < 10 || digits.length > 15) return false
  
  // Check for repetitive patterns (like 1111111111)
  if (/^(\d)\1{9,}$/.test(digits)) return false
  
  return true
}

// Generate session ID for tracking
export function generateSessionId(ip: string, userAgent: string): string {
  const data = `${ip}-${userAgent}-${Date.now()}`
  return createHash('sha256').update(data).digest('hex')
}

// Honeypot field check (should be empty)
export function checkHoneypot(value: string | undefined): boolean {
  return !value || value.trim() === ''
}

// IP address extraction with proxy support
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for')
  const real = headers.get('x-real-ip')
  const clientIp = headers.get('client-ip')
  
  if (forwarded) {
    // Take the first IP in the chain
    return forwarded.split(',')[0].trim()
  }
  
  return real || clientIp || 'unknown'
}

// Check for suspicious patterns in form data
export function detectSuspiciousPatterns(data: any): boolean {
  const suspicious = [
    // Common spam patterns
    /viagra|cialis|casino|lottery|prize|winner/i,
    // Excessive URLs
    /(https?:\/\/[^\s]+){3,}/i,
    // Excessive special characters
    /[!@#$%^&*()]{10,}/,
    // Base64 encoded content
    /^[A-Za-z0-9+/]{100,}={0,2}$/
  ]
  
  const dataString = JSON.stringify(data)
  return suspicious.some(pattern => pattern.test(dataString))
}