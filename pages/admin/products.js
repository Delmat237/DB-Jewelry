import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function AdminProductsPage() {
    const router = useRouter();
  
  const [products, setProducts] = useState([
   {
  id: null,
  name: '' ,
  description: '',
  price: null,
  stock: null,
  image: '',
  image_url: '',
  created_at: '',
  updated_at: ''
}
  ]);

    // Check if user is admin
const isAdmin = () => {
  const token = JSON.parse(localStorage.getItem('token'));
  return token && token.access && token.user?.role === 'admin';
};
  useEffect(() => {
   
    async function fetchProducts() {
      
          const token = JSON.parse(localStorage.getItem('token'))?.access;
        if (!token) {
          setError('Vous devez être connecté en tant qu\'admin.');
          router.push('/login');
          return;
        }
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      
      });
      console.log("Response", response)
      if (response.status == 401){
          router.push('/login');
      }
      const data = await response.json();
            console.log(data)
      setProducts(data);
    }

        if (!isAdmin()) {
      alert('Vous devez être connecté en tant qu’admin.');
      setApiError('Vous devez être connecté en tant qu’admin.');
      setTimeout(() => router.push('/login'), 2000);
      return;
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
