// pages/api/init-payment.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  const { cart, client_name, client_phone } = req.body;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const amount = total; // En XAF

  const payload = {
    apikey: process.env.CINETPAY_APIKEY,
    site_id: process.env.CINETPAY_SITE_ID,
    transaction_id: 'TXN' + Date.now(),
    amount: amount,
    currency: 'XAF',
    description: 'Paiement panier',
    return_url: `${req.headers.origin}/success`,
    notify_url: `${req.headers.origin}/api/payment-callback`,
    customer_name: client_name,
    customer_surname: '',
    customer_email: '',
    customer_phone_number: client_phone,
    customer_address: '',
    customer_city: '',
    customer_country: 'CM',
    channels: 'ALL',
    metadata: 'Commande depuis app Next.js',
  };

  try {
    const response = await fetch('https://api-checkout.cinetpay.com/v2/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: 'Erreur CinetPay' });
  }
}
