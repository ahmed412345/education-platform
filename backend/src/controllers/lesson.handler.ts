//this fun catch an error and send them to the middleware function error
import { wrapperFun } from "../utils/catchError.js";

import { AppError } from "../utils/appErorr.js";

import Lesson from "../models/Lesson.js";

import { isCourseExist } from "../utils/course.helper.js";

import type { Request, Response } from "express";

import { isValidObjectId } from "mongoose";
import { canSeeIntro, isThisCourseAvailable } from "../utils/isCourseAva.js";

//get all lesson==================================================================
export const getAllLesson = wrapperFun(async (req: Request, res: Response) => {
    const courseId = await isCourseExist(req);
    const { userId, role } = (req as any).user;

    const hasFullAccess = await canSeeIntro(courseId, userId, role);

    let lessons;

    if (hasFullAccess) {
        lessons = await Lesson.find({ course: courseId }).sort({ order: 1 }).select("_id title course order thumbnail duration").lean();
    } else {
        lessons = await Lesson.find({ course: courseId })
            .sort({ order: -1 }) // الترتيب من الأكبر للأصغر
            .limit(1) // نأخذ أول واحد فقط (صاحب الرقم الأكبر)
            .select("_id title course order thumbnail duration")
            .lean();
    }

    res.status(200).json({
        status: "success",
        results: lessons.length,
        data: lessons,
    });
});
//get a specific lesson==================================================================
export const getSpecificLesson = wrapperFun(async (req: Request, res: Response) => {
    const { lessonId } = req.params;
    if (!isValidObjectId(lessonId)) {
        throw new AppError("Invalid lesson ID format", 400, true);
    }

    const { userId, role } = (req as any).user;

    const specificLesson = await Lesson.findById(lessonId);
    if (!specificLesson) throw new AppError("Lesson not found", 404, true);

    const courseId = specificLesson.course;

    // Check if the user has full access (subscribed, admin, or free course)
    const hasFullAccess = await canSeeIntro(courseId as any, userId, role);

    if (!hasFullAccess) {
        // Find the preview lesson (the one with the highest order)
        const highestOrderLesson = await Lesson.findOne({ course: courseId }).sort({ order: -1 }).select("_id");

        // If the requested lesson is not the preview one, deny access
        if (specificLesson._id.toString() !== highestOrderLesson?._id.toString()) {
            throw new AppError("Access denied. Please subscribe to unlock all lessons", 403, true);
        }
    }

    res.status(200).json(specificLesson);
});
//create new lesson==================================================================
export const createNewLesson = wrapperFun(async (req: Request, res: Response) => {
    const body = req.body;

    //this fun in utils It's checking the idCourse
    const courseId = await isCourseExist(req);

    const result = await Lesson.create({
        ...body,
        course: courseId,
    });
    res.status(201).json(result);
});

//update lesson==================================================================
export const updateLesson = wrapperFun(async (req: Request, res: Response) => {
    const { body } = req;
    const { lessonId } = req.params;

    if (!isValidObjectId(lessonId)) {
        throw new AppError("Invalid course ID", 400, true);
    }
    const specificLesson = await Lesson.findByIdAndUpdate(lessonId, body, { new: true });

    if (!specificLesson) throw new AppError("This lesson does not exist", 404, true);

    res.status(200).json(specificLesson);
});

//delete lesson==================================================================
export const deleteLesson = wrapperFun(async (req: Request, res: Response) => {
    const { lessonId } = req.params;

    if (!isValidObjectId(lessonId)) {
        throw new AppError("Invalid course ID", 400, true);
    }
    const specificLesson = await Lesson.findByIdAndDelete(lessonId);

    if (!specificLesson) throw new AppError("This lesson does not exist", 404, true);

    res.sendStatus(204);
});
