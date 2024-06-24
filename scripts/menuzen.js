window.addEventListener('widget-init', function () {
  window.animationDivs = document.querySelectorAll('[data-start]');
  var localItems = JSON.parse(localStorage.getItem('menuzenItems'));
  if (localItems) {
    items = merge_options(items, localItems);
  }
  updateUI();
  playSLVideo();
  loadData();
});

setTimeout(() => {
  window.dispatchEvent(new CustomEvent('widget-init'));
}, 1000);
