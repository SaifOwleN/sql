import { QueryInterface } from "sequelize";

const { DataTypes } = require("sequelize");

module.exports = {
	up: async ({ context: queryInterface }: { context: QueryInterface }) => {
		await queryInterface.createTable("sessions", {
			token: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			active: {
				type: DataTypes.BOOLEAN,
				defaultValue: true,
			},
		});
	},
	down: async ({ context: queryInterface }: { context: QueryInterface }) => {
		await queryInterface.dropTable("sessions");
	},
};
