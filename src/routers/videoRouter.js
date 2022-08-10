import express from "express";
import { videos } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/", videos);

export default videoRouter;