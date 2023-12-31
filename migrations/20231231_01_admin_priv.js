const { DataTypes } = require("sequelize");

module.exports = {
	up: async ({ context: xddd }) => {
		await xddd.addColumn("users", "admin", {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		});
		await xddd.addColumn("users", "disabled", {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		});
	},
	down: async ({ context: xdd }) => {
		await xddd.removeColumn("users", "admins");
		await xddd.removeColumn("users", "disabled");
	},
};
