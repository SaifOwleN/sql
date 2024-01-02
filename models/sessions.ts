import { DataTypes, Model } from "sequelize";
import { sequelize } from "../util/db";

class Session extends Model {}

Session.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		token: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		active: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
	},
	{
		sequelize,

		underscored: true,
		timestamps: false,
		modelName: "session",
	},
);

export default Session;
