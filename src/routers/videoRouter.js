import express from "express";
import { videos, watch, getUpload, postUpload } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/", videos);
videoRouter.route("/upload").get(getUpload).post(postUpload);
videoRouter.get("/:id([0-9a-f]{24})", watch);



export default videoRouter;