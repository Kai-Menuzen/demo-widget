Array.prototype.map = function (callback) {
  var temp = [];
  for (var i = 0; i < this.length; i++) {
    temp.push(callback(this[i], i, this));
  }
  return temp;
};
