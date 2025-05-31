import { useState } from 'react';
import { useRouter } from 'next/router';
import { FaPlusCircle } from 'react-icons/fa';

export default function AddProductPage() {
  const router = useRouter();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    stock: '',
    description: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewURL(URL.createObjectURL(file)); // Pour l’aperçu
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(product).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (imageFile) {
      formData.append('image', imageFile);
    }

    // await fetch('/api/products', {
    //   method: 'POST',
    //   body: formData,
    // });

    router.push('/products');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 flex items-center gap-2">
          <FaPlusCircle className="text-green-500" /> Ajouter un produit
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
          <input
            type="text"
            name="name"
            onChange={handleChange}
            className="text-black w-full border rounded px-4 py-2"
            placeholder="Nom"
            required
          />
          <input
            type="number"
            name="price"
            onChange={handleChange}
            className="text-black w-full border rounded px-4 py-2"
            placeholder="Prix"
            required
          />
          <input
            type="number"
            name="stock"
            onChange={handleChange}
            className="text-black w-full border rounded px-4 py-2"
            placeholder="Stock"
            required
          />
          <textarea
            name="description"
            onChange={handleChange}
            className="text-black w-full border rounded px-4 py-2 h-24"
            placeholder="Description"
            required
          />

          {/* Upload image */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-black w-full"
          />
          {previewURL && (
            <img src={previewURL} alt="Prévisualisation" className="max-h-40 mt-3 rounded shadow" />
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Enregistrer
          </button>
        </form>
      </div>
    </div>
  );
}
