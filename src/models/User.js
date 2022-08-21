import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String },
    username: { type: String, required: true, unique: true },
    socialOnly: { type: Boolean, default: false },
    avatarPath: { type: String },
});

userSchema.pre("save", function () {
    this.password = bcrypt.hash(this.password, 5);
    console.log("Hashed password", this.password);
});


const User = mongoose.model("User", userSchema);
export default User;
