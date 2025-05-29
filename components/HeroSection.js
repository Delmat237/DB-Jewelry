import DynamicBanner from "./DynamicBanner";
export default function HeroSection() {
  return (
    <>
    <DynamicBanner/>
    <section className="bg-[url('/images/banner.jpg')] bg-cover bg-center h-[80vh] flex items-center justify-center text-white text-center">
      <div className="bg-black bg-opacity-50 p-8 rounded-lg">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Éclat et Élégance</h2>
        <p className="text-lg md:text-xl mb-6">Découvrez nos bijoux de luxe pour chaque occasion</p>
        <a href="#produits" className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full font-semibold transition">Voir nos collections</a>
      </div>
    </section>
    </>
  );
}