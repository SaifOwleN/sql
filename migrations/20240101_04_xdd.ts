import { QueryInterface } from "sequelize";

const { DataTypes } = require("sequelize");

module.exports = {
	up: async ({ context: queryInterface }: { context: QueryInterface }) => {
		await queryInterface.createTable("reading_lists", {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			blog_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: { model: "blogs", key: "id" },
			},
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: { model: "users", key: "id" },
			},
		});
	},
	down: async ({ context: queryInterface }: { context: QueryInterface }) => {
		await queryInterface.dropTable("reading_lists");
	},
};
