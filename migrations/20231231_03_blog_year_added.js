const { DataTypes } = require("sequelize");

module.exports = {
	up: async ({ context: xddd }) => {
		await xddd.addColumn("blogs", "year", {
			type: DataTypes.INTEGER,
		});
	},
	down: async ({ context: xdd }) => {
		await xddd.removeColumn("blogs", "year");
	},
};
