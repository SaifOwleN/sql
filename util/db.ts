import { Sequelize } from "sequelize";
import { DB_URI } from "./config";

const sequelize = new Sequelize(DB_URI as string, { logging: false });

const connectToDatabase = async () => {
	try {
		await sequelize.authenticate();
		console.log("connected to Database successfully");
	} catch (err) {
		console.log("Couldnt connect to Database");
		console.error(err);
		process.exit(1);
	}
	return null;
};

export { sequelize, connectToDatabase };
