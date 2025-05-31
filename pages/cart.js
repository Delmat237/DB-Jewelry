import { useCart } from '@/context/CartContext';

import { useRouter } from 'next/router';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const router = useRouter();

  const handleMobileMoneyPayment = async () => {
  const client_name = prompt("Entrez votre nom complet :");
  const client_phone = prompt("Entrez votre numéro de téléphone Mobile Money :");

  //VIDER LE PANNIER QUAND TOUT SE PASSE BIEN
  clearCart();
    router.push(`/success`);

  // const res = await fetch('/api/init-payment', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ cart, client_name, client_phone }),
  // });

  // const data = await res.json();
  // if (data.status === 'SUCCESS') {
  //   window.location.href = data.payment_url;
  // } else {
  //   alert("Erreur lors de la redirection vers CinetPay");
  // }
};

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Mon Panier</h1>
      {cart.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <ul className="divide-y">
            {cart.map((item) => (
              <li key={item.id} className="py-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.quantity} x {item.price.toLocaleString()} XAF
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:underline"
                >
                  Retirer
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between items-center">
            <p className="font-bold">Total: {total.toLocaleString()} XAF</p>
            <div className="flex gap-3">
              <button
                onClick={clearCart}
                className="text-sm  text-black bg-pink-200 px-3 py-2 rounded hover:bg-gray-300"
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
