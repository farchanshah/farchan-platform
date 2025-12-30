// app/api/contact/route.js
import nodemailer from 'nodemailer'

export async function POST(req) {
  try {
    const body = await req.json()
    const { name, email, message } = body || {}

    // Save lead to DB if prisma available and model exists (best effort)
    if (process.env.DATABASE_URL) {
      try {
        const { getPrisma } = require('../../../lib/db')
        const prisma = getPrisma()
        if (prisma && prisma.lead && prisma.lead.create) {
          await prisma.lead.create({
            data: {
              name: name || null,
              email: email || null,
              message: message || null
            }
          })
        }
      } catch (err) {
        console.warn('Contact route - DB save failed:', err?.message || err)
      }
    }

    // Send notification email (best effort)
    try {
      if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          secure: false,
          auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        })

        await transporter.sendMail({
          from: process.env.SMTP_USER,
          to: process.env.NOTIFY_EMAIL,
          subject: `New contact from ${name || 'Unknown'}`,
          text: `Name: ${name || 'Unknown'}\nEmail: ${email || 'Unknown'}\n\n${message || ''}`
        })
      } else {
        console.log('SMTP env not fully configured - skipping email send.')
      }
    } catch (mailErr) {
      console.warn('Contact route - mail send failed:', mailErr?.message || mailErr)
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (err) {
    console.error('Contact handler error:', err?.message || err)
    return new Response(JSON.stringify({ ok: false, error: err?.message || 'internal' }), { status: 500 })
  }
}
