// Load the AWS SDK for Node.js
// This package is responsible for the API that allows the application to communicate with the web service.
const AWS = require('aws-sdk');

const { v4: uuidv4 } = require('uuid');

// Set the region
AWS.config.update({region: 'us-east-2'});

// Create S3 service object
//This expression creates the s3 instance object with the designated API.
// Create S3 service object
const s3 = new AWS.S3({apiVersion: '2006-03-01'});

// Create the parameters for calling createBucket
var bucketParams = {
  Bucket : "user-images-" + uuidv4()
};
  // call S3 to create the bucket
  // In this statement we used a callback function with the createBucket method and the bucketParams object to create an S3 bucket.
// call S3 to create the bucket
s3.createBucket(bucketParams, (err, data) => {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success");
  }
});