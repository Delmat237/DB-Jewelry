// pages/products.js
import { useState,useEffect } from 'react';
import products from '@/data/productsData';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/router';
import { FiSearch } from 'react-icons/fi';
import Image from 'next/image';

export default function ProductsPage() {
  const { addToCart } = useCart();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('default');
    const [user, setUser] = useState({ email: "", password: "", role: "" });

    useEffect(() => {
      if (typeof window !== "undefined") {
        try {
           const user  = localStorage.getItem('user');
          if (user) {
            setUser(JSON.parse(user));
          }
        } catch (error) {
          console.error("Erreur lors du parsing du user :", error);
          localStorage.removeItem('user');
          setUser({ email: "", password: "", role: "" });
        }
      }
    }, []);


  const categories = [...new Set(products.map((p) => p.category))];

  const filterAndSortProducts = (category) => {
    let filtered = products.filter(
      (p) =>
        p.category === category &&
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOrder === 'asc') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  };

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
        Tous nos bijoux
      </h1>

      {/* Zone de recherche + tri */}
         <div className="flex justify-center mb-6">
        <div className="relative w-full md:w-1/2 bg-gray rounded-full shadow-lg border border-gray-200">
          <span className="absolute inset-y-0 left-4 flex items-center text-gray-500">
            <FiSearch size={20} />
          </span>
          <input
            type="text"
            placeholder="Rechercher un bijou..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition"
          />
        </div>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full md:w-60 rounded-full border border-gray-300 px-4 py-2 rounded shadow focus:outline-none"
        >
          <option value="default">Trier par défaut</option>
          <option value="asc">Prix : Croissant</option>
          <option value="desc">Prix : Décroissant</option>
        </select>
      </div>

      {categories.map((category) => {
        const items = filterAndSortProducts(category);
        if (items.length === 0) return null;

        return (
          <div key={category} className="mb-20  text-center">
            {/* En-tête de catégorie */}
            <div className="relative mb-6 group">
        <div className="bg-gradient-to-r from-yellow-100 via-white to-blue-100 border-l-8 border-yellow-500 px-6 py-4 rounded-xl shadow-md transition duration-300 group-hover:scale-[1.01]">
          <h2 className="text-3xl font-bold text-gray-800 capitalize tracking-wide group-hover:text-yellow-600 transition">
            {category}
          </h2>
        </div>
      </div>


            {/* Grille des produits */}
            <div className="grid md:grid-cols-3 gap-6">
              {items.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-lg overflow-hidden shadow-md group relative"
                >
                  {/* Image avec hover et clic */}
                  <div
                    className="cursor-pointer overflow-hidden"
                    onClick={() => router.push(`/products/${product.id}`)}
                  >
                    <Image
                      src={product.image}
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
                      {product.price.toLocaleString()} XAF
                    </p>
                    <div className="mt-4">
                      <button
                        onClick={() => {
                          if (user && user.email !== "") {
                            addToCart(product);
                          } else {
                            router.push(`/login`);
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

      {/* Aucun résultat */}
      {categories.every((cat) => filterAndSortProducts(cat).length === 0) && (
        <div className="text-center text-gray-500 mt-20 text-lg">
          Aucun produit trouvé pour cette recherche.
        </div>
      )}
    </main>
  );
}
