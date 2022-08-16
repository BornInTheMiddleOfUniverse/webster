import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String },
    username: { type: String, required: true, unique: true },
    socialOnly: { type: Boolean, default: false },
    avatarPath: { type: String },
});

const User = mongoose.model("User", userSchema);
export default User;
