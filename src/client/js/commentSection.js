const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("addCommentForm");
const textarea = form.querySelector("textarea");
const btn = form.querySelector("button");
const createdAt = document.querySelector(".comment-createdAt");
const allEllipses = document.querySelectorAll(".ellipsis");
const profileLink = document.getElementById("profileLink");
const loggedInUserId = profileLink.href.slice(-24);
const editForm = document.getElementById("editForm");

const addComment = (text, id, owner) => {
  const videoComments = document.querySelector(".comments");
  const newCommentBox = document.createElement("div");
  newCommentBox.className = "comment-box";
  newCommentBox.dataset.id = id;
  newCommentBox.dataset.owner = owner;
  const commentOwnerProfilePic = document.createElement("div");
  commentOwnerProfilePic.className = "comment-owner-img";

  const ownerImg = document.createElement("img");
  ownerImg.src = document.querySelector(".user-profile-pic img").src;
  ownerImg.crossOrigin = "anonymous";
  commentOwnerProfilePic.appendChild(ownerImg);

  const commentBoxTop = document.createElement("div");
  commentBoxTop.className = "comment-box__top";

  const ownerNameSrc = document.querySelector(".brief_user_info a").text;
  const ownerName = document.createElement("span");
  ownerName.innerText = ownerNameSrc.replace("'s Profile", "");
  ownerName.className = "comment-owner";

  const createdAt = document.createElement("span");
  createdAt.className = "comment-createdAt";
  createdAt.innerText = "a few seconds ago";
  commentBoxTop.appendChild(ownerName);
  commentBoxTop.appendChild(createdAt);

  const commentText = document.createElement("div");
  commentText.className = "comment-text";
  commentText.innerText = text;

  const commentBoxBottom = document.createElement("div");
  commentBoxBottom.className = "comment-box__bottom";

  const likeBtns = document.createElement("div");
  likeBtns.className = "like-btns";

  const likeIcon = document.createElement("i");
  likeIcon.className = "far fa-thumbs-up";
  const dislikeIcon = document.createElement("i");
  dislikeIcon.className = "far fa-thumbs-down";
  likeBtns.appendChild(likeIcon);
  likeBtns.appendChild(dislikeIcon);
  const reply = document.createElement("span");
  reply.className = "reply";
  reply.innerText = "reply";

  const ellipsis = document.createElement("div");
  ellipsis.className = "ellipsis";
  ellipsis.dataset.owner = owner;

  const ellipsisIcon = document.createElement("i");
  ellipsisIcon.className = "fa-solid fa-ellipsis-vertical";
  ellipsisIcon.dataset.owner = owner;

  ellipsis.appendChild(ellipsisIcon);

  commentBoxBottom.appendChild(likeBtns);
  commentBoxBottom.appendChild(reply);
  newCommentBox.appendChild(commentOwnerProfilePic);
  newCommentBox.appendChild(commentBoxTop);
  newCommentBox.appendChild(commentText);
  newCommentBox.appendChild(ellipsis);
  newCommentBox.appendChild(commentBoxBottom);
  videoComments.prepend(newCommentBox);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (response.status == 201) {
    textarea.value = "";
    const { newCommentId, ownerId } = await response.json();
    addComment(text, newCommentId, ownerId);
  }
};

const handleEllipsisClick = async(event) => {
  const popup = document.createElement("div");
  popup.className = "popup";
  const ellipsis = event.target;

  if (
    event.currentTarget.dataset.owner === loggedInUserId ||
    event.target.parentNode.dataset.owner === loggedInUserId
  ) {
    const editBtn = document.createElement("div");
    editBtn.className = "edit-comment";
    const editIcon = document.createElement("i");
    editIcon.className = "fa-regular fa-pen-to-square";
    const editSpan = document.createElement("span");
    editSpan.innerText = "Edit";
    editBtn.appendChild(editIcon);
    editBtn.appendChild(editSpan);

    const deleteBtn = document.createElement("div");
    deleteBtn.className = "delete-comment";
    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fa-regular fa-trash-can";
    const deleteSpan = document.createElement("span");
    deleteSpan.innerText = "Delete";
    deleteBtn.appendChild(deleteIcon);
    deleteBtn.appendChild(deleteSpan);

    popup.appendChild(editBtn);
    popup.appendChild(deleteBtn);
    event.target.parentNode.appendChild(popup);
    editBtn.addEventListener("click", handleCommentEditBtnClick);

  } else {
    const reportBtn = document.createElement("div");
    reportBtn.className = "report-comment";
    const reportIcon = document.createElement("i");
    reportIcon.className = "fas fa-flag";
    const reportSpan = document.createElement("span");
    reportSpan.innerText = "Report";
    reportBtn.appendChild(reportIcon);
    reportBtn.appendChild(reportSpan);
    popup.appendChild(reportBtn);
    event.target.parentNode.appendChild(popup);
  }
  ellipsis.style.opacity = "1";
  event.target.removeEventListener("click", handleEllipsisClick);
  event.target.addEventListener("click", handleEllipsisClickTwice);
};

const handleEllipsisClickTwice = (event) => {
  const popup = document.querySelector(".popup");
  const ellipsis = event.target;
  const commentBox = ellipsis.parentNode.parentNode;

  popup.remove();
  ellipsis.removeEventListener("click", handleEllipsisClickTwice);
  ellipsis.addEventListener("click", handleEllipsisClick);
  commentBox.addEventListener("mouseenter", () => {
    ellipsis.style.opacity = "1";
  });
  commentBox.addEventListener("mouseleave", () => {
    ellipsis.style.opacity = "0";
  });
};



const handleCommentEditBtnClick = (event) => {
  const commentBox = event.currentTarget.parentNode.parentNode.parentNode;

  const commentBoxtop = commentBox.querySelector(".comment-box__top");
  const commentText = commentBox.querySelector(".comment-text");
  const commentBoxBottom = commentBox.querySelector(".comment-box__bottom");
  const ellipsis = commentBox.querySelector(".ellipsis");

  ellipsis.style.visibility = "hidden";
  commentBoxtop.style.visibility = "hidden";
  commentText.style.visibility = "hidden";
  commentBoxBottom.style.visibility = "hidden";

  const editForm = document.createElement("form");
  editForm.id = "editCommentForm";
  const editTextarea = document.createElement("textarea");
  editTextarea.cols="70";
  editTextarea.rows = "1";
  editTextarea.value = commentText.textContent; 
  const editSubmitBtn = document.createElement("button");
  editSubmitBtn.innerText = "Edit";
  editSubmitBtn.className = "edit-btn";
  const editCancelBtn = document.createElement("button");
  editCancelBtn.innerText = "Cancel";
  editCancelBtn.className = "cancel-btn";

  editForm.appendChild(editTextarea);
  editForm.appendChild(editSubmitBtn);
  editForm.appendChild(editCancelBtn);
  commentBox.appendChild(editForm);  


  editCancelBtn.addEventListener("click", handleEditCancel);
  editSubmitBtn.addEventListener("click", handleEditSubmitBtnClick);
};

const handleEditSubmitBtnClick = (event) => {
  event.preventDefault();
  const editTextarea = document.querySelector("textarea");
  const text = editTextarea.value;
  console.log(text);
  const editForm = document.getElementById("editCommentForm");
  updateComment(text, editForm);
};

const updateComment = async (text, editForm) => {

  if (text == ""){
    console.log("nothing");
    handleEditCancel();
    return;
  } 

  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (response.status == 200) {
    editForm.remove();
    const commentBox = editForm.parentNode;
    console.log(commentBox.querySelector(".comment-text").innerText);
    commentBox.querySelector(".comment-text").innerText = text;
  }


}

const handleEditCancel = () => {
  console.log("edit canceled");

  const videoComments = document.querySelector(".comments");
  const editCommentForm = videoComments.querySelector("#editCommentForm");
  const commentBox = editCommentForm.parentNode;
  const commentBoxtop = commentBox.querySelector(".comment-box__top");
  const commentText = commentBox.querySelector(".comment-text");
  const commentBoxBottom = commentBox.querySelector(".comment-box__bottom");
  const ellipsis = commentBox.querySelector(".ellipsis");

  editCommentForm.remove();  
  ellipsis.style.visibility = "visible";
  ellipsis.addEventListener("click", handleEllipsisClickTwice, { once: true });
  commentBoxtop.style.visibility = "visible";
  commentText.style.visibility = "visible";
  commentBoxBottom.style.visibility = "visible";

};






if (form) {
  form.addEventListener("submit", handleSubmit);
}
allEllipses.forEach((ellipsis) => {
  ellipsis.addEventListener("click", handleEllipsisClick, { once: true });
});

