const AWS = require('aws-sdk');
//*/ get reference to S3 client 
var s3 = new AWS.S3();

exports.handler = function(event, context, callback) {
    let name = "you";
    let city = 'World';
    let photoBase = '';
    let day = '';
    let responseCode = 200;
    //get query params passed from request    
    if (event.queryStringParameters !== null && event.queryStringParameters !== undefined) {
        if (event.queryStringParameters.username !== undefined && 
            event.queryStringParameters.username !== null && 
            event.queryStringParameters.username !== "") {
            console.log("Received name: " + event.queryStringParameters.name);
            name = event.queryStringParameters.username;
        }
    }
    
    //get body passed from request
    if (event.body !== null && event.body !== undefined) {
        let body = JSON.parse(event.body)
        if (body.photoBase) {
            photoBase = body.photoBase;
            let encodedImage =JSON.parse(event.body).photoBase;
            let decodedImage = Buffer.from(encodedImage, 'base64');
            var filePath = "images/" + name + ".jpg"
            var params = {
                 "Body": decodedImage,
                 "Bucket": "YOUR_BUCKET_NAME_HERE",
                 "Key": filePath
            };
            
            s3.upload(params, function(err, data){
            if(err) {
           callback(err, null);
       } else {
           let response = {
        "statusCode": 200,
        "headers": {
            "my_header": "my_value"
        },
        "body": JSON.stringify(data),
        "isBase64Encoded": false
    };
           callback(null, response);
    }
    });
    
        }
    }
};