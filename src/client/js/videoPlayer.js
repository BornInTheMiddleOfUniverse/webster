const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const likeBtn = document.getElementById("like");
const volumeRange = document.getElementById("volume");
const totalTime = document.getElementById("totalTime");
const currentTime = document.getElementById("currentTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let controlsMovementTimeout = null;
let videoPlayStatus = false;
let controlsTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayClick = () => {
  video.paused ? video.play() : video.pause();
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
}

const handleMuteClick = () => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }
  volumeValue = value;
  video.volume = value;
};
const handleTimeLineChange = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};
const handleTimeLineMouseDown = () => {
  videoPlayStatus = video.paused ? false : true;
  video.pause();
  playBtn.innerText = video.paused ? "Play" : "Pause";
};
const handleTimeLineMouseUp = () => {
  if (videoPlayStatus) {
    video.play();
    playBtn.innerText = "Pause";
  } else {
    video.pause();
    playBtn.innerText = "Play";
  }
};
const handleFullScreen = () => {
  const fullScreen = document.fullscreenElement;
  if (fullScreen) {
    document.exitFullscreen();
    fullScreenBtn.innerText = "Full Screen";
  } else {
    videoContainer.requestFullscreen();
    fullScreenBtn.innerText = "Exit Full Screen"
  }
};

const formatTime = (seconds) => {
  return new Date(seconds * 1000).toISOString().substring(11, 19);
};
const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};
const handleTimeUpdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};


const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add("showing");
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 3000);
};
const handleEnded = () => {
  const {id} = videoContainer.dataset;
  fetch(`/api/videos/${id}/view`, {
    method: "POST",
  });
}
const handleLikeBtnClick = (event) => {
  const {id} = videoContainer.dataset;
  fetch(`/api/videos/${id}/like`, {
    method: "POST",
  });
}

window.addEventListener("keydown", function (event) {
  if (event.code == "Enter") {
    handlePlayClick();
  }
});
likeBtn.addEventListener("click", handleLikeBtnClick);
playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeChange);
timeline.addEventListener("input", handleTimeLineChange);
timeline.addEventListener("mousedown", handleTimeLineMouseDown);
timeline.addEventListener("mouseup", handleTimeLineMouseUp);
fullScreenBtn.addEventListener("click", handleFullScreen);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);
video.addEventListener("ended", handleEnded);