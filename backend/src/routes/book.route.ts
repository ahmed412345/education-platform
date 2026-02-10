import { Router } from "express";

import { getAllBooks, getSpecificBook, createNewBook, updateBook, deleteBook } from "../controllers/book.handler.js";

import { zodValidate } from "../middleware/zod.validation.js";
import { createBookSchema, updateBookSchema } from "../validation/book.schema.js";
import { isAuth } from "../middleware/isAuth.js";
import { authorization } from "../middleware/authorization.js";

import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

// ID for course - جلب كافة الكتب التابعة لكورس معين
router.get("/courses/:id/books", isAuth, getAllBooks);

// ID for book - جلب كتاب معين
router.get("/books/:bookId", isAuth, getSpecificBook);

// ID for course - إضافة كتاب جديد داخل كورس معين
router.post("/courses/:id/books", isAuth, authorization, upload.single("document"), createNewBook);

// ID for book - تعديل بيانات كتاب
router.patch("/books/:bookId", isAuth, authorization, updateBook);

// ID for book - حذف كتاب
router.delete("/books/:bookId", isAuth, authorization, deleteBook);

export default router;
