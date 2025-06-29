import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const router = useRouter();
  const [error, setError] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  // Calculate total
  const total = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

  // Check if user is logged in
  const isLoggedIn = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    return token && token.access;
  };

  // Handle Mobile Money payment
  const handleMobileMoneyPayment = async () => {
    if (!isLoggedIn()) {
      setError('Vous devez être connecté pour effectuer un paiement.');
      setTimeout(() => router.push('/login'), 2000);
      return;
    }

    if (!clientName || !clientPhone) {
      setError('Veuillez entrer votre nom complet et numéro de téléphone.');
      return;
    }

    // Validate phone number (basic check for Cameroon MTN/Orange format)
    const phoneRegex = /^(6[0-9]{8})$/;
    if (!phoneRegex.test(clientPhone)) {
      setError('Numéro de téléphone invalide. Utilisez le format 6XXXXXXXX (9 chiffres).');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).access}`,
        },
        body: JSON.stringify({
          cart: cart.map((item) => ({
            id: item.id,
            name: item.name,
            price: parseFloat(item.price),
            quantity: item.quantity,
          })),
          client_name: clientName,
          client_phone: clientPhone,
        }),
      });

      const data = await response.json();
      if (response.ok && data.status === 'SUCCESS') {
        clearCart();
        window.location.href = data.payment_url; // Redirect to CinetPay or similar
      } else {
        setError(data.message || 'Erreur lors de l’initialisation du paiement.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setError('Une erreur réseau s’est produite lors du paiement.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-800">Mon Panier</h1>

      {/* Error message */}
      {error && (
        <div className="bg-red-100 text-red-600 px-4 py-2 rounded mb-6 text-center">
          {error}
        </div>
      )}

      {cart.length === 0 ? (
        <p className="text-gray-500">Votre panier est vide.</p>
      ) : (
        <>
          <ul className="divide-y">
            {cart.map((item) => (
              <li
                key={item.id}
                className="py-4 flex flex-col md:flex-row justify-between items-center gap-4"
              >
                <div className="flex items-center gap-4">
                  {/* Product image */}
                  <Image
                    src={item.image_url || '/images/placeholder.jpg'}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.quantity} x {parseFloat(item.price).toLocaleString('fr-FR')} XAF
                    </p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Retirer
                </button>
              </li>
            ))}
          </ul>

          {/* Payment form */}
          <div className="mt-6 bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Informations de paiement
            </h2>
            <div className="grid gap-4">
              <input
                type="text"
                placeholder="Nom complet"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
              <input
                type="text"
                placeholder="Numéro Mobile Money (6XXXXXXXX)"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-bold text-gray-800">
              Total: {total.toLocaleString('fr-FR')} XAF
            </p>
            <div className="flex gap-3">
              <button
                onClick={clearCart}
                className="text-sm text-black bg-pink-200 px-3 py-2 rounded hover:bg-pink-300"
              >
                Vider le panier
              </button>
              <button
                onClick={handleMobileMoneyPayment}
                className="text-sm text-white bg-green-600 px-4 py-2 rounded hover:bg-green-700"
              >
                Payer par Mobile Money (Orange/MTN)
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}