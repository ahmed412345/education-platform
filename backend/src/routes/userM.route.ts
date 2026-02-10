import { Router } from "express";
import { meHandler } from "../controllers/me.handler.js";
import { isAuth } from "../middleware/isAuth.js";
import { authorization } from "../middleware/authorization.js";
import { blockUser, updateUserEnrollments, getAllUsers, unblockUser, updateUser } from "../controllers/userMagament.handler.js";

const router = Router();

router.get("/users", isAuth, authorization, getAllUsers);

router.patch("/users/:id", isAuth, updateUser);

router.patch("/users/block/:id", isAuth, authorization, blockUser);

router.patch("/users/unblock/:id", isAuth, authorization, unblockUser);

//اضافه كورس للمستخدمين عني طريق ال id & courseId
router.post("/updateUserCourses", isAuth, authorization, updateUserEnrollments);

export default router;
