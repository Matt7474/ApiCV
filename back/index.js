// import "dotenv/config";
// import express from "express";
// import cors from "cors";
// import { router } from "./src/router/index.js";
// import { errorHandler, notFound } from "./src/middlewares/errorHandlers.js";
// import swaggerUi from "swagger-ui-express";
// import swaggerSpec from "./src/config/swaggerConfig.js";

// import db from "./db.js";

// const app = express();

// // Test de la connexion à la base de données
// db.pool
// 	.connect()
// 	.then(() => {
// 		console.log("Connecté à la base de données PostgreSQL");
// 	})
// 	.catch((err) => {
// 		console.error("Erreur de connexion à la base de données", err);
// 		process.exit(1); // Arrêt du serveur en cas d'échec de la connexion
// 	});

// // Configuration CORS
// app.use(
// 	cors({
// 		origin: [
// 			"http://localhost:5173", // Frontend React local
// 			"http://127.0.0.1:5173", // Frontend React local
// 		],
// 	}),
// );

// app.use(express.static(import.meta.dirname));
// app.use("/uploads", express.static("uploads"));

// app.use(express.urlencoded({ extended: false }));

// // Documentation Swagger
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// app.use(express.json());
// app.use("/api", router);

// app.use(notFound);
// app.use(errorHandler);

// const port = process.env.PORT;

// // app.listen(3000, "0.0.0.0", () => {
// // 	console.log("Server running on port 3000");
// // });

// app.listen(port, () => {
// 	console.log(`Listening on ${process.env.BASE_URL}:${port}`);
// 	console.log(
// 		`📄 Documentation Swagger disponible sur http://${process.env.BASE_URL}:${port}/api-docs`,
// 	);
// });

import "dotenv/config";
import express from "express";
import pkg from "pg";
import { router } from "./src/router/index.js";

const { Pool } = pkg;
const app = express();
// Configuration de la base de données
const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
});

app.use(
	cors({
		origin: [
			"http://88.178.106.19",
			"http://localhost:5173",
			"http://127.0.0.1:5173",
		],
	}),
);

(async () => {
	try {
		await sequelizeClient.authenticate();
		console.log("Connexion à la base de données réussie!");
	} catch (error) {
		console.error("Erreur de connexion à la base de données :", error);
	}
})();

// Test de connexion à la base de données
pool
	.connect()
	.then(() => console.log("🟢 Connexion à la base de données réussie"))
	.catch((err) =>
		console.error("🔴 Erreur de connexion à la base de données", err),
	);

// Route simple pour tester l'API
// app.get("/", (req, res) => {
// 	res.send("Bienvenue sur mon API !");
// });
app.use("/api", router);

// Lancer le serveur
// app.listen(port, () => {
// 	console.log(`🚀 Serveur lancé sur http://localhost:${port}`);
// });

const port = process.env.PORT || 3000;
const baseUrl = process.env.BASE_URL || "http://localhost";
// app.listen(port, () => {
//     console.log(`Listening on ${baseUrl}:${port}`);
// });
app.listen(3000, "0.0.0.0", () => {
	console.log("Serveur en écoute sur le port 3000");
});
