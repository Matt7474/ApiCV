import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST || "127.0.0.1",
		dialect: "postgres",
		logging: false,
		define: {
			createdAt: "created_at",
			updatedAt: "updated_at",
			underscored: true,
		},
	},
);

export { sequelize };
