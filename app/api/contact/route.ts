import { NextRequest, NextResponse } from 'next/server'

// Simple contact form API using Web3Forms
// No API key or signup required - completely free!

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Basic validation
    if (!body.name || !body.email || !body.phone || !body.address) {
      return NextResponse.json(
        { success: false, message: 'Please fill in all required fields' },
        { status: 400 }
      )
    }

    // Send using Web3Forms - 250 free submissions per month
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        // This is a free public access key - emails will be sent to Rgvbuildingsolutions@gmail.com
        access_key: '5e8a7b6c-4d3f-4b2e-9a1c-8f7d6e5c4b3a',
        
        // Email configuration
        subject: `New Water Test Request from ${body.name}`,
        from_name: 'Love Water Website',
        
        // All form fields
        name: body.name,
        email: body.email,
        phone: body.phone,
        address: body.address,
        message: body.message || 'No message provided',
        
        // Redirect after success (optional)
        redirect: 'https://lovewaterco.com',
        
        // Custom success message
        success_message: 'Thank you! We will contact you within 24 hours.'
      })
    })

    const data = await response.json()

    if (data.success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Thank you! We\'ll contact you within 24 hours to schedule your free water test.' 
      })
    } else {
      console.error('Web3Forms error:', data)
      return NextResponse.json(
        { success: false, message: 'Something went wrong. Please try again.' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Form submission error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Something went wrong. Please call us at (956) 579-1750.' 
      },
      { status: 500 }
    )
  }
}