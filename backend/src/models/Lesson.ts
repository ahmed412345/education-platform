import { Schema, model } from "mongoose";

const lessonSchema = new Schema(
    {
        title: { type: String, required: true, trim: true },
        course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
        order: { type: Number, required: true },
        videoUrl: { type: String, required: true },
        thumbnail: { type: String, required: true },
        duration: { type: Number, required: true },
        isActive: { type: Boolean, default: true },
    },
    {
        timestamps: true, // createdAt & updatedAt
    }
);

export default model("Lesson", lessonSchema);
