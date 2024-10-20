function loadData() {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', window.internalAPI, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  var payload = JSON.stringify({
    query:
      'query GetMenuBoardWidget($input: MenuBoardWidgetInputV2!) { menuBoardWidgetV2(input: $input) { items { id name subtitle description variations { id label price kilojoules defaultOption stock } outOfStock } menuBoard { globalData } } }',
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
        localStorage.setItem(menuzenItemKey, JSON.stringify(itemObj));
        items = merge_options(items, itemObj);
        updateUI();
      } else {
      }
    }
  };
  xhr.send(payload);
}

function loadSubwayData() {
  window.Signagelive.getPlayerDetails().then(function (playerDetails) {
    if (!playerDetails) return;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', window.internalAPI, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    var payload = JSON.stringify({
      query:
        'query GetSubwayItems($locationId: String!) { getSubwayWidgetItems(locationId: $locationId) }',
      variables: {
        locationId: playerDetails['reference_code_1'],
      },
    });

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          var priceObj = response.data.getSubwayWidgetItems;

          Object.values(items).forEach(function (item) {
            item.variations.forEach(function (variation) {
              if (priceObj[variation.id] !== undefined) {
                variation.price = priceObj[variation.id].price;
              }
            });
          });

          localStorage.setItem(menuzenItemKey, JSON.stringify(items));
          updateUI();
        } else {
        }
      }
    };
    xhr.send(payload);
  });
}
