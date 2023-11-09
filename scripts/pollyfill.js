if (!Object.fromEntries) {
  Object.fromEntries = function (entries) {
    if (!entries || !entries[Symbol.iterator]) {
      throw new Error('Object.fromEntries() requires a single iterable argument');
    }
    var obj = {};
    for (var pair of entries) {
      if (Object(pair) !== pair) {
        throw new TypeError('iterable for fromEntries should yield objects');
      }
      var key = pair[0];
      var value = pair[1];
      obj[key] = value;
    }
    return obj;
  };
}
