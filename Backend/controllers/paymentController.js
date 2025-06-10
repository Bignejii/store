const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY ); // Replace with your secret key

exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount) return res.status(400).json({ error: 'Amount is required' });

    const paymentIntent = await stripe.paymentIntents.create({
      amount, // in cents
      currency: 'eur', // or 'usd', etc.
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 