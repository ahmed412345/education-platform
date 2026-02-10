import { Router } from "express";
import { asyncCoursesFromYot } from "../controllers/asyncYoutube.js";
import { isAuth } from "../middleware/isAuth.js";
import { authorization } from "../middleware/authorization.js";

const router = Router();

router.post("/asyncYoutube", isAuth, authorization, asyncCoursesFromYot);
export default router;
