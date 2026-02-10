import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import { wrapperFun } from "../utils/catchError.js";
import { AppError } from "../utils/appErorr.js";

export const isAuth = wrapperFun(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token; // استخدام Optional chaining للأمان
    const secret = process.env.JWT_SECRET;

    // 1. استخدام Throw بدلاً من next(new AppError) لأنك داخل wrapperFun
    if (!token) {
        throw new AppError("Please register or login first", 401, true);
    }

    if (!secret) {
        throw new AppError("Internal Server Error: JWT Secret is missing", 500, false);
    }

    try {
        const payload = jwt.verify(token, secret);
        (req as any).user = payload;

        return next();
    } catch (error) {
        throw new AppError("Invalid token", 401, true);
    }
});
