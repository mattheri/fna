import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
    email: string;
    hash: string;
}

const userSchema: Schema = new mongoose.Schema({
    email: String,
    hash: String
});

export default mongoose.model<IUser>("User", userSchema);