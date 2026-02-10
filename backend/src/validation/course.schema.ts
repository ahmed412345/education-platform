import z from "zod";

const createCourseSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().optional(),
    order: z.number().int().min(1, "Order must be at least 1"),
    price: z.number().min(0, "Price must be 0 or more"),
    isActive: z.boolean(),
    thumbnail: z.string().url("Thumbnail must be a valid URL"),
});

const updateCourseSchema = z
    .object({
        title: z.string().min(3, "Title must be at least 3 characters").optional(),
        description: z.string().optional(),
        order: z.number().int().min(1, "Order must be at least 1").optional(),
        price: z.number().min(0, "Price must be 0 or more").optional(),
        isActive: z.boolean().optional(),
        thumbnail: z.string().url("Thumbnail must be a valid URL").optional(),
    })
    .refine(data => Object.keys(data).length > 0, {
        message: "At least one field must be provided for update",
    });

export { createCourseSchema, updateCourseSchema };
