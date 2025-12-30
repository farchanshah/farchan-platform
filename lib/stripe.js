// lib/stripe.js
// Lazy require stripe only when env key exists.

function getStripe() {
  try {
    const Stripe = require('stripe')
    return new Stripe(process.env.STRIPE_SECRET_KEY)
  } catch (err) {
    console.warn('Stripe client not available:', err?.message || err)
    return null
  }
}

module.exports = { getStripe }
