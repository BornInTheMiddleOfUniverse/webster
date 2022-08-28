import mongoose from "mongoose";
import { videos } from "../controllers/videoController";

const videoSchema= new mongoose.Schema({
    videoPath: { type: String, required: true},
    title: { type: String, required: true, trim: true, maxLength: 30 },
    description: { type: String, trim: true, maxLength: 200},
    createdAt: { type: Date, default: Date.now },
    hashtags: [{ type: String, trim: true }],
    meta: {
        views: { type: Number },
        rating: { type: Number }
    },
});


videoSchema.static("formatHashtags", function(hashtags) {
    return hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word.trim()}`))
});

const Video = mongoose.model("Video", videoSchema);
export default Video;