import { Router } from "express";

import { getAllLesson, getSpecificLesson, createNewLesson, updateLesson, deleteLesson } from "../controllers/lesson.handler.js";

import { zodValidate } from "../middleware/zod.validation.js";
import { createLessonSchema, updateLessonSchema } from "../validation/lesson.schema.js";
import { isAuth } from "../middleware/isAuth.js";
import { authorization } from "../middleware/authorization.js";

const router = Router();
//id for course
router.get("/courses/:id/lessons", isAuth, getAllLesson);
//id for lesson
router.get("/lessons/:lessonId", isAuth, getSpecificLesson);
//id for course
router.post("/courses/:id/lessons", isAuth, authorization, zodValidate(createLessonSchema), createNewLesson);
//id for lesson
router.patch("/lessons/:lessonId", isAuth, authorization, zodValidate(updateLessonSchema), updateLesson);
//id for lesson
router.delete("/lessons/:lessonId", isAuth, authorization, deleteLesson);

export default router;
