import express from "express";
import session from "express-session";
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
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static("assets"));

app.use(
    session({
        secret: "Jieun",
        resave: true,
        saveUninitialized: true,
        cookie: { secure: true },
    })
)

app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/videos", videoRouter);

export default app;