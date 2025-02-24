import { Project } from "../Models/Project.js";

const projectControllers = {
	index: async (req, res) => {
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
	show: async (req, res) => {
		try {
			const { slug } = req.params;

			const project = await Project.findOne({ slug });

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
};

export { projectControllers };
