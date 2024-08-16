document.addEventListener(
  'DOMContentLoaded',
  function () {
    window.animationDivs = document.querySelectorAll('[data-start]');
    try {
      playSLVideo();
    } catch (error) {
      console.log(error);
    }

    if (localStorage.getItem('menuzenItems')) {
      var localItems = JSON.parse(localStorage.getItem('menuzenItems'));
    }
    if (localItems) {
      items = merge_options(items, localItems);
    }
    updateUI();

    var currentTime = Date.now();
    var lastUpdated = localStorage.getItem('menuzenLastUpdated');

    if (lastUpdated) {
      if (currentTime - lastUpdated < 1000 * 60 * 2) {
        return;
      }
    }
  
    localStorage.setItem('menuzenLastUpdated', currentTime);

    if (window.plugin == 'subway') {
      loadSubwayData();
    } else {
      loadData();
    }
  },
  false
);
