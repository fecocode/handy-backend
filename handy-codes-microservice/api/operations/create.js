const responses = require("../../common/tools/http-responses");
const Dynamo = require("../../common/clients/codes-table.client");

const qrCodesTable = process.env.CODES_TABLE;

exports.handler = async (event) => {
  console.log("event", event);

  if (!event.body) {
    return responses._400({
      message: "Failed to get body data to code creation",
    });
  }

  const data = JSON.parse(event.body);

  const codeCreated = await Dynamo.create(data, qrCodesTable).catch((err) => {
    console.log("Error in Dynamo WRITE", err);
    return null;
  });

  if (!codeCreated) {
    return responses._400({ message: "Failed to create code" });
  }

  return responses._200(codeCreated);
};
