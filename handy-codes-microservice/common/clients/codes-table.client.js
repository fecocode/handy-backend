const AWS = require("aws-sdk");

const documentClient = new AWS.DynamoDB.DocumentClient();

const codesTable = {
  async getBySlug(slug, TableName) {
    const params = {
      TableName,
      IndexName: "SlugIndex",
      ExpressionAttributeValues: {
        ":slug": slug,
      },
      ExpressionAttributeNames: {
        "#s": "slug",
      },
      KeyConditionExpression: "#s = :slug",
    };

    const data = await documentClient.query(params).promise();

    if (!data || !data.Items || !data.Items[0]) {
      throw Error(
        `There was an error fetching the data for SLUG of ${slug} from ${TableName}`
      );
    }

    return data.Items[0];
  },
  async getByClient(clientId, TableName) {},
  async update(id, data, TableName) {},
  async create(data, TableName) {
    const Item = {
      id: (+new Date()).toString(36),
      ...data,
      created: new Date().toISOString(),
    };

    const params = {
      TableName,
      Item,
    };
    const res = await documentClient.put(params).promise();

    if (!res) {
      throw Error(
        `There was an error inserting Code of ${data.slug} in table ${TableName}`
      );
    }

    return Item;
  },
  async delete(id, TableName) {},
};

module.exports = codesTable;
