//add .env to env
import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";

import express from "express";
const app = express();

import mongoConnect from "./dist/config/connectDB.js";

import cors from "cors";

import courseRouter from "./dist/routes/course.route.js";

import lessonRouter from "./dist/routes/lesson.route.js";

import bookRouter from "./dist/routes/book.route.js";

import userRouter from "./dist/routes/user.route.js";

import meRouter from "./dist/routes/me.route.js";

import managementRouter from "./dist/routes/userM.route.js";

import youtubeRouter from "./dist/routes/youtube.route.js";

import errorMiddleware from "./dist/middleware/error.js";

// app.set("trust proxy", 1);

const allowedOrigins = process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(",") : ["http://localhost:5173"];
app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    }),
);

app.use(cookieParser());

app.use(express.json());

app.use("/api", courseRouter);

app.use("/api", lessonRouter);

app.use("/api", bookRouter);

app.use("/api", userRouter);

app.use("/api", meRouter);

app.use("/api", managementRouter);

app.use("/api", youtubeRouter);

app.use(errorMiddleware);

const startServer = async () => {
    //connect to database
    await mongoConnect();
    app.listen(process.env.PORT || 3000, () => {
        console.log("server is running now at " + process.env.PORT);
    });
};

startServer();
