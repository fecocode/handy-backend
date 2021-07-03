const responses = require("../../common/tools/http-responses");
const Dynamo = require("../../common/clients/visitors-table.client");

const visitorsTable = process.env.VISITORS_TABLE;

exports.handler = async (event) => {
  console.log("event", event);

  if (!event.body) {
    return responses._400({
      message: "Failed to get body data to visit creation",
    });
  }

  const data = JSON.parse(event.body);

  const visitRecorded = await Dynamo.create(data, visitorsTable).catch(
    (err) => {
      console.log("Error in Dynamo WRITE", err);
      return null;
    }
  );

  if (!visitRecorded) {
    return responses._400({ message: "Failed to create visit record" });
  }

  return responses._200(visitRecorded);
};
