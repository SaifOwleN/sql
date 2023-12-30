import express from "express";
import sequelize from "sequelize";
import { Blog } from "../models";

const authorRouter = express.Router();

authorRouter.get("/", async (req, res) => {
	const author = await Blog.findAll({
		attributes: [
			"author",
			[sequelize.fn("COUNT", sequelize.col("id")), "articles"],
			[sequelize.fn("SUM", sequelize.col("likes")), "likes"],
		],
		group: ["author"],
		order: [["likes", "DESC"]],
	});
	res.json(author);
});

export default authorRouter;
