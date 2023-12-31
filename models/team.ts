import { DataTypes, Model } from "sequelize";
import { sequelize } from "../util/db";
class Team extends Model {}

Team.init(
	{
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
	},
	{
		sequelize,
		timestamps: false,
		underscored: true,
		modelName: "team",
	},
);

export default Team;
