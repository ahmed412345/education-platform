import { Router } from "express";
import { meHandler } from "../controllers/me.handler.js";

const router = Router();

router.get("/me", meHandler);

export default router;
