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
			type: DataTypes.TEXT,
			allowNull: false,
		},
		github: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		techno: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	},
	{
		sequelize: sequelize,
		tableName: "project",
	},
);

export { Project };
