import { stripe } from '../../../lib/stripe'
import { headers } from 'next/headers'
import { prisma } from '../../../lib/db'

export async function POST(req){
  const body = await req.text()
  const sig = headers().get('stripe-signature')

  let event
  try{
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  }catch(err){
    console.error('Webhook signature error', err.message)
    return new Response('Webhook Error', { status: 400 })
  }

  if(event.type === 'checkout.session.completed'){
    const session = event.data.object
    const metadata = session.metadata || {}
    // Optionally create Payment & Project record
    try{
      // create project/payment if metadata provided
      if(metadata.projectId){
        await prisma.payment.create({ data: { amount: Math.round(session.amount_total/100), status: 'paid', stripeId: session.id, projectId: metadata.projectId } })
        await prisma.project.update({ where: { id: metadata.projectId }, data: { status: 'paid' } })
      }
    }catch(e){
      console.error('Prisma webhook error', e.message)
    }
  }

  return new Response('ok')
}
