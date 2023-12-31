import express from "express";
import { Team } from "../models";

const teamRouter = express.Router();

teamRouter.get("/", async (req, res) => {
	try {
		const teams = await Team.findAll();
		res.json(teams);
	} catch (err) {
		res.status(403).json({ error: err });
	}
});

teamRouter.post("/", async (req, res) => {
	const team = req.body;

	try {
		const createdTeam = await Team.create(team);
		res.json(createdTeam);
	} catch (error) {
		res.status(403).json({ error });
	}
});

export default teamRouter;
