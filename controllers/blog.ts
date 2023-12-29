import express from "express";
import { Blog } from "../models";

const router = express.Router();

router.get("/", async (req, res) => {
	const blog = await Blog.findAll();
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

router.post("/", async (req, res) => {
	try {
		const blog = await Blog.create(req.body);
		res.json(blog);
	} catch (err) {
		res.json(err);
	}
});

router.delete("/:id", async (req, res) => {
	await Blog.destroy({ where: { id: req.params.id } });
	res.status(200).end();
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
