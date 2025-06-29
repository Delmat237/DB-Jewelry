import { useEffect, useState } from 'react';

export default function DynamicBanner() {
  const [currentImage, setCurrentImage] = useState(null);
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
