function loadData() {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', window.internalAPI, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  var payload = JSON.stringify({
    query:
      'query GetMenuBoardWidget($input: MenuBoardWidgetInputV2!) { menuBoardWidgetV2(input: $input) { items { id name subtitle description mainImage variations { id label price kilojoules defaultOption stock } outOfStock } menuBoard { globalData } } }',
    variables: {
      input: {
        accountId: accountId,
        variationIds: [],
        designId: menuBoardId,
        itemIds: itemIds,
      },
    },
  });

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        var itemObj = {};
        for (
          var index = 0;
          index < response.data.menuBoardWidgetV2.items.length;
          index++
        ) {
          var item = response.data.menuBoardWidgetV2.items[index];
          itemObj[item.id] = item;
        }
        localStorage.setItem('menuzenItems', JSON.stringify(itemObj));
        items = merge_options(items, itemObj);
        updateUI();
      } else {
      }
    }
  };
  xhr.send(payload);
}
