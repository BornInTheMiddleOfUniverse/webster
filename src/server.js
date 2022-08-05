import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";


const PORT = 4000;
const app = express();
const logger = morgan("dev");

app.set("view engine", "pug")

app.use(logger);
app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/videos", videoRouter);


const handleListening = () => console.log(`🚀 Server Listening on port http://localhost:${PORT}`)
app.listen(PORT, handleListening);