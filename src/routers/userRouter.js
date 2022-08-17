import express from "express";
import {
    getJoin, postJoin, account, login, getEdit, postEdit, getChangePassword, postChangePassword
} from "../controllers/userController";

const userRouter = express.Router();


userRouter.route("/join").get(getJoin).post(postJoin);
userRouter.get("/login", login);
userRouter
    .route("/edit")
    .get(getEdit)
    .post(postEdit);
userRouter.route("/change_password").get(getChangePassword).post(postChangePassword);
userRouter.route("/:id").get(account);

export default userRouter;