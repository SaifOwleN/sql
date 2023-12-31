const { DataTypes } = require("sequelize");

module.exports = {
	up: async ({ context: xddd }) => {
		await xddd.addColumn("users", "createdAt", {
			type: DataTypes.DATE,
		});
		await xddd.addColumn("users", "updatedAt", {
			type: DataTypes.DATE,
		});
		await xddd.addColumn("blogs", "createdAt", {
			type: DataTypes.DATE,
		});
		await xddd.addColumn("blogs", "updatedAt", {
			type: DataTypes.DATE,
		});
	},
	down: async ({ context: xdd }) => {
		await xddd.removeColumn("users", "createdAt");
		await xddd.removeColumn("users", "updatedAt");
		await xddd.removeColumn("blogs", "createdAt");
		await xddd.removeColumn("blogs", "updatedAt");
	},
};
