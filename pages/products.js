import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/router';
import { FiSearch } from 'react-icons/fi';
import Image from 'next/image';

export default function ProductsPage() {
  const { addToCart } = useCart();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('default');
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
  const [categories, setCategories] = useState([{
    id:null,
    name:'',
    description:''
  }]);
  const [error, setError] = useState('');

  // Fetch categories and products
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/`);
        if (response.ok) {
          const data = await response.json();
         console.log("Categories",data)
          setCategories(data);

        } else {
          setError('Erreur lors du chargement des catégories.');
        }
      } catch (error) {
        console.error('Fetch categories error:', error);
        setError('Une erreur réseau s\'est produite lors du chargement des catégories.');
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/`);
      
        if (response.ok) {
          
          const data = await response.json();
           console.log("Produit", data)
          setProducts(data);
         
        } else {
          setError('Erreur lors du chargement des produits.');
        }
      } catch (error) {
        console.error('Fetch products error:', error);
        setError('Une erreur réseau s\'est produite lors du chargement des produits.');
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  // Map category_id to category name
  const getCategoryName = (category_id) => {
    const category = categories.find((cat) => cat.id === category_id);
    return category ? category.name : `Catégorie ${category_id}`;
  };

  const filterAndSortProducts = (category_id) => {
    let filtered = products.filter(
      (p) =>
        p.category_id === category_id &&
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOrder === 'asc') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  };

  // Check if user is logged in for cart actions
  const isLoggedIn = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    return token && token.access;
  };

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
        Tous nos bijoux
      </h1>

      {/* Error message */}
      {error && (
        <div className="bg-red-100 text-red-600 px-4 py-2 rounded mb-6 text-center">
          {error}
        </div>
      )}

      {/* Search and sort */}
      <div className="flex flex-col md:flex-row justify-center mb-6 gap-4">
        <div className="relative w-full md:w-1/2 bg-gray-100 rounded-full shadow-lg border border-gray-200">
          <span className="absolute inset-y-0 left-4 flex items-center text-gray-500">
            <FiSearch size={20} />
          </span>
          <input
            type="text"
            placeholder="Rechercher un bijou..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition text-black"
          />
        </div>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full md:w-60 rounded-full border border-gray-300 px-4 py-2 shadow focus:outline-none text-black"
        >
          <option value="default">Trier par défaut</option>
          <option value="asc">Prix : Croissant</option>
          <option value="desc">Prix : Décroissant</option>
        </select>
      </div>

      {/* Categories and products */}
      {categories.map((category) => {
        const items = filterAndSortProducts(category.id);
        if (items.length === 0) return null;

        return (
          <div key={category.id} className="mb-20 text-center">
            {/* Category header */}
            <div className="relative mb-6 group">
              <div className="bg-gradient-to-r from-yellow-100 via-white to-blue-100 border-l-8 border-yellow-500 px-6 py-4 rounded-xl shadow-md transition duration-300 group-hover:scale-[1.01]">
                <h2 className="text-3xl font-bold text-gray-800 capitalize tracking-wide group-hover:text-yellow-600 transition">
                  {category.name}
                </h2>
              </div>
            </div>

            {/* Product grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {items.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-lg overflow-hidden shadow-md group relative"
                >
                  {/* Product image */}
                  <div
                    className="cursor-pointer overflow-hidden"
                    onClick={() => router.push(`/products/${product.id}`)}
                  >
                    <Image
                      src={product.image_url || '/images/placeholder.jpg'}
                      alt={product.name}
                      width={300}
                      height={200}
                      className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {product.name}
                    </h3>
                    <p className="text-yellow-600 font-bold mt-2">
                      {parseFloat(product.price).toLocaleString('fr-FR')} XAF
                    </p>
                    <div className="mt-4">
                      <button
                        onClick={() => {
                          if (isLoggedIn()) {
                            addToCart(product);
                          } else {
                            router.push('/login');
                          }
                        }}
                        className="w-full text-sm text-white bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600 transition"
                      >
                        Ajouter au panier
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* No results */}
      {categories.length > 0 &&
        categories.every((cat) => filterAndSortProducts(cat.id).length === 0) && (
          <div className="text-center text-gray-500 mt-20 text-lg">
            Aucun produit trouvé pour cette recherche.
          </div>
        )}
    </main>
  );
}