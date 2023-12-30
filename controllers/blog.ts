import express from "express";
import { Blog, User } from "../models";
import { authRequest } from "../util/middleware";

const router = express.Router();

router.get("/", async (req, res) => {
	const blog = await Blog.findAll({
		attributes: { exclude: ["userId"] },
		include: { model: User, attributes: { exclude: ["passwordHash"] } },
	});
	res.json(blog);
});

router.get("/:id", async (req, res) => {
	const blog = await Blog.findByPk(req.params.id);
	if (blog) {
		res.json(blog);
	} else {
		res.status(404);
	}
});

router.post("/", async (req: authRequest, res) => {
	try {
		const { user } = req;
		//@ts-ignore
		const blogToBeAdded = { ...req.body, userId: user.id };
		const blog = await Blog.create(blogToBeAdded);
		res.json(blog);
	} catch (err) {
		res.json(err);
	}
});

router.delete("/:id", async (req, res) => {
	const { user } = req;
	const blog = await Blog.findByPk(req.params.id);
	if (user.id === blog.id) {
		await Blog.destroy({ where: { id: req.params.id } });
		res.status(200).end();
	} else {
		res.status(401).json({ error: "cant delete a blog u didnt post" });
	}
});

router.put("/:id", async (req, res) => {
	const blog = await Blog.findByPk(req.params.id);
	if (blog) {
		//@ts-ignore
		blog.likes = req.body.likes;
		await blog.save();
		res.json(blog);
	} else {
		res.status(404).end();
	}
});

export default router;
