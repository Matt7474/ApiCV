import { Project } from "../Models/Project.js";

const projectControllers = {
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
			res.status(500).json({ message: "Erreur serveur" });
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
		console.log("requete effectué");

		try {
			let image = "/uploads/default-image.jpg";

			if (req.file) {
				image = `/uploads/${req.file.filename}`;
			}

			// Vérifie la présence des champs nécessaires
			const {
				title,
				slug,
				github,
				description,
				date,
				conception,
				front,
				back,
				fullstack,
				bdd,
			} = req.body;

			if (
				!title ||
				!slug ||
				!github ||
				!description ||
				!date ||
				!conception ||
				!front ||
				!back ||
				!fullstack ||
				!bdd
			) {
				return res
					.status(400)
					.json({ message: "Tous les champs doivent être remplis" });
			}

			const newProject = await Project.create({
				image,
				title,
				slug,
				github,
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

	async update(req, res) {
		try {
			const {
				title,
				description,
				slug,
				github,

				date,
				technoConception,
				technoFront,
				technoBack,
				technoFullstack,
				technoBDD,
				oldSlug,
			} = req.body;

			console.log("Données reçues :", {
				technoConception,
				technoFront,
				technoBack,
				technoFullstack,
				technoBDD,
			});

			// Vérifie si le projet existe avec l'ancien slug
			const project = await Project.findOne({ where: { slug: oldSlug } });

			if (!project) {
				return res.status(404).json({ message: "Projet non trouvé" });
			}

			await project.update({
				title,
				slug,
				github,
				description,
				date,
				technoConception,
				technoFront,
				technoBack,
				technoFullstack,
				technoBDD,
			});

			res.status(200).json(project); // Retourne le projet mis à jour
		} catch (error) {
			console.error("Erreur lors de la mise à jour :", error);
			res.status(500).json({ message: "Erreur serveur" });
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
