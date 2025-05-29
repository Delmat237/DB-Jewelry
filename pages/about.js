// pages/about.js
import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>À propos | DB Jewelry</title>
      </Head>
    
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6 text-blue-900">À propos de DB Jewelry</h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          DB Jewelry est une entreprise spécialisée dans la vente de bijoux raffinés, chaînes élégantes,
          bracelets intemporels et autres accessoires de luxe. Fondée avec passion, notre mission est de 
          sublimer votre style avec des pièces uniques et éclatantes.
        </p>
        <p className="text-lg text-gray-700 mt-6 leading-relaxed">
          Que ce soit pour une occasion spéciale ou pour votre quotidien, chaque article est sélectionné 
          avec soin pour refléter élégance, qualité et modernité. Nous croyons que chaque bijou raconte 
          une histoire – la vôtre.
        </p>
      </div>

 
    </>
       
  );
}
