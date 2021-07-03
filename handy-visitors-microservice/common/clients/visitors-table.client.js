const AWS = require("aws-sdk");

const documentClient = new AWS.DynamoDB.DocumentClient();

const visitorsTable = {
  async create(data, TableName) {
    const creationDateTime = new Date().toISOString();
    const Item = {
      data,
      codeId: data.codeId,
      id: (+new Date()).toString(36), // Create unique hash id
      created: creationDateTime,
    };

    const params = {
      TableName,
      Item,
    };

    const res = await documentClient.put(params).promise();

    if (!res) {
      throw Error(`There was an error inserting visitor data`);
    }

    return Item;
  },
};

module.exports = visitorsTable;
