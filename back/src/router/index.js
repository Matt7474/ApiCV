import express from "express";
import { Router } from "express";
import { catchErrors } from "../middlewares/catchErrors.js";
import { projectControllers } from "../controllers/projectControllers.js";
import multer from "multer";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.use("/uploads", express.static("uploads"));
router.get("/", catchErrors(projectControllers.test));

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Gestion des projets
 */

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Récupérer tous les projets
 *     description: Retourne la liste des projets disponibles.
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 */
router.get("/projects", catchErrors(projectControllers.index));

/**
 * @swagger
 * /projects/{slug}:
 *   get:
 *     summary: Récupérer un projet spécifique
 *     description: Retourne les détails d'un projet en fonction de son slug.
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         description: Slug du projet à récupérer.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Succès
 *       404:
 *         description: Projet non trouvé
 */
router.get("/projects/:slug", catchErrors(projectControllers.show));

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Ajouter un nouveau projet (non accessible via Swagger)
 *     description: Crée un nouveau projet avec une image.
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Projet créé avec succès
 *       400:
 *         description: Erreur de validation
 */
router.post(
	"/projects",
	upload.single("image"),
	catchErrors(projectControllers.store),
);

/**
 * @swagger
 * /projects/{slug}:
 *   patch:
 *     summary: Mettre à jour un projet existant (non accessible via Swagger)
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         description: Slug du projet à mettre à jour.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Projet mis à jour
 *       404:
 *         description: Projet non trouvé
 */
router.patch("/projects/:slug", catchErrors(projectControllers.update));

/**
 * @swagger
 * /projects/{slug}:
 *   delete:
 *     summary: Supprimer un projet (non accessible via Swagger)
 *     description: Cette requête supprime un projet en fonction de son slug. **Elle ne peut pas être exécutée depuis Swagger.**
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         description: Slug du projet à supprimer.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Projet supprimé avec succès
 *       403:
 *         description: Action interdite via Swagger
 */
router.delete("/projects/:slug", catchErrors(projectControllers.destroy));

export { router };
