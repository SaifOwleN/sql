import { Request } from "express";

interface UserType {
	id: number;
	username: string;
	name: string;
	admin: boolean;
}

export interface authRequest extends Request {
	token?: string;
	user?: UserType;
}

export interface BlogType {
	id: number;
	author: string;
	url: string;
	title: string;
	likes: number;
	userId: number;
}
