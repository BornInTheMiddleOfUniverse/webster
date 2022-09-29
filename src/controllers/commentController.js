import Comment from "../models/Comment";
import User from "../models/User";
import Video from "../models/Video";

export const createComment = async (req, res) => {
    const {
      session: { user },
      body: { text },
      params: { id },
    } = req;
    const commentOwner = await User.findById(user._id);
    const video = await Video.findById(id);
    if (!video) {
      return res.sendStatus(404);
    }
    const comment = await Comment.create({
      text,
      owner: commentOwner,
      ownerProfilePic: user.profilePicPath,
      ownerName: user.username,
      video: id,
    });
    commentOwner.comments.push(comment._id);
    video.comments.push(comment._id);
    commentOwner.save();
    console.log(`commentOwner ${commentOwner}`);
    console.log(`String(loggedInUser.comments) ${String(user.comments)}`)
    console.log(`String(comment._id) ${String(comment._id)}`);


    video.save();
    return res.sendStatus(201);
  };

// export const updateComment = (req, res) => {

// }

// export const deleteComment = (req, res) => {

// }