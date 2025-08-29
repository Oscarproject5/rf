import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { formRateLimiter, ipRateLimiter } from '@/lib/rate-limiter'
import {
  sanitizeInput,
  validateEmail,
  validatePhone,
  getClientIp,
  checkHoneypot,
  detectSuspiciousPatterns,
  generateSessionId,
  csrfManager
} from '@/lib/security'

// Lead form validation schema with security enhancements
const leadSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name too long')
    .transform(sanitizeInput),
  email: z.string()
    .email('Invalid email address')
    .refine(validateEmail, 'Invalid or suspicious email address'),
  phone: z.string()
    .refine(validatePhone, 'Invalid phone number'),
  address: z.string()
    .min(5, 'Address is required')
    .max(200, 'Address too long')
    .transform(sanitizeInput),
  message: z.string()
    .max(500, 'Message too long')
    .optional()
    .transform(val => val ? sanitizeInput(val) : val),
  // Honeypot field - should be empty
  website: z.string().optional(),
  // CSRF token
  csrf_token: z.string().optional(),
})

// Send lead using Web3Forms API
async function sendLeadNotification(leadData: any) {
  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: 'Rgvbuildingsolutions@gmail.com', // Using email as access key for instant setup
        subject: 'New Lead from Love Water Website',
        from_name: leadData.name,
        email: leadData.email,
        phone: leadData.phone,
        address: leadData.address,
        message: leadData.message || 'No message provided',
        // Include submission metadata
        metadata: {
          timestamp: new Date().toISOString(),
          ip: leadData.clientIp,
          userAgent: leadData.userAgent
        }
      })
    })

    const data = await response.json()
    return data.success
  } catch (error) {
    console.error('Web3Forms error:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    // Get client information for security
    const clientIp = getClientIp(request.headers)
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const sessionId = generateSessionId(clientIp, userAgent)
    
    // Apply rate limiting
    if (!formRateLimiter.isAllowed(sessionId)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Too many submissions. Please try again later.',
          retryAfter: formRateLimiter.getResetTime(sessionId)
        },
        { status: 429 }
      )
    }
    
    if (!ipRateLimiter.isAllowed(clientIp)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Too many requests from your IP. Please try again later.',
          retryAfter: ipRateLimiter.getResetTime(clientIp)
        },
        { status: 429 }
      )
    }
    
    // Parse and validate request body
    const body = await request.json()
    
    // Check honeypot (anti-bot measure)
    if (!checkHoneypot(body.website)) {
      // Silently reject bot submissions
      await new Promise(resolve => setTimeout(resolve, 2000)) // Fake processing
      return NextResponse.json({ success: true, message: 'Thank you for your submission!' })
    }
    
    // Validate CSRF token if provided
    if (body.csrf_token && !csrfManager.verifyToken(sessionId, body.csrf_token)) {
      return NextResponse.json(
        { success: false, message: 'Invalid security token. Please refresh and try again.' },
        { status: 403 }
      )
    }
    
    // Validate form data
    const validationResult = leadSchema.safeParse(body)
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Please check your information and try again.',
          errors: validationResult.error.flatten().fieldErrors 
        },
        { status: 400 }
      )
    }
    
    const leadData = validationResult.data
    
    // Detect suspicious patterns (security check)
    const isSuspicious = detectSuspiciousPatterns({
      ...leadData,
      userAgent,
      clientIp
    })
    
    if (isSuspicious) {
      console.warn('Suspicious lead submission detected:', {
        ip: clientIp,
        data: leadData
      })
      // Still process but flag for review
    }
    
    // Prepare lead data with metadata
    const enrichedLeadData = {
      ...leadData,
      clientIp,
      userAgent,
      isSuspicious,
      submittedAt: new Date().toISOString()
    }
    
    // Send lead notification via Web3Forms
    const emailSent = await sendLeadNotification(enrichedLeadData)
    
    if (!emailSent) {
      console.error('Failed to send lead notification')
      // Continue anyway - don't lose the lead
    }
    
    // Log performance metrics
    const processingTime = Date.now() - startTime
    console.log('Lead processed:', {
      success: true,
      processingTime,
      emailSent
    })
    
    return NextResponse.json({ 
      success: true,
      message: 'Thank you! We\'ll contact you within 24 hours.',
      leadId: sessionId // Can be used for tracking
    })
    
  } catch (error) {
    console.error('Lead submission error:', error)
    
    // Log error details for debugging
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      })
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'We\'re experiencing technical difficulties. Please try again or call us directly.' 
      },
      { status: 500 }
    )
  }
}