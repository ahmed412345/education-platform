import { connect } from "mongoose";

import { AppError } from "../utils/appErorr.js";

const mongoConnect = async () => {
    const mongoUri = process.env.MONGO_URI;
    try {
        if (!mongoUri) throw new AppError("MONGO_URI is not defined in environment variables", 500, false);

        await connect(mongoUri, {
            dbName: "education",
        });
        console.log("MongoDB connected successfully");
    } catch (e: unknown) {
        if (e instanceof AppError) {
            console.error(`MongoDB connection error:, ${e.message} status code: ${e.statusCode}`);
        } else if (e instanceof Error) {
            console.error("MongoDB connection error:", e.message);
        } else {
            console.error("MongoDB connection error:", e);
        }
        //end the programme if an error happened
        process.exit(1);
    }
};

export default mongoConnect;
