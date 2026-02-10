import z from "zod";

const registerSchema = z.object({
    fullName: z.string().min(3, "Full name must be at least 3 characters"),

    // التحقق من الإيميل باستخدام وظيفة email الجاهزة في Zod
    email: z.string().trim().email("Invalid email format"),
    phoneNumber: z.string().regex(/^\+?[1-9]\d{6,14}$/, "Invalid phone number format"),

    password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
    // في تسجيل الدخول، الإيميل وكلمة السر مطلوبين عادةً (أو اختياريين حسب منطق الكود عندك)
    email: z.string().trim().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export { registerSchema, loginSchema };
