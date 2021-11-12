// import AWS package
const { DynamoDB } = require('aws-sdk');
const AWS = require('aws-sdk');

// modify AWS config that DynamoDB uses to connect to the local instance
AWS.config.update({
    region: "us-east-2",
    endpoint: "http://localhost:8000"
  });
// Dynamo service object
const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
//By specifying the API version in the preceding statement, we ensure that the API library we're using is compatible with the following commands.
// It is important to note that we're using the DynamoDB class to create a service interface object, dynamodb. 

// params object that will hold the schema and metadata of the table
const params = {
    TableName : "Thoughts",
    KeySchema: [       
      { AttributeName: "username", KeyType: "HASH"},  // Partition key
      { AttributeName: "createdAt", KeyType: "RANGE" }  // Sort key
    ],
    AttributeDefinitions: [       
      { AttributeName: "username", AttributeType: "S" },
      { AttributeName: "createdAt", AttributeType: "N" }
    ],
    ProvisionedThroughput: {       
      ReadCapacityUnits: 10, 
      WriteCapacityUnits: 10
    }
  };

// creates a table
dynamodb.createTable(params, (err, data) => {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});
