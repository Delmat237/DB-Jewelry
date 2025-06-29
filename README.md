# DB Jewelry Backend

## Aperçu

**DB Jewelry** est une plateforme e-commerce pour la vente de bijoux, offrant une API RESTful développée avec **Django** et **Django REST Framework**. Le backend gère les fonctionnalités essentielles telles que la gestion des articles, le panier, les commandes, les paiements via **CinetPay**, les commentaires, l'envoi d'emails, l'authentification des utilisateurs et un tableau de bord pour les clients et les administrateurs. L'API est documentée via **Swagger** (accessible à `/swagger/`) et est conçue pour s'intégrer avec un frontend hébergé sur `https://db-jewelry.vercel.app`.

Ce projet utilise une architecture modulaire avec des applications Django distinctes pour chaque fonctionnalité, assurant une maintenabilité et une scalabilité optimales. Les technologies clés incluent **PostgreSQL** pour la base de données, **Redis** pour le caching, **Simple JWT** pour l'authentification, et **SendGrid** pour l'envoi d'emails.

---

## Structure du projet

Le projet suit une structure Django standard, avec des applications modulaires pour chaque fonctionnalité :

```
db_jewelry_backend/
├── db_jewelry_backend/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── swagger.py
│   ├── wsgi.py
├── articles/
├── authentication/
├── cart/
├── comments/
├── dashboard/
├── emails/
├── orders/
├── payments/
├── media/
├── static/
├── staticfiles/
├── manage.py
├── requirements.txt
├── .env
```

---

## Applications Django

### 1. `articles`
- **Description** : Gère la gestion des produits (bijoux) disponibles à la vente.
- **Fonctionnalités** :
  - Création, lecture, mise à jour et suppression (CRUD) des articles.
  - Gestion des détails des produits (nom, description, prix, image, stock).
  - Tests unitaires pour valider les opérations CRUD.
- **Modèles** :
  - `Article`: Représente un produit avec des champs comme `name`, `description`, `price`, `image`, et `stock`.
- **Endpoints** :
  - `GET /api/articles/` : Liste tous les articles.
  - `POST /api/articles/` : Crée un nouvel article (administrateurs uniquement).
  - `GET /api/articles/<id>/` : Récupère un article spécifique.
  - `PUT /api/articles/<id>/` : Met à jour un article.
  - `DELETE /api/articles/<id>/` : Supprime un article.

### 2. `authentication`
- **Description** : Gère l'authentification et la gestion des utilisateurs via **Simple JWT**.
- **Fonctionnalités** :
  - Inscription des utilisateurs.
  - Connexion avec génération de tokens JWT (access et refresh).
  - Rafraîchissement des tokens.
  - Gestion du profil utilisateur (lecture et mise à jour).
- **Modèles** : Utilise le modèle `User` de `django.contrib.auth`.
- **Endpoints** :
  - `POST /api/auth/register/` : Crée un nouvel utilisateur.
  - `POST /api/auth/login/` : Connecte un utilisateur et renvoie des tokens JWT.
  - `POST /api/auth/refresh/` : Rafraîchit un token d'accès.
  - `GET /api/auth/profile/` : Récupère le profil de l'utilisateur connecté.
  - `PUT /api/auth/profile/` : Met à jour le profil de l'utilisateur connecté.

### 3. `cart`
- **Description** : Gère le panier d'achat des utilisateurs.
- **Fonctionnalités** :
  - Ajout, mise à jour et suppression d'articles dans le panier.
  - Calcul du total du panier.
  - Association du panier à un utilisateur authentifié.
- **Modèles** :
  - `Cart`: Représente le panier d'un utilisateur.
  - `CartItem`: Représente un article dans le panier, avec quantité et référence à un `Article`.
- **Endpoints** :
  - `GET /api/cart/` : Récupère le panier de l'utilisateur.
  - `POST /api/cart/` : Ajoute un article au panier.
  - `PUT /api/cart/<id>/` : Met à jour la quantité d'un article.
  - `DELETE /api/cart/<id>/` : Supprime un article du panier.

### 4. `orders`
- **Description** : Gère les commandes passées par les utilisateurs.
- **Fonctionnalités** :
  - Création et suivi des commandes.
  - Calcul du montant total basé sur les articles du panier.
  - Gestion des statuts de commande (e.g., "PENDING", "PAID").
- **Modèles** :
  - `Order`: Représente une commande avec des champs comme `user`, `total_amount`, et `status`.
- **Endpoints** :
  - `GET /api/orders/` : Liste les commandes de l'utilisateur.
  - `POST /api/orders/` : Crée une nouvelle commande.
  - `GET /api/orders/<id>/` : Récupère une commande spécifique.

### 5. `payments`
- **Description** : Intègre **CinetPay** pour le traitement des paiements.
- **Fonctionnalités** :
  - Initialisation des paiements pour une commande.
  - Gestion des callbacks de CinetPay pour confirmer les paiements.
  - Mise à jour du statut de la commande après un paiement réussi.
- **Endpoints** :
  - `POST /api/payments/` : Initialise un paiement via CinetPay.
  - `POST /api/payments/callback/` : Gère les notifications de CinetPay.

### 6. `comments`
- **Description** : Permet aux utilisateurs de laisser des commentaires et avis sur les articles.
- **Fonctionnalités** :
  - Création, lecture et suppression des commentaires.
  - Association des commentaires à un utilisateur et un article.
- **Modèles** :
  - `Comment`: Représente un commentaire avec des champs comme `user`, `article`, `content`, et `created_at`.
- **Endpoints** :
  - `GET /api/comments/` : Liste les commentaires (filtrables par article).
  - `POST /api/comments/` : Crée un nouveau commentaire.
  - `DELETE /api/comments/<id>/` : Supprime un commentaire (utilisateur ou admin).

### 7. `emails`
- **Description** : Gère l'envoi d'emails via **SendGrid**.
- **Fonctionnalités** :
  - Envoi d'emails personnalisés (e.g., confirmations de commande, notifications de paiement).
- **Endpoints** :
  - `POST /api/send-email/` : Envoie un email avec sujet, message et destinataire.

### 8. `dashboard`
- **Description** : Fournit des tableaux de bord pour les clients et les administrateurs.
- **Fonctionnalités** :
  - Tableau de bord client : Affiche les commandes et informations du profil.
  - Tableau de bord admin : Gère les articles, commandes et utilisateurs.
- **Endpoints** :
  - `GET /api/dashboard/client/` : Récupère les données du tableau de bord client.
  - `GET /api/dashboard/admin/` : Récupère les données du tableau de bord admin (administrateurs uniquement).

---

## Prérequis

- **Python 3.8+**
- **PostgreSQL** (base de données)
- **Redis** (pour le caching)
- **Compte CinetPay** (pour les paiements)
- **Compte SendGrid** (pour les emails)

## Installation

1. **Cloner le dépôt** :
   ```bash
   git clone <url-du-dépôt>
   cd db_jewelry_backend
   ```

2. **Créer un environnement virtuel** :
   ```bash
   python -m venv venv
   source venv/bin/activate  # Sur Windows : venv\Scripts\activate
   ```

3. **Installer les dépendances** :
   ```bash
   pip install -r requirements.txt
   ```

   Contenu de `requirements.txt` :
   ```
    asgiref==3.8.1
    async-timeout==5.0.1
    certifi==2025.6.15
    charset-normalizer==3.4.2
    Django==5.2.3
    django-cors-headers==4.7.0
    django-redis==6.0.0
    djangorestframework==3.16.0
    djangorestframework_simplejwt==5.5.0
    drf-yasg==1.21.10
    gunicorn==23.0.0
    idna==3.10
    inflection==0.5.1
    packaging==25.0
    psycopg2-binary==2.9.10
    PyJWT==2.9.0
    python-decouple==3.8
    pytz==2025.2
    PyYAML==6.0.2
    redis==6.2.0
    requests==2.32.4
    sqlparse==0.5.3
    typing_extensions==4.14.0
    uritemplate==4.2.0
    urllib3==1.26.20
   ```

4. **Configurer les variables d'environnement** :
   Créez un fichier `.env` à la racine du projet avec le contenu suivant :
   ```
   SECRET_KEY=votre-cle-secrete-generee
   DEBUG=True
   ALLOWED_HOSTS=localhost,127.0.0.1,api.db-jewelry.com
   DATABASE_URL=postgres://user:password@localhost:5432/db_jewelry
   CINETPAY_API_KEY=votre-cle-api-cinetpay
   CINETPAY_SITE_ID=votre-site-id
   EMAIL_HOST_PASSWORD=votre-cle-sendgrid
   EMAIL_HOST=smtp.sendgrid.net
   EMAIL_PORT=587
   EMAIL_USE_TLS=True
   EMAIL_HOST_USER=apikey
   DEFAULT_FROM_EMAIL=contact@db-jewelry.com
   REDIS_URL=redis://127.0.0.1:6379/1
   ```

   - Générez une clé secrète avec :
     ```bash
     python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
     ```
   - Obtenez les clés CinetPay via leur portail (utilisez le mode sandbox pour les tests).
   - Créez un compte SendGrid pour obtenir une clé API.

5. **Configurer PostgreSQL** :
   Créez la base de données :
   ```bash
   psql -U postgres
   CREATE DATABASE db_jewelry;
   ```

6. **Appliquer les migrations** :
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

7. **Créer un superutilisateur** :
   ```bash
   python manage.py createsuperuser
   ```

8. **Collecter les fichiers statiques** :
   ```bash
   python manage.py collectstatic
   ```

9. **Démarrer le serveur local** :
   ```bash
   python manage.py runserver
   ```

   Accédez à :
   - Interface admin : `http://localhost:8000/admin/`
   - Documentation Swagger : `http://localhost:8000/swagger/`

---

## Endpoints principaux et exemples d'utilisation avec `curl`

Les endpoints suivants sont accessibles via l'API. Les exemples `curl` supposent que le serveur est en cours d'exécution sur `http://localhost:8000`. Les endpoints protégés nécessitent un token JWT dans l'en-tête `Authorization: Bearer <access_token>`.

### Authentification

- **POST /auth/register/** : Crée un nouvel utilisateur.
  ```bash
  curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "email": "test@example.com", "password": "testpass123", "first_name": "Test", "last_name": "User"}'
  ```
  **Réponse** (201 Created) :
  ```json
  {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com",
    "first_name": "Test",
    "last_name": "User"
  }
  ```

- **POST /auth/login/** : Connecte un utilisateur et renvoie des tokens JWT.
  ```bash
  curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "testpass123"}'
  ```
  **Réponse** (200 OK) :
  ```json
  {
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "username": "testuser",
    "email": "test@example.com"
  }
  ```

- **POST /auth/refresh/** : Rafraîchit un token d'accès.
  ```bash
  curl -X POST http://localhost:8000/api/auth/refresh/ \
  -H "Content-Type: application/json" \
  -d '{"refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."}'
  ```
  **Réponse** (200 OK) :
  ```json
  {
    "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
  }
  ```

- **GET /auth/profile/** : Récupère le profil de l'utilisateur connecté.
  ```bash
  curl -X GET http://localhost:8000/api/auth/profile/ \
  -H "Authorization: Bearer <access_token>"
  ```
  **Réponse** (200 OK) :
  ```json
  {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com",
    "first_name": "Test",
    "last_name": "User"
  }
  ```

- **PUT /auth/profile/** : Met à jour le profil de l'utilisateur connecté.
  ```bash
  curl -X PUT http://localhost:8000/api/auth/profile/ \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{"email": "updated@example.com", "first_name": "Updated"}'
  ```
  **Réponse** (200 OK) :
  ```json
  {
    "id": 1,
    "username": "testuser",
    "email": "updated@example.com",
    "first_name": "Updated",
    "last_name": "User"
  }
  ```

### Articles

- **GET /api/articles/** : Liste tous les articles.
  ```bash
  curl -X GET http://localhost:8000/api/articles/
  ```
  **Réponse** (200 OK) :
  ```json
  [
    {
      "id": 1,
      "name": "Bague en Or",
      "description": "Bague en or 18 carats",
      "price": 299.99,
      "stock": 10,
      "image": "/media/images/bague.jpg"
    },
    ...
  ]
  ```

- **POST /api/articles/** : Crée un nouvel article (administrateurs uniquement).
  ```bash
  curl -X POST http://localhost:8000/api/articles/ \
  -H "Authorization: Bearer <admin_access_token>" \
  -H "Content-Type: application/json" \
  -d '{"name": "Collier Argent", "description": "Collier en argent 925", "price": 149.99, "stock": 20}'
  ```
  **Réponse** (201 Created) :
  ```json
  {
    "id": 2,
    "name": "Collier Argent",
    "description": "Collier en argent 925",
    "price": 149.99,
    "stock": 20,
    "image": null
  }
  ```

### Panier

- **GET /api/cart/** : Récupère le panier de l'utilisateur connecté.
  ```bash
  curl -X GET http://localhost:8000/api/cart/ \
  -H "Authorization: Bearer <access_token>"
  ```
  **Réponse** (200 OK) :
  ```json
  {
    "id": 1,
    "user": 1,
    "items": [
      {
        "id": 1,
        "article": {
          "id": 1,
          "name": "Bague en Or"
        },
        "quantity": 2
      }
    ],
    "created_at": "2025-06-27T09:57:00Z"
  }
  ```

- **POST /api/cart/** : Ajoute un article au panier.
  ```bash
  curl -X POST http://localhost:8000/api/cart/ \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{"article_id": 1, "quantity": 2}'
  ```
  **Réponse** (201 Created) :
  ```json
  {
    "id": 1,
    "article": {
      "id": 1,
      "name": "Bague en Or"
    },
    "quantity": 2
  }
  ```

### Commandes

- **POST /api/orders/** : Crée une nouvelle commande.
  ```bash
  curl -X POST http://localhost:8000/api/orders/ \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{"cart_id": 1}'
  ```
  **Réponse** (201 Created) :
  ```json
  {
    "id": 1,
    "user": 1,
    "total_amount": 599.98,
    "status": "PENDING",
    "created_at": "2025-06-27T09:57:00Z"
  }
  ```

### Paiements

- **POST /api/payments/** : Initialise un paiement via CinetPay.
  ```bash
  curl -X POST http://localhost:8000/api/payments/ \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{"order_id": 1}'
  ```
  **Réponse** (200 OK, exemple avec CinetPay) :
  ```json
  {
    "code": "00",
    "message": "Paiement initié",
    "data": {
      "payment_url": "https://api-checkout.cinetpay.com/v2/payment/..."
    }
  }
  ```

### Commentaires

- **POST /api/comments/** : Crée un nouveau commentaire.
  ```bash
  curl -X POST http://localhost:8000/api/comments/ \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{"article_id": 1, "content": "Superbe bague, très élégante !"}'
  ```
  **Réponse** (201 Created) :
  ```json
  {
    "id": 1,
    "article": 1,
    "user": 1,
    "content": "Superbe bague, très élégante !",
    "created_at": "2025-06-27T09:57:00Z"
  }
  ```

### Emails

- **POST /api/send-email/** : Envoie un email.
  ```bash
  curl -X POST http://localhost:8000/api/send-email/ \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{"subject": "Test Email", "message": "Ceci est un test.", "to_email": "recipient@example.com"}'
  ```
  **Réponse** (200 OK) :
  ```json
  {
    "status": "Email envoyé"
  }
  ```

### Tableau de bord

- **GET /api/dashboard/client/** : Récupère les données du tableau de bord client.
  ```bash
  curl -X GET http://localhost:8000/api/dashboard/client/ \
  -H "Authorization: Bearer <access_token>"
  ```
  **Réponse** (200 OK) :
  ```json
  {
    "user": {
      "username": "testuser",
      "email": "test@example.com"
    },
    "orders": [
      {
        "id": 1,
        "total_amount": 599.98,
        "status": "PENDING"
      }
    ]
  }
  ```

- **GET /api/dashboard/admin/** : Récupère les données du tableau de bord admin.
  ```bash
  curl -X GET http://localhost:8000/api/dashboard/admin/ \
  -H "Authorization: Bearer <admin_access_token>"
  ```
  **Réponse** (200 OK) :
  ```json
  {
    "total_users": 10,
    "total_orders": 5,
    "total_articles": 20
  }
  ```

Consultez `http://localhost:8000/swagger/` pour une documentation complète des endpoints.

---

## Tests

Exécutez les tests unitaires pour valider les fonctionnalités :

```bash
python manage.py test
```

Les tests sont définis dans les fichiers `tests.py` des applications (par exemple, `articles/tests.py`).

---

## Déploiement

1. **Configurer pour la production** :
   - Définissez `DEBUG=False` dans `.env`.
   - Mettez à jour `ALLOWED_HOSTS` avec le domaine de production (e.g., `api.db-jewelry.com`).

2. **Collecter les fichiers statiques** :
   ```bash
   python manage.py collectstatic
   ```

3. **Lancer avec Gunicorn** :
   ```bash
   gunicorn --workers 3 db_jewelry_backend.wsgi:application
   ```

4. **Configurer un reverse proxy (Nginx)** :
   Exemple de configuration Nginx :
   ```nginx
   server {
       listen 80;
       server_name api.db-jewelry.com;

       location /static/ {
           alias /path/to/db_jewelry_backend/staticfiles/;
       }

       location /media/ {
           alias /path/to/db_jewelry_backend/media/;
       }

       location / {
           proxy_pass http://127.0.0.1:8000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

5. **Hébergement** :
   - Utilisez une plateforme comme **Heroku**, **AWS**, ou **Render**.
   - Configurez un service de stockage cloud (e.g., AWS S3) pour les fichiers média (images des articles).

---

## Intégration avec le frontend

Le frontend est hébergé sur `https://db-jewelry.vercel.app`. Assurez-vous que :
- Les requêtes API incluent les en-têtes JWT (`Authorization: Bearer <token>`) pour les endpoints protégés.
- Les CORS sont configurés correctement dans `settings.py` :
  ```python
  CORS_ALLOWED_ORIGINS = [
      'https://db-jewelry.vercel.app',
  ]
  ```

---

## Dépannage

- **Erreurs de migrations** : Supprimez les fichiers de migration et régénérez-les :
  ```bash
  find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
  python manage.py makemigrations
  python manage.py migrate
  ```
- **Problèmes CORS** : Vérifiez `CORS_ALLOWED_ORIGINS` dans `settings.py`.
- **Erreurs CinetPay** : Testez en mode sandbox et consultez les logs.
- **Emails non envoyés** : Vérifiez les logs SendGrid et la configuration dans `.env`.
- **Static files** : Assurez-vous que `STATIC_ROOT` et `STATICFILES_DIRS` sont définis.

---

## Contribution

1. Forkez le dépôt.
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/nouvelle-fonctionnalite`).
3. Commitez vos changements (`git commit -m 'Ajout de nouvelle fonctionnalité'`).
4. Poussez vers la branche (`git push origin feature/nouvelle-fonctionnalite`).
5. Créez une Pull Request.

---

## Licence

Ce projet est sous licence **MIT**. Voir le fichier `LICENSE` pour plus de détails.

---

## Contact

Pour toute question ou support, contactez :
- **Email** : contact@db-jewelry.com
- **Développeur** : [Votre nom ou équipe]