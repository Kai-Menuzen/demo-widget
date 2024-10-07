window.onError = function () {};
window.onComplete = function () {
  var videoElement1 = document.getElementById('sl_video_1');
  if (videoElement1) {
    videoElement1.remove();
  }
};

window.onVideoTimeUpdate = function (video, currentTime) {
  var second = currentTime / 1000;

  if (window.animationDivs) {
    for (var ind = 0; ind < animationDivs.length; ind++) {
      var animationDiv = animationDivs[ind];
      var start = Number(animationDiv.getAttribute('data-start'), 10);
      var end = Number(animationDiv.getAttribute('data-end'), 10) + 0.05;
      if (second >= start && second <= end) {
        animationDiv.style.opacity = 1;
      } else {
        animationDiv.style.opacity = 0;
      }
    }
  }

  if (second + 1 > window.videoBackgroundLength) {
    var img = document.getElementById('menuzen-last-frame');
    if (img) {
      img.style.opacity = 1;
    }
  }
};

function playCanvasVideo() {
  Signagelive.playVideo(
    'media/video.mp4',
    0,
    0,
    window.widthDesign,
    window.heightDesign,
    false,
    false,
    {
      onTimeUpdate: onVideoTimeUpdate,
      onComplete: onComplete,
      onError: onError,
    }
  ).then(function () {
    Signagelive.sendReadyToDisplay();
  });
}
