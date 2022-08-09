import express from "express";
import { localsMiddleware, logger } from "./middlewares";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";


const PORT = 4000;
const app = express();

app.set("view engine", "pug")
app.set("views", process.cwd() + "/src/views")

app.use(localsMiddleware);
app.use(logger);
app.use("/", rootRouter);
app.use("/user", userRouter);
app.use("/videos", videoRouter);
app.use("/static", express.static("assets"));

const handleListening = () => console.log(`🚀 Server Listening on port http://localhost:${PORT}`)
app.listen(PORT, handleListening);

export default app;