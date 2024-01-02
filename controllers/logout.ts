import express from "express";
import { Session } from "../models";
import { authRequest } from "../util/types";

const logoutRouter = express.Router();

logoutRouter.delete("/:id", async (req: authRequest, res) => {
	const id = req.params.id;

	const token = req.token;

	await Session.destroy({ where: { token } });

	res.status(200).json("logout successfully");
});

export default logoutRouter;
