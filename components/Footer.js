import { FaFacebookF, FaInstagram, FaTwitter, FaCcVisa, FaCcMastercard, FaPaypal ,FaWhatsapp,FaLinkedin,FaEnvelope} from 'react-icons/fa';
import Link from 'next/link';
export default function Footer() {
  return (
    <footer className="bg-black text-white pt-12 pb-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8">

        {/* Logo & Présentation */}
        <div>
          <h2 className="text-2xl font-semibold text-yellow-400 mb-2">DB Jewelry</h2>
          <p className="text-sm text-gray-400">
            Boutique de bijoux élégants et modernes, inspirés du luxe et de l&apos;excellence.
            Faites ressortir votre éclat avec DB Jewelry.
          </p>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-yellow-400 font-semibold mb-2">Newsletter</h3>
          <p className="text-sm text-gray-400 mb-3">Recevez nos nouveautés & offres spéciales</p>
          <form className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="px-3 py-2 rounded bg-gray-800 text-sm text-white placeholder-gray-400 focus:outline-none"
            />
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-4 rounded text-sm font-semibold">
              S’inscrire
            </button>
          </form>
        </div>

        {/* Liens utiles */}
        <div>
          <h3 className="text-yellow-400 font-semibold mb-2">Liens utiles</h3>
          <ul className="text-sm text-gray-400 space-y-2">
            <li><Link href="/about" className="hover:text-white">À propos</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li><a href="/mentions-legales" className="hover:text-white">Mentions légales</a></li>
          </ul>
        </div>

        {/* Réseaux & Paiements */}
        <div>
          <h3 className="text-yellow-400 font-semibold mb-2">Nous suivre</h3>
          <div className="flex gap-4 text-yellow-400 text-lg mb-4">
            <Link href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </Link>
          <Link href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </Link>
          <Link href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </Link>
          <Link href="https://wa.me/237657450314" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp />
          </Link>
          <Link href="https://www.linkedin.com/in/leonel-azangue" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </Link>
          </div>
          <h3 className="text-yellow-400 font-semibold mb-2">Paiement sécurisé</h3>
          <div className="flex gap-4 text-gray-300 text-2xl">
            <FaCcVisa />
            <FaCcMastercard />
            <FaPaypal />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-gray-500 mt-8">
        &copy; {new Date().getFullYear()} DB Jewelry. Tous droits réservés.
      </div>
    </footer>
  );
}
