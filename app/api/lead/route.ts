import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import nodemailer from 'nodemailer'
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

// Email configuration with validation
function getEmailTransporter() {
  const user = process.env.EMAIL_USER
  const pass = process.env.EMAIL_PASSWORD
  
  if (!user || !pass) {
    console.error('Email credentials not configured')
    return null
  }
  
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
    secure: true,
    tls: {
      rejectUnauthorized: true
    }
  })
}

// Send notification email to business with security headers
async function sendLeadNotification(data: any) {
  const transporter = getEmailTransporter()
  if (!transporter) return false
  
  // Sanitize all data before sending
  const safeData = {
    name: sanitizeInput(data.name),
    email: data.email, // Already validated
    phone: data.phone, // Already validated
    address: sanitizeInput(data.address),
    message: data.message ? sanitizeInput(data.message) : ''
  }
  
  const mailOptions = {
    from: `"Love Water Website" <${process.env.EMAIL_USER}>`,
    to: 'Rgvbuildingsolutions@gmail.com',
    subject: `New Water Test Request from ${safeData.name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>New Lead Notification</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background: #f4f4f4;">
          <div style="background: white; padding: 20px; border-radius: 8px;">
            <h2 style="color: #333;">New Lead from Love Water Website</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${safeData.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${safeData.email}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${safeData.phone}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Address:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${safeData.address}</td>
              </tr>
              ${safeData.message ? `
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Message:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${safeData.message}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 10px;"><strong>Submitted at:</strong></td>
                <td style="padding: 10px;">${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })}</td>
              </tr>
            </table>
            <div style="margin-top: 20px; padding: 15px; background: #e8f5e9; border-radius: 4px;">
              <p style="margin: 0; color: #2e7d32;"><strong>Action Required:</strong> Please contact this lead within 24 hours.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      New Lead from Love Water Website
      
      Name: ${safeData.name}
      Email: ${safeData.email}
      Phone: ${safeData.phone}
      Address: ${safeData.address}
      ${safeData.message ? `Message: ${safeData.message}` : ''}
      Submitted at: ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })}
    `,
    headers: {
      'X-Priority': '1',
      'X-MSMail-Priority': 'High',
      'Importance': 'high'
    }
  }
  
  try {
    await transporter.sendMail(mailOptions)
    console.log('Lead notification sent to Rgvbuildingsolutions@gmail.com')
    return true
  } catch (error) {
    console.error('Error sending lead notification:', error)
    return false
  }
}

// Send auto-response to customer with security best practices
async function sendAutoResponse(email: string, name: string) {
  const transporter = getEmailTransporter()
  if (!transporter) return false
  
  const safeName = sanitizeInput(name)
  
  const mailOptions = {
    from: `"Love Water RGV" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Thank You for Your Water Test Request - Love Water',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Thank You</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0;">Thank You, ${safeName}!</h1>
          </div>
          <div style="background: white; padding: 30px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 8px 8px;">
            <p style="font-size: 16px;">We've received your request for a <strong>free water test</strong>.</p>
            <div style="background: #f0f7ff; padding: 20px; border-left: 4px solid #0ea5e9; margin: 20px 0;">
              <p style="margin: 0;"><strong>What happens next?</strong></p>
              <ul style="margin: 10px 0 0 0;">
                <li>One of our water specialists will contact you within 24 hours</li>
                <li>We'll schedule your complimentary water analysis at your convenience</li>
                <li>You'll receive a detailed report of your water quality</li>
              </ul>
            </div>
            <p>If you have any urgent questions, please don't hesitate to call us at:</p>
            <p style="font-size: 24px; color: #0ea5e9; font-weight: bold; text-align: center;">
              (956) 579-1750
            </p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="margin: 0;">Best regards,<br><strong>The Love Water Team</strong></p>
          </div>
          <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
            <p>© ${new Date().getFullYear()} Love Water RGV. All rights reserved.</p>
            <p>This is an automated message. Please do not reply directly to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Thank you, ${safeName}!
      
      We've received your request for a free water test.
      
      What happens next?
      - One of our water specialists will contact you within 24 hours
      - We'll schedule your complimentary water analysis at your convenience
      - You'll receive a detailed report of your water quality
      
      If you have any urgent questions, please call us at: (956) 579-1750
      
      Best regards,
      The Love Water Team
      
      This is an automated message. Please do not reply directly to this email.
    `
  }
  
  try {
    await transporter.sendMail(mailOptions)
    console.log('Auto-response sent to:', email)
    return true
  } catch (error) {
    console.error('Error sending auto-response:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIp = getClientIp(request.headers)
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const sessionId = generateSessionId(clientIp, userAgent)
    
    // Apply IP-based rate limiting
    if (!ipRateLimiter.isAllowed(clientIp)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Too many requests. Please try again later.',
          retryAfter: ipRateLimiter.getResetTime(clientIp)
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': '10',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(ipRateLimiter.getResetTime(clientIp)).toISOString()
          }
        }
      )
    }
    
    // Apply form-specific rate limiting
    if (!formRateLimiter.isAllowed(sessionId)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Please wait a moment before submitting again.',
          retryAfter: formRateLimiter.getResetTime(sessionId)
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': '3',
            'X-RateLimit-Remaining': String(formRateLimiter.getRemainingRequests(sessionId)),
            'X-RateLimit-Reset': new Date(formRateLimiter.getResetTime(sessionId)).toISOString()
          }
        }
      )
    }
    
    const body = await request.json()
    
    // Check honeypot field (anti-bot measure)
    if (!checkHoneypot(body.website)) {
      console.warn('Honeypot triggered:', { ip: clientIp, userAgent })
      // Silently reject but return success to confuse bots
      return NextResponse.json(
        { success: true, message: 'Thank you for your submission.' },
        { status: 200 }
      )
    }
    
    // Check for suspicious patterns
    if (detectSuspiciousPatterns(body)) {
      console.warn('Suspicious patterns detected:', { ip: clientIp, data: body })
      return NextResponse.json(
        { 
          success: false, 
          message: 'Your submission contains invalid content. Please review and try again.'
        },
        { status: 400 }
      )
    }
    
    // Validate CSRF token if provided
    if (body.csrf_token && !csrfManager.verifyToken(sessionId, body.csrf_token)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Security validation failed. Please refresh the page and try again.'
        },
        { status: 403 }
      )
    }
    
    // Validate and sanitize the request body
    const validatedData = leadSchema.parse(body)
    
    // Log the lead securely (sanitized data only)
    console.log('New lead received:', {
      name: validatedData.name,
      timestamp: new Date().toISOString(),
      ip: clientIp.substring(0, clientIp.lastIndexOf('.')), // Partial IP for privacy
      userAgent: userAgent.substring(0, 50) // Truncated user agent
    })
    
    // Send emails (both can fail independently)
    const [notificationSent, autoResponseSent] = await Promise.all([
      sendLeadNotification(validatedData),
      sendAutoResponse(validatedData.email, validatedData.name)
    ])
    
    // Log email status
    if (!notificationSent) {
      console.error('Failed to send notification email for lead:', validatedData.email)
    }
    if (!autoResponseSent) {
      console.error('Failed to send auto-response to:', validatedData.email)
    }
    
    // Return success even if emails fail (data is validated and logged)
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you! We\'ll contact you within 24 hours to schedule your free water test.',
        emailSent: notificationSent && autoResponseSent
      },
      { 
        status: 200,
        headers: {
          'X-RateLimit-Remaining': String(formRateLimiter.getRemainingRequests(sessionId))
        }
      }
    )
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Extract the first error message for user-friendly display
      const firstError = error.errors[0]
      return NextResponse.json(
        { 
          success: false, 
          message: firstError.message || 'Please check your information and try again.',
          field: firstError.path[0],
          errors: error.errors 
        },
        { status: 400 }
      )
    }
    
    console.error('Lead submission error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Something went wrong. Please try again or call us directly at (956) 579-1750.' 
      },
      { status: 500 }
    )
  }
}

// Generate CSRF token endpoint
export async function GET(request: NextRequest) {
  const clientIp = getClientIp(request.headers)
  const userAgent = request.headers.get('user-agent') || 'unknown'
  const sessionId = generateSessionId(clientIp, userAgent)
  
  const token = csrfManager.generateToken(sessionId)
  
  return NextResponse.json(
    { 
      csrf_token: token,
      message: 'CSRF token generated successfully'
    },
    { 
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'X-CSRF-Token': token
      }
    }
  )
}