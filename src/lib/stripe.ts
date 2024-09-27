import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
  typescript: true,
  appInfo: {
    name: 'Ignite Shop',
    version: '1.0.0',
  },
})

export const getProducts = async () => {
  const products = await stripe.products.list({
    active: true,
    expand: ['data.default_price'],
  })
  return products
}
