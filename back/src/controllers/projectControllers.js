import { Project } from "../Models/Project.js";

import multer from "multer";
import path from "node:path";

//!!!!!!!!!!!!!!!!!!!!!! MODULE MULTER !!!!!!!!!!!!!!!!!!!!!!!!!!!!!//

// Configuration de multer pour le stockage sur disque
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/"); // Dossier où les fichiers seront stockés
	},
	filename: (req, file, cb) => {
		// Générer un nom unique pour chaque fichier
		const uniqueSuffix = Date.now() + path.extname(file.originalname); // Utilisation de l'extension d'origine
		cb(null, `${file.fieldname}-${uniqueSuffix}`); // Nom final du fichier
	},
});

// Créer un instance de multer avec la configuration
const upload = multer({ storage: storage });

export default upload; // Exposer l'instance de multer pour utilisation dans vos routes

//!!!!!!!!!!!!!!!!!!!!!! FIN MODULE MULTER !!!!!!!!!!!!!!!!!!!!!!!!!//

const projectControllers = {
	test(req, res) {
		res.send("route test ok !");
	},

	async index(req, res) {
		try {
			const projects = await Project.findAll();

			if (!projects || projects.length === 0) {
				return res.status(404).json({ message: "Pas de projets à afficher" });
			}
			const projectsJSON = projects.map((project) => project.toJSON());
			console.log(projectsJSON);
			res.status(200).json(projectsJSON);
		} catch (error) {
			console.error("Erreur lors de la connexion :", error);
			res
				.status(500)
				.json({ message: "Erreur serveur a mainController.index" });
		}
	},
	async show(req, res) {
		try {
			const { slug } = req.params;

			const project = await Project.findOne({ where: { slug } });

			if (!project) {
				return res.status(404).json({ message: "Projet non trouvé" });
			}

			const projectJSON = project.toJSON();
			console.log(projectJSON);
			res.status(200).json(projectJSON);
		} catch (error) {
			console.error("Erreur lors de la connexion :", error);
			res.status(500).json({ message: "Erreur serveur" });
		}
	},

	async store(req, res) {
		console.log("requete effectué", req.body);

		try {
			let image = "/uploads/default-image.jpg";

			if (req.file) {
				image = `/uploads/${req.file.filename}`;
			}

			const {
				title,
				slug,
				github,
				site,
				description,
				date,
				conception,
				front,
				back,
				fullstack,
				bdd,
			} = req.body;

			if (!title || !slug || !description) {
				return res.status(400).json({
					message: "Les champs Titre, Description et Slug doivent etre remplis",
				});
			}

			const newProject = await Project.create({
				image,
				title,
				slug,
				github,
				site,
				description,
				date,
				conception: JSON.parse(conception),
				front: JSON.parse(front),
				back: JSON.parse(back),
				fullstack: JSON.parse(fullstack),
				bdd: JSON.parse(bdd),
			});

			if (!newProject) {
				return res
					.status(404)
					.json({ message: "Erreur lors de la création du projet" });
			}

			console.log(newProject);
			res.status(201).json(newProject);
		} catch (error) {
			console.error("Erreur lors de la création du projet :", error);
			res.status(500).json({ message: "Erreur serveur" });
		}
	},

	// async update(req, res) {
	// 	try {
	// 		const {
	// 			title,
	// 			description,
	// 			slug,
	// 			github,
	// 			site,
	// 			date,
	// 			technoConception,
	// 			technoFront,
	// 			technoBack,
	// 			technoFullstack,
	// 			technoBDD,
	// 			oldSlug,
	// 		} = req.body;

	// 		console.log("Données reçues :", {
	// 			technoConception,
	// 			technoFront,
	// 			technoBack,
	// 			technoFullstack,
	// 			technoBDD,
	// 		});

	// 		// Vérifie si le projet existe avec l'ancien slug
	// 		const project = await Project.findOne({ where: { slug: oldSlug } });

	// 		if (!project) {
	// 			return res.status(404).json({ message: "Projet non trouvé" });
	// 		}

	// 		await project.update({
	// 			title,
	// 			description,
	// 			slug,
	// 			github,
	// 			site,
	// 			date,
	// 			technoConception,
	// 			technoFront,
	// 			technoBack,
	// 			technoFullstack,
	// 			technoBDD,
	// 		});

	// 		res.status(200).json(project); // Retourne le projet mis à jour
	// 	} catch (error) {
	// 		console.error("Erreur lors de la mise à jour :", error);
	// 		res.status(500).json({ message: "Erreur serveur" });
	// 	}
	// },

	async update(req, res) {
		try {
			const {
				title,
				description,
				slug,
				github,
				site,
				date,
				technoConception,
				technoFront,
				technoBack,
				technoFullstack,
				technoBDD,
				oldSlug,
			} = req.body;

			// Validation des champs essentiels
			if (!title || !description || !slug || !oldSlug) {
				return res.status(400).json({
					message: "Les champs Titre, Description, Slug et OldSlug sont requis",
				});
			}

			// Recherche du projet avec l'ancien slug
			const project = await Project.findOne({ where: { slug: oldSlug } });

			if (!project) {
				return res.status(404).json({ message: "Projet non trouvé" });
			}

			let image = project.image; // Si aucune nouvelle image n'est envoyée, on garde l'ancienne image

			// Si un fichier image est envoyé, on met à jour l'image du projet
			if (req.file) {
				console.log("Image reçue : ", req.file); // Log de l'image reçue
				image = `/uploads/${req.file.filename}`; // On stocke le chemin de l'image
			}

			// Mise à jour du projet dans la base de données
			await project.update({
				title,
				description,
				slug, // On met à jour le slug
				github,
				site,
				date,
				technoConception,
				technoFront,
				technoBack,
				technoFullstack,
				technoBDD,
				image, // On met à jour l'image si nécessaire
			});

			// Récupérer le projet après mise à jour
			await project.reload();

			// Retour du projet mis à jour
			res.status(200).json(project);
		} catch (error) {
			console.error("Erreur lors de la mise à jour :", error);
			res.status(500).json({ message: "Erreur serveur", error: error.message });
		}
	},

	async destroy(req, res) {
		try {
			const { slug } = req.params;

			console.log("Slug reçu :", slug);

			// Vérifie si le slug est bien fourni
			if (!slug) {
				return res.status(400).json({ message: "Slug manquant" });
			}

			// Recherche du projet avec la bonne clause WHERE
			const project = await Project.findOne({ where: { slug } });

			if (!project) {
				return res.status(404).json({ message: "Projet non trouvé" });
			}

			// Suppression du projet
			await project.destroy();

			res.status(200).json({ message: "Projet supprimé avec succès", project });
		} catch (error) {
			console.error("Erreur lors de la suppression :", error);
			res.status(500).json({ message: "Erreur serveur" });
		}
	},
};

export { projectControllers };
