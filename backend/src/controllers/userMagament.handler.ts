import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import { wrapperFun } from "../utils/catchError.js";
import { AppError } from "../utils/appErorr.js";
import User from "../models/User.js";
import { isValidObjectId } from "mongoose";
import Course from "../models/Course.js";

export const getAllUsers = wrapperFun(async (req: Request, res: Response) => {
    const users = await User.find().sort({ createdAt: -1 }).select("_id fullName phoneNumber role isActive courses isBlocked");
    res.status(200).json({
        status: "success",
        data: users,
    });
});

// تحديث اسم المستخدم فقط

export const updateUser = wrapperFun(async (req: Request, res: Response) => {
    const targetUserId = req.params.id;

    if (!isValidObjectId(targetUserId)) {
        throw new AppError("Invalid User ID", 400, true);
    }

    const { userId: requesterId, role: requesterRole } = (req as any).user;

    // 1. Authorization check
    if (requesterRole !== "admin" && targetUserId !== requesterId) {
        throw new AppError("You are not authorized to update this user", 403, true);
    }

    // 2. Validation: Check if fullName exists and has at least 3 characters
    const fullName = req.body.fullName;

    if (!fullName || fullName.trim().length < 3) {
        throw new AppError("Full name must be at least 3 characters", 400, true);
    }

    // 3. Prepare the update object (Only allow fullName)
    const updates = {
        fullName: fullName.trim(),
    };

    // 4. Perform the update
    const updatedUser = await User.findByIdAndUpdate(targetUserId, updates, { new: true, runValidators: true }).select(
        "_id fullName phoneNumber role isActive courses"
    );

    if (!updatedUser) throw new AppError("User not found", 404, true);

    res.status(200).json({
        status: "success",
        data: updatedUser,
    });
});

//حظر المستخدم من تسجيل الدخول
export const blockUser = wrapperFun(async (req: Request, res: Response) => {
    const targetUserId = req.params.id;

    if (!isValidObjectId(targetUserId)) {
        throw new AppError("Invalid User ID", 400, true);
    }

    const { userId: requesterId } = (req as any).user;

    if (targetUserId === requesterId) {
        throw new AppError("You cannot block your own account", 400, true);
    }

    const blockUser = await User.findByIdAndUpdate(targetUserId, { isBlocked: true }, { new: true });
    if (!blockUser) throw new AppError("User not found", 404, true);
    res.status(200).json({
        status: "success",
        data: "user blocked successfully",
    });
});

//فك الحظر عن المستخدم
export const unblockUser = wrapperFun(async (req: Request, res: Response) => {
    const targetUserId = req.params.id;

    if (!isValidObjectId(targetUserId)) {
        throw new AppError("Invalid User ID", 400, true);
    }

    const blockUser = await User.findByIdAndUpdate(targetUserId, { isBlocked: false }, { new: true });
    if (!blockUser) throw new AppError("User not found", 404, true);
    res.status(200).json({
        status: "success",
        data: "user unblocked successfully",
    });
});

//اضافه كورس للمستخدم
export const updateUserEnrollments = wrapperFun(async (req: Request, res: Response) => {
    // نطلب الآن مصفوفة من الكورسات بدلاً من معرف واحد
    const { userId, coursesIds } = req.body; // coursesIds يجب أن تكون مصفوفة [id1, id2, ...]

    // 1. التحقق من صحة معرف المستخدم وأن المعرفات المرسلة مصفوفة
    if (!isValidObjectId(userId) || !Array.isArray(coursesIds)) {
        throw new AppError("Invalid User ID or Courses data format", 400, true);
    }

    // 2. التحقق من صحة كل الـ IDs داخل المصفوفة
    const allValidIds = coursesIds.every(id => isValidObjectId(id));
    if (!allValidIds) {
        throw new AppError("One or more Course IDs are invalid", 400, true);
    }

    // 3. (اختياري ولكن مفضل) التأكد أن الكورسات موجودة فعلاً في قاعدة البيانات
    const existingCoursesCount = await Course.countDocuments({ _id: { $in: coursesIds } });
    if (existingCoursesCount !== coursesIds.length) {
        throw new AppError("Some courses were not found in the database", 404, true);
    }

    // 4. تحديث مصفوفة الكورسات بالكامل
    // نستخدم $set (أو التعيين المباشر) لاستبدال المصفوفة القديمة بالجديدة
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: { courses: coursesIds } }, // استبدال المصفوفة
        { new: true, runValidators: true }
    ).select("_id fullName courses");

    if (!updatedUser) {
        throw new AppError("User not found", 404, true);
    }

    res.status(200).json({
        status: "success",
        message: "User courses updated successfully",
        data: updatedUser
    });
});