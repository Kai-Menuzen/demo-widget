document.addEventListener(
  'DOMContentLoaded',
  function () {
    window.animationDivs = document.querySelectorAll('[data-start]');
    playSLVideo();
    if (localStorage.getItem('menuzenItems')) {
      var localItems = JSON.parse(localStorage.getItem('menuzenItems'));
    }
    if (localItems) {
      items = merge_options(items, localItems);
    }
    updateUI();

    if (window.plugin == 'subway') {
      loadSubwayData();
    } else {
      loadData();
    }
  },
  false
);
