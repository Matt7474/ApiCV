# API CV - Portfolio

Bienvenue dans l'API du portfolio - CV ! Cette API permet de gérer les projets affichés sur mon site CV.

## 📌 Routes disponibles

### 🔹 Projets

- `GET /projects` → Récupérer tous les projets
- `GET /projects/:slug` → Récupérer un projet spécifique
- `POST /projects` → Ajouter un projet *(authentification requise)*
- `PUT /projects/:slug` → Modifier un projet *(authentification requise)*
- `DELETE /projects/:slug` → Supprimer un projet *(authentification requise)*

Doc Swagger : https://apicv.matt-dev.fr/api-docs/

## 🔑 Authentification

L'API utilise une clé API pour sécuriser certaines actions (ajout, modification et suppression de projets).

## 🛠 Technologies utilisées

- **Node.js** (Express)
- **PostgreSQL** (Base de données)
- **TOKEN**  (Authentification par clé API)

## ✨ Auteur

Développé par [Matt7474](https://github.com/Matt7474).

