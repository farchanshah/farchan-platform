import nodemailer from 'nodemailer'

export async function POST(req) {
  try {
    const body = await req.json()
    const { name, email, message } = body || {}

    // --- Safely attempt DB save only if DATABASE_URL present ---
    if (process.env.DATABASE_URL) {
      try {
        // lazy-require prisma to avoid build-time errors when env not configured
        const { prisma } = require('../../../lib/db')

        // check if model exists on the prisma client (guard)
        if (prisma && typeof prisma.lead !== 'undefined' && prisma.lead.create) {
          try {
            await prisma.lead.create({
              data: { name: name || null, email: email || null, message: message || null }
            })
          } catch (dbErr) {
            // do not throw — just log and continue
            console.error('Prisma: failed to create lead:', dbErr?.message || dbErr)
          }
        } else {
          // Prisma client present but 'lead' model not defined — skip silently
          console.log('Prisma client found but model `lead` is not defined — skipping DB save.')
        }
      } catch (initErr) {
        console.error('Prisma init error (skipping DB save):', initErr?.message || initErr)
      }
    } else {
      console.log('DATABASE_URL not set — skipping DB save.')
    }

    // --- Send notification email (best-effort) ---
    try {
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
        text: `Name: ${name || 'Unknown'}\nEmail: ${email || 'Unknown'}\nMessage:\n${message || ''}`
      })
    } catch (mailErr) {
      console.error('Mailer error (contact route):', mailErr?.message || mailErr)
      // Continue — we don't want email failure to break the handler
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (err) {
    console.error('Contact handler error:', err?.message || err)
    return new Response(JSON.stringify({ ok: false, error: err?.message || 'internal' }), { status: 500 })
  }
}
