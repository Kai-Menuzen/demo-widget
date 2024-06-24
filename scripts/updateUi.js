function extractNumbersFromString(inputString) {
  var numbers = [];
  var currentNumber = '';
  for (var i = 0; i < inputString.length; i++) {
    var char = inputString[i];
    if (char >= '0' && char <= '9') {
      currentNumber += char;
    } else {
      if (currentNumber.length > 0) {
        numbers.push(Number(currentNumber));
        currentNumber = '';
      }
    }
  }
  if (currentNumber.length > 0) {
    numbers.push(Number(currentNumber));
  }
  return numbers;
}

function updatePrice(element, replaceArr, targetArr) {
  var newText = element.innerHTML;
  newText = newText.replace(replaceArr[0], targetArr[0]);
  var newTextReplace;
  var replaceArrLength = 0;
  if (replaceArr[1]) {
    replaceArrLength = replaceArr[1].toString().length;
  }
  if (targetArr[1]) {
    newTextReplace = targetArr[1];
  } else {
    newTextReplace = '0'.repeat(replaceArrLength);
  }
  var lastIndex = newText.lastIndexOf(replaceArr[1]);
  if (lastIndex != -1) {
    newText =
      newText.substring(0, lastIndex) +
      newTextReplace +
      newText.substring(lastIndex + replaceArrLength);
  } else if (newTextReplace) {
    newText = newText.substring(0) + '.' + newTextReplace;
  }
  element.innerHTML = newText;
}

function updateUI() {
  var elements = document.querySelectorAll('[data-type]');
  for (var index = 0; index < elements.length; index++) {
    var element = elements[index];
    var id = element.getAttribute('data-id');
    var key = element.getAttribute('data-key');
    var type = element.getAttribute('data-type');
    if (key == 'price') {
      var replaceArr = extractNumbersFromString(element.innerHTML);
      if (!replaceArr.length) {
        continue;
      }
      var targetArr;
      if (
        type == 'item' &&
        items[id] &&
        items[id].variations &&
        items[id].variations[0] &&
        items[id].variations[0].price
      ) {
        targetArr = items[id].variations[0].price.toString().split('.');
      }
      if (type == 'variation' && variation[id] && variation[id].price) {
        targetArr = variation[id].price.toString().split('.');
      }
      if (targetArr) {
        updatePrice(element, replaceArr, targetArr);
      }
    } else {
      if (type == 'item' && items[id]) {
        element.innerHTML = items[id][key];
      }
      if (type == 'variation' && variation[id]) {
        element.innerHTML = variation[id][key];
      }
    }
  }
}
