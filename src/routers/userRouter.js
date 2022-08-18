import express from "express";
import {
  getJoin,
  postJoin,
  account,
  getLogin, postLogin,
  getEdit,
  postEdit,
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.route("/join").get(getJoin).post(postJoin);
userRouter.route("/login").get(getLogin).post(postLogin);
userRouter.route("/edit").get(getEdit).post(postEdit);
userRouter
  .route("/change_password")
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.route("/:id").get(account);

export default userRouter;
