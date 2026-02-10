import { Schema, model } from "mongoose";

const bookSchema = new Schema(
    {
        originalName: { type: String, required: true, trim: true },
        storageName: { type: String, required: true },

        course: { type: Schema.Types.ObjectId, ref: "Course", required: true },

        fileUrl: { type: String, required: true },

        // thumbnailName: { type: String, required: true },

        // thumbnailUrl: { type: String, required: true },
    },
    {
        timestamps: true, // createdAt & updatedAt
    },
);

export default model("Book", bookSchema);
