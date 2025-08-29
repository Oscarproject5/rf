// Alternative API route using Resend (100 free emails/day)
// Sign up at https://resend.com and get your API key

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, address, message } = body

    // Option 1: Using Resend API (recommended)
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev', // Use this for testing, or add your domain
        to: 'Rgvbuildingsolutions@gmail.com',
        subject: 'New Lead from Love Water Website',
        html: `
          <h2>New Lead Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Address:</strong> ${address}</p>
          ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
        `,
      }),
    })

    if (resendResponse.ok) {
      return NextResponse.json({ success: true, message: 'Form submitted successfully!' })
    } else {
      throw new Error('Failed to send email')
    }
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to submit form' },
      { status: 500 }
    )
  }
}