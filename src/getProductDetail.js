const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const dynamoTable = 'productTable';

const getProductDetail = async (event) => {
  try {
    const {id} = event.queryStringParameters
    const params = {
        TableName: dynamoTable,
        Key: {
            id
        }
    }
    let body = {
        message: 'Product detail',
    }
    const product = await dynamoDB.get(params).promise();
    if(product.Item){
        body.results = product.Item;
    }else{
        body.results = 'No product exist';
    }
    return {
      statusCode: 200,
      body: JSON.stringify(body),
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
  handler: getProductDetail
}