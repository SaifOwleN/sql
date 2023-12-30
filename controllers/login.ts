import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../models";
import { SECRET } from "../util/config";

const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
	const { username, password } = req.body;
	const userExists = await User.findOne({ where: { username } });
	if (!userExists) {
		res.status(404).json("username doesnt exist");
	}
	const user = userExists?.toJSON();
	const checkPassword = await bcrypt.compare(password, user.passwordHash);
	if (!checkPassword) {
		res.status(400).json("password isnt correct");
	}

	const token = await jwt.sign({ username, id: user?.dataValues.id }, SECRET);
	res.json({ username, token });
});

export default loginRouter;
