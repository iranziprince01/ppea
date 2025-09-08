import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, phone, service, message } = await request.json()

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // Email 1: Send inquiry to firm
    const firmMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `New Contact Form Submission - ${firstName} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af;">New Contact Form Submission</h2>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Service Required:</strong> ${service || 'Not specified'}</p>
          </div>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px;">
            <h3 style="color: #374151; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <div style="margin-top: 20px; padding: 15px; background-color: #dbeafe; border-radius: 8px;">
            <p style="margin: 0; color: #1e40af; font-size: 14px;">
              This message was sent from the Probity Partners East Africa contact form.
            </p>
          </div>
        </div>
      `,
    }

    // Email 2: Send confirmation to client
    const clientMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting Probity Partners East Africa',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Probity Partners East Africa</h1>
            <p style="color: #dbeafe; margin: 10px 0 0 0; font-size: 16px;">Leading Legal Excellence in East Africa</p>
          </div>
          
          <!-- Main Content -->
          <div style="padding: 30px; background-color: #ffffff;">
            <h2 style="color: #1e40af; margin-top: 0;">Thank You for Your Inquiry</h2>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              Dear ${firstName} ${lastName},
            </p>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              Thank you for reaching out to Probity Partners East Africa. We have successfully received your inquiry and appreciate your interest in our legal services.
            </p>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #1e40af;">
              <h3 style="color: #1e40af; margin-top: 0;">Your Inquiry Details:</h3>
              <p style="margin: 5px 0;"><strong>Service Required:</strong> ${service || 'General Inquiry'}</p>
              <p style="margin: 5px 0;"><strong>Submitted:</strong> ${new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</p>
            </div>
            
            <h3 style="color: #1e40af;">What Happens Next?</h3>
            <ul style="color: #374151; font-size: 16px; line-height: 1.6;">
              <li>Our legal team will review your inquiry within 24-48 hours</li>
              <li>We will contact you directly to discuss your legal needs</li>
              <li>If urgent, please call us at +250791676618 or +250788561313</li>
            </ul>
            
            <div style="background-color: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e40af; margin-top: 0;">Our Commitment</h3>
              <p style="color: #374151; margin: 0; font-size: 16px; line-height: 1.6;">
                At Probity Partners East Africa, we are committed to providing exceptional legal services with integrity, professionalism, and personalized attention to each client's unique needs.
              </p>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 0 0 8px 8px; text-align: center; border-top: 1px solid #e5e7eb;">
            <h3 style="color: #1e40af; margin-top: 0;">Contact Information</h3>
            <p style="color: #374151; margin: 5px 0;"><strong>Address:</strong> KG 17 Ave, Kigali, Rwanda</p>
            <p style="color: #374151; margin: 5px 0;"><strong>Phone:</strong> +250791676618 / +250788561313</p>
            <p style="color: #374151; margin: 5px 0;"><strong>Email:</strong> probitypartnersea1@gmail.com</p>
            <p style="color: #374151; margin: 5px 0;"><strong>Working Hours:</strong> Mon - Fri: 8:00 AM - 6:00 PM</p>
            
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px; margin: 0;">
                This is an automated confirmation email. Please do not reply to this message.
              </p>
              <p style="color: #6b7280; font-size: 14px; margin: 5px 0 0 0;">
                © 2025 Probity Partners East Africa. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      `,
    }

    // Send both emails
    await Promise.all([
      transporter.sendMail(firmMailOptions),
      transporter.sendMail(clientMailOptions)
    ])

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}