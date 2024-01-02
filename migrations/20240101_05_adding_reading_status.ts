import { DataTypes, QueryInterface } from "sequelize";

module.exports = {
	up: async ({ context: queryInterface }: { context: QueryInterface }) => {
		await queryInterface.addColumn("reading_lists", "read", {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		});
	},
	down: async ({ context: queryInterface }: { context: QueryInterface }) => {
		await queryInterface.removeColumn("reading_lists", "read");
	},
};
