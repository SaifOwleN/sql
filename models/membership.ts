import { DataTypes, Model } from "sequelize";
import { sequelize } from "../util/db";
class Membership extends Model {}

Membership.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: { model: "users", key: "id" },
		},
		teamId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: { model: "teams", key: "id" },
		},
	},
	{
		sequelize,
		timestamps: false,
		underscored: true,
		modelName: "membership",
	},
);

export default Membership;
