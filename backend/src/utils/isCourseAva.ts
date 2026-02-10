import Course from "../models/Course.js";
import User from "../models/User.js";
import { AppError } from "./appErorr.js"; // تأكد من صحة إملاء اسم الملف هنا أيضاً
import type { Types } from "mongoose";

export const isThisCourseAvailable = async (courseId: Types.ObjectId, userId: Types.ObjectId, role: string) => {
    // 1. Admins always have access
    if (role === "admin") return;

    // 2. Check course existence and price
    const course = await Course.findById(courseId).select("price isActive");

    if (!course) {
        throw new AppError("Course not found", 404, true);
    }

    // 3. If the course is free, allow access
    if (course.price === 0) return;

    // 4. For paid courses, verify user subscription
    const user = await User.findById(userId).select("courses").lean();
    const hasAccess = user?.courses?.some(id => id.toString() === courseId.toString());

    if (!hasAccess) {
        throw new AppError("Access denied. Please enroll in this course to view the content.", 403, true);
    }
};

export const canSeeIntro = async (courseId: Types.ObjectId, userId: Types.ObjectId, role: string) => {
    if (role === "admin") return true;

    const course = await Course.findById(courseId).select("price isActive");

    if (!course) {
        throw new AppError("Course not found", 404, true);
    }

    // If free, full access is granted
    if (course.price === 0) return true;

    // Check user subscription
    const user = await User.findById(userId).select("courses").lean();
    const isSubscribed = user?.courses?.some(id => id.toString() === courseId.toString());

    return !!isSubscribed;
};
