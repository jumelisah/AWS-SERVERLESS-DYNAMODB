const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const dynamoTable = 'productTable';

const updateProduct = async (event) => {
  try {
    const data = JSON.parse(event.body);
    let newValue = {};
    let syntaxArr = [];
    for(let x in data){
      if(x !== 'id'){
        newValue[`:${x}`] = data[x];
        syntaxArr.push(`${x} = :${x}`)
      }
    }
    const syntax = syntaxArr.join(', ')
    const params = {
      TableName: dynamoTable,
      Key: {
        id: data.id
      },
      UpdateExpression: `set ${syntax}`,
      ExpressionAttributeValues: newValue,
      ReturnValues: 'UPDATED_NEW'
    }
    const result = await dynamoDB.update(params).promise();
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
  handler: updateProduct
}