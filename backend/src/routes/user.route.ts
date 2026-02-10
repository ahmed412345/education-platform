import { Router } from "express";

import { register, sendOtp, activateAccount, login, logout } from "../controllers/user.handler.js";

//validation for jwt
import { isAuth } from "../middleware/isAuth.js";
//stop spam
import { preventOtpSpam } from "../middleware/preventOtpSpam.js";

//zod validation
import { registerSchema, loginSchema } from "../validation/user.schema.js";

import { zodValidate } from "../middleware/zod.validation.js";

const router = Router();
router.post("/users/register", zodValidate(registerSchema), register);
//send otp to user
router.get("/users/register/activate", isAuth, preventOtpSpam, sendOtp);
//get otp from user and check if it right
router.post("/users/register/activate", isAuth, activateAccount);

router.post("/users/login", zodValidate(loginSchema), login);

router.post("/users/logout", isAuth, logout);
export default router;
