'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

module.exports = function (url, data) {
  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();

    request.addEventListener('load', function () {
      try {
        var result = JSON.parse(this.responseText);
        resolve(result);
      } catch (e) {
        reject('invalid JSON');
      }
    });

    request.addEventListener('error', function () {
      reject(this.statusText);
    });

    request.addEventListener('abort', function () {
      reject(this.statusText);
    });

    if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
      var params = [];
      for (var i in data) {
        if (data.hasOwnProperty(i)) {
          params.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
        }
      }
      if (params.length) {
        data = params.join('&');
      } else {
        data = undefined;
      }
    }

    if (data) {
      url += '?' + data;
    }
    request.open('GET', url, true);
    request.setRequestHeader('Accept', 'application/json');
    request.send();
  });
};