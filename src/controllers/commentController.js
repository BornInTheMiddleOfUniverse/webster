import Comment from "../models/Comment";
import Video from "../models/Video";

export const createComment = async (req, res) => {
    const {
      session: { user },
      body: { text },
      params: { id },
    } = req;
    
    const video = await Video.findById(id);
    if (!video) {
      return res.sendStatus(404);
    }
    const comment = await Comment.create({
      text,
      owner: user._id,
      ownerProfilePic: user.profilePicPath,
      ownerName: user.username,
      video: id,
    });
    video.comments.push(comment._id);
    video.save();
    return res.sendStatus(201);
  };

// export const updateComment = (req, res) => {

// }

// export const deleteComment = (req, res) => {

// }