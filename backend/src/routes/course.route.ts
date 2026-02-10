import { Router } from "express";
import { getAllCourse, getSpecificCourse, createNewCourse, updateCourse, deleteCourse } from "../controllers/course.handler.js";

//zod validation
import { createCourseSchema, updateCourseSchema } from "../validation/course.schema.js";

import { zodValidate } from "../middleware/zod.validation.js";
import { isAuth } from "../middleware/isAuth.js";
import { authorization } from "../middleware/authorization.js";

const router = Router();

router.get("/courses", isAuth, getAllCourse);

router.get("/courses/:id", isAuth, getSpecificCourse);

router.post("/courses", isAuth, authorization, zodValidate(createCourseSchema), createNewCourse);

router.patch("/courses/:id", isAuth, authorization, zodValidate(updateCourseSchema), updateCourse);

router.delete("/courses/:id", isAuth, authorization, deleteCourse);
export default router;
