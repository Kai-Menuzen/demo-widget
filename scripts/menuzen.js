document.addEventListener(
  'DOMContentLoaded',
  function () {
    window.animationDivs = document.querySelectorAll('[data-start]');
    window.menuzenItemKey = 'menuzen' + window.randomId;
    var img = document.getElementById('menuzen-first-frame');
    
    if (img) {
      img.style.opacity = 1;
      setTimeout(function () {
        img.style.opacity = 0;
      }, 800);
    }

    try {
      if (window.videoBackgroundLength) {
        playCanvasVideo();
      }
    } catch (error) {
      console.log(error);
    }

    if (localStorage.getItem(menuzenItemKey)) {
      var localItems = JSON.parse(localStorage.getItem(menuzenItemKey));
    }
    if (localItems) {
      items = merge_options(items, localItems);
    }
    updateUI();

    var currentTime = Date.now();
    var lastUpdated = localStorage.getItem(
      'menuzenLastUpdated' + window.randomId
    );

    if (lastUpdated) {
      if (currentTime - lastUpdated < 1000 * 60 * 2) {
        return;
      }
    }

    localStorage.setItem('menuzenLastUpdated' + window.randomId, currentTime);

    if (window.plugin == 'subway') {
      loadSubwayData();
    } else {
      loadData();
    }
  },
  false
);
