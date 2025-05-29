import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
              <Link href="/checkout">
                <button className="text-sm text-black bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                  Payer
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
