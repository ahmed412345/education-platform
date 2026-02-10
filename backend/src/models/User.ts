import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true, // بيخلي الإيميل يتسيف ديماً حروف صغيرة عشان تتجنب مشاكل تسجيل الدخول
        },
        phoneNumber: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["student", "admin"],
            default: "student",
        },
        isActive: {
            type: Boolean,
            default: false,
        },
        courses: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "Course",
                },
            ],
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

export default model("User", userSchema);
