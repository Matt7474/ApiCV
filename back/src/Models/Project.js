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
		date: {
			type: DataTypes.DATE,
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
		conception: {
			type: DataTypes.JSONB,
			allowNull: false,
			defaultValue: [],
		},
		front: {
			type: DataTypes.JSONB,
			allowNull: false,
			defaultValue: [],
		},
		back: {
			type: DataTypes.JSONB,
			allowNull: false,
			defaultValue: [],
		},
		fullstack: {
			type: DataTypes.JSONB,
			allowNull: false,
			defaultValue: [],
		},
		bdd: {
			type: DataTypes.JSONB,
			allowNull: false,
			defaultValue: [],
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
	},
	{
		sequelize: sequelize,
		tableName: "project",
		timestamps: false, // Si tu veux gérer les timestamps manuellement
	},
);

export { Project };
