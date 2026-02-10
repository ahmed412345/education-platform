import { Schema, model } from "mongoose";

const courseSchema = new Schema(
    {
        title: { type: String, required: true, unique: true },
        playlistId: { type: String, default: "" },
        description: { type: String, default: "" },
        order: { type: Number, required: true },
        price: { type: Number, required: true },
        isActive: { type: Boolean, default: true },
        thumbnail: { type: String, required: true },
    },
    {
        timestamps: true, // createdAt & updatedAt
    },
);

export default model("Course", courseSchema);
