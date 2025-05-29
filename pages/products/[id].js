// pages/products/[id].js
import { useRouter } from 'next/router';
import { useCart } from '@/context/CartContext';
import products from '@/data/productsData';
// Simule une base de données locale


export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart } = useCart(); // ✅ hook déplacé ici

  const product = products.find(p => p.id === parseInt(id));

  if (!product) return <p className="p-6 text-center">Produit introuvable...</p>;

  return (
    <>
     
      <main className="p-6 md:flex gap-8 max-w-5xl mx-auto">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 object-cover rounded-lg shadow"
        />
        <div className="mt-6 md:mt-0 md:w-1/2">
          <h1 className="text-3xl font-bold text-blue-900">{product.name}</h1>
          <p className="text-yellow-600 text-2xl font-semibold my-4">
            {product.price.toLocaleString()} XAF
          </p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          <button
            onClick={() => addToCart(product)}
            className="mt-4 bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-yellow-600 transition"
          >
            Ajouter au panier
          </button>
        </div>
      </main>
   
    </>
  );
}
