window.onError = function () {};
window.onComplete = function () {
  Signagelive.requestMediaPlayerMoveToNextAsset()
};

window.onVideoTimeUpdate = function (video, currentTime) {
  var second = currentTime / 1000;

  if (window.animationDivs) {
    for (var ind = 0; ind < animationDivs.length; ind++) {
      var animationDiv = animationDivs[ind];
      var start = parseInt(animationDiv.getAttribute('data-start'), 10);
      var end = parseInt(animationDiv.getAttribute('data-end'), 10);
      if (second >= start && second <= end) {
        animationDiv.style.opacity = 1;
      } else {
        animationDiv.style.opacity = 0;
      }
    }
  }
};

function playSLVideo() {
  Signagelive.playVideo(
    'media/video.mp4', // File to play (relative to index.html)
    0, // x pos
    0, // y pos
    window.widthDesign, // width
    window.heightDesign, // height
    false, // loop video
    false, // 4k video (supported screens only)
    {
      onTimeUpdate: onVideoTimeUpdate,
      onComplete: onComplete,
      onError: onError,
    }
  ).then(function () {
    registerOnWidgetClosingEventHandler();
    Signagelive.sendReadyToDisplay();
    var containerElement = document.getElementById('display-board-0');
    if (containerElement) {
      containerElement.style.display = 'block';
    }
  });
}

function onWidgetClosingNotificationReceived() {
  Signagelive.stopVideo().then(function (success) {
    if (success) {
      var containerElement = document.getElementById('display-board-0');
      if (containerElement) {
        containerElement.style.display = 'none';
      }
    }
  });
}

function registerOnWidgetClosingEventHandler() {
  Signagelive.onWidgetClosing(onWidgetClosingNotificationReceived);
}
