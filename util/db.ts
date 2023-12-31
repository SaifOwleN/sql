import { Sequelize } from "sequelize";
import { SequelizeStorage, Umzug } from "umzug";
import { DB_URI } from "./config";

const sequelize = new Sequelize(DB_URI as string);

const runMigrations = async () => {
	const migrator = new Umzug({
		migrations: {
			glob: "migrations/*.js",
		},
		storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
		context: sequelize.getQueryInterface(),
		logger: console,
	});

	const migrations = await migrator.up();
	console.log("Migrations up to date", {
		files: migrations.map((mig) => mig.name),
	});
};

const connectToDatabase = async () => {
	try {
		await sequelize.authenticate();
		await runMigrations();
		console.log("connected to Database successfully");
	} catch (err) {
		console.log("Couldnt connect to Database");
		console.error(err);
		process.exit(1);
	}
	return null;
};

export { sequelize, connectToDatabase };
