import z from "zod";

const createLessonSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    order: z.number().int().min(1, "Order must be >= 1"),
    videoUrl: z.string().url("Video URL must be a valid URL"),
    thumbnail: z.string().url("Thumbnail must be a valid URL"),
    duration: z.number().int().positive("Duration must be greater than 0"),
    isActive: z.boolean().optional(),
});

const updateLessonSchema = z
    .object({
        title: z.string().min(3, "Title must be at least 3 characters").optional(),
        order: z.number().int().min(1, "Order must be >= 1").optional(),
        videoUrl: z.string().url("Video URL must be a valid URL").optional(),
        thumbnail: z.string().url("Thumbnail must be a valid URL").optional(),
        duration: z.number().int().positive("Duration must be greater than 0").optional(),
        isActive: z.boolean().optional(),
    })
    .refine(data => Object.keys(data).length > 0, {
        message: "At least one field must be provided",
    });

export { createLessonSchema, updateLessonSchema };
