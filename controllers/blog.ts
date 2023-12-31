import express from "express";
import { Op } from "sequelize";
import sequelize from "sequelize";
import { Blog, User } from "../models";
import { authRequest } from "../util/types";
import { BlogType } from "../util/types";

const router = express.Router();

router.get("/", async (req, res) => {
	const title = {
		[Op.substring]: req.query.search ? req.query.search : "",
	};

	const author = title;

	const blog = await Blog.findAll({
		attributes: { exclude: ["userId"] },
		include: { model: User, attributes: { exclude: ["passwordHash"] } },
		where: { title },
		order: [["likes", "DESC"]],
	});
	res.json(blog);
});

router.get("/:id", async (req, res) => {
	const blog = await Blog.findByPk(req.params.id);
	console.log(blog?.getDataValue("id"));

	if (blog) {
		res.json(blog);
	} else {
		res.status(404);
	}
});

router.post("/", async (req: authRequest, res) => {
	try {
		const { user } = req;

		const date = new Date();
		const year = date.getFullYear();

		if (req.body.year > year) {
			return res
				.status(406)
				.json({ error: "year cannot be over current year" });
		}

		const blogToBeAdded = { ...req.body, userId: user?.id };
		console.log(blogToBeAdded);
		const blog = await Blog.create(blogToBeAdded);
		res.json(blog);
	} catch (err) {
		res.json(err);
	}
});

router.delete("/:id", async (req: authRequest, res) => {
	const { user } = req;
	const blog = await Blog.findByPk(req.params.id);

	if (!blog) {
		res.status(404).json("there is no blog with this id").end();
	} else {
		if (user?.id === blog?.getDataValue("id")) {
			await Blog.destroy({ where: { id: req.params.id } });
			res.status(200).end();
		} else {
			res.status(401).json({ error: "cant delete a blog u didnt post" });
		}
	}
});

router.put("/:id", async (req, res) => {
	const blog = await Blog.findByPk(req.params.id);
	if (blog) {
		blog.setDataValue("likes", req.body.likes);
		await blog.save();
		res.json(blog);
	} else {
		res.status(404).end();
	}
});

export default router;
