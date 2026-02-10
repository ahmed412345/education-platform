import { wrapperFun } from "../utils/catchError.js";
import { AppError } from "../utils/appErorr.js";
import Book from "../models/Book.js";
import { isCourseExist } from "../utils/course.helper.js";
import type { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { isThisCourseAvailable } from "../utils/isCourseAva.js";

import { randomUUID } from "crypto";
import { getSupabase } from "../config/connectSupabase.js";

import { parse } from "path";

// Get all books ==================================================================
export const getAllBooks = wrapperFun(async (req: Request, res: Response) => {
    const courseId = await isCourseExist(req);

    const { userId, role } = (req as any).user;
    await isThisCourseAvailable(courseId, userId, role);

    const books = await Book.find({ course: courseId }).sort({ order: 1 }).select("_id originalName fileUrl");

    res.status(200).json({
        status: "success",
        results: books.length,
        data: books,
    });
});

// Get a specific book ==================================================================
export const getSpecificBook = wrapperFun(async (req: Request, res: Response) => {
    const { bookId } = req.params;

    if (!isValidObjectId(bookId)) {
        throw new AppError("Invalid Book ID", 400, true);
    }

    const { userId, role } = (req as any).user;
    const bookDate = await Book.findById(bookId).select("course");
    const courseId = bookDate?.course;

    if (!courseId) throw new AppError("can't find this book", 400, true);

    await isThisCourseAvailable(courseId, userId, role);

    const specificBook = await Book.findById(bookId);

    if (!specificBook) {
        throw new AppError("This book does not exist", 404, true);
    }

    res.status(200).json({
        status: "success",
        data: specificBook,
    });
});

// Create new book ==================================================================
export const createNewBook = wrapperFun(async (req: Request, res: Response) => {
    const supabase = getSupabase();

    const storageName = randomUUID() + ".pdf";

    const { originalname, buffer } = (req as any).file;

    const originalName = parse(Buffer.from(originalname, "latin1").toString("utf8")).name;

    if (!originalname || !buffer) throw new AppError("Internal server error", 500, false);

    const courseId = await isCourseExist(req);

    const bucketName = process.env.BUCKET_NAME;

    if (!bucketName) throw new AppError("BUCKET_NAME is not defined in environment variables", 500, false);

    const { error } = await supabase.storage.from(bucketName).upload(storageName, buffer, {
        contentType: req.file?.mimetype ?? "application/octet-stream",
        cacheControl: "3600",
        upsert: true,
    });

    if (error) throw new AppError(error.message, 500, false);

    const fileUrl = supabase.storage.from(bucketName).getPublicUrl(storageName).data.publicUrl;

    if (!fileUrl) throw new AppError("Internal server error", 500, false);

    const result = await Book.create({
        originalName,
        storageName,
        course: courseId,
        fileUrl,
    });

    res.status(200).json({
        status: "success",
        data: result,
    });
});

// Update book ==================================================================
export const updateBook = wrapperFun(async (req: Request, res: Response) => {
    const { body } = req;
    const { bookId } = req.params;

    if (!isValidObjectId(bookId)) {
        throw new AppError("Invalid Book ID", 400, true);
    }

    const updatedBook = await Book.findByIdAndUpdate(bookId, body, { new: true });

    if (!updatedBook) {
        throw new AppError("This book does not exist", 404, true);
    }

    res.status(200).json(updatedBook);
});

// Delete book ==================================================================
export const deleteBook = wrapperFun(async (req: Request, res: Response) => {
    const { bookId } = req.params;

    // 1️⃣ تحقق من صحة الـ ID
    if (!isValidObjectId(bookId)) {
        throw new AppError("Invalid Book ID", 400, true);
    }

    // 2️⃣ احصل على الـ Book من الـ DB أولاً
    const book = await Book.findById(bookId);
    if (!book) {
        throw new AppError("This book does not exist", 404, true);
    }

    const storageName = book.storageName;

    if (!storageName) {
        throw new AppError("Book does not have a storageName", 500, false);
    }

    // 3️⃣ اتصل بـ Supabase
    const supabase = getSupabase();
    const bucketName = process.env.BUCKET_NAME;

    if (!bucketName) throw new AppError("BUCKET_NAME is not defined in environment variables", 500, false);

    // 4️⃣ احذف الملف من الـ Storage
    const { data, error } = await supabase.storage.from(bucketName).remove([storageName]);

    if (error) {
        throw new AppError(`Failed to delete file from storage: ${error.message}`, 500, false);
    }

    // 5️⃣ احذف الـ Book من الـ DB
    await Book.findByIdAndDelete(bookId);

    // 6️⃣ رجع status 204
    res.sendStatus(204);
});
