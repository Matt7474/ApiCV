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
			const { image, title, slug, github, description, techno } = req.body;

			const newProject = await Project.create({
				image,
				title,
				slug,
				github,
				description,
				techno,
			});

			if (!newProject) {
				return res.status(404).json({ message: "Projet non trouvé" });
			}

			const project = newProject.toJSON();
			console.log(project);
			res.status(200).json(project);
		} catch (error) {
			console.error("Erreur lors de la connexion :", error);
			res.status(500).json({ message: "Erreur serveur" });
		}
	},

	async update(req, res) {
		try {
			const { image, title, slug, github, description, techno } = req.body;

			const updateProject = await Project.update({
				image,
				title,
				slug,
				github,
				description,
				techno,
			});

			if (!updateProject) {
				return res.status(404).json({ message: "Projet non trouvé" });
			}

			const project = updateProject.toJSON();
			console.log(project);
			res.status(200).json(project);
		} catch (error) {
			console.error("Erreur lors de la connexion :", error);
			res.status(500).json({ message: "Erreur serveur" });
		}
	},

	async destroy(req, res) {
		try {
			const { slug } = req.body;

			const project = await Project.findOne({ slug });

			if (!project) {
				return res.status(404).json({ message: "Projet non trouvé" });
			}

			await project.destroy();

			res.status(200).json(project);
		} catch (error) {
			console.error("Erreur lors de la connexion :", error);
			res.status(500).json({ message: "Erreur serveur" });
		}
	},
};

export { projectControllers };
