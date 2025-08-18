import { NextRequest, NextResponse } from 'next/server'
// import { createClient } from '@sanity/client'

// Create Sanity client - temporarily disabled
// const client = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
//   apiVersion: '2024-01-01',
//   useCdn: false,
//   token: process.env.SANITY_API_TOKEN,
// })

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, serviceRequired, message } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Create client inquiry in Sanity - temporarily disabled
    // const inquiry = await client.create({
    //   _type: 'clientInquiry',
    //   firstName,
    //   lastName,
    //   email,
    //   phone: phone || '',
    //   serviceRequired: serviceRequired || 'Other',
    //   message,
    //   status: 'New',
    //   priority: 'Medium',
    //   submittedAt: new Date().toISOString(),
    //   source: 'Website Contact Form',
    //   marketingConsent: false,
    // })

    // For now, just log the inquiry (you can implement email or database storage later)
    console.log('Contact form submission:', { firstName, lastName, email, phone, serviceRequired, message })

    return NextResponse.json({
      success: true,
      message: 'Inquiry submitted successfully. We will get back to you soon.',
      inquiryId: 'temp-' + Date.now(),
    })

  } catch (error) {
    console.error('Contact form error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to submit inquiry. Please try again or contact us directly.',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
