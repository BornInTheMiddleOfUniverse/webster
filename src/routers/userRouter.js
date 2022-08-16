import express from "express";
import {
    account, login,
    logout,
    getEdit, postEdit,
    getChangePassword, postChangePassword
} from "../controllers/userController";

const userRouter = express.Router();


userRouter.get("/login", login);
userRouter
    .route("/edit")
    .get(getEdit)
    .post(avatarUpload.single("avatar"), postEdit);
userRouter.route("/change_password").get(getChangePassword).post(postChangePassword);
userRouter.route("/:id").get(account);

export default userRouter;