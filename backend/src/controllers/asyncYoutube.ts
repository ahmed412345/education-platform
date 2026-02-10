import type { Request, Response, NextFunction } from "express";
import { google } from "googleapis";
import { AppError } from "../utils/appErorr.js";
import Course from "../models/Course.js";
import Lesson from "../models/Lesson.js";
import { wrapperFun } from "../utils/catchError.js";

export const asyncCoursesFromYot = wrapperFun(async (req: Request, res: Response) => {
    if (!req.body) throw new AppError("you must send the list id", 400, true);

    const { playlistId, playlistOrder, price, isActive } = req.body;

    if (!playlistId) throw new AppError("Playlist ID is required", 400, true);

    if (!process.env.YOT_KEY) throw new AppError("Internal server error: YouTube key missing", 500, true);

    const youtube = google.youtube({
        version: "v3",
        auth: process.env.YOT_KEY,
    });

    // 1. جلب معلومات البلاي ليست الأساسية
    const playlistRes = await youtube.playlists.list({
        part: ["snippet"],
        id: [playlistId],
    });

    const playlistInfo = playlistRes.data.items?.[0]?.snippet;
    if (!playlistInfo) throw new AppError("Playlist not found on YouTube.", 404, true);

    // 2. التحقق من عدم التكرار
    const title = playlistInfo.title || "";
    const isExist = await Course.findOne({
        $or: [{ title: title }, { playlistId: String(playlistId) }],
    });

    if (isExist) throw new AppError("This course or playlist already exists", 400, true);

    // 3. إنشاء الكورس أولاً للحصول على الـ ID الخاص به
    const courseData = {
        title,
        order: Number(playlistOrder) || 0,
        description: playlistInfo.description || "",
        price: Number(price) || 0,
        playlistId: String(playlistId),
        isActive: isActive ?? true,
        thumbnail: playlistInfo.thumbnails?.standard?.url || playlistInfo.thumbnails?.high?.url || "",
    };

    const newCourse = await Course.create(courseData);

    // 4. جلب جميع الفيديوهات (Lessons) الموجودة داخل البلاي ليست
    const playlistItemsRes = await youtube.playlistItems.list({
        part: ["snippet", "contentDetails"],
        playlistId: playlistId,
        maxResults: 50, // أقصى عدد في الطلب الواحد، إذا كانت أكثر من 50 ستحتاج لاستخدام pageToken
    });

    const items = playlistItemsRes.data.items || [];

    // 5. تجهيز الدروس وحفظها
    const lessonsData = items.map(item => {
        const videoId = item.snippet?.resourceId?.videoId;

        const youtubePosition = item.snippet?.position ?? 0;

        return {
            title: item.snippet?.title || "Untitled Lesson",
            course: newCourse._id, // ربط الدرس بالكورس الذي أنشأناه
            order: youtubePosition,
            // حفظ الـ ID فقط كما نصحتك سابقاً، أو حفظ الرابط كاملاً كما في الـ Schema الخاصة بك
            videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
            thumbnail: item.snippet?.thumbnails?.standard?.url || item.snippet?.thumbnails?.high?.url || "",
            duration: 10, // اليوتيوب لا يعطي المدة في playlistItems، ستحتاج لطلب منفصل لكل فيديو إذا كنت تريد المدة بدقة
            isActive: true,
        };
    });

    // حفظ جميع الدروس دفعة واحدة لتحسين الأداء
    const createdLessons = await Lesson.insertMany(lessonsData);

    // 6. إرسال الاستجابة
    res.status(201).json({
        status: "success",
        message: "Course and lessons synced successfully",
        data: {
            course: newCourse,
            lessonsCount: createdLessons.length,
        },
    });
});

//المفروض كلو تمام لسا هختبرهم بس المفروض يخزن الكورس بالفيديوهات كلها لوحده
