
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
3: Use `aws-rekognition-sample.js` to detect image uploaded by a post request .

this sample accepts post request with a base64 string under `photoBase` key.in response you will receive detected values in json.

```
var params = {
                "Body": decodedImage,
                "Bucket": "YOUR_BUCKET_NAME",
                "Key": photoPath
            };
```
Because this uploads image to s3 as well ,replace `YOUR_BUCKET_NAME` with your cerated bucket name .



PS: `Lambda` will need necessary permission to access resources .above all samples assumes permission has been granted.

                            
