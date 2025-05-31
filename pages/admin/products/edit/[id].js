import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { FaEdit } from 'react-icons/fa';
import products from '@/data/productsData';

export default function EditProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [product, setProduct] = useState({
    name: '',
    price: '',
    stock: '',
    description: '',
    image: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!id) return;
    const p = products.find((p) => p.id === parseInt(id));
    setProduct(p);
    setPreview(p?.image || '');
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
      setProduct({ ...product, image: file.name }); // Ou un champ temporaire
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!product.name.trim()) newErrors.name = 'Nom requis';
    if (!product.price || product.price <= 0) newErrors.price = 'Prix invalide';
    if (!product.stock || product.stock < 0) newErrors.stock = 'Stock invalide';
    if (!product.description.trim()) newErrors.description = 'Description requise';
    if (!imageFile && !product.image.trim()) newErrors.image = 'Image requise';
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
    if (imageFile) {
      formData.append('image', imageFile);
    }

    // Appel API (à connecter avec backend Django ou Node)
    // await fetch(`/api/products/${id}`, {
    //   method: 'PUT',
    //   body: formData,
    // });

    router.push('/admin/products');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-2">
          <FaEdit className="text-yellow-500" /> Modifier le produit
        </h2>

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
