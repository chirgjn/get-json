module.exports = function(url,data) {
  return (new Promise(function(resolve, reject) {
    const request = new XMLHttpRequest()

    request.addEventListener('load', function() {
      try {
        const result = JSON.parse(this.responseText)
        resolve(result)
      } catch (e) {
        reject('invalid JSON')
      }
    })

    request.addEventListener('error', function() {
      reject(this.statusText)
    })

    request.addEventListener('abort', function() {
      reject(this.statusText)
    })

    request.open('GET',url,true)
    request.setRequestHeader('Accept','application/json')
    if (typeof data === 'object') {
      data = JSON.strigify()
    }
    request.send(data)
  }))
}
