import { Sequelize } from "sequelize";
import { SequelizeStorage, Umzug } from "umzug";
import { DB_URI } from "./config";

const sequelize = new Sequelize(DB_URI as string);

const migrationConf = {
	migrations: {
		glob: "migrations/*.ts",
	},
	storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
	context: sequelize.getQueryInterface(),
	logger: console,
};

const runMigrations = async () => {
	const migrator = new Umzug(migrationConf);

	const migrations = await migrator.up();
	console.log("Migrations up to date", {
		files: migrations.map((mig) => mig.name),
	});
};

const rollbackMigration = async () => {
	const migrator = new Umzug(migrationConf);
	await migrator.down();
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

export { sequelize, connectToDatabase, rollbackMigration };
