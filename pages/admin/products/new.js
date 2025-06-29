import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaPlusCircle } from 'react-icons/fa';

export default function AddProductPage() {
  const router = useRouter();
  const [product, setProduct] = useState({
    name: '',
    category_id: '',
    description: '',
    price: '',
    stock: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/`);
        console.log(response)
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          setError('Erreur lors du chargement des catégories.');
        }
      } catch (error) {
        console.error('Fetch categories error:', error);
        setError('Une erreur réseau s\'est produite lors du chargement des catégories.');
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('L\'image ne doit pas dépasser 5 Mo.');
        return;
      }
      setImageFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Client-side validation
    if (!product.category_id) {
      setError('Veuillez sélectionner une catégorie.');
      return;
    }
    if (parseFloat(product.price) <= 0) {
      setError('Le prix doit être supérieur à 0.');
      return;
    }
    if (parseInt(product.stock) < 0) {
      setError('Le stock ne peut pas être négatif.');
      return;
    }

    const formData = new FormData();
    Object.entries(product).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const token = JSON.parse(localStorage.getItem('token'))?.access;
      if (!token) {
        setError('Vous devez être connecté en tant qu\'admin.');
        router.push('/login');
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}articles/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      console.log('Response:', response);

      if (response.status === 201) {
        router.push('/admin/products'); // Redirect to article list
      } else {
        const errorData = await response.json();
        setError(errorData.detail || Object.values(errorData)[0]?.[0] || 'Une erreur s\'est produite, veuillez réessayer.');
      }
    } catch (error) {
      console.error('Article creation error:', error);
      setError('Une erreur réseau s\'est produite.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-2">
          <FaPlusCircle className="text-green-500" /> Ajouter un produit
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
          {error && (
            <p className="bg-red-100 text-red-600 px-4 py-2 rounded mb-4 text-sm">{error}</p>
          )}
          <div>
            <label className="block mb-1 text-sm text-gray-700">Nom</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={product.name}
              className="text-black w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Nom du produit"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-700">Catégorie</label>
            <select
              name="category_id"
              onChange={handleChange}
              value={product.category_id}
              className="text-black w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-700">Description</label>
            <textarea
              name="description"
              onChange={handleChange}
              value={product.description}
              className="text-black w-full border rounded px-4 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Description du produit"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-700">Prix</label>
            <input
              type="number"
              name="price"
              step="0.01"
              onChange={handleChange}
              value={product.price}
              className="text-black w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Prix (en XAF)"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-700">Stock</label>
            <input
              type="number"
              name="stock"
              onChange={handleChange}
              value={product.stock}
              className="text-black w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Quantité en stock"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-700">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-black w-full border rounded px-4 py-2"
            />
            {previewURL && (
              <img src={previewURL} alt="Prévisualisation" className="max-h-40 mt-3 rounded shadow" />
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Enregistrer
          </button>
        </form>
      </div>
    </div>
  );
}