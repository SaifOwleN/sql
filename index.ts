import cors from "cors";
import express from "express";
import blogRouter from "./controllers/blog";
import userRouter from "./controllers/user";
import { PORT } from "./util/config";
require("express-async-errors");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

app.listen(PORT, () => {
	console.log(PORT);
});
