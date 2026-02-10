//this fun catch an error and send them to the middleware function error
import { wrapperFun } from "../utils/catchError.js";

import { AppError } from "../utils/appErorr.js";

import Course from "../models/Course.js";

import type { Request, Response } from "express";

import { isValidObjectId, Types } from "mongoose";
import Lesson from "../models/Lesson.js";
import Book from "../models/Book.js";
import { isThisCourseAvailable } from "../utils/isCourseAva.js";
import User from "../models/User.js";
import { getSupabase } from "../config/connectSupabase.js";

//get all courses==================================================================
export const getAllCourse = wrapperFun(async (req: Request, res: Response) => {
    const { userId, role } = (req as any).user;

    // 1. جلب كل الكورسات مرتبة
    const allCourses = await Course.find({}).sort({ order: 1 }).lean();

    // 2. إذا كان الأدمن، نرسل كل شيء مباشرة
    if (role === "admin") {
        return res.status(200).json({
            status: "success",
            results: allCourses.length,
            data: allCourses,
        });
    }

    // 3. للمستخدم العادي: نجلب الـ IDs ونضعها في Set للبحث السريع
    const userData = await User.findById(userId).select("courses").lean();

    // تحويل المصفوفة إلى Set لتحسين الأداء (O(1) lookup)
    const subscribedSet = new Set(userData?.courses?.map(id => id.toString()));

    // 4. معالجة البيانات
    const modifiedCourses = allCourses.map((course: any) => {
        const isSubscribed = subscribedSet.has(course._id.toString());
        const isFree = course.price === 0;

        // إذا لم يكن مشتركاً والكورس ليس مجانياً، نحذف الـ playlistId
        if (!isSubscribed && !isFree) {
            const { playlistId, ...rest } = course;
            return rest;
        }

        return course;
    });

    res.status(200).json({
        status: "success",
        results: modifiedCourses.length,
        data: modifiedCourses,
    });
});

//get a specific course==================================================================
export const getSpecificCourse = wrapperFun(async (req: Request, res: Response) => {
    const courseId = new Types.ObjectId(req.params.id);

    if (!isValidObjectId(courseId)) {
        throw new AppError("Invalid course ID", 400, true);
    }

    const { userId, role } = (req as any).user;

    await isThisCourseAvailable(courseId, userId, role);

    const specificCourse = await Course.findById(courseId);

    if (!specificCourse) throw new AppError("This course does not exist", 404, true);

    res.status(200).json({
        status: "success",
        data: specificCourse,
    });
});

//create new course==================================================================
export const createNewCourse = wrapperFun(async (req: Request, res: Response) => {
    const body = req.body;

    const isExist = await Course.findOne({ title: body.title });
    if (isExist) throw new AppError("the title is already exist please choose another one", 400, true);

    const result = await Course.create({
        ...body,
    });
    res.status(201).json(result);
});

// update course==================================================================
export const updateCourse = wrapperFun(async (req: Request, res: Response) => {
    const courseId = req.params.id as string;

    if (!isValidObjectId(courseId)) {
        throw new AppError("Invalid course ID", 400, true);
    }
    const body = req.body;
    if (body.title) {
        const isExist = await Course.findOne({ title: body.title });
        if (isExist) throw new AppError("the title is already exist please choose another one", 400, true);
    }

    const specificCourse = await Course.findByIdAndUpdate(courseId, body, { new: true });

    if (!specificCourse) throw new AppError("This course does not exist", 404, true);

    res.status(200).json(specificCourse);
});

//delete specific course==================================================================

export const deleteCourse = wrapperFun(async (req: Request, res: Response) => {
    const courseId = req.params.id as string;

    if (!isValidObjectId(courseId)) {
        throw new AppError("Invalid course ID", 400, true);
    }

    // 1. التحقق من وجود اسم الـ Bucket في المتغيرات البيئية
    const bucketName = process.env.BUCKET_NAME;
    if (!bucketName) {
        throw new AppError("BUCKET_NAME is not defined in environment variables", 500, false);
    }

    // 2. جلب الكتب للحصول على روابط الملفات قبل حذف السجلات
    const books = await Book.find({ course: courseId }).select("fileUrl");

    // 3. مسح ملفات الكتب من Supabase Storage
    if (books.length > 0) {
        const supabase = getSupabase();

        const pathsToDelete = books
            .map(book => {
                if (!book.fileUrl) return null;
                const parts = book.fileUrl.split(`/storage/v1/object/public/${bucketName}/`);
                return parts.length > 1 ? parts[1] : null;
            })
            .filter((path): path is string => path !== null);

        if (pathsToDelete.length > 0) {
            const { error } = await supabase.storage.from(bucketName).remove(pathsToDelete);

            // إلقاء خطأ في حال فشل الحذف من Supabase لمنع حذف سجلات الداتابيز دون حذف الملفات
            if (error) {
                throw new AppError(`Supabase Storage Error: ${error.message}`, 500, true);
            }
        }
    }

    // 4. حذف سجل الكورس من MongoDB
    const specificCourse = await Course.findByIdAndDelete(courseId);
    if (!specificCourse) {
        throw new AppError("This course does not exist", 404, true);
    }

    // 5. حذف سجلات الكتب والدروس من MongoDB
    await Promise.all([Book.deleteMany({ course: courseId }), Lesson.deleteMany({ course: courseId })]);

    res.sendStatus(204);
});
