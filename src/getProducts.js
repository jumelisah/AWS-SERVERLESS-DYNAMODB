const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const dynamoTable = 'productTable';

const getProducts = async () => {
  try {
    const params = {
        TableName: dynamoTable
    }
    const allProduct = await scanDynamoRecords(params, []);
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Success',
          results: allProduct,
        },
        null,
        2
      ),
    };
  } catch(e) {
    return {
      statusCode: 400,
      body: JSON.stringify(
        {
          message: String(e),
        }
      ),
    };
  }
};

const scanDynamoRecords = async(scanParams, itemArray) => {
  try {
    const dynamoData = await dynamoDB.scan(scanParams).promise();
    itemArray = itemArray.concat(dynamoData.Items);
    if (dynamoData.LastEvaluatedKey) {
      scanParams.ExclusiveStartkey = dynamoData.LastEvaluatedKey;
      return await scanDynamoRecords(scanParams, itemArray);
    }
    return itemArray;
  } catch(e) {
    return {
        statusCode: 400,
        body: JSON.stringify(
          {
            message: String(e),
          }
        ),
      };
  }
}

module.exports = {
  handler: getProducts
}