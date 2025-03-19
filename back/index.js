import "dotenv/config";
import express from "express";

import pkg from "pg";
import { router } from "./src/router/index.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import path from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

import jwt from "jsonwebtoken";

const { Pool } = pkg;
const app = express();
app.use(express.json());

// Configuration de la base de données
const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration de Swagger
const swaggerOptions = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "API CV",
			version: "1.0.0",
			description: "Documentation de l'API CV",
		},
		servers: [
			{
				url: "https://apicv.matt-dev.fr/api", // Change selon ton environnement
				description: "Serveur API",
			},
		],
	},
	apis: [path.join(__dirname, "src/router/*.js")],
};

// configuration Cors
app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST", "PATCH", "DELETE"],
	}),
);

// Authorisation de Post/Patch/Delete par le token
app.use((req, res, next) => {
	const token = process.env.API_KEY;
	if (["POST", "PATCH", "DELETE"].includes(req.method)) {
		const clientKey = req.get("X-API-KEY");
		if (clientKey !== token) {
			return res.status(403).json({ message: "Forbidden" });
		}
	}
	next();
});

// Connexion à PostgreSQL
(async () => {
	try {
		await sequelize.authenticate();
		console.log("Connexion à la base de données réussie!");
	} catch (error) {
		console.error("Erreur de connexion à la base de données :", error);
	}
})();

// Serve static files from the 'uploads' folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Test de connexion à la base de données
pool
	.connect()
	.then(() => console.log("🟢 Connexion à la base de données réussie"))
	.catch((err) =>
		console.error("🔴 Erreur de connexion à la base de données", err),
	);

app.use("/api", router);

// Doc Swagger
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const port = process.env.PORT || 3000;
const baseUrl = process.env.BASE_URL || "http://localhost";

app.listen(3000, "0.0.0.0", () => {
	console.log("Serveur en écoute sur le port 3000");
	console.log("Swagger disponible sur https://apicv.matt-dev.fr/api-docs");
});
