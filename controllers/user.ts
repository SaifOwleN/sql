import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../models";
import { SECRET } from "../util/config";

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
	const users = await User.findAll({
		attributes: { exclude: ["passwordHash"] },
	});
	res.json(users);
});

userRouter.post("/", async (req, res) => {
	try {
		const { name, username, password } = req.body;
		if (password < 8) {
			res.status(400).json("Password too short");
		}

		const passwordHash = await bcrypt.hash(password, 10);
		const user = { name, username, passwordHash };
		const token = await jwt.sign(user, SECRET);
		await User.create(user);
		res.json({ ...user, token });
	} catch (error) {
		return res.status(400).json({ error });
	}
});

userRouter.get("/:id", async (req, res) => {
	const user = await User.findByPk(req.params.id, {
		attributes: { exclude: ["passwordHash"] },
	});
	if (user) {
		res.json(user);
	} else {
		res.status(404).end();
	}
});

export default userRouter;
