const DB_URI = process.env.DB;
const { PORT } = process.env;
const SECRET = process.env.SECRET as string;

export { DB_URI, PORT, SECRET };
