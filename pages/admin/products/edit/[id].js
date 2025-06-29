import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { FaEdit } from 'react-icons/fa';

export default function EditProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    name: '',
    price: '',
    stock: '',
    description: '',
    category_id: '',
    image_url: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState('');

  // Check if user is admin
const isAdmin = () => {
  const token = JSON.parse(localStorage.getItem('token'));
  return token && token.access && token.user?.role === 'admin';
};

  // Fetch product and categories
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/${id}/`);
        if (response.ok) {
          const data = await response.json();
          setProduct({
            name: data.name,
            price: parseFloat(data.price),
            stock: data.stock,
            description: data.description,
            category_id: data.category_id,
            image_url: data.image_url,
          });
          setPreview(data.image_url || '');
        } else {
          setApiError('Produit non trouvé.');
          setTimeout(() => router.push('/admin/products'), 2000);
        }
      } catch (error) {
        console.error('Fetch product error:', error);
        setApiError('Une erreur réseau s’est produite.');
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/`);
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          setApiError('Erreur lors du chargement des catégories.');
        }
      } catch (error) {
        console.error('Fetch categories error:', error);
        setApiError('Une erreur réseau s’est produite lors du chargement des catégories.');
      }
    };

    if (!isAdmin()) {
      alert('Vous devez être connecté en tant qu’admin.');
      setApiError('Vous devez être connecté en tant qu’admin.');
      setTimeout(() => router.push('/login'), 2000);
      return;
    }

    fetchProduct();
    fetchCategories();
  }, [id, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: name === 'price' || name === 'stock' ? parseFloat(value) || '' : value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
      setErrors({ ...errors, image: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!product.name.trim()) newErrors.name = 'Nom requis';
    if (!product.price || product.price <= 0) newErrors.price = 'Prix invalide';
    if (!product.stock || product.stock < 0) newErrors.stock = 'Stock invalide';
    if (!product.description.trim()) newErrors.description = 'Description requise';
    if (!product.category_id) newErrors.category_id = 'Catégorie requise';
    if (!imageFile && !product.image_url) newErrors.image = 'Image requise';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('stock', product.stock);
    formData.append('description', product.description);
    formData.append('category_id', product.category_id);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/${id}/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).access}`,
        },
        body: formData,
      });

      if (response.ok) {
        router.push('/admin/products');
      } else {
        const errorData = await response.json();
        setApiError(errorData.message || 'Erreur lors de la mise à jour du produit.');
      }
    } catch (error) {
      console.error('Update product error:', error);
      setApiError('Une erreur réseau s’est produite.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Chargement du produit...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-2">
          <FaEdit className="text-yellow-500" /> Modifier le produit
        </h2>

        {/* API error */}
        {apiError && (
          <div className="bg-red-100 text-red-600 px-4 py-2 rounded mb-6 text-center">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nom */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className={`text-black w-full border rounded-lg px-4 py-2 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Catégorie */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
            <select
              name="category_id"
              value={product.category_id}
              onChange={handleChange}
              className={`text-black w-full border rounded-lg px-4 py-2 ${
                errors.category_id ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category_id && (
              <p className="text-red-500 text-sm mt-1">{errors.category_id}</p>
            )}
          </div>

          {/* Prix */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prix (XAF)</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className={`text-black w-full border rounded-lg px-4 py-2 ${
                errors.price ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              className={`text-black w-full border rounded-lg px-4 py-2 ${
                errors.stock ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              className="text-black w-full"
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
            {preview && (
              <img
                src={preview}
                alt="Aperçu"
                className="mt-3 max-h-40 object-contain rounded-lg border border-gray-200"
              />
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              rows={4}
              className={`text-black w-full border rounded-lg px-4 py-2 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Mettre à jour
          </button>
        </form>
      </div>
    </div>
  );
}