import config from '../config'

let stripePromise = null

export const loadStripe = async () => {
  if (!stripePromise && config.stripe.publishableKey) {
    const { loadStripe: load } = await import('@stripe/stripe-js')
    stripePromise = load(config.stripe.publishableKey)
  }
  return stripePromise
}

export const createDonation = async (amount, email) => {
  const response = await fetch('/api/create-donation-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, email })
  })
  return response.json()
}

export const createOneTimePayment = async (priceId, email) => {
  const response = await fetch('/api/create-payment-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ priceId, email })
  })
  return response.json()
}

export const redirectToCheckout = async (sessionId) => {
  const stripe = await loadStripe()
  await stripe.redirectToCheckout({ sessionId })
}