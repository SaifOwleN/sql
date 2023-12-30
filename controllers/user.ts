import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import { Blog, User } from "../models";
import { SECRET } from "../util/config";

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
	const users = await User.findAll({
		include: { model: Blog, attributes: { exclude: ["userId"] } },
		attributes: { exclude: ["passwordHash"] },
	});
	res.json(users);
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

userRouter.put("/:username", async (req, res) => {
	const { username } = req.params;
	const user = await User.findOne({ where: { username } });
	if (user) {
		//@ts-ignore
		user.username = req.body.username;
		const newUser = await user.save();
		res.json(newUser);
	} else {
		res.status(404).end();
	}
});

export default userRouter;
