module.exports = function(url,data) {
  return (new Promise(function(resolve, reject) {
    const request = new XMLHttpRequest();

    request.addEventListener('load', function() {
      try {
        const result = JSON.parse(this.responseText);
        resolve(result);
      } catch (e) {
        reject('invalid JSON');
      }
    })

    request.addEventListener('error', function() {
      reject(this.statusText);
    })

    request.addEventListener('abort', function() {
      reject(this.statusText);
    })

    if (typeof data === 'object') {
      var params = [];
      for (let i in data) {
        if (data.hasOwnProperty(i)) {
          params.push(encodeURIComponent(i)+'='+encodeURIComponent(data[i]));
        }
      }
      if (params.length) {
        data = params.join('&');
      } else {
        data = undefined;
      }
    }

    if (data) {
      url += '?'+data;
    }
    request.open('GET',url,true);
    request.setRequestHeader('Accept','application/json');
    request.send();
  }));
};
