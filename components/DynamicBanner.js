import { useEffect, useState } from 'react';
import products from '@/data/productsData';

export default function DynamicBanner() {
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    const getRandomProductImage = () => {
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      return randomProduct?.image || '';
    };

    setCurrentImage(getRandomProductImage());

    const interval = setInterval(() => {
      setCurrentImage(getRandomProductImage());
    }, 7000); // Changer toutes les 7 secondes

    return () => clearInterval(interval); // Nettoyage
  }, []);

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-xl shadow-md my-8">
      {currentImage && (
        <img
          src={currentImage}
          alt="Bannière produit"
          className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
        />
      )}
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
        <h2 className="text-white text-4xl font-bold backdrop-blur-sm p-4 rounded-lg shadow-lg">
          Découvrez nos bijoux exclusifs ✨
        </h2>
      </div>
    </div>
  );
}
