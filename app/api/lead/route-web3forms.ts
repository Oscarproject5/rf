// Using Web3Forms - 250 free submissions/month
// No sign up needed! Just use your email as access key

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, address, message } = body

    // Web3Forms API - No API key needed!
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: 'YOUR_ACCESS_KEY', // Get this from https://web3forms.com
        // Or you can use your email as access_key for instant setup:
        // access_key: 'Rgvbuildingsolutions@gmail.com',
        
        subject: 'New Lead from Love Water Website',
        from_name: name,
        email: email,
        phone: phone,
        address: address,
        message: message || 'No message provided',
        
        // Optional: Redirect URL after submission
        redirect: 'https://lovewaterco.com/thank-you'
      })
    })

    const data = await response.json()

    if (data.success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Thank you! We\'ll contact you within 24 hours.' 
      })
    } else {
      throw new Error(data.message || 'Failed to send')
    }
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to submit form' },
      { status: 500 }
    )
  }
}