import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import { wrapperFun } from "../utils/catchError.js";
import { AppError } from "../utils/appErorr.js";

export const meHandler = wrapperFun(async (req: Request, res: Response) => {
	const token = req.cookies.token;
	const secret = process.env.JWT_SECRET;

	if (!secret) throw new AppError("Internal Server Error", 500, false);
	if (!token) {
		res.status(401).json({
			status: "failed",
			message: "no data found",
		});
	}

	try {
		const payload = jwt.verify(token, secret);
		res.status(200).json({
			status: "success",
			data: payload,
		});
	} catch (error) {
		throw new AppError("Invalid token", 401, true);
	}
});
