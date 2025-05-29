import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function EditProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState({ name: '', price: '', stock: '', description: '', image: '' });

  useEffect(() => {
    if (!id) return;
    // Charger produit existant
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    router.push('/admin/products');
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Modifier le produit</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={product.name} onChange={handleChange} className="input" />
        <input name="price" type="number" value={product.price} onChange={handleChange} className="input" />
        <input name="stock" type="number" value={product.stock} onChange={handleChange} className="input" />
        <input name="image" value={product.image} onChange={handleChange} className="input" />
        <textarea name="description" value={product.description} onChange={handleChange} className="input h-24" />
        <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Mettre à jour</button>
      </form>
    </div>
  );
}
