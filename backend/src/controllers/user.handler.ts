import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

import { wrapperFun } from "../utils/catchError.js";
import { AppError } from "../utils/appErorr.js";
import User from "../models/User.js";
import OptSchema from "../models/OptSchema.js";
import { sendEmailOtp } from "../utils/sendmsg.js";

// --- Helper Function for JWT and Cookies ---
const sendTokenToUser = (
    res: Response,
    user: { userId: any; fullName: string; email: string; role: string; isActive: boolean; phoneNumber: string },
) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new AppError("JWT Secret is not defined in environment variables", 500, false);
    }

    const payload = {
        userId: user.userId,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        phoneNumber: user.phoneNumber,
    };

    const jwtToken = jwt.sign(payload, secret, { algorithm: "HS256", expiresIn: "2d" });

    res.cookie("token", jwtToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        maxAge: 2 * 24 * 60 * 60 * 1000,
    });
};

// --- Controllers ---

export const register = wrapperFun(async (req: Request, res: Response) => {
    const { fullName, email, password, phoneNumber } = req.body;

    // 1. Check if user already exists
    const emailExists = await User.exists({ email });
    if (emailExists) throw new AppError("This email is already used", 400, true, "email");

    // 2. Hash password and create user
    const hashedPassword = await hash(password, 12);
    const userData = await User.create({
        fullName,
        email,
        password: hashedPassword,
        phoneNumber,
    });

    // 3. Set cookie
    sendTokenToUser(res, {
        userId: userData._id,
        fullName: userData.fullName,
        email: userData.email,
        role: userData.role,
        isActive: userData.isActive,
        phoneNumber,
    });

    res.status(201).json({
        status: "success",
        message: "User created successfully, please activate your account",
    });
});

export const sendOtp = wrapperFun(async (req: Request, res: Response) => {
    const { userId, email } = (req as any).user;

    // 1. Generate 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // 2. Save OTP to DB
    await OptSchema.create({
        userId,
        otpCode,
    });

    await sendEmailOtp(email, otpCode);

    res.status(200).json({
        status: "success",
        message: "The verification code has been sent to your email",
    });
});

export const activateAccount = wrapperFun(async (req: Request, res: Response) => {
    const { code } = req.body;
    if (!code) throw new AppError("Please provide a valid OTP code", 400, true);

    const { userId, fullName, email, role, phoneNumber } = (req as any).user;

    const otpInDb = await OptSchema.findOne({ userId });
    if (!otpInDb) throw new AppError("No active OTP found. Please request a new one.", 400, true);

    if (otpInDb.otpCode !== code) throw new AppError("Wrong OTP, please try again", 400, true);

    await User.findByIdAndUpdate(userId, { isActive: true });
    await OptSchema.deleteMany({ userId });

    sendTokenToUser(res, {
        userId,
        fullName,
        email,
        phoneNumber,
        role,
        isActive: true,
    });

    res.status(200).json({
        status: "success",
        message: "Account activated successfully",
    });
});

export const login = wrapperFun(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await compare(password, user.password))) {
        throw new AppError("Invalid email or password", 401, true, "email");
    }

    if (user.isBlocked) {
        throw new AppError("Your account has been deactivated.", 403, true, "blocked");
    }

    sendTokenToUser(res, {
        userId: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        phoneNumber: user.phoneNumber,
    });

    res.status(200).json({
        status: "success",
        message: "Logged in successfully",
        isActive: user.isActive,
    });
});

export const logout = wrapperFun(async (req: Request, res: Response) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        sameSite: "lax",
        secure: true,
    });

    res.status(200).json({
        status: "success",
        message: "Logged out successfully",
    });
});
