import express from "express";
import { videos, watch, getUpload, postUpload, getEdit, postEdit, deleteVideo, search } from "../controllers/videoController";
import {loggedInOnlyMiddleware, publicOnlyMiddleware} from "../middlewares";


const videoRouter = express.Router();

videoRouter.get("/", videos);
videoRouter.route("/upload").get(getUpload).post(postUpload);
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(loggedInOnlyMiddleware, getEdit).post(postEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete").get(loggedInOnlyMiddleware, deleteVideo);
videoRouter.get("/search", search);




export default videoRouter;