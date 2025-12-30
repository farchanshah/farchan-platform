import nodemailer from 'nodemailer'
import { prisma } from '../../../lib/db'

export async function POST(req){
  const body = await req.json()
  const { name, email, message } = body

  // save to DB if prisma configured
  try{
    await prisma.lead.create({ data: { name, email, message } })
  }catch(e){
    // ignore if lead model not present
  }

  // send email
  try{
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    })

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.NOTIFY_EMAIL,
      subject: `New contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`
    })
  }catch(err){
    console.error('Mailer error', err.message)
  }

  return new Response(JSON.stringify({ok:true}), { status: 200 })
}
