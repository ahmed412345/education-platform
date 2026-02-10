import i18next from "i18next";
import z from "zod";

// دالة لجلب الترجمة وقت الحاجة
const getT = (key: string) => i18next.t(`register.validation.${key}`);

const registerSchema = z.object({
    fullName: z.string().min(3, { message: getT("name") }),
    phoneNumber: z.string().regex(/^\+[1-9]\d{6,14}$/, { message: getT("phone") }),
    email: z.string().trim().email("Invalid email format"),
    password: z.string().min(6, { message: getT("password") }),
});

const loginSchema = z.object({
    email: z.string().trim().email("Invalid email format"),

    password: z.string().min(6, { message: getT("password") }),
});

export { registerSchema, loginSchema };
