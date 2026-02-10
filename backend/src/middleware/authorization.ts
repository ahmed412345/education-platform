import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import { wrapperFun } from "../utils/catchError.js";
import { AppError } from "../utils/appErorr.js";

export const authorization = wrapperFun(async (req: Request, res: Response, next: NextFunction) => {
    const { role } = (req as any).user;
    if (!role || role !== "admin") throw new AppError("you don't have permission", 403, true);
    next();
});
