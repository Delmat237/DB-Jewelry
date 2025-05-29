// data/productsData.js
const products = [
  // Montres
  { id: 1, name: 'Montre de luxe', price: 30000, image: '/images/PATEK.jpeg', category: 'montres' },
  { id: 2, name: 'Montre de luxe', price: 13000, image: '/images/Poedgar.jpeg', category: 'montres' },
  { id: 3, name: 'Montre de luxe', price: 13000, image: '/images/Poedgar1.jpeg', category: 'montres' },
  { id: 4, name: 'Montre de luxe', price: 13000, image: '/images/Poedgar2.jpeg', category: 'montres' },
  { id: 5, name: 'Montre de luxe', price: 13000, image: '/images/Poedgar3.jpeg', category: 'montres' },
  { id: 6, name: 'Montre de luxe', price: 13000, image: '/images/Poedgar4.jpeg', category: 'montres' },
  { id: 7, name: 'Montre de luxe', price: 13000, image: '/images/Poedgar5.jpeg', category: 'montres' },
  { id: 8, name: 'Montre de luxe', price: 13000, image: '/images/Poedgar6.jpeg', category: 'montres' },
  { id: 9, name: 'Montre de luxe', price: 13000, image: '/images/Poedgar7.jpeg', category: 'montres' },
  { id: 10, name: 'Montre de luxe', price: 13000, image: '/images/Poedgar8.jpeg', category: 'montres' },
  { id: 11, name: 'Montre élégante', price: 18000, image: '/images/certificate.jpeg', category: 'montres' },
  { id: 12, name: 'Montre élégante', price: 18000, image: '/images/certificate1.jpeg', category: 'montres' },
  { id: 13, name: 'Montre élégante', price: 18000, image: '/images/certificate2.jpeg', category: 'montres' },
  { id: 14, name: 'Montre élégante', price: 18000, image: '/images/certificate3.jpeg', category: 'montres' },
  { id: 15, name: 'Montre élégante', price: 18000, image: '/images/certificate4.jpeg', category: 'montres' },
  { id: 16, name: 'Montre élégante', price: 18000, image: '/images/certificate5.jpeg', category: 'montres' },
  { id: 17, name: 'Montre élégante', price: 18000, image: '/images/certificate6.jpeg', category: 'montres' },
  { id: 18, name: 'Montre élégante', price: 18000, image: '/images/certificate7.jpeg', category: 'montres' },
  { id: 19, name: 'Montre classique', price: 18000, image: '/images/PEDAGAR.jpeg', category: 'montres' },
  { id: 20, name: 'Montre classique', price: 18000, image: '/images/PEDAGAR1.jpeg', category: 'montres' },
  { id: 21, name: 'Montre classique', price: 18000, image: '/images/PEDAGAR2.jpeg', category: 'montres' },

  // Colliers
  { id: 22, name: 'Collier en or', price: 2500, image: '/images/COLIER2.jpeg', category: 'colliers' },
  { id: 23, name: 'Collier en or', price: 2500, image: '/images/COLIER.jpeg', category: 'colliers' },
  { id: 24, name: 'Collier en or', price: 2500, image: '/images/COLIER1.jpeg', category: 'colliers' },
  { id: 25, name: 'Collier en argent', price: 2500, image: '/images/CROIX.jpeg', category: 'colliers' },
  { id: 26, name: 'Collier en argent', price: 2500, image: '/images/CROIX1.jpeg', category: 'colliers' },
  { id: 27, name: 'Collier en argent', price: 2500, image: '/images/CROIX2.jpeg', category: 'colliers' },
  { id: 28, name: 'Collier en argent', price: 2500, image: '/images/CROIX3.jpeg', category: 'colliers' },
  { id: 29, name: 'Collier en argent', price: 2500, image: '/images/CROIX4.jpeg', category: 'colliers' },
  { id: 30, name: 'Collier en argent', price: 2500, image: '/images/ETOILE.jpeg', category: 'colliers' },
  { id: 31, name: 'Collier en argent', price: 7000, image: '/images/ETOILE1.jpeg', category: 'colliers' },
  { id: 32, name: 'Chaîne en or', price: 3500, image: '/images/CHAINE_O.jpeg', category: 'colliers' },
  { id: 33, name: 'Chaîne en or', price: 3500, image: '/images/YF.jpeg', category: 'colliers' },
  { id: 34, name: 'Chaîne en or', price: 3500, image: '/images/WH.jpeg', category: 'colliers' },
  { id: 35, name: 'Chaîne en or', price: 3500, image: '/images/WH1.jpeg', category: 'colliers' },
  { id: 36, name: 'Chaîne en or', price: 3500, image: '/images/WH2.jpeg', category: 'colliers' },

  // Chaînes
  { id: 37, name: 'Chaîne en or', price: 3500, image: '/images/CHAINE1.jpeg', category: 'chaines' },
  { id: 38, name: 'Chaîne mixte', price: 3500, image: '/images/CHAINE2.jpeg', category: 'chaines' },
  { id: 39, name: 'Chaîne en argent', price: 3500, image: '/images/CHAINE3.jpeg', category: 'chaines' },
  { id: 40, name: 'Chaîne en or', price: 3500, image: '/images/CHAINE4.jpeg', category: 'chaines' },
  { id: 41, name: 'Chaîne en or', price: 3500, image: '/images/CHAINE5.jpeg', category: 'chaines' },
  { id: 42, name: 'Chaîne en or', price: 3500, image: '/images/CHAINE6.jpeg', category: 'chaines' },

  // Bracelets
  { id: 43, name: 'Bracelet moderne', price: 7000, image: '/images/BRACELET.jpeg', category: 'bracelets' },
  { id: 44, name: 'Bracelet moderne', price: 6000, image: '/images/BRACELET1.jpeg', category: 'bracelets' },
  { id: 45, name: 'Bracelet moderne', price: 6000, image: '/images/BRACELET2.jpeg', category: 'bracelets' },
  { id: 46, name: 'Bracelet moderne', price: 6000, image: '/images/BRACELET3.jpeg', category: 'bracelets' },
  { id: 47, name: 'Bracelet moderne', price: 6000, image: '/images/BRACELET4.jpeg', category: 'bracelets' },
  { id: 48, name: 'Bracelet moderne', price: 7000, image: '/images/BRACELET5.jpeg', category: 'bracelets' },
  { id: 49, name: 'Bracelet élégant', price: 7500, image: '/images/BRACELET2.jpeg', category: 'bracelets' },
];

export default products;
