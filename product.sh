#!/bin/bash

# Admin access token (replace if expired)
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUxMDU0ODI0LCJpYXQiOjE3NTEwNTEyMjQsImp0aSI6ImU2YTY0ZDdjZmI2NjQ1MjZiYmJlNTY2ZTM1ZDgxMDVjIiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJkZWxtYXQiLCJlbWFpbCI6ImF6YW5ndWVsZW9uZWw5QGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImZpcnN0X25hbWUiOiIiLCJsYXN0X25hbWUiOiIifQ.uruOYY67fP-Yp1mubVDFjI76NkdkylWtqCMRR_i2kr4"

# Base URL
BASE_URL="http://localhost:8000/api/articles/"

# Image directory
IMAGE_DIR="/home/delmat/Perso/DB_Jewelry/db-jewelry-frontend/public/images"

# Category mapping
declare -A CATEGORY_MAP=(
  ["montres"]=3
  ["colliers"]=1
  ["chaines"]=4
  ["bracelets"]=5
  ["bagues"]=2
)

# Products array with all 49 products
PRODUCTS=(
  "Montre de luxe 1|30000|montres|PATEK.jpeg|Montre de luxe élégante en acier inoxydable"
  "Montre de luxe 2|13000|montres|Poedgar.jpeg|Montre de luxe classique avec cadran noir"
  "Montre de luxe 3|13000|montres|Poedgar1.jpeg|Montre de luxe avec bracelet en cuir"
  "Montre de luxe 4|13000|montres|Poedgar2.jpeg|Montre de luxe avec cadran argenté"
  "Montre de luxe 5|13000|montres|Poedgar3.jpeg|Montre de luxe élégante et moderne"
  "Montre de luxe 6|13000|montres|Poedgar4.jpeg|Montre de luxe avec détails dorés"
  "Montre de luxe 7|13000|montres|Poedgar5.jpeg|Montre de luxe avec cadran bleu"
  "Montre de luxe 8|13000|montres|Poedgar6.jpeg|Montre de luxe robuste et élégante"
  "Montre de luxe 9|13000|montres|Poedgar7.jpeg|Montre de luxe avec design minimaliste"
  "Montre de luxe 10|13000|montres|Poedgar8.jpeg|Montre de luxe avec bracelet en métal"
  "Montre élégante 1|18000|montres|certificate.jpeg|Montre élégante avec certificat d'authenticité"
  "Montre élégante 2|18000|montres|certificate1.jpeg|Montre élégante avec cadran blanc"
  "Montre élégante 3|18000|montres|certificate2.jpeg|Montre élégante avec bracelet en cuir noir"
  "Montre élégante 4|18000|montres|certificate3.jpeg|Montre élégante avec détails en or"
  "Montre élégante 5|18000|montres|certificate4.jpeg|Montre élégante avec cadran argenté"
  "Montre élégante 6|18000|montres|certificate5.jpeg|Montre élégante avec design moderne"
  "Montre élégante 7|18000|montres|certificate6.jpeg|Montre élégante avec bracelet en acier"
  "Montre élégante 8|18000|montres|certificate7.jpeg|Montre élégante avec cadran noir élégant"
  "Montre classique 1|18000|montres|PEDAGAR.jpeg|Montre classique intemporelle"
  "Montre classique 2|18000|montres|PEDAGAR1.jpeg|Montre classique avec cadran doré"
  "Montre classique 3|18000|montres|PEDAGAR2.jpeg|Montre classique avec bracelet en cuir marron"
  "Collier en or 1|2500|colliers|COLIER2.jpeg|Collier en or 18 carats avec pendentif élégant"
  "Collier en or 2|2500|colliers|COLIER.jpeg|Collier en or avec design minimaliste"
  "Collier en or 3|2500|colliers|COLIER1.jpeg|Collier en or avec détails sophistiqués"
  "Collier en argent 1|2500|colliers|CROIX.jpeg|Collier en argent avec pendentif en croix"
  "Collier en argent 2|2500|colliers|CROIX1.jpeg|Collier en argent avec croix délicate"
  "Collier en argent 3|2500|colliers|CROIX2.jpeg|Collier en argent avec design moderne"
  "Collier en argent 4|2500|colliers|CROIX3.jpeg|Collier en argent avec pendentif unique"
  "Collier en argent 5|2500|colliers|CROIX4.jpeg|Collier en argent avec croix élégante"
  "Collier en argent 6|2500|colliers|ETOILE.jpeg|Collier en argent avec pendentif étoile"
  "Collier en argent 7|7000|colliers|ETOILE1.jpeg|Collier en argent avec étoile scintillante"
  "Chaîne en or 1|3500|colliers|CHAINE_O.jpeg|Chaîne en or robuste et élégante"
  "Chaîne en or 2|3500|colliers|YF.jpeg|Chaîne en or avec design audacieux"
  "Chaîne en or 3|3500|colliers|WH.jpeg|Chaîne en or avec finition brillante"
  "Chaîne en or 4|3500|colliers|WH1.jpeg|Chaîne en or avec style moderne"
  "Chaîne en or 5|3500|colliers|WH2.jpeg|Chaîne en or avec détails raffinés"
  "Chaîne en or 6|3500|chaines|CHAINE1.jpeg|Chaîne en or pour un look classique"
  "Chaîne mixte 1|3500|chaines|CHAINE2.jpeg|Chaîne mixte en or et argent"
  "Chaîne en argent 1|3500|chaines|CHAINE3.jpeg|Chaîne en argent durable et élégante"
  "Chaîne en or 7|3500|chaines|CHAINE4.jpeg|Chaîne en or avec design épuré"
  "Chaîne en or 8|3500|chaines|CHAINE5.jpeg|Chaîne en or avec finition mate"
  "Chaîne en or 9|3500|chaines|CHAINE6.jpeg|Chaîne en or avec style sophistiqué"
  "Bracelet moderne 1|7000|bracelets|BRACELET.jpeg|Bracelet moderne en argent massif"
  "Bracelet moderne 2|6000|bracelets|BRACELET1.jpeg|Bracelet moderne avec design épuré"
  "Bracelet moderne 3|6000|bracelets|BRACELET2.jpeg|Bracelet moderne avec détails uniques"
  "Bracelet moderne 4|6000|bracelets|BRACELET3.jpeg|Bracelet moderne avec finition brillante"
  "Bracelet moderne 5|6000|bracelets|BRACELET4.jpeg|Bracelet moderne avec style contemporain"
  "Bracelet moderne 6|7000|bracelets|BRACELET5.jpeg|Bracelet moderne avec design audacieux"
  "Bracelet élégant 1|7500|bracelets|BRACELET2.jpeg|Bracelet élégant avec détails raffinés"
)

for product in "${PRODUCTS[@]}"; do
  IFS='|' read -r name price category image description <<< "$product"
  category_id=${CATEGORY_MAP[$category]}
  image_path="$IMAGE_DIR/$image"

  echo "Registering: $name (Category ID: $category_id)"
  if [ -f "$image_path" ]; then
    curl -X POST $BASE_URL \
      -H "Authorization: Bearer $TOKEN" \
      -F "name=$name" \
      -F "category_id=$category_id" \
      -F "description=$description" \
      -F "price=$price" \
      -F "stock=10" \
      -F "image=@$image_path"
  else
    echo "Image not found: $image_path, skipping image upload"
    curl -X POST $BASE_URL \
      -H "Authorization: Bearer $TOKEN" \
      -F "name=$name" \
      -F "category_id=$category_id" \
      -F "description=$description" \
      -F "price=$price" \
      -F "stock=10"
  fi
done
