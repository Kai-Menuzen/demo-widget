window.onError = function () {};
window.onComplete = function () {};

window.onVideoTimeUpdate = function (video, currentTime) {
  const second = currentTime / 1000;
  animationDivs.forEach((div) => {
    const start = parseInt(div.getAttribute('data-start'), 10);
    const end = parseInt(div.getAttribute('data-end'), 10);
    if (second >= start && second <= end) {
      div.style.opacity = 1;
    } else {
      div.style.opacity = 0;
    }
  });
};

function playSLVideo() {
  Signagelive.playVideo(
    'media/video.mp4', // File to play (relative to index.html)
    0, // x pos
    0, // y pos
    window.widthDesign, // width
    window.heightDesign, // height
    true, // loop video
    false, // 4k video (supported screens only)
    {
      onTimeUpdate: onVideoTimeUpdate,
      onComplete: onComplete,
      onError: onError,
    }
  ).then(function () {
    Signagelive.log('SR');
    Signagelive.sendReadyToDisplay();
  });
}
