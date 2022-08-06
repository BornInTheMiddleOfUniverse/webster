import express from "express";
import { user } from "../controllers/globalController";

const userRouter = express.Router();

userRouter.get("/user", user);

export default userRouter;