export default function ProductShowcase() {
  return (
    <section id="produits" className="relative overflow-hidden py-12 px-6 bg-white">
      <h3 className="text-3xl font-bold text-blue-800 mb-10 text-center z-10 relative">
        Nos Meilleures Ventes
      </h3>

      <div className="absolute inset-0 overflow-hidden opacity-30 z-0">
        <div className="flex animate-slide space-x-8 w-max">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="min-w-[300px] border rounded-lg shadow-lg bg-white/70 backdrop-blur-sm p-4"
            >
              <img
                src={`/images/Poedgar${(i % 8) + 1}.jpeg`}
                alt="Bijou"
                className="w-full h-64 object-cover rounded"
              />
              <h4 className="mt-4 text-xl font-semibold text-gray-800">Bracelet Élégant</h4>
              <p className="text-yellow-600 font-bold">59 000 XAF</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 text-center">
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Découvrez nos bijoux les plus prisés, parfaits pour sublimer vos moments précieux.
        </p>
      </div>
    </section>
  );
}
