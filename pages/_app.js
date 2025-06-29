import "@/styles/globals.css";

import dynamic from 'next/dynamic';
import { CartProvider } from '@/context/CartContext';

const Navbar = dynamic(() => import('../components/Navbar'), { ssr: false });

function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <Navbar />
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default App;