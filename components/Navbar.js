// components/Navbar.js
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';

import {
  FaGlobe,
  FaStore,
  FaInfoCircle,
  FaEnvelope,
  FaUserCircle,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
} from 'react-icons/fa';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();
    const { cartCount } = useCart(); // 🔥


useEffect(() => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }
}, []);


  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };



  return (
    <nav className="bg-white shadow-sm py-4 px-6 flex justify-between items-center sticky top-0 z-50">
      <Link
        href="/"
        className="flex items-center gap-2 text-2xl font-extrabold tracking-wide text-black hover:text-gray-800 transition"
      >
        <span>
          DB <span className="text-yellow-500">Jewelry</span>
        </span>
        <FaGlobe className="text-yellow-500" />
      </Link>


      <div className="flex items-center gap-6 text-sm">
        <Link href="/products" className="flex items-center gap-1 text-gray-700 hover:text-black transition">
          <FaStore /> Boutique
        </Link>
        <Link href="/about" className="flex items-center gap-1 text-gray-700 hover:text-black transition">
          <FaInfoCircle /> À propos
        </Link>
        <Link href="/contact" className="flex items-center gap-1 text-gray-700 hover:text-black transition">
          <FaEnvelope /> Contact
        </Link>
  {/* PANIER */}
        <Link href="/cart" className="relative">
          <FaShoppingCart className="text-xl text-gray-700 hover:text-black transition" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>


        {user ? (
          <>
            <Link href="/profile" className="flex items-center gap-1 text-black font-medium hover:underline">
              <FaUserCircle /> Mon compte
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-red-600 hover:text-red-800 transition font-semibold"
            >
              <FaSignOutAlt /> Déconnexion
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="flex items-center gap-1 text-black hover:underline transition">
              <FaSignInAlt /> Se connecter
            </Link>
            <Link
              href="/register"
              className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition"
            >
              <FaUserPlus /> S’inscrire
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
