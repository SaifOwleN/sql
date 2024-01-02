import express from "express";
import { ReadingList } from "../models";
import { authRequest } from "../util/types";

const rListRouter = express.Router();

rListRouter.get("/", async (req, res) => {
	const rList = await ReadingList.findAll();
	res.json(rList);
});

rListRouter.post("/", async (req: authRequest, res) => {
	const body = req.body;

	const list = { ...body, userId: req.user?.id };

	const newList = await ReadingList.create(list);

	res.json(newList);
});

rListRouter.put("/:id", async (req, res) => {
	const list = await ReadingList.findByPk(req.params.id);

	if (!list) {
		return res.status(404).json({ error: "list doesnt exist" });
	}

	if (!req.body.read) {
		return res.status(402).json({ error: "no read value attached" });
	}

	await list.setDataValue("read", req.body.read);

	await list.save();

	res.json(list);
});

export default rListRouter;
