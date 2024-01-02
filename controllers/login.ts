import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import { Session, User } from "../models";
import { SECRET } from "../util/config";

const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
	const { username, password } = req.body;
	const userExists = await User.findOne({ where: { username } });
	if (!userExists) {
		res.status(404).json("username doesnt exist");
	}
	const user = userExists?.toJSON();
	console.log(user);

	if (user.disabled) {
		return res.status(401).json({ error: "account disabled" });
	}

	const checkPassword = await bcrypt.compare(password, user.passwordHash);
	if (!checkPassword) {
		res.status(400).json("password isnt correct");
	}

	const token = await jwt.sign({ username, id: user.id }, SECRET);

	const createdToken = await Session.create({ token });

	res.json({ username, token: createdToken.toJSON() });
});

export default loginRouter;
