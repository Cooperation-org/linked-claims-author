import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const { to, subject, text, html } = await request.json()

    console.log('Received email request:', { to, subject, text, html })

    if (!to || !subject || !text || !html) {
      console.log('Missing required fields')
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html
    })

    console.log('Email sent successfully')
    return NextResponse.json({ message: 'Email sent successfully' })
  } catch (error: any) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: `Error sending email: ${error.message}` },
      { status: 500 }
    )
  }
}
