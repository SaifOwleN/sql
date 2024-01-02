import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
	up: async ({ context: queryInterface }: { context: QueryInterface }) => {
		await queryInterface.addColumn("sessions", "id", {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		});
	},
	down: async ({ context: queryInterface }: { context: QueryInterface }) => {
		await queryInterface.removeColumn("sessions", "id");
	},
};
