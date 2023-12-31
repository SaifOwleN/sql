import { DataTypes, Model } from "sequelize";
import { sequelize } from "../util/db";

class User extends Model {}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
			validate: {
				isEmail: true,
			},
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		passwordHash: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		admin: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		disabled: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	},
	{
		sequelize,
		timestamps: true,
		modelName: "user",
	},
);

export default User;
