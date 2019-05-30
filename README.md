
# AWSSamples find basic operation of AWS and extend on your own. 

1: Use `httpRequest.js` to make a http call. <br>
```
var httpWrapper = require('httpRequest')
httpWrapper.httpGet(query,  (theResult) => {
console.log(theResult)
 });
 ```
 
 
 2: Query dynamo DB and send results in response .
 Run `aws-read-dynamo.js` to fetch data db . replace `YOUR_TABLE_NAME` and `YOUR_COLOUMN_VALUE` with your database fields. 
 
 ```
 var params = {
                                TableName: "YOUR_TABLE_NAME",
                                KeyConditionExpression: "#Labels = :Labels",
                                ExpressionAttributeNames: {
                                    "#Labels": "Labels"
                                },
                                ExpressionAttributeValues: {
                                    ":Labels": "YOUR_COLOUMN_VALUE"
                                }
                            };
```                            
                            
