import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import "./db";
import "./models/Video";
import { localsMiddleware, logger } from "./middlewares";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();

app.set("view engine", "pug")
app.set("views", process.cwd() + "/src/views")

app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 86400000,
        },
        store: MongoStore.create({mongoUrl: process.env.DB_URL}),
    })
);
app.use(localsMiddleware);
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));


app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/videos", videoRouter);


export default app;