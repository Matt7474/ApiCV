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
		try {
			// Définir une image par défaut
			let image = "/uploads/default-image.jpg";
	
			// Vérifie si un fichier a bien été téléchargé
			if (req.file) {
				image = `/uploads/${req.file.filename}`;
			}
	
			// Vérifie la présence des champs nécessaires
			const { title, slug, github, description, techno } = req.body;
			if (!title || !slug || !github || !description || !techno) {
				return res.status(400).json({ message: "Tous les champs doivent être remplis" });
			}
	
			// Crée le nouveau projet
			const newProject = await Project.create({
				image,
				title,
				slug,
				github,
				description,
				techno,
			});
	
			if (!newProject) {
				return res.status(404).json({ message: "Erreur lors de la création du projet" });
			}
	
			// Retourne le projet créé
			console.log(newProject); // Vérifie si le projet est bien créé
			res.status(201).json(newProject); // Retourne directement `newProject`
		} catch (error) {
			console.error("Erreur lors de la création du projet :", error);
			res.status(500).json({ message: "Erreur serveur" });
		}
	},
	
	  
	  

	async update(req, res) {
		try {
			const { oldSlug, image, title, slug, github, description, techno } =
				req.body;

			// Vérifie si le projet existe avec l'ancien slug
			const project = await Project.findOne({ where: { slug: oldSlug } });

			if (!project) {
				return res.status(404).json({ message: "Projet non trouvé" });
			}

			// Met à jour le projet avec les nouvelles données
			await project.update({
				image,
				title,
				slug, // Mettre à jour le slug
				github,
				description,
				techno,
			});

			res.status(200).json(project);
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
