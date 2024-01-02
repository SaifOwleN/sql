import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import { Session, User } from "../models";
import { SECRET } from "./config";
import { authRequest } from "./types";

const tokenExtractor: RequestHandler = (
	req: authRequest,
	res: Response,
	next: NextFunction,
) => {
	const auth = req.get("Authorization");
	if (auth) {
		req.token = auth.replace("Bearer ", "");
	}
	next();
};

const userExtractor: RequestHandler = async (
	req: authRequest,
	res: Response,
	next: NextFunction,
) => {
	const token = req.token;
	if (!token) {
		return res.status(401).json({ error: "token not available" });
	}

	const validToken = (await jwt.verify(token as string, SECRET)) as {
		id: number;
	};

	const user = await User.findByPk(validToken.id);

	console.log(user);

	if (!user) {
		return res.status(401).json({ error: "invalid token" });
	}

	const session = await Session.findOne({ where: { token } });

	if (!session?.getDataValue("active")) {
		return res.status(401).json({ error: "token revoked" });
	}

	req.user = user.toJSON();
	console.log(req.user);

	next();
};

export { tokenExtractor, userExtractor };
