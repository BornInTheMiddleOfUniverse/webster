import dayjs from (days.js);

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const textarea = form.querySelector("textarea");
const btn = form.querySelector("button");
const createdAt = document.querySelector(".comment-createdAt");

const addComment = (text) => {
  const newCommentBox = document.createElement("div");

  newCommentBox.className = "comment-box";
  const commentOwnerProfilePic = document.createElement("div");
  commentOwnerProfilePic.className = "comment-ownerProfilePic";
  const commentBoxTop = document.createElement("div");
  commentBoxTop.className = "comment-box__top";
  const commentText = document.createElement("p");
  commentText.className = "comment-text";
  commentText.innerText = text;
  const commentBoxBottom = document.createElement("div");
  commentBoxBottom.className = "comment-box__bottom";

  const likeBtns = document.createElement("div");
  likeBtns.className = "like-btns";
  const likeIcon = document.createElement("i");
  likeIcon.className = "far.fa-thumbs-up";
  const dislikeIcon = document.createElement("i");
  dislikeIcon.className = "far.fa-thumbs-down";
  likeBtns.appendChild(likeIcon);
  likeBtns.appendChild(dislikeIcon);
  const reply = document.createElement("span");
  reply.className = "reply";
  reply.innerText = "reply";
  commentBoxBottom.appendChild(likeBtns);
  commentBoxBottom.appendChild(reply);

  newCommentBox.appendChild(commentOwnerProfilePic);
  newCommentBox.appendChild(commentBoxTop);
  newCommentBox.appendChild(commentText);
  newCommentBox.appendChild(commentBoxBottom);
}


const handleSubmit = async (event) => {
  event.preventDefault();
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const { status } = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  })
  textarea.value = "";
  if ( status == 201 ) {
    addComment(text);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
