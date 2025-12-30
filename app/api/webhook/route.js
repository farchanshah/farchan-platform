// app/api/webhook/route.js
import { headers } from 'next/headers'

export async function POST(req) {
  const body = await req.text()
  const sig = headers().get('stripe-signature')

  if (!process.env.STRIPE_WEBHOOK_SECRET || !process.env.STRIPE_SECRET_KEY) {
    console.warn('Stripe webhook skipped: STRIPE_WEBHOOK_SECRET or STRIPE_SECRET_KEY not set')
    return new Response('webhook skipped', { status: 200 })
  }

  let stripe
  try {
    stripe = require('../../../lib/stripe').getStripe()
    if (!stripe) throw new Error('Stripe client init failed')
  } catch (e) {
    console.error('Stripe init error', e?.message || e)
    return new Response('stripe init error', { status: 500 })
  }

  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature error', err?.message || err)
    return new Response('Webhook signature mismatch', { status: 400 })
  }

  // handle events
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const metadata = session.metadata || {}
    try {
      const { getPrisma } = require('../../../lib/db')
      const prisma = getPrisma()
      if (prisma && metadata.projectId) {
        await prisma.payment.create({
          data: {
            amount: Math.round((session.amount_total || 0) / 100),
            status: 'paid',
            stripeId: session.id,
            projectId: metadata.projectId
          }
        })
        await prisma.project.update({
          where: { id: metadata.projectId },
          data: { status: 'paid' }
        })
      } else {
        console.log('Webhook: prisma unavailable or projectId missing — skipped DB write')
      }
    } catch (dbErr) {
      console.error('Webhook DB error:', dbErr?.message || dbErr)
    }
  }

  return new Response('ok', { status: 200 })
}
