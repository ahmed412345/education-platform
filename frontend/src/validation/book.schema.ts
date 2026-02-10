import z from "zod";

const createBookSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    order: z.number().int().min(1, "Order must be >= 1"),
    fileUrl: z.string().url("File URL must be a valid URL"),
    pages: z.number().int().min(1, "Pages must be at least 1").optional(),
    isActive: z.boolean().optional(),
    thumbnail: z.string().url("File URL must be a valid URL"),
});

const updateBookSchema = z
    .object({
        title: z.string().min(3, "Title must be at least 3 characters").optional(),
        order: z.number().int().min(1, "Order must be >= 1").optional(),
        fileUrl: z.string().url("File URL must be a valid URL").optional(),
        pages: z.number().int().min(1, "Pages must be at least 1"),
        isActive: z.boolean().optional(),
        thumbnail: z.string().url("File URL must be a valid URL").optional(),
    })
    .refine(data => Object.keys(data).length > 0, {
        message: "At least one field must be provided to update",
    });

export { createBookSchema, updateBookSchema };
