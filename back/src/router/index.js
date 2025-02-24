import { Router } from "express";
import { catchErrors } from "../middlewares/catchErrors.js";
import { projectControllers } from "../controllers/projectControllers.js";

const router = Router();

// Route pour récupérer tous les projets
/**
 * @swagger
 * /members:
 *   get:
 *     summary: Récupère la liste des projets
 *     description: Retourne tous les projets.
 *     responses:
 *       200:
 *         description: Liste des projets récupérée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get("/projects", catchErrors(projectControllers.index));

router.get("/projects/:slug", catchErrors(projectControllers.show));

// // Route pour récupérer un membre spécifique
// /**
//  * @swagger
//  * /members/{id}:
//  *   get:
//  *     summary: Récupère un membre spécifique
//  *     description: Retourne les détails d'un membre à partir de son ID.
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         description: ID du membre à récupérer
//  *         schema:
//  *           type: integer
//  *     responses:
//  *       200:
//  *         description: Détails du membre
//  *       404:
//  *         description: Membre non trouvé
//  */
// router.get("/members/:id(\\d+)", catchErrors(membersControllers.show));

// // Route pour ajouter un nouveau membre
// /**
//  * @swagger
//  * /members:
//  *   post:
//  *     summary: Ajoute un nouveau membre
//  *     description: Crée un nouveau membre et l'ajoute à la base de données.
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - first_name
//  *               - last_name
//  *               - gender
//  *               - date_of_birth
//  *               - phone_number
//  *               - email
//  *               - street_number
//  *               - address_extra
//  *               - street_name
//  *               - zip_code
//  *               - city
//  *               - country
//  *               - photo
//  *               - password
//  *             properties:
//  *               first_name:
//  *                 type: string
//  *                 example: "John"
//  *               last_name:
//  *                 type: string
//  *                 example: "Doe"
//  *               gender:
//  *                 type: string
//  *                 example: "Homme"
//  *               date_of_birth:
//  *                 type: string
//  *                 format: date
//  *                 example: "1985-07-12"
//  *               phone_number:
//  *                 type: string
//  *                 example: "0601020304"
//  *               email:
//  *                 type: string
//  *                 format: email
//  *                 example: "john.doe@example.com"
//  *               street_number:
//  *                 type: integer
//  *                 example: 12
//  *               address_extra:
//  *                 type: string
//  *                 example: "Appartement B"
//  *               street_name:
//  *                 type: string
//  *                 example: "Rue des Lilas"
//  *               zip_code:
//  *                 type: string
//  *                 example: "75001"
//  *               city:
//  *                 type: string
//  *                 example: "Paris"
//  *               country:
//  *                 type: string
//  *                 example: "France"
//  *               photo:
//  *                 type: string
//  *                 example: "defaultUser.svg"
//  *               password:
//  *                 type: string
//  *                 example: "par dessus les nuages"
//  *     responses:
//  *       201:
//  *         description: Membre ajouté avec succès
//  *       400:
//  *         description: Erreur de validation
//  */
// router.post("/members", catchErrors(membersControllers.store));

// // Route pour mettre à jour un membre
// /**
//  * @swagger
//  * /members/{id}:
//  *   patch:
//  *     summary: Met à jour un membre
//  *     description: Modifie les informations d'un membre existant.
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         description: ID du membre à mettre à jour
//  *         schema:
//  *           type: integer
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               first_name:
//  *                 type: string
//  *                 example: "John"
//  *               last_name:
//  *                 type: string
//  *                 example: "Doe"
//  *               gender:
//  *                 type: string
//  *                 example: "Homme"
//  *               date_of_birth:
//  *                 type: string
//  *                 format: date
//  *                 example: "1985-07-12"
//  *               phone_number:
//  *                 type: string
//  *                 example: "0601020304"
//  *               email:
//  *                 type: string
//  *                 format: email
//  *                 example: "john.doe@example.com"
//  *               street_number:
//  *                 type: integer
//  *                 example: 12
//  *               address_extra:
//  *                 type: string
//  *                 example: "Appartement B"
//  *               street_name:
//  *                 type: string
//  *                 example: "Rue des Lilas"
//  *               zip_code:
//  *                 type: string
//  *                 example: "75001"
//  *               city:
//  *                 type: string
//  *                 example: "Paris"
//  *               country:
//  *                 type: string
//  *                 example: "France"
//  *               photo:
//  *                 type: string
//  *                 example: "defaultUser.svg"
//  *               password:
//  *                 type: string
//  *                 example: "par dessus les nuages"
//  *     responses:
//  *       200:
//  *         description: Membre mis à jour
//  *       400:
//  *         description: Erreur de validation
//  *       404:
//  *         description: Membre non trouvé
//  */
// router.patch("/members/:id(\\d+)", catchErrors(membersControllers.update));

// // Route pour supprimer un membre
// /**
//  * @swagger
//  * /members/{id}:
//  *   delete:
//  *     summary: Supprime un membre
//  *     description: Supprime un membre de la base de données.
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         description: ID du membre à supprimer
//  *         schema:
//  *           type: integer
//  *     responses:
//  *       200:
//  *         description: Membre supprimé avec succès
//  *       404:
//  *         description: Membre non trouvé
//  */
// router.delete("/members/:id(\\d+)", catchErrors(membersControllers.destroy));

// // Route de connexion
// /**
//  * @swagger
//  * /login:
//  *   post:
//  *     summary: Authentification utilisateur
//  *     description: Permet à un utilisateur de se connecter et d'obtenir un token JWT.
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - email
//  *               - password
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 example: "john.doe@example.com"
//  *               password:
//  *                 type: string
//  *                 example: "par dessus les nuages"
//  *     responses:
//  *       200:
//  *         description: Connexion réussie
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 token:
//  *                   type: string
//  *       400:
//  *         description: Erreur de validation
//  *       401:
//  *         description: Identifiants incorrects
//  */
// router.post("/login", catchErrors(loginControllers.index));

export { router };
