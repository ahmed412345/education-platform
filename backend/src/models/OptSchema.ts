import { Schema, model } from "mongoose";

const otpSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    otpCode: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 900 },
});

export default model("Otp", otpSchema);
