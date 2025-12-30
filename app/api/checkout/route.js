// app/api/checkout/route.js
export async function POST(req) {
  try {
    const { title, amount, email, metadata } = await req.json()
    const price = Number(amount || 0)

    if (!process.env.STRIPE_SECRET_KEY) {
      return new Response(JSON.stringify({ error: 'Stripe not configured' }), { status: 500 })
    }

    const { getStripe } = require('../../../lib/stripe')
    // lib/stripe exports getStripe?
    // our lib exports getStripe function — adjust
    const stripe = require('../../../lib/stripe').getStripe()

    if (!stripe) return new Response(JSON.stringify({ error: 'Stripe client initialization failed' }), { status: 500 })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'idr',
            product_data: { name: title || 'Service' },
            unit_amount: Math.round(price * 100)
          },
          quantity: 1
        }
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?checkout=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?checkout=cancel`,
      metadata: metadata || {}
    })

    return new Response(JSON.stringify({ url: session.url }), { status: 200 })
  } catch (err) {
    console.error('Checkout error:', err?.message || err)
    return new Response(JSON.stringify({ error: err?.message || 'checkout_error' }), { status: 500 })
  }
}
