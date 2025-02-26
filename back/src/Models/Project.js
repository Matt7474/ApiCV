import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize.js";

class Project extends Model {}

Project.init(
	{
		image: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		title: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		slug: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		github: {
			type: DataTypes.TEXT,
			allowNull: true,
			unique: true,
		},
		techno: {
			type: DataTypes.JSON,
			allowNull: false,
		},
	},
	{
		sequelize: sequelize,
		tableName: "project",
	},
);

export { Project };
