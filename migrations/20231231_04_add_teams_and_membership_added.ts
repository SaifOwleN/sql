import { QueryInterface } from "sequelize";
const { DataTypes } = require("sequelize");

module.exports = {
	up: async ({ context: queryInterface }: { context: QueryInterface }) => {
		await queryInterface.createTable("teams", {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: DataTypes.TEXT,
				allowNull: false,
				unique: true,
			},
		});
		await queryInterface.createTable("memberships", {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: { model: "users", key: "id" },
			},
			team_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: { model: "teams", key: "id" },
			},
		});
	},
	down: async ({ context: queryInterface }: { context: QueryInterface }) => {
		await queryInterface.dropTable("teams");
		await queryInterface.dropTable("membership");
	},
};
