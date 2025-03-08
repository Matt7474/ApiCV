import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./src/router/index.js";
import { errorHandler, notFound } from "./src/middlewares/errorHandlers.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/config/swaggerConfig.js";

import db from "./db.js";

const app = express();

// Test de la connexion à la base de données
db.pool
	.connect()
	.then(() => {
		console.log("Connecté à la base de données PostgreSQL");
	})
	.catch((err) => {
		console.error("Erreur de connexion à la base de données", err);
		process.exit(1); // Arrêt du serveur en cas d'échec de la connexion
	});

// Configuration CORS
app.use(
	cors({
		origin: [
			"http://localhost:5173", // Frontend React local
			"http://127.0.0.1:5173", // Frontend React local
		],
	}),
);

app.use(express.static(import.meta.dirname));
app.use("/uploads", express.static("uploads"));

app.use(express.urlencoded({ extended: false }));

// Documentation Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use("/api", router);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT;

app.listen(port, () => {
	console.log(`Listening on ${process.env.BASE_URL}:${port}`);
	console.log(
		`📄 Documentation Swagger disponible sur http://${process.env.BASE_URL}:${port}/api-docs`,
	);
});
