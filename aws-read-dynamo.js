const AWS = require('aws-sdk');
//*/ get reference to S3 client 
var s3 = new AWS.S3();
//get reference to Rekognition
var rekognition = new AWS.Rekognition();
var docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

exports.handler = function (event, context, callback) {
    let photoBase = '';
    let responseCode = 200;
    let photoPath = '';
    let name = 'xyz';

    if (event.queryStringParameters !== null && event.queryStringParameters !== undefined) {
        if (event.queryStringParameters.username !== undefined &&
            event.queryStringParameters.username !== null &&
            event.queryStringParameters.username !== "") {
            name = event.queryStringParameters.username;
        }
    }

    //get body passed from request
    if (event.body !== null && event.body !== undefined) {
        let body = JSON.parse(event.body)
        if (body.photoBase) {
            photoBase = body.photoBase;
            let encodedImage = JSON.parse(event.body).photoBase;
            let decodedImage = Buffer.from(encodedImage, 'base64');
            photoPath = name + ".jpg"
            var params = {
                "Body": decodedImage,
                "Bucket": "YOUR_BUCKET",
                "Key": photoPath
            };

            s3.upload(params, function (err, data) {
                if (err) {
                    callback(err, null);
                } else {

                    // //get photo from s3
                    var params = {
                        Image: {
                            S3Object: {
                                Bucket: "YOUR_BUCKET",
                                Name: photoPath
                            }
                        },
                        MaxLabels: 123,
                        MinConfidence: 70
                    };

                    rekognition.detectLabels(params, function (err, data) {
                        if (err) console.log(err, err.stack); // an error occurred
                        else {

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
                            docClient.query(params, function (err, data) {
                                if (err) {
                                    console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
                                } else {

                                    let response = {
                                        "statusCode": 200,
                                        "headers": {
                                            "my_header": "my_value"
                                        },
                                        "body": JSON.stringify(data.Items),
                                        "isBase64Encoded": false
                                    };

                                    callback(null, response);

                                }
                            });
                        }
                    });
                }
            });

        }
    }
};