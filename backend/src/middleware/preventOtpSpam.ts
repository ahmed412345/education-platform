import type { NextFunction, Request, Response } from "express";
import { wrapperFun } from "../utils/catchError.js";
import otpSchema from "../models/OptSchema.js";

export const preventOtpSpam = wrapperFun(async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = (req as any).user;

    const lastOtp = await otpSchema.findOne({ userId });

    // 1. If no OTP exists, move to create the first one
    if (!lastOtp) {
        return next();
    }

    // 2. If OTP exists, check the cooldown
    const timePassed = Date.now() - lastOtp.createdAt.getTime();
    const cooldown = 2 * 60 * 1000; // 2 minutes

    if (timePassed < cooldown) {
        const secondsLeft = Math.ceil((cooldown - timePassed) / 1000);
        return res.status(429).json({
            status: "fail",
            time: secondsLeft,
            message: `Please wait ${secondsLeft} seconds before requesting a new code.`,
        });
    }

    // 3. If time passed is more than 2 minutes, kill the old OTP(s)
    await otpSchema.deleteMany({ userId });

    // 4. Move to create the new one
    next();
});
