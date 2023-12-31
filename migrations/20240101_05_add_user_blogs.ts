import { QueryInterface } from "sequelize";

const { DataTypes } = require("sequelize");

module.exports = {
	up: async ({ context: queryInterface }: { context: QueryInterface }) => {
		await queryInterface.createTable("user_blogs", {
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
			blog_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: { model: "blogs", key: "id" },
			},
		});
	},
	down: async ({ context: queryInterface }: { context: QueryInterface }) => {
		await queryInterface.dropTable("user_blogs");
	},
};
