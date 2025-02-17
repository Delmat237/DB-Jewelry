window.onscroll = function() {
    document.getElementById("scrollTopBtn").style.display =
        window.scrollY > 300 ? "block" : "none";
};
function topFunction() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", function () {
    // Liste des produits par catégorie
    const produits = {
        montres: [
            { image: "./assert/images//PATEK.jpeg", desc: "Poedgar1", titre: "Montre de luxe", prix: "30000XAF" },

            { image: "./assert/images//Poedgar.jpeg", desc: "Poedgar1", titre: "Montre de luxe", prix: "13000XAF" },
            { image: "./assert/images//Poedgar1.jpeg", desc: "Poedgar1", titre: "Montre de luxe", prix: "13000XAF" },
            { image: "./assert/images//Poedgar2.jpeg", desc: "Poedgar1", titre: "Montre de luxe", prix: "13000XAF" },
            { image: "./assert/images//Poedgar3.jpeg", desc: "Poedgar1", titre: "Montre de luxe", prix: "13000XAF" },
            { image: "./assert/images//Poedgar4.jpeg", desc: "Poedgar1", titre: "Montre de luxe", prix: "13000XAF" },
            { image: "./assert/images//Poedgar5.jpeg", desc: "Poedgar1", titre: "Montre de luxe", prix: "13000XAF" },
            { image: "./assert/images//Poedgar6.jpeg", desc: "Poedgar1", titre: "Montre de luxe", prix: "13000XAF" },
            { image: "./assert/images//Poedgar7.jpeg", desc: "Poedgar1", titre: "Montre de luxe", prix: "13000XAF" },
            { image: "./assert/images//Poedgar8.jpeg", desc: "Poedgar1", titre: "Montre de luxe", prix: "13000XAF" },

            { image: "./assert/images//certificate.jpeg", desc: "Poedgar", titre: "Montre élégante", prix: "18000XAF" },
            { image: "./assert/images//certificate1.jpeg", desc: "Poedgar", titre: "Montre élégante", prix: "18000XAF" },
            { image: "./assert/images//certificate2.jpeg", desc: "Poedgar", titre: "Montre élégante", prix: "18000XAF" },
            { image: "./assert/images//certificate3.jpeg", desc: "Poedgar", titre: "Montre élégante", prix: "18000XAF" },
            { image: "./assert/images//certificate4.jpeg", desc: "Poedgar", titre: "Montre élégante", prix: "18000XAF" },
            { image: "./assert/images//certificate5.jpeg", desc: "Poedgar", titre: "Montre élégante", prix: "18000XAF" },
            { image: "./assert/images//certificate6.jpeg", desc: "Poedgar", titre: "Montre élégante", prix: "18000XAF" },
            { image: "./assert/images//certificate7.jpeg", desc: "Poedgar", titre: "Montre élégante", prix: "18000XAF" },
           

            { image: "./assert/images//PEDAGAR.jpeg", desc: "Poedgar", titre: "Montre classique", prix: "18000XAF" },
            { image: "./assert/images//PEDAGAR1.jpeg", desc: "Poedgar", titre: "Montre classique", prix: "18000XAF" },
            { image: "./assert/images//PEDAGAR2.jpeg", desc: "Poedgar", titre: "Montre classique", prix: "18000XAF" },

        ],
        colliers: [
            { image: "./assert/images//COLIER2.jpeg", desc: "Collier", titre: "Collier en or", prix: "2500XAF" },
            { image: "./assert/images//COLIER.jpeg", desc: "Collier", titre: "Collier en or", prix: "2500XAF" },
            { image: "./assert/images//COLIER1.jpeg", desc: "Collier", titre: "Collier en or", prix: "2500XAF" },

            { image: "./assert/images//CROIX.jpeg", desc: "Collier luxe", titre: "Collier en argent", prix: "2500XAF" },
            { image: "./assert/images//CROIX1.jpeg", desc: "Collier luxe", titre: "Collier en argent", prix: "2500XAF" },
            { image: "./assert/images//CROIX2.jpeg", desc: "Collier luxe", titre: "Collier en argent", prix: "2500XAF" },
            { image: "./assert/images//CROIX3.jpeg", desc: "Collier luxe", titre: "Collier en argent", prix: "2500XAF" },
            { image: "./assert/images//CROIX4.jpeg", desc: "Collier luxe", titre: "Collier en argent", prix: "2500XAF" },

            { image: "./assert/images//ETOILE.jpeg", desc: "Collier luxe", titre: "Collier en argent", prix: "2500XAF" },
            { image: "./assert/images//ETOILE1.jpeg", desc: "Collier luxe", titre: "Collier en argent", prix: "7000XAF" },

            { image: "./assert/images//CHAINE_O.jpeg", desc: "Collier", titre: "Chaîne en or", prix: "3500XAF" },
            { image: "./assert/images//YF.jpeg", desc: "Collier", titre: "Chaîne en or", prix: "3500XAF" },
            { image: "./assert/images//WH.jpeg", desc: "Collier", titre: "Chaîne en or", prix: "3500XAF" },
            { image: "./assert/images//WH1.jpeg", desc: "Collier", titre: "Chaîne en or", prix: "3500XAF" },
            { image: "./assert/images//WH2.jpeg", desc: "Collier", titre: "Chaîne en or", prix: "3500XAF" }


        ],
        chaines: [
            { image: "./assert/images//CHAINE1.jpeg", desc: "Chaîne", titre: "Chaîne en or", prix: "3500XAF" },
            { image: "./assert/images//CHAINE2.jpeg", desc: "Chaîne", titre: "Chaîne mixte", prix: "3500XAF" },
            { image: "./assert/images//CHAINE3.jpeg", desc: "Chaîne", titre: "Chaîne en argent", prix: "3500XAF" },
            { image: "./assert/images//CHAINE4.jpeg", desc: "Chaîne", titre: "Chaîne en or", prix: "3500XAF" },
            { image: "./assert/images//CHAINE5.jpeg", desc: "Chaîne", titre: "Chaîne en or", prix: "3500XAF" },
            { image: "./assert/images//CHAINE6.jpeg", desc: "Chaîne", titre: "Chaîne en or", prix: "3500XAF" },
        ],
        bracelets: [
            { image: "./assert/images//BRACELET.jpeg", desc: "Bracelet personnalisé", titre: "Bracelet moderne", prix: "7000XAF" },
            { image: "./assert/images//BRACELET1.jpeg", desc: "Bracelet", titre: "Bracelet moderne", prix: "6000XAF" },
            { image: "./assert/images//BRACELET2.jpeg", desc: "Bracelet", titre: "Bracelet moderne", prix: "6000XAF" },
            { image: "./assert/images//BRACELET3.jpeg", desc: "Bracelet", titre: "Bracelet moderne", prix: "6000XAF" },
            { image: "./assert/images//BRACELET4.jpeg", desc: "Bracelet", titre: "Bracelet moderne", prix: "6000XAF" },
            { image: "./assert/images//BRACELET5.jpeg", desc: "Bracelet personnalisé", titre: "Bracelet moderne", prix: "7000XAF" },

            { image: "./assert/images//BRACELET2.jpeg", desc: "Bracelet", titre: "Bracelet élégant", prix: "7500XAF" }
        ]
    };

    // Fonction pour ajouter dynamiquement les produits
    function ajouterProduits(categorie, idSection) {
        let section = document.getElementById(idSection);
        if (!section) return;

        produits[categorie].forEach(produit => {
            let carte = document.createElement("div");
            carte.classList.add("carte");

            carte.innerHTML = `
                <div class="img"><img src="${produit.image}" alt="${produit.desc}"></div>
                <div class="desc">${produit.desc}</div>
                <div class="titre">${produit.titre}</div>
                <div class="box">
                    <div class="prix">${produit.prix}</div>
                    <button class="achat">Acheter</button>
                </div>
            `;

            section.appendChild(carte);
        });
    }

    // Ajout des produits pour chaque section
    ajouterProduits("montres", "montres");
    ajouterProduits("colliers", "colliers");
    ajouterProduits("chaines", "chaines");
    ajouterProduits("bracelets", "bracelets");
});
