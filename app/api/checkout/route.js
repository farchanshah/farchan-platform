import { stripe } from '../../../lib/stripe'

export async function POST(req){
  const { title, amount, email } = await req.json()
  const price = Number(amount)

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    customer_email: email,
    line_items: [{
      price_data: {
        currency: 'idr',
        product_data: { name: title },
        unit_amount: Math.round(price * 100)
      },
      quantity: 1
    }],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?checkout=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?checkout=cancel`
  })

  return new Response(JSON.stringify({url: session.url}), { status: 200 })
}
