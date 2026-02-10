import { AppError } from "../utils/appErorr.js";

import Course from "../models/Course.js";

import type { Request } from "express";

import { isValidObjectId, Types } from "mongoose";

export const isCourseExist = async (req: Request) => {
    const { id } = req.params;
    if (!id || !isValidObjectId(id)) {
        throw new AppError("Invalid course ID", 400, true);
    }
    const courseId = new Types.ObjectId(id);
    const courseExists = await Course.exists({ _id: courseId });
    if (!courseExists) {
        throw new AppError("Course not found", 404, true);
    }
    return courseId;
};
