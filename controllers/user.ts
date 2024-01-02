import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import { Blog, ReadingList, User } from "../models";
import { SECRET } from "../util/config";
import { userExtractor } from "../util/middleware";
import { authRequest } from "../util/types";

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
	const users = await User.findAll({
		include: [{ model: Blog, attributes: { exclude: ["userId"] } }],
		attributes: { exclude: ["passwordHash"] },
	});
	res.json(users);
});

userRouter.get("/:id", async (req, res) => {
	const read = {
		[Op.in]:
			typeof req.query.search === "boolean"
				? [req.query.search]
				: [true, false],
	};

	const user = await User.findByPk(req.params.id, {
		attributes: { exclude: ["passwordHash"] },
		include: [
			{
				model: Blog,
				as: "read_blogs",
				attributes: { exclude: ["userId"] },
				through: { attributes: ["id", "read"], where: { read } },
			},
		],
	});

	if (!user) {
		return res.status(404).end();
	}

	res.json(user);
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

userRouter.put("/:username", userExtractor, async (req: authRequest, res) => {
	const { username } = req.params;
	const user = await User.findOne({ where: { username } });

	if (!user) {
		return res.status(404).end();
	}

	if (!req.user?.admin) {
		return res.status(404).end();
	}

	user.setDataValue("disabled", req.body.disabled);
	const newUser = await user.save();
	res.json(newUser);
});

export default userRouter;
