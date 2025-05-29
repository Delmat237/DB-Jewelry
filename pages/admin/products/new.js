import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AddProductPage() {
  const [product, setProduct] = useState({ name: '', price: '', stock: '', description: '', image: '' });
  const router = useRouter();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Appel API (à connecter avec Django)
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    router.push('/admin/products');
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Ajouter un nouveau produit</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" onChange={handleChange} placeholder="Nom" className="input" required />
        <input name="price" type="number" onChange={handleChange} placeholder="Prix (XAF)" className="input" required />
        <input name="stock" type="number" onChange={handleChange} placeholder="Stock" className="input" required />
        <input name="image" onChange={handleChange} placeholder="URL de l’image" className="input" />
        <textarea name="description" onChange={handleChange} placeholder="Description" className="input h-24" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Enregistrer</button>
      </form>
    </div>
  );
}
