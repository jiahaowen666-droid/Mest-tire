import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const TO_EMAIL = process.env.INQUIRY_TO_EMAIL ?? 'stanley@mesttire.com'
const FROM_EMAIL = process.env.INQUIRY_FROM_EMAIL ?? 'inquiries@mesttire.com'

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const body = await req.json()
    const { name, company, email, phone, product, quantity, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 })
    }

    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New Inquiry${product ? ` — ${product}` : ''}${company ? ` from ${company}` : ''}`,
      html: `
        <table style="font-family:sans-serif;font-size:14px;color:#333;max-width:600px;width:100%">
          <tr><td style="padding:24px 0 8px"><h2 style="margin:0;font-size:20px;color:#f97316">New B2B Inquiry — Mest Tire</h2></td></tr>
          <tr><td style="border-top:2px solid #f97316;padding-top:16px">
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#666;width:140px">Name</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
              ${company ? `<tr><td style="padding:8px 0;color:#666">Company</td><td style="padding:8px 0;font-weight:600">${company}</td></tr>` : ''}
              <tr><td style="padding:8px 0;color:#666">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#f97316">${email}</a></td></tr>
              ${phone ? `<tr><td style="padding:8px 0;color:#666">Phone / WhatsApp</td><td style="padding:8px 0">${phone}</td></tr>` : ''}
              ${product ? `<tr><td style="padding:8px 0;color:#666">Product</td><td style="padding:8px 0">${product}</td></tr>` : ''}
              ${quantity ? `<tr><td style="padding:8px 0;color:#666">Est. Quantity</td><td style="padding:8px 0">${quantity}</td></tr>` : ''}
            </table>
          </td></tr>
          <tr><td style="padding:16px 0">
            <div style="background:#f9f9f9;border-left:3px solid #f97316;padding:12px 16px;border-radius:2px">
              <div style="color:#666;font-size:12px;text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px">Message</div>
              <div style="white-space:pre-wrap">${message}</div>
            </div>
          </td></tr>
          <tr><td style="padding-top:16px;border-top:1px solid #eee;color:#999;font-size:12px">
            Sent ${new Date().toUTCString()} via mesttire.com contact form
          </td></tr>
        </table>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  }
}
