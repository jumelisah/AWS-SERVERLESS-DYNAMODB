const { v4 } = require('uuid');
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const dynamoTable = 'productTable';

const addProduct = async (event) => {
  try {
    const newData = JSON.parse(event.body);
    newData.id = v4();
    const params = {
      TableName: dynamoTable,
      Item: newData
    };
    const addedData = await dynamoDB.put(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Success',
          data: newData,
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

module.exports = {
  handler: addProduct
}