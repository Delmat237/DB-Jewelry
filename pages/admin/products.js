import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Appel API à implémenter plus tard avec Django REST
    async function fetchProducts() {
      const res = {};//await fetch('/api/products'); // temporaire
      const data = await res.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Gestion des produits</h1>

      <div className="flex justify-end mb-4">
        <Link href="/admin/products/new" className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded font-semibold">
          Ajouter un produit
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Nom</th>
              <th className="px-4 py-2">Prix</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(prod => (
              <tr key={prod.id} className="border-b">
                <td className="px-4 py-2">{prod.name}</td>
                <td className="px-4 py-2">{prod.price} XAF</td>
                <td className="px-4 py-2">{prod.stock}</td>
                <td className="px-4 py-2">
                  <Link href={`/admin/products/edit/${prod.id}`} className="text-blue-600 hover:underline mr-2">
                    Modifier
                  </Link>
                  <button className="text-red-500 hover:underline" onClick={() => handleDelete(prod.id)}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  function handleDelete(id) {
    // à implémenter avec un appel DELETE à l'API
    console.log("Suppression du produit id =", id);
  }
}
