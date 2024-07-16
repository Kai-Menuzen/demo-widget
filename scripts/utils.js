function merge_options(obj1, obj2) {
  var obj3 = {};
  for (var attrname in obj1) {
    obj3[attrname] = obj1[attrname];
  }
  for (var attrname in obj2) {
    obj3[attrname] = obj2[attrname];
  }
  return obj3;
}
function repeatString(str, num) {
  var result = '';
  for (var i = 0; i < num; i++) {
    result += str;
  }
  return result;
}

function chunk(array, size) {
  if (typeof size === 'undefined') {
    size = 1;
  } else {
    size = Math.max(size, 0);
  }

  var length = 0;
  if (array !== null && array !== undefined) {
    length = array.length;
  }

  if (length === 0 || size < 1) {
    return [];
  }

  var index = 0;
  var resIndex = 0;
  var result = new Array(Math.ceil(length / size));

  while (index < length) {
    result[resIndex++] = array.slice(index, (index += size));
  }
  return result;
}

function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

function merge(target, source) {
  if (target === null || target === undefined) {
    target = {};
  }

  if (source === null || source === undefined) {
    return target;
  }

  for (var key in source) {
    if (source.hasOwnProperty(key)) {
      if (isObject(source[key])) {
        if (!isObject(target[key])) {
          target[key] = {};
        }
        target[key] = merge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }

  return target;
}
