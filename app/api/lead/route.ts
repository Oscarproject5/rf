import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Lead form validation schema
const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[\d\s\-\(\)]+$/, 'Invalid phone number').min(10),
  city: z.string().min(2, 'City is required').max(50),
  message: z.string().max(500, 'Message too long').optional(),
  preferredTime: z.enum(['morning', 'afternoon', 'evening', 'anytime']).optional(),
  honeypot: z.string().max(0, 'Bot detected'), // Honeypot field should be empty
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validatedData = leadSchema.parse(body)
    
    // Log the lead (in production, save to database)
    console.log('New lead received:', {
      ...validatedData,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
    })
    
    // TODO: Save to database
    // await saveLeadToDatabase(validatedData)
    
    // TODO: Send notification email
    // await sendLeadNotification(validatedData)
    
    // TODO: Send auto-response email
    // await sendAutoResponse(validatedData.email, validatedData.name)
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you! We\'ll contact you within 24 hours to schedule your free water test.' 
      },
      { status: 200 }
    )
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Please check your information and try again.',
          errors: error.errors 
        },
        { status: 400 }
      )
    }
    
    console.error('Lead submission error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Something went wrong. Please try again or call us directly.' 
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Lead API endpoint. Use POST to submit a lead.' },
    { status: 405 }
  )
}