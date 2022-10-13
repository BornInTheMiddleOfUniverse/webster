import express from "express";
import { registerView, registerLike } from "../controllers/videoController";
import { createComment, updateComment, deleteComment } from "../controllers/commentController";


const apiRouter = express.Router();
const VIDEO_ID_URL = "/videos/:id([0-9a-f]{24})";
const COMMENT_ID_URL = "/videos/:id([0-9a-f]{24})";
apiRouter.post(`${VIDEO_ID_URL}/view`, registerView);
apiRouter.post(`${VIDEO_ID_URL}/like`, registerLike);

apiRouter.post(`${VIDEO_ID_URL}/comment`, createComment);
apiRouter.put(`${COMMENT_ID_URL}/comment`, updateComment);
apiRouter.delete(`${VIDEO_ID_URL}/comment`, deleteComment);


export default apiRouter;