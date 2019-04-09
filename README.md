
# AWSSamples find basic operation of AWS and extend on your own. 

1: Use `httpRequest.js` to make a http call. <br>
```
var httpWrapper = require('httpRequest')
httpWrapper.httpGet(query,  (theResult) => {
console.log(theResult)
 });
 ```
