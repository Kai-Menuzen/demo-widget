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

function updatePrice(element, updatePrice, showSymbol) {
  var newText = displayPriceHtml(updatePrice, showSymbol);
  element.innerHTML = newText;
}

function updateUI() {
  var elements = document.querySelectorAll('[data-type]');
  for (var index = 0; index < elements.length; index++) {
    var element = elements[index];
    var id = element.getAttribute('data-id');
    var key = element.getAttribute('data-key');
    var type = element.getAttribute('data-type');
    var showSymbol = element.getAttribute('data-showSymbol');

    if (key == 'price') {
      var price;
      if (
        type == 'item' &&
        items[id] &&
        items[id].variations &&
        items[id].variations[0] &&
        items[id].variations[0].price
      ) {
        price = items[id].variations[0].price;
      }
      if (type == 'variation' && variation[id] && variation[id].price) {
        price = variation[id].price;
      }
      if (price) {
        updatePrice(element, price, showSymbol !== 'false');
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

function displayPriceHtml(price, showSymbol) {
  var pricePosition = window.menuzenDesignData.designSetting.pricePosition;
  var symbolPosition = window.menuzenDesignData.designSetting.symbolPosition;
  var currency = window.menuzenDesignData.currency;
  var currencyDecimal = window.menuzenDesignData.currencyDecimal;

  var priceValue = '';
  if (price) {
    priceValue = price;
  }

  var symbol = '';
  if (currency) {
    symbol = currency;
  }

  var formatPrice = priceFormat(priceValue, {
    showSymbol: showSymbol && !!symbol,
    symbol: symbol,
    currencyDecimal: currencyDecimal,
    symbolPosition: symbolPosition,
  });

  var pointIndex = formatPrice.indexOf('.');
  if (pointIndex !== -1 && pricePosition && pricePosition !== 'normal') {
    var htmlTag = pricePosition;
    return (
      formatPrice.substring(0, pointIndex) +
      '<' +
      htmlTag +
      '>' +
      '.' +
      formatPrice.substring(pointIndex + 1) +
      '</' +
      htmlTag +
      '>'
    );
  }
  return formatPrice;
}

function priceFormat(number, options) {
  if (typeof options === 'undefined') {
    options = {};
  }

  var currentCurrency;
  for (var i = 0; i < currencies.length; i++) {
    if (currencies[i].iso === options.symbol) {
      currentCurrency = currencies[i];
      break;
    }
  }
  if (typeof currentCurrency === 'undefined') {
    currentCurrency = undefined;
  }

  var defaultOptions = {
    decPlaces: 3,
    decSep: '.',
    thouSep:
      currentCurrency && currentCurrency.thousandsSeparator
        ? currentCurrency.thousandsSeparator
        : ',',
    showSymbol: true,
    symbol: 'US',
  };

  var mergedOptions = merge(defaultOptions, options);

  var decPlaces = mergedOptions.decPlaces;
  var thouSep = mergedOptions.thouSep;
  var showSymbol = mergedOptions.showSymbol;

  var sign;
  if (showSymbol) {
    if (currentCurrency) {
      sign = currentCurrency.symbol;
    } else {
      sign = '$';
    }
  } else {
    sign = '';
  }

  var numberValue = Math.abs(Number(number) || 0).toFixed(decPlaces);
  var i = parseInt(numberValue);

  var renderDec = function () {
    if (!decPlaces) {
      return '';
    }
    var decValue = Math.abs(number - i)
      .toFixed(!options.currencyDecimal ? decPlaces : options.currencyDecimal)
      .slice(2);

    if (Number(decValue) > 0) {
      if (!options.currencyDecimal) {
        return '.' + decValue.replace(/^0+|0+$/g, '');
      } else {
        return '.' + decValue;
      }
    } else {
      if (!options.currencyDecimal) {
        return '';
      } else {
        return '.' + repeatString('0', options.currencyDecimal);
      }
    }
  };

  var chunkArray = chunk(i.toString().split('').reverse(), 3);
  var value =
    chunkArray
      .reverse()
      .map(function (arr) {
        return arr.reverse().join('');
      })
      .join(thouSep) + renderDec();

  var symbolPosition = mergedOptions.symbolPosition;

  var prefix = '';
  var suffix = '';
  if (currentCurrency) {
    if (symbolPosition && symbolPosition !== 'auto') {
      if (symbolPosition === 'left') {
        prefix =
          sign + (currentCurrency.spaceBetweenAmountAndSymbol ? ' ' : '');
        suffix = currentCurrency.spaceBetweenAmountAndSymbol ? ' ' : '';
      } else {
        prefix = '';
        suffix =
          (currentCurrency.spaceBetweenAmountAndSymbol ? ' ' : '') + sign;
      }
    } else {
      if (currentCurrency.symbolOnLeft) {
        prefix =
          sign + (currentCurrency.spaceBetweenAmountAndSymbol ? ' ' : '');
        suffix = currentCurrency.spaceBetweenAmountAndSymbol ? ' ' : '';
      } else {
        prefix = '';
        suffix =
          (currentCurrency.spaceBetweenAmountAndSymbol ? ' ' : '') + sign;
      }
    }
  } else {
    prefix = sign;
  }

  return prefix + value + suffix;
}
