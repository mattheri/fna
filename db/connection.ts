import mongoose from "mongoose";
import dotenv from "dotenv";

export const connect = () => {
    if (process.env.NODE_ENV === "production") dotenv.config();
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
}