import express from "express";
import "./db";
import "./models/Video";
import { localsMiddleware, logger } from "./middlewares";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();

app.set("view engine", "pug")
app.set("views", process.cwd() + "/src/views")

app.use(localsMiddleware);
app.use(logger);
app.use("/static", express.static("assets"));

app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/videos", videoRouter);

export default app;