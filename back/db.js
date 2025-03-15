import "dotenv/config";
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

pool.on("connect", () => {
	console.log("Connecté à la base PostgreSQL");
});

pool.on("error", (err) => {
	console.error("Erreur inattendue sur un client PostgreSQL inactif", err);
	process.exit(-1);
});

export default {
	query: (text, params) => pool.query(text, params),
	pool,
};
