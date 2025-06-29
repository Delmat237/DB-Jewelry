import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaBars, FaTimes, FaShoppingCart, FaUserShield, FaPlusCircle, FaGlobe, FaStore, FaInfoCircle, FaEnvelope, FaUserCircle, FaSignOutAlt, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const { cartCount } = useCart();

  useEffect(() => {
    // Only access localStorage on the client side
    if (typeof window !== 'undefined') {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const parsedToken = JSON.parse(token);
          setUser(parsedToken.user || null);
          setIsLoggedIn(!!parsedToken.access && !!parsedToken.user);
          setIsAdmin(parsedToken.user?.role === 'admin');
        } else {
          setUser(null);
          setIsLoggedIn(false);
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Erreur lors du parsing du token :', error);
        localStorage.removeItem('token');
        setUser(null);
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('cart'); // Clear cart on logout
    setUser(null);
    setIsLoggedIn(false);
    setIsAdmin(false);
    router.push('/');
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-white shadow-sm py-4 px-6 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold tracking-wide text-black hover:text-gray-800">
          <span>
            DB <span className="text-yellow-500">Jewelry</span>
          </span>
          <FaGlobe className="text-yellow-500" />
        </Link>

        {/* Bouton menu hamburger (mobile) */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl text-gray-800 focus:outline-none"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Menu (desktop) */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <NavLinks
            isLoggedIn={isLoggedIn}
            isAdmin={isAdmin}
            cartCount={cartCount}
            handleLogout={handleLogout}
          />
        </div>
      </div>

      {/* Menu déroulant (mobile) */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-sm border-t pt-4">
          <NavLinks
            isLoggedIn={isLoggedIn}
            isAdmin={isAdmin}
            cartCount={cartCount}
            handleLogout={handleLogout}
            onLinkClick={() => setMenuOpen(false)}
          />
        </div>
      )}
    </nav>
  );
}

function NavLinks({ isLoggedIn, isAdmin, cartCount, handleLogout, onLinkClick }) {
  return (
    <>
      <Link href="/products" onClick={onLinkClick} className="flex items-center gap-1 text-gray-700 hover:text-black">
        <FaStore className="text-blue-600" /> Boutique
      </Link>
      <Link href="/about" onClick={onLinkClick} className="flex items-center gap-1 text-gray-700 hover:text-black">
        <FaInfoCircle className="text-red-600" /> À propos
      </Link>
      <Link href="/contact" onClick={onLinkClick} className="flex items-center gap-1 text-gray-700 hover:text-black">
        <FaEnvelope className="text-green-600" /> Contact
      </Link>
      <Link href="/cart" onClick={onLinkClick} className="relative">
        <FaShoppingCart className="text-xl text-gray-700 hover:text-black" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {cartCount}
          </span>
        )}
      </Link>

      {isLoggedIn ? (
        <>
          <Link href="/profile" onClick={onLinkClick} className="flex items-center gap-1 text-black font-medium hover:underline">
            <FaUserCircle className="text-blue-600" /> Mon compte
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-red-600 hover:text-red-800 font-semibold"
          >
            <FaSignOutAlt /> Déconnexion
          </button>
        </>
      ) : (
        <>
          <Link href="/login" onClick={onLinkClick} className="flex items-center gap-1 text-black hover:underline">
            <FaSignInAlt /> Se connecter
          </Link>
          <Link href="/register" onClick={onLinkClick} className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600">
            <FaUserPlus /> S’inscrire
          </Link>
        </>
      )}

      {isAdmin && (
        <>
          <Link href="/admin/dashboard" onClick={onLinkClick} className="flex items-center gap-1 text-black font-medium hover:underline">
            <FaUserShield className="text-blue-600" /> Dashboard
          </Link>
          <Link href="/admin/products/new" onClick={onLinkClick} className="flex items-center gap-1 text-yellow-600 hover:text-yellow-800 font-semibold">
            <FaPlusCircle className="text-green-600" /> Ajouter Produit
          </Link>
        </>
      )}
    </>
  );
}