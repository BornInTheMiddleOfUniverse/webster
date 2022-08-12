import express from "express";
import { videos, watch } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/", videos);
videoRouter.get("/:id", watch);



export default videoRouter;