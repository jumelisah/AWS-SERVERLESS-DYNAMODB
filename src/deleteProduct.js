const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const dynamoTable = 'productTable';

const deleteProduct = async (event) => {
  try {
    const {id} = JSON.parse(event.body)
    const params = {
      TableName: dynamoTable,
      Key: {
          id
      },
      ReturnValues: 'ALL_OLD'
    }
    const result = await dynamoDB.delete(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Success',
          results: result,
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
  handler: deleteProduct
}